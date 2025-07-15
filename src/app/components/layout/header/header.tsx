import Image from 'next/image';
import './header.scss';

const Header = () => {
    return (
        <header className='header'>
            <h1 className='header__tittle'>MEDIPANEL</h1>
            <div className='header__links'>
                <Image className='header__icon'  src="/icon/notification.svg" alt="Dashboard Growth" width={50} height={50} />
                <Image className='header__icon' src="/icon/settings.svg" alt="Dashboard Growth" width={40} height={40} />
                <Image className={"header__profile"} src="/icon/profile.svg" alt="Dashboard Growth" width={60} height={60} />
            </div>
        </header>
    )
}

export default Header;