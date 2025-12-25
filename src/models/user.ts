import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);