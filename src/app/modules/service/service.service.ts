import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import { TSlot, TSloteSchedule } from "../slot/slot.interface";
import dayjs from "dayjs";
import { Slot } from "../slot/slot.model";
import { SLOT_STATUS } from "../slot/slot.constant";
import minutesToHour from "../../utils/minutesToHour";

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);

  return result;
};

const getOneFromDB = async (id: string) => {
  const result = await Service.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found");
  }

  return result;
};

const getAllFromDB = async () => {
  const result = await Service.find();

  return result;
};

const updateOneIntoDB = async (id: string, payload: Partial<TService>) => {
  //check if service is exits
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found!");
  }

  const result = await Service.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });

  return result;
};

const deleteOneIntoDB = async (id: string) => {
  //check if service is exits
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Data not found!");
  }

  const result = await Service.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

const createServiceSlotesIntoDB = async (payload: TSloteSchedule) => {
  const service = await Service.findOne({ _id: payload.service });

  //check if service exits
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "No data found");
  }

  //check if service is deleted
  if (service.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "No data found");
  }

  //convert time into datetime
  const startTime = dayjs(`${payload.date}T${payload.startTime}`);
  const endTime = dayjs(`${payload.date}T${payload.endTime}`);

  //convert date time into minutes
  const startTimeInMinutes = startTime.hour() * 60 + startTime.minute();
  const endTimeInMinutes = endTime.hour() * 60 + endTime.minute();

  // Calculate the total duration in minutes
  const totalDuration = endTimeInMinutes - startTimeInMinutes;

  // calculate total slots
  const totalSlotsNo = totalDuration / service.duration;

  let currentSlotNo = 1;
  let currentStartTime = startTimeInMinutes;

  const slotesDocs: TSlot[] = [];

  while (currentSlotNo <= totalSlotsNo) {
    slotesDocs.push({
      startTime: minutesToHour(currentStartTime),
      endTime: minutesToHour(currentStartTime + service.duration),
      date: payload.date,
      isBooked: SLOT_STATUS.available,
      service: service._id,
    });

    currentStartTime += service.duration;
    currentSlotNo += 1;
  }

  const result = await Slot.insertMany(slotesDocs);
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getOneFromDB,
  getAllFromDB,
  updateOneIntoDB,
  deleteOneIntoDB,
  createServiceSlotesIntoDB,
};
