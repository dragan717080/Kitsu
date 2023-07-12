import { FC } from 'react';
import AuthSocialButtonProps from '@/app/interfaces/props/AuthSocialButtonProps';

const AuthSocialButton: FC<AuthSocialButtonProps> = ({icon, onClick}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
      "
    >
      {icon()}
    </button>
  )
}

export default AuthSocialButton;
