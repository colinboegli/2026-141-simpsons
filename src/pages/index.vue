<template>
  <v-container class="py-6">
    <h1 class="text-h3 mb-4">Personnages des Simpson</h1>

    <p class="mb-6">
      Découverte de l’API The Simpsons avec Vue et Vuetify.
    </p>

    <v-alert v-if="loading" type="info" class="mb-4">
      Chargement des personnages...
    </v-alert>

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-alert v-else type="success" class="mb-6">
      {{ characters.length }} personnage(s) chargé(s)
    </v-alert>

    <v-row>
      <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <character-card :character="character" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'

const characters = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('https://thesimpsonsapi.com/api/characters')

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`)
    }

    const data = await response.json()

    characters.value = Array.isArray(data)
        ? data
        : data.results || data.data || []
  } catch (err) {
    error.value = err.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
})
</script>