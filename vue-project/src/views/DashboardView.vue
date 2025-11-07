<template>
  <v-container>
    <v-row class="mb-4">
      <v-col
  v-for="card in filteredCards"
  :key="card._id" 
  cols="12"
  md="6"
>
  <v-card class="mx-auto" elevation="4">
    <v-card-item>
      <v-card-title>
        {{ card.title }}
      </v-card-title>
      <v-card-subtitle>
        ID: {{ card._id }} </v-card-subtitle>
    </v-card-item>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        icon="mdi-pencil"
        variant="text"
        @click="editCard(card)" 
        title="Modificar"
      ></v-btn>
      <v-btn
        color="red"
        icon="mdi-delete"
        variant="text"
        @click="deleteCard(card._id)" title="Eliminar"
      ></v-btn>
    </v-card-actions>
  </v-card>
</v-col>
</v-row>
</v-container>
</template> 

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// 1. ESTA ES LA CLAVE: Usamos una variable de entorno
// Netlify proveerá este valor.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/cards';

// --- 1. ESTADO (STATE) ---
const cards = ref([]) // Inicia vacío, se llenará desde la API
const searchQuery = ref('')
const newCardTitle = ref('')

// --- 2. ESTADO COMPUTADO (COMPUTED) ---
const filteredCards = computed(() => {
  // ... (El código de computed no cambia) ...
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) {
    return cards.value
  }
  return cards.value.filter(card => {
    const titleMatch = card.title.toLowerCase().includes(query)
    // CAMBIO: MongoDB usa _id (con guion bajo)
    const idMatch = String(card._id).toLowerCase().includes(query)
    return titleMatch || idMatch
  })
})

// --- 3. MÉTODOS (METHODS) ---

// NUEVO: Cargar datos desde la API
async function loadCards() {
  try {
    const response = await axios.get(API_BASE_URL)
    cards.value = response.data
  } catch (error) {
    console.error('Error al cargar cards:', error)
  }
}

// Carga los cards cuando el componente se monta
onMounted(() => {
  loadCards()
})

// MODIFICADO: Añadir un card
async function addCard() {
  const title = newCardTitle.value.trim()
  if (!title) return

  const newCard = {
    title: title,
    text: 'Nuevo card. Haz clic en el lápiz para editar el texto.'
  }

  try {
    // Llama a la API para crear
    await axios.post(API_BASE_URL, newCard)
    newCardTitle.value = ''
    await loadCards() // Recarga la lista
  } catch (error) {
    console.error('Error al añadir card:', error)
  }
}

// MODIFICADO: Eliminar un card
async function deleteCard(cardId) {
  if (confirm('¿Estás seguro de que quieres eliminar este card?')) {
    try {
      // Llama a la API para borrar
      await axios.delete(`${API_BASE_URL}/${cardId}`)
      await loadCards() // Recarga la lista
    } catch (error) {
      console.error('Error al eliminar card:', error)
    }
  }
}

// MODIFICADO: Editar un card
async function editCard(card) {
  const newTitle = prompt('Introduce el nuevo título:', card.title)
  if (!newTitle || newTitle.trim() === '') return

  const newText = prompt('Introduce el nuevo texto:', card.text)
  if (newText === null) return // Permite texto vacío si el usuario da "Aceptar"

  try {
    // Llama a la API para actualizar
    await axios.put(`${API_BASE_URL}/${card._id}`, {
      title: newTitle.trim(),
      text: newText.trim()
    })
    await loadCards() // Recarga la lista
  } catch (error) {
    console.error('Error al editar card:', error)
  }
}
</script>