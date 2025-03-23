import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DeviceDataType, DeviceType } from "@/types/devices";
import { Loader2 } from "lucide-react";
import { createDevice, updateDevice } from "@/actions/devices";
import { ResponseStatus } from "@/types/common";
import { useSuccessModal } from "@/hooks/useSuccessModal";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LocationDataType } from "@/types/locations";
import { getAllDevicesForSelect } from "@/actions/locations";

const formSchema = z.object({
  serialNumber: z.string().min(1, "Serial Number is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.nativeEnum(DeviceType),
  imageUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  locationId: z.string().min(1, "Location is required"),
});

interface AddEditDeviceProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: DeviceDataType | null;
}

const AddEditDevice: React.FC<AddEditDeviceProps> = ({
  open,
  setOpen,
  data,
}) => {
  const [locations, setLocations] = useState<LocationDataType[]>([]);

  const [loadingLocations, setLoadingLocations] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: data?.serialNumber ?? "",
      name: data?.name ?? "",
      description: data?.description ?? undefined,
      type: data?.type ?? undefined,
      imageUrl: data?.imageUrl ?? "",
      locationId: data?.locationId ?? undefined,
    },
  });

  // Success modal hook
  const { setSuccessData, setOpenSuccessModal } = useSuccessModal();

  // Submit device update and create
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let res;

    if (data) {
      res = await updateDevice(data.id, values);
    } else {
      res = await createDevice(values);
    }

    if (res.status === ResponseStatus.SUCCESS) {
      setSuccessData({
        title: "Location Created Successfully",
        backButtonText: "Continue",
        function: () => {},
      });
      setOpenSuccessModal(true);
      setOpen(false);
      form.reset({
        serialNumber: "",
        name: "",
        description: undefined,
        imageUrl: "",
        type: undefined,
        locationId: undefined,
      });
    } else {
      toast.error(res.message);
    }
  };

  const action: () => void = form.handleSubmit(onSubmit);

  //Handle close
  const handleClose = () => {
    if (form.formState.isSubmitting) return;

    setOpen(false);
    form.reset({
      serialNumber: "",
      name: "",
      description: undefined,
      imageUrl: "",
      type: undefined,
      locationId: undefined,
    });
  };

  //Fetch locations
  useEffect(() => {
    if (!open) return;

    setLoadingLocations(true);

    getAllDevicesForSelect()
      .then((res) => setLocations(res))
      .catch(() => toast.error("Failed to load locations. Please try again"))
      .finally(() => setLoadingLocations(false));
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[400px] 2xl:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Add"} Device</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={action} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Serial Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter device name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter device description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize w-full">
                            <SelectValue placeholder="Select Location">
                              {field.value
                                ? locations.find((l) => l.id === field.value)
                                    ?.title
                                : "Select Location"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {loadingLocations ? (
                            <SelectItem
                              disabled
                              value="loading"
                              className="w-full flex items-center justify-center"
                            >
                              <Loader2 className="size-4 text-gray-500" />
                            </SelectItem>
                          ) : (
                            locations.map((location) => (
                              <SelectItem
                                key={location.id}
                                value={location.id}
                                className="capitalize"
                              >
                                {location.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="capitalize w-full">
                            <SelectValue placeholder="Select device type">
                              {field.value ? field.value : "Select device type"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(DeviceType).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 sm:max-w-[150px] gap-2.5 ml-auto">
              <Button
                variant="outline"
                type="button"
                onClick={handleClose}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="size-4 text-white animate-spin" />
                ) : data ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditDevice;
