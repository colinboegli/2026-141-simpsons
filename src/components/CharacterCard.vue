<template>
  <v-card
      class="h-100 character-card"
      :to="`/character/${character.id}`"
      hover
  >
    <v-btn
        icon
        variant="text"
        class="favorite-btn"
        @click.stop.prevent="handleToggleFavorite"
    >
      <v-icon
          :icon="characterStore.isFavorite(character) ? 'mdi-heart' : 'mdi-heart-outline'"
          color="red"
      />
    </v-btn>

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

    <v-snackbar
        v-model="showSnackbar"
        :timeout="2000"
        color="primary"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
})

const characterStore = useCharacterStore()

const showSnackbar = ref(false)
const snackbarMessage = ref('')

function handleToggleFavorite() {
  const wasFavorite = characterStore.isFavorite(props.character)

  characterStore.toggleFavorite(props.character)

  snackbarMessage.value = wasFavorite
      ? 'Retiré des favoris'
      : 'Ajouté aux favoris'

  showSnackbar.value = true
}

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

  if (raw.startsWith('http')) return [raw]

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
</script>

<style scoped>
.character-card {
  position: relative;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.character-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(255, 222, 0, 0.25);
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
}
</style>