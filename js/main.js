// ---------- Events Data ----------
// This array is our "database" — since we have no backend, all event
// data lives here and gets rendered dynamically into the DOM.
const events = [
  {
    id: 1,
    title: "Web Dev Bootcamp",
    category: "Workshop",
    date: "2026-09-25",
    time: "2:00 PM",
    venue: "CS Auditorium",
    description:
      "A hands-on workshop covering HTML, CSS, and JavaScript fundamentals for beginners.",
    society: "Computer Science Society",
  },
  {
    id: 2,
    title: "Inter-University Debate Championship",
    category: "Competition",
    date: "2026-09-28",
    time: "11:00 AM",
    venue: "Main Hall",
    description:
      "Teams from across the region compete in a high-stakes debate tournament.",
    society: "Debating Society",
  },
  {
    id: 3,
    title: "Robotics Showcase",
    category: "Society",
    date: "2026-10-02",
    time: "4:00 PM",
    venue: "Engineering Block, Room 210",
    description:
      "See student-built robots in action and learn how to join the robotics team.",
    society: "Robotics Club",
  },
  {
    id: 4,
    title: "Photography Walk & Exhibit",
    category: "Society",
    date: "2026-10-05",
    time: "9:00 AM",
    venue: "Campus Gardens",
    description:
      "A guided photo walk followed by an evening exhibition of student work.",
    society: "Photography Society",
  },
  {
    id: 5,
    title: "Startup Pitch Night",
    category: "Competition",
    date: "2026-10-10",
    time: "6:00 PM",
    venue: "Business Building Hall",
    description:
      "Students pitch original startup ideas to a panel of judges for cash prizes.",
    society: "Entrepreneurship Society",
  },
  {
    id: 6,
    title: "UI/UX Design Workshop",
    category: "Workshop",
    date: "2026-10-14",
    time: "1:00 PM",
    venue: "IT Lab 3",
    description:
      "Learn Figma basics and design principles to build better user interfaces.",
    society: "Computer Science Society",
  },
];

// ---------- Helper: format date nicely ----------
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// ---------- Render All Events (Events Page) with Filter + Search ----------
let currentCategory = "All";
let currentSearchTerm = "";

function renderEventsGrid() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return; // only run on events.html

  const noResults = document.getElementById("noResults");

  // Filter by category first
  let filtered =
    currentCategory === "All"
      ? events
      : events.filter((event) => event.category === currentCategory);

  // Then filter by search term (matches title or description)
  if (currentSearchTerm.trim() !== "") {
    const term = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term),
    );
  }

  // Show "no results" message if nothing matches
  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  grid.innerHTML = filtered
    .map(
      (event) => `
    <div class="event-card" data-id="${event.id}">
      <span class="event-card-category">${event.category}</span>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <div class="event-card-date">
        📅 ${formatDate(event.date)} &nbsp;•&nbsp; ${event.time}
      </div>
    </div>
  `,
    )
    .join("");

  // Attach click listeners to each newly created card to open the modal
  grid.querySelectorAll(".event-card").forEach((card) => {
    card.addEventListener("click", () => {
      const eventId = parseInt(card.dataset.id);
      openEventModal(eventId);
    });
  });
}

// ---------- Category Filter Buttons ----------
const filterButtons = document.getElementById("filterButtons");
if (filterButtons) {
  filterButtons.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons, add to the clicked one
      filterButtons
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.category;
      renderEventsGrid();
    });
  });
}

// ---------- Live Search ----------
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearchTerm = e.target.value;
    renderEventsGrid();
  });
}

// ---------- Modal Logic ----------
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
let countdownInterval = null; // holds our timer so we can clear it later

function openEventModal(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (!event) return;

  document.getElementById("modalCategory").textContent = event.category;
  document.getElementById("modalTitle").textContent = event.title;
  document.getElementById("modalDescription").textContent = event.description;
  document.getElementById("modalDate").textContent = formatDate(event.date);
  document.getElementById("modalTime").textContent = event.time;
  document.getElementById("modalVenue").textContent = event.venue;
  document.getElementById("modalSociety").textContent = event.society;

  modalOverlay.classList.add("active");

  startCountdown(event.date, event.time);
}

function closeEventModal() {
  modalOverlay.classList.remove("active");
  clearInterval(countdownInterval); // stop the timer so it doesn't keep running in the background
}

if (modalClose) {
  modalClose.addEventListener("click", closeEventModal);
}

if (modalOverlay) {
  // Close modal when clicking the dark overlay itself (not the modal box)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeEventModal();
  });
}

// ---------- Countdown Timer ----------
function startCountdown(dateStr, timeStr) {
  const countdownEl = document.getElementById("modalCountdown");
  clearInterval(countdownInterval); // clear any previous countdown before starting a new one

  // Combine date + time into one Date object
  const targetDate = new Date(`${dateStr} ${timeStr}`);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now; // difference in milliseconds

    if (diff <= 0) {
      countdownEl.textContent = "This event has started!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s until this event`;
  }

  updateCountdown(); // run immediately so there's no 1-second delay before first display
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Initial render on page load
renderEventsGrid();

// ---------- Render Featured Events (Home Page) ----------
function renderFeaturedEvents() {
  const grid = document.getElementById("featuredEventsGrid");
  if (!grid) return; // only run this on pages that have this element

  // Take the first 3 events for the homepage preview
  const featured = events.slice(0, 3);

  grid.innerHTML = featured
    .map(
      (event) => `
    <div class="event-card">
      <span class="event-card-category">${event.category}</span>
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <div class="event-card-date">
        📅 ${formatDate(event.date)} &nbsp;•&nbsp; ${event.time}
      </div>
    </div>
  `,
    )
    .join("");
}

renderFeaturedEvents();

// ---------- Hamburger Menu Toggle ----------
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburgerBtn.classList.toggle("open");
});

// Close menu when a link is clicked (mobile UX improvement)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburgerBtn.classList.remove("open");
  });
});
