import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const DistrictTable = React.memo(({ districts, handleEdit, handleDelete }) => {
  
  const { totalPages, currentPage, limit } = useAppSelector(
      (state) => state.district
    );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Index</TableHead>
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
              <TableCell>{ (currentPage - 1) * limit + index + 1} </TableCell>
              <TableCell>{district.districtName}</TableCell>
              <TableCell>{district.districtCode}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
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
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
});

export default DistrictTable;
