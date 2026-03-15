import axiosInstance from 'src/services/http.service';
import type { TodayWeatherType } from '../types/today-weather';
import type { WeatherForecast } from '../types/weather-forecast';

const getTodayWeather = async (city?: string, lat?: number, lon?: number) => {
  const params = {
    ...(lat && lon ? { lat, lon } : city ? { q: city } : {}),
    appid: import.meta.env.VITE_API_KEY,
    units: 'metric',
  };

  const response = await axiosInstance.get('/weather', { params });
  return response as unknown as TodayWeatherType;
};

const getWeatherForecast = async (city?: string, lat?: number, lon?: number) => {
  const params = {
    ...(lat && lon ? { lat, lon } : city ? { q: city } : {}),
    appid: import.meta.env.VITE_API_KEY,
    units: 'metric',
  };

  const response = await axiosInstance.get('/forecast', { params });
  return response as unknown as WeatherForecast;
};

const getWeatherCityPhoto = async (city: string) => {
  const data = await axiosInstance.get(import.meta.env.VITE_PEXELS_API_URL, {
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
    params: {
      query: `${city} city`,
      per_page: 1,
    },
  });
  const photos = data.photos;
  return photos[0]?.src?.landscape || ('' as unknown as string);
}

export { getTodayWeather, getWeatherForecast,  getWeatherCityPhoto };
