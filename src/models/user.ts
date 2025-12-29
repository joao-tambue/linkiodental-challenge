import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

userSchema.pre('save', async function(this: any) {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(this: any, password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);