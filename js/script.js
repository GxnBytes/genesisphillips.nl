const header = document.querySelector("header");
window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

// Mobile menu toggle functionality
menu.onclick = () => {
	const isOpen = navlist.classList.contains('open');
	
	// Toggle menu icon
	menu.classList.toggle('bx-x');
	menu.classList.toggle('bx-menu');
	
	// Toggle navigation menu
	navlist.classList.toggle('open');
	
	// Update accessibility attributes
	menu.setAttribute('aria-expanded', !isOpen);
	
	// Prevent body scroll when menu is open
	document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
};

// Smooth scrolling and section highlighting
const navLinks = document.querySelectorAll('.navlist a');
const sections = document.querySelectorAll('section[id]');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		
		const targetId = link.getAttribute('href');
		const targetSection = document.querySelector(targetId);
		
		if (targetSection) {
			// Smooth scroll to target section
			targetSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
		
		// Close mobile menu
		menu.classList.remove('bx-x');
		menu.classList.add('bx-menu');
		navlist.classList.remove('open');
		menu.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = 'auto';
	});
});

// Intersection Observer for section highlighting
const observerOptions = {
	root: null,
	rootMargin: '-20% 0px -60% 0px',
	threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const sectionId = entry.target.getAttribute('id');
			const correspondingLink = document.querySelector(`.navlist a[href="#${sectionId}"]`);
			
			// Remove active class from all links
			navLinks.forEach(link => link.classList.remove('active'));
			
			// Add active class to current section's link
			if (correspondingLink) {
				correspondingLink.classList.add('active');
			}
		}
	});
}, observerOptions);

// Observe all sections
sections.forEach(section => {
	observer.observe(section);
});

// Close menu when scrolling (but don't interfere with section highlighting)
window.addEventListener('scroll', () => {
	// Only close menu if it's open
	if (navlist.classList.contains('open')) {
		menu.classList.remove('bx-x');
		menu.classList.add('bx-menu');
		navlist.classList.remove('open');
		menu.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = 'auto';
	}
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
	if (!menu.contains(e.target) && !navlist.contains(e.target)) {
		menu.classList.remove('bx-x');
		menu.classList.add('bx-menu');
		navlist.classList.remove('open');
		menu.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = 'auto';
	}
});

// Handle escape key to close menu
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && navlist.classList.contains('open')) {
		menu.classList.remove('bx-x');
		menu.classList.add('bx-menu');
		navlist.classList.remove('open');
		menu.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = 'auto';
		menu.focus(); // Return focus to menu button
	}
});

// Intersection Observer for reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { root: null, threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));