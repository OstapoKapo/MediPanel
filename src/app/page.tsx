'use client'
import './style.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { checkAuth } from '@/api/auth';
import { useRouter } from 'next/navigation';
import {useQuery} from '@tanstack/react-query';

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    {
      queryKey: ['session'],
      queryFn: checkAuth,
      retry: false,
    }
);

  useEffect(() => {
    if (data && !isLoading) {
      router.push('/dashboard');
    }
  }, [data, router]);

  if(isLoading && data === undefined) return <p>Loading...</p>


  return (
    <main className='homePage'>
      <section className='homePage__content'> 
        <h1>Welcome, to the <span>MediPanel</span></h1>
          <Link href="/logIn">Log In</Link>
          <Link href="/signUp">Sign Up</Link>
      </section>
      <figure className="homePage__img">
        <Image src="/background/hospital-location.png" alt="Decoration" width={500} height={500}  />
      </figure>
    </main>
  );
}  