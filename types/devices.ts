export enum DeviceStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum DeviceType {
  POS = "pos",
  KIOSK = "kiosk",
  SIGNAGE = "signage",
}

export type DeviceDataType = {
  id: string;
  serialNumber: string;
  name: string;
  description: string;
  locationId: string;
  imageUrl: string;
  type: DeviceType;
  createdAt: string;
  status: DeviceStatus;
};
