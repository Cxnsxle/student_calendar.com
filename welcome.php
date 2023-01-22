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
	<title>Bienvenido!</title>
</head>
<body>
	<h1>Bienvenido!</h1>
	<a href="php/signOut.php">Cerrar Sesion</a>
</body>
</html>
