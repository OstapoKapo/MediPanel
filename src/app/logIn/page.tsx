'use client'
import Link from 'next/link';
import Image from 'next/image';
import './style.scss';
import { useState } from 'react';
import { ILoginUser } from '@/types';
import { loginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { parseAxiosError } from '@/utils/parseAxiosError';

const LogInPage = () => {
    const router = useRouter();

    const [show, setShow] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginUser>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            console.log(loginData);
            const identifyUser = await loginUser(loginData);
            if(identifyUser){
                router.push('/dashboard');
            }
        }catch (error: unknown) {
            const erroMessage = parseAxiosError(error);
            setError(erroMessage);
        }
    }

    return(
        <main className='logInPage'>
            <h1>Log In</h1>
            <form action="post" onSubmit={handleSubmit}>
                <div className='logInPage__inputs'>
                    <label htmlFor="email">Email:</label>
                    <input className='logInPage__input' onChange={handleChange} value={loginData.email} name='email' type="email" placeholder="Example@email.com" />
                    <label htmlFor="password">Password:</label>
                    <div className='logInPage__password'>
                        <input className='logInPage__input-password' onChange={handleChange} value={loginData.password} name='password' type={show ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => setShow(!show)} src={show ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />
                    </div>
                    <p>{error}</p>
                </div>
                <button type="submit">Log In</button>
            </form>
            <Link href="/signUp">Don't have an account? Sign up</Link>
        </main>
    );
}

export default LogInPage;