import { Router } from "express";
import { verifyJWT } from "../utils/auth";
import { getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } from "../controllers/InventoryController";

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(getInventory)
  .post(createInventoryItem)
  .put(updateInventoryItem)
  .delete(deleteInventoryItem)

module.exports = router;