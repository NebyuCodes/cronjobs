import { CContactusService, QContactusService } from "./dal";
import AppError from "../../../../utils/app_error";
import config from "../../../../config";
import { RequestHandler } from "express";

// Create a message
export const createMessage: RequestHandler = async (req, res, next) => {
  try {
    // Get body
    const data = <Contactus.ICreateMessage>req.value;

    const message = await CContactusService.createMessage(data);

    res.status(200).json({
      status: "SUCCESS",
      message: "Message successfully sent",
    });
  } catch (error) {
    next(error);
  }
};

// Get all messages
export const getAllMessages: RequestHandler = async (req, res, next) => {
  try {
    const { messages, results } = await QContactusService.getAllMessages(
      req.query
    );

    res.status(200).json({
      status: "SUCCESS",
      results: messages.length,
      totalResult: results,
      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a message
export const getMessage: RequestHandler = async (req, res, next) => {
  try {
    const message = await QContactusService.getMessage(req.params.id);
    if (!message) return next(new AppError("Message does not exists", 404));

    if (!message.is_read) {
      await CContactusService.updateReadStatus(message.id);
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a message
export const deleteMessage: RequestHandler = async (req, res, next) => {
  try {
    const message = await CContactusService.deleteMessage(req.params.id);
    if (!message) return next(new AppError("Message does not exists", 404));

    res.status(200).json({
      status: "SUCCESS",
      message: "Message is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete Multiple Messages
export const deleteMultipleMessages: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { ids } = <Contactus.IDeleteMultipleMessages>req.value;

    await CContactusService.deleteMultipleMessages(ids);

    res.status(200).json({
      status: "SUCCESS",
      message: "Multiple messages are successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Delete all messages
export const deleteAllMessages: RequestHandler = async (req, res, next) => {
  try {
    // Check delete key
    const { delete_key } = <Contactus.IDeleteAllMessages>req.value;
    if (config.delete_key !== delete_key)
      return next(new AppError("Invalid delete key", 400));

    await CContactusService.deleteAllMessages();

    res.status(200).json({
      status: "SUCCESS",
      message: "All messages are deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Number of messages
export const numberOfMessages: RequestHandler = async (req, res, next) => {
  try {
    const messages = await QContactusService.countContactusDocuments();

    res.status(200).json({
      status: "SUCCESS",
      results: messages,
    });
  } catch (error) {
    next(error);
  }
};
