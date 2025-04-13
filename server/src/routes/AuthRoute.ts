import { Signup } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post('/api/signup', Signup);

module.exports = router;