// api.ts
import axios from 'axios';

const apiUrl = `${process.env.LOGIN_API_URL}`;

export async function authenticateUser(authToken: string, username: string, password: string) {
  const credentials = `${username}:${password}`;
  const encodedCredentials = btoa(credentials); // Encode to base64

  const requestBody = {
    credType: 'authorization',
    creds: `Basic ${encodedCredentials}`,
    schemas: ['urn:ietf:params:scim:schemas:oracle:idcs:HTTPAuthenticator'],
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Return the API response
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
}
