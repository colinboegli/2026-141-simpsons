<template>
  <v-app>

    <!-- Header avec navigation -->
    <app-header />

    <v-main>
      <RouterView />
    </v-main>

    <app-footer />

  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>