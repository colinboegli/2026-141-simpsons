import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/index.vue'
import AboutView from '@/pages/about.vue'
import AproposView from '@/pages/a-propos.vue'
import FavorisView from '@/pages/favoris.vue'
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
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterDetailView,
    },
  ],
})

export default router