import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';
import type { Acomodacao } from './types/acomodacao';
import type { Cliente } from './types/cliente';
import type { Dependente } from './types/dependente';
import type { Hospedagem } from './types/hospedagem';
import { NomeAcomodacao } from './types/acomodacao';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/atlantis_hotel';
const client = new MongoClient(uri);
let db: Db;
let acomodacoes: Collection<Acomodacao>;
let clientes: Collection<Cliente>;
let dependentes: Collection<Dependente>;
let hospedagens: Collection<Hospedagem>;

app.use(cors());
app.use(express.json());

async function initializeDatabase(): Promise<void> {
  try {
    await client.connect();
    db = client.db('atlantis_hotel');
    
    acomodacoes = db.collection<Acomodacao>('acomodacoes');
    clientes = db.collection<Cliente>('clientes');
    dependentes = db.collection<Dependente>('dependentes');
    hospedagens = db.collection<Hospedagem>('hospedagens');

    await acomodacoes.createIndex({ nome: 1 }, { unique: true });
    await clientes.createIndex({ nome: 1 });
    await dependentes.createIndex({ titularId: 1 });
    await hospedagens.createIndex({ cliente: 1, acomodacao: 1 });

    
    const defaultAccommodations: Acomodacao[] = [
      {
        nome: NomeAcomodacao.CasalSimples,
        camaSolteiro: 0,
        camaCasal: 1,
        suite: 1,
        climatizacao: true,
        garagem: 1,
        disponivel: true
      },
      {
        nome: NomeAcomodacao.FamiliaSimples,
        camaSolteiro: 2,
        camaCasal: 1,
        suite: 1,
        climatizacao: true,
        garagem: 1,
        disponivel: true
      },
      {
        nome: NomeAcomodacao.FamiliaMais,
        camaSolteiro: 5,
        camaCasal: 1,
        suite: 2,
        climatizacao: true,
        garagem: 2,
        disponivel: true
      },
      {
        nome: NomeAcomodacao.FamiliaSuper,
        camaSolteiro: 6,
        camaCasal: 2,
        suite: 3,
        climatizacao: true,
        garagem: 2,
        disponivel: true
      },
      {
        nome: NomeAcomodacao.SolteiroSimples,
        camaSolteiro: 1,
        camaCasal: 0,
        suite: 1,
        climatizacao: true,
        garagem: 0,
        disponivel: true
      },
      {
        nome: NomeAcomodacao.SolteiroMais,
        camaSolteiro: 0,
        camaCasal: 1,
        suite: 1,
        climatizacao: true,
        garagem: 1,
        disponivel: true
      }
    ];

    for (const accommodation of defaultAccommodations) {
      const existing = await acomodacoes.findOne({ nome: accommodation.nome });
      if (!existing) {
        await acomodacoes.insertOne(accommodation);
        console.log(`Inserindo acomocacoes: ${accommodation.nome}`);
      }
    }

    console.log('MongoDB iniciou com sucesso');
  } catch (error) {
    console.error('Algum erro aconteceu ao iniciar o mongo:', error);
    throw error;
  }
}


app.get('/api/acomodacoes', async (req, res) => {
  try {
    const results = await acomodacoes.find().toArray();
    res.json(results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })));
  } catch (error) {
    console.error('Erro no fetch de acomodacoes:', error);
    res.status(500).json({ error: 'Falhou ao dar fetch em acomodacoes' });
  }
});

app.get('/api/acomodacoes/:id', async (req, res) => {
  try {
    const doc = await acomodacoes.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: 'Acomodacao nao encontrada' });
    res.json({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro no fetch por iD:', error);
    res.status(500).json({ error: 'Falhou ao dar fetch' });
  }
});

app.patch('/api/acomodacoes/:id/indisponivel', async (req, res) => {
  try {
    const result = await acomodacoes.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { disponivel: false } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Acomodacao nao encontrada ou indisponivel' });
    }
    res.json({ message: 'Acomodacao não disponivel' });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Falhou ao dar um set em acomodacao nao disponivel' });
  }
});

app.post('/api/acomodacoes', async (req, res) => {
  try {
    const acomodacao: Omit<Acomodacao, 'id'> = req.body;
    const result = await acomodacoes.insertOne(acomodacao as Acomodacao);
    res.status(201).json({ ...acomodacao, id: result.insertedId.toString() });
  } catch (error) {
    console.error('Erro ao adicionar acomodacao:', error);
    res.status(500).json({ error: 'Falhou em add acomodacao' });
  }
});

app.put('/api/acomodacoes/:id', async (req, res) => {
  try {
    const updates: Partial<Acomodacao> = req.body;
    const updateFields: Partial<Acomodacao> = {};
    if (updates.nome !== undefined) updateFields.nome = updates.nome;
    if (updates.camaCasal !== undefined) updateFields.camaCasal = updates.camaCasal;
    if (updates.camaSolteiro !== undefined) updateFields.camaSolteiro = updates.camaSolteiro;
    if (updates.climatizacao !== undefined) updateFields.climatizacao = updates.climatizacao;
    if (updates.garagem !== undefined) updateFields.garagem = updates.garagem;
    if (updates.suite !== undefined) updateFields.suite = updates.suite;
    if (updates.disponivel !== undefined) updateFields.disponivel = updates.disponivel;

    if (Object.keys(updateFields).length === 0) {
      const doc = await acomodacoes.findOne({ _id: new ObjectId(req.params.id) });
      if (!doc) return res.status(404).json({ error: 'Acomodacao nao encontrada' });
      return res.json({
        ...doc,
        id: doc._id.toString(),
        _id: undefined
      });
    }

    const result = await acomodacoes.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Acomodacao nao encontrada' });
    }
    const updatedDoc = await acomodacoes.findOne({ _id: new ObjectId(req.params.id) });
    res.json({
      ...updatedDoc,
      id: updatedDoc!._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro atualizar acomodacao:', error);
    res.status(500).json({ error: 'falhou em atualizar accommodation' });
  }
});

app.delete('/api/acomodacoes/:id', async (req, res) => {
  try {
    const result = await acomodacoes.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Accommodation nao encontrada' });
    }
    res.json({ message: 'Acomodacao deletada' });
  } catch (error) {
    console.error('erro ao deletar:', error);
    res.status(500).json({ error: 'Falhou em deletar acomodacao' });
  }
});


app.get('/api/clientes', async (req, res) => {
  try {
    const results = await clientes.find().toArray();
    res.json(results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })));
  } catch (error) {
    console.error('Erro no fetch clientes:', error);
    res.status(500).json({ error: 'Falhou no fetch de clientes' });
  }
});

app.get('/api/clientes/:id', async (req, res) => {
  try {
    const doc = await clientes.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: 'Client nao encontrado' });
    res.json({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro ao dar fetch cliente ID:', error);
    res.status(500).json({ error: 'Falhou no fetch client' });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const cliente: Omit<Cliente, 'id'> = req.body;
    const result = await clientes.insertOne(cliente as Cliente);
    res.status(201).json({ ...cliente, id: result.insertedId.toString() });
  } catch (error) {
    console.error('Erro ao add cliente:', error);
    res.status(500).json({ error: 'Falhou em add client' });
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  try {
    const updates: Partial<Cliente> = req.body;
    const updateFields: Partial<Cliente> = {};
    if (updates.nome !== undefined) updateFields.nome = updates.nome;
    if (updates.nomeSocial !== undefined) updateFields.nomeSocial = updates.nomeSocial;
    if (updates.dataNascimento !== undefined) updateFields.dataNascimento = updates.dataNascimento;
    if (updates.endereco !== undefined) updateFields.endereco = updates.endereco;
    if (updates.documentos !== undefined) updateFields.documentos = updates.documentos;
    if (updates.telefones !== undefined) updateFields.telefones = updates.telefones;
    if (updates.dependentes !== undefined) updateFields.dependentes = updates.dependentes;

    if (Object.keys(updateFields).length === 0) {
      const doc = await clientes.findOne({ _id: new ObjectId(req.params.id) });
      if (!doc) return res.status(404).json({ error: 'Cliente nao encontrado' });
      return res.json({
        ...doc,
        id: doc._id.toString(),
        _id: undefined
      });
    }

    const result = await clientes.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }
    const updatedDoc = await clientes.findOne({ _id: new ObjectId(req.params.id) });
    res.json({
      ...updatedDoc,
      id: updatedDoc!._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro atualizar cliente:', error);
    res.status(500).json({ error: 'Falhou o update client' });
  }
});

app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const result = await clientes.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Cliente nao encontrado' });
    }
    res.json({ message: 'Cliente deletado' });
  } catch (error) {
    console.error('Error deletar client:', error);
    res.status(500).json({ error: 'Falhou no delete client' });
  }
});


app.get('/api/dependentes/titular/:titularId', async (req, res) => {
  try {
    const results = await dependentes.find({ titularId: req.params.titularId }).toArray();
    res.json(results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })));
  } catch (error) {
    console.error('Erro no dependente', error);
    res.status(500).json({ error: 'Falhou no fetch dependents' });
  }
});

app.get('/api/dependentes/:id', async (req, res) => {
  try {
    const doc = await dependentes.findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: 'Dependente nao encontrado' });
    res.json({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro no fetch dependente by ID:', error);
    res.status(500).json({ error: 'Falhou no fetch dependent' });
  }
});

app.post('/api/dependentes', async (req, res) => {
  try {
    const dependente: Omit<Dependente, 'id'> = req.body;
    const result = await dependentes.insertOne(dependente as Dependente);
    res.status(201).json({ ...dependente, id: result.insertedId.toString() });
  } catch (error) {
    console.error('Erro add o dependente:', error);
    res.status(500).json({ error: 'Falhou em add dependente' });
  }
});

app.put('/api/dependentes/:id', async (req, res) => {
  try {
    const updates: Partial<Dependente> = req.body;
    const updateFields: Partial<Dependente> = {};
    if (updates.nome !== undefined) updateFields.nome = updates.nome;
    if (updates.nomeSocial !== undefined) updateFields.nomeSocial = updates.nomeSocial;
    if (updates.dataNascimento !== undefined) updateFields.dataNascimento = updates.dataNascimento;
    if (updates.documentos !== undefined) updateFields.documentos = updates.documentos;
    if (updates.titularId !== undefined) updateFields.titularId = updates.titularId;

    if (Object.keys(updateFields).length === 0) {
      const doc = await dependentes.findOne({ _id: new ObjectId(req.params.id) });
      if (!doc) return res.status(404).json({ error: 'Dependente nao encontrado' });
      return res.json({
        ...doc,
        id: doc._id.toString(),
        _id: undefined
      });
    }

    const result = await dependentes.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Dependente nao encontrado' });
    }
    const updatedDoc = await dependentes.findOne({ _id: new ObjectId(req.params.id) });
    res.json({
      ...updatedDoc,
      id: updatedDoc!._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro update dependent:', error);
    res.status(500).json({ error: 'Falhou no update dependent' });
  }
});

app.delete('/api/dependentes/:id', async (req, res) => {
  try {
    const result = await dependentes.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Dependente nao encontrado' });
    }
    res.json({ message: 'Dependent deletado' });
  } catch (error) {
    console.error('Erro deelete dependent:', error);
    res.status(500).json({ error: 'Falhou no delete dependent' });
  }
});


app.get('/api/hospedagens', async (req, res) => {
  try {
    const results = await hospedagens.aggregate([
      {
        $lookup: {
          from: 'clientes',
          let: { clienteId: { $toObjectId: '$cliente' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$clienteId'] } } }
          ],
          as: 'cliente'
        }
      },
      {
        $unwind: {
          path: '$cliente',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'acomodacoes',
          let: { acomodacaoId: { $toObjectId: '$acomodacao' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$acomodacaoId'] } } }
          ],
          as: 'acomodacao'
        }
      },
      {
        $unwind: {
          path: '$acomodacao',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'dependentes',
          let: { dependenteIds: '$dependentes' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$dependenteIds'] } } }
          ],
          as: 'dependentes'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          _id: 0,
          cliente: 1,
          acomodacao: 1,
          dependentes: 1,
          dataCheckIn: 1,
          dataCheckOut: 1,
          valorTotal: 1
        }
      }
    ]).toArray();

    if (results.length === 0) {
      console.log('nenhuma hospedagem encontrada ou lookup retornou resultados vazios');
    }
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar hospedagens:', error);
    res.status(500).json({ error: 'Erro ao buscar hospedagens' });
  }
});

app.get('/api/hospedagens/ativas', async (req, res) => {
  try {
    const results = await hospedagens.aggregate([
      {
        $match: { dataCheckOut: null }
      },
      {
        $lookup: {
          from: 'clientes',
          let: { clienteId: { $toObjectId: '$cliente' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$clienteId'] } } }
          ],
          as: 'cliente'
        }
      },
      {
        $unwind: {
          path: '$cliente',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'acomodacoes',
          let: { acomodacaoId: { $toObjectId: '$acomodacao' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$acomodacaoId'] } } }
          ],
          as: 'acomodacao'
        }
      },
      {
        $unwind: {
          path: '$acomodacao',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'dependentes',
          let: { dependenteIds: '$dependentes' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$dependenteIds'] } } }
          ],
          as: 'dependentes'
        }
      },
      {
        $project: {
          id: { $toString: '$_id' },
          _id: 0,
          cliente: 1,
          acomodacao: 1,
          dependentes: 1,
          dataCheckIn: 1,
          dataCheckOut: 1,
          valorTotal: 1
        }
      }
    ]).toArray();

    if (results.length === 0) {
      console.log('nenhuma hospedagem encontrada ou lookup retornou resultados vazios');
    }
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar hospedagens ativas:', error);
    res.status(500).json({ error: 'Erro ao buscar hospedagens ativas' });
  }
});

app.post('/api/hospedagens', async (req, res) => {
  try {
    const hospedagem: Omit<Hospedagem, 'id'> = req.body;
    const result = await hospedagens.insertOne(hospedagem as Hospedagem);
    res.status(201).json({ ...hospedagem, id: result.insertedId.toString() });
  } catch (error) {
    console.error('Erro no add hospedagem:', error);
    res.status(500).json({ error: 'Falhou no add hospedagem' });
  }
});

app.patch('/api/hospedagens/:id/checkout', async (req, res) => {
  try {
    const result = await hospedagens.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { dataCheckOut: new Date() } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Hospedagem nao encontrada' });
    }
    const updatedDoc = await hospedagens.findOne({ _id: new ObjectId(req.params.id) });
    res.json({
      ...updatedDoc,
      id: updatedDoc!._id.toString(),
      _id: undefined
    });
  } catch (error) {
    console.error('Erro ao realizar checkout:', error);
    res.status(500).json({ error: 'falhou ao realizar checkout' });
  }
});


async function startServer() {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server rodando no http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao inciiar o servidor:', error);
    process.exit(1);
  }
}

startServer();