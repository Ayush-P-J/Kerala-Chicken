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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editDistrict, getDistricts, getDistrictsName } from "@/redux/slices/districtSlice";
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
import {
  deleteSupervisor,
  editSupervisor,
  getSupervisors,
} from "@/redux/slices/supervisorSlice";
import { supervisorSchema } from "@/zodSchema/supervisorSchema";
import { getFarmers } from "@/redux/slices/farmerSlice";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import SupervisorTable from "@/components/tables/SupervisorTable";
import { useSearch } from "@/contexts/SearchContext";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
export default function AlterSupervisor() {
  const dispatch = useAppDispatch();
  const { status, supervisors, totalPages, currentPage } = useAppSelector(
    (state) => state.supervisor
  );
  const { districts } = useAppSelector((state) => state.district);
  const { searchQuery } = useSearch();

  const [open, setOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [page, setPage] = useState(1);
  
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [districtOptions, setDistrictOptions] = useState([]);
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

  useEffect(() => {
      setDistrictOptions(districts);
      // console.log(districtOptions);
      // console.log(districts);
  }, [districts]);

    useEffect(() => {
      dispatch(getDistricts());
    }, []);

  useEffect(() => {
    console.log("supervisors");
    dispatch(getSupervisors({ search: debouncedSearchQuery, page, limit: 5 }));
  }, [dispatch]);

  

  const { reset } = form; // Destructure reset function


  useEffect(() => {
    dispatch(getSupervisors({ search: debouncedSearchQuery, page, limit: 5 }));
  }, [dispatch, debouncedSearchQuery, page]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleEdit = (supervisor) => {
    setSelectedSupervisor(supervisor);
    reset({
      districtName: supervisor.districtName._id || "",
      supervisorCode: supervisor.supervisorCode || "",
      supervisorName: supervisor.supervisorName || "",
      phoneNumber: supervisor.phoneNumber || "",
      email: supervisor.email || "",
      drivingLicenseNo: supervisor.drivingLicenseNo || "",
      expiry: supervisor.expiry || "",
      adharCardNo: supervisor.adharCardNo || "",
      bankName: supervisor.bankName || "",
      accountNo: supervisor.accountNo || "",
      ifscCode: supervisor.ifscCode || "",
      branch: supervisor.branch || "",
    });

    setOpen(true);
  };

  const handleDelete = (supervisor) => {
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
        const id = supervisor._id;
        await dispatch(deleteSupervisor(id)).unwrap();
        dispatch(
          getSupervisors({ search: debouncedSearchQuery, page, limit: 5 })
        );
      }
    });
  };

  const onSubmit = async (formData) => {
    if (!selectedSupervisor) return;

    const updatedSupervisor = {
      ...formData,
      _id: selectedSupervisor._id,
    };
    await dispatch(editSupervisor(updatedSupervisor)).unwrap();

    setOpen(false);

    dispatch(getSupervisors({ search: debouncedSearchQuery, page, limit: 5 }));
  };

  return (
    <>
      <SupervisorTable
        supervisors={supervisors}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit District</DialogTitle>
          </DialogHeader>
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
                        <Input
                          {...field}
                          placeholder="Phone Number"
                          type="tel"
                        />
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
                        <Input
                          {...field}
                          placeholder="Expiry Date"
                          type="date"
                        />
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
        </DialogContent>
      </Dialog>
    </>
  );
}
