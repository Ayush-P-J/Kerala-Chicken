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

import { farmerSchema } from "@/zodSchema/farmerSchema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFarmer } from "@/redux/slices/farmerSlice";
import { getSupervisors, getSupervisorsName } from "@/redux/slices/supervisorSlice";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CreateFarmer = () => {
  const dispatch = useAppDispatch();
  const { loading, supervisors } = useAppSelector((state) => state.supervisor);
  const [supervisorOption, setSupervisorOption] = useState([]);
  const [districtId, setDistrictId] = useState();

  useEffect(() => {
    dispatch(getSupervisorsName());
  }, [dispatch]);

  useEffect(() => {
    if (supervisors) {
      setSupervisorOption(supervisors);
      console.log(supervisorOption);
      console.log(supervisors);
    }
  }, [supervisors]);

  const form = useForm({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      farmerCode: "",
      farmerName: "",
      supervisorName: "",
      phone: "",
      email: "",
      aadhaar: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
      address: "",
      pincode: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = { ...data, district: districtId };
    console.log(formData);
    dispatch(addFarmer(formData));
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            name="farmerCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farmer Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Farmer Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="farmerName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farmer's name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Farmer's name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className={"w-full"}
            name="supervisorName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Supervisor</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value); // Update the form value
                    // Find the selected supervisor and set districtId
                    const selectedSupervisor = supervisorOption.find(
                      (s) => s._id === value
                    );
                    if (selectedSupervisor) {
                      setDistrictId(selectedSupervisor.districtName._id);
                    }
                  }}
                  defaultValue={field.value}
                  className="w-full"
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {supervisorOption.map((supervisor, index) => (
                      <SelectItem
                        key={supervisor?._id || index}
                        value={supervisor?._id}
                      >
                        {supervisor?.supervisorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone Number" />
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
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email ID" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="aadhaar"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aadhaar Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Aadhaar Number" />
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
            name="accountNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Account Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ifsc"
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
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pincode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Pincode" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:col-span-2 flex gap-5 justify-end">
          <Button type="submit" className={"w-full"}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
