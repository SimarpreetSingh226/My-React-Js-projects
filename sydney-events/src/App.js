import { useState, useEffect } from "react";
import "./index.css";

const mockEvents = [
  {
    id: "1",
    title: "Sydney Comedy Festival 2025",
    date: "2025-04-21T18:00:00",
    venue: "Bondi Pavilion",
    description:
      "Experience world-class performances at the iconic Bondi Pavilion.",
    url: "https://www.songkick.com/festivals/3576985-spilt-milk-gold-coast/id/42575567-spilt-milk-gold-coast-2025",
  },
  {
    id: "2",
    title: "Sydney Film Festival 2025",
    date: "2025-06-14T10:00:00",
    venue: "Art Gallery of New South Wales",
    description:
      "A prestigious film festival showcasing a wide range of films from around the world",
    url: "https://www.sff.org.au/tickets/",
  },
  {
    id: "3",
    title: "Sydney Food Truck Fiesta",
    date: "2025-11-20T12:00:00",
    venue: "Darling Harbour",
    description: "Taste diverse cuisines from Sydney’s best food trucks.",
    url: "https://foodtruckfiesta.com/tickets",
  },
];

// Simulate fetching events (replace with real API call if needed)
const fetchEvents = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(mockEvents), 1000);
  });

function validateEmail(email) {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
}

export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (e) {
        setError("Failed to load events.");
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();

    const interval = setInterval(loadEvents, 300000); // refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setEmail("");
    setOptIn(false);
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!optIn) {
      setFormError("Please agree to receive emails.");
      return;
    }
    // For demo, redirect to original event page after "submitting"
    window.location.href = selectedEvent.url;
  };

  return (
    <div className="container" role="main">
      <h1>Events in Sydney, Australia</h1>

      {isLoading && (
        <div className="loader" aria-live="polite">
          Loading events...
        </div>
      )}
      {error && (
        <div className="error-msg" role="alert">
          {error}
        </div>
      )}
      {!isLoading && !error && events.length === 0 && (
        <div className="error-msg" aria-live="polite">
          No events found.
        </div>
      )}

      <div
        className="events-grid"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {events.map((event) => (
          <article
            key={event.id}
            className="event-card"
            tabIndex={0}
            aria-labelledby={`${event.id}`}
          >
            <h2 id={`${event.id}`} className="event-title">
              {event.title}
            </h2>
            <p className="event-date">
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <p className="event-venue">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="event-description">{event.description}</p>
            <button
              className="get-tickets"
              onClick={() => openModal(event)}
              aria-label={`Get tickets for ${event.title}`}
            >
              GET TICKETS
            </button>
          </article>
        ))}
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content">
            <button
              className="modal-close"
              aria-label="Close modal"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 id="modal-title" className="modal-header">
              Get Tickets: {selectedEvent.title}
            </h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Enter your email address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-note"
              />
              <div id="email-note" className="email-note">
                We respect your privacy and won't spam your inbox.
              </div>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  required
                />
                I agree to receive email updates about this event.
              </label>
              {formError && (
                <div className="error-text" role="alert">
                  {formError}
                </div>
              )}
              <button type="submit" className="submit-btn">
                Submit & Redirect
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
