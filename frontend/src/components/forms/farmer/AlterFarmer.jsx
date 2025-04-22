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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getFarmers,
  editFarmer,
  deleteFarmer,
} from "@/redux/slices/farmerSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { farmerSchema } from "@/zodSchema/farmerSchema";
import { getSupervisors, getSupervisorsName } from "@/redux/slices/supervisorSlice";

import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import FarmerTable from "@/components/tables/FarmerTable";
import { useSearch } from "@/contexts/SearchContext";
import { useDebounce } from "use-debounce";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";

export default function AlterFarmer() {
  const dispatch = useAppDispatch();
  const { farmers, totalPages, currentPage, } = useAppSelector(
    (state) => state.farmer
  );
  const { supervisors, status} = useAppSelector((state) => state.supervisor);

  const { searchQuery } = useSearch();

  const [open, setOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [supervisorOption, setSupervisorOption] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [page, setPage] = useState(1);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(getFarmers({ search: debouncedSearchQuery, page}));
  }, []);

  useEffect(() => {
    dispatch(getSupervisorsName());
  }, [dispatch]);

  useEffect(() => {
    if (supervisors.length > 0) {
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

  const { reset } = form;


  useEffect(() => {
    dispatch(getFarmers({ search: debouncedSearchQuery, page }));
  }, [dispatch, debouncedSearchQuery, page]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleEdit = (farmer) => {
    setSelectedFarmer(farmer);
    reset({
      farmerCode: farmer.farmerCode || "",
      farmerName: farmer.farmerName || "",
      supervisorName: farmer.supervisorName?._id || "",
      phone: farmer.phone || "",
      email: farmer.email || "",
      aadhaar: farmer.aadhaar || "",
      bankName: farmer.bankName || "",
      accountNumber: farmer.accountNumber || "",
      ifsc: farmer.ifsc || "",
      branch: farmer.branch || "",
      address: farmer.address || "",
      pincode: farmer.pincode || "",
    });
    setOpen(true);
  };

  const onSubmit = async (formData) => {
    if (!selectedFarmer) return;
    const updatedFarmer = {
      ...formData,
      _id: selectedFarmer._id,
      district: districtId,
    };
    await dispatch(editFarmer(updatedFarmer)).unwrap();
    setOpen(false);
    dispatch(getFarmers({ search: debouncedSearchQuery, page }));
  };

  const handleDelete = (farmer) => {
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
        const id = farmer._id;
        await dispatch(deleteFarmer(id)).unwrap();
        dispatch(getFarmers({ search: debouncedSearchQuery, page}));
      }
    });
  };

  return (
    <>
      <FarmerTable
        farmers={farmers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

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
            <DialogTitle>Edit Farmer</DialogTitle>
          </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    name="supervisorName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Supervisor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Supervisor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {supervisors.map((sup) => (
                              <SelectItem
                                key={sup?._id}
                                value={sup?._id}
                                onClick={() => {
                                  setDistrictId(sup?.districtName._id);
                                }}
                              >
                                {sup.supervisorName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {[
                    { name: "farmerCode", label: "Farmer Code" },
                    { name: "farmerName", label: "Farmer's name" },
                    { name: "phone", label: "Phone" },
                    { name: "email", label: "Email ID", type: "email" },
                    { name: "aadhaar", label: "Aadhaar Number" },
                    { name: "bankName", label: "Bank Name" },
                    { name: "accountNumber", label: "Account Number" },
                    { name: "ifsc", label: "IFSC Code" },
                    { name: "branch", label: "Branch" },
                    { name: "address", label: "Address" },
                    { name: "pincode", label: "Pincode" },
                  ].map((field) => (
                    <FormField
                      key={field.name}
                      name={field.name}
                      control={form.control}
                      render={({ field: controllerField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            <Input
                              {...controllerField}
                              placeholder={field.label}
                              type={field.type || "text"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
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
