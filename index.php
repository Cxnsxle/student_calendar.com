<?php
	session_start();

	if (isset($_SESSION['SESSION_USER'])) {
		header('location: ./insert_courses.php');
		exit();
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<title>Student Calendar Generator</title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/style.css" media="all">
	<link rel="shortcut icon" type="image/x-icon" href="icon/calendar.png">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
	<main>
		<div class="container">
			<div class="container-back_text">
				<div class="container-back_text-login">
					<h3>¿Ya tienes una cuenta?</h3>
					<p>Inicia sesión para utilizar la herramienta.</p>
					<button id="btn-login">Iniciar sesión</button>
				</div>
				<div class="container-back_text-register">
					<h3>¿Aún no tienes una cuenta?</h3>
					<p>Regístrate para que puedas utilizar la herramienta.</p>
					<button id="btn-register">Registrar</button>
				</div>
			</div>
			<div class="container-forms">
				<form class="container-forms-login" method="POST" action="php/login.php">
					<h2>Iniciar sesión</h2>
					<input type="text" placeholder="Usuario" name="user">
					<input type="password" placeholder="Contraseña" name="password">
					<button>Iniciar sesión</button>
				</form>
				<form class="container-forms-register" method="POST" action="php/register.php">
					<h2>Registrarse</h2>
					<input type="text" placeholder="Usuario" name="user">
					<input type="password" placeholder="Contraseña" name="password">
					<input type="text" placeholder="Nombres" name="userName">
					<input type="text" placeholder="Apellidos" name="userLastName">
					<input type="number" placeholder="Mínimo de créditos" name="minCredits">
					<input type="number" placeholder="Máximo de créditos" name="maxCredits">
					<button>Registrar</button>
				</form>
			</div>
		</div>
	</main>
	<script src="js/script.js"></script>
</body>
