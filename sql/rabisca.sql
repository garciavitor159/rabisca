DROP DATABASE IF EXISTS rabisca;
CREATE DATABASE rabisca;
USE rabisca;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nome VARCHAR(50) NOT NULL CHECK (nome <> ""),
    email VARCHAR(80) UNIQUE NOT NULL CHECK (email <> ""),
    senha CHAR(60) NOT NULL CHECK (senha <> ""),
    PRIMARY KEY (id)
);

delimiter //

DROP PROCEDURE IF EXISTS proc_cadastrar_usuario//
CREATE PROCEDURE proc_cadastrar_usuario (
	IN proc_nome VARCHAR(50), 
    IN proc_email VARCHAR(80), 
    IN proc_senha CHAR(60)
)
BEGIN
	IF EXISTS (SELECT 1 FROM usuarios WHERE email = proc_email) THEN
		SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_ja_cadastrado";
	END IF;
    
    INSERT INTO usuarios (nome, email, senha) VALUES (proc_nome, proc_email, proc_senha);
END//

delimiter ;