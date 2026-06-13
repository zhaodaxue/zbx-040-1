import React, { useEffect } from 'react';
import { X, User, Calendar } from 'lucide-react';
import { Patient } from '../types';
import { ToothArc } from './ToothArc';
import { ToothGrid } from './ToothGrid';
import { getPatientStatusSummary } from '../modules/statistics';
import { toothStatusList } from '../data/mockData';

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ patient, onClose }) => {
  const summary = getPatientStatusSummary(patient);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />
      
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div
          className="h-4 rounded-t-3xl"
          style={{ backgroundColor: patient.avatar }}
        />

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: patient.avatar + '20' }}
            >
              <User className="w-12 h-12" style={{ color: patient.avatar }} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-4xl text-gray-800 mb-2">
                {patient.nickname}
              </h2>
              <div className="flex items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{patient.age} 岁</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦷</span>
                  <span>20 颗乳牙</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <div className="bg-orange-50 rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-orange-500">{summary.loose}</p>
                <p className="text-xs text-orange-400">已松动</p>
              </div>
              <div className="bg-green-50 rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-green-500">{summary.permanent}</p>
                <p className="text-xs text-green-400">已萌出恒牙</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              口腔全景牙位图
            </h3>
            <div className="flex justify-center">
              <ToothArc
                upperTeeth={patient.upperTeeth}
                lowerTeeth={patient.lowerTeeth}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                牙位网格详情
              </h3>
              <ToothGrid
                upperTeeth={patient.upperTeeth}
                lowerTeeth={patient.lowerTeeth}
                size="large"
                showLabels={true}
                interactive={true}
              />
            </div>

            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  状态图例
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {toothStatusList.map((status) => (
                    <div key={status.code} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm flex items-center justify-center"
                        style={{ backgroundColor: status.color }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z"
                            fill={status.color}
                            stroke={status.code === 'NORMAL' ? '#E0E0E0' : status.color}
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{status.label}</p>
                        <p className="text-xs text-gray-400">
                          {status.code === 'LOOSE' ? '需复查' : '正常状态'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-pink/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  换牙进度统计
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">未松动乳牙</span>
                      <span className="font-semibold text-gray-400">{summary.normal} 颗</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400 rounded-full transition-all duration-500"
                        style={{ width: `${(summary.normal / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">已松动</span>
                      <span className="font-semibold text-orange-500">{summary.loose} 颗</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500 animate-pulse"
                        style={{ width: `${(summary.loose / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">已脱落</span>
                      <span className="font-semibold text-gray-500">{summary.fallen} 颗</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full transition-all duration-500"
                        style={{ width: `${(summary.fallen / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">恒牙已萌出</span>
                      <span className="font-semibold text-green-500">{summary.permanent} 颗</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${(summary.permanent / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
