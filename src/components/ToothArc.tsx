import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ToothStatus } from '../types';
import { ToothIcon } from './ToothIcon';
import { getToothPositionName, getToothLabel, calculateArcPosition } from '../modules/toothRenderer';

interface ToothArcProps {
  upperTeeth: ToothStatus[];
  lowerTeeth: ToothStatus[];
  interactive?: boolean;
  onToothClick?: (row: 'upper' | 'lower', index: number) => void;
}

interface HoverInfo {
  row: 'upper' | 'lower';
  index: number;
  status: ToothStatus;
  anchorRect: DOMRect;
}

const BASE_WIDTH = 600;
const BASE_HEIGHT = 420;
const TOOTH_SIZE = 44;
const SAFE_MARGIN = 12;

export const ToothArc: React.FC<ToothArcProps> = ({
  upperTeeth,
  lowerTeeth,
  interactive = false,
  onToothClick,
}) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(BASE_WIDTH);
  const [tooltipSize, setTooltipSize] = useState<{ w: number; h: number }>({ w: 180, h: 60 });

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const centerX = 300;
  const centerY = 200;
  const radius = 140;

  const scale = containerWidth > 0 ? Math.min(containerWidth / BASE_WIDTH, 1) : 1;
  const displayWidth = BASE_WIDTH * scale;
  const displayHeight = BASE_HEIGHT * scale;

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const updateWidth = () => {
      const w = el.clientWidth;
      setContainerWidth(w > 0 ? w : BASE_WIDTH);
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hoverInfo || !tooltipRef.current) return;
    const tip = tooltipRef.current;
    const readSize = () => {
      const r = tip.getBoundingClientRect();
      setTooltipSize({ w: r.width, h: r.height });
    };
    readSize();
    const observer = new ResizeObserver(readSize);
    observer.observe(tip);
    const raf = requestAnimationFrame(readSize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [hoverInfo]);

  const tooltipPosition = useMemo(() => {
    if (!hoverInfo) return null;
    const rect = hoverInfo.anchorRect;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { w: tipW, h: tipH } = tooltipSize;

    let placeAbove = true;
    let y = rect.top - SAFE_MARGIN;
    if (y - tipH < SAFE_MARGIN) {
      placeAbove = false;
      y = rect.bottom + SAFE_MARGIN;
    }
    if (placeAbove) {
      y = rect.top - SAFE_MARGIN;
    } else {
      y = rect.bottom + SAFE_MARGIN;
    }

    let x = rect.left + rect.width / 2;
    const halfTip = tipW / 2;
    if (x - halfTip < SAFE_MARGIN) {
      x = SAFE_MARGIN + halfTip;
    } else if (x + halfTip > vw - SAFE_MARGIN) {
      x = vw - SAFE_MARGIN - halfTip;
    }

    if (placeAbove && y - tipH < SAFE_MARGIN) {
      placeAbove = false;
      y = rect.bottom + SAFE_MARGIN;
    }
    if (!placeAbove && y + tipH > vh - SAFE_MARGIN) {
      placeAbove = true;
      y = rect.top - SAFE_MARGIN;
    }

    return { x, y, placeAbove };
  }, [hoverInfo, tooltipSize]);

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
      const key = `${isUpper ? 'upper' : 'lower'}-${index}`;
      const isHovered = hoveredKey === key;
      const effectiveScale = isHovered ? 1.25 / Math.max(scale, 0.01) : 1;

      return (
        <div
          key={key}
          className={`absolute z-10 ${interactive ? 'cursor-pointer' : ''}`}
          style={{
            left: x,
            top: y,
            width: TOOTH_SIZE,
            height: TOOTH_SIZE,
            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${effectiveScale})`,
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          onMouseEnter={(e) => {
            setHoveredKey(key);
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverInfo({
              row: isUpper ? 'upper' : 'lower',
              index,
              status,
              anchorRect: rect,
            });
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverInfo((prev) =>
              prev ? { ...prev, anchorRect: rect } : null
            );
          }}
          onMouseLeave={() => {
            setHoveredKey(null);
            setHoverInfo(null);
          }}
          onClick={() => {
            if (interactive) {
              onToothClick?.(isUpper ? 'upper' : 'lower', index);
            }
          }}
        >
          <ToothIcon status={status} size={TOOTH_SIZE} showAnimation={true} />
        </div>
      );
    });
  };

  const arrowStyle = useMemo((): React.CSSProperties => {
    if (!tooltipPosition) return {};
    if (tooltipPosition.placeAbove) {
      return {
        left: '50%',
        transform: 'translateX(-50%) rotate(45deg)',
        bottom: '-3px',
        top: 'auto',
      };
    } else {
      return {
        left: '50%',
        transform: 'translateX(-50%) rotate(45deg)',
        top: '-3px',
        bottom: 'auto',
      };
    }
  }, [tooltipPosition]);

  return (
    <div ref={containerRef} className="w-full relative">
      <div
        className="relative mx-auto overflow-visible"
        style={{
          width: displayWidth,
          height: displayHeight,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <svg
            className="absolute inset-0 pointer-events-none"
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
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
            <text
              x={centerX}
              y={centerY - radius - 10}
              textAnchor="middle"
              className="fill-gray-400 text-sm font-medium"
            >
              上排牙齿
            </text>
            <text
              x={centerX}
              y={centerY + radius + 50}
              textAnchor="middle"
              className="fill-gray-400 text-sm font-medium"
            >
              下排牙齿
            </text>
          </svg>

          {renderArcRow(upperTeeth, true)}
          {renderArcRow(lowerTeeth, false)}
        </div>
      </div>

      {hoverInfo && tooltipPosition && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-xl pointer-events-none animate-scale-in"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: tooltipPosition.placeAbove
              ? 'translate(-50%, -100%)'
              : 'translate(-50%, 0)',
            maxWidth: '80vw',
            minWidth: '120px',
          }}
        >
          <div className="font-medium whitespace-nowrap">
            {getToothPositionName(hoverInfo.row, hoverInfo.index)}
          </div>
          <div className="text-gray-300 text-xs mt-0.5">
            状态：{getToothLabel(hoverInfo.status)}
          </div>
          <div
            className="absolute w-2 h-2 bg-gray-800"
            style={arrowStyle}
          />
        </div>
      )}
    </div>
  );
};
