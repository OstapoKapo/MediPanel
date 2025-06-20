import Link from 'next/link';
import './style.scss';

const LogInPage = () => {
    return(
        <div className='logInPage'>
            <form action="post">
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log In</button>
            </form>
            <Link href="/signUp">Dont have acc</Link>
        </div>
    );
}

export default LogInPage;