export enum ToothStatus {
  NORMAL = 'NORMAL',
  LOOSE = 'LOOSE',
  FALLEN = 'FALLEN',
  PERMANENT = 'PERMANENT',
}

export const TOOTH_STATUS_ORDER: ToothStatus[] = [
  ToothStatus.NORMAL,
  ToothStatus.LOOSE,
  ToothStatus.FALLEN,
  ToothStatus.PERMANENT,
];

export interface ToothStatusInfo {
  code: ToothStatus;
  label: string;
  color: string;
  needReview: boolean;
}

export interface Patient {
  id: string;
  nickname: string;
  age: number;
  avatar: string;
  upperTeeth: ToothStatus[];
  lowerTeeth: ToothStatus[];
}

export type StatusFilter = 'ALL' | ToothStatus;

export interface FilterOption {
  value: StatusFilter;
  label: string;
}

export interface PatientStatusSummary {
  normal: number;
  loose: number;
  fallen: number;
  permanent: number;
  needsReview: boolean;
  needsFocus: boolean;
}

export type ToothRow = 'upper' | 'lower';

export interface ToastMessage {
  id: string;
  type: 'info' | 'warn' | 'success';
  text: string;
}
