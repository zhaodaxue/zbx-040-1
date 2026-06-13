import React, { useEffect, useState } from 'react';
import { Stethoscope, Smile } from 'lucide-react';
import { Patient } from '../types';
import { countReviewNeeded, countPermanentTotal, animateNumber } from '../modules/statistics';

interface TopBarProps {
  patients: Patient[];
}

export const TopBar: React.FC<TopBarProps> = ({ patients }) => {
  const [reviewCount, setReviewCount] = useState(0);
  const [permanentCount, setPermanentCount] = useState(0);

  const reviewNeeded = countReviewNeeded(patients);
  const permanentTotal = countPermanentTotal(patients);

  useEffect(() => {
    animateNumber(reviewNeeded, 1000, setReviewCount);
  }, [reviewNeeded]);

  useEffect(() => {
    animateNumber(permanentTotal, 1200, setPermanentCount);
  }, [permanentTotal]);

  return (
    <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 text-white py-6 px-8 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Smile className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display text-3xl tracking-wide">乳牙换牙进度墙</h1>
              <p className="text-primary-100 text-sm mt-1">儿童齿科 · 健康成长</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="w-12 h-12 bg-orange-400/30 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-orange-200" />
              </div>
              <div>
                <p className="text-primary-100 text-xs font-medium">本日待复查</p>
                <p className="font-display text-4xl leading-none">
                  {reviewCount}
                  <span className="text-lg ml-1 text-primary-100">人</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="w-12 h-12 bg-green-400/30 rounded-full flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.5 2 6 4.5 6 8c0 2.5 1 4.5 2 6v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6c1-1.5 2-3.5 2-6 0-3.5-2.5-6-6-6z"
                    fill="#4CAF50"
                    stroke="#81C784"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div>
                <p className="text-primary-100 text-xs font-medium">已萌出恒牙</p>
                <p className="font-display text-4xl leading-none">
                  {permanentCount}
                  <span className="text-lg ml-1 text-primary-100">颗</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
