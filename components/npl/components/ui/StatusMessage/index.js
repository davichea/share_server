import React from 'react';
import { CiCircleCheck, CiWarning } from 'react-icons/ci';
import { IoInformationCircleOutline } from 'react-icons/io5';

const StatusMessage = ({ responseApi, idKey }) => {
 console.log('responseApi',responseApi)
  
  const getMessageAndIcon = () => {
    const status = Number(responseApi.statusCode);
    switch (status) {
      case 200:
        return {
          color: 'green-500',
          message: 'Success',
          Icon: CiCircleCheck,
        };
      case 403:
      case 100:
        return {
          color: 'blue-500',
          message: 'Information',
          Icon: IoInformationCircleOutline,
        };
      case 401:
      case 404:
      case 409:
      case 503:
        return {
          color: 'yellow-500',
          message: 'ERROR [ER-DB-SEV1-CUS-001]',
          Icon: CiWarning,
        };
      default:
        return {
          color: 'blue-500',
          message: 'Information',
          Icon: IoInformationCircleOutline,
        };
    }
  };

  const { message, color, Icon } = getMessageAndIcon();

  return (
    <div className="py-5 min-h-[100px] gap-3 flex flex-col items-center">
      {/* Status Icon */}
      <Icon className={`text-${color} h-24 w-24`} />

      {/* Status Message */}
      <p className="self-center text-2xl font-semibold">{message}</p>
      <p className="text-center">{responseApi.message}</p>
      {idKey && <p className="self-center text-xl font-semibold">{responseApi[idKey]}</p>}
    </div>
  );
};

export default StatusMessage;
