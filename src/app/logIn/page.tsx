'use client'
import Link from 'next/link';
import Image from 'next/image';
import './style.scss';
import { useEffect, useState } from 'react';
import { ILoginUser } from '@/types';
import { checkAuth, loginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { parseAxiosError } from '@/utils/parseAxiosError';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const LogInPage = () => {
    const router = useRouter();
    const queryClient =  useQueryClient();

    const [show, setShow] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginUser>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['session'],
        queryFn: checkAuth,
        retry: false,
    });

    useEffect(() => {
        if (data) {
            router.push('/dashboard');
        }
    }, [data, router]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({...prev, [name]: value,}));
    };

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['session'] });
            router.push('/dashboard');
        },
        onError: (error: unknown) => {
            const errorMessage = parseAxiosError(error);
            setError(errorMessage);
        },
        retry: false,
        retryDelay: 1000
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        mutation.mutate(loginData);
    }

    if(isLoading && data === undefined) return <p>Loading...</p>


    return(
        <main className='logInPage'>

            <h1>Log In</h1>
            <form action="post" onSubmit={handleSubmit}>
                <div className='logInPage__inputs'>
                    <label htmlFor="email">Email:</label>
                    <input 
                    className='logInPage__input' 
                    onChange={handleChange} 
                    value={loginData.email} 
                    name='email' type="email" 
                    placeholder="Example@email.com" />
                    <label htmlFor="password">Password:</label>
                    <div className='logInPage__password'>
                        <input 
                        className='logInPage__input-password' 
                        onChange={handleChange} 
                        value={loginData.password} 
                        name='password' 
                        type={show ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => setShow(!show)} src={show ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
                <button type="submit">Log In</button>
            </form>
            <Link href="/signUp">Don&apos;t have an account? Sign up</Link>
        </main>
    );
}

export default LogInPage;