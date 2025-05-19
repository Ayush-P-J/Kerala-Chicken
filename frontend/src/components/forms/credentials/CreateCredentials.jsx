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

import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addDistrict } from "@/redux/slices/districtSlice"; // Replace this with your actual action
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import { credentialsSchema } from "@/zodSchema/credentialsSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getSupervisorsName } from "@/redux/slices/supervisorSlice";
import { addCredentials } from "@/redux/slices/credentialsSlice";

export const CreateCredentials = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.district); // Adjust if using different slice
  const { loading, supervisorNames } = useAppSelector(
    (state) => state.supervisor
  );
  const [supervisorOption, setSupervisorOption] = useState([]);
  const [supervisor, setSupervisor] = useState({});

  const [level, setLevel] = useState("");
  useEffect(() => {
    if (level === "supervisor") {
      console.log("level sup");
      dispatch(getSupervisorsName());
    }
    console.log("level");
    console.log(supervisorNames);
  }, [dispatch, level]);

  useEffect(() => {
    if (supervisorNames) {
      setSupervisorOption(supervisorNames);
    }
  }, [supervisorNames]);

  const form = useForm({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      username: supervisor.supervisorName || "",
      email: supervisor.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const onSubmit = async (formData) => {
    console.log(formData);
    // Dispatch your user creation action here
    await dispatch(addCredentials(formData)).unwrap(); // Replace as needed
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="level"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Level</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setLevel(value);
                  if (value !== "supervisor") {
                    setSupervisor({});
                    form.setValue("username", "");
                    form.setValue("email", "");
                  } else {
                    dispatch(getSupervisorsName());
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {level && (
          <>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    {level === "supervisor" ? (
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedSupervisor = supervisorOption.find(
                            (s) => s._id === value
                          );
                          if (selectedSupervisor) {
                            setSupervisor(selectedSupervisor);
                            form.setValue("email", selectedSupervisor.email);
                            form.setValue(
                              "username",
                              selectedSupervisor.supervisorName
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Name" />
                        </SelectTrigger>
                        <SelectContent>
                          {supervisorOption.map((supervisor) => (
                            <SelectItem
                              key={supervisor._id}
                              value={supervisor._id}
                            >
                              {supervisor.supervisorName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        {...field}
                        placeholder="Enter name"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
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
                    <Input type="email" {...field} placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="sm:col-span-2 flex gap-5 justify-end">
          <Button type="submit" className="w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
