<template>
  <v-app-bar color="primary" prominent>
    <v-container class="d-flex align-center">

      <!-- Logo / titre -->
      <v-app-bar-title>
        <v-icon icon="mdi-food-hot-dog" class="mr-2" />
        Simpsons Explorer
      </v-app-bar-title>

      <!-- Navigation -->
      <v-btn
          v-for="link in menuItems"
          :key="link.title"
          :icon="link.icon"
          :to="link.path"
      />

    </v-container>
  </v-app-bar>
</template>

<script setup>
const menuItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-home' },
  { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
  { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
]
</script>