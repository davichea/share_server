import FormButton from "../../form/FormButton";

export const DialogButtonFooter = ({ actions, onAction }) => (
    <div className="w-full flex items-center justify-center px-0 pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
            {actions.map(({ label, icon: Icon, action }) => (
                <FormButton
                    key={action}
                    color={`${label == 'Okay' ? 'primary' : 'white'}`}
                    className="min-w-[120px] px-4 border flex justify-around items-start"
                    onClick={() => onAction(action)}
                >
                    {Icon && <Icon className="w-4 h-4 self-end" />}
                    {label}
                </FormButton>
            ))}
        </div>
    </div>
);