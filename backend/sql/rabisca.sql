-- Criação do banco
DROP DATABASE IF EXISTS rabisca;
CREATE DATABASE rabisca
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_general_ci;
USE rabisca;

-- Tabelas

-- Tabela de usuários
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    nome VARCHAR(50) NOT NULL CHECK (nome <> ""),
    email VARCHAR(80) NOT NULL UNIQUE CHECK (email <> ""),
    senha CHAR(60) NOT NULL CHECK (senha <> ""),
    pergunta_seguranca ENUM("0", "1", "2", "3") NOT NULL CHECK (pergunta_seguranca <> ""),
    resposta CHAR(60) NOT NULL CHECK (resposta <> ""),
    PRIMARY KEY (id)
);

-- Tabela de notas
DROP TABLE IF EXISTS notas;
CREATE TABLE notas (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(80) NOT NULL CHECK (titulo <> ""),
    conteudo VARCHAR(200) NOT NULL CHECK (conteudo <> ""),
    id_usuario INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
    ON DELETE CASCADE
);

-- Procedimentos armazenados

delimiter //

-- Procedimento que cadastra um usuário
DROP PROCEDURE IF EXISTS proc_cadastrar_usuario//
CREATE PROCEDURE proc_cadastrar_usuario (
    IN proc_nome VARCHAR(50),
    IN proc_email VARCHAR(80),
    IN proc_senha CHAR(60),
    IN proc_pergunta_seguranca CHAR(1),
    IN proc_resposta CHAR(60)
)
BEGIN
    IF EXISTS (SELECT 1 FROM usuarios WHERE email = proc_email) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_ja_cadastrado";
    END IF;

    INSERT INTO usuarios (nome, email, senha, pergunta_seguranca, resposta)
    VALUES (proc_nome, proc_email, proc_senha, proc_pergunta_seguranca, proc_resposta);
END//

-- Procedimento que efetua o login
DROP PROCEDURE IF EXISTS proc_efetuar_login//
CREATE PROCEDURE proc_efetuar_login (IN proc_email VARCHAR(80))
BEGIN
    SELECT id AS id_usuario, nome AS nome_usuario, senha AS senha_usuario
    FROM usuarios
    WHERE email = proc_email;
END//

-- Procedimento que valida uma pergunta de segurança
DROP PROCEDURE IF EXISTS proc_validar_pergunta_seguranca//
CREATE PROCEDURE proc_validar_pergunta_seguranca (IN proc_email VARCHAR(80))
BEGIN
    SELECT pergunta_seguranca AS pergunta_seguranca_usuario, resposta AS resposta_usuario
    FROM usuarios
    WHERE email = proc_email;
END//

-- Procedimento que altera uma senha
DROP PROCEDURE IF EXISTS proc_alterar_senha//
CREATE PROCEDURE proc_alterar_senha (IN proc_senha CHAR(60), IN proc_email VARCHAR(80))
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE email = proc_email) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    UPDATE usuarios
    SET senha = proc_senha
    WHERE email = proc_email;
END//

-- Procedimento que cadastra uma nota
DROP PROCEDURE IF EXISTS proc_cadastrar_nota//
CREATE PROCEDURE proc_cadastrar_nota (
    IN proc_titulo VARCHAR(80), 
    IN proc_conteudo VARCHAR(200),
    IN proc_id_usuario INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    IF EXISTS (SELECT 1 FROM notas WHERE titulo = proc_titulo AND id = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "nota_ja_cadastrada";
    END IF;

    INSERT INTO notas (titulo, conteudo, id_usuario) 
    VALUES (proc_titulo, proc_conteudo, proc_id_usuario);
END//

-- Procedimento que consulta as notas
DROP PROCEDURE IF EXISTS proc_consultar_notas//
CREATE PROCEDURE proc_consultar_notas (IN proc_id_usuario INT)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    SELECT id AS id_nota, titulo AS titulo_nota, conteudo AS conteudo_nota
    FROM notas
    WHERE id_usuario = proc_id_usuario;
END//

-- Procedimento que deleta uma nota
DROP PROCEDURE IF EXISTS proc_deletar_nota//
CREATE PROCEDURE proc_deletar_nota (IN proc_id INT, IN proc_id_usuario INT)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    IF NOT EXISTS (SELECT 1 FROM notas WHERE id = proc_id) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "nota_nao_cadastrada";
    END IF;

    DELETE FROM notas WHERE id = proc_id AND id_usuario = proc_id_usuario;
END//

-- Procedimento que edita uma nota
DROP PROCEDURE IF EXISTS proc_editar_nota//
CREATE PROCEDURE proc_editar_nota (
    IN proc_id INT, 
    IN proc_titulo VARCHAR(80),
    IN proc_conteudo VARCHAR(200),
    IN proc_id_usuario INT
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    IF NOT EXISTS (SELECT 1 FROM notas WHERE id = proc_id AND id_usuario = proc_id_usuario) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "nota_nao_cadastrada";
    END IF;

    IF EXISTS (
        SELECT 1 
        FROM notas 
        WHERE titulo = proc_titulo AND id <> proc_id AND id_usuario = proc_id_usuario
    ) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "nota_ja_cadastrada";
    END IF;

    UPDATE notas
    SET titulo = proc_titulo, conteudo = proc_conteudo
    WHERE id = proc_id AND id_usuario = proc_id_usuario;
END//

-- Procedimento que edita um usuário
DROP PROCEDURE IF EXISTS proc_editar_usuario//
CREATE PROCEDURE proc_editar_usuario (
    IN proc_id INT,
    IN proc_nome VARCHAR(50),
    IN proc_email VARCHAR(80),
    IN proc_senha CHAR(60),
    IN proc_pergunta_seguranca CHAR(1),
    IN proc_resposta CHAR(60)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    IF EXISTS (SELECT 1 FROM usuarios WHERE email = proc_email AND id <> proc_id) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_ja_cadastrado";
    END IF;

    UPDATE usuarios
    SET 
        nome = proc_nome, 
        email = proc_email, 
        senha = proc_senha, 
        pergunta_seguranca = proc_pergunta_seguranca, 
        resposta = proc_resposta
    WHERE id = proc_id;
END//

-- Procedimento que deleta um usuário
DROP PROCEDURE IF EXISTS proc_deletar_usuario//
CREATE PROCEDURE proc_deletar_usuario (IN proc_id INT)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = proc_id) THEN
        SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "usuario_nao_cadastrado";
    END IF;

    DELETE FROM usuarios WHERE id = proc_id;
END//

delimiter ;