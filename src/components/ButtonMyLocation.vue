<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoadingStore } from 'src/stores/loading';
const router = useRouter();
const loadingStore = useLoadingStore();
const getUserLocation = () => {
  loadingStore.startLoading();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pushPositionToUrl as (position: GeolocationPosition) => void,
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please allow location access and try again.');
        loadingStore.stopLoading();
      },
    );
  }
};

const pushPositionToUrl = async (position: GeolocationPosition) => {
  await router.push({
    path: '/',
    query: {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    },
  });
  loadingStore.stopLoading();
};
</script>

<template>
  <q-btn
    color="accent"
    text-color="primary"
    round
    unelevated
    class="q-pa-xs sticky"
    style="width: 30px; height: 30px"
    @click="getUserLocation"
  >
    <q-icon name="my_location" size="30px" />
  </q-btn>
</template>

<style scoped>
.sticky {
  position: sticky;
  top: 120px;
  left: 20px;;
  z-index: 100;
}
</style>
