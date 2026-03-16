import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const responseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      let errorMessage: string = 'An error occurred';
      if (error.response) {
        const data = error.response.data as { message?: string };
        errorMessage = data.message || errorMessage;
      } else if (error.request) {
        errorMessage = error.message;
      } else {
        console.error('Error', error.message);
      }
      console.error(errorMessage);
      return errorMessage;
    },
  );
};

export default responseInterceptor;
