<script setup lang="ts">
import { ref, watch } from 'vue';
import { debounce } from 'quasar';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const localSearch = ref(route.query.q || '');

const updateParamsDebounced = debounce(async (value: string) => {
  if (value === '') return;
  await router.push({ path: '/', query: { q: value } });
}, 300);

watch(localSearch, (newValue) => {
  if (typeof newValue !== 'string') return;
  updateParamsDebounced(newValue);
});

watch(
  () => route.query.q,
  (newQuery) => {
    localSearch.value = (newQuery as string) || '';
  },
);
</script>

<template>
  <div class="search-input-wrapper">
    <input v-model="localSearch" type="text" placeholder="Search by city..." />
    <q-icon name="search" color="primary" size="md" class="search-icon" />
  </div>
</template>

<style scoped lang="scss">
.search-input-wrapper {
  position: relative;
  flex-grow: 1;
  max-width: 500px;
}

.search-input-wrapper input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: 2px solid $primary;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  background-color: transparent;
  height: 60px;
  color: $primary;
}

.search-input-wrapper input::placeholder {
  color: $primary;
}

.search-input-wrapper .search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
