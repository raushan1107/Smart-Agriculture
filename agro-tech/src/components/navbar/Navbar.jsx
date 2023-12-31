import './navbar.css'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [show, handleShow] = useState(false);
    const [username, setUsername] = useState('');

    // removing user from server
    const handleLogout = () => {
        fetch('http://localhost:4000/remuser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        setUsername('');
    }

    function truncate(str, n) {
        return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) handleShow(true);
            else handleShow(false);
        });
        async function getUsername() {
            const getUsername = await fetch('http://localhost:4000/username').then((res) => res.json());
            const shortUsername = truncate(getUsername, 10);
            if (getUsername !== "") setUsername(shortUsername);
        }
        getUsername();
        return () => {
            window.removeEventListener('scroll', null);
        };
    }, [])
    const login = <li><a className={`navbar__list ${show && 'nav-dark'}`} href='http://localhost:4000/login'>Login</a></li>
    const signup = <li><a className={`navbar__list ${show && 'nav-dark'}`} href='http://localhost:4000/signup'>SignUp</a></li>
    const printUser = <li className={`navbar__list ${show && 'nav-dark'}`}>{username}</li>
    const logOut = <li className={`navbar__list ${show ? 'nav-dark' : ''}`} onClick={() => handleLogout()}> Log out</ li>
    return (
        <nav id='navbar' className={`navbar-container ${show && 'nav-dark'}`}>
            <div className='logo'>
                <img src="/images/Logo.png" alt="logo" className={`logo-image`} />
                <h1>Agro-Tech</h1>
            </div>
            <div className='menu'>
                <ul className='menu-list'>
                    <li><a className={`navbar__list ${show && 'nav-dark'}`} href='http://localhost:3000/'>Home</a></li>
                    <li><a className={`navbar__list ${show && 'nav-dark'}`} href='http://localhost:3000/about'>About</a></li>
                    <li><a className={`navbar__list ${show && 'nav-dark'}`} href='http://localhost:3000/service'>Services</a></li>
                    {username === '' && login}
                    {username === '' && signup}
                    {username !== '' && printUser}
                    {username !== '' && logOut}
                </ul>
            </div>
        </nav>
    )
}