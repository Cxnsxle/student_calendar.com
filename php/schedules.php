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
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Registro de Cursos!</title>
	<link rel="stylesheet" href="../css/schedules_style.css" media="all">
	<link rel="shortcut icon" type="image/x-icon" href="../icon/calendar.png">
	<div class="container">
		<div class="container-button_prev">
			<a href="./insert_courses.php"><button id="btn-prev">Volver</button></a>
		</div>
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
	</div>
	<script src="../js/schedule_generator.js" type="module"></script>
</head>
<body>
</body>
</html>
