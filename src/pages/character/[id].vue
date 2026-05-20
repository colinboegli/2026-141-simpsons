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
            <v-list-item title="Profession" :subtitle="character.occupation || 'Inconnue'" />
            <v-list-item title="Âge" :subtitle="String(character.age ?? 'Inconnu')" />
            <v-list-item title="Genre" :subtitle="character.gender || 'Inconnu'" />
            <v-list-item title="ID" :subtitle="String(character.id)" />
            <v-list-item title="Nom normalisé" :subtitle="character.normalized_name || 'Non disponible'" />
          </v-list>

          <v-card v-if="character.phrases?.length" variant="outlined" class="pa-4 mb-4">
            <h2 class="text-h5 mb-3">Citations célèbres</h2>

            <v-list>
              <v-list-item
                  v-for="phrase in character.phrases"
                  :key="phrase"
                  prepend-icon="mdi-format-quote-close"
                  :title="phrase"
              />
            </v-list>
          </v-card>

          <v-alert v-else type="info" variant="tonal" class="mb-4">
            Aucune citation disponible pour ce personnage.
          </v-alert>

          <v-card-actions>
            <v-spacer />

            <v-btn
                v-if="authStore.isAuthenticated"
                color="error"
                variant="flat"
                prepend-icon="mdi-delete"
                @click="showDeleteDialog = true"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="showDeleteDialog" max-width="450">
      <v-card>
        <v-card-title>
          Confirmer la suppression
        </v-card-title>

        <v-card-text>
          Es-tu sûr de vouloir supprimer
          <strong>{{ character?.name }}</strong> ?
          Cette action est irréversible.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" @click="showDeleteDialog = false">
            Annuler
          </v-btn>

          <v-btn
              color="error"
              variant="flat"
              :loading="characterStore.isLoading"
              @click="handleDelete"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCharacterStore } from '@/stores/characterStore'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()

const characterStore = useCharacterStore()
const authStore = useAuthStore()

const { isLoading, error } = storeToRefs(characterStore)

const showDeleteDialog = ref(false)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

const character = computed(() => {
  return characterStore.getCharacterById(route.params.id)
})

async function handleDelete() {
  const result = await characterStore.deleteCharacter(route.params.id)

  showDeleteDialog.value = false

  snackbar.value = {
    show: true,
    message: result.message,
    color: result.success ? 'success' : 'error',
  }

  if (result.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
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