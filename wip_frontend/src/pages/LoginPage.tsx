// LoginPage.tsx
import React, { useState , useEffect } from 'react';
import { authenticateUser } from '../api/LoginApi';
import { generateBearerToken } from '../api/TokenApi';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch the bearer token when the component mounts
    generateBearerToken()
      .then((token) => setAccessToken(token))
      .catch((error) => console.error('Token API Error:', error));
  }, []);

  const handleLogin = async () => {
    try {
      const response = await authenticateUser(accessToken, username, password);

      // Handle the API response and login success logic here
      console.log('API Response:', response);
    } catch (error) {
      // Handle errors and login error logic here
      console.error('API Error:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;