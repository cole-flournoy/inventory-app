import { Router } from "express";
import { verifyJWT } from "../utils/auth";
import { getInventory, createInventoryItem } from "../controllers/InventoryController";

const router = Router();

router.use(verifyJWT);

router.route('/')
  .get(getInventory)
  .post(createInventoryItem)
  .patch()
  .delete();

module.exports = router;