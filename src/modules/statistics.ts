import { Patient, ToothStatus, PatientStatusSummary } from '../types';

export const countToothByStatus = (
  patients: Patient[],
  status: ToothStatus
): number => {
  return patients.reduce((total, patient) => {
    const upperCount = patient.upperTeeth.filter(t => t === status).length;
    const lowerCount = patient.lowerTeeth.filter(t => t === status).length;
    return total + upperCount + lowerCount;
  }, 0);
};

export const countReviewNeeded = (patients: Patient[]): number => {
  return patients.filter(patient => {
    const hasLooseUpper = patient.upperTeeth.some(t => t === ToothStatus.LOOSE);
    const hasLooseLower = patient.lowerTeeth.some(t => t === ToothStatus.LOOSE);
    return hasLooseUpper || hasLooseLower;
  }).length;
};

export const countPermanentTotal = (patients: Patient[]): number => {
  return countToothByStatus(patients, ToothStatus.PERMANENT);
};

export const getPatientStatusSummary = (patient: Patient): PatientStatusSummary => {
  const allTeeth = [...patient.upperTeeth, ...patient.lowerTeeth];
  
  return {
    normal: allTeeth.filter(t => t === ToothStatus.NORMAL).length,
    loose: allTeeth.filter(t => t === ToothStatus.LOOSE).length,
    fallen: allTeeth.filter(t => t === ToothStatus.FALLEN).length,
    permanent: allTeeth.filter(t => t === ToothStatus.PERMANENT).length,
    needsReview: allTeeth.some(t => t === ToothStatus.LOOSE),
  };
};

export const getGlobalStatistics = (patients: Patient[]) => {
  return {
    reviewNeeded: countReviewNeeded(patients),
    permanentTotal: countPermanentTotal(patients),
    normalTotal: countToothByStatus(patients, ToothStatus.NORMAL),
    looseTotal: countToothByStatus(patients, ToothStatus.LOOSE),
    fallenTotal: countToothByStatus(patients, ToothStatus.FALLEN),
    totalPatients: patients.length,
    totalTeeth: patients.length * 20,
  };
};

export const animateNumber = (
  target: number,
  duration: number = 1000,
  callback: (value: number) => void
): void => {
  const startTime = performance.now();
  const startValue = 0;
  
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(startValue + (target - startValue) * easeProgress);
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};
