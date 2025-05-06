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
import { useEffect, useRef, useState } from "react";
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
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useDebounce } from "use-debounce"; // Corrected import
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import DistrictTable from "@/components/tables/district-table";
import { useSearch } from "@/contexts/SearchContext";


export default function AlterDistrict() {
  const dispatch = useAppDispatch();
  const { status, districts, totalPages, currentPage } = useAppSelector(
    (state) => state.district
  );

  const { searchQuery } = useSearch();

  const [open, setOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [page, setPage] = useState(currentPage);

  const form = useForm({
    resolver: zodResolver(districtSchema),
    defaultValues: {
      districtName: "",
      districtCode: "",
    },
  });

  const { reset } = form;



  // Debounced search
const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

useEffect(() => {
  dispatch(getDistricts({ search: debouncedSearchQuery, page }));
}, [dispatch]);

useEffect(() => {
  dispatch(getDistricts({ search: debouncedSearchQuery, page }));
}, [dispatch, debouncedSearchQuery, page]);




  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleEdit = (district) => {
    setSelectedDistrict(district);
    reset({
      districtName: district.districtName,
      districtCode: district.districtCode,
    });
    setOpen(true);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const id = district._id;
        await dispatch(deleteDistrict(id)).unwrap();
        dispatch(getDistricts({ search: debouncedSearchQuery, page }));
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
    dispatch(getDistricts({ search: debouncedSearchQuery, page }));
  };

  return (
    <>
      <DistrictTable
        districts={districts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit District</DialogTitle>
          </DialogHeader>

          <Form {...form}>
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

              <div className="flex justify-end gap-4">
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
