<template>
  <q-form
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @submit="onSubmit"
  >
    <q-input
      filled
      v-model="email"
      label="Email:"
      lazy-rules
      :rules="[(val) => !!val.length || 'Please enter your email']"
    />

    <q-input
      filled
      v-model="password"
      label="Password:"
      lazy-rules
      :type="showPassword ? 'password' : 'text'"
      :rules="[(val) => !!val.length || 'Please enter your password']"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>

    <q-btn
      type="submit"
      color="primary"
      style="align-self: flex-end"
    >
      Login
    </q-btn>
  </q-form>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const email = ref('')
  const password = ref('')
  const showPassword = ref(false)

  const onSubmit = async () => {
    await useAuthStore().login(email.value, password.value)

    await useRouter().replace('/')
  }
</script>

<style lang="scss" scoped>
  .q-form {
    display: flex;
    flex-direction: column;
  }
</style>
