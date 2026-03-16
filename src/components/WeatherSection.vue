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
import { useLoadingStore } from 'src/stores/loading';

const loadingStore = useLoadingStore();

const todayWeatherData = ref<TodayWeatherType | null>(null);
const forecastData = ref<WeatherForecast | null>(null);

async function fetchWeather(city: string, lat?: number, lon?: number) {
  loadingStore.startLoading();
  todayWeatherData.value = await getTodayWeather(city, lat, lon);
  forecastData.value = await getWeatherForecast(city, lat, lon);
  loadingStore.stopLoading();
}

watch(
  () => route.query,
  async (query) => {
    loadingStore.startLoading();
    const lat = query.lat && typeof query.lat === 'string' ? Number(query.lat) : undefined;
    const lon = query.lon && typeof query.lon === 'string' ? Number(query.lon) : undefined;
    const city =
      !lat && !lon ? (query.q && typeof query.q === 'string' ? query.q : 'Okinawa') : undefined;
    await fetchWeather(city, lat, lon);
    loadingStore.stopLoading();
  },
  { immediate: true },
);
</script>

<template>
  <section class="fade-in flex column justify-center gap-30">
    <div v-if="loadingStore.isLoading" class="absolute-full flex flex-center">
      <q-spinner size="40px" color="primary" />
    </div>

    <div
      v-else-if="todayWeatherData?.name && forecastData?.list"
      class="flex column justify-center items-center gap-30"
    >
      <div class="line-height-1 align-self-left">
        <span class="title"> Weather today </span>
        <span class="text-primary city">
          {{ todayWeatherData.name }}
        </span>
      </div>
      <CityWeatherCard :weatherCityData="todayWeatherData" />
      <TodayWeatherDetails :weather="todayWeatherData" />
      <div class="text-h3 line-height-1 align-self-left title">Forecast</div>
      <TemperatureChart :forecast="forecastData?.list" />
    </div>

    <div v-else class="absolute-full flex flex-center fade-in">
      <p class="text-uppercase text-primary title text-center q-px-sm">
        City not found or no data available
      </p>
    </div>
  </section>
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
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease forwards;
}

.title {
  font-size: 30px;
}

.city {
  font-size: 50px;
}

@media (min-width: 768px) {
  .title {
    font-size: 40px;
  }

  .city {
    font-size: 60px;
  }
}

@media (min-width: 1200px) {
  .title {
    font-size: 50px;
  }

  .city {
    font-size: 70px;
  }
}
</style>
