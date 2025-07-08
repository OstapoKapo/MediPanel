import './style.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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