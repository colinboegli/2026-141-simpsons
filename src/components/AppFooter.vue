<template>
  <v-footer class="text-center">
    <v-col>
      <slot>
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
      </slot>
    </v-col>
  </v-footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>