import { Router } from "express";
const router = Router();

import { validator, protect, auth } from "../../middlewares";

import {
  createEventValidation,
  updateEventValidation,
  updateEventImageValidation,
  updateEventStatusValidation,
  deleteAllEventsValidation,
  deleteMultipleEventsValidation,
} from "./validations";

import {
  createEvent,
  getAllEvents,
  getEvent,
  getEventBySlug,
  updateEvent,
  updateEventImage,
  updateEventStatus,
  deleteEvent,
  deleteMultipleEvents,
  deleteAllEvents,
  numberOfEvents,
} from "./controller";

router.get("/count", numberOfEvents);

router.delete(
  "/multiple",
  protect,
  auth("Owner"),
  validator(deleteMultipleEventsValidation),
  deleteMultipleEvents
);

router
  .route("/")
  .get(getAllEvents)
  .post(
    protect,
    auth("Owner", "Super-admin"),
    validator(createEventValidation),
    createEvent
  )
  .delete(
    protect,
    auth("Owner"),
    validator(deleteAllEventsValidation),
    deleteAllEvents
  );

router.get("/:title_slug/title", getEventBySlug);

router.patch(
  "/:id/status",
  protect,
  auth("Owner", "Super-admin"),
  validator(updateEventStatusValidation),
  updateEventStatus
);

router.patch(
  "/:id/image",
  protect,
  auth("Owner", "Super-admin"),
  validator(updateEventImageValidation),
  updateEventImage
);

router
  .route("/:id")
  .get(getEvent)
  .patch(
    protect,
    auth("Owner", "Super-admin"),
    validator(updateEventValidation),
    updateEvent
  )
  .delete(protect, auth("Owner"), deleteEvent);

export default router;
