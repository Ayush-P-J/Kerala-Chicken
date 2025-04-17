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

const FarmerTable = React.memo(({ farmers, handleEdit, handleDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Index</TableHead>
          <TableHead>Farmer Name</TableHead>
          <TableHead>Farmer Code</TableHead>
          <TableHead>Supervisor</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {farmers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-xl py-6">
              No farmers found
            </TableCell>
          </TableRow>
        ) : (
          farmers.map((farmer, index) => (
            <TableRow key={farmer._id || index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{farmer.farmerName}</TableCell>
              <TableCell>{farmer.farmerCode}</TableCell>
              <TableCell>{farmer.supervisorName?.supervisorName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => handleEdit(farmer)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => handleDelete(farmer)}
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

export default FarmerTable;
