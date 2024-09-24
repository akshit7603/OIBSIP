document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointmentForm');
    const appointmentList = document.getElementById('appointmentList');
  
    // Fetch existing appointments
    fetchAppointments();
  
    // Add appointment
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
  
      if (name && date) {
        await addAppointment({ name, date });
        form.reset();
      }
    });
  
    // Delete appointment
    appointmentList.addEventListener('click', async (e) => {
      if (e.target.tagName === 'BUTTON') {
        const id = e.target.dataset.id;
        await deleteAppointment(id);
      }
    });
  
    async function fetchAppointments() {
      const res = await fetch('/appointments');
      const data = await res.json();
  
      appointmentList.innerHTML = '';
      data.forEach(appointment => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${appointment.name} - ${new Date(appointment.date).toLocaleString()}
          <button data-id="${appointment._id}">Delete</button>
        `;
        appointmentList.appendChild(li);
      });
    }
  
    async function addAppointment(appointment) {
      await fetch('/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      });
      fetchAppointments();
    }
  
    async function deleteAppointment(id) {
      await fetch(`/appointments/${id}`, {
        method: 'DELETE',
      });
      fetchAppointments();
    }
  });
  