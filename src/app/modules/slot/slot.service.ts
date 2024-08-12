import mongoose from "mongoose";
import { Slot } from "./slot.model";

const getAllSlotsFromDB = async (options: Record<string, unknown>) => {
  const query = Slot.aggregate([]);

  //filter slots by date
  const date = options?.date;
  if (date) {
    query.match({
      date,
    });
  }

  //filter slots by serviceId
  const serviceId = options?.serviceId;
  if (serviceId) {
    //modify serviceId string into objectId to match
    const modifiedServiceId = new mongoose.Types.ObjectId(serviceId as string);
    query.match({
      service: modifiedServiceId,
    });
  }

  //lookup service details
  query.lookup({
    from: "services",
    localField: "service",
    foreignField: "_id",
    as: "service",
  });
  query.unwind("service");

  //project
  query.project({ __v: 0 });

  const result = await query;

  return result;
};

export const SlotServices = { getAllSlotsFromDB };
