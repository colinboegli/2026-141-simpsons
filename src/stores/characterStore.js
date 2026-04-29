import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        totalCharacters: (state) => state.characters.length,

        getCharacterById: (state) => {
            return (characterId) => {
                return state.characters.find(
                    character => String(character.id) === String(characterId)
                )
            }
        },
    },

    actions: {
        async fetchCharacters() {
            try {
                // Utilisation de l'instance Axios configurée
                const response = await api.get('/characters')

                this.characters = Array.isArray(response.data)
                    ? response.data
                    : response.data.results || response.data.data || []
            } catch (error) {
                this.error = error.message || 'Erreur lors du chargement des personnages'
                throw error
            }
        },

        async init() {
            this.isLoading = true
            this.error = null

            try {
                await this.fetchCharacters()
            } catch (error) {
                this.error = 'Erreur lors du chargement des données'
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
    },
})