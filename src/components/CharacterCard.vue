<template>
  <v-card
      class="h-100 position-relative"
      :to="`/character/${character.id}`"
      hover
  >
    <v-btn
        icon
        class="position-absolute"
        style="top: 8px; right: 8px; z-index: 2;"
        @click.prevent="handleFavoriteClick"
    >
      <v-icon :icon="favorite ? 'mdi-heart' : 'mdi-heart-outline'" color="red" />
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
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { isFavorite, toggleFavorite } from '@/utils/favorites'

const props = defineProps({
  character: {
    type: Object,
    required: true,
  },
})

const favorite = ref(false)

onMounted(() => {
  favorite.value = isFavorite(props.character.id)
})

function handleFavoriteClick() {
  const updated = toggleFavorite(props.character.id)
  favorite.value = updated.includes(props.character.id)
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
</script>