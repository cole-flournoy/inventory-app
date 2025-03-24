
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import MuiTable from '@mui/material/Table'
import { useState } from 'react'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import { InventoryRow } from '../pages/InventoryTable'

export interface Column {
   id: string
   label: string
   minWidth?: number
   align?: 'right' | 'center' | 'left'
 }

type Row = InventoryRow

export default function Table({ columns, rows, title }: 
   { 
      columns: Column[],
      rows: Row[], 
      title: string 
   }) {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
 
   const handleChangePage = (event: unknown, newPage: number) => {
     setPage(newPage)
   }
 
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRowsPerPage(+event.target.value)
     setPage(0)
   }
 
   return (
     <Paper sx={{ width: '850px', minWidth: '550px', overflow: 'auto' }}>
       <TableContainer sx={{ maxHeight: 440 }}>
         <MuiTable stickyHeader aria-label={title}>
           <TableHead>
             <TableRow>
               {columns.map((column) => (
                 <TableCell
                   key={column.id}
                   align={column.align}
                   style={{ minWidth: column.minWidth }}
                 >
                   {column.label}
                 </TableCell>
               ))}
             </TableRow>
           </TableHead>
           <TableBody>
             {rows
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((row) => {
                 return (
                   <TableRow hover tabIndex={-1} key={row.id}>
                     {columns.map((column) => {
                       const value = row[column.id as keyof Row]
                       return (
                         <TableCell key={column.id} align={column.align}>
                           {value}
                         </TableCell>
                       )
                     })}
                   </TableRow>
                 )
               })}
           </TableBody>
         </MuiTable>
       </TableContainer>
       <TablePagination
         rowsPerPageOptions={[10, 25, 100]}
         component="div"
         count={rows.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onPageChange={handleChangePage}
         onRowsPerPageChange={handleChangeRowsPerPage}
       />
     </Paper>
   )
}