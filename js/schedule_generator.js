// call function to generate schedules
generateSchedules();

function generateSchedules() {
	// get data from local-storage
	let coursesObjArr = JSON.parse(localStorage.getItem("coursesData"));

	// selection of schedules according to the scheduleFitness()
	let eliteSchedules = []

	// generate schedules with 100 iterations
	let iterations = 10;
	for (let i = 0; i < iterations; i++) {
		// disorder courses list
		coursesObjArr.sort(() => Math.random() - 0.5);

		// generate and get evaluation
		let [schedule, evaluation, codes, names] = generateSchedule(coursesObjArr);
		console.log(schedule);
		console.log(evaluation);
		console.log(codes);
		console.log(names);
	}
}

function generateSchedule(coursesObjArr) {
	console.log("Generating schedule!");
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
