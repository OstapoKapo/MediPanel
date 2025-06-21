'use client';
import Link from 'next/link';
import './style.scss';
import { useState } from 'react';
import { registerUser } from '@/api/auth';
import { ICreateUser } from '@/types';
import { parseAxiosError } from '@/utils/parseAxiosError';
import { useRouter } from 'next/navigation';


const SignUpPage = () => {
    const router = useRouter();

    const [user, setUser] = useState<ICreateUser>({
        email: '',
        password: '',
        role: 'viewer' as 'viewer' | 'admin' | 'superadmin',
    });
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
           const newUser = await registerUser(user);
           if (newUser) {
               router.push('/logIn');
           }
        }catch (error: unknown) {
           let errorMessage = parseAxiosError(error);
            setError(errorMessage); 
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <div className='signUpPage'>
            <form action="post" onSubmit={handleSubmit}>
                <input name='email' type="email" value={user.email} onChange={handleChange} placeholder="Email" />
                <input name='password' type="password" value={user.password} onChange={handleChange} placeholder="Password" />
                <select name="role" id="" value={user.role} onChange={handleChange}>
                    <option value="viewer">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                </select>
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
            </form>
            <Link href="/logIn">Already have acc</Link>
        </div>
    );
}

export default SignUpPage;