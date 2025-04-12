"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteDistrict,
  editDistrict,
  getDistricts,
} from "@/redux/slices/districtSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { districtSchema } from "@/zodSchema/districtSchema";
import { ToastContainer, toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function AlterDistrict() {
  const dispatch = useAppDispatch();
  const { loading, districts } = useAppSelector((state) => state.district);
  const [open, setOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);


  useEffect(() => {
      dispatch(getDistricts());
  }, [dispatch]);

  const form = useForm({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      districtName: "",
      districtCode: "",
    },
  });

  const { reset } = form; // Destructure reset function

  const handleEdit = (district) => {
    setSelectedDistrict(district);
    reset({
      districtName: district.districtName, // Set values from selected district
      districtCode: district.districtCode,
    });
    setOpen(true);
  };

  const handleDelet = (district) => {
    const id = district._id;
    dispatch(deleteDistrict(id));
  };
  const handleDelete = (district) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = district._id;
        dispatch(deleteDistrict(id));
      }
    });
  };

  const onSubmit = async (formData) => {
    if (!selectedDistrict) return;

    const updatedDistrict = {
      ...formData,
      _id: selectedDistrict._id,
    };
        await dispatch(editDistrict(updatedDistrict)).unwrap();
    

    setOpen(false);
    dispatch(getDistricts());

  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"w-20"}>Index</TableHead>
            <TableHead>District Name</TableHead>
            <TableHead>District Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {districts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-xl py-6">
                No district found
              </TableCell>
            </TableRow>
          ) : (
            districts.map((district, index) => (
              <TableRow key={district._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{district.districtName}</TableCell>
                <TableCell>{district.districtCode}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => handleEdit(district)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => handleDelete(district)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit District</DialogTitle>
          </DialogHeader>
          {selectedDistrict && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
