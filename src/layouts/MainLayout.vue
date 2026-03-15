<script setup lang="ts">
import PageHeader from 'components/PageHeader.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <PageHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


