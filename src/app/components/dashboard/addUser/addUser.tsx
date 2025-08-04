'use client'
import { useState } from 'react';
import './addUser.scss';
import { ICreateUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/api/auth';
import { parseAxiosError } from '@/utils/parseAxiosError';
import toast from 'react-hot-toast';


const AddUserBlock = () => {

    const [userData, setUserData] = useState<ICreateUser>({
        email: '',
        role: 'viewer'
    })
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({...prev, [name]: value,}));
    };

    const createUserMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            setUserData({ email: '', role: 'viewer' });
            setError(null);
            toast.success('User created successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = parseAxiosError(error);
            toast.error(errorMessage);
        }     
    })

    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        createUserMutation.mutate(userData);
    }

    return(
        <div className="addUserBlock">
            <div className='addUserBlock__header'>
                <h1>Add User</h1>
            </div>
            <section>
                <form action="post" onSubmit={handleSubmit}>
                    <div className='addUserBlock__inputs'>
                        <label htmlFor="email">Email:</label>
                        <input
                            className='addUserBlock__input'
                            onChange={handleChange}
                            value={userData.email}
                            name='email' type="email"
                            placeholder="Example@email.com"
                            maxLength={50} />
                        <label htmlFor="role">Role:</label>
                        <select name="role">
                            <option value="admin">admin</option>
                            <option value="doctor">doctor</option>
                            <option value="viewer">viewer</option>
                        </select>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <button type="submit">SAVE</button>
                </form>
            </section>
        </div>
    )
}

export default AddUserBlock;
