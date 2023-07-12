import { ReactNode } from "react";

export default interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    isFullWidth?: boolean;
    children?: ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}
