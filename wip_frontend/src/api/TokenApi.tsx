// tokenApi.ts
import axios from 'axios';

const tokenUrl = `${process.env.TOKEN_API_URL}`;
const clientId = `${process.env.TOKEN_CLIENT_ID}`;
const clientSecret = `${process.env.TOKEN_CLIENT_SECRET}`;

export async function generateBearerToken() {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('scope', 'urn:opc:idm:__myscopes__');

  try {
    const response = await axios.post(tokenUrl, data, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token; // Return the access token
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
}
