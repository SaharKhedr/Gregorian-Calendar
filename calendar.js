window.onload = function() {
	let currentYear = document.getElementById("currentYear");
	let prevBtn = document.getElementById("prevBtn");
	let nextBtn = document.getElementById("nextBtn");

	fillCalendar(parseInt(currentYear.innerHTML));
	prevBtn.onclick = function() {
		currentYear.innerHTML = parseInt(currentYear.innerHTML) - 1;
		if (parseInt(currentYear.innerHTML) == 1) {
			prevBtn.style.display = "none";
		}
		fillCalendar(parseInt(currentYear.innerHTML));
	}

	nextBtn.onclick = function() {
		currentYear.innerHTML = parseInt(currentYear.innerHTML) + 1;
		fillCalendar(parseInt(currentYear.innerHTML));
	}
}

	function fillCalendar(year) {
		let y = year % 100;
		let c = Math.floor(year / 100);
		let w = 0;
		for(let m = 11; m <= 12; m++) {
			let end = 31;
			if (m == 12) {
				if(year % 4 == 0) {
					if (year % 100 == 0) {
						if (year % 400  == 0) {
							end = 29;
						} else {
							end = 28;
						}
					} else {
						end = 29;
					}
				} else {
					end = 28;
				}
			}
			w = fillMonth(w, m, c, y - 1, end);
		}

		for(let m = 1; m <= 5; m++) {
			let end = 31;
			if (m % 2 == 0) {
				end = 30;
			}
			w = fillMonth(w, m, c, y, end);
		}

		for(let m = 6; m <= 10; m++) {
			let end = 31;
			if (m % 2 == 1) {
				end = 30;
			}
			w = fillMonth(w, m, c, y, end);
		}
	}

	function fillMonth(w, m, c, y, end) {
		let k = 1;
		if(m == 11) {
			w = Math.abs((k + Math.floor(2.6 * m - 0.2) - 2 * c + y + Math.floor(y / 4) + Math.floor(c / 4))) % 7;
		}
		let tableId = "table" + m;
		let row = 1;
		for(let i = 0; i < w; i++) {
			document.getElementById(tableId).rows[row].cells[i].innerHTML = "";
		}
		for(let i = w; i < 7 && k <= end; i++) {
			document.getElementById(tableId).rows[row].cells[i].innerHTML = k;
			k++;
			if(i == 6) {
				i = -1;
				row++;
			}
			w = i;
		}
		for(let i = w + 1; i < 7 && row <= 6; i++) {
			document.getElementById(tableId).rows[row].cells[i].innerHTML = "";
			if(i == 6) {
				i = -1;
				row++;
			}
		}
		return w + 1;
	}