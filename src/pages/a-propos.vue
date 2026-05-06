<template>
  <v-container class="py-8">
    <section class="springfield-hero mb-8">
      <div>
        <p class="text-overline mb-2">Bienvenue à</p>
        <h1 class="springfield-title">Springfield</h1>
        <p class="springfield-subtitle">
          La ville culte des Simpson, entre centrale nucléaire,
          donuts, école primaire et taverne de Moe.
        </p>
      </div>
    </section>

    <v-card class="pa-6 springfield-card" rounded="xl">
      <v-row>
        <v-col cols="12" md="6">
          <v-img
              src="@/assets/springfield-map.png"
              height="420"
              cover
              class="rounded-xl"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-img
              src="@/assets/springfield-city.png"
              height="420"
              cover
              class="rounded-xl"
          />
        </v-col>
      </v-row>

      <v-divider class="my-6" />

      <v-row>
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-4">
            Une ville fictive devenue iconique
          </h2>

          <p class="text-body-1">
            Springfield est le décor principal de la série
            <strong>The Simpsons</strong>. On y suit la famille Simpson
            et de nombreux habitants hauts en couleur.
          </p>

          <p class="text-body-1 mt-4">
            La ville mélange humour, satire américaine et lieux cultes,
            ce qui en fait un univers reconnaissable immédiatement.
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-4">
            Lieux emblématiques
          </h2>

          <v-list class="rounded-lg">
            <v-list-item prepend-icon="mdi-home" title="La maison des Simpson" />
            <v-list-item prepend-icon="mdi-factory" title="La centrale nucléaire" />
            <v-list-item prepend-icon="mdi-store" title="Le Kwik-E-Mart" />
            <v-list-item prepend-icon="mdi-glass-mug" title="La taverne de Moe" />
            <v-list-item prepend-icon="mdi-school" title="L’école primaire de Springfield" />
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.springfield-hero {
  border-radius: 32px;
  padding: 56px;
  background:
      linear-gradient(135deg, rgba(255, 222, 0, 0.95), rgba(255, 143, 0, 0.9));
  color: black;
  box-shadow: 0 20px 60px rgba(255, 193, 7, 0.2);
}

.springfield-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.06em;
  margin-bottom: 20px;
}

.springfield-subtitle {
  font-size: 1.4rem;
  max-width: 750px;
  line-height: 1.6;
}

.springfield-card {
  border: 1px solid rgba(255, 222, 0, 0.25);
}
</style>