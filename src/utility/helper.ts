import cookies from 'react-cookies';
import { Store } from 'react-notifications-component';

/**
 * common function to set cookies in react application
 * @param name name of cookie
 * @param value value to set in cookie
 */
export const setCookies = (name: string, value: any) => {
    cookies.save(name, value, { path: import.meta.env.VITE_PUBLIC_URL });
};

/**
 * 
 * @param name find cookies by name
 * @returns 
 */
export const getCookies = (name: string) => {
    return cookies.load(name);
};

/**
 * 
 * @param name Delete cookies by name
 * @returns 
 */
export const deleteCookies = (name: string) => {
    cookies.remove(name, { path: import.meta.env.VITE_PUBLIC_URL });
};

/**
 * 
 * @returns reutn the saved auth token
 */
export const getToken = () => {
    return cookies.load(import.meta.env.VITE_BUSINESS + 'token');
};

/**
 * delete the browser data when user logs out 
 */
export const logoutUser = () => {
    deleteCookies(import.meta.env.VITE_BUSINESS + 'token');
    deleteCookies(import.meta.env.VITE_BUSINESS + 'refreshToken');
    localStorage.clear();
    window.location.href = import.meta.env.VITE_PUBLIC_URL
};


/**
 * 
 * @param type type of toast notification
 * @param message message to show in toast notification
 */
export const showToastNotificatoin = (type: 'success' | 'danger' | 'info' | 'default' | 'warning', message: string) => {
    Store.addNotification({
        message: message,
        type: type,
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
};


