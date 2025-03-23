"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { DeviceDataType } from "@/types/devices";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Info, Laptop, QrCode, Type } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ViewDeviceDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  device: DeviceDataType;
}

export function ViewDeviceDialog({
  open,
  setOpen,
  device,
}: ViewDeviceDialogProps) {
  if (!device) return null;

  // Function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-700 hover:bg-green-500/20";
      case "inactive":
        return "bg-gray-500/20 text-gray-700 hover:bg-gray-500/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Device Details
          </DialogTitle>
        </DialogHeader>

        {device.imageUrl && (
          <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-md mb-4">
            <Image
              src={device.imageUrl || "/placeholder.svg"}
              alt={device.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{device.name}</h2>
            <Badge className={getStatusColor(device.status)}>
              {device.status}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <QrCode className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Serial Number
                </h3>
                <p className="font-mono">{device.serialNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Type className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Type
                </h3>
                <p>{device.type}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Created At
                </h3>
                <p>{new Date(device.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Laptop className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Status
                </h3>
                <p>{device.status}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">
                Description
              </h3>
              <p className="text-sm">{device.description}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
