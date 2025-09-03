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

// Close menu when clicking on navigation links
const navLinks = document.querySelectorAll('.navlist a');
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		menu.classList.remove('bx-x');
		menu.classList.add('bx-menu');
		navlist.classList.remove('open');
		menu.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = 'auto';
	});
});

// Close menu when scrolling
window.onscroll = () => {
	menu.classList.remove('bx-x');
	menu.classList.add('bx-menu');
	navlist.classList.remove('open');
	menu.setAttribute('aria-expanded', 'false');
	document.body.style.overflow = 'auto';
};

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