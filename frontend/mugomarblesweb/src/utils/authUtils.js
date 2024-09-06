import { jwtDecode } from 'jwt-decode';

export const parseJwt = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (e) {
    console.error('Error parsing JWT:', e);
    return {};
  }
};
