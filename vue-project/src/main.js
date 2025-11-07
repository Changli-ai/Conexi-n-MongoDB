// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // Importa tu plugin de Vuetify
import router from './router' // Importa tu router (el de /src/router/index.js)

const app = createApp(App)

app.use(vuetify) // Usa Vuetify
app.use(router) // Usa el Router

app.mount('#app')