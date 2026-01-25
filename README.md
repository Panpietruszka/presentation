# 💻 Samsung Galaxy Book5 Pro – Interactive Product Showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Technology: GSAP](https://img.shields.io/badge/Animations-GSAP-green.svg)](https://greensock.com/gsap/)
[![Framework: TailwindCSS](https://img.shields.io/badge/CSS-Tailwind-blue.svg)](https://tailwindcss.com)

Ekskluzywna, interaktywna witryna typu "Landing Page" prezentująca możliwości Samsung Galaxy Book5 Pro. Projekt koncentruje się na dostarczeniu doświadczenia klasy Premium poprzez zaawansowane animacje oraz nowoczesny design inspirowany największymi markami technologicznymi.

🔗 **Live Demo:** [Twoj-Link-Z-GitHub-Pages](https://panpietruszka.github.io/presentation/test4.html)

---

## 🚀 Kluczowe Cechy (Technical Highlights)

- **Advanced Scroll Orchestration**: Wykorzystanie biblioteki **GSAP (GreenSock Animation Platform)** wraz z pluginem **ScrollTrigger** do synchronizacji animacji z przewijaniem strony.
- **State Management & Persistence**: Implementacja `localStorage` oraz `sessionStorage` w celu personalizacji doświadczenia użytkownika (np. zapamiętywanie pozycji scrolla, pomijanie intro po pierwszym obejrzeniu).
- **Responsive Fluid Design**: Zastosowanie funkcji CSS `clamp()` do tworzenia płynnej typografii i skalowalnych interfejsów bez nadmiarowych Media Queries.
- **Performance Optimization**: 
  - Wykorzystanie **IntersectionObserver API** do inteligentnego aktywowania animacji tylko wtedy, gdy elementy są widoczne w viewportcie.
  - Optymalizacja zasobów graficznych i wideo (formaty WebP/AVIF).
- **Glassmorphism UI**: Nowoczesny interfejs oparty na efektach `backdrop-blur` i zaawansowanych cieniach warstwowych.

---

## 🛠️ Stack Technologiczny

* **Frontend:** HTML5 (Semantic), CSS3 (Modern Features)
* **Styling:** TailwindCSS (Utility-first approach)
* **JavaScript:** Vanilla JS (ES6+)
* **Animation Engine:** GSAP & ScrollTrigger
* **Icons:** FontAwesome 6

---

## 🏗️ Architektura Projektu

Projekt został zaprojektowany zgodnie z zasadą **Separation of Concerns** (Separacja Obaw):

- `test4.html` - Semantyczna struktura dokumentu z optymalizacją pod SEO i Open Graph.
- `style.css` - Customowe definicje zmiennych (Design Tokens), animacje kluczowe i style globalne.
- `script.js` - Logika interakcji, zarządzanie stanem odtwarzania wideo oraz orkiestracja animacji wejścia.

---

## 📦 Instalacja i Uruchomienie

1. Sklonuj repozytorium:
   ```bash
   git clone [https://github.com/twoj-login/nazwa-projektu.git](https://github.com/twoj-login/nazwa-projektu.git)
