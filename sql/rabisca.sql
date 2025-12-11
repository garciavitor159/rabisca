DROP DATABASE IF EXISTS rabisca;

CREATE DATABASE rabisca
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE rabisca;

DROP USER IF EXISTS "vitor"@"localhost";
CREATE USER "vitor"@"localhost" IDENTIFIED BY "Local450@#";
GRANT EXECUTE ON rabisca.* TO "vitor"@"localhost";

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(70) NOT NULL UNIQUE CHECK (nome <> ""),
    senha VARCHAR(255) NOT NULL CHECK (senha <> ""),
    perguntaSeguranca CHAR(1) NOT NULL CHECK (perguntaSeguranca IN ("0", "1", "2")),
    resposta VARCHAR(70) NOT NULL CHECK (resposta <> "")
);

DELIMITER //

DROP PROCEDURE IF EXISTS procCadastraUsuario//

CREATE PROCEDURE procCadastraUsuario (IN procNome VARCHAR(70), IN procSenha VARCHAR(255), IN procPerguntaSeguranca CHAR(1), IN procResposta VARCHAR(70))
BEGIN
	IF EXISTS (SELECT 1 FROM usuarios WHERE nome = procNome) THEN
		SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario-ja-cadastrado";
	END IF;
    
    INSERT INTO usuarios(nome, senha, perguntaSeguranca, resposta) VALUES (procNome, procSenha, procPerguntaSeguranca, procResposta);
END//

DELIMITER ;