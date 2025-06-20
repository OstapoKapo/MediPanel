'use client';
import Link from 'next/link';
import './style.scss';
import { useState } from 'react';
import { registerUser } from '@/api/auth';


const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<'viewer' | 'admin' | 'superadmin'>('viewer');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            email,
            password,
            role
        }
        try{
           const newUser = await registerUser(user);
           console.log(newUser);
        }catch(err) {
            console.error("Error during registration:", err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        }
    }

    return(
        <div className='signUpPage'>
            <form action="post" onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <select name="role" id="" value={role} onChange={(e) => setRole(e.target.value as 'viewer' | 'admin' | 'superadmin')}>
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