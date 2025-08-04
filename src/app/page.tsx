import './style.scss';
import { checkAuthSSR, checkVerificationSSR } from '@/api/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Form from './components/form/form';

export default async function LogInPage() {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') ?? '';
    const csrfToken = headersList.get('X-CSRF-Token') ?? '';
    let authResult = { user: null, error: null };
    try {
        authResult = await checkAuthSSR(cookieHeader, csrfToken);
    } catch (error) {
     console.error('Auth check failed:', error);
    }

    if (authResult.user) {
        redirect('/dashboard');
    }

    let verifyResult = { userId: null, error: null };
    try {
        verifyResult = await checkVerificationSSR(cookieHeader);
    } catch (error) {
        console.error('Verify token check failed:', error);
    }

    if(verifyResult.userId) {
        redirect('/verified');
    }

    return (
        <main className="logInPage">
            <h1>Welcome to <span>MEDIPANEL</span></h1>
            <Form type='login'/>
        </main>
    );
}
