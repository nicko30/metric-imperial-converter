document.addEventListener('DOMContentLoaded', (event) => {
	document.querySelector('#convertForm').addEventListener('submit', (event2) => {
		event2.preventDefault();

		fetch('/api/convert?' + new URLSearchParams(new FormData(event2.target)).toString(), {
			'method': 'GET'
		})
		.then((response) => {
			if (response['ok']) {
				return response.text();
			} else {
				throw 'Error';
			}
		})
		.then((data) => {
			try {
				data = JSON.parse(data);
			} catch (error) {
				// console.log(error);
			}

			let resultText = '';

			if (data['string'] !== undefined) {
				resultText = data['string'];
			} else if (data['error'] !== undefined) {
				resultText = 'error: ' + data['error'];
			} else {
				resultText = data;
			}

			document.querySelector('#result').textContent = resultText;
			document.querySelector('#jsonResult').textContent = JSON.stringify(data);
		})
		.catch((error) => {
			console.log(error);
		});
	});
});