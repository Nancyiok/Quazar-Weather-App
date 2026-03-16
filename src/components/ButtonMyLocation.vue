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
    icon="my_location"
    flat
    text-color="primary"
    round
    class="q-pa-xs"
    style="width: 40px; height: 40px"
    @click="getUserLocation"
  />
</template>


