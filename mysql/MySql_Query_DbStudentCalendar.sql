-- Create database
DROP DATABASE IF EXISTS DbStudentCalendar;
-- CREATE DATABASE IF NOT EXISTS BDPrestamos;
CREATE DATABASE DbStudentCalendar;
-- DROP DATABASE BDPrestamos;
-- Use database
USE DbStudentCalendar;

-- --------------------------------
-- Table TUser
-- --------------------------------
DROP TABLE IF EXISTS TUser;
CREATE TABLE TUser (
	IdUser 					INT NOT NULL AUTO_INCREMENT,
    User					VARCHAR(25) NOT NULL,
    Password				VARCHAR(25) NOT NULL,
    UserName				VARCHAR(30) NOT NULL,
    UserLastName			VARCHAR(30) NOT NULL,
    MinCredits				INT NOT NULL,
    MaxCredits				INT NOT NULL,
    
    -- Primary Key
    PRIMARY KEY (IdUser)
    
) ENGINE=InnoDB DEFAULT	CHARSET=latin1;

-- =========================== STORED PROCEDURES TO TABLE: TUser =========================== --
-- sp_InsertUser
DROP PROCEDURE IF EXISTS sp_InsertUser;
DELIMITER //
CREATE PROCEDURE sp_InsertUser(
    _User					VARCHAR(25),
    _Password				VARCHAR(25),
    _UserName				VARCHAR(30),
    _UserLastName			VARCHAR(30),
    _MinCredits				INT,
    _MaxCredits				INT
)
BEGIN
	INSERT INTO TUser (User, Password, UserName, UserLastName, MinCredits, MaxCredits)
		VALUES(_User, _Password, _UserName, _UserLastName, _MinCredits, _MaxCredits);
	SELECT 0 Existe;
END//
DELIMITER ;

-- sp_ModificUser
DROP PROCEDURE IF EXISTS sp_ModificUser;
DELIMITER //
CREATE PROCEDURE sp_ModificUser(
	_IdUser					INT,
    _User					VARCHAR(25),
    _Password				VARCHAR(25),
    _UserName				VARCHAR(30),
    _UserLastName			VARCHAR(30),
    _MinCredits				INT,
    _MaxCredits				INT
)
BEGIN
	UPDATE TUser
    SET
		User = _User,
		Password = _Password,
		UserName = _UserName,
		UserLastName = _UserLastName,
		MinCredits = _MinCredits,
		MaxCredits = _MaxCredits
	WHERE IdUser = _IdUser;
	SELECT 0 Existe;
END//
DELIMITER ;

-- sp_DeleteUser
DROP PROCEDURE IF EXISTS sp_DeleteUser;
DELIMITER //
CREATE PROCEDURE sp_DeleteUser(
	IN _IdUser				INT
)
BEGIN
	DELETE FROM TUser
	WHERE IdUser = _IdUser;
	SELECT 0 Existe;
END//
DELIMITER ;

-- sp_ListUser
DROP PROCEDURE IF EXISTS sp_ListUser;
DELIMITER //
CREATE PROCEDURE sp_ListUser()
BEGIN
	SELECT *
	FROM TUser;
END//
DELIMITER ;
-- ====================================================== --

/*
-- =========================== TEST PROCEDURES =========================== --
-- --------------------------------
-- Insertion PRE-data
-- --------------------------------
-- TUser
CALL sp_InsertUser("alecaca", "pass1234", "ALEJANDRO MIGUEL", "CHOQUELUQUE GARCIA", "2", "26");
CALL sp_InsertUser("conchogil", "pass1212", "MIGUEL ANGEL", "CCONCHO CASTELLANOS", "2", "24");
CALL sp_InsertUser("lala", "la1234", "MARIA ANGELA", "FLORES CARRION", "2", "24");

-- --------------------------------
-- Midific PRE-data
-- --------------------------------
CALL sp_ModificUser("3", "angelita1", "la1234", "MARIA ANGELA", "FLORES CARRION", "2", "26");

-- --------------------------------
-- Delete PRE-data
-- --------------------------------
-- Cliente
CALL sp_DeleteUser("2");
-- ====================================================== --
*/

-- --------------------------------
-- Muestra de la BASE de DATOS
-- --------------------------------
CALL sp_ListUser();
