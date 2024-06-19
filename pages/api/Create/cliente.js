// pages/api/cadcliente.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nm_cliente, dt_nascimento, cd_cpf, ds_telefone_cliente, ds_email_cliente, ds_logradouro_cliente, cd_numero_logradouro_cliente, ds_complemento_logradouro_cliente, cd_cep_cliente } = req.body;

    try {
      // Check if the client exists
      const existingClient = await prisma.cliente.findMany({
        where: { ds_email_cliente: ds_email_cliente }
      });

      if (!existingClient) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new client with the hashed password
      const newClient = await prisma.cliente.create({
        data: {
          nm_cliente,
          dt_nascimento,
          cd_cpf,
          ds_telefone_cliente,
          ds_email_cliente,
          ds_logradouro_cliente,
          cd_numero_logradouro_cliente,
          ds_complemento_logradouro_cliente,
          cd_cep_cliente
        }
      });

      res.status(201).json({ message: 'Client created successfully' });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
