<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Mes favoris ({{ characterStore.totalFavorites }})
    </h1>

    <v-alert
        v-if="characterStore.totalFavorites === 0"
        type="info"
        variant="tonal"
        class="mb-6"
    >
      Vous n'avez pas encore de personnages favoris.
      Cliquez sur le cœur d'un personnage pour l'ajouter !
    </v-alert>

    <v-row v-else>
      <v-col
          v-for="character in characterStore.getFavorites"
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

const characterStore = useCharacterStore()
</script>