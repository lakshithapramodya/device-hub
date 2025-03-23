"use server";

import { CommonResponseDataType, ResponseStatus } from "@/types/common";
import { DeviceDataType, DeviceType } from "@/types/devices";
import axios from "@/utils/axios";
import { revalidatePath } from "next/cache";

export const getAllDevices = async (
  page?: string
): Promise<{ data: DeviceDataType[]; total: number }> => {
  try {
    const res = await axios.get("/api/v1/device", {
      params: { page },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);

    return {
      data: [],
      total: 0,
    };
  }
};

export const createDevice = async (data: {
  serialNumber: string;
  name: string;
  type: DeviceType;
  imageUrl: string;
  locationId: string;
  description?: string;
}): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.post(`/api/v1/device`, {
      ...data,
      status: "Active",
    });

    revalidatePath("/devices");

    return res.data;
  } catch (error) {
    console.log(error);
    return {
      status: ResponseStatus.FAIL,
      message:
        (error as CommonResponseDataType).message ??
        "Something went wrong. Please try again later.",
      data: null,
    };
  }
};

export const updateDevice = async (
  id: string,
  data: {
    serialNumber: string;
    name: string;
    type: DeviceType;
    imageUrl: string;
    locationId: string;
    description?: string;
  }
): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.patch(`/api/v1/device/${id}`, data);

    revalidatePath("/devices");

    return res.data;
  } catch (error) {
    console.log(error);
    return {
      status: ResponseStatus.FAIL,
      message:
        (error as CommonResponseDataType).message ??
        "Something went wrong. Please try again later.",
      data: null,
    };
  }
};

export const deleteDevice = async (
  id: string
): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.delete(`/api/v1/device/${id}`);

    revalidatePath("/devices");

    return res.data;
  } catch (error) {
    console.log(error);
    return {
      status: ResponseStatus.FAIL,
      message:
        (error as CommonResponseDataType).message ??
        "Something went wrong. Please try again later.",
      data: null,
    };
  }
};
