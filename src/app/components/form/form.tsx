'use client'
import './form.scss'
import Image from 'next/image';
import { loginUser, verifyPassword } from "@/api/auth";
import { IChangePassword } from "@/types";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';
import { AxiosError } from 'axios';


const Form = ({type}: {type: 'login' | 'verifyPassword'}) => {

    const router = useRouter();
    
    const captchaRef = useRef<ReCAPTCHA>(null);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<{email: string, password: string}>({
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
            localStorage.removeItem('loginAttempts');
            console.log(data.isVerified);
            if(!data.isVerified){
                router.push('/verifiedPassword');
            }else{
                router.push('/dashboard');
            }
        },
        onError: (error: AxiosError) => {
            const attempts = parseInt(localStorage.getItem('loginAttempts') ?? '0') + 1;
            localStorage.setItem('loginAttempts', attempts.toString());
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

    const handleLogin = async () => {
         const attempts = parseInt(localStorage.getItem('loginAttempts') ?? '0');
            let captchaToken = null;
            if (attempts >= 3) {
                try {
                    if (captchaRef.current) {
                        captchaToken = await captchaRef.current.executeAsync();
                        captchaRef.current.reset();
                    }
                } catch {
                    setError('Please complete the CAPTCHA');
                    return;
                }
            }
            loginMutation.mutate({
                email: loginData.email,
                password: loginData.password,
                recaptchaToken: captchaToken
            });
    }

    const handleVerifyPassword =  () => {
        if(passwordData.newPassword !== passwordData.confirmPassword){
                setError('Passwords do not match');
                return;
        }
        console.log(passwordData.confirmPassword);
        verifyPasswordMutation.mutate(passwordData.newPassword);
    }

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if(type === 'login'){
            void handleLogin();
        }else{
            handleVerifyPassword();
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
                    maxLength={50} 
                    placeholder="Example@email.com" />
                    <label htmlFor="password">Password:</label>
                    <div className='form__password'>
                        <input 
                        className='form__input-password' 
                        onChange={handleChange} 
                        value={loginData.password} 
                        name='password' 
                        type={showPassword ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => { setShowPassword(!showPassword); }} src={showPassword ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                <ReCAPTCHA 
                    sitekey={'6LftUpYrAAAAAIF4fkEqXoYpihaG2XMZIqjGy4y6'}
                    ref={captchaRef}
                    size="invisible"
                />
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
                        type={showPassword ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => {setShowPassword(!showPassword)}} src={showPassword ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Change Password</button>
            </form>
            )
    )
}

export default Form;