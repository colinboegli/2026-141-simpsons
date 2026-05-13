<template>
  <v-app-bar class="app-header" height="72" flat>
    <v-container class="d-flex align-center justify-space-between">
      <router-link to="/" class="brand">
        <span class="brand-icon">🍩</span>
        <span class="brand-text">Simpsons Explorer</span>
      </router-link>

      <div class="nav-links">
        <v-btn
            v-for="link in menuItems"
            :key="link.title"
            :to="link.path"
            :prepend-icon="link.icon"
            variant="text"
            class="nav-btn"
        >
          {{ link.title }}
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
const menuItems = [
  { title: 'Accueil', path: '/', icon: 'mdi-home' },
  { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
  { title: 'Ajouter', path: '/ajouter', icon: 'mdi-plus-circle' },
  { title: 'À propos', path: '/a-propos', icon: 'mdi-information' },
]
</script>

<style scoped>
.app-header {
  background: linear-gradient(90deg, #ffde00, #ffb300);
  border-bottom: 4px solid #111;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #111;
  text-decoration: none;
  font-weight: 900;
  font-size: 1.25rem;
}

.brand-icon {
  font-size: 2rem;
}

.brand-text {
  letter-spacing: -0.03em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  color: #111;
  font-weight: 800;
  border-radius: 999px;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.12);
}

@media (max-width: 700px) {
  .brand-text {
    display: none;
  }

  .nav-btn {
    min-width: 44px;
    padding: 0 10px;
  }

  .nav-btn :deep(.v-btn__content) {
    display: none;
  }
}
</style>