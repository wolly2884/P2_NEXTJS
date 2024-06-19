// pages/api/clientes.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // Captura o ID do cliente da query da requisição

  switch (req.method) {
    case 'GET':
      if (id) {
        await getClientById(req, res, id);
      } else {
        await getAllClients(req, res);
      }
      break;
    case 'POST':
      await createClient(req, res);
      break;
    case 'PUT':
      if (id) {
        await updateClient(req, res, id);
      } else {
        res.status(400).json({ error: 'ID do cliente não fornecido' });
      }
      break;
    case 'DELETE':
      if (id) {
        await deleteClient(req, res, id);
      } else {
        res.status(400).json({ error: 'ID do cliente não fornecido' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}

// Função para buscar um cliente por ID
async function getClientById(req, res, id) {
  try {
    const client = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const data = {
      id: client.id,
      nm_cliente: client.nm_cliente,
      dt_nascimento: client.dt_nascimento.toISOString().split('T')[0],
      cd_cpf: client.cd_cpf,
      ds_telefone_cliente: client.ds_telefone_cliente,
      ds_email_cliente: client.ds_email_cliente,
      ds_logradouro_cliente: client.ds_logradouro_cliente,
      cd_numero_logradouro_cliente: client.cd_numero_logradouro_cliente,
      ds_complemento_logradouro_cliente: client.ds_complemento_logradouro_cliente,
      cd_cep_cliente: client.cd_cep_cliente
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch client:', error);
    res.status(500).json({ error: 'Falha ao buscar cliente' });
  }
}

// Função para buscar todos os clientes
async function getAllClients(req, res) {
  try {
    const clients = await prisma.cliente.findMany();

    const data = clients.map(client => ({
      id: client.id,
      nm_cliente: client.nm_cliente,
      dt_nascimento: client.dt_nascimento.toISOString().split('T')[0],
      cd_cpf: client.cd_cpf,
      ds_telefone_cliente: client.ds_telefone_cliente,
      ds_email_cliente: client.ds_email_cliente,
      ds_logradouro_cliente: client.ds_logradouro_cliente,
      cd_numero_logradouro_cliente: client.cd_numero_logradouro_cliente,
      ds_complemento_logradouro_cliente: client.ds_complemento_logradouro_cliente,
      cd_cep_cliente: client.cd_cep_cliente
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    res.status(500).json({ error: 'Falha ao buscar clientes' });
  }
}

// Função para criar um novo cliente
async function createClient(req, res) {
  try {
    const {
      nm_cliente,
      dt_nascimento,
      cd_cpf,
      ds_telefone_cliente,
      ds_email_cliente,
      ds_logradouro_cliente,
      cd_numero_logradouro_cliente,
      ds_complemento_logradouro_cliente,
      cd_cep_cliente
    } = req.body;

    const newClient = await prisma.cliente.create({
      data: {
        nm_cliente,
        dt_nascimento: new Date(dt_nascimento),
        cd_cpf,
        ds_telefone_cliente,
        ds_email_cliente,
        ds_logradouro_cliente,
        cd_numero_logradouro_cliente,
        ds_complemento_logradouro_cliente,
        cd_cep_cliente
      },
    });

    res.status(201).json(newClient);
  } catch (error) {
    console.error('Failed to create client:', error);
    res.status(500).json({ error: 'Falha ao criar cliente' });
  }
}

// Função para atualizar um cliente
async function updateClient(req, res, id) {
  try {
    const {
      nm_cliente,
      dt_nascimento,
      cd_cpf,
      ds_telefone_cliente,
      ds_email_cliente,
      ds_logradouro_cliente,
      cd_numero_logradouro_cliente,
      ds_complemento_logradouro_cliente,
      cd_cep_cliente
    } = req.body;

    const updatedClient = await prisma.cliente.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nm_cliente,
        dt_nascimento: new Date(dt_nascimento),
        cd_cpf,
        ds_telefone_cliente,
        ds_email_cliente,
        ds_logradouro_cliente,
        cd_numero_logradouro_cliente,
        ds_complemento_logradouro_cliente,
        cd_cep_cliente
      },
    });

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Failed to update client:', error);
    res.status(500).json({ error: 'Falha ao atualizar cliente' });
  }
}

// Função para deletar um cliente
async function deleteClient(req, res, id) {
  try {
    await prisma.cliente.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).end(); // Retorna 204 No Content
  } catch (error) {
    console.error('Failed to delete client:', error);
    res.status(500).json({ error: 'Falha ao deletar cliente' });
  }
}
