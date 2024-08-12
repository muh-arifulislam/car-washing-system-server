import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";

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

export const ServiceServices = {
  createServiceIntoDB,
  getOneFromDB,
  getAllFromDB,
  updateOneIntoDB,
  deleteOneIntoDB,
};
