import "@fontsource/red-hat-display/latin-400.css";
import "@fontsource/red-hat-display/latin-500.css";
import "@fontsource/red-hat-display/latin-700.css";
import "@fontsource/red-hat-text/latin-400.css";
import "@fontsource/red-hat-text/latin-500.css";
import "@fontsource/red-hat-mono/latin-400.css";
import "@fontsource/red-hat-mono/latin-500.css";
import "./styles.css";
import "./docs.css";

const nav = document.querySelector(".site-nav");
const onScroll = () => nav.classList.toggle("nav-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Collapse the docs menu on narrow screens (open by default for no-JS and desktop).
const menu = document.querySelector(".docs-menu");
if (menu && window.matchMedia("(max-width: 900px)").matches) menu.open = false;
