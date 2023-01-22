<?php
	function existsUser($user) {
		// connect to databse
		$mysql_conn = new MySqlConn();
		$conn = $mysql_conn->connect();

		// query
		$stmt = $conn->prepare('SELECT IdUser FROM TUser WHERE User =:user LIMIT 1;');
		$stmt->bindParam(':user', $user);
		$stmt->execute();
		$rows_number = $stmt->rowCount();
		
		// close connection
		$mysql_conn->close();

		// verification
		return ($rows_number <= 0) ? 0 : 1;
	}
?>
