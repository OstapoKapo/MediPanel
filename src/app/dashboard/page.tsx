import { redirect } from 'next/navigation';
import DashboardContainer from '../components/dashboard/container/container';
import { checkAuthSSR } from '@/api/auth';
import { headers } from 'next/headers';

const DashboardPage = async () => {
    const headersList =  headers();
    const cookieHeader = headersList.get('cookie') ?? '';

    let result = { user: null, error: null };
    try {
        result = await checkAuthSSR(cookieHeader);
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
