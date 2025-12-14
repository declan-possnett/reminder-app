<script setup lang="ts">
  //
</script>

<template>
  <div class="QuickReminder">
    <q-btn color="primary">
      <q-icon
        color="warning"
        name="add"
        size="1rem"
      />
      Tomorrow&nbsp;<span>8am</span>
    </q-btn>

    <q-btn color="primary">
      <q-icon
        color="warning"
        name="add"
        size="1rem"
      />
      Tomorrow&nbsp;<span>2pm</span>
    </q-btn>
  </div>
</template>

<style lang="scss" scoped>
  .QuickReminder {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    button {
      font-weight: 400;
    }

    i {
      font-weight: 400;
      margin-right: 0.5rem;
    }

    span {
      color: $warning;
      font-weight: 700;
    }
  }
</style>
