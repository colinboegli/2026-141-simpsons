<template>
  <v-app>
    <app-header />

    <v-main>
      <RouterView />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useCharacterStore } from '@/stores/characterStore'

const characterStore = useCharacterStore()

onMounted(async () => {
  await characterStore.init()
})
</script>