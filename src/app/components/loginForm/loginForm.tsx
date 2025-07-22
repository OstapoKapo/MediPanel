'use client'
import Image from 'next/image';
import { loginUser } from "@/api/auth";
import { ILoginUser } from "@/types";
import { parseAxiosError } from "@/utils/parseAxiosError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LoginForm = () => {
    
    const queryClient =  useQueryClient();
    const router = useRouter();


    const [show, setShow] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginUser>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null);

     const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
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


     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({...prev, [name]: value,}));
    };



    return (
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
    )
}

export default LoginForm;