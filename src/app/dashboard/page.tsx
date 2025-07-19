'use client';
import { useEffect, useRef, useState } from 'react';
import './style.scss';
import Image from 'next/image';
import Header from '@/app/components/layout/header/header';
import { motion } from 'framer-motion';
import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkAuth, logOutUser } from '@/api/auth';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {

  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [highlightY, setHighlightY] = useState<number>(0);
  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: checkAuth,
    retry: false,
  });

  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRefs = [
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null),
    useRef<HTMLLIElement>(null)
  ];

  useEffect(() => {
    const btn = buttonRefs[activeIndex].current;
    if (btn) {
      setHighlightY(btn.offsetTop);
    }
    console.log(currentPage);
  }, [activeIndex]);

  useEffect(() => {
    if (!isLoading && !data) router.push('/');
  }, [isLoading, data, router]);

  const logOutMutation = useMutation({
        mutationFn: logOutUser,
        onSuccess: async (data) => {
          await queryClient.setQueryData(['session'], null);
          router.push('/');
        },
        onError: (error: unknown) => {
            alert('Error logging out. Please try again later.');
        },
        retry: false,
        retryDelay: 1000
    })


  const handleLogOut = async () => {
    logOutMutation.mutate();
  }

  return (
    <div className="dashboardPage">
      <Header />
      <div className="dashboardPage__container">
        <aside className="dashboardPage__asideBar">
          <nav className="dashboardPage__nav">
            <ul className="dashboardPage__navList">
              <motion.div
                ref={highlightRef}
                className="dashboardPage__highlight"
                initial={{y:150}}
                animate={{ y: highlightY, height: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 } }
              />
              <li
                ref={buttonRefs[0]}
                onClick={() => {
                  setCurrentPage('home');
                  setActiveIndex(0);
                }}
                className="dashboardPage__list">
                    <Image style={{ marginTop: '-3px' }} src='/icon/home.svg' alt='home image' width={25} height={25}/>
                    HOME
                </li>
              <li
                ref={buttonRefs[1]}
                onClick={() => {
                  setCurrentPage('appointments');
                  setActiveIndex(1);
                }}
                className="dashboardPage__list">
                    <Image style={{ marginTop: '-3px' }} src='/icon/appointment.svg' alt='appointments image'  width={30} height={30}/>
                    APPOINTMENTS
                </li>
              <li
                ref={buttonRefs[2]}
                onClick={() => {
                  setCurrentPage('staf');
                  setActiveIndex(2);
                }}
                className="dashboardPage__list">
                    <Image style={{ marginTop: '0' }} src='/icon/staf.svg' alt='doctors image'  width={30} height={30}/>
                    STAF
                </li>
              <li
                ref={buttonRefs[3]}
                onClick={() => {
                  setCurrentPage('statistics');
                  setActiveIndex(3);
                }}
                className="dashboardPage__list">
                    <Image style={{ marginTop: '0px' }} src='/icon/statistics.svg' alt='statistics image'  width={30} height={25}/>
                    STATISTICS
                </li>
              <li
                ref={buttonRefs[4]}
                onClick={() => {
                  setCurrentPage('settings');
                  setActiveIndex(4);
                }}
                className="dashboardPage__list">
                    <Image style={{ marginTop: '0px' }} src='/icon/panel-settings.svg' alt='settings image'  width={30} height={30}/>
                    SETTINGS
                </li>
            </ul>
          </nav>
          <ul className='dashboardPage__asideButtons'>
                <li className='dashboardPage__list'>
                    <Image src={"/icon/add.svg"} alt='add image' width={30} height={30}/>
                    Add User
                </li>
                <li onClick={handleLogOut} className='dashboardPage__list'>
                    <Image src={"/icon/log-out.svg"} alt='log out image' width={30} height={30}/>
                    Log Out
                </li>
            </ul>
        </aside>
        <main>{/* Тут контент залежно від currentPage */}</main>
      </div>
    </div>
  );
};

export default DashboardPage;
