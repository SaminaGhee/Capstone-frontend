import React from 'react';
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import '../../style/app.scss';
import '../../style/main.scss';


const NavBar = ({ user, setUser, logOut }) => {
    const login = useGoogleLogin({
        onSuccess: (coderesponse) => setUser(coderesponse),
        onError: (error) => console.log('Login Failed', error)
    });

    const handleLogOut = () => {
        googleLogout();
        setUser(null);
    }

    return (
        <div className="navbar">
            <div className='navbar-left'>
                <h1>PILLOWLOVE</h1>
                </div>
            <div className='NavBar-right'>
            {/* <h3>Login with Google to view cart</h3> */}
            <br />
            <br />
            {user ? (
                <div>
                <p>Hello! {user.name}</p>
                <br />
                <br />
                <button onClick={handleLogOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google</button>
            )}
            </div>
        </div>
    );
    
}
export default NavBar;