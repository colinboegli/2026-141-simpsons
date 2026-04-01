<template>
  <v-container class="py-6">
    <h1 class="text-h3 mb-4">Personnages des Simpson</h1>

    <p class="mb-6">
      Découverte de l’API The Simpsons avec Vue et Vuetify.
    </p>

    <v-alert v-if="isLoading" type="info" class="mb-4">
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
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { characters, isLoading, error } = storeToRefs(characterStore)
</script>