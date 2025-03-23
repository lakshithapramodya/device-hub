import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeviceDataType } from "@/types/devices";
import Image from "next/image";

interface ViewDeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device: DeviceDataType | null;
}

export function ViewDeviceDialog({
  open,
  onOpenChange,
  device,
}: ViewDeviceDialogProps) {
  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Device Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Serial Number</h3>
            <p>{device.serialNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Name</h3>
            <p>{device.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{device.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Type</h3>
            <p>{device.type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{device.status}</p>
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            <p>{new Date(device.createdAt).toLocaleString()}</p>
          </div>
          {device.image && (
            <div>
              <h3 className="font-semibold">Image</h3>
              <Image
                src={device.image}
                alt={device.name}
                className="max-w-full h-auto mt-2"
                width={500}
                height={500}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
