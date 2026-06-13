import { Patient, ToothStatus } from '../types';

const { NORMAL, LOOSE, FALLEN, PERMANENT } = ToothStatus;

export const mockPatients: Patient[] = [
  {
    id: 'p001',
    nickname: '小明',
    age: 7,
    avatar: '#4A90D9',
    upperTeeth: [
      NORMAL, NORMAL, LOOSE, PERMANENT, NORMAL,
      NORMAL, PERMANENT, NORMAL, LOOSE, NORMAL
    ],
    lowerTeeth: [
      PERMANENT, NORMAL, LOOSE, FALLEN, NORMAL,
      NORMAL, FALLEN, PERMANENT, NORMAL, LOOSE
    ],
  },
  {
    id: 'p002',
    nickname: '小红',
    age: 8,
    avatar: '#F06292',
    upperTeeth: [
      PERMANENT, PERMANENT, NORMAL, NORMAL, LOOSE,
      FALLEN, PERMANENT, NORMAL, NORMAL, PERMANENT
    ],
    lowerTeeth: [
      PERMANENT, PERMANENT, PERMANENT, NORMAL, NORMAL,
      LOOSE, NORMAL, PERMANENT, FALLEN, NORMAL
    ],
  },
  {
    id: 'p003',
    nickname: '小强',
    age: 6,
    avatar: '#66BB6A',
    upperTeeth: [
      NORMAL, NORMAL, NORMAL, NORMAL, NORMAL,
      LOOSE, NORMAL, NORMAL, NORMAL, NORMAL
    ],
    lowerTeeth: [
      NORMAL, LOOSE, NORMAL, NORMAL, NORMAL,
      NORMAL, NORMAL, LOOSE, NORMAL, NORMAL
    ],
  },
  {
    id: 'p004',
    nickname: '小美',
    age: 9,
    avatar: '#AB47BC',
    upperTeeth: [
      PERMANENT, PERMANENT, PERMANENT, PERMANENT, NORMAL,
      LOOSE, FALLEN, PERMANENT, PERMANENT, NORMAL
    ],
    lowerTeeth: [
      PERMANENT, PERMANENT, PERMANENT, PERMANENT, PERMANENT,
      NORMAL, LOOSE, PERMANENT, PERMANENT, FALLEN
    ],
  },
  {
    id: 'p005',
    nickname: '小华',
    age: 7,
    avatar: '#FF7043',
    upperTeeth: [
      NORMAL, LOOSE, FALLEN, PERMANENT, NORMAL,
      NORMAL, LOOSE, NORMAL, PERMANENT, NORMAL
    ],
    lowerTeeth: [
      PERMANENT, FALLEN, LOOSE, NORMAL, NORMAL,
      PERMANENT, NORMAL, LOOSE, FALLEN, PERMANENT
    ],
  },
  {
    id: 'p006',
    nickname: '小丽',
    age: 8,
    avatar: '#26A69A',
    upperTeeth: [
      PERMANENT, NORMAL, LOOSE, PERMANENT, PERMANENT,
      NORMAL, FALLEN, LOOSE, PERMANENT, NORMAL
    ],
    lowerTeeth: [
      PERMANENT, PERMANENT, LOOSE, FALLEN, PERMANENT,
      NORMAL, LOOSE, PERMANENT, NORMAL, PERMANENT
    ],
  },
];

export const toothStatusList = [
  { code: ToothStatus.NORMAL, label: '未松动', color: '#FAFAFA', needReview: false },
  { code: ToothStatus.LOOSE, label: '已松动', color: '#FF9800', needReview: true },
  { code: ToothStatus.FALLEN, label: '已脱落', color: '#9E9E9E', needReview: false },
  { code: ToothStatus.PERMANENT, label: '恒牙已萌出', color: '#4CAF50', needReview: false },
];
