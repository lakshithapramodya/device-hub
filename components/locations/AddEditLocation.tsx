import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { LocationDataType } from "@/types/locations";
import { createLocation, updateLocation } from "@/actions/locations";
import { ResponseStatus } from "@/types/common";
import { useSuccessModal } from "@/hooks/useSuccessModal";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: LocationDataType | null;
}

const AddEditLocation: React.FC<Props> = ({ open, setOpen, data }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      address: data?.address ?? "",
    },
  });

  const { setSuccessData, setOpenSuccessModal } = useSuccessModal();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let res;

    if (data) {
      res = await updateLocation(data.id, values.title, values.address);
    } else {
      res = await createLocation(values.title, values.address);
    }

    if (res.status === ResponseStatus.SUCCESS) {
      setSuccessData({
        title: "Location Created Successfully",
        backButtonText: "Continue",
        function: () => {},
      });
      setOpenSuccessModal(true);
      setOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  const action: () => void = form.handleSubmit(onSubmit);

  const handleClose = () => {
    if (form.formState.isSubmitting) return;

    setOpen(false);
    form.reset({
      title: "",
      address: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[400px] 2xl:max-w-[600px]">
        <DialogTitle>{data ? "Update" : "Add"} Location</DialogTitle>
        <Form {...form}>
          <form action={action} className="space-y-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter location address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 sm:max-w-[150px] gap-2.5 ml-auto">
              <Button
                onClick={handleClose}
                variant="outline"
                type="button"
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

export default AddEditLocation;
