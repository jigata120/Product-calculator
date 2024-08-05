 
import { axiosInstance, createAuthenticatedAxiosInstance, refreshTokenFunc,   } from './Api';

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/token/', { email, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const getAuthenticatedAxiosInstance = () => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('No access token found');
  }
  return createAuthenticatedAxiosInstance();
};

export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  console.log("LOGEDOUT");
};


 

export async function fetchDataWithToken() {
    try {
      const accessToken = localStorage.getItem('access');
  
      if (!accessToken) {
        console.log('Token Needed');
      }
  
      const response = await fetch('http://localhost:8000/api/user-profile/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 401) {
      
        await refreshTokenFunc();
  
        const newAccessToken = localStorage.getItem('access');
  
        if (!newAccessToken) {
          throw new Error('Failed to refresh token');
        }
  
        // Retry the request
        const retryResponse = await fetch('http://localhost:8000/api/user-profile/', {
          headers: {
            'Authorization': `Bearer ${newAccessToken}`,
          },
        });
  
        if (!retryResponse.ok) {
          throw new Error('Failed to fetch data after token refresh');
        }
  
        return await retryResponse.json();
      } else if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., notify user, redirect to login
      // Optionally clear tokens and redirect to login page
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }
  

 
// export function logout() {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh'); 
//     console.log('LOGEDOUT');
//   }