// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors()); // Permite solicitudes de otros dominios (tu Netlify)
app.use(express.json()); // Permite al servidor entender JSON

// --- Conexión a MongoDB ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// --- Modelo de Datos (Schema) ---
// Esto debe coincidir con la estructura de tus cards
const cardSchema = new mongoose.Schema({
  title: String,
  text: String
});

const Card = mongoose.model('Card', cardSchema);

// --- RUTAS (ENDPOINTS) DE LA API ---

// GET: Obtener todos los cards
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Crear un nuevo card
app.post('/api/cards', async (req, res) => {
  const card = new Card({
    title: req.body.title,
    text: req.body.text
  });
  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Eliminar un card por ID
// Usamos :id para un parámetro dinámico
app.delete('/api/cards/:id', async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ message: "Card no encontrado" });
    res.json({ message: 'Card eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT: Modificar un card por ID
app.put('/api/cards/:id', async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, text: req.body.text },
      { new: true } // Devuelve el documento actualizado
    );
    if (!updatedCard) return res.status(404).json({ message: "Card no encontrado" });
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});