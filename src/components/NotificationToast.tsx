import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#303A2B] text-[#FBF8F1] rounded-2xl shadow-xl border border-[#D8C8A5]/40 text-xs font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#D8C8A5] shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
