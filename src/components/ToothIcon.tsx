import React from 'react';
import { ToothStatus } from '../types';
import { getToothColor, isToothLoose } from '../modules/toothRenderer';

interface ToothIconProps {
  status: ToothStatus;
  size?: number;
  showAnimation?: boolean;
  onClick?: () => void;
  title?: string;
}

export const ToothIcon: React.FC<ToothIconProps> = ({
  status,
  size = 24,
  showAnimation = true,
  onClick,
  title,
}) => {
  const color = getToothColor(status);
  const isLoose = isToothLoose(status);
  const strokeColor = status === ToothStatus.NORMAL ? '#E0E0E0' : color;

  return (
    <div
      onClick={onClick}
      className={`inline-flex ${onClick ? 'cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          isLoose && showAnimation ? 'animate-pulse' : ''
        } ${onClick ? 'hover:scale-110 transition-transform' : ''}`}
        style={{ filter: isLoose && showAnimation ? 'drop-shadow(0 0 4px rgba(255, 152, 0, 0.6))' : 'none' }}
        pointerEvents="none"
      >
        {title && <title>{title}</title>}
        <path
          d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z"
          fill={color}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 12c.5 1 1.5 1.5 2.5 1.5M16 12c-.5 1-1.5 1.5-2.5 1.5"
          stroke={strokeColor}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
