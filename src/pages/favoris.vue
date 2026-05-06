<template>
  <v-container class="py-8">
    <section class="favorites-hero mb-8">
      <div>
        <p class="text-overline mb-2">Collection personnelle</p>

        <h1 class="favorites-title">
          Mes favoris
        </h1>

        <p class="favorites-subtitle">
          Retrouve ici les personnages de Springfield que tu as ajoutés à ta liste.
        </p>

        <v-chip color="black" variant="flat" class="mt-4">
          {{ characterStore.totalFavorites }} favori(s)
        </v-chip>
      </div>
    </section>

    <v-alert
        v-if="characterStore.totalFavorites === 0"
        type="info"
        variant="tonal"
        class="mb-6"
    >
      Tu n’as pas encore de personnage favori.
      Clique sur le cœur d’un personnage pour l’ajouter à cette page.
    </v-alert>

    <v-btn
        v-if="characterStore.totalFavorites === 0"
        to="/"
        color="primary"
        prepend-icon="mdi-home"
        class="mb-6"
    >
      Retour à l’accueil
    </v-btn>

    <section v-else>
      <div class="favorites-header mb-6">
        <div>
          <p class="text-overline mb-1">Personnages sauvegardés</p>

          <h2 class="text-h4">
            Ta sélection Springfield
          </h2>
        </div>

        <v-chip color="primary" size="large">
          {{ characterStore.totalFavorites }} carte(s)
        </v-chip>
      </div>

      <v-row>
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
    </section>
  </v-container>
</template>

<script setup>
import CharacterCard from '@/components/CharacterCard.vue'
import { useCharacterStore } from '@/stores/characterStore'

const characterStore = useCharacterStore()
</script>

<style scoped>
.favorites-hero {
  border-radius: 32px;
  padding: 56px;
  background:
      radial-gradient(circle at top right, rgba(255, 255, 255, 0.3), transparent 35%),
      linear-gradient(135deg, #ffde00, #ff8f00);
  color: black;
  box-shadow: 0 20px 60px rgba(255, 193, 7, 0.2);
}

.favorites-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.06em;
  margin-bottom: 20px;
}

.favorites-subtitle {
  font-size: 1.4rem;
  max-width: 720px;
  line-height: 1.6;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  flex-wrap: wrap;
}
</style>