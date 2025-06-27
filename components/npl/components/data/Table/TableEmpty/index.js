import { cn } from '@/utils/cn';
import { FiDatabase } from 'react-icons/fi';

const TableEmpty = ({ colSpan, message,className }) => {
    console.log("colSpan",colSpan);
    
    return (
        <tr>
            <td colSpan={colSpan} className="px-5 py-10 text-center">
                <div className={cn('flex flex-col items-center justify-center space-y-4 h-[50vh]',className)}>
                    <FiDatabase    className="text-gray-500 w-24 h-24 opacity-75" />
                    <p className="text-gray-600 text-lg font-medium">{message}</p>
                </div>
            </td>
        </tr>
    );
};

export default TableEmpty;
