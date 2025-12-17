<template>
  <div
    class="Reminder"
    @click="onClickReminder"
  >
    <div class="Reminder-content">
      <h2>{{ title }}</h2>
      <p v-if="!!description">{{ description }}</p>
      <p class="Reminder-date">
        {{ formattedDate }}
      </p>
    </div>

    <div class="Reminder-actions">
      <q-btn
        rounded
        flat
        icon="snooze"
        @click="(e) => onSnoozeAction(e)"
      />

      <q-btn
        rounded
        flat
        icon="check"
        @click="(e) => onCompleteAction(e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    title: string
    description?: string | null
    date?: string | null
  }>()

  const formattedDate = computed(() => {
    return props.date ? new Date().toDateString() : 'No date set'
  })

  const onClickReminder = () => {
    console.log('REMINDER')
  }

  const onSnoozeAction = (e: Event) => {
    e.stopPropagation()
    console.log('SNOOZE')
  }

  const onCompleteAction = (e: Event) => {
    e.stopPropagation()
    console.log('COMPLETE')
  }
</script>

<style lang="scss" scoped>
  .Reminder {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid $primary;
    padding: 0.5rem 1rem;
    justify-content: space-between;

    &-content {
      flex: 1; // take remaining space
      min-width: 0; // allow shrinking
    }

    &-actions {
      flex-shrink: 0; // buttons stay visible
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    @mixin text-ellipsis {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h2 {
      font-size: 1rem;
    }

    h2,
    p {
      margin: 0;
      @include text-ellipsis;
    }

    &-date {
      color: $light-faded;
      flex-shrink: 0; // date won't truncate
    }
  }
</style>
