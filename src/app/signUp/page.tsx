'use client';
import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { registerUser } from '@/api/auth';
import { ICreateUser } from '@/types';
import { parseAxiosError } from '@/utils/parseAxiosError';
import { useRouter } from 'next/navigation';


const SignUpPage = () => {
    const router = useRouter();

    const [show, setShow] = useState<boolean>(false);
    const [signupData, setSignupData] = useState<ICreateUser>({
        email: '',
        password: '',
        role: 'viewer' as 'viewer' | 'admin' | 'superadmin',
    });
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
           const newUser = await registerUser(signupData);
           if (newUser) {
               router.push('/logIn');
           }
        }catch (error: unknown) {
            const errorMessage = parseAxiosError(error);
            setError(errorMessage); 
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <div className='signUpPage'>
            <h1>Sign Up</h1>
            <form action="post" onSubmit={handleSubmit}>
                <div className='signUpPage__inputs'>
                    <label htmlFor="email">Email:</label>
                    <input 
                    className='signUpPage__input' 
                    name='email' 
                    type="email" 
                    value={signupData.email} 
                    onChange={handleChange} 
                    placeholder="Example@email.com" />
                    <label htmlFor="password">Password:</label>
                    <div className='signUpPage__password'>
                        <input 
                        className='signUpPage__input-password' 
                        onChange={handleChange} 
                        value={signupData.password} 
                        name='password' 
                        type={show ? 'text' : 'password'} placeholder="test12312" />
                        <Image onClick={() => setShow(!show)} src={show ? "/icon/eye-active.svg" : "/icon/eye-inactive.svg"} alt="Show Password" width={30} height={30} />
                    </div>
                    <label htmlFor="role">Role:</label>
                    <select name="role" id="" value={signupData.role} onChange={handleChange}>
                        <option value="viewer">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <Link href="/logIn">Already have an account? Log in</Link>
        </div>
    );
}

export default SignUpPage;