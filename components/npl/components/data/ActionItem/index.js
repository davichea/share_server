
const ActionItem = ({ onClick, icon: Icon, text, iconColor = 'text-gray-700', textColor = 'text-sm font-medium' }) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
        >
            <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
            <span className={`text-sm font-medium ${textColor}`}>{text}</span>
        </div>
    );
};

export default ActionItem;
