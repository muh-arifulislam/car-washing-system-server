import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Slots created successfully",
    data: result,
  });
});

export const SlotControllers = { getAllSlots };
