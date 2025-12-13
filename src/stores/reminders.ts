import { api } from '@/boot/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  getters: {},

  actions: {
    async getAllReminders() {
      await api.get('/reminders')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRemindersStore, import.meta.hot))
}
