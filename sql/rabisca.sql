DROP DATABASE IF EXISTS rabisca;

CREATE DATABASE rabisca
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE rabisca;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT UNSIGNED AUTO_INCREMENT,
    nomeUsuario VARCHAR(70) NOT NULL UNIQUE CHECK (nomeUsuario <> ""),
    senhaHash CHAR(60) NOT NULL CHECK (senhaHash <> ""),
    perguntaSeguranca INT UNSIGNED NOT NULL CHECK (perguntaSeguranca >= 0 AND perguntaSeguranca <= 2),
    resposta VARCHAR(70) NOT NULL CHECK (resposta <> ""),
    PRIMARY KEY (id)
);

DELIMITER $$

DROP PROCEDURE IF EXISTS procCadastraUsuario $$

CREATE PROCEDURE procCadastraUsuario (IN procNomeUsuario VARCHAR(70), IN procSenhaHash CHAR(60), IN procPerguntaSeguranca INT, IN procResposta VARCHAR(70))
BEGIN
    IF EXISTS (SELECT 1 FROM usuarios WHERE nomeUsuario = procNomeUsuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario-ja-cadastrado";
    END IF;

    INSERT INTO usuarios (nomeUsuario, senhaHash, perguntaSeguranca, resposta) VALUES (procNomeUsuario, procSenhaHash, procPerguntaSeguranca, procResposta);
END $$

DELIMITER ;