<script setup lang="ts">
const props = defineProps(['weather']);
import WeatherInfoCommonCard from './WeatherInfoCommonCard.vue';
const sunrise = new Date(props.weather.sys.sunrise * 1000).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});
const sunset = new Date(props.weather.sys.sunset * 1000).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
});
const windSpeed = props.weather.wind.speed;
const windDeg = props.weather.wind.deg;
const visibility = props.weather.visibility;
const humidity = props.weather.main.humidity;
const pressure = props.weather.main.pressure;
</script>

<template>
  <WeatherInfoCommonCard>
    <div class="row q-gutter-sm card">
      <div class="column items-center justify-center">
        <q-icon name="wb_sunny" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p">Sunrise: {{ sunrise }}</p>
      </div>
      <div class="column items-center justify-center">
        <q-icon name="nights_stay" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p">Sunset: {{ sunset }}</p>
      </div>
      <div class="column items-center justify-center">
        <q-icon name="air" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p"
          >Wind: {{ windSpeed }} m/s, {{ windDeg }}°</p
        >
      </div>
      <div class="column items-center justify-center">
        <q-icon name="visibility" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p ">Visibility: {{ visibility }} m</p>
      </div>
      <div class="column items-center justify-center">
        <q-icon name="water_drop" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p">Humidity: {{ humidity }}%</p>
      </div>
      <div class="column items-center justify-center">
        <q-icon name="bar_chart" size="50px" class="q-mr-sm" color="accent" />
        <p class="text-p">Pressure: {{ pressure }} hPa</p>
      </div>
    </div>
  </WeatherInfoCommonCard>
</template>
<style scoped lang="scss">
.card {
  gap: 30px;
}

</style>
