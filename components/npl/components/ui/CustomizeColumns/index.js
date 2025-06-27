
const CustomizeColumns = ({ checkedColumns, onCheckboxChange }) => {
    return (
        <div className="max-h-80 overflow-y-auto">
            <ul className="flex flex-col">
                {checkedColumns?.map((item) => (
                    <li
                        key={item.id}
                        className="inline-flex items-center gap-x-2 py-1.5 px-4 text-sm font-medium bg-white text-gray-800"
                    >
                        <div className="relative flex items-start w-full">
                            <div className="flex items-center h-5">
                                <input
                                    id={`list-group-item-checkbox-${item.id}`}
                                    type="checkbox"
                                    className="w-5 h-5 cursor-pointer"
                                    checked={item.checked}
                                    onChange={() => onCheckboxChange(item.id)} 
                                    disabled={item.disabled}
                                />
                            </div>
                            <label
                                htmlFor={`list-group-item-checkbox-${item.id}`}
                                className="ml-3.5 block text-sm font-normal text-gray-600 cursor-pointer"
                            >
                                {item.name}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default CustomizeColumns