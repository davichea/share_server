import { saleDecisionEnum } from '@/components/npl/pages/compulsory-execution/routes/insert/components/SaleInformation';
import React from 'react';

const StatusBadge = ({ status }) => {
  const bgColor = {
    Success: 'bg-green-100',
    Fail: 'bg-red-100',
    'Follow-up': 'bg-yellow-100',
    Active: 'bg-green-100',
    Inactive: 'bg-red-100',
    Yes: 'bg-green-100',
    No: 'bg-red-100',
    [saleDecisionEnum.PERMIT] : 'bg-green-100',
    [saleDecisionEnum.SALE]: 'bg-red-100'
  };

  const textColor = {
    Success: 'text-green-500',
    Fail: 'text-red-500',
    'Follow-up': 'text-yellow-500',
    Active: 'text-green-500',
    Inactive: 'text-red-500',
    Yes: 'text-green-500',
    No: 'text-red-500',
    [saleDecisionEnum.PERMIT] : 'text-green-500',
    [saleDecisionEnum.SALE]: 'text-red-500'
  };

  const backgroundClass = bgColor[status];
  const textClass = textColor[status];

  return (
    <div
      className={`py-1.5 px-2.5 rounded-lg flex justify-center w-20 items-center gap-1 ${backgroundClass}`}
    >
      <span className={`text-xs font-bold ${textClass}`}>{status}</span>
    </div>
  );
};

export default StatusBadge;
