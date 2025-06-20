import './style.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='homePage'>
      <Link href="/logIn"><button>Log In</button></Link>
      <Link href="/signUp"><button>Sign Up</button></Link>
    </div>
  );
}  