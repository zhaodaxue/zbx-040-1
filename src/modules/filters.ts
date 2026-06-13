import { Patient, ToothStatus, StatusFilter, FilterOption } from '../types';
import { toothStatusList } from '../data/mockData';

export const hasToothStatus = (patient: Patient, status: ToothStatus): boolean => {
  const hasUpper = patient.upperTeeth.some(t => t === status);
  const hasLower = patient.lowerTeeth.some(t => t === status);
  return hasUpper || hasLower;
};

export const filterByStatus = (
  patients: Patient[],
  statusFilter: StatusFilter
): Patient[] => {
  if (statusFilter === 'ALL') {
    return patients;
  }
  
  return patients.filter(patient => hasToothStatus(patient, statusFilter));
};

export const getAvailableFilters = (): FilterOption[] => {
  const filters: FilterOption[] = [
    { value: 'ALL', label: '全部' },
  ];
  
  toothStatusList.forEach(status => {
    filters.push({
      value: status.code,
      label: status.label,
    });
  });
  
  return filters;
};

export const getFilterCount = (patients: Patient[], filter: StatusFilter): number => {
  if (filter === 'ALL') {
    return patients.length;
  }
  return filterByStatus(patients, filter).length;
};

export const sortPatientsByNeedsReview = (patients: Patient[]): Patient[] => {
  return [...patients].sort((a, b) => {
    const aNeedsReview = hasToothStatus(a, ToothStatus.LOOSE);
    const bNeedsReview = hasToothStatus(b, ToothStatus.LOOSE);
    
    if (aNeedsReview && !bNeedsReview) return -1;
    if (!aNeedsReview && bNeedsReview) return 1;
    return 0;
  });
};

export const getStatusColor = (status: StatusFilter): string => {
  if (status === 'ALL') return '#4A90D9';
  const statusInfo = toothStatusList.find(s => s.code === status);
  return statusInfo?.color || '#9E9E9E';
};
