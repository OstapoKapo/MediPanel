import { headers } from 'next/headers';
import Form from '../components/form/form';
import './page.scss';
import { checkAuthSSR } from '@/api/auth';
import { redirect } from 'next/navigation';

const VerifiedPage = async () => {

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
        <main className='verifiedPage'>
            <h1>Change Your <span>Password</span></h1>
            <Form type='changePassword'/>
        </main>
    )
}

export default VerifiedPage;