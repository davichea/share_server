import { cn } from "@/utils/cn";
const TabSwitcher = ({ statusList, activeTab, onTabChange, statusColors }) => {
    return (
        <div className="flex rounded-md border h-[45px]">
            {statusList?.map((status) => (
                <button
                    key={status.status_id}
                    type="button"
                    onClick={() => onTabChange(status.status_id)}
                    className={cn(
                        'flex-1 py-3 px-6 self-center font-medium text-center whitespace-nowrap',
                        activeTab == status.status_id
                            ? `rounded-md ${statusColors[status.status_id]} text-white`
                            : 'text-gray-500 hover:text-gray-800'
                    )}
                >
                    {status.status_name}
                </button>
            ))}
        </div>
    );
};

export default TabSwitcher;
