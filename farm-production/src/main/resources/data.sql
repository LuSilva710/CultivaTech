-- Criação do banco de dados (executado automaticamente pelo container MySQL)
CREATE DATABASE IF NOT EXISTS farm_production;
USE farm_production;

-- Tabela de produções
CREATE TABLE IF NOT EXISTS producoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    dias_colheita INT,
    quantidade DOUBLE,
    unidade_medida VARCHAR(20),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    propriedade_id BIGINT,
    FOREIGN KEY (propriedade_id) REFERENCES propriedades(id) ON DELETE CASCADE
);

-- Inserir um cultivo (PLANTA) para a 'Fazenda Esperança' (presumindo ID 4)
INSERT INTO producoes (nome, especie, data_inicio, dias_colheita, quantidade, unidade_medida, propriedade_id) VALUES
('Soja', 'PLANTA', '2025-07-20', 120, 50.0, 'toneladas', 4);

-- Inserir uma produção animal (ANIMAL) para a 'Fazenda Esperança' (presumindo ID 4)
INSERT INTO producoes (nome, especie, data_inicio, quantidade, unidade_medida, propriedade_id) VALUES
('Gado de Corte', 'ANIMAL', '2025-01-15', 300.0, 'cabeças', 4);