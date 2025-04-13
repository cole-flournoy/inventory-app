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

const Company = model<Company>('Company', CompanySchema);

export default Company;