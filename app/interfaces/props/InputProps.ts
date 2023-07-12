import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

export default interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues><div>,
    errors: FieldErrors,
    disabled?: boolean
}
