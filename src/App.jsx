import { useState } from "react";
import "./App.css";

// ===== Sample data (edit these to change the cards on the page) =====
const destinations = [
  {
    id: 1,
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=70",
    description:
      "A hill station in Himachal Pradesh known for snow-covered mountains, adventure sports and cool weather.",
    price: "Starting from approx. ₹8,000",
  },
  {
    id: 2,
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=70",
    description:
      "Famous for its beaches, seafood, old churches and relaxed atmosphere. Great for friends and families.",
    price: "Starting from approx. ₹7,500",
  },
  {
    id: 3,
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=70",
    description:
      "The Pink City of Rajasthan, full of forts, palaces, colourful markets and rich history.",
    price: "Starting from approx. ₹6,500",
  },
  {
    id: 4,
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=70",
    description:
      "Enjoy peaceful backwaters, houseboat stays, tea gardens and green hills in God's Own Country.",
    price: "Starting from approx. ₹9,000",
  },
];

const packages = [
  {
    id: 1,
    name: "Manali Snow Escape",
    duration: "4 Days / 3 Nights",
    price: "₹12,999 per person",
    description:
      "Sightseeing in Manali, Solang Valley visit and a free evening at Mall Road.",
    details: [
      "Hotel stay with breakfast",
      "Local sightseeing by cab",
      "Solang Valley visit",
    ],
  },
  {
    id: 2,
    name: "Goa Beach Holiday",
    duration: "3 Days / 2 Nights",
    price: "₹9,499 per person",
    description:
      "Relax on the beaches of North and South Goa with time to try local food.",
    details: [
      "Beach-side hotel stay",
      "North and South Goa tour",
      "Breakfast included",
    ],
  },
  {
    id: 3,
    name: "Kerala Backwaters Tour",
    duration: "5 Days / 4 Nights",
    price: "₹15,999 per person",
    description:
      "Visit Munnar and Alleppey, with a one-night stay on a traditional houseboat.",
    details: [
      "Hotel and houseboat stay",
      "Munnar tea garden visit",
      "Breakfast and dinner included",
    ],
  },
];

const navItems = [
  { label: "Home", target: "home" },
  { label: "Destinations", target: "destinations" },
  { label: "Packages", target: "packages" },
  { label: "About Us", target: "about" },
  { label: "Contact", target: "contact" },
];

function App() {
  // ===== State (data that can change and updates the page) =====
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu open or closed
  const [openPackageId, setOpenPackageId] = useState(null); // which package details are showing
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Open/close the details of one package card
  function toggleDetails(packageId) {
    if (openPackageId === packageId) {
      setOpenPackageId(null); // already open, so close it
    } else {
      setOpenPackageId(packageId);
    }
  }

  // Update formData whenever the user types in a field
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Check the form and return an object with any error messages
  function validateForm() {
    const newErrors = {};
    const nameValue = formData.name.trim();
    const emailValue = formData.email.trim();
    const messageValue = formData.message.trim();

    if (nameValue === "") {
      newErrors.name = "Please enter your name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      newErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(emailValue)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (messageValue === "") {
      newErrors.message = "Please write a message.";
    } else if (messageValue.length < 10) {
      newErrors.message = "Message should be at least 10 characters.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    setSuccessMessage("");

    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are no errors, show the success message.
    // NOTE: No backend is connected, so nothing is actually sent.
    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage(
        "Thank you, " +
          formData.name.trim() +
          "! Your form was filled correctly. (Demo only: no message was actually sent.)"
      );
      setFormData({ name: "", email: "", message: "" });
    }
  }

  return (
    <div>
      {/* ========== NAVIGATION BAR ========== */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            BeingVoyage
          </a>

          {/* Menu button (only visible on small screens) */}
          <button
            className="menu-button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776;
          </button>

          <nav>
            <ul className={menuOpen ? "nav-links open" : "nav-links"}>
              {navItems.map((item) => (
                <li key={item.target}>
                  <a href={"#" + item.target} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Explore New Places, Create New Memories</h1>
          <p>
            Discover beautiful destinations across India, from snowy mountains
            to sunny beaches, and plan your next trip with us.
          </p>
          <a href="#packages" className="btn">
            Explore Packages
          </a>
        </div>
      </section>

      {/* ========== POPULAR DESTINATIONS ========== */}
      <section id="destinations" className="section">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Some of the most loved places to visit in India.
          </p>

          <div className="card-grid">
            {destinations.map((place) => (
              <div className="card destination-card" key={place.id}>
                <img src={place.image} alt={place.name} />
                <div className="card-body">
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <p className="price">{place.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRAVEL PACKAGES ========== */}
      <section id="packages" className="section section-light">
        <div className="container">
          <h2 className="section-title">Travel Packages</h2>
          <p className="section-subtitle">
            Prices are illustrative (sample values only) and may differ in real
            life.
          </p>

          <div className="card-grid">
            {packages.map((pack) => (
              <div className="card package-card" key={pack.id}>
                <div className="card-body">
                  <h3>{pack.name}</h3>
                  <p className="duration">{pack.duration}</p>
                  <p className="price">{pack.price}</p>
                  <p>{pack.description}</p>

                  <button className="btn" onClick={() => toggleDetails(pack.id)}>
                    {openPackageId === pack.id ? "Hide Details" : "View Details"}
                  </button>

                  {/* Only shown when this package is the open one */}
                  {openPackageId === pack.id && (
                    <div className="details-box">
                      <ul>
                        {pack.details.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT US ========== */}
      <section id="about" className="section">
        <div className="container about-container">
          <h2 className="section-title">About Us</h2>
          <p>
            BeingVoyage is a small travel company that helps people plan
            enjoyable and stress-free trips. We believe travelling should be
            simple, so we offer easy-to-understand packages for popular places
            in India.
          </p>
          <p>
            Our goal is to help you spend less time planning and more time
            making memories, whether you are going with family, friends or on
            your own.
          </p>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="section section-light">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have a question or want to plan a trip? Send us a message.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="error-message">{errors.name}</span>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="error-message">{errors.email}</span>

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <span className="error-message">{errors.message}</span>

            <button type="submit" className="btn">
              Submit
            </button>

            {successMessage && <p className="form-success">{successMessage}</p>}
          </form>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container footer-container">
          <div>
            <h3>BeingVoyage</h3>
            <p>Plan your trip, enjoy the journey.</p>
          </div>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.target}>
                <a href={"#" + item.target}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className="copyright">&copy; 2026 BeingVoyage. A student project.</p>
      </footer>
    </div>
  );
}

export default App;