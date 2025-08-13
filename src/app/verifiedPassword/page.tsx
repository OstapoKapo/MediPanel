import { headers } from 'next/headers';
import Form from '../components/form/form';
import './page.scss';
import { checkAuthSSR, checkVerificationSSR } from '@/api/auth';
import { redirect } from 'next/navigation';

const VerifiedPasswordPage = async () => {

    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') ?? '';
    const csrfToken = headersList.get('X-CSRF-Token') ?? '';    
    const authResult = { user: null, error: null };
    try {
        authResult.user = await checkAuthSSR(cookieHeader, csrfToken);
    } catch (error) {
        console.error('Auth check failed:', error);
    }
    
    if (authResult.user) {
        redirect('/dashboard');
    }

    try {
        await checkVerificationSSR(cookieHeader);
    } catch (error) {
        console.error('Verify token check failed:', error);
        redirect('/'); 
    }

    return (
        <main className='verifiedPage'>
            <h1>Change Your <span>Password</span></h1>
            <Form type='verifyPassword'/>
        </main>
    )
}

export default VerifiedPasswordPage;