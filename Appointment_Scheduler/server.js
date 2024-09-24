const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/appointments', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  date: Date,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// API routes

// Get all appointments
app.get('/appointments', async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Add new appointment
app.post('/appointments', async (req, res) => {
  const { name, date } = req.body;
  const appointment = new Appointment({ name, date });
  await appointment.save();
  res.json(appointment);
});

// Delete appointment
app.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndDelete(id);
  res.json({ message: 'Appointment deleted' });
});

// Catch-all route to serve the index.html (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
