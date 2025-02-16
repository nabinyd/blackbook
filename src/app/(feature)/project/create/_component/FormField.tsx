import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    textarea?: boolean;
    required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    textarea = false,
    required = false
}) => {
    const InputComponent = textarea ? Textarea : Input;

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <InputComponent
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${textarea ? 'min-h-[100px]' : ''}`}
            />
            
        </div>
    );
};