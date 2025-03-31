
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
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import SortIcon from '@mui/icons-material/Sort'
import Tooltip from '@mui/material/Tooltip'
import Popper from '@mui/material/Popper'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'
import mergeSort from '../utils/mergeSort'
import bubbleSort from '../utils/bubbleSort'
import quickSort from '../utils/quickSort'
export interface Column {
   id: string
   label: string
   minWidth?: number
   align?: 'right' | 'center' | 'left'
 }

type Row = InventoryRow

export default function Table({ columns, rows, title, handleEditClick }: 
   { 
      columns: Column[],
      rows: Row[], 
      title: string,
      handleEditClick: (row: Row) => void 
   }) {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState<number>(10)
   const [hoveredRowID, setHoveredRowID] = useState<number | null>(null)
   const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null)
   const [sortOptions, setSortOptions] = useState<any>({ sortColumn: columns[0].id, sortOrder: 'asc', algorithm: 'merge' })

   const algorithmOptions = ['bubble', 'merge', 'quick']
   const sortPopperOpen = Boolean(sortAnchorEl);
 
   console.log('pre-sort', rows)
   // rows = mergeSort(rows, 'count', 'desc')
   // rows = bubbleSort(rows, 'description', 'asc')
   rows = quickSort(rows, 'name', 'desc')
   console.log('post-sort', rows)

   const handleChangePage = (event: unknown, newPage: number) => {
     setPage(newPage)
   }
 
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRowsPerPage(+event.target.value)
     setPage(0)
   }

   return (
     <>
      <Paper sx={{ width: '90%', minWidth: '550px', marginY: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h2 style={{ padding: '0 16px' }}>{title}</h2>
         <div style={{ padding: '0 16px' }}>
            <Tooltip title='Sorting options'>
               <IconButton onClick={(e) => setSortAnchorEl(sortAnchorEl ? null : e.currentTarget)}>
                  <SortIcon />
               </IconButton>
            </Tooltip>
         </div>
      </Paper>
      
      <Popper open={sortPopperOpen} anchorEl={sortAnchorEl} placement='bottom' style={{ zIndex: 100 }}>
         <Paper sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
               <FormControl fullWidth sx={{ }}>
                  <InputLabel id="sort-by-label">Sort Column</InputLabel>
                  <Select
                     labelId="sort-by-label"
                     id="sort-by"
                     value={sortOptions.sortColumn}
                     label="Sort Column"
                     onChange={(e: SelectChangeEvent) => setSortOptions({ ...sortOptions, sortColumn: e.target.value })}
                  >
                     {columns.map((column) => (
                        <MenuItem key={column.id} value={column.id}>{column.label}</MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <FormControl fullWidth sx={{ }}>
                  <InputLabel id="sort-algo-label">Algorithm</InputLabel>
                  <Select
                     labelId="sort-algo-label"
                     id="sort-algo"
                     value={sortOptions.algorithm}
                     label="Algorithm"
                     onChange={(e: SelectChangeEvent) => setSortOptions({ ...sortOptions, algorithm: e.target.value })}
                  >
                     {algorithmOptions.map((algo) => (
                        <MenuItem key={algo} value={algo}>{algo}</MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <ToggleButtonGroup
                  color="primary"
                  value={sortOptions.sortOrder}
                  exclusive
                  onChange={(e: React.MouseEvent<HTMLElement>, value: string) => setSortOptions({ ...sortOptions, sortOrder: value })}
                  aria-label="sort order"
               >
                  <ToggleButton value="asc">Asc</ToggleButton>
                  <ToggleButton value="desc">Desc</ToggleButton>
               </ToggleButtonGroup>
               <Button variant='contained'>Sort</Button>
            </div>
         </Paper>
      </Popper>

      <Paper sx={{ width: '90%', minWidth: '550px', overflow: 'hidden' }}>
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
                     <TableRow hover tabIndex={-1} key={row.id} onMouseEnter={() => setHoveredRowID(row.id)} onMouseLeave={() => setHoveredRowID(null)}>
                        {columns.map((column) => {
                           if (column.id === 'actions') {
                              return (
                                 <TableCell key={column.id} align={column.align} sx={{ padding: '0px 16px' }}>
                                    <span style={{ 
                                       display: hoveredRowID === row.id ? 'block' : 'none'
                                    }}>
                                       <IconButton aria-label='edit' size='small' onClick={() => handleEditClick(row)}>
                                          <EditIcon fontSize='small' />
                                       </IconButton>
                                       <IconButton aria-label='delete' size='small'>
                                          <DeleteForeverIcon fontSize='small' />
                                       </IconButton>
                                    </span>
                                 </TableCell>
                              )
                           } else {
                              return (
                                 <TableCell key={column.id} align={column.align}>
                                    {row[column.id as keyof Row]}
                                 </TableCell>
                              )
                           }
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
     </>
   )
}