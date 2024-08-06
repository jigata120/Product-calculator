export async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;  
    }
}


export async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in GET request:', error);
        throw error;  
    }
}


export async function putData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in PUT request:', error);
        throw error; 
    }
}


export async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

 
        const result = response.status === 204 ? null : await response.json();
        return result;
    } catch (error) {
        console.error('Error in DELETE request:', error);
        throw error; 
    }
}



import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});


 

const createAuthenticatedAxiosInstance = () => {
  const accessToken = localStorage.getItem('access');
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export { axiosInstance, createAuthenticatedAxiosInstance };

export async function refreshTokenFunc( ) {
    let refreshToken =localStorage.getItem('refresh')

    const response = await fetch('http://localhost:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
  
    if (response.ok) {
      const data = await response.json();
      // Save new access token and refresh token if applicable
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      return data;
    } else {
      throw new Error('Unable to refresh token');
    }
  }
  