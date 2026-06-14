import { ToothStatus, TOOTH_STATUS_ORDER, ToothRow, Patient } from '../types';

export const getNextToothStatus = (status: ToothStatus): ToothStatus | null => {
  const idx = TOOTH_STATUS_ORDER.indexOf(status);
  if (idx === -1 || idx === TOOTH_STATUS_ORDER.length - 1) return null;
  return TOOTH_STATUS_ORDER[idx + 1];
};

export const getStatusOrder = (status: ToothStatus): number => {
  return TOOTH_STATUS_ORDER.indexOf(status);
};

export const canAdvanceTo = (
  current: ToothStatus,
  target: ToothStatus
): boolean => {
  return getNextToothStatus(current) === target;
};

export interface AdvanceResult {
  success: boolean;
  newStatus?: ToothStatus;
  reason?: 'already_final' | 'skip_not_allowed' | 'regress_not_allowed';
}

export const tryAdvanceTooth = (
  current: ToothStatus,
  target: ToothStatus
): AdvanceResult => {
  const currentIdx = getStatusOrder(current);
  const targetIdx = getStatusOrder(target);

  if (currentIdx === -1 || targetIdx === -1) {
    return { success: false, reason: 'skip_not_allowed' };
  }

  if (targetIdx === currentIdx) {
    return { success: false, reason: 'skip_not_allowed' };
  }

  if (targetIdx < currentIdx) {
    return { success: false, reason: 'regress_not_allowed' };
  }

  if (targetIdx - currentIdx > 1) {
    return { success: false, reason: 'skip_not_allowed' };
  }

  return { success: true, newStatus: target };
};

export const advanceTooth = (current: ToothStatus): AdvanceResult => {
  const next = getNextToothStatus(current);
  if (!next) {
    return { success: false, reason: 'already_final' };
  }
  return { success: true, newStatus: next };
};

export const hasConsecutiveLoose = (
  teeth: ToothStatus[],
  minCount: number = 3
): boolean => {
  let consecutive = 0;
  for (const t of teeth) {
    if (t === ToothStatus.LOOSE) {
      consecutive++;
      if (consecutive >= minCount) return true;
    } else {
      consecutive = 0;
    }
  }
  return false;
};

export const getConsecutiveLooseCount = (teeth: ToothStatus[]): number => {
  let maxConsecutive = 0;
  let current = 0;
  for (const t of teeth) {
    if (t === ToothStatus.LOOSE) {
      current++;
      maxConsecutive = Math.max(maxConsecutive, current);
    } else {
      current = 0;
    }
  }
  return maxConsecutive;
};

export const patientNeedsFocus = (patient: Patient): boolean => {
  const upperMax = getConsecutiveLooseCount(patient.upperTeeth);
  const lowerMax = getConsecutiveLooseCount(patient.lowerTeeth);
  return upperMax >= 3 || lowerMax >= 3;
};

export const getAdvanceMessage = (result: AdvanceResult): string => {
  if (result.success && result.newStatus) {
    const labels: Record<ToothStatus, string> = {
      [ToothStatus.NORMAL]: '未松动',
      [ToothStatus.LOOSE]: '已松动',
      [ToothStatus.FALLEN]: '已脱落',
      [ToothStatus.PERMANENT]: '恒牙已萌出',
    };
    return `已更新为「${labels[result.newStatus]}」`;
  }
  switch (result.reason) {
    case 'already_final':
      return '已是恒牙状态，无法继续推进';
    case 'skip_not_allowed':
      return '不能跳级推进，请按顺序更新';
    case 'regress_not_allowed':
      return '不能回退状态';
    default:
      return '操作失败';
  }
};

export const applyToothChange = (
  patient: Patient,
  row: ToothRow,
  index: number,
  newStatus: ToothStatus
): Patient => {
  const teethKey = row === 'upper' ? 'upperTeeth' : 'lowerTeeth';
  const newTeeth = [...patient[teethKey]];
  newTeeth[index] = newStatus;
  return {
    ...patient,
    [teethKey]: newTeeth,
  };
};
