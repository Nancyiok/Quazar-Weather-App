<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoadingStore } from 'src/stores/loading';
import { Geolocation } from '@capacitor/geolocation';

const router = useRouter();
const loadingStore = useLoadingStore();

const getUserLocation = async () => {
  loadingStore.startLoading();

  try {
    const perm = await Geolocation.checkPermissions();
    if (perm.location !== 'granted') {
      await Geolocation.requestPermissions();
    }

    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });

    await pushPositionToUrl(position.coords.latitude, position.coords.longitude);

  } catch (error) {
    console.error('Error getting location:', error);
    alert('Unable to retrieve location. Please check if GPS (Location Services) is enabled on your phone.');
    loadingStore.stopLoading();
  }
};

const pushPositionToUrl = async (lat: number, lon: number) => {
  await router.push({
    path: '/',
    query: {
      lat: lat,
      lon: lon,
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
  left: 20px;
  z-index: 100;
}
</style>
