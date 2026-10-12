function loadContent(filename) {
			const leftColumn = document.querySelector('.left-column');
			const xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (filename.endsWith('.txt')) {
						leftColumn.innerHTML = '<pre>' + this.responseText + '</pre>';
					} else if (filename.endsWith('.html')) {
						leftColumn.innerHTML = this.responseText;
					} else if (filename.endsWith('.docx')) {
						const file = new Blob([this.response], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
						const fileURL = URL.createObjectURL(file);
						window.open(fileURL);
					}
				}
			};
			xhttp.open("GET", "LabContent/" + filename, true);
			if (filename.endsWith('.docx')) {
				xhttp.responseType = 'arraybuffer';
			}
			xhttp.send();
		}

