import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from '@tanstack/react-router'
import "./Home.css";

export function HomeUI() {
  return (
    <main className="hero" id="home">
      <img
        className="hero__image"
        src="https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="A scenic landscape in India"
      />

      <div className="hero__shade" />

      <header className="site-header">
        <a className="brand" href="#home">
          Dekho Bharat
        </a>

        <nav className="nav">
          <Link to="/museum">Museum</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>
      </header>

      <section className="hero__content">
        <p className="eyebrow">
          A journey through culture, nature &amp; history
        </p>

        <h1>
          DISCOVER
          <br />
          INCREDIBLE INDIA
        </h1>

        <p className="intro">
          Explore beautiful landscapes, living history, and a breathtaking
          3D museum—made for the curious traveller.
        </p>

        <Link className="cta" to="/museum">
          Start Exploring <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <aside className="social-icons">

<a href="https://www.facebook.com/BeautifulBharata/photos/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
<a href="https://www.instagram.com/popular/indian-landscape/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
<a href="https://x.com/IndiaAesthetica?lang=en" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </aside>
    </main>
  );
}
