<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>
        <v-icon icon="mdi-food-hot-dog" class="mr-2" />
        Simpsons Explorer
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="text-center">
      <v-col>
        Démo C141 – ESIG {{ currentYear }} –
        API
        <a
            href="https://thesimpsonsapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary"
        >
          thesimpsonsapi.com
        </a>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>