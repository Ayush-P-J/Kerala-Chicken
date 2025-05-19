// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import { Pencil, Trash2 } from "lucide-react";
// import React from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";


// const CredentialsTable = React.memo(({ credentials, handleEdit, handleDelete }) => {
  
//   const { totalPages, currentPage, limit } = useAppSelector(
//       (state) => state.credentials
//     );
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-20">Index</TableHead>
//           <TableHead>District Name</TableHead>
//           <TableHead>District Code</TableHead>
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {credentials.length === 0 ? (
//           <TableRow>
//             <TableCell colSpan={4} className="text-center text-xl py-6">
//               No district found
//             </TableCell>
//           </TableRow>
//         ) : (
//           credentials.map((district, index) => (
//             <TableRow key={district._id || index}>
//               <TableCell>{ (currentPage - 1) * limit + index + 1} </TableCell>
//               <TableCell>{district.districtName}</TableCell>
//               <TableCell>{district.districtCode}</TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     size="sm"
//                     type="button"
//                     onClick={() => handleEdit(district)}
//                   >
//                     <Pencil />
//                   </Button>
//                   <Button
//                     size="sm"
//                     type="button"
//                     onClick={() => handleDelete(district)}
//                   >
//                     <Trash2 />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   );
// });

// export default CredentialsTable;


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

const CredentialsTable = React.memo(({ credentials, handleEdit, handleDelete, handleChangePassword }) => {
  const { totalPages, currentPage, limit } = useAppSelector(
    (state) => state.credentials
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Index</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {credentials.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-xl py-6">
              No credentials found
            </TableCell>
          </TableRow>
        ) : (
          credentials.map((credential, index) => (
            <TableRow key={credential.id || index}>
              <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
              <TableCell>{credential.username}</TableCell>
              <TableCell>{credential.email}</TableCell>
              <TableCell className="capitalize">{credential.level}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" type="button" onClick={() => handleEdit(credential)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="sm" type="button" onClick={() => handleDelete(credential)}>
                    <Trash2 size={16} />
                  </Button>
                  <Button size="sm" type="button" onClick={() => handleChangePassword(credential)}>
                    Change Password 
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

export default CredentialsTable;

