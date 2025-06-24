CREATE DATABASE IF NOT EXISTS meu_banco;
USE meu_banco;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT
);

INSERT INTO produtos (nome, preco, descricao) VALUES
('Monitor Gamer', 1200.00, 'Monitor de 27 polegadas, 144Hz'),
('Teclado Mecânico', 350.00, 'Teclado RGB com switches azuis'),
('Mouse Sem Fio', 180.00, 'Mouse ergonômico com alta precisão');