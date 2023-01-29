<?php
	session_start();

	if (!isset($_SESSION['SESSION_USER'])) {
		echo '
			<script>
				alert("Debe iniciar sesion...");
				window.location = "../index.php";
			</script>';
		session_destroy();
		exit();
	}

	// body table cells meged examples
	/*
	<!-- body table --!>
	<!-- Example 1 --!>
	<tr>
		<td rowspan="3">IA</td>
		<td rowspan="3">Inteligencia Artificial</td>
		<td rowspan="3">4</td>
		<td rowspan="3">A</td>
		<td>Lunes</td>
		<td>07:00</td>
		<td>09:00</td>
	</tr>
	<tr>
		<td>Miercoles</td>
		<td>07:00</td>
		<td>09:00</td>
	</tr>
	<tr>
		<td>Viernes</td>
		<td>07:00</td>
		<td>08:00</td>
	</tr>
	<!-- Example 2 --!>
	<tr>
		<td rowspan="2">DS</td>
		<td rowspan="2">Desarrollo de Software</td>
		<td rowspan="2">3</td>
		<td rowspan="2">B</td>
		<td>Martes</td>
		<td>11:00</td>
		<td>13:00</td>
	</tr>
	<tr>
		<td>Jueves</td>
		<td>11:00</td>
		<td>13:00</td>
	</tr>
	 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Registro de Cursos!</title>
	<link rel="stylesheet" href="../css/insert_courses_style.css" media="all">
	<link rel="shortcut icon" type="image/x-icon" href="../icon/calendar.png">
</head>
<body>
	<div class="signOutButton-container">
		<a href="php/signOut.php"><button id="btn-signOut">Cerrar Sesion</button></a>
	</div>
	<div class="container">
		<form id="courseForm" class="container-form" action="">
			<div class="container-form-courseCode">
				<label for="courseCode">Codigo del cruso:</label>
				<input required id="courseCode" type="text" name="courseCode">
			</div>
			<div class="container-form-courseName">
				<label for="courseName">Nombre del cruso:</label>
				<input required id="courseName" type="text" name="courseName">
			</div>
			<div class="container-form-credits">
				<label for="courseCredits">Creditos:</label>
				<input required min="2" max="5" id="courseCredits" type="number" name="courseCredits">
			</div>
			<div class="container-form-courseGroup">
				<label for="courseGroup">Grupo:</label>
				<select required id="courseGroup" name="courseGroup">
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</select>
			</div>
			<div class="container-form-schedule">
				<div class="container-form-schedule-Lu">
					<label for="schedule_Lu">H: Lun</label>
					<select required id="schedule_Lu" name="schedule_Lu">
						<option value="Lunes">LUNES</option>
						<option value="none">NO</option>
					</select>
					<div class="container-form-schedule-Lu-hour">
						<label for="hour_Lu_in">Entrada</label>
						<input required id="hour_Lu_in" name="hour_Lu_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Lu_out">Salida</label>
						<input required id="hour_Lu_out" name="hour_Lu_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-Ma">
					<label for="schedule_Ma">H: Mar</label>
					<select required id="schedule_Ma" name="schedule_Ma">
						<option value="none">NO</option>
						<option value="Martes">MARTES</option>
					</select>
					<div class="container-form-schedule-Ma-hour">
						<label for="hour_Ma_in">Entrada</label>
						<input required id="hour_Ma_in" name="hour_Ma_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Ma_out">Salida</label>
						<input required id="hour_Ma_out" name="hour_Ma_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-Mi">
					<label for="schedule_Mi">H: Mir</label>
					<select required id="schedule_Mi" name="schedule_Mi">
						<option value="Miercoles">MIERCOLES</option>
						<option value="none">NO</option>
					</select>
					<div class="container-form-schedule-Mi-hour">
						<label for="hour_Mi_in">Entrada</label>
						<input required id="hour_Mi_in" name="hour_Mi_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Mi_out">Salida</label>
						<input required id="hour_Mi_out" name="hour_Mi_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-Ju">
					<label for="schedule_Ju">H: Jue</label>
					<select required id="schedule_Ju" name="schedule_Ju">
						<option value="none">NO</option>
						<option value="Jueves">JUEVES</option>
					</select>
					<div class="container-form-schedule-Ju-hour">
						<label for="hour_Ju_in">Entrada</label>
						<input required id="hour_Ju_in" name="hour_Ju_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Ju_out">Salida</label>
						<input required id="hour_Ju_out" name="hour_Ju_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-Vi">
					<label for="schedule_Vi">H: Vie</label>
					<select required id="schedule_Vi" name="schedule_Vi">
						<option value="Viernes">VIERNES</option>
						<option value="none">NO</option>
					</select>
					<div class="container-form-schedule-Vi-hour">
						<label for="hour_Vi_in">Entrada</label>
						<input required id="hour_Vi_in" name="hour_Vi_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Vi_out">Salida</label>
						<input required id="hour_Vi_out" name="hour_Vi_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-Sa">
					<label for="schedule_Sa">H: Sab</label>
					<select required id="schedule_Sa" name="schedule_Sa">
						<option value="none">NO</option>
						<option value="Sabado">SABADO</option>
					</select>
					<div class="container-form-schedule-Sa-hour">
						<label for="hour_Sa_in">Entrada</label>
						<input required id="hour_Sa_in" name="hour_Sa_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_Sa_out">Salida</label>
						<input required id="hour_Sa_out" name="hour_Sa_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
			</div>
			<div class="container-form-button">
				<button id="btnAddCourse">Aniadir curso</button>
			</div>
		</form>
		<table class="container-table" id="coursesTable">
			<!-- head table --!>
			<tr>
				<th>CodCurso</td>
				<th>NonmbreCurso</td>
				<th>Creditos</td>
				<th>Grupo</td>
				<th colspan="3">Horarios</td>
				<th>Eliminar</td>
			</tr>
		</table>
		<div class="container-button_generator">
			<a href="./schedules.php"><button id="btn-generator">Generar Horarios</button></a>
		</div>
	</div>
	<script src="../js/insert_courses_script.js" type="module"></script>
</body>
</html>
