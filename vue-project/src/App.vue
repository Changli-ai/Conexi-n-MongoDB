<template>
  <v-app id="inspire">
    <v-app-bar
      class="px-3"
      density="compact"
      flat
    >
      <v-avatar
        class="hidden-md-and-up"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs
        align-tabs="center"
        color="grey-darken-2"
      >
        <v-tab
          v-for="link in links"
          :key="link.text"
          :text="link.text"
          :to="link.to"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"  >
            <v-sheet
              min-height="268"
              rounded="lg"
            >
              </v-sheet>
          </v-col>

          <v-col
            cols="12"
            md="6"  >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <RouterView />
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            md="3"  >
            <v-sheet
              min-height="268"
              rounded="lg"
            >
              </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router';

// ¡Estos links ahora coinciden con tu router/index.js!
const links = [
  { text: 'Dashboard', to: '/' },
  { text: 'Messages', to: '/messages' },
  { text: 'Profile', to: '/profile' },
  { text: 'Updates', to: '/updates' },
  { text: 'Examen', to: '/examen' },
]
</script>

<style scoped>
/* Puedes añadir estilos aquí si lo necesitas */
</style>