import { DeviceDataType } from "./devices";

export enum LocationStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type LocationDataType = {
  id: string;
  title: string;
  address: string;
  devices: number;
  createdAt: string;
  Device?: DeviceDataType[];
  status: LocationStatus;
};
