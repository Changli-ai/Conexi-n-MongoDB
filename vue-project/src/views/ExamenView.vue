<template>
  <v-container>
    <v-card flat title="EXAMEN - Paneles de Expansión">
      <v-card-text>
        
        <v-expansion-panels>
          
          <v-expansion-panel
            v-for="item in expansions"
            :key="item.id"
          >
            
            <v-expansion-panel-title>
              {{ item.titulo }}
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              {{ item.contenido }}
            </v-expansion-panel-text>

          </v-expansion-panel>
        </v-expansion-panels>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const expansions = ref([
  { 
    id: 1, 
    titulo: 'Panel de Título 1', 
    contenido: 'Este es el contenido del primer panel.' 
  },
  { 
    id: 2, 
    titulo: 'Panel de Título 2', 
    contenido: 'Este es el contenido del segundo panel.' 
  },
  { 
    id: 3, 
    titulo: 'Panel de Título 3', 
    contenido: 'Este es el contenido del tercer panel.' 
  },
])
</script>