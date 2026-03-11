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
        <v-card class="h-100">
          <img
              :src="characterImage(character)"
              :alt="character.name"
              style="width: 100%; height: 250px; object-fit: cover; display: block;"
              @error="handleImageError($event, character)"
          >

          <v-card-title>{{ character.name }}</v-card-title>

          <v-card-text>
            <v-chip
                :color="statusColor(character.status)"
                size="small"
                class="mr-2 mb-2"
            >
              {{ character.status || 'Unknown' }}
            </v-chip>

            <v-chip size="small" variant="outlined" class="mb-2">
              {{ character.occupation || 'Occupation inconnue' }}
            </v-chip>

            <div class="mt-2 text-body-2">
              Âge : {{ character.age ?? 'Inconnu' }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const characters = ref([])
const loading = ref(true)
const error = ref('')

function statusColor(status) {
  const colors = {
    Alive: 'green',
    Deceased: 'red',
    Dead: 'red',
    Unknown: 'grey',
    unknown: 'grey',
  }

  return colors[status] || 'grey'
}

function getImagePath(character) {
  return character.image_path || character.portrait_path || character.image || ''
}

function getImageCandidates(character) {
  const raw = getImagePath(character)

  if (!raw) return []

  if (raw.startsWith('http')) {
    return [raw]
  }

  const path = raw.startsWith('/') ? raw : `/${raw}`

  return [
    `https://thesimpsonsapi.com${path}`,
    `https://cdn.thesimpsonsapi.com${path}`,
    `https://cdn.thesimpsonsapi.com/500${path}`,
    `https://thesimpsonsapi.com/images${path}`,
  ]
}

function characterImage(character) {
  const candidates = getImageCandidates(character)
  return candidates[0] || 'https://via.placeholder.com/500x250?text=No+Image'
}

function handleImageError(event, character) {
  const candidates = getImageCandidates(character)
  const currentIndex = Number(event.target.dataset.index || 0)
  const nextIndex = currentIndex + 1

  if (nextIndex < candidates.length) {
    event.target.dataset.index = String(nextIndex)
    event.target.src = candidates[nextIndex]
    return
  }

  event.target.src = 'https://via.placeholder.com/500x250?text=No+Image'
}

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