"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getDistricts, getDistrictsName } from "@/redux/slices/districtSlice";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supervisorSchema } from "@/zodSchema/supervisorSchema";
import { addSupervisor } from "@/redux/slices/supervisorSlice";

export const CreateSupervisor = () => {
  const dispatch = useAppDispatch();

  const {status, districts } = useAppSelector((state) => state.district);
  const [districtOptions, setDistrictOptions] = useState([]);
  const debouncedSearchQuery = ""
  const page = 1

  useEffect(() => {
  dispatch(getDistricts({ search: debouncedSearchQuery, page, limit: 5 }));
    console.log("districts");
    console.log(districts);
    
  }, [dispatch]);

  useEffect(() => {
    if (districts) {
      setDistrictOptions(districts);
      console.log(districtOptions);
    }
  }, [districts]);

  const form = useForm({
    resolver: zodResolver(supervisorSchema),
    defaultValues: {
      districtName: "",
      supervisorCode: "",
      supervisorName: "",
      phoneNumber: "",
      email: "",
      drivingLicenseNo: "",
      expiry: "",
      adharCardNo: "",
      bankName: "",
      accountNo: "",
      ifscCode: "",
      branch: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    dispatch(addSupervisor(formData));
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            name="supervisorName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supervisor Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Supervisor Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="supervisorCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supervisor Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Supervisor Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className={"w-full"}
            name="districtName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>District Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full"
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {districtOptions.map((district, index) => (
                      <SelectItem
                        key={district?._id || index}
                        value={district?._id}
                      >
                        {district.districtName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone Number" type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="drivingLicenseNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driving License No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Driving License No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="expiry"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Expiry Date" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="adharCardNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adhar Card No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Adhar Card No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bankName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bank Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="accountNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Account No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ifscCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="IFSC Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="branch"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Branch" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:col-span-2 flex gap-5 justify-end">
          <Button type="submit" className="w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSupervisor;
