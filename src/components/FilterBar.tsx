import React from 'react';
import { Filter } from 'lucide-react';
import { StatusFilter, Patient } from '../types';
import { getAvailableFilters, getFilterCount, getStatusColor } from '../modules/filters';

interface FilterBarProps {
  patients: Patient[];
  currentFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  patients,
  currentFilter,
  onFilterChange,
}) => {
  const filters = getAvailableFilters();

  return (
    <div className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-30 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="font-medium">状态筛选：</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const count = getFilterCount(patients, filter.value);
              const isActive = currentFilter === filter.value;
              const color = getStatusColor(filter.value);

              return (
                <button
                  key={filter.value}
                  onClick={() => onFilterChange(filter.value)}
                  className={`
                    group relative px-5 py-2.5 rounded-full font-medium text-sm
                    transition-all duration-300 ease-out
                    ${isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
                    }
                  `}
                  style={isActive ? { backgroundColor: color } : {}}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border-2 border-white/50"
                      style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.5)' : color }}
                    />
                    {filter.label}
                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs
                        ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}
                      `}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
