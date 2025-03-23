"use server";

import { DashboardDatatype } from "@/types/dashboard";
import axios from "@/utils/axios";

export const getDashboardStats = async (): Promise<DashboardDatatype> => {
  try {
    const res = await axios.get("/api/v1/dashboard");

    return res.data.data;
  } catch (error) {
    console.log(error);

    return {
      totalLocations: 0,
      devicePerLocation: 0,
      totalDevices: 0,
      inactiveDevices: 0,
      chartData: Array.from({ length: 12 }).map(() => {
        return {
          devices: 0,
          locations: 0,
        };
      }),
    };
  }
};
