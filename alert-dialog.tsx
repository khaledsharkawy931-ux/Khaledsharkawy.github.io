/* App-specific styles */

/* Ensure smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Pin spacer fix for GSAP */
.pin-spacer {
  pointer-events: none !important;
}

.pin-spacer > * {
  pointer-events: auto !important;
}

/* Hero section specific */
.hero-media-card {
  will-change: transform, opacity;
}

.hero-content {
  will-change: transform, opacity;
}

.hero-pill {
  will-change: transform, opacity;
}

/* Demo card specific */
.demo-card {
  will-change: transform, opacity;
}

.demo-avatar {
  will-change: transform, opacity;
}

.demo-ring {
  will-change: transform, opacity;
}

.demo-center-icon {
  will-change: transform, opacity;
}

.demo-pill {
  will-change: transform, opacity;
}

/* Card hover effects */
.hiw-card,
.explore-card,
.mentor-card,
.match-card-left,
.match-card-right {
  will-change: transform, opacity;
}

/* Button hover states */
button, .btn {
  cursor: pointer;
  transition: all 0.2s ease;
}

button:active, .btn:active {
  transform: scale(0.98);
}

/* Image loading optimization */
img {
  loading: lazy;
}

/* Responsive typography adjustments */
@media (max-width: 640px) {
  h1 {
    font-size: clamp(32px, 8vw, 44px) !important;
  }
  
  h2 {
    font-size: clamp(28px, 6vw, 34px) !important;
  }
}

/* Ensure proper z-index stacking */
section {
  position: relative;
}

/* Navigation blur effect support */
@supports (backdrop-filter: blur(12px)) {
  nav {
    backdrop-filter: blur(12px);
  }
}

@supports not (backdrop-filter: blur(12px)) {
  nav {
    background-color: rgba(246, 246, 242, 0.95);
  }
}

/* Grain overlay optimization */
.grain-overlay::after {
  will-change: opacity;
}

/* Pattern backgrounds */
.dot-pattern {
  background-attachment: fixed;
}

.diagonal-pattern {
  background-attachment: fixed;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .animate-float,
  .animate-pulse-ring,
  .animate-pulse-slow {
    animation: none !important;
  }
}

/* Focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #E4572E;
  outline-offset: 2px;
}

/* Selection color */
::selection {
  background-color: rgba(228, 87, 46, 0.2);
  color: inherit;
}
