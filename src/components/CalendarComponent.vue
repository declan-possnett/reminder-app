<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const maxDaysOnCalendarUI = 42

  const MONTH_INDEX_MAP: Record<number, string> = Object.freeze({
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  })

  const getTotalDaysInMonth = (month: number) => {
    const now = new Date()
    const year = now.getFullYear()

    return new Date(year, month + 1, 0).getDate()
  }

  const monthIndex = ref(new Date().getMonth())
  const year = ref(new Date().getFullYear())

  const displayMonth = computed(() => MONTH_INDEX_MAP[monthIndex.value])

  const dayOfFirstDateOfMonth = computed(() => {
    const d = new Date()
    d.setMonth(monthIndex.value)
    d.setDate(0)
    return d
  })

  const prevMonthClippedDays = computed(() =>
    dayOfFirstDateOfMonth.value.getDay(),
  )

  const currentMonthIndex = computed(() => monthIndex.value)
  const currentYear = computed(() => year.value)

  const nextMonthClippedDays = computed(
    () =>
      maxDaysOnCalendarUI -
      prevMonthClippedDays.value -
      getTotalDaysInMonth(currentMonthIndex.value),
  )

  const cells = computed(() => [
    ...Array.from({ length: prevMonthClippedDays.value }, (_, i) => ({
      id: crypto.randomUUID(),
      day:
        i +
        getTotalDaysInMonth(currentMonthIndex.value - 1) -
        prevMonthClippedDays.value +
        1,
      class: 'faded',
    })),
    ...Array.from(
      { length: getTotalDaysInMonth(currentMonthIndex.value) },
      (_, i) => ({
        id: crypto.randomUUID(),
        day: i + 1,
        class: i + 1 === new Date().getDate() && 'selected',
      }),
    ),
    ...Array.from({ length: nextMonthClippedDays.value }, (_, i) => ({
      id: crypto.randomUUID(),
      day: i + 1,
      class: 'faded',
    })),
  ])

  const onPreviousMonth = () => {
    if (monthIndex.value <= 0) {
      monthIndex.value = 11
    } else {
      year.value--
      monthIndex.value--
    }
  }

  const onNextMonth = () => {
    if (monthIndex.value >= 11) {
      monthIndex.value = 0
    } else {
      year.value++
      monthIndex.value++
    }
  }
</script>

<template>
  <div class="Calendar">
    <div class="Calendar-months">
      <q-btn
        flat
        icon="keyboard_arrow_left"
        @click="onPreviousMonth"
      />
      <q-btn flat>
        <h4 class="flex justify-center">
          {{ displayMonth }} {{ currentYear }}
        </h4>
      </q-btn>
      <q-btn
        flat
        icon="keyboard_arrow_right"
        @click="onNextMonth"
      />
    </div>
    <div class="Calendar-cells">
      <div
        class="Calendar-cell"
        :class="cell.class"
        :key="cell.id"
        v-for="cell in cells"
      >
        <span>
          {{ cell.day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .Calendar {
    padding: 1rem;
    background: $dark;
    color: white;

    &-months {
      display: flex;
      justify-content: space-between;
      padding-bottom: 1rem;
    }

    &-cells {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 0.5rem;
    }

    &-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px solid #333333;
      border-radius: 50%;
      font-size: 1rem;
      aspect-ratio: 1/1;

      &.faded {
        color: #8a8a8a;
      }

      &.selected {
        background: $primary;
        font-weight: bold;
      }
    }
  }
</style>
