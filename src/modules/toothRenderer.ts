import { ToothStatus } from '../types';
import { toothStatusList } from '../data/mockData';

export const getToothColor = (status: ToothStatus): string => {
  const statusInfo = toothStatusList.find(s => s.code === status);
  return statusInfo?.color || '#FAFAFA';
};

export const getToothLabel = (status: ToothStatus): string => {
  const statusInfo = toothStatusList.find(s => s.code === status);
  return statusInfo?.label || '未知';
};

export const isToothLoose = (status: ToothStatus): boolean => {
  return status === ToothStatus.LOOSE;
};

export const renderToothSVG = (
  status: ToothStatus,
  size: number = 24,
  showAnimation: boolean = true
): string => {
  const color = getToothColor(status);
  const isLoose = isToothLoose(status);
  const animationClass = isLoose && showAnimation ? 'animate-pulse-slow' : '';
  
  const strokeColor = status === ToothStatus.NORMAL ? '#E0E0E0' : color;
  
  return `
    <svg 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      class="${animationClass}"
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z"
        fill="${color}"
        stroke="${strokeColor}"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M8 12c.5 1 1.5 1.5 2.5 1.5M16 12c-.5 1-1.5 1.5-2.5 1.5"
        stroke="${strokeColor}"
        stroke-width="1"
        stroke-linecap="round"
        opacity="0.5"
      />
    </svg>
  `;
};

export const getToothPositionName = (row: 'upper' | 'lower', index: number): string => {
  const names = ['中切牙', '侧切牙', '尖牙', '第一乳磨牙', '第二乳磨牙'];
  const side = index < 5 ? '左侧' : '右侧';
  const toothIndex = index < 5 ? index : 9 - index;
  return `${row === 'upper' ? '上排' : '下排'}${side}${names[toothIndex]}`;
};

export const calculateArcPosition = (
  index: number,
  total: number,
  radius: number,
  centerX: number,
  centerY: number,
  isUpper: boolean
): { x: number; y: number; rotation: number } => {
  const startAngle = isUpper ? Math.PI * 0.85 : Math.PI * 0.15;
  const endAngle = isUpper ? Math.PI * 0.15 : Math.PI * 0.85;
  const angleRange = endAngle - startAngle;
  const angleStep = angleRange / (total - 1);
  const angle = startAngle + index * angleStep;
  
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  const rotation = (angle * 180) / Math.PI + (isUpper ? 90 : -90);
  
  return { x, y, rotation };
};
