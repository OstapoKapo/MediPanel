import './style.scss';
import { checkAuthSSR } from '@/api/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import LoginForm from './components/loginForm/loginForm';

export default async function LogInPage() {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') || '';

    let result = { user: null, error: null };
    try {
        result = await checkAuthSSR(cookieHeader);
    } catch (error) {
     console.error('Auth check failed:', error);
    }

    if (result.user) {
        redirect('/dashboard');
    }

    return (
        <main className="logInPage">
            <h1>Welcome to <span>MEDIPANEL</span></h1>
            <LoginForm />
        </main>
    );
}
