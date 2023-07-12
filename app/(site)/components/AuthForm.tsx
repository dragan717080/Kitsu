'use client';

import { useState, useEffect, FC, useCallback } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';
import Input from './inputs/Input';
import Button from './Button';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AuthForm: FC = () => {

  type Variant = 'LOGIN' | 'REGISTER';

  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    const v = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(v);
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    } else {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          callback?.error && toast.error('Invalid Credentials');
          if (callback?.ok && !callback?.error) {
            toast.success('Logged In');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
      axios.post('/api/login', data)
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        callback?.error && toast.error('Invalid Credentials');
        if (callback?.ok && !callback?.error) {
          toast.success('Logged In');
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false));
  }

  const inputFields = [
    { id: 'name', label: 'Name', type: 'text', showOnRegister: true },
    { id: 'email', label: 'Email address', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' }
  ];

  useEffect(() => {
    console.log(session);
/*     if (session?.status === 'authenticated') {
      router.push('/users')
    } */
  }, [session?.status, router]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {inputFields.map((field) => (
            (!field.showOnRegister || variant === 'REGISTER') && (
              <Input
                key={field.id}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                {...field}
              />
            )
          ))}
          <div>
            <Button disabled={isLoading} isFullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 row-v">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex row-h text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {[
              { icon: BsGithub, provider: 'github' },
              { icon: BsGoogle, provider: 'google' }
            ].map((action, index) => (
              <AuthSocialButton
                key={index}
                icon={action.icon}
                onClick={() => socialAction(action.provider)}
              />
            ))}
          </div>
        </div>
        <div
          className="row-h gap-2 text-sm mt-6 px-2 text-gray-500"
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="pointer text-sky-500"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm;
