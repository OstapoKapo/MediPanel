import { redirect } from 'next/navigation';
import DashboardContainer from '../components/dashboard/container/container';
import { checkAuthSSR } from '@/api/auth';
import { headers } from 'next/headers';

const DashboardPage = async () => {
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie') ?? '';
    const csrfToken = headersList.get('X-CSRF-Token') ?? '';

    let result = { user: null, error: null };
    try {
        result = await checkAuthSSR(cookieHeader, csrfToken);
    } catch (error) {
      console.error('Auth check failed:', error);
    }

    if (!result.user) {
        redirect('/');
    }
  return (
    <DashboardContainer />
  );
}; 

export default DashboardPage;
