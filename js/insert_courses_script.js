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
	// save courseDataObj
	saveCourseObj(courseObj);

	// insert new row
	insertRowInCoursesTable(courseObj);

	// reset form (initial values)
	form.reset();
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
		console.log("Id_eliminar: " + crsId);
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
	let crsSchedule_LM = courseFormData.get("schedule_LM");
	let crsHr_LM_in = courseFormData.get("hour_LM_in");
	let crsHr_LM_out = courseFormData.get("hour_LM_out");
	let crsSchedule_MJ = courseFormData.get("schedule_MJ");
	let crsHr_MJ_in = courseFormData.get("hour_MJ_in");
	let crsHr_MJ_out = courseFormData.get("hour_MJ_out");
	let crsSchedule_VS = courseFormData.get("schedule_VS");
	let crsHr_VS_in = courseFormData.get("hour_VS_in");
	let crsHr_VS_out = courseFormData.get("hour_VS_out");
	// courseId to delete later
	let crsId = getNewCourseId();

	// return obj
	return {
		"courseCode" : crsCode, "courseName" : crsName, "courseCredits" : crsCredits, "courseGroup" : crsGroup,
		"schedule_LM" : crsSchedule_LM, "hour_LM_in" : crsHr_LM_in, "hour_LM_out" : crsHr_LM_out,
		"schedule_MJ" : crsSchedule_MJ, "hour_MJ_in" : crsHr_MJ_in, "hour_MJ_out" : crsHr_MJ_out,
		"schedule_VS" : crsSchedule_VS, "hour_VS_in" : crsHr_VS_in, "hour_VS_out" : crsHr_VS_out,
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

	// add a new row in the coursesTable (new row visibly, it's actually 2 or 3 rows per course)
	// add 2 rows by default
	let newCourseRowRef_1 = coursesTableRef.insertRow(-1);
	// set data-attribute for the courseId from local-storage
	newCourseRowRef_1.setAttribute("data-crsId", courseObj["crsId"]);
	let newCourseRowRef_2 = coursesTableRef.insertRow(-1);

	let newCourseRowRef_3 = null;
	// aux var span
	let auxSpan = "2";
	if (courseObj["schedule_VS"] != "none") {
		// add third row
		newCourseRowRef_3 = coursesTableRef.insertRow(-1);
		// set aux var span
		auxSpan = "3";
	}
	
	// inser data from formData into coursesTableRef
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

	newCourseCellRef = newCourseRowRef_1.insertCell(4);
	newCourseCellRef.textContent = courseObj["schedule_LM"];
	newCourseCellRef = newCourseRowRef_1.insertCell(5);
	newCourseCellRef.textContent = courseObj["hour_LM_in"];
	newCourseCellRef = newCourseRowRef_1.insertCell(6);
	newCourseCellRef.textContent = courseObj["hour_LM_out"];

	// second row
	newCourseCellRef = newCourseRowRef_2.insertCell(0);
	newCourseCellRef.textContent = courseObj["schedule_MJ"];
	newCourseCellRef = newCourseRowRef_2.insertCell(1);
	newCourseCellRef.textContent = courseObj["hour_MJ_in"];
	newCourseCellRef = newCourseRowRef_2.insertCell(2);
	newCourseCellRef.textContent = courseObj["hour_MJ_out"];

	if (newCourseRowRef_3 != null) {
		// third row
		newCourseCellRef = newCourseRowRef_3.insertCell(0);
		newCourseCellRef.textContent = courseObj["schedule_VS"];
		newCourseCellRef = newCourseRowRef_3.insertCell(1);
		newCourseCellRef.textContent = courseObj["hour_VS_in"];
		newCourseCellRef = newCourseRowRef_3.insertCell(2);
		newCourseCellRef.textContent = courseObj["hour_VS_out"];
	}

	// delete button
	let newDeleteCellRef = newCourseRowRef_1.insertCell(7);
	newDeleteCellRef.setAttribute("rowspan", auxSpan);
	let deleteButton = document.createElement("button");
	deleteButton.textContent = "ELIMINAR";
	newDeleteCellRef.appendChild(deleteButton);
}
