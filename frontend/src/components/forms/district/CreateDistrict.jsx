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

import { districtSchema } from "@/zodSchema/districtSchema";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addDistrict } from "@/redux/slices/districtSlice";

export const CreateDistrict = () => {

  const dispatch = useAppDispatch()

  const {loading} = useAppSelector((state) => state.district.loading);


  const form = useForm({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      districtName: "",
      districtCode: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    dispatch(addDistrict(formData))
    form.reset();
  };

  return (
    <Form {...form}>
      {/* <ToastContainer /> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="districtName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>District Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="District Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="districtCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>District Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="District Code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:col-span-2 flex gap-5 justify-end">
          <Button type="submit" className={"w-full"}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
