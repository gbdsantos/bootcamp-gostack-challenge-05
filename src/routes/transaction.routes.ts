import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO:
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    /**
     * TODO: POST /transactions:
     * A rota deve receber title, value, type, e category dentro do
     * corpo da requisição, sendo o type o tipo da transação, que deve ser
     * income para entradas (depósitos) e outcome para saídas (retiradas).
     * Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu
     * banco de dados, possuindo os campos id, title, value, type, category_id,
     * created_at, updated_at
     */
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
