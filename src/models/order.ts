import { Schema, model } from 'mongoose';

interface IService {
  name: string;
  value: number;
  status: 'PENDING' | 'DONE';
}

interface IOrder {
  lab: string;
  patient: string;
  customer: string;
  state: 'CREATED' | 'ANALYSIS' | 'COMPLETED';
  status: 'ACTIVE' | 'DELETED';
  services: IService[];
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'DONE'], required: true },
});

const orderSchema = new Schema<IOrder>({
  lab: { type: String, required: true },
  patient: { type: String, required: true },
  customer: { type: String, required: true },
  state: { 
    type: String, 
    enum: ['CREATED','ANALYSIS','COMPLETED'], 
    default: 'CREATED' 
  },
  status: { 
    type: String, 
    enum: ['ACTIVE','DELETED'], 
    default: 'ACTIVE' 
  },
  services: { 
    type: [serviceSchema], 
    required: true 
  },
}, { timestamps: true });

export default model<IOrder>('Order', orderSchema);