<template>
  <v-container class="py-8">
    <v-card class="pa-8 mx-auto login-card" max-width="520" rounded="xl">
      <h1 class="text-h3 mb-2 text-yellow">
        Connexion
      </h1>

      <p class="mb-6 text-grey-lighten-1">
        Connecte-toi pour accéder à la page d’ajout de personnages.
      </p>

      <v-alert
          v-if="authStore.error"
          type="error"
          variant="tonal"
          class="mb-4"
      >
        {{ authStore.error }}
      </v-alert>

      <v-alert type="info" variant="tonal" class="mb-6">
        Identifiants de test :<br>
        <strong>homer@simpsons.com</strong><br>
        Mot de passe : <strong>donut</strong>
      </v-alert>

      <v-form ref="formRef" @submit.prevent="submitLogin">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            :rules="emailRules"
            variant="outlined"
            class="mb-4"
        />

        <v-text-field
            v-model="password"
            label="Mot de passe"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            variant="outlined"
            class="mb-6"
            @click:append-inner="showPassword = !showPassword"
        />

        <v-btn
            type="submit"
            color="yellow-darken-1"
            size="large"
            block
        >
          Se connecter
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref(null)
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const emailRules = [
  value => !!value || 'L’email est obligatoire',
  value => /.+@.+\..+/.test(value) || 'L’email doit être valide',
]

const passwordRules = [
  value => !!value || 'Le mot de passe est obligatoire',
]

async function submitLogin() {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  const result = authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-card {
  background: #1e1e1e;
}

.text-yellow {
  color: #ffde00;
}
</style>