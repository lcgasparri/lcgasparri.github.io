// Show/hide toggles for the abstracts.

(function () {
	document.querySelectorAll('.abstract-toggle').forEach(function (button) {
		const abstract = document.getElementById(button.getAttribute('aria-controls'));
		if (!abstract) {
			return;
		}

		button.addEventListener('click', function () {
			const open = button.getAttribute('aria-expanded') === 'true';
			button.setAttribute('aria-expanded', open ? 'false' : 'true');
			abstract.hidden = open;
		});
	});
})();
