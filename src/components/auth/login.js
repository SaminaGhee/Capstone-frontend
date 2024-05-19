import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        if (username === 'Admin' && password === 'Admin') {
            setLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };

    if (loggedIn) {
        return <Redirect to="/admin" />;

    }

    return (
        <div>
            <h2>Login</h2>
            <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

        </div>
    );
};

export default Login;