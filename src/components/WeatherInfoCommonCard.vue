<template>
  <q-card class="flex shadow-0 card align-center justify-center">
    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.card {
  background-color: #daeaea;
  border: 1px solid $primary;
  border-radius: 10px;
}
</style>
