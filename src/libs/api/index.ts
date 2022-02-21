import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _axios from 'axios';
import { API_BASE_URL } from '@constants';
import type { IApiErrorResponse } from './types';

const axios = _axios.create({
  baseURL: `${API_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiSuccess = (res: AxiosResponse) => {
  return res.data;
};

const handleApiError = (err: AxiosError) => {
  let errorMessagge = '';

  // request was manually cancelled in a `useEffect` hook
  if (_axios.isCancel(err)) {
    return; // fail silently
  }

  if (err.response) {
    const apiError: IApiErrorResponse = err.response.data;
    // client received an error response (5xx, 4xx)
    console.error(
      `Backend returned code ${err.code}:${apiError.statusCode}, ` +
        `body was: ${apiError.message}`,
      'data:',
      apiError.data,
    );
    errorMessagge = apiError.message;
  } else if (err.request) {
    // client never received a response, or request never left
    console.error('An error occurred:', err.message);
  } else {
    // anything else
    console.error('Well, that was unexpected:', err.message);
  }

  throw (
    errorMessagge ||
    "We couldn't complete your request. Please try again or check your internet connection."
  );
};

export const Api = {
  getCancelTokenSource: () => _axios.CancelToken.source(),
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axios
      .get(endpoint, { ...config })
      .then(handleApiSuccess)
      .catch(handleApiError),
  post: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axios.post(endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
  put: <T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axios.put(endpoint, data, config).then(handleApiSuccess).catch(handleApiError),
  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axios.delete(endpoint, config).then(handleApiSuccess).catch(handleApiError),
};
