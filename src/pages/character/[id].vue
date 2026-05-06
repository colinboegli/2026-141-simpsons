<template>
  <v-container class="py-6">
    <v-btn
        class="mb-4"
        prepend-icon="mdi-arrow-left"
        @click="$router.back()"
    >
      Retour
    </v-btn>

    <v-alert v-if="isLoading" type="info" class="mb-4">
      Chargement du personnage...
    </v-alert>

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-alert v-else-if="!character" type="error" class="mb-4">
      Personnage introuvable
    </v-alert>

    <v-card v-else class="pa-6">
      <v-row>
        <v-col cols="12" md="5" class="text-center">
          <img
              :src="characterImage(character)"
              :alt="character.name"
              style="width: 100%; max-height: 450px; object-fit: contain;"
              @error="handleImageError($event, character)"
          >
        </v-col>

        <v-col cols="12" md="7">
          <v-card-title class="text-h3 pa-0 mb-4">
            {{ character.name }}
          </v-card-title>

          <v-chip
              :color="statusColor(character.status)"
              class="mr-2 mb-4"
          >
            {{ character.status || 'Statut inconnu' }}
          </v-chip>

          <v-list class="mb-4">
            <v-list-item title="Occupation" :subtitle="character.occupation || 'Inconnue'" />
            <v-list-item title="Âge" :subtitle="String(character.age ?? 'Inconnu')" />
            <v-list-item title="Genre" :subtitle="character.gender || 'Inconnu'" />
            <v-list-item title="ID" :subtitle="String(character.id)" />
            <v-list-item title="Nom normalisé" :subtitle="character.normalized_name || 'Non disponible'" />
          </v-list>

          <v-card v-if="character.phrases?.length" variant="outlined" class="pa-4">
            <h2 class="text-h5 mb-3">Phrases célèbres</h2>

            <v-list>
              <v-list-item
                  v-for="phrase in character.phrases"
                  :key="phrase"
                  prepend-icon="mdi-format-quote-close"
                  :title="phrase"
              />
            </v-list>
          </v-card>

          <v-alert v-else type="info" variant="tonal">
            Aucune phrase disponible pour ce personnage.
          </v-alert>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCharacterStore } from '@/stores/characterStore'

const route = useRoute()
const characterStore = useCharacterStore()
const { isLoading, error } = storeToRefs(characterStore)

const character = computed(() => {
  return characterStore.getCharacterById(route.params.id)
})

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
</script>