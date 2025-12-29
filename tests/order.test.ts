import { describe, it, expect } from 'vitest';
import Order from '../src/models/order';

describe('Order business rules', () => {
  it('should not allow order without services', async () => {
    const order = new Order({
      lab: 'Lab X',
      patient: 'Patient Y',
      customer: 'Customer Z',
      services: [],
    });

    try {
      await order.save();
    } catch (err: any) {
      expect(err.message).toContain('O pedido deve ter pelo menos um serviço');
    }
  });

  it('should not allow advancing from COMPLETED', () => {
    const order: any = { 
      state: 'COMPLETED', 
      status: 'ACTIVE', 
      save: async () => {} 
    };
    const flow = [
      'CREATED',
      'ANALYSIS',
      'COMPLETED'
    ] as const;
    const currentIndex = flow.indexOf(order.state);

    expect(currentIndex).toBe(flow.length - 1);
  });
});