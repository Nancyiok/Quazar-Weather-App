<script setup lang="ts">
import { getWeatherCityPhoto } from 'src/services/weather.service';
import { WEATHER_ICONS_MAP } from 'src/constants/weatherIcons';
import { watch, ref } from 'vue';
const props = defineProps(['weatherCityData']);
const weatherCityPhoto = ref('');
watch(
  () => props.weatherCityData,
  async (newCity) => {
    if (!newCity?.name) return;
    weatherCityPhoto.value = await getWeatherCityPhoto(newCity.name);
  },
  { immediate: true },
);
</script>
<template>
  <q-img :src="weatherCityPhoto" class="city-img fade-in" spinner-color="accent">
    <div class="text-h5 line-height-1 absolute-bottom text-white q-pa-md fade-in-text">
      <div class="text-h2">{{ Math.round(weatherCityData.main?.temp ?? 0) }}°C</div>
      <div class="text-h6">
        Feels like {{ Math.round(weatherCityData.main?.feels_like ?? 0) }}°C
      </div>
      <div class="text-h4 text-capitalize row items-center">
        {{ weatherCityData.weather?.[0]?.description }}
        <q-icon :name="WEATHER_ICONS_MAP[weatherCityData.weather?.[0]?.icon || '']" size="40px" />
      </div>
    </div>
  </q-img>
</template>

<style scoped lang="scss">
.city-img {
  width: 100%;
  max-width: 1000px;
  height: 500px;
  border-radius: 10px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
}

.fade-in-text {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  animation-delay: 0.3s;
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
</style>
