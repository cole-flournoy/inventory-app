import { Document, model, Schema, Types} from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  companyId: Types.ObjectId;
  name: string;
  role: 'ADMIN' | 'USER';
  username: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<User>({
  companyId: {
    type: Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

UserSchema.pre<User>('save', async function (next) {
  // Only hash new or modified passwords
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (incomingPassword: string): Promise<boolean> {
  return await bcrypt.compare(incomingPassword, this.password);
};

export const UserModel = model<User>('User', UserSchema);