import { defineStore } from 'pinia'

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
                return state.characters.find(character => String(character.id) === String(characterId))
            }
        },
    },

    actions: {
        async fetchCharacters() {
            try {
                const response = await fetch('https://thesimpsonsapi.com/api/characters')

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`)
                }

                const data = await response.json()

                this.characters = Array.isArray(data)
                    ? data
                    : data.results || data.data || []
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