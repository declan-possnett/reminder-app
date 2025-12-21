<template>
  <div class="CreateReminder">
    <ReminderFormComponent
      :when="when"
      @create-reminder="onCreateReminder"
    />
  </div>
</template>

<script setup lang="ts">
  import ReminderFormComponent from '@/components/ReminderFormComponent.vue'
  import { DATE_MAP } from '@/constants/dates'
  import { useRemindersStore } from '@/stores/reminders'
  import type { Reminder } from '@/types/reminder'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const remindersStore = useRemindersStore()

  const when = (route.params?.when as string) ?? DATE_MAP.NEW

  const onCreateReminder = async (reminder: Reminder) => {
    await remindersStore.createReminder(reminder)
    await router.push('/')
  }
</script>

<style lang="scss" scoped>
  .CreateReminder {
    max-width: 500px;
    margin: auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
</style>
