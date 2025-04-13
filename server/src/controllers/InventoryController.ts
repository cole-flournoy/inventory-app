import { Request, Response } from "express";
import Inventory from "../models/inventory";

export const getInventory = async (req: Request, res: Response) => {
  try {
    console.log('Get inventory request received:', req.body);
    
    const items = await Inventory.find({ companyId: req.body.user.companyId }).lean();

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'No inventory items found' });
      return;
    }

    res.json(items);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createInventoryItem = async (req: Request, res: Response) => {
  const { SKU } = req.body;
  
  try {
    const existingSKU = await Inventory.findOne({ SKU }).lean();
    if (existingSKU) {
      res.status(400).json({ message: 'SKU must be unique' });
      return;
    }
  
    const newItem = new Inventory(req.body);
    await newItem.save();

    res.status(201).json({ message: 'New item created' });
  } catch {
    res.status(400).json({ message: 'Invalid item data recieved' });
  }
}

export const updateInventoryItem = async (req: Request, res: Response) => {
  const { currentSKU } = req.body;
  const { SKU: newSKU, name, count, companyId, description } = req.body.updatedItem;

  console.log('Update inventory item request received:', req.body);

  try {
    if (newSKU !== currentSKU) {
      const existingItemWithSKU = await Inventory.findOne({ SKU: newSKU }).lean();
      if (existingItemWithSKU) {
        res.status(400).json({ message: 'SKU must be unique' });
        return;
      }
    }
    
    const updatedItem = await Inventory.findOneAndUpdate(
      { SKU: currentSKU },
      { 
        SKU: newSKU,
        name, 
        count, 
        companyId,
        description 
      },
    );

    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json({ message: 'Item updated', item: updatedItem });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};