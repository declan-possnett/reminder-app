<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
          DP Reminder App
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
      show-if-above
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
          to="/page1"
          label="Page One"
        />
        <q-route-tab
          to="/page2"
          label="Page Two"
        />
        <q-route-tab
          to="/page3"
          label="Page Three"
        />
      </q-tabs>
    </q-drawer>

    <q-page-container style="padding-left: 1rem; padding-right: 1rem">
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs align="right">
        <q-route-tab
          to="/page1"
          label="Page One"
        />
        <q-route-tab
          to="/page2"
          label="Page Two"
        />
        <q-route-tab
          to="/page3"
          label="Page Three"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const menuOpen = ref(false)

  const onToggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
</script>
