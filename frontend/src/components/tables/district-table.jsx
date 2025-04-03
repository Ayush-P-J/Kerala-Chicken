'use client'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'

const DistrictTable = () => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
            </TableRow>
        </TableHeader>
    </Table>
      
  )
}

export default DistrictTable
