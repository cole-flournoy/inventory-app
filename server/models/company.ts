import { Document, model, Schema } from 'mongoose';

export interface Company extends Document {
  name: string;
}

const CompanySchema = new Schema<Company>({
  name: {
    type: String,
    required: true,
  },
});

export const CompanyModel = model<Company>('Company', CompanySchema);