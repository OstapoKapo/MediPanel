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
        authResult.user = await checkAuthSSR(cookieHeader, csrfToken);
    } catch (error) {
     console.error('Auth check failed:', error);
    }

    if (authResult.user) {
        redirect('/dashboard');
    }

    let verifyResult = { verifyToken: null, error: null };
    try {
        verifyResult.verifyToken = await checkVerificationSSR(cookieHeader);
    } catch (error) {
        console.error('Verify token check failed:', error);
    }

    if(verifyResult.verifyToken) {
        redirect('/verifiedPassword');
    }

    return (
        <main className="logInPage">
            <h1>Welcome to <span>MEDIPANEL</span></h1>
            <Form type='login'/>
        </main>
    );
}
