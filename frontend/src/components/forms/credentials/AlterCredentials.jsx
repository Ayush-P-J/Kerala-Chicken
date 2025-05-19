"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
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
} from "@/components/ui/select"; // assuming you're using ShadCN

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  credentialsEditSchema,
  credentialsSchema,
} from "@/zodSchema/credentialsSchema";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCredentials,
  editCredentials,
  deleteCredentials,
  changePassword,
} from "@/redux/slices/credentialsSlice";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import CredentialsTable from "@/components/tables/credentials-table";
import { useSearch } from "@/contexts/SearchContext";
import { useDebounce } from "use-debounce";

export default function AlterCredentials() {
  const dispatch = useAppDispatch();
  const { status, credentials, totalPages, currentPage } = useAppSelector(
    (state) => state.credentials
  );
  const { searchQuery } = useSearch();

  const [open, setOpen] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [selectedLevel, setSelectedLevel] = useState("owner");

  const form = useForm({
    resolver: zodResolver(credentialsEditSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const changePasswordForm = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { reset } = form;

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(
      getCredentials({
        level: selectedLevel,
        search: debouncedSearchQuery,
        page,
      })
    );
  }, [dispatch, debouncedSearchQuery, page, selectedLevel]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const handleEdit = (credential) => {
    setSelectedCredential(credential);
    reset({
      username: credential.username,
      email: credential.email,
    });
    setOpen(true);
  };
  const handleChangePassword = (credential) => {
    setSelectedCredential(credential);

    setOpenChangePassword(true);
  };

  const handleDelete = (credential) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCredentials(credential._id)).unwrap();
        dispatch(getCredentials({ level: selectedLevel, search: debouncedSearchQuery, page }));
      }
    });
  };

  const onSubmit = async (formData) => {
    if (!selectedCredential) return;
    const updatedCredential = {
      ...formData,
      _id: selectedCredential._id,
    };
    console.log("submit");

    await dispatch(editCredentials(updatedCredential)).unwrap();
    setOpen(false);
    dispatch(getCredentials({level: selectedLevel, search: debouncedSearchQuery, page }));
  };
  const onChangePasswordSubmit = async (formData) => {
    if (!selectedCredential) return;
    const updatedPassword = {
      ...formData,
      _id: selectedCredential._id,
    };
    console.log("submit");

    await dispatch(changePassword(updatedPassword)).unwrap();
    setOpenChangePassword(false);
    dispatch(getCredentials({ level: selectedLevel, search: debouncedSearchQuery, page }));
  };

  return (
    <>
      {/* Level Filter Dropdown */}
      <div className="flex items-center gap-4 mb-4">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CredentialsTable
        credentials={credentials}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleChangePassword={handleChangePassword}
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

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Credential</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Username" />
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
                      <Input type="email" {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Change Password */}

      <Dialog open={openChangePassword} onOpenChange={setOpenChangePassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Credential</DialogTitle>
          </DialogHeader>

          <Form {...changePasswordForm}>
            <form
              onSubmit={changePasswordForm.handleSubmit(onChangePasswordSubmit)}
              className="space-y-6"
            >
              <FormField
                name="password"
                control={changePasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={changePasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Confirm new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
