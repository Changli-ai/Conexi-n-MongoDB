// src/plugins/vuetify.js

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Importa los iconos
import 'vuetify/styles'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives
})

export default vuetify