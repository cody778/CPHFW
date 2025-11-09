import { schedules } from './schedules.js';

const tabs = document.querySelectorAll('.tabs button');
const eventsContainer = document.querySelector('.events');

// Define different event sets for each day



// Helper to render events
function renderEvents(day) {
  const events = schedules[day];

  // Group events by time
  const grouped = events.reduce((acc, event) => {
    if (!acc[event.time]) acc[event.time] = [];
    acc[event.time].push(event);
    return acc;
  }, {});

  eventsContainer.innerHTML = Object.entries(grouped).map(([time, group]) => `
    <div class="time-label">${time}</div>
    <div class="event-row">
      ${group.map(e => `
        <div class="event"
          data-title="${e.title}"
          data-type="${e.type}"
          data-date="${e.date}"
          data-time="${e.time}"
          data-host="${e.host || ''}"
          data-venue="${e.venue}"
          data-description="${e.description}"
          data-note="${e.note || ''}"
          data-image="${e.image}">
        <img src="${e.thumbnail}" alt="${e.title}" class="event-thumbnail"/>
        </div>
      `).join('')}
    </div>
  `).join('');
}


// Tab click logic
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderEvents(tab.textContent.trim());
  });
});

//show title mentioned in description
Object.values(schedules).forEach(dayEvents => {
  dayEvents.forEach(event => {
    if (event.description && event.description.includes("[title]")) {
      event.description = event.description.replace("[title]", event.title);
    } else if (event.description && event.description.includes("[TITLE]")) {
      event.description = event.description.replace("[TITLE]", event.title);
    }
  });
});

// show title + designer mentioned in host
Object.values(schedules).forEach(dayEvents => {
  dayEvents.forEach(event => {
    if (event.host && event.host.includes("[title]")) {
      event.host = event.host.replace("[title]", event.title);
    } else if (event.host && event.host.includes("[TITLE]")) {
      event.host = event.host.replace("[TITLE]", event.title);
    }
  });
});

// Initialize with the first day
renderEvents("27 January");

const modal = document.getElementById('eventModal');
const closeModal = document.getElementById('closeModal');

// Grab modal elements
const modalImage = modal.querySelector('.modal-image img');
const modalType = modal.querySelector('.type');
const modalTitle = modal.querySelector('.title');
const modalDateTime = modal.querySelector('.datetime');
const modalHost = modal.querySelector('.hosted span');
const modalVenue = modal.querySelector('.venue a');
const modalDescription = modal.querySelector('.description');
const modalNote = modal.querySelector('.note');

eventsContainer.addEventListener('click', e => {
  const card = e.target.closest('.event');
  if (!card) return;


  // Extract card data
  const title = card.dataset.title;
  const type = card.dataset.type;
  const date = card.dataset.date;
  const time = card.dataset.time;
  const host = card.dataset.host;
  const venue = card.dataset.venue;
  const description = card.dataset.description;
  const image = card.dataset.image || 'default-placeholder.jpg';
  const note = card.dataset.note;

  // Populate modal
  modalType.textContent = type;
  modalTitle.textContent = title;
  modalDateTime.innerHTML = `<strong>Date: ${date} &nbsp;|&nbsp; Time: ${time}</strong>`;
  modalHost.textContent = host;
  modalVenue.textContent = venue;
  modalVenue.href = "#";
  modalDescription.textContent = description;
  modalImage.src = image;
  modalNote.textContent = note;
  modal.classList.add('active');
});

closeModal.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});