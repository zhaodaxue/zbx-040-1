import { create } from 'zustand';
import { Patient, ToothRow, ToothStatus, ToastMessage } from '../types';
import { mockPatients } from '../data/mockData';
import {
  advanceTooth,
  applyToothChange,
  getAdvanceMessage,
  AdvanceResult,
} from '../modules/toothProgress';

export type ToastType = 'info' | 'warn' | 'success';

interface AppState {
  patients: Patient[];
  toasts: ToastMessage[];

  advanceToothStatus: (
    patientId: string,
    row: ToothRow,
    index: number
  ) => AdvanceResult;

  showToast: (text: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;

  resetToSeed: () => void;
}

const genId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useAppStore = create<AppState>((set, get) => ({
  patients: mockPatients.map((p) => ({
    ...p,
    upperTeeth: [...p.upperTeeth],
    lowerTeeth: [...p.lowerTeeth],
  })),
  toasts: [],

  advanceToothStatus: (patientId, row, index) => {
    const { patients, showToast } = get();
    const patient = patients.find((p) => p.id === patientId);
    if (!patient) {
      showToast('未找到患者', 'warn');
      return { success: false, reason: 'skip_not_allowed' };
    }
    const teethKey = row === 'upper' ? 'upperTeeth' : 'lowerTeeth';
    const current: ToothStatus = patient[teethKey][index];
    const result = advanceTooth(current);

    if (!result.success || !result.newStatus) {
      showToast(getAdvanceMessage(result), 'warn');
      return result;
    }

    const updated = applyToothChange(patient, row, index, result.newStatus);
    set({
      patients: patients.map((p) => (p.id === patientId ? updated : p)),
    });
    showToast(getAdvanceMessage(result), 'success');
    return result;
  },

  showToast: (text, type = 'info') => {
    const id = genId();
    const toast: ToastMessage = { id, type, text };
    set((s) => ({ toasts: [...s.toasts, toast] }));
    setTimeout(() => {
      get().dismissToast(id);
    }, 2400);
  },

  dismissToast: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },

  resetToSeed: () => {
    set({
      patients: mockPatients.map((p) => ({
        ...p,
        upperTeeth: [...p.upperTeeth],
        lowerTeeth: [...p.lowerTeeth],
      })),
    });
  },
}));
