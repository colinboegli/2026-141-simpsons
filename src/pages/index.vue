<template>
  <v-container class="py-6">
    <h1 class="text-h3 mb-4">Personnages des Simpson</h1>

    <p class="mb-6">
      Découverte de l’API The Simpsons avec Vue, Vuetify, Pinia et Axios.
    </p>

    <v-row class="mb-4">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
            v-model="searchQuery"
            label="Rechercher un personnage"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            variant="outlined"
            density="compact"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            label="Filtrer par statut"
            prepend-inner-icon="mdi-filter"
            clearable
            hide-details
            variant="outlined"
            density="compact"
        />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn
            variant="outlined"
            :prepend-icon="sortOrder === 'asc'
            ? 'mdi-sort-alphabetical-ascending'
            : 'mdi-sort-alphabetical-descending'"
            @click="toggleSort"
        >
          Tri {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="isLoading" type="info" class="mb-4">
      Chargement des personnages...
    </v-alert>

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-alert
        v-else-if="sortedCharacters.length === 0"
        type="info"
        variant="tonal"
        class="mb-6"
    >
      Aucun personnage ne correspond à votre recherche.
    </v-alert>

    <template v-else>
      <v-alert type="success" class="mb-6">
        {{ sortedCharacters.length }} personnage(s) trouvé(s)
      </v-alert>

      <v-row>
        <v-col
            v-for="character in sortedCharacters"
            :key="character.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <character-card :character="character" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { characters, isLoading, error } = storeToRefs(characterStore)

const searchQuery = ref('')
const selectedStatus = ref(null)
const sortOrder = ref('asc')

const statusOptions = ['Alive', 'Deceased', 'Unknown']

const filteredByStatus = computed(() => {
  if (!selectedStatus.value) return characters.value

  return characters.value.filter(character =>
      character.status === selectedStatus.value
  )
})

const filteredBySearch = computed(() => {
  if (!searchQuery.value) return filteredByStatus.value

  const query = searchQuery.value.toLowerCase()

  return filteredByStatus.value.filter(character =>
      character.name.toLowerCase().includes(query)
  )
})

const sortedCharacters = computed(() => {
  return [...filteredBySearch.value].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'fr')
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>