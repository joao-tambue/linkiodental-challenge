import { Request, Response } from 'express';
import Order from '../models/order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { lab, patient, customer, services } = req.body;

    // Regra de negócio: serviços obrigatórios e valor total > 0
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'O pedido deve ter pelo menos um serviço.' });
    }

    const totalValue = services.reduce((acc, s) => acc + (s.value || 0), 0);
    if (totalValue <= 0) {
      return res.status(400).json({ message: 'O valor total dos serviços deve ser maior que 0.' });
    }

    const order = new Order({
      lab,
      patient,
      customer,
      services,
      state: 'CREATED',
      status: 'ACTIVE',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar pedido', error: err });
  }
};


export const getOrders = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, state } = req.query;
    const filter: any = { status: 'ACTIVE' };
    if (state) filter.state = state;
    try {
        const orders = await Order.find(filter)
            .limit(+limit)
            .skip((+page - 1) * +limit);
        const total = await Order.countDocuments(filter);
        res.status(200).json({ total, page: +page, limit: +limit, orders });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos', error });
    }
};

export const advanceOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });

    if (order.status === 'DELETED') {
      return res.status(400).json({ message: 'Não é possível avançar um pedido excluído.' });
    }

    const flow = ['CREATED', 'ANALYSIS', 'COMPLETED'] as const;
    const currentIndex = flow.indexOf(order.state);

    if (currentIndex === -1 || currentIndex === flow.length - 1) {
      return res.status(400).json({ message: 'O pedido não pode avançar mais.' });
    }

    order.state = flow[currentIndex + 1];
    await order.save();

    res.json({ message: `Pedido avançado para ${order.state}`, order });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao avançar o pedido', error: err });
  }
};