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
import { useAuthStore } from '@/stores/authStore'

const characterStore = useCharacterStore()
const authStore = useAuthStore()

onMounted(async () => {
  authStore.loadToken()
  await characterStore.init()
})
</script>