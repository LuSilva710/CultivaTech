import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Formulario, Campo, Botao } from './styles.js';
import axios from 'axios';

const CadastroPropriedade = () => {
  const navegar = useNavigate();

  // Estados para os campos do formulário
  const [nomePropriedade, setNomePropriedade] = useState('');
  const [tamanhoPropriedade, setTamanhoPropriedade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [tipo, setTipo] = useState('AGRICOLA'); // Novo estado para o tipo de propriedade

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados da propriedade a serem enviados para a API
    const propriedadeData = {
      name: nomePropriedade,
      location: endereco,
      areaHectares: parseFloat(tamanhoPropriedade),
      type: tipo,
    };
    
    // Supondo que você tem um token de autenticação armazenado (ex: localStorage)
    const token = localStorage.getItem('token'); 
    
    if (!token) {
        alert("Você precisa estar logado para cadastrar uma propriedade.");
        navegar('/login');
        return;
    }

    try {
      // Envia os dados para a API do Property-Service através do API Gateway
      const response = await axios.post('/api/properties', propriedadeData, {
        headers: {
          'Authorization': `Bearer ${token}` // Inclui o token para autenticação
        }
      });

      console.log('Propriedade cadastrada com sucesso:', response.data);
      alert('Propriedade cadastrada com sucesso!');

      // Redireciona para o dashboard após o cadastro
      navegar('/dashboard'); 
      
    } catch (error) {
      console.error('Erro ao cadastrar propriedade:', error);
      alert('Erro ao cadastrar propriedade. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Container>
      <h1>Cadastrar Propriedade</h1>
      <Formulario onSubmit={handleSubmit}>
        <Campo
          type="text"
          placeholder="Nome da Propriedade"
          value={nomePropriedade}
          onChange={(e) => setNomePropriedade(e.target.value)}
          required
        />
        <Campo
          type="number"
          placeholder="Tamanho da Propriedade (ha)"
          value={tamanhoPropriedade}
          onChange={(e) => setTamanhoPropriedade(e.target.value)}
          required
        />
        <Campo
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
        {/* Novo campo para selecionar o tipo de propriedade */}
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '5px', fontSize: '1rem', border: '1px solid #ccc' }}
        >
          <option value="AGRICOLA">Agrícola</option>
          <option value="PECUARIA">Pecuária</option>
          <option value="MISTA">Mista</option>
        </select>
        <Botao type="submit">Cadastrar</Botao>
        <Botao onClick={() => navegar('/minhas-propriedades')}>
          Minhas Propriedades
        </Botao>
      </Formulario>
    </Container>
  );
};

export default CadastroPropriedade;