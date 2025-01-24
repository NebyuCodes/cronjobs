import { CEventService, QEventService } from "./dal";
import AppError from "../../../../utils/app_error";
import config from "../../../../config";
import { RequestHandler } from "express";

// Create an event
export const createEvent: RequestHandler = async (req, res, next) => {
  try {
    const data = <Event.ICreateEvent>req.value;

    // Check if the end date is greater than the start date
    const startDate = new Date(data.start_date).getTime();
    const endDate = new Date(data.end_date).getTime();
    if (endDate <= startDate)
      return next(
        new AppError(
          "Event end date can not be before the event start date.",
          400
        )
      );

    const event = await CEventService.createEvent(data);

    res.status(200).json({
      status: "SUCCESS",
      message: "Event is successfully created",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all events
export const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const { events, results } = await QEventService.getAllEvents(req.query);

    res.status(200).json({
      status: "SUCCESS",
      results: events.length,
      totalResult: results,
      data: {
        events,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get an event
export const getEvent: RequestHandler = async (req, res, next) => {
  try {
    const event = await QEventService.getEvent(req.params.id);
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get an event using slug
export const getEventBySlug: RequestHandler = async (req, res, next) => {
  try {
    const event = await QEventService.getEventBySlug(req.params.title_slug);
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update an event
export const updateEvent: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const data = <Event.IUpdateEvent>req.value;

    // Check if the end date is greater than the start date
    const startDate = new Date(data.start_date).getTime();
    const endDate = new Date(data.end_date).getTime();
    if (endDate <= startDate)
      return next(
        new AppError(
          "Event end date can not be before the event start date.",
          400
        )
      );

    const event = await CEventService.updateEvent(req.params.id, data);
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Event is successfully updated",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update event image
export const updateEventImage: RequestHandler = async (req, res, next) => {
  try {
    const data = <Event.IUpdateEventImage>req.value;

    const event = await CEventService.updateEventImage(req.params.id, data);
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Event image is successfully updated",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update an event status
export const updateEventStatus: RequestHandler = async (req, res, next) => {
  try {
    const { is_active } = <Event.IUpdateStatus>req.value;
    const event = await CEventService.updateEventStatus(
      req.params.id,
      is_active
    );
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Event status is successfully updated",
      data: {
        event,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete an event
export const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    const event = await CEventService.deleteEvent(req.params.id);
    if (!event) return next(new AppError("Event does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Event is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete Multiple Events
export const deleteMultipleEvents: RequestHandler = async (req, res, next) => {
  try {
    const { ids } = <Event.IDeleteMultipleEvents>req.value;

    await CEventService.deleteMultipleEvents(ids);

    res.status(200).json({
      status: "SUCCESS",
      message: "Multiple events are successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all events
export const deleteAllEvents: RequestHandler = async (req, res, next) => {
  try {
    // Check delete key
    const { delete_key, state } = <Event.IDeleteAllEvents>req.value;
    if (config.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 400));

    await CEventService.deleteAllEvents(state);

    let message = "All inactive events are deleted";
    let historyMessage = "Delete inactive events";
    if (state) {
      message = "All events are deleted";
      historyMessage = "Delete all events";
    }

    res.status(200).json({
      status: "SUCCESS",
      message,
    });
  } catch (error) {
    next(error);
  }
};

// Number of events
export const numberOfEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await QEventService.countEventDocuments();

    res.status(200).json({
      status: "SUCCESS",
      results: events,
    });
  } catch (error) {
    next(error);
  }
};
