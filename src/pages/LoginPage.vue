<template>
  <div class="LoginPage">
    <h1>Reminder App</h1>

    <h2>Login</h2>

    <LoginForm />
  </div>
</template>

<script setup lang="ts">
  import LoginForm from '@/components/LoginForm.vue'
</script>

<style lang="scss" scoped>
  .LoginPage {
    max-width: 500px;
    margin: auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    h1 {
      text-align: center;
    }
  }
</style>
