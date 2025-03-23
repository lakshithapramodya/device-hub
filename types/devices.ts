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
  serialNumber: string;
  name: string;
  description: string;
  image: string;
  type: DeviceType;
  createdAt: string;
  status: DeviceStatus;
};

export interface DeviceFormData {
  name: string;
  description: string;
  type: DeviceType;
  image: string;
}
