<?php
	class MySqlConn {
		// var to connect
		private $host_msql = "localhost";
		private $port_msql = "3306";
		private $dbname_msql = "DbStudentCalendar";
		private $user_msql = "cxnsxle";
		private $password_msql = "cxnsxle0206";
		private $conn;

		function __construct() {
			// close possible connections
			$this->conn = null;

			// use try-cath to handle exceptions
			try {
				$this->conn = new PDO("mysql:host=$this->host_msql;port=$this->port_msql;dbname=$this->dbname_msql", $this->user_msql, $this->password_msql);
				$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

			} catch (PDOException $e) {
				//echo "<h1>Can't connet!<br></h1>";
				echo $e->getMessage();
			}
		}

		// connect to databse
		public function connect() {
			return $this->conn;
		}
		
		// close the connection to the databse
		public function close() {
			// close possible connections
			$this->conn = null;
		}
	}
?>
