import { Router } from "express";
import { ServiceControllers } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ServiceValidations } from "./service.validation";
import validateAuth from "../../middlewares/validateAuth";
import { USER_ROLE } from "../user/user.constant";
import { SlotValidations } from "../slot/slot.validation";

const router = Router();

router.post(
  "/",
  validateAuth(USER_ROLE.admin),
  validateRequest(ServiceValidations.createServiceSchema),
  ServiceControllers.createService
);

router.get("/:id", ServiceControllers.getSingleService);

router.get("/", ServiceControllers.getAllService);

router.put(
  "/:id",
  validateAuth(USER_ROLE.admin),
  validateRequest(ServiceValidations.updateServiceSchema),
  ServiceControllers.updateOneService
);

router.delete(
  "/:id",
  validateAuth(USER_ROLE.admin),
  ServiceControllers.deleteOneService
);

router.post(
  "/slots",
  validateAuth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotSchema),
  ServiceControllers.createServiceSlotes
);

export const ServiceRoutes = router;
