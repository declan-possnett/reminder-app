<template>
  <div class="QuickReminder">
    <q-btn
      color="primary"
      rounded
      @click="() => onAddReminder(DATE_MAP.NEW)"
    >
      Create&nbsp;<span>New</span>&nbsp;
      <q-icon
        color="white"
        name="add"
      />
    </q-btn>
    <q-btn
      color="primary"
      rounded
      @click="() => onAddReminder(DATE_MAP.TOMORROW_PM)"
    >
      Tomorrow&nbsp;<span>2pm</span>&nbsp;
      <q-icon
        color="white"
        name="add"
      />
    </q-btn>
    <q-btn
      color="primary"
      rounded
      @click="() => onAddReminder(DATE_MAP.TOMORROW_AM)"
    >
      Tomorrow&nbsp;<span>8am</span>&nbsp;
      <q-icon
        color="white"
        name="add"
      />
    </q-btn>
  </div>
</template>

<script setup lang="ts">
  import { DATE_MAP } from '@/constants/dates'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const onAddReminder = async (when: string) => {
    await router.push(`/reminder/create/${when}`)
  }
</script>

<style lang="scss" scoped>
  .QuickReminder {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    right: 0;
    justify-items: right;

    button {
      margin-left: auto;
      font-weight: 300;

      i {
        font-weight: 500;
      }
    }

    span {
      color: $warning;
      font-weight: 700;
    }
  }
</style>
