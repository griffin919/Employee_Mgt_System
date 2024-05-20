
import { ref } from "vue"; // Import ref for reactive variables
import { Dropdown } from 'flowbite';

export default function useAuth() {


    const setAccessTokenCookie = (token) => {
        console.log("Token222",token);
        const options = {
          maxAge: 24 * 60 * 60 * 1000, // Expires in 1 day
          secure: true, // Only transmitted over HTTPS
          httpOnly: true, // Not accessible by client-side scripts
          sameSite: 'None', // Strict same-site policy
        };
        const cookie = useCookie('accessToken', token, options);
        cookie.value = token;
        console.log("🚀 ~ setAccessTokenCookie ~ document.cookie :", document.cookie )
      };

      const getCookie = (name) => {
        return document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${name}=`))
          ?.split('=')[1];
      };

      const setRefreshTokenCookie = (token) => {
        console.log("Token",token);
        const options = {
          path: '/',
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Expires in 1 day
          secure: true, // Only transmitted over HTTPS
          httpOnly: true, // Not accessible by client-side scripts
          sameSite: 'strict', // Strict same-site policy
        };
        document.cookie = `refreshToken=${token}; ${Object.entries(options)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ')}`;
      };


  return {
    setAccessTokenCookie,
    setRefreshTokenCookie,
    getCookie
  };
}
         