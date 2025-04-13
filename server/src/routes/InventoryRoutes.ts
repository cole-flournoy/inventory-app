import { Router } from "express";
import { verifyJWT } from "../utils/auth";
import { getInventory, createInventoryItem, updateInventoryItem } from "../controllers/InventoryController";

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(getInventory)
  .post(createInventoryItem)
  .put(updateInventoryItem)
  .delete();

module.exports = router;