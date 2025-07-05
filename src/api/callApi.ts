// src/lib/api.ts
import { API_ENDPOINT } from './constant';
import { getCookies, getToken, logoutUser, setCookies } from '../utility/helper';

export interface IApiErrorResponse {
    message: string;
    error?: string;
    statusCode: number;
}

interface RefreshTokenResponse {
    accessToken: string;
}

type AuthExcludedEndpoint = 'login' | 'forgot' | 'sign-up' | 'reset-password' | 'logout';
const authExcludedUrls: AuthExcludedEndpoint[] = ['login', 'forgot', 'sign-up', 'reset-password', 'logout'];

type CallAPIOptions<D = any> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
    headers?: HeadersInit;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    priority?: RequestPriority;
    signal?: AbortSignal;
    body?: BodyInit;
    multipart?: boolean
} & (
        | { method: 'GET' | 'HEAD'; data?: Record<string, any> }
        | { method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'; data?: D; multipart?: boolean }
    );

export const callApi = async <T = any, D = any>(
    endpoint: string,
    options: CallAPIOptions<D>
): Promise<T> => {
    const url = new URL(`${endpoint}`);
    const headers = new Headers(options.headers);

    // Add authentication if required
    if (!isAuthExcluded(endpoint)) {
        const token = getToken();
        if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    // Handle GET data as query params
    if (['GET', 'HEAD'].includes(options.method) && options.data) {
        Object.entries(options.data).forEach(([key, value]) => {
            if (value !== undefined) url.searchParams.append(key, String(value));
        });
    }

    // Handle request body
    let body: BodyInit | undefined;
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method) && options.data) {
        if (options.multipart && options.data instanceof FormData) {
            body = options.data;
        } else {
            headers.set('Content-Type', 'application/json');
            body = JSON.stringify(options.data);
        }
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
        body,
        referrerPolicy: 'strict-origin-when-cross-origin',
    };

    try {
        const response = await fetch(url.toString(), fetchOptions);
        return await handleResponse<T>(response);
    } catch (error) {
        return handleError<T>(error, url.toString(), fetchOptions);
    }
};

// Response handler with proper typing
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) throw response;

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
        return response.json();
    }
    if (contentType?.includes('text/')) {
        return response.text() as Promise<T>;
    }
    if (contentType?.includes('octet-stream') || contentType?.includes('image/')) {
        return response.blob() as Promise<T>;
    }
    return response.arrayBuffer() as Promise<T>;
};

// Enhanced error handling
const handleError = async <T>(error: unknown, url: string, config: RequestInit): Promise<T> => {
    // Network errors
    if (error instanceof TypeError) {
        throw new Error('Network error - failed to connect to server');
    }

    // HTTP errors
    if (error instanceof Response) {
        // Handle token refresh

        if (error.status === 401 && !isAuthExcluded(url)) {
            try {
                const newToken = await refreshToken();
                const retryConfig = {
                    ...config,
                    headers: new Headers(config.headers),
                };
                retryConfig.headers.set('Authorization', `Bearer ${newToken}`);

                const retryResponse = await fetch(url, retryConfig);
                return handleResponse<T>(retryResponse);
            } catch (refreshError) {
                const err = refreshError as IApiErrorResponse
                if (err) {
                    logoutUser();
                }
                throw new Error('Session expired - please login again');
            }
        } else {
            const errorData: IApiErrorResponse = await error.json();
            throw errorData
        }



    }

    throw new Error('Unknown error occurred');
};

// Refresh token implementation
const refreshToken = async (): Promise<string> => {
    try {
        const deviceToken = getCookies(`${process.env.NEXT_PUBLIC_APP_NAME}deviceToken`);
        const refreshToken = getCookies(`${process.env.NEXT_PUBLIC_APP_NAME}refreshToken`);

        const response = await callApi<RefreshTokenResponse>(
            `${API_ENDPOINT.auth}refresh-token`,
            {
                method: 'POST',
                data: {
                    refreshToken,
                    deviceToken: deviceToken || 'default-device-token',
                },
            }
        );

        setCookies(`${process.env.NEXT_PUBLIC_APP_NAME}token`, response.accessToken);
        return response.accessToken;
    } catch (error) {
        // logoutUser();
        throw new Error('Failed to refresh session - please login again');
    }
};

// Auth exclusion check
const isAuthExcluded = (endpoint: string): boolean => {
    return authExcludedUrls.some(pattern => endpoint.includes(pattern));
};