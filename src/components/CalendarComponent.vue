<script lang="ts" setup>
  import { computed, ref } from 'vue'

  const maxDaysOnCalendarUI = 42

  enum MONTH_STATES {
    PREV = 'PREV',
    CURR = 'CURR',
    NEXT = 'NEXT',
  }

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

  const selectedDay = ref(new Date().getDate())
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
      monthState: MONTH_STATES.PREV,
    })),
    ...Array.from(
      { length: getTotalDaysInMonth(currentMonthIndex.value) },
      (_, i) => ({
        id: crypto.randomUUID(),
        day: i + 1,
        class: [
          i + 1 === selectedDay.value && 'selected',
          i + 1 === new Date().getDate() &&
            currentMonthIndex.value === new Date().getMonth() &&
            'today',
        ],
        monthState: MONTH_STATES.CURR,
      }),
    ),
    ...Array.from({ length: nextMonthClippedDays.value }, (_, i) => ({
      id: crypto.randomUUID(),
      day: i + 1,
      class: 'faded',
      monthState: MONTH_STATES.NEXT,
    })),
  ])

  const onPreviousMonth = () => {
    if (monthIndex.value <= 0) {
      monthIndex.value = 11
      year.value--
    } else {
      monthIndex.value--
    }

    selectedDay.value = 0
  }

  const onNextMonth = () => {
    if (monthIndex.value >= 11) {
      monthIndex.value = 0
      year.value++
    } else {
      monthIndex.value++
    }

    selectedDay.value = 0
  }

  const setSelectedDay = (day: number, monthState: MONTH_STATES) => {
    switch (monthState) {
      case MONTH_STATES.PREV:
        onPreviousMonth()
        break
      case MONTH_STATES.NEXT:
        onNextMonth()
        break
      default:
        break
    }

    selectedDay.value = day
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
          {{ displayMonth }}
        </h4>
      </q-btn>
      <q-btn flat>
        <h4 class="flex justify-center">
          {{ currentYear }}
        </h4>
      </q-btn>
      <q-btn
        flat
        icon="keyboard_arrow_right"
        @click="onNextMonth"
      />
    </div>

    <div class="Calendar-weekdays">
      <span
        :key="weekday"
        v-for="weekday in ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']"
      >
        {{ weekday }}
      </span>
    </div>

    <div class="Calendar-cells">
      <div
        class="Calendar-cell"
        :class="cell.class"
        :key="cell.id"
        v-for="cell in cells"
        @click="() => setSelectedDay(cell.day, cell.monthState)"
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
      margin-bottom: 0.5rem;

      h4 {
        font-size: 1rem;
      }
    }

    &-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.5rem;
      margin-bottom: 0.5rem;

      span {
        justify-self: center;
        color: #ccc;
      }
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
      line-height: normal;

      &.today {
        background: #333;
      }

      &.faded {
        color: #888;
      }

      &.selected {
        background: $primary;
      }
    }
  }
</style>
