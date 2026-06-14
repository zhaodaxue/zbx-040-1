import React, { useState, useMemo } from 'react';
import { TopBar } from '../components/TopBar';
import { FilterBar } from '../components/FilterBar';
import { PatientCard } from '../components/PatientCard';
import { PatientModal } from '../components/PatientModal';
import { StatusFilter } from '../types';
import { filterByStatus, sortPatientsByNeedsReview } from '../modules/filters';
import { useAppStore } from '../store/useAppStore';

const Home: React.FC = () => {
  const patients = useAppStore((s) => s.patients);
  const [currentFilter, setCurrentFilter] = useState<StatusFilter>('ALL');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const filteredPatients = useMemo(() => {
    const filtered = filterByStatus(patients, currentFilter);
    return sortPatientsByNeedsReview(filtered);
  }, [patients, currentFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30">
      <TopBar patients={patients} />
      <FilterBar
        patients={patients}
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl text-gray-700 mb-2">
            小患者换牙进度
          </h2>
          <p className="text-gray-500">
            共 {filteredPatients.length} 位小患者
            {currentFilter !== 'ALL' && ' · 筛选条件已应用'}
          </p>
        </div>

        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPatients.map((patient, index) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                index={index}
                onClick={() => setSelectedPatientId(patient.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🦷</span>
            </div>
            <p className="text-gray-500 text-lg">
              没有找到符合条件的小患者
            </p>
            <button
              onClick={() => setCurrentFilter('ALL')}
              className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              查看全部
            </button>
          </div>
        )}

        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>💡 提示：橙色闪烁表示已松动需复查；红色闪烁为重点关注</p>
          <p className="mt-1">点击卡片可以查看详细牙位并登记换牙进度</p>
        </div>
      </main>

      {selectedPatientId && (
        <PatientModal
          patientId={selectedPatientId}
          onClose={() => setSelectedPatientId(null)}
        />
      )}
    </div>
  );
};

export default Home;
