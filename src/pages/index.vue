<template>
  <v-container class="home-page py-8">

    <!-- HERO -->
    <section class="hero-section mb-8">
      <div class="hero-content">

        <div class="hero-left">
          <div class="hero-badge">
            Springfield Explorer
          </div>

          <h1 class="hero-title">
            Découvre les habitants de Springfield
          </h1>

          <p class="hero-subtitle">
            Retrouve tous les habitants les plus célèbres
            de Springfield !
          </p>

          <div class="hero-tags">
            <span>🍩 Springfield</span>
            <span>📺 The Simpsons</span>
            <span>⭐ {{ sortedCharacters.length }} personnages</span>
          </div>
        </div>

        <div class="hero-right">
          <div class="donut-circle">
            <span class="donut-emoji">🍩</span>
          </div>
        </div>

      </div>
    </section>

    <!-- LOADING -->
    <v-alert
        v-if="isLoading"
        type="info"
        variant="tonal"
        class="mb-6"
    >
      Chargement des personnages...
    </v-alert>

    <!-- ERROR -->
    <v-alert
        v-else-if="error"
        type="error"
        variant="tonal"
        class="mb-6"
    >
      {{ error }}
    </v-alert>

    <!-- CONTROLS -->
    <v-card
        v-else
        class="controls-card pa-4 mb-8"
    >
      <v-row>

        <!-- SEARCH -->
        <v-col cols="12" md="5">
          <v-text-field
              v-model="searchQuery"
              label="Rechercher un personnage"
              prepend-inner-icon="mdi-magnify"
              clearable
              hide-details
              variant="outlined"
              density="comfortable"
          />
        </v-col>

        <!-- FILTER -->
        <v-col cols="12" md="4">
          <v-select
              v-model="selectedStatus"
              :items="statusOptions"
              label="Filtrer par statut"
              prepend-inner-icon="mdi-filter"
              clearable
              hide-details
              variant="outlined"
              density="comfortable"
          />
        </v-col>

        <!-- SORT -->
        <v-col cols="12" md="3">
          <v-btn
              block
              height="56"
              class="sort-btn"
              @click="toggleSort"
          >
            <v-icon start>
              {{
                sortOrder === 'asc'
                    ? 'mdi-sort-alphabetical-ascending'
                    : 'mdi-sort-alphabetical-descending'
              }}
            </v-icon>

            {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
          </v-btn>
        </v-col>

      </v-row>
    </v-card>

    <!-- EMPTY -->
    <v-alert
        v-if="sortedCharacters.length === 0"
        type="warning"
        variant="tonal"
        border="start"
        class="empty-alert"
    >
      Aucun personnage ne correspond à votre recherche.
    </v-alert>

    <!-- RESULTS -->
    <section v-else>

      <div class="results-header mb-6">
        <div>
          <p class="results-label">
            Résultats
          </p>

          <h2 class="results-title">
            Personnages trouvés
          </h2>
        </div>

        <div class="results-count">
          {{ sortedCharacters.length }} carte(s)
        </div>
      </div>

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

    </section>

  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const {
  characters,
  isLoading,
  error,
} = storeToRefs(characterStore)

const searchQuery = ref('')
const selectedStatus = ref(null)
const sortOrder = ref('asc')

const statusOptions = [
  'Alive',
  'Dead',
  'Unknown',
]

const filteredByStatus = computed(() => {
  if (!selectedStatus.value) {
    return characters.value
  }

  return characters.value.filter(character =>
      character.status === selectedStatus.value,
  )
})

const filteredBySearch = computed(() => {
  if (!searchQuery.value) {
    return filteredByStatus.value
  }

  const query = searchQuery.value.toLowerCase()

  return filteredByStatus.value.filter(character =>
      character.name.toLowerCase().includes(query),
  )
})

const sortedCharacters = computed(() => {
  return [...filteredBySearch.value].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, 'fr')

    return sortOrder.value === 'asc'
        ? comparison
        : -comparison
  })
})

function toggleSort() {
  sortOrder.value =
      sortOrder.value === 'asc'
          ? 'desc'
          : 'asc'
}
</script>

<style scoped>
.home-page {
  max-width: 1400px;
}

/* HERO */

.hero-section {
  background: linear-gradient(
      135deg,
      #ffde00 0%,
      #ffb300 50%,
      #ff8f00 100%
  );

  border-radius: 36px;
  padding: 48px;
  overflow: hidden;
  position: relative;

  box-shadow:
      0 20px 60px rgba(255, 193, 7, 0.2),
      0 0 100px rgba(255, 193, 7, 0.08);
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.hero-left {
  max-width: 700px;
}

.hero-badge {
  display: inline-block;
  background: black;
  color: white;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 5rem;
  line-height: 0.95;
  font-weight: 900;
  color: black;
  margin-bottom: 24px;
  max-width: 700px;
}

.hero-subtitle {
  font-size: 1.5rem;
  line-height: 1.6;
  color: #111;
  max-width: 650px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-tags span {
  background: rgba(0, 0, 0, 0.12);
  border: 2px solid rgba(0, 0, 0, 0.2);
  color: black;
  padding: 10px 18px;
  border-radius: 14px;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.donut-circle {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.12);
  border: 6px solid rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
}

.donut-emoji {
  font-size: 110px;
  line-height: 1;
}

/* CONTROLS */

.controls-card {
  border-radius: 28px;
  background: rgba(30, 30, 30, 0.92);
  border: 1px solid rgba(255, 222, 0, 0.3);
  backdrop-filter: blur(12px);
}

.sort-btn {
  background: #ffde00;
  color: black;
  font-weight: 800;
  border-radius: 14px;
}

/* RESULTS */

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.results-label {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: #bdbdbd;
  margin-bottom: 6px;
  font-weight: 700;
}

.results-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
}

.results-count {
  background: rgba(255, 222, 0, 0.15);
  color: #ffde00;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 700;
}

.empty-alert {
  border-radius: 18px;
}

/* RESPONSIVE */

@media (max-width: 960px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-left {
    max-width: 100%;
  }

  .hero-tags {
    justify-content: center;
  }

  .results-header {
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 28px;
  }

  .hero-title {
    font-size: 2.7rem;
  }

  .donut-circle {
    width: 170px;
    height: 170px;
  }

  .donut-emoji {
    font-size: 80px;
  }
}
</style>