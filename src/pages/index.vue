<template>
  <v-container class="py-6">
    <h1 class="text-h3 mb-4">Personnages des Simpson</h1>

    <p class="mb-6">
      Découverte de l’API The Simpsons avec Vue et Vuetify.
    </p>

    <!-- 🔎 Recherche -->
    <v-text-field
        v-model="search"
        label="Rechercher un personnage"
        prepend-icon="mdi-magnify"
        class="mb-4"
    />

    <!-- 🎯 Filtre -->
    <v-select
        v-model="selectedStatus"
        :items="['All', 'Alive', 'Deceased', 'Unknown']"
        label="Filtrer par statut"
        class="mb-4"
    />

    <!-- 🔃 Tri -->
    <v-select
        v-model="sortOption"
        :items="[
        { title: 'Nom A-Z', value: 'name-asc' },
        { title: 'Nom Z-A', value: 'name-desc' }
      ]"
        label="Trier"
        class="mb-4"
    />

    <!-- Loading -->
    <v-alert v-if="isLoading" type="info" class="mb-4">
      Chargement des personnages...
    </v-alert>

    <!-- Erreur -->
    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Aucun résultat -->
    <v-alert
        v-else-if="filteredCharacters.length === 0"
        type="warning"
        class="mb-4"
    >
      Aucun résultat
    </v-alert>

    <!-- Résultat -->
    <v-alert v-else type="success" class="mb-6">
      {{ filteredCharacters.length }} personnage(s)
    </v-alert>

    <!-- Grille -->
    <v-row>
      <v-col
          v-for="character in filteredCharacters"
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
import { ref, computed } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { characters, isLoading, error } = storeToRefs(characterStore)

// 🔎 Recherche
const search = ref('')

// 🎯 Filtre
const selectedStatus = ref('All')

// 🔃 Tri
const sortOption = ref('name-asc')

// 🔥 Logique filtre + tri
const filteredCharacters = computed(() => {
  let result = [...characters.value]

  // Recherche
  if (search.value) {
    result = result.filter(c =>
        c.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  // Filtre
  if (selectedStatus.value !== 'All') {
    result = result.filter(c =>
        c.status === selectedStatus.value
    )
  }

  // Tri
  if (sortOption.value === 'name-asc') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    result.sort((a, b) => b.name.localeCompare(a.name))
  }

  return result
})
</script>