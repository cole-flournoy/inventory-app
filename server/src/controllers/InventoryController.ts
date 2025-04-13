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