"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Calendar, MapPin, Server } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LocationDataType } from "@/types/locations";

interface ViewLocationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  location: LocationDataType;
}

export function ViewLocationDialog({
  open,
  setOpen,
  location,
}: ViewLocationDialogProps) {
  if (!location) return null;

  // Function to determine status badge color
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
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Location Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{location.title}</h2>
            <Badge className={getStatusColor(location.status)}>
              {location.status}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Address
                </h3>
                <p>{location.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Server className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Devices
                </h3>
                <p>{location.devices}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Created At
                </h3>
                <p>{new Date(location.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Status
                </h3>
                <p>{location.status}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Devices at this Location</h3>
            {location.Device && location.Device.length > 0 ? (
              <ScrollArea className="h-[300px] rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Serial Number
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Type
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Created At
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {location.Device.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{device.name}</span>
                            <span className="md:hidden text-xs text-muted-foreground font-mono">
                              {device.serialNumber}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">
                          {device.serialNumber}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {device.type}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(device.status)}>
                            {device.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-xs">
                          {new Date(device.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No devices found at this location
              </div>
            )}
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
