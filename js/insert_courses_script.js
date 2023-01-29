const form = document.getElementById("courseForm");
const signOut = document.getElementById("btn-signOut");
const table = document.getElementById("coursesTable");

// listener for submit event and disable refresh page
form.addEventListener("submit", function(event) {
	event.preventDefault();
	
	// capture the form as FormData
	let courseFormData = new FormData(form);
	// convert from FormData to Obj
	let courseObj = convertFormDataToCourseObj(courseFormData);

	// days validation
	let isValid = false;
	for (let i = 0; i < courseObj["courseDays"].length; i++) {
		if (courseObj["courseDays"][i] != "none") {
			isValid = true;
			break;
		}
	}

	if (isValid) {
		// save courseDataObj
		saveCourseObj(courseObj);

		// insert new row
		insertRowInCoursesTable(courseObj);

		// reset form (initial values)
		form.reset();
	} else {
		alert("Por favor, seleccione los DIAS...")
	}
});

// listener for DOMContentLoad event
document.addEventListener("DOMContentLoaded", function(event) {
	let courseObjArray = JSON.parse(localStorage.getItem("coursesData")) || [];
	courseObjArray.forEach( arrayElement => {
		insertRowInCoursesTable(arrayElement);
	});
});

// listener for submit event in signOut button
signOut.addEventListener("click", () => {
	localStorage.clear();
});

// listener for click event in delete button in coursesTable
table.addEventListener("click", event => {
	event.stopPropagation();
	// capture the row index and cell span to do delete course properly
	let thisRowIndex = parseInt(event.target.parentNode.parentNode.rowIndex);
	let thisCellSpan = parseInt(event.target.parentNode.getAttribute("rowspan"));

	if (!isNaN(thisRowIndex) && !isNaN(thisCellSpan)) {
		// delete course from table
		for (let i = 0; i < thisCellSpan; i++) {
			table.deleteRow(thisRowIndex);
		}

		// get crsId
		let crsId = event.target.parentNode.parentNode.getAttribute("data-crsId");
		// remove course from local-storage
		removeCorseFromLocalStorage(crsId);
	}
});

// function to remove from local-storage an course by Id
function removeCorseFromLocalStorage(crsId) {
	// capture the history - validation if coursesData == ""
	let courseObjArr = JSON.parse(localStorage.getItem("coursesData"));
	// get index
	let courseIndexInArray = courseObjArr.findIndex(element => element.crsId == crsId);
	if (courseIndexInArray !== -1) {
		courseObjArr.splice(courseIndexInArray, 1);
	}
	// remove and save
	let courseArrayJSON = JSON.stringify(courseObjArr);
	localStorage.setItem("coursesData", courseArrayJSON);
}

// function to save courseObj in local-storage (save history)
function saveCourseObj(courseObj) {
	// capture the history - validation if coursesData == ""
	let coursesDataArray = JSON.parse(localStorage.getItem("coursesData")) || [];
	// append to the array the new  courseObj
	coursesDataArray.push(courseObj);
	// save
	let coursesDataArrayJSON = JSON.stringify(coursesDataArray);
	localStorage.setItem("coursesData", coursesDataArrayJSON);
}

// function to convert a FormData to courseFormData
function convertFormDataToCourseObj(courseFormData) {
	// capture data from courseFormData
	let crsCode = courseFormData.get("courseCode");
	let crsName = courseFormData.get("courseName");
	let crsCredits = courseFormData.get("courseCredits");
	let crsGroup = courseFormData.get("courseGroup");
	// schedules
	let crsDaysArr = [
		courseFormData.get("schedule_Lu"),
		courseFormData.get("schedule_Ma"),
		courseFormData.get("schedule_Mi"),
		courseFormData.get("schedule_Ju"),
		courseFormData.get("schedule_Vi"),
		courseFormData.get("schedule_Sa")
	];
	let crsHoursArr = [
		[courseFormData.get("hour_Lu_in"), courseFormData.get("hour_Lu_out")],
		[courseFormData.get("hour_Ma_in"), courseFormData.get("hour_Ma_out")],
		[courseFormData.get("hour_Mi_in"), courseFormData.get("hour_Mi_out")],
		[courseFormData.get("hour_Ju_in"), courseFormData.get("hour_Ju_out")],
		[courseFormData.get("hour_Vi_in"), courseFormData.get("hour_Vi_out")],
		[courseFormData.get("hour_Sa_in"), courseFormData.get("hour_Sa_out")],
	];
	// courseId to delete later
	let crsId = getNewCourseId();

	// return obj
	return {
		"courseCode" : crsCode, "courseName" : crsName, "courseCredits" : crsCredits, "courseGroup" : crsGroup,
		"courseDays" : crsDaysArr, "courseHours" : crsHoursArr,
		"crsId" : crsId
	}
}

// capture from local-storage the last generated course Id and add its in one
function getNewCourseId() {
	let newCourseId = parseInt(localStorage.getItem("lastCourseId") || "-1") + 1;

	// set atribute on local storage
	localStorage.setItem("lastCourseId", newCourseId.toString());

	return newCourseId;
}

// function to insert rows in table when an subnit event sent
function insertRowInCoursesTable(courseObj) {
	// get REF to courses table
	let coursesTableRef = document.getElementById("coursesTable");

	// get the indexes of the courses that are not "none"
	let coursesIndexes = [];
	for (let i = 0; i < courseObj["courseDays"].length; i++) {
		if (courseObj["courseDays"][i] != "none") {
			coursesIndexes.push(i);
		}
	}

	// get span for row
	let auxSpan = coursesIndexes.length;
	
	// add a new row in the coursesTable (new row visibly, it's actually 2 or 3 rows per course)
	// add 1 rows by default
	let newCourseRowRef_1 = coursesTableRef.insertRow(-1);
	// set data-attribute for the courseId from local-storage
	newCourseRowRef_1.setAttribute("data-crsId", courseObj["crsId"]);

	// inser data from formData into coursesTableRef_1
	let newCourseCellRef = newCourseRowRef_1.insertCell(0);
	newCourseCellRef.textContent = courseObj["courseCode"];
	newCourseCellRef.setAttribute("rowspan", auxSpan);
	newCourseCellRef = newCourseRowRef_1.insertCell(1);
	newCourseCellRef.textContent = courseObj["courseName"];
	newCourseCellRef.setAttribute("rowspan", auxSpan);
	newCourseCellRef = newCourseRowRef_1.insertCell(2);
	newCourseCellRef.textContent = courseObj["courseCredits"];
	newCourseCellRef.setAttribute("rowspan", auxSpan);
	newCourseCellRef = newCourseRowRef_1.insertCell(3);
	newCourseCellRef.textContent = courseObj["courseGroup"];
	newCourseCellRef.setAttribute("rowspan", auxSpan);

	// insert the first schedule
	newCourseCellRef = newCourseRowRef_1.insertCell(4);
	newCourseCellRef.textContent = courseObj["courseDays"][coursesIndexes[0]];
	newCourseCellRef = newCourseRowRef_1.insertCell(5);
	newCourseCellRef.textContent = courseObj["courseHours"][coursesIndexes[0]][0];
	newCourseCellRef = newCourseRowRef_1.insertCell(6);
	newCourseCellRef.textContent = courseObj["courseHours"][coursesIndexes[0]][1];

	// insert the next schedules
	for (let i = 1; i < auxSpan; i ++) {
		let newCourseRowRef_i = coursesTableRef.insertRow(-1);
		newCourseCellRef = newCourseRowRef_i.insertCell(0);
		newCourseCellRef.textContent = courseObj["courseDays"][coursesIndexes[i]];
		newCourseCellRef = newCourseRowRef_i.insertCell(1);
		newCourseCellRef.textContent = courseObj["courseHours"][coursesIndexes[i]][0];
		newCourseCellRef = newCourseRowRef_i.insertCell(2);
		newCourseCellRef.textContent = courseObj["courseHours"][coursesIndexes[i]][1];
	}

	// delete button
	let newDeleteCellRef = newCourseRowRef_1.insertCell(7);
	newDeleteCellRef.setAttribute("rowspan", auxSpan);
	let deleteButton = document.createElement("button");
	deleteButton.textContent = "ELIMINAR";
	newDeleteCellRef.appendChild(deleteButton);
}
