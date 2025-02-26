import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  // FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import { SelectDropdown } from '@/components/select-dropdown'
import { ParkingArea } from "@/features/parking-areas/data/schema";
import { useUpdateParkingAreaMutation, useCreateParkingAreaMutation } from '@/services/api'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: ParkingArea;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  hourlyRate: z.number().positive("Hourly rate must be positive"),
  longitude: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
});

type ParkingAreaForm = z.infer<typeof formSchema>;

export function ParkingAreasMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow;
  const [updateParkingArea] = useUpdateParkingAreaMutation()
  const [createParkingArea] = useCreateParkingAreaMutation()

  const form = useForm<ParkingAreaForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: "",
      address: "",
      city: "",
      hourlyRate: 0,
      longitude: 0,
      latitude: 0,
    },
  });

  const handleClose = () => {
    form.reset()
    onOpenChange(false)
  }

  const onSubmit = async (data: ParkingAreaForm) => {
    try {
      if (currentRow?.id && updateParkingArea) {
        await updateParkingArea({
          id: currentRow.id,
          data: { 
            id: currentRow.id,
            ...data 
          }
        }).unwrap()
      } else {
        await createParkingArea(data).unwrap()
      }

      handleClose()
      toast({
        title: isUpdate ? "Parking Area Updated" : "Parking Area Created",
        description: "Operation completed successfully"
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error. Failed to process parking area",
        description:(
          (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(error, null, 2)}</code>
            </pre>
          )
        ),
        variant: "destructive",
      })
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>{isUpdate ? "Update" : "Create"} Parking Area</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Update the parking area by providing necessary info."
              : "Add a new parking area by providing necessary info."}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id="parking-area-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter parking area name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter street address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="0.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex-1">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        min="-180"
                        max="180"
                        {...field}
                        // value={field.value || '0'}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="-180 to 180"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex-1">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        min="-90"
                        max="90"
                        {...field}
                        // value={field.value || '0'}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        placeholder="-90 to 90"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button form="parking-area-form" type="submit">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
