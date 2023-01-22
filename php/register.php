<?php
	// dependences
	include "connection.php";
	include "verifyRegister.php";

	// get data from form (POST)
	$user = $_POST['user'];
	$password = $_POST['password'];
	$userName = $_POST['userName'];
	$userLastName = $_POST['userLastName'];
	$minCredits = $_POST['minCredits'];
	$maxCredits = $_POST['maxCredits'];

	// verify empty data input
	if ($user == "" || $password == "" || $userName == "" || $userLastName == "" || (string)$minCredits == "" || (string)$maxCredits == "") {
		echo '
			<script>
				alert("Por favor, rellene todos los campos...");
				window.location = "../index.php";
			</script>';
		exit();
	}
	
	// verifiy that the user is not repeated
	if (existsUser($user)) {
		echo '
			<script>
				alert("Usuario ya registrado!...");
				window.location = "../index.php";
			</script>';
		exit();
	}

	// up connection
	$msql_conn = new MySqlConn();
	$conn = $msql_conn->connect();
	// prepare statment to call stored procedure created in database
	$stmt_register = $conn->prepare('CALL sp_InsertUser(:user, :password, :username, :userlastname, :mincredits, :maxcredits)');

	// set parametters
	$stmt_register->bindParam(':user', $user);
	$stmt_register->bindParam(':password', $password);
	$stmt_register->bindParam(':username', $userName);
	$stmt_register->bindParam(':userlastname', $userLastName);
	$stmt_register->bindParam(':mincredits', $minCredits);
	$stmt_register->bindParam(':maxcredits', $maxCredits);

	// execute sp_InsertUser
	$stmt_register->execute();

	// returned value
	$result_stmt_register = $stmt_register->fetchAll(PDO::FETCH_NUM);
	
	// close mysql connection
	$msql_conn->close();

	// return to principal web-page
	if ($result_stmt_register[0][0] == 0) {
		echo '
			<script>
				alert("Usuario almacenado exitosamente!");
				window.location = "../index.php";
			</script>';
	}
	else {
		echo '
			<script>
				alert("Usuario NO registrado, intentar nuevamente...");
				window.location = "../index.php";
			</script>';
	}

?>
