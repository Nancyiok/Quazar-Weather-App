<script setup lang="ts">
import CityWeatherCard from './CityWeatherCard.vue';
import { getTodayWeather, getWeatherForecast } from 'src/services/weather.service';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import type { TodayWeatherType } from '../types/today-weather';
import type { WeatherForecast } from '../types/weather-forecast';
import TemperatureChart from './TemperatureChart.vue';
import TodayWeatherDetails from './TodayWeatherDetails.vue';

const todayWeatherData = ref<TodayWeatherType | null>(null);
const forecastData = ref<WeatherForecast | null>(null);
const loading = ref(false);

async function fetchWeather(city: string, lat?: number, lon?: number) {
  loading.value = true;
  todayWeatherData.value = await getTodayWeather(city, lat, lon);
  forecastData.value = await getWeatherForecast(city, lat, lon);
  loading.value = false;
}

watch(
  () => route.query,
  async (query) => {
    loading.value = true;
    const lat = query.lat && typeof query.lat === 'string' ? Number(query.lat) : undefined;
    const lon = query.lon && typeof query.lon === 'string' ? Number(query.lon) : undefined;
    const city =
      !lat && !lon ? (query.q && typeof query.q === 'string' ? query.q : 'Okinawa') : undefined;
    await fetchWeather(city, lat, lon);
    loading.value = false;
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <div v-if="loading" class="absolute-full flex flex-center">
      <q-spinner size="40px" color="primary" />
    </div>

    <section v-else-if="todayWeatherData?.name && forecastData?.list" class="fade-in">
      <div class="flex column justify-center items-center gap-30">
        <div class="text-h3 line-height-1 align-self-left">
          Weather in <span class="text-primary text-h1">{{ todayWeatherData.name }}</span> today
        </div>
        <CityWeatherCard :weatherCityData="todayWeatherData" />
        <TodayWeatherDetails :weather="todayWeatherData" />
        <div class="text-h3 line-height-1 align-self-left">Forecast</div>
        <TemperatureChart :forecast="forecastData?.list" />
      </div>
    </section>

    <div v-else class="absolute-full flex flex-center">
      <p class="text-uppercase text-primary text-h4">
        City not found or no data available
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.align-self-left {
  align-self: flex-start;
}

.gap-30 {
  gap: 30px;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}
</style>
