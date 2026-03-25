<template>
  <v-container class="py-6">

    <!-- Bouton retour -->
    <v-btn
        class="mb-4"
        prepend-icon="mdi-arrow-left"
        @click="$router.back()"
    >
      Retour
    </v-btn>

    <!-- Erreur -->
    <v-alert v-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Carte détail -->
    <v-card v-else-if="character" class="pa-4">

      <img
          :src="characterImage(character)"
          :alt="character.name"
          style="width: 100%; max-height: 400px; object-fit: contain;"
      />

      <v-card-title class="text-h4">
        {{ character.name }}
      </v-card-title>

      <v-card-text>
        <p><strong>Statut :</strong> {{ character.status || 'Unknown' }}</p>
        <p><strong>Occupation :</strong> {{ character.occupation || 'Inconnue' }}</p>
        <p><strong>Âge :</strong> {{ character.age ?? 'Inconnu' }}</p>
      </v-card-text>

    </v-card>

  </v-container>
</template>

<script setup>
const route = useRoute()

const character = ref(null)
const error = ref('')

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
  ]
}

function characterImage(character) {
  const candidates = getImageCandidates(character)
  return candidates[0] || 'https://via.placeholder.com/500x300?text=No+Image'
}

onMounted(async () => {
  try {
    const response = await fetch('https://thesimpsonsapi.com/api/characters')
    const data = await response.json()

    const list = Array.isArray(data)
        ? data
        : data.results || data.data || []

    character.value = list.find(c => c.id == route.params.id)

    if (!character.value) {
      error.value = 'Personnage introuvable'
    }

  } catch (err) {
    error.value = 'Erreur lors du chargement'
    console.error(err)
  }
})
</script>