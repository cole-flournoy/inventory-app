import { Login, Signup } from "../controllers/AuthController";
import { Router } from "express";
import { userAuthentication } from "../utils/auth";

const router = Router();

router.post('/verify', userAuthentication)
router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;