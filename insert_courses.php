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
	<link rel="stylesheet" href="css/insert_courses_style.css" media="all">
	<link rel="shortcut icon" type="image/x-icon" href="icon/calendar.png">
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
				<div class="container-form-schedule-LM">
					<label for="schedule_LM">H: Lun/Mar</label>
					<select required id="schedule_LM" name="schedule_LM">
						<option value="Lunes">LUNES</option>
						<option value="Martes">MARTES</option>
					</select>
					<div class="container-form-schedule-VS-hour">
						<label for="hour_LM_in">Entrada</label>
						<input required id="hour_LM_in" name="hour_LM_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_LM_out">Salida</label>
						<input required id="hour_LM_out" name="hour_LM_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-MJ">
					<label for="schedule_MJ">H: Mie/Jue</label>
					<select required id="schedule_MJ" name="schedule_MJ">
						<option value="Miercoles">MIERCOLES</option>
						<option value="Jueves">JUEVES</option>
					</select>
					<div class="container-form-schedule-VS-hour">
						<label for="hour_MJ_in">Entrada</label>
						<input required id="hour_MJ_in" name="hour_MJ_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_MJ_out">Salida</label>
						<input required id="hour_MJ_out" name="hour_MJ_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
					</div>
				</div>
				<div class="container-form-schedule-VS">
					<label for="schedule_VS">H: Vie/Sab</label>
					<select required id="schedule_VS" name="schedule_VS">
						<option value="none">NO</option>
						<option value="Sabado">VIERNES</option>
						<option value="Domingo">SABADO</option>
					</select>
					<div class="container-form-schedule-VS-hour">
						<label for="hour_VS_in">Entrada</label>
						<input required id="hour_VS_in" name="hour_VS_in" type="time" value="07:00" min="07:00" max="21:00" step="3600">
						<label for="hour_VS_out">Salida</label>
						<input required id="hour_VS_out" name="hour_VS_out" type="time" value="07:00" min="07:00" max="21:00" step="3600">
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
			</tr>
		</table>
	</div>
	<div class="table-container">
	</div>
	<script src="js/insert_courses_script.js"></script>
</body>
</html>
