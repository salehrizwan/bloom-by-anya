import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#303A2B] text-[#FBF8F1] text-xs py-2 px-4 border-b border-[#303A2B]/10 tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:block text-[#D8C8A5] text-[11px] uppercase tracking-widest font-medium">
          Handmade in {BRAND_CONFIG.location}
        </div>
        <div className="mx-auto text-center font-normal flex items-center justify-center gap-2">
          <span>Beautiful Gifts, Thoughtfully Handmade</span>
          <span className="text-[#D8C8A5]" aria-hidden="true">·</span>
          <span className="text-[#D8C8A5]">Delivery Available Across Sialkot</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <a
            href={BRAND_CONFIG.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D8C8A5] transition-colors"
          >
            @{BRAND_CONFIG.contact.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
};
