'use client';
import './container.scss';
import Image from 'next/image';
import Header from '@/app/components/layout/header/header';
import AddUserBlock from '../addUser/addUser';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkAuthCSR, logOutUser } from '@/api/auth';


const DashboardContainer = () => {

    const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [highlightY, setHighlightY] = useState<number>(0);

  const highlightRef = useRef<HTMLDivElement>(null);
  const buttonRefs = [
    useRef<HTMLLIElement>(null),
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

  const logOutMutation = useMutation({
        mutationFn: logOutUser,
        onSuccess: async () => {
          await queryClient.setQueryData(['session'], null);
          router.push('/');
        },
        onError: () => {
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
              <motion.div
                ref={highlightRef}
                className="dashboardPage__highlight"
                initial={{y:150}}
                animate={{ y: highlightY, height: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 } }
              />
          <nav className="dashboardPage__nav">
            <ul className="dashboardPage__navList">
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
                <li
                  ref={buttonRefs[5]}
                  onClick={() => {
                  setCurrentPage('addUser');
                  setActiveIndex(5);
                }} className='dashboardPage__list'>
                    <Image src={"/icon/add.svg"} alt='add image' width={30} height={30}/>
                    Add User
                </li>
                <li onClick={handleLogOut} className='dashboardPage__list'>
                    <Image src={"/icon/log-out.svg"} alt='log out image' width={30} height={30}/>
                    Log Out
                </li>
            </ul>
        </aside>
        <main>
          <AddUserBlock />
        </main>
      </div>
      <Toaster position='top-right' reverseOrder={false}/>
    </div>
    )
}

export default DashboardContainer;