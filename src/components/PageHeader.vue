<script setup lang="ts">
import SearchInput from './SearchInput.vue';
import ButtonMyLocation from './ButtonMyLocation.vue';
</script>

<template>
  <div class="flex page-header items-center q-gutter-md justify-end q-pa-lg">
    <SearchInput />
  </div>
  <ButtonMyLocation />
</template>
<style scoped lang="scss">
.page-header {
  background: $header-bg-color;
  border-bottom: 2px solid $primary;
}
</style>
