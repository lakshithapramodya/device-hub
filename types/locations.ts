export enum LocationStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type LocationDataType = {
  serialNumber: string;
  name: string;
  address: string;
  devices: number;
  createdAt: string;
  status: LocationStatus;
};
