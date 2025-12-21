<template>
  <q-form @submit="onCreate">
    <q-input
      v-model="model.title"
      label="Title"
    />
    <q-input
      v-model="model.description"
      label="Description"
      autogrow
    />
    <CalendarComponent @date-selected="(d) => (model.date = d)" />
    <q-toggle
      v-model="model.completed"
      label="Done?"
      left-label
    />
    <q-btn type="submit">Create</q-btn>
  </q-form>
</template>

<script setup lang="ts">
  import type { Reminder } from '@/types/reminder'
  import { reactive } from 'vue'
  import CalendarComponent from './CalendarComponent.vue'

  defineProps<{
    when: string
  }>()

  const model = reactive(<Reminder>{
    title: '',
    completed: false,
    description: '',
    date: null,
  })

  const onCreate = () => {
    console.log(model)
  }
</script>
