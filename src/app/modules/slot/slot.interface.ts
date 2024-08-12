import { Types } from "mongoose";

export type TSlotStatus = "available" | "booked" | "canceled";

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: TSlotStatus;
};

export type TSloteSchedule = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};
