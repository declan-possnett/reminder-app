<script setup lang="ts">
  // import CalendarComponent from '@/components/CalendarComponent.vue'
  import QuickReminderComponent from '@/components/QuickReminderComponent.vue'
  import ReminderComponent from '@/components/ReminderComponent.vue'
  import { useRemindersStore } from '@/stores/reminders'
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  const remindersStore = useRemindersStore()

  const { reminders } = storeToRefs(remindersStore)

  onMounted(async () => {
    await remindersStore.fetchAllReminders()
  })
</script>

<template>
  <q-page class="Home">
    <div>
      <ReminderComponent
        v-for="reminder in reminders"
        :key="reminder.id"
        :title="reminder.title"
        :description="reminder.description ?? ''"
        :date="reminder.date ?? ''"
      />
    </div>
    <!-- <CalendarComponent /> -->
    <QuickReminderComponent />
  </q-page>
</template>

<style lang="scss" scoped>
  .Home {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
