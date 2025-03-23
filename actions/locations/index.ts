"use server";

import { CommonResponseDataType, ResponseStatus } from "@/types/common";
import { LocationDataType } from "@/types/locations";
import axios from "@/utils/axios";
import { revalidatePath } from "next/cache";

export const getAllLocations = async (
  page?: string
): Promise<LocationDataType[]> => {
  try {
    const res = await axios.get("/api/v1/location", {
      params: { page },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const createLocation = async (
  title: string,
  address: string
): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.post(`/api/v1/location`, {
      title,
      address,
      status: "Active",
    });

    revalidatePath("/locations");

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

export const updateLocation = async (
  id: string,
  title: string,
  address: string
): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.patch(`/api/v1/location/${id}`, {
      title,
      address,
    });

    revalidatePath("/locations");

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

export const deleteLocation = async (
  id: string
): Promise<CommonResponseDataType> => {
  try {
    const res = await axios.delete(`/api/v1/location/${id}`);

    revalidatePath("/locations");

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
