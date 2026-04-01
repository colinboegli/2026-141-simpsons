<template>
  <v-container class="py-6">
    <h1 class="text-h3 text-center my-6">
      Mes favoris
    </h1>

    <v-alert v-if="loading" type="info" class="mb-4">
      Chargement des favoris...
    </v-alert>

    <v-alert v-else-if="favoriteCharacters.length === 0" type="warning" class="mb-4">
      Aucun favori pour le moment.
    </v-alert>

    <v-row v-else>
      <v-col
          v-for="character in favoriteCharacters"
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
import { getFavorites } from '@/utils/favorites'

const favoriteCharacters = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const favoriteIds = getFavorites()

    const response = await fetch('https://thesimpsonsapi.com/api/characters')
    const data = await response.json()

    const characters = Array.isArray(data)
        ? data
        : data.results || data.data || []

    favoriteCharacters.value = characters.filter(character =>
        favoriteIds.includes(character.id)
    )
  } catch (error) {
    console.error('Erreur lors du chargement des favoris :', error)
  } finally {
    loading.value = false
  }
})
</script>