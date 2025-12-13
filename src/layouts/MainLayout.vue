<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const menuOpen = ref(false)

  const onToggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  const onLogout = async () => {
    await useAuthStore().logout()
    await router.replace('/login')
  }
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          Reminders
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="onToggleMenu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="menuOpen"
      side="right"
      style="display: flex; flex-direction: column; padding: 0.5rem 0.75rem"
    >
      <q-btn
        dense
        flat
        round
        icon="close"
        style="align-self: flex-end"
        @click="onToggleMenu"
      />

      <q-tabs
        :vertical="true"
        align="right"
      >
        <q-route-tab
          label="Logout"
          v-on:click="onLogout()"
        />
      </q-tabs>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
  .q-layout {
    height: 100vh;
  }
</style>
