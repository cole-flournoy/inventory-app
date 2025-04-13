import { Login, Signup } from "../controllers/AuthController";
import { Router } from "express";
import { returnAuthenticatedUser } from "../utils/auth";

const router = Router();

router.post('/verify', returnAuthenticatedUser)
router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;