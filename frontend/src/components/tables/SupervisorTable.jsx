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
import { useAppSelector } from "@/redux/hooks";

const SupervisorTable = React.memo(
  ({ supervisors, handleEdit, handleDelete }) => {
    const {  currentPage, limit } = useAppSelector(
            (state) => state.supervisor
          );
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={"w-20"}>Index</TableHead>
            <TableHead>Supervisor Name</TableHead>
            <TableHead>Supervisor Code</TableHead>
            <TableHead>District Code</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supervisors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-xl py-6">
                No supervisor found
              </TableCell>
            </TableRow>
          ) : (
            supervisors.map((supervisor, index) => (
              <TableRow key={supervisor._id || index}>
                <TableCell>{ (currentPage - 1) * limit + index + 1}</TableCell>
                <TableCell>{supervisor.supervisorName}</TableCell>
                <TableCell>{supervisor.supervisorCode}</TableCell>
                <TableCell>{supervisor.districtName?.districtName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => handleEdit(supervisor)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => handleDelete(supervisor)}
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
  }
);

export default SupervisorTable;
