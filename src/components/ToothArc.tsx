import React, { useState } from 'react';
import { ToothStatus } from '../types';
import { ToothIcon } from './ToothIcon';
import { getToothPositionName, getToothLabel, calculateArcPosition } from '../modules/toothRenderer';

interface ToothArcProps {
  upperTeeth: ToothStatus[];
  lowerTeeth: ToothStatus[];
}

interface HoverInfo {
  row: 'upper' | 'lower';
  index: number;
  status: ToothStatus;
  x: number;
  y: number;
}

export const ToothArc: React.FC<ToothArcProps> = ({ upperTeeth, lowerTeeth }) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const centerX = 300;
  const centerY = 200;
  const radius = 140;

  const renderArcRow = (teeth: ToothStatus[], isUpper: boolean) => {
    return teeth.map((status, index) => {
      const { x, y, rotation } = calculateArcPosition(
        index,
        teeth.length,
        radius,
        centerX,
        centerY,
        isUpper
      );

      return (
        <div
          key={`${isUpper ? 'upper' : 'lower'}-${index}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 cursor-pointer z-10"
          style={{
            left: x,
            top: y,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverInfo({
              row: isUpper ? 'upper' : 'lower',
              index,
              status,
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
            });
          }}
          onMouseLeave={() => setHoverInfo(null)}
        >
          <ToothIcon status={status} size={44} showAnimation={true} />
        </div>
      );
    });
  };

  return (
    <div className="relative" style={{ width: 600, height: 420 }}>
      <svg
        className="absolute inset-0"
        width={600}
        height={420}
        viewBox="0 0 600 420"
      >
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius * 0.6} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="#E3F2FD"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d={`M ${centerX - radius} ${centerY + 20} A ${radius} ${radius * 0.6} 0 0 0 ${centerX + radius} ${centerY + 20}`}
          fill="none"
          stroke="#E8F5E9"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <text x={centerX} y={centerY - radius - 10} textAnchor="middle" className="fill-gray-400 text-sm font-medium">
          上排牙齿
        </text>
        <text x={centerX} y={centerY + radius + 50} textAnchor="middle" className="fill-gray-400 text-sm font-medium">
          下排牙齿
        </text>
      </svg>

      {renderArcRow(upperTeeth, true)}
      {renderArcRow(lowerTeeth, false)}

      {hoverInfo && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-xl pointer-events-none animate-scale-in"
          style={{
            left: hoverInfo.x,
            top: hoverInfo.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="font-medium">
            {getToothPositionName(hoverInfo.row, hoverInfo.index)}
          </div>
          <div className="text-gray-300 text-xs">
            状态：{getToothLabel(hoverInfo.status)}
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-800 rotate-45"
          />
        </div>
      )}
    </div>
  );
};
