<template>
  <v-container class="py-8">
    <v-card class="pa-6" max-width="800" rounded="xl">
      <h1 class="text-h3 mb-6">
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
            min="0"
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
            rows="3"
            variant="outlined"
            class="mb-4"
        />

        <v-btn
            type="submit"
            color="primary"
            size="large"
            :loading="characterStore.isLoading"
        >
          Ajouter
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
  value => !!value || 'Le nom est obligatoire',
  value => value.length >= 2 || 'Le nom doit contenir au moins 2 caractères',
]

const statusRules = [
  value => !!value || 'Le statut est obligatoire',
]

const snackbar = ref({
  show: false,
  message: '',
  color: 'success',
})

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