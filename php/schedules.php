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
		<form id="creditsForm" class="container-form_credits" action="">
			<div class="container-form_credits-min_credits">
				<label for="min_credits">Creditos Minimos:</label>
				<input required min="2" max="30" value="20" id="min_credits" type="number" name="min_credits">
			</div>
			<div class="container-form_credits-max_credits">
				<label for="max_credits">Creditos Maximos:</label>
				<input required min="2" max="30" value="24" id="max_credits" type="number" name="max_credits">
			</div>
			<div class="container-form_credits-button_generator">
				<button id="btn-generator">Generar Horarios</button>
			</div>
		</form>
		<div class="container-tables_container" id="container-tables_container">
		</div>
	</div>
	<script src="../js/schedule_generator.js" type="module"></script>
</head>
<body>
</body>
</html>
