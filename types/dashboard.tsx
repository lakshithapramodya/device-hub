export type DashboardDatatype = {
  totalLocations: number;
  totalDevices: number;
  devicePerLocation: number;
  inactiveDevices: number;
  chartData: {
    devices: number;
    locations: number;
  }[];
};
