'use client'
import './form.scss'
import Image from 'next/image';
import { loginUser, verifyPassword } from "@/api/auth";
import { IChangePassword, ILoginUser } from "@/types";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Form = ({type}: {type: 'login' | 'verifyPassword'}) => {

    const router = useRouter();

    const [show, setShow] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginUser>({
        email: '',
        password: ''
    });
    const [passwordData, setPasswordData] = useState<IChangePassword>({
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if(!data.isVerified){
                router.push('/verified');
            }else{
                router.push('/dashboard');
            }
        },
        onError: (error: unknown) => {
            const errorMessage = parseAxiosError(error);
            setError(errorMessage);
        },
        retry: false,
        retryDelay: 1000
    });

    const verifyPasswordMutation = useMutation({
        mutationFn: verifyPassword,
        onSuccess: () => {
            router.push('/dashboard');
        },
        onError: (error: unknown) => {
            const errorMessage = parseAxiosError(error);
            setError(errorMessage);
        },
        retry: false,
        retryDelay: 1000
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if(type === 'login'){
            loginMutation.mutate(loginData);
        }else{
            if(passwordData.newPassword !== passwordData.confirmPassword){
                setError('Passwords do not match');
                return;
            }
            verifyPasswordMutation.mutate(passwordData.newPassword);
        }
    }

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(type === 'verifyPassword'){
            setPasswordData(prev => ({...prev, [name]: value}));
        }else{
            setLoginData(prev => ({...prev, [name]: value,}));
        }
    };

    return (
        type === 'login' ? ( 
            <form action="post" className='form' onSubmit={handleSubmit}>
                <div className='form__inputs'>
                    <label htmlFor="email">Email:</label>
                    <input 
                    className='form__input' 
                    onChange={handleChange} 
                    value={loginData.email} 
                    name='email' type="email" 
                    placeholder="Example@email.com" />
                    <label htmlFor="password">Password:</label>
                    <div className='form__password'>
                        <input 
                        className='form__input-password' 
                        onChange={handleChange} 
                        value={loginData.password} 
                        name='password' 
                        type={show ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => { setShow(!show); }} src={show ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Log In</button>
            </form> ) : 
            (
            <form className='form' action="post" onSubmit={handleSubmit}>
                <div className='form__inputs'>
                    <label htmlFor="newPassword">New Password:</label>
                    <input 
                    className='form__input' 
                    onChange={handleChange} 
                    value={passwordData.newPassword} 
                    name='newPassword' type="text" 
                    placeholder="test12312" />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className='form__password'>
                        <input 
                        className='form__input-password' 
                        onChange={handleChange} 
                        value={passwordData.confirmPassword} 
                        name='confirmPassword' 
                        type={show ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => setShow(!show)} src={show ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Change Password</button>
            </form>
            )
    )
}

export default Form;