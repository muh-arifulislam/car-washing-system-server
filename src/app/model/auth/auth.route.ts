import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/signup", AuthControllers.createUser);

router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
