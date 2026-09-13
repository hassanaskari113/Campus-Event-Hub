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
