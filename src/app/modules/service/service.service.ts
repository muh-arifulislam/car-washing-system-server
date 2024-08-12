import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import { TSlot, TSloteSchedule } from "../slot/slot.interface";
import dayjs from "dayjs";
import { Slot } from "../slot/slot.model";
import { SLOT_STATUS } from "../slot/slot.constant";

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
  const result = await Service.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });

  return result;
};

const deleteOneIntoDB = async (id: string) => {
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

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "No data found");
  }

  // Combine the date with start and end times
  const start = dayjs(`${payload.date}T${payload.startTime}`);
  const end = dayjs(`${payload.date}T${payload.endTime}`);

  // Convert start time to minutes since start of the day
  const startMinutes = start.hour() * 60 + start.minute();

  // Convert end time to minutes since start of the day
  const endMinutes = end.hour() * 60 + end.minute();

  // Calculate the total duration in minutes
  const totalDuration = endMinutes - startMinutes;

  // calculate slots
  const totalSlots = totalDuration / service.duration;

  let currentSlot = 1;
  let currentStartTime = startMinutes;

  const slotDocs: TSlot[] = [];

  const minutesToHour = (minutes: number) => {
    return dayjs().startOf("day").add(minutes, "minute").format("HH:mm");
  };

  while (currentSlot <= totalSlots) {
    slotDocs.push({
      startTime: minutesToHour(currentStartTime),
      endTime: minutesToHour(currentStartTime + service.duration),
      date: payload.date,
      isBooked: SLOT_STATUS.available,
      service: service._id,
    });

    currentStartTime += service.duration;
    currentSlot += 1;
  }

  const result = await Slot.insertMany(slotDocs);
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
