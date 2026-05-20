import { defineStore } from 'pinia'
import { setAuthToken } from '@/plugins/axios'

const AUTH_TOKEN_KEY = 'simpsons_auth_token'
const AUTH_USER_KEY = 'simpsons_auth_user'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        user: null,
        error: null,
    }),

    getters: {
        isAuthenticated: state => !!state.token,
    },

    actions: {
        login(email, password) {
            this.error = null

            if (email === 'homer@simpsons.com' && password === 'donut') {
                const token = 'fake-simpsons-token'

                this.token = token
                this.user = {
                    email,
                    name: 'Homer Simpson',
                }

                localStorage.setItem(AUTH_TOKEN_KEY, token)
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(this.user))
                setAuthToken(token)

                return {
                    success: true,
                    message: 'Connexion réussie !',
                }
            }

            this.error = 'Email ou mot de passe incorrect'

            return {
                success: false,
                message: this.error,
            }
        },

        logout() {
            this.token = null
            this.user = null
            this.error = null

            localStorage.removeItem(AUTH_TOKEN_KEY)
            localStorage.removeItem(AUTH_USER_KEY)
            setAuthToken(null)
        },

        loadToken() {
            const token = localStorage.getItem(AUTH_TOKEN_KEY)
            const savedUser = localStorage.getItem(AUTH_USER_KEY)

            if (token) {
                this.token = token
                this.user = savedUser ? JSON.parse(savedUser) : null
                setAuthToken(token)
            }
        },
    },
})