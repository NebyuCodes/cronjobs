import { Router } from "express";
const router = Router();

import { validator, protect, auth } from "../../middlewares";

import {
  createMessageValidation,
  deleteAllMessagesValidation,
  deleteMultipleMessagesValidation,
} from "./validation";

import {
  createMessage,
  getAllMessages,
  getMessage,
  deleteMessage,
  deleteMultipleMessages,
  deleteAllMessages,
  numberOfMessages,
} from "./controller";

router.get("/count", numberOfMessages);

router.delete(
  "/multiple",
  protect,
  auth("Owner"),
  validator(deleteMultipleMessagesValidation),
  deleteMultipleMessages
);

router
  .route("/")
  .get(protect, auth("Owner", "Super-admin", "Admin"), getAllMessages)
  .post(validator(createMessageValidation), createMessage)
  .delete(
    protect,
    auth("Owner"),
    validator(deleteAllMessagesValidation),
    deleteAllMessages
  );

router
  .route("/:id")
  .get(protect, auth("Owner", "Super-admin", "Admin"), getMessage)
  .delete(protect, auth("Owner"), deleteMessage);

export default router;
