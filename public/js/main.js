document.addEventListener('DOMContentLoaded', function () {
	function initCarousels() {
		try {
			// Projects carousel (if present)
			const projectEl = document.querySelector('.project-glide');
			if (projectEl) {
				try {
					const glide = new Glide('.project-glide', {
						type: 'carousel',
						startAt: 0,
						perView: 3,
						gap: 20,
						autoplay: 4000,
						hoverpause: true,
						breakpoints: { 1099: { perView: 2 }, 768: { perView: 1 } }
					});
					glide.mount();
					console.log('project Glide mounted');
				} catch (err) {
					console.error('Error initializing project Glide:', err);
				}
			}

			// Skills carousel
			const skillsEl = document.querySelector('.skills-glide');
			if (skillsEl) {
				try {
					const skillsGlide = new Glide('.skills-glide', {
						type: 'carousel',
						startAt: 0,
						perView: 5,
						gap: 18,
						autoplay: 3000,
						hoverpause: true,
						breakpoints: { 1200: { perView: 4 }, 900: { perView: 3 }, 540: { perView: 1 } }
					});
					skillsGlide.mount();
					console.log('skills Glide mounted');
				} catch (err) {
					console.error('Error initializing skills Glide:', err);
				}
			}
		} catch (err) {
			console.error('Error during carousel initialization:', err);
		}
	}

	// If Glide is available, init immediately. Otherwise, try to load it dynamically from CDN.
	if (typeof Glide !== 'undefined') {
		initCarousels();
	} else {
		console.warn('Glide not found — attempting to load from CDN.');
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.2/dist/glide.min.js';
		script.async = true;
		script.onload = function () {
			console.log('Glide loaded dynamically, initializing carousels.');
			initCarousels();
		};
		script.onerror = function (e) {
			console.error('Failed to load Glide from CDN:', e);
		};
		document.head.appendChild(script);
	}

	// Project page: smooth scroll for aside nav and active link on scroll
	(function projectSideNav() {
		const nav = document.querySelector('.project-nav');
		if (!nav) return;

		const links = Array.from(nav.querySelectorAll('a[href^="#"]'));

		// Smooth scroll on click
		links.forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				const targetId = this.getAttribute('href').slice(1);
				const target = document.getElementById(targetId);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
					// update active state
					setActive(link);
				}
			});
		});

		function setActive(activeLink) {
			links.forEach(l => l.classList.toggle('active', l === activeLink));
		}

		// On scroll, highlight the current section
		const sections = links.map(l => document.getElementById(l.getAttribute('href').slice(1))).filter(Boolean);
		function onScroll() {
			const offset = window.scrollY + 120; // account for header
			let current = null;
			for (let i = 0; i < sections.length; i++) {
				const s = sections[i];
				if (s.offsetTop <= offset) current = s;
			}
			if (current) {
				const link = links.find(l => l.getAttribute('href').slice(1) === current.id);
				if (link) setActive(link);
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	})();
});

