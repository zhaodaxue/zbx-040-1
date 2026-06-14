import React from 'react';
import { AlertCircle, User, AlertTriangle } from 'lucide-react';
import { Patient } from '../types';
import { ToothGrid } from './ToothGrid';
import { getPatientStatusSummary } from '../modules/statistics';
import { hasToothStatus } from '../modules/filters';
import { ToothStatus } from '../types';
import { patientNeedsFocus } from '../modules/toothProgress';

interface PatientCardProps {
  patient: Patient;
  index: number;
  onClick: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, index, onClick }) => {
  const summary = getPatientStatusSummary(patient);
  const needsReview = hasToothStatus(patient, ToothStatus.LOOSE);
  const needsFocus = patientNeedsFocus(patient);

  return (
    <div
      onClick={onClick}
      className={`
        group bg-white rounded-3xl shadow-md hover:shadow-2xl
        transition-all duration-500 ease-out cursor-pointer
        hover:-translate-y-2 hover:scale-[1.02]
        animate-fade-in-up overflow-hidden
        ${needsFocus ? 'ring-2 ring-red-400/60 shadow-red-100' : needsReview ? 'ring-2 ring-orange-300/50' : ''}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className="h-3 relative"
        style={{ backgroundColor: patient.avatar }}
      >
        {needsFocus && (
          <div className="absolute -right-1 -top-1 animate-pulse">
            <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        {!needsFocus && needsReview && (
          <div className="absolute -right-1 -top-1 animate-pulse">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: patient.avatar + '20' }}
            >
              <User className="w-7 h-7" style={{ color: patient.avatar }} />
            </div>
            <div>
              <h3 className="font-display text-xl text-gray-800">
                {patient.nickname}
              </h3>
              <p className="text-gray-500 text-sm">
                {patient.age} 岁
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            {needsFocus && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                重点关注
              </div>
            )}
            {!needsFocus && needsReview && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium animate-pulse">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                待复查
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <ToothGrid
            upperTeeth={patient.upperTeeth}
            lowerTeeth={patient.lowerTeeth}
            size="small"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-gray-50 rounded-xl py-2">
            <p className="text-lg font-bold text-gray-400">{summary.normal}</p>
            <p className="text-[10px] text-gray-400">未松动</p>
          </div>
          <div className="bg-orange-50 rounded-xl py-2">
            <p className="text-lg font-bold text-orange-500">{summary.loose}</p>
            <p className="text-[10px] text-orange-400">已松动</p>
          </div>
          <div className="bg-gray-100 rounded-xl py-2">
            <p className="text-lg font-bold text-gray-500">{summary.fallen}</p>
            <p className="text-[10px] text-gray-400">已脱落</p>
          </div>
          <div className="bg-green-50 rounded-xl py-2">
            <p className="text-lg font-bold text-green-500">{summary.permanent}</p>
            <p className="text-[10px] text-green-400">恒牙</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-primary-500 font-medium group-hover:text-primary-600 transition-colors">
            点击查看详情 / 登记 →
          </span>
        </div>
      </div>
    </div>
  );
};
