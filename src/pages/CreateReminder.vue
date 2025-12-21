<template>
  <div class="CreateReminder">
    <ReminderFormComponent :when="when" />
  </div>
</template>

<script setup lang="ts">
  import ReminderFormComponent from '@/components/ReminderFormComponent.vue'
  import { DATE_MAP } from '@/constants/dates'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const when = (route.params?.when as string) ?? DATE_MAP.NEW
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
