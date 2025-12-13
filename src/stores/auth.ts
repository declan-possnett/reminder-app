import { api } from '@/boot/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  getters: {},

  actions: {
    async login(email: string, password: string) {
      await api.post('/auth/login', { email, password })
    },

    async logout() {
      await api.get('/auth/logout')
    },

    async isAuthenticated() {
      try {
        const res = await api.get('/auth/me', { withCredentials: true })
        return !!res.data?.id
      } catch {
        return false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
