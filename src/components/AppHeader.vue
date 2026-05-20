<template>
  <v-app-bar
      flat
      color="#ffde00"
      class="header-bar"
      height="75"
  >
    <v-container class="d-flex align-center justify-space-between">
      <router-link to="/" class="logo-link">
        <div class="logo-content">
          <div class="logo-circle">
            🍩
          </div>

          <span class="logo-text">
            Simpsons Explorer
          </span>
        </div>
      </router-link>

      <div class="nav-links">
        <v-btn
            v-for="link in visibleMenuItems"
            :key="link.title"
            :to="link.path"
            variant="text"
            class="nav-btn"
            :prepend-icon="link.icon"
        >
          {{ link.title }}
        </v-btn>

        <v-btn
            v-if="authStore.isAuthenticated"
            variant="text"
            class="nav-btn"
            prepend-icon="mdi-logout"
            @click="handleLogout"
        >
          Déconnexion
        </v-btn>

        <v-btn
            v-else
            to="/login"
            variant="text"
            class="nav-btn"
            prepend-icon="mdi-login"
        >
          Connexion
        </v-btn>
      </div>
    </v-container>

    <v-snackbar
        v-model="showSnackbar"
        :timeout="2000"
        color="primary"
    >
      Déconnexion réussie
    </v-snackbar>
  </v-app-bar>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const showSnackbar = ref(false)

const menuItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-home' },
  { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
  { title: 'Ajouter', path: '/ajouter', icon: 'mdi-plus-circle', protected: true },
  { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
]

const visibleMenuItems = computed(() => {
  return menuItems.filter(item => !item.protected || authStore.isAuthenticated)
})

function handleLogout() {
  authStore.logout()
  showSnackbar.value = true
  router.push('/')
}
</script>

<style scoped>
.header-bar {
  background: linear-gradient(90deg, #ffde00, #ffb300) !important;
  border-bottom: 4px solid #111;
  color: #111 !important;
}

.logo-link {
  text-decoration: none;
  color: #111;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
}

.nav-links {
  display: flex;
  gap: 10px;
}

.nav-btn {
  font-weight: 800;
  color: #111;
  border-radius: 999px;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

@media (max-width: 700px) {
  .logo-text {
    display: none;
  }

  .nav-btn :deep(.v-btn__content) {
    display: none;
  }

  .nav-btn {
    min-width: 44px;
  }
}
</style>