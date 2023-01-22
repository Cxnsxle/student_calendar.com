<?php
	session_start();

	// dependences
	include "connection.php";
	
	// get data from form (POST)
	$user = $_POST['user'];
	$password = $_POST['password'];

	// up connection
	$mysql_conn = new MySqlConn();
	$conn = $mysql_conn->connect();
	$stmt_login = $conn->prepare('SELECT IdUser FROM TUser WHERE User =:user AND Password =:password LIMIT 1;');

	// set parametters
	$stmt_login->bindParam(':user', $user);
	$stmt_login->bindParam(':password', $password);
	$stmt_login->execute();
	$rows_number = $stmt_login->rowCount();

	
	// close connection
	$mysql_conn->close();

	if ($rows_number <= 0) {
		echo '
			<script>
				alert("Verifique el USUARIO y/o CONTRASENIA...");
				window.location = "../index.php";
			</script>';
		exit();
	}
	else {
		$_SESSION['SESSION_USER'] = $user;
		header('location: ../welcome.php');
		exit();
	}
?>
