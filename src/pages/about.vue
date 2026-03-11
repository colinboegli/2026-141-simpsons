<template>
  <v-container class="py-6">
    <v-card class="pa-4">
      <v-card-title class="text-h4 mb-4">
        À propos de Simpsons Explorer
      </v-card-title>

      <v-card-text>
        <p class="mb-4">
          Cette application permet de découvrir l’univers des Simpson grâce à une API REST publique.
        </p>

        <v-list>
          <v-list-item prepend-icon="mdi-account-group" title="Personnages" />
          <v-list-item prepend-icon="mdi-television-classic" title="Épisodes" />
          <v-list-item prepend-icon="mdi-map-marker" title="Lieux" />
          <v-list-item prepend-icon="mdi-api" title="API publique sans clé" />
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>