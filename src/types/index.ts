export enum ToothStatus {
  NORMAL = 'NORMAL',
  LOOSE = 'LOOSE',
  FALLEN = 'FALLEN',
  PERMANENT = 'PERMANENT',
}

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
}
