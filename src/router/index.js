import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import HomeView from '@/pages/index.vue'
import AboutView from '@/pages/about.vue'
import AproposView from '@/pages/a-propos.vue'
import FavorisView from '@/pages/favoris.vue'
import AjouterView from '@/pages/ajouter.vue'
import LoginView from '@/pages/login.vue'
import CharacterDetailView from '@/pages/character/[id].vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: AproposView,
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: FavorisView,
    },
    {
      path: '/ajouter',
      name: 'ajouter',
      component: AjouterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterDetailView,
    },
  ],
})

const protectedRoutes = ['/ajouter']

router.beforeEach(to => {
  const authStore = useAuthStore()

  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    return { path: '/login' }
  }
})

export default router