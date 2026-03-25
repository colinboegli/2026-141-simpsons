<template>
  <v-container class="py-6">
    <v-btn
        class="mb-4"
        prepend-icon="mdi-arrow-left"
        @click="$router.back()"
    >
      Retour
    </v-btn>

    <v-alert v-if="loading" type="info" class="mb-4">
      Chargement du personnage...
    </v-alert>

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-card v-else-if="character" class="pa-4">
      <img
          :src="characterImage(character)"
          :alt="character.name"
          style="width: 100%; max-height: 400px; object-fit: contain; display: block;"
          @error="handleImageError($event, character)"
      >

      <v-card-title class="text-h4">
        {{ character.name }}
      </v-card-title>

      <v-card-text>
        <p><strong>Statut :</strong> {{ character.status || 'Unknown' }}</p>
        <p><strong>Occupation :</strong> {{ character.occupation || 'Inconnue' }}</p>
        <p><strong>Âge :</strong> {{ character.age ?? 'Inconnu' }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const character = ref(null)
const error = ref('')
const loading = ref(true)

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
  return candidates[0] || 'https://via.placeholder.com/500x300?text=No+Image'
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

  event.target.src = 'https://via.placeholder.com/500x300?text=No+Image'
}

onMounted(async () => {
  try {
    const response = await fetch('https://thesimpsonsapi.com/api/characters')

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`)
    }

    const data = await response.json()

    const list = Array.isArray(data)
        ? data
        : data.results || data.data || []

    character.value = list.find(c => String(c.id) === String(route.params.id))

    if (!character.value) {
      error.value = 'Personnage introuvable'
    }
  } catch (err) {
    error.value = err.message || 'Erreur lors du chargement'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>