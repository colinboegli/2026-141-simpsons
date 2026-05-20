import { defineStore } from 'pinia'
import api from '@/plugins/axios'

const FAVORITES_KEY = 'simpsons_favorites'
const CUSTOM_CHARACTERS_KEY = 'simpsons_custom_characters'

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [],
        customCharacters: [],
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
            return state.characters.filter(character =>
                state.favorites.includes(character.id),
            )
        },
    },

    actions: {
        async fetchCharacters() {
            const response = await api.get('/characters')

            const apiCharacters = Array.isArray(response.data)
                ? response.data
                : response.data.results || response.data.data || []

            this.characters = [
                ...this.customCharacters,
                ...apiCharacters,
            ]

            this.cleanupFavorites()
        },

        loadCustomCharacters() {
            try {
                const savedCharacters = localStorage.getItem(CUSTOM_CHARACTERS_KEY)
                this.customCharacters = savedCharacters
                    ? JSON.parse(savedCharacters)
                    : []
            } catch (error) {
                console.error('Erreur chargement personnages ajoutés :', error)
                this.customCharacters = []
            }
        },

        saveCustomCharacters() {
            localStorage.setItem(
                CUSTOM_CHARACTERS_KEY,
                JSON.stringify(this.customCharacters),
            )
        },

        async addCharacter(characterData) {
            if (!characterData.name || !characterData.status) {
                return {
                    success: false,
                    message: 'Le nom et le statut sont obligatoires',
                }
            }

            const newCharacter = {
                id: `custom-${Date.now()}`,
                name: characterData.name,
                status: characterData.status,
                age: characterData.age || null,
                occupation: characterData.occupation || 'Inconnue',
                image: characterData.image || '',
                description: characterData.description || '',
                custom: true,
            }

            this.customCharacters.unshift(newCharacter)
            this.characters.unshift(newCharacter)

            this.saveCustomCharacters()

            return {
                success: true,
                message: 'Personnage ajouté avec succès !',
            }
        },

        async deleteCharacter(characterId) {
            this.isLoading = true

            try {
                this.characters = this.characters.filter(
                    character => String(character.id) !== String(characterId),
                )

                this.customCharacters = this.customCharacters.filter(
                    character => String(character.id) !== String(characterId),
                )

                this.favorites = this.favorites.filter(
                    favoriteId => String(favoriteId) !== String(characterId),
                )

                this.saveCustomCharacters()
                this.saveFavorites()

                return {
                    success: true,
                    message: 'Personnage supprimé avec succès !',
                }
            } catch (error) {
                console.error(error)

                return {
                    success: false,
                    message: 'Erreur lors de la suppression',
                }
            } finally {
                this.isLoading = false
            }
        },

        loadFavorites() {
            try {
                const savedFavorites = localStorage.getItem(FAVORITES_KEY)
                this.favorites = savedFavorites ? JSON.parse(savedFavorites) : []
            } catch (error) {
                console.error('Erreur chargement favoris :', error)
                this.favorites = []
            }
        },

        saveFavorites() {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites))
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
            this.favorites = this.favorites.filter(favoriteId => {
                return this.characters.some(character => character.id === favoriteId)
            })

            this.saveFavorites()
        },

        async init() {
            this.isLoading = true
            this.error = null

            try {
                this.loadCustomCharacters()
                this.loadFavorites()
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