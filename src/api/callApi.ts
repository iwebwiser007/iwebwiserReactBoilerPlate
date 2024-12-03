import axios, { AxiosRequestConfig, AxiosResponse, AxiosProgressEvent } from 'axios';
import { getToken } from '../utility/helper';

interface CallAPIOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Restrict to common HTTP methods
    data?: any; // Data to be sent with the request
    multipart?: boolean; // Flag to handle multipart/form-data
    progressEvent?: (progressEvent: AxiosProgressEvent) => void; // Progress event handler for uploads
}

/**
 * This function calls APIs via axios.
 *
 * @param {string} url - The API endpoint URL.
 * @param {CallAPIOptions} options - API options like method, data, and multipart flag.
 * @returns {Promise<any>} - The API response.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const callApi = async <T = any>(url: string, options: CallAPIOptions): Promise<T> => {
    const token = getToken();

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': options?.multipart ? 'multipart/form-data' : 'application/json',
        },
        method: options.method,
        data: options?.data && options?.multipart
            ? options.data
            : options?.data
                ? JSON.stringify(options.data)
                : undefined,
        ...(options.multipart && options.progressEvent && { onUploadProgress: options.progressEvent }),
    };

    try {
        const response: AxiosResponse<T> = await axios(url, axiosConfig);
        console.log(response)
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            throw new Error(response.data as unknown as string);
        }
    } catch (error: any) {
        console.error('API Call Error:', error.message || error);
        throw new Error(error.response?.data?.message || 'An unknown error occurred.');
    }
};
