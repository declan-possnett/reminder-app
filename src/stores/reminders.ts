import { api } from '@/boot/axios'
import type { Reminder } from '@/types/reminder'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    reminders: [] as Reminder[],
  }),

  getters: {},

  actions: {
    async fetchAllReminders() {
      const { data } = await api.get('/reminders')

      this.reminders = data.data ?? []
    },

    async createReminder(reminder: Reminder) {
      await api.post('/reminders', reminder)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRemindersStore, import.meta.hot))
}
