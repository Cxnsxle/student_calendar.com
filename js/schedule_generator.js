const formCredits = document.getElementById("creditsForm");

// listener for DOMContentLoad event
document.addEventListener("DOMContentLoaded", () => {
	localStorage.setItem("coursesDataProcessed", null);
});

// listener for DOMContentLoad event
formCredits.addEventListener("submit", event => {
	// reset tables
	localStorage.setItem("coursesDataProcessed", null);
	// get div-container that contains the tables
	let divTablesContainerRef = document.getElementById("container-tables_container");
	divTablesContainerRef.innerHTML = "";

	event.preventDefault();
	
	// capture the formCredits as FormData and get credits data
	let creditsFormData = new FormData(formCredits);
	let minCredits = parseInt(creditsFormData.get("min_credits"));
	let maxCredits = parseInt(creditsFormData.get("max_credits"));
	// call function to generate schedules
	let eliteSchedules = generateSchedules(minCredits, maxCredits);

	// first sort descending
	eliteSchedules.sort((a, b) => b[1] - a[1]);
	// get the top 10 schedules
	let limit = eliteSchedules.length >= 10 ? 10 : eliteSchedules.length;
	let eliteSchedulesTopTen = eliteSchedules.slice(0, limit);

	// add pre-data table with courses with your names and color
	let coursesPreData = addPreDataTable(divTablesContainerRef);
	// fill tables
	eliteSchedulesTopTen.forEach(element => {
		insertScheduleTable(element[0], divTablesContainerRef, coursesPreData);
	});
});

// function to insert table with pre-data (courseIds, names and colors)
function addPreDataTable(divTablesContainerRef) {
	// add table to fill schedule
	let newTableRef = document.createElement("table");
	divTablesContainerRef.appendChild(newTableRef);

	// add header to the table
	let header = ["CODIGO", "NOMBRE", "COLOR"];
	let newRowHeaderRef = document.createElement("tr");
	header.forEach(h_el => {
		let newCellHeaderRef = document.createElement("th");
		newCellHeaderRef.innerText = h_el;
		newRowHeaderRef.appendChild(newCellHeaderRef);
	});
	newTableRef.appendChild(newRowHeaderRef);

	// get data from local-storage
	let coursesObjArr = JSON.parse(localStorage.getItem("coursesData"));
	let coursesPreData = {};
	coursesObjArr.forEach((element) => {
		coursesPreData[element.courseCode] = [element.courseName, getRandomColor()];
	});

	coursesObjArr.forEach(element => {
		let newRowRef = newTableRef.insertRow(-1);
		newRowRef.style.backgroundColor = coursesPreData[element.courseCode][1];
		let newCellRef = newRowRef.insertCell(0);
		newCellRef.textContent = element.courseCode;
		newCellRef = newRowRef.insertCell(1);
		newCellRef.textContent = coursesPreData[element.courseCode][0];
		newCellRef = newRowRef.insertCell(2);
		newCellRef.textContent = coursesPreData[element.courseCode][1];
	});

	return coursesPreData;
}

// function to return a hexdecimal random color
function getRandomColor() {
	let letters = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}

// function to insert top ten schedule tables when an subnit event sent
function insertScheduleTable(schedule, divTablesContainerRef, coursesPreData) {
	// add table to fill schedule
	let newTableRef = document.createElement("table");
	divTablesContainerRef.appendChild(newTableRef);

	// add header to the table
	let header = ["HORA", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
	let newRowHeaderRef = document.createElement("tr");
	header.forEach(h_el => {
		let newCellHeaderRef = document.createElement("th");
		newCellHeaderRef.innerText = h_el;
		newRowHeaderRef.appendChild(newCellHeaderRef);
	});
	newTableRef.appendChild(newRowHeaderRef);

	// get transposed matrix of schedule
	schedule = transposeMatrix(schedule);
	// add and fill schedule 
	let hour_ = 7;
	schedule.forEach(hour => {
		let newRowRef = newTableRef.insertRow(-1);
		// and hours
		let newCellRef = newRowRef.insertCell(0);
		newCellRef.textContent = hour_.toString() + "-" + (hour_ + 1).toString();
		hour_++;
		hour.forEach((day, index) => {
			newCellRef = newRowRef.insertCell(index + 1);
			newCellRef.textContent = day;
			// set color
			if (day != "") {
				newCellRef.style.backgroundColor = coursesPreData[day][1];
			}
		});
	});
}

function generateSchedules(minCredits, maxCredits) {
	// get data from local-storage
	let coursesObjArr = JSON.parse(localStorage.getItem("coursesData"));

	// selection of schedules according to the scheduleFitness()
	let eliteSchedules = []

	// generate schedules with 100 iterations
	let iterations = 100;
	for (let i = 0; i < iterations; i++) {
		// disorder courses list
		coursesObjArr.sort(() => Math.random() - 0.5);
		let coursesIds = coursesObjArr.map((_) => _["crsId"]);
		// validate coursesObjArr not repeated
		if (!isRepeated(coursesIds)) {
			// before save in local-storage
			let coursesDataArrProcessed = JSON.parse(localStorage.getItem("coursesDataProcessed")) || [];
			// append to the array the new courseProcessed
			coursesDataArrProcessed.push(coursesIds);
			// save
			let coursesDataArraProcessedJSON = JSON.stringify(coursesDataArrProcessed);
			localStorage.setItem("coursesDataProcessed", coursesDataArraProcessedJSON);

			// generate and get evaluation
			let [schedule, evaluation, codes, names] = generateSchedule(coursesObjArr);
			
			// add to the elite schedules
			if (evaluation >= minCredits && evaluation <= maxCredits) {
				eliteSchedules.push([schedule, evaluation, codes, names]);
			}
		}
	}

	return eliteSchedules;
}

function generateSchedule(coursesObjArr) {
	/* step 1: remove courses with the same Code */

	// get the unique course codes
	let courseCodes = Array.from(new Set(coursesObjArr.map(_ => _["courseCode"].slice(0, -1))));
	// get the indices of the first courses found
	let firstIndicesCoursesFound = courseCodes.map((element) => coursesObjArr.findIndex(_ => _["courseCode"].slice(0, -1) === element));
	// filter the first courses according the previous indices
	let coursesFiltered = coursesObjArr.filter((_, index) => firstIndicesCoursesFound.includes(index));

	/* step 2: build the schedule */
	// credits acumulator
	let creditsAcumulator = 0;
	let codesAcumulator = [];
	let namesAcumulator = [];
	// declare empty schedule
	let schedule = [];
	for (let i = 0; i < 6; i++) {
		schedule[i] = Array(14).fill("");
	}
	// iterate the filtered courses
	for (let k = 0; k < coursesFiltered.length; k++) {
		// auxiliar label to exit from bucle
		let label = false;
		// course data
		let course = coursesFiltered[k];
		let courseCode = course["courseCode"];
		let courseDays = course["courseDays"];
		let courseHours = course["courseHours"];

		// get the indexes of the courses that are not "none"
		let courseDaysIndexes = []
		courseDays.forEach((_, index) => {
			if (_ != "none") {
				courseDaysIndexes.push(index);
			}
		});

		// comprobate the hour no repeated
		let internalLabel = false;
		courseDaysIndexes.forEach((index) => {
			let hour_in = parseInt(courseHours[index][0].slice(0, -3));
			let hour_out = parseInt(courseHours[index][1].slice(0, -3));
			for (let i = hour_in; i < hour_out; i++) {
				if (schedule[index][i - 7] != "") {
					internalLabel = true;
					label = true;
					break;
				}
			}
			if(internalLabel) return;
		});

		// continue to the next course
		if(label) continue;

		// insert into schedule
		courseDaysIndexes.forEach((index) => {
			let hour_in = parseInt(courseHours[index][0].slice(0, -3));
			let hour_out = parseInt(courseHours[index][1].slice(0, -3));
			for (let i = hour_in; i < hour_out; i++) {
				schedule[index][i - 7] = courseCode;
			}
		});
		creditsAcumulator += parseInt(course["courseCredits"]);
		codesAcumulator.push(courseCode);
		namesAcumulator.push(course["courseName"]);
	}

	return [schedule, creditsAcumulator, codesAcumulator, namesAcumulator];
}

function isRepeated(coursesIds) {
	// get coursesDataProcessed from local-storage
	let coursesDataArrProcessed = JSON.parse(localStorage.getItem("coursesDataProcessed")) || [];
	// save
	return coursesDataArrProcessed.some(element => element.toString() === coursesIds.toString());
}

function transposeMatrix(matrix) {
  // create a new matrix with rows number and columns number inverted
  let transposedMatrix = new Array(matrix[0].length);
  for (let i = 0; i < transposedMatrix.length; i++) {
	  transposedMatrix[i] = new Array(matrix.length);
  }

  // assign values to transposed matrix
  for (let i = 0; i < matrix.length; i++) {
	  for (let j = 0; j < matrix[i].length; j++) {
		  transposedMatrix[j][i] = matrix[i][j];
	  }
  }

  return transposedMatrix;
}
