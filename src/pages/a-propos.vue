<template>
  <v-container class="py-6">
    <h1 class="text-h3 text-center mb-6">
      À propos de Springfield
    </h1>

    <v-card class="pa-6">
      <v-row>
        <v-col cols="12" md="6">
          <v-img
              src="@/assets/springfield-map.png"
              height="500"
              cover
              class="rounded-lg"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-img
              src="@/assets/springfield-city.png"
              height="500"
              cover
              class="rounded-lg"
          />
        </v-col>
      </v-row>

      <v-card-title class="text-h4 mt-6">
        Springfield
      </v-card-title>

      <v-card-text class="text-body-1">
        Springfield est la ville fictive où vivent les personnages
        de la célèbre série <strong>The Simpsons</strong>.

        <br><br>

        On y retrouve des lieux emblématiques comme :

        <br><br>

        • La maison des Simpson<br>
        • La centrale nucléaire<br>
        • Le Kwik-E-Mart<br>
        • La taverne de Moe<br>
        • L’école primaire de Springfield
      </v-card-text>
    </v-card>
  </v-container>
</template>