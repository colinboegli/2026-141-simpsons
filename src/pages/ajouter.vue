<template>
  <v-container class="py-8">
    <v-card
        class="pa-8 mx-auto"
        max-width="800"
        rounded="xl"
        color="#1e1e1e"
    >
      <h1 class="text-h3 mb-6 text-yellow">
        Ajouter un personnage
      </h1>

      <v-form ref="formRef" @submit.prevent="submitForm">
        <v-text-field
            v-model="form.name"
            label="Nom du personnage"
            :rules="nameRules"
            variant="outlined"
            class="mb-4"
        />

        <v-select
            v-model="form.status"
            :items="statusOptions"
            label="Statut"
            :rules="statusRules"
            variant="outlined"
            class="mb-4"
        />

        <v-text-field
            v-model.number="form.age"
            label="Âge"
            type="number"
            variant="outlined"
            class="mb-4"
        />

        <v-text-field
            v-model="form.occupation"
            label="Occupation"
            variant="outlined"
            class="mb-4"
        />

        <v-text-field
            v-model="form.image"
            label="URL de l'image"
            variant="outlined"
            class="mb-4"
        />

        <v-textarea
            v-model="form.description"
            label="Description"
            rows="4"
            variant="outlined"
            class="mb-6"
        />

        <v-btn
            type="submit"
            color="yellow-darken-1"
            size="large"
            block
        >
          Ajouter le personnage
        </v-btn>
      </v-form>
    </v-card>

    <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/characterStore'

const router = useRouter()
const characterStore = useCharacterStore()

const formRef = ref(null)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

const form = ref({
  name: '',
  status: '',
  age: null,
  occupation: '',
  image: '',
  description: '',
})

const statusOptions = [
  'Alive',
  'Dead',
  'Unknown',
]

const nameRules = [
  v => !!v || 'Le nom est obligatoire',
]

const statusRules = [
  v => !!v || 'Le statut est obligatoire',
]

async function submitForm() {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  const result = await characterStore.addCharacter(form.value)

  snackbar.value = {
    show: true,
    message: result.message,
    color: result.success ? 'success' : 'error',
  }

  if (result.success) {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}
</script>

<style scoped>
.text-yellow {
  color: #ffde00;
}
</style>