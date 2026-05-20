import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [],
        favorites: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        totalCharacters: state => state.characters.length,

        totalFavorites: state => state.favorites.length,

        getCharacterById: state => {
            return characterId => {
                return state.characters.find(
                    character => String(character.id) === String(characterId),
                )
            }
        },

        isFavorite: state => {
            return character => {
                return state.favorites.includes(character.id)
            }
        },

        getFavorites: state => {
            const favoriteCharacters = state.favorites.map(favoriteId => {
                return state.characters.find(
                    character => character.id === favoriteId,
                )
            })

            return favoriteCharacters.filter(
                character => character !== undefined,
            )
        },
    },

    actions: {
        async fetchCharacters() {
            const response = await api.get('/characters')

            this.characters = Array.isArray(response.data)
                ? response.data
                : response.data.results || response.data.data || []

            this.cleanupFavorites()
        },

        async addCharacter(characterData) {
            if (!characterData.name || !characterData.status) {
                return {
                    success: false,
                    message: 'Le nom et le statut du personnage sont obligatoires',
                }
            }

            const newCharacter = {
                id: Date.now(),
                name: characterData.name,
                status: characterData.status,
                age: characterData.age || null,
                occupation: characterData.occupation || 'Inconnue',
                image: characterData.image || '',
                description: characterData.description || '',
            }

            this.characters.unshift(newCharacter)

            return {
                success: true,
                message: 'Personnage ajouté localement avec succès !',
            }
        },

        loadFavorites() {
            try {
                const savedFavorites = localStorage.getItem('simpsons_favorites')

                if (savedFavorites) {
                    this.favorites = JSON.parse(savedFavorites)
                } else {
                    this.favorites = []
                }
            } catch (error) {
                console.error('Erreur lors du chargement des favoris :', error)
                this.favorites = []
            }
        },

        saveFavorites() {
            try {
                localStorage.setItem(
                    'simpsons_favorites',
                    JSON.stringify(this.favorites),
                )
            } catch (error) {
                console.error('Erreur lors de la sauvegarde des favoris :', error)
            }
        },

        toggleFavorite(character) {
            const favoriteIndex = this.favorites.findIndex(
                favoriteId => favoriteId === character.id,
            )

            if (favoriteIndex === -1) {
                this.favorites.push(character.id)
            } else {
                this.favorites.splice(favoriteIndex, 1)
            }

            this.saveFavorites()
        },

        cleanupFavorites() {
            const initialCount = this.favorites.length

            this.favorites = this.favorites.filter(favoriteId => {
                return this.characters.some(
                    character => character.id === favoriteId,
                )
            })

            const removedCount = initialCount - this.favorites.length

            if (removedCount > 0) {
                this.saveFavorites()
            }
        },

        async init() {
            this.isLoading = true
            this.error = null

            try {
                await this.fetchCharacters()
                this.loadFavorites()
                this.cleanupFavorites()
            } catch (error) {
                this.error = 'Erreur lors du chargement des données'
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
    },
})