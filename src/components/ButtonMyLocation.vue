<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
const getUserLocation =  () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pushPositionToUrl as (position: GeolocationPosition) => void, (error) => {
      console.error("Error getting location:", error);
      alert("Unable to retrieve your location. Please allow location access and try again.");
    });
  }
}

const pushPositionToUrl = async (position: GeolocationPosition) => {
  await router.push({
    path: '/',
    query: {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
  });
}

</script>

<template>
  <q-btn
    icon="my_location"
    flat
    text-color="primary"
    round
    class="q-pa-xs"
    style="width: 40px; height: 40px" @click="getUserLocation"
  />
</template>

<style scoped></style>
