import { Document, model, Schema, Types} from 'mongoose';

export interface Inventory extends Document {
  SKU: string;
  companyId: Types.ObjectId;
  name: string;
  count: number;
  description?: string;
}

const InventorySchema = new Schema<Inventory>({
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const Inventory = model<Inventory>('Inventory', InventorySchema);

export default Inventory;