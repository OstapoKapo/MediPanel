'use client';
import Link from 'next/link';
import './style.scss';
import { useState } from 'react';


const SignUpPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<'viewer' | 'admin' | 'superadmin'>('viewer');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            email,
            password,
            role
        }
        try{
           
        }catch(err) {
            console.error("Error during registration:", err);
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
            </form>
            <Link href="/logIn">Already have acc</Link>
        </div>
    );
}

export default SignUpPage;