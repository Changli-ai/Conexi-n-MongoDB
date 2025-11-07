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

// URL de tu API. Para desarrollo local:
const API_BASE_URL = 'http://localhost:3000/api/cards'

// --- 1. ESTADO (STATE) ---
const cards = ref([]) // Inicia vacío
const searchQuery = ref('')
const newCardTitle = ref('')

// --- 2. ESTADO COMPUTADO (COMPUTED) ---
const filteredCards = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) {
    return cards.value
  }
  return cards.value.filter(card => {
    const titleMatch = card.title.toLowerCase().includes(query)
    // CAMBIO AQUÍ: Busca por _id
    const idMatch = String(card._id).toLowerCase().includes(query)
    return titleMatch || idMatch
  })
})

// --- 3. MÉTODOS (METHODS) ---

// NUEVA: Función para cargar los cards desde la API
async function loadCards() {
  try {
    const response = await axios.get(API_BASE_URL)
    cards.value = response.data // Carga los cards desde la base de datos
  } catch (error) {
    console.error('Error al cargar cards:', error)
  }
}

// Carga los cards cuando el componente se monta
onMounted(() => {
  loadCards()
})

// Función para AÑADIR un card
async function addCard() {
  const title = newCardTitle.value.trim()
  if (!title) return

  const newCard = {
    title: title,
    text: 'Nuevo card. Haz clic en el lápiz para editar el texto.'
  }

  try {
    await axios.post(API_BASE_URL, newCard)
    newCardTitle.value = '' // Limpia el campo
    await loadCards() // Recarga la lista desde la BD
  } catch (error) {
    console.error('Error al añadir card:', error)
  }
}

// Función para ELIMINAR un card
async function deleteCard(cardId) {
  if (confirm('¿Estás seguro de que quieres eliminar este card?')) {
    try {
      await axios.delete(`${API_BASE_URL}/${cardId}`)
      await loadCards() // Recarga la lista desde la BD
    } catch (error) {
      console.error('Error al eliminar card:', error)
    }
  }
}

// Función para MODIFICAR un card
async function editCard(card) {
  const newTitle = prompt('Introduce el nuevo título:', card.title)
  const newText = prompt('Introduce el nuevo texto:', card.text)

  if (!newTitle || !newText) return // No hacer nada si cancela

  try {
    await axios.put(`${API_BASE_URL}/${card.id}`, {
      title: newTitle.trim(),
      text: newText.trim()
    })
    await loadCards() // Recarga la lista
  } catch (error) {
    console.error('Error al editar card:', error)
  }
}
</script>