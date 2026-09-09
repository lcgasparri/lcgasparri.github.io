// Dark/light theme toggle.

(function () {
	const root = document.documentElement;
	const toggle = document.getElementById('theme-toggle');
	const icon = document.getElementById('theme-icon');
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

	// localStorage can throw when the browser blocks site data; treat that
	// as "no saved preference" rather than breaking the toggle.
	function savedMode() {
		try {
			return localStorage.getItem('color-mode');
		} catch (e) {
			return null;
		}
	}

	function saveMode(mode) {
		try {
			localStorage.setItem('color-mode', mode);
		} catch (e) {
			// Ignore: the theme still applies for this page view.
		}
	}

	function apply(mode) {
		root.setAttribute('data-bs-theme', mode);
		if (icon) {
			icon.classList.toggle('bi-sun-fill', mode === 'dark');
			icon.classList.toggle('bi-moon-fill', mode !== 'dark');
		}
		if (toggle) {
			// The icon shows the mode you would switch to; say so for screen readers and in the tooltip.
			const label = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
			toggle.setAttribute('aria-label', label);
			toggle.setAttribute('title', label);
		}
	}

	// Sync the icon with whatever the head snippet already applied.
	apply(root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light');

	if (toggle) {
		toggle.addEventListener('click', function () {
			const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
			apply(next);
			saveMode(next);
		});
	}

	// Follow the system preference while the visitor has not chosen a theme.
	systemDark.addEventListener('change', function (event) {
		const saved = savedMode();
		if (saved !== 'dark' && saved !== 'light') {
			apply(event.matches ? 'dark' : 'light');
		}
	});
})();
