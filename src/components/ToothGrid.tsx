import React from 'react';
import { ToothStatus } from '../types';
import { ToothIcon } from './ToothIcon';
import { getToothPositionName, getToothLabel } from '../modules/toothRenderer';

interface ToothGridProps {
  upperTeeth: ToothStatus[];
  lowerTeeth: ToothStatus[];
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
  interactive?: boolean;
  onToothClick?: (row: 'upper' | 'lower', index: number) => void;
}

const sizeConfig = {
  small: { tooth: 16, gap: 2, label: 'text-[10px]' },
  medium: { tooth: 24, gap: 4, label: 'text-xs' },
  large: { tooth: 40, gap: 6, label: 'text-sm' },
};

export const ToothGrid: React.FC<ToothGridProps> = ({
  upperTeeth,
  lowerTeeth,
  size = 'medium',
  showLabels = false,
  interactive = false,
  onToothClick,
}) => {
  const config = sizeConfig[size];

  const renderRow = (teeth: ToothStatus[], row: 'upper' | 'lower') => (
    <div
      className="flex justify-center items-end"
      style={{ gap: `${config.gap}px` }}
    >
      {teeth.map((status, index) => (
        <div key={index} className="flex flex-col items-center">
          <ToothIcon
            status={status}
            size={config.tooth}
            onClick={interactive ? () => onToothClick?.(row, index) : undefined}
            title={getToothPositionName(row, index) + '：' + getToothLabel(status)}
          />
          {showLabels && (
            <span className={`${config.label} text-gray-500 mt-1 whitespace-nowrap`}>
              {index + 1}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="text-center">
        <span className="text-xs text-gray-400 font-medium">上排</span>
        {renderRow(upperTeeth, 'upper')}
      </div>
      <div className="border-t border-dashed border-gray-200 my-1" />
      <div className="text-center">
        {renderRow(lowerTeeth, 'lower')}
        <span className="text-xs text-gray-400 font-medium">下排</span>
      </div>
    </div>
  );
};
