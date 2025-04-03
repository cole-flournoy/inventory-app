
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
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
export interface Column {
   id: string
   label: string
   minWidth?: number
   align?: 'right' | 'center' | 'left'
}
type Row = InventoryRow
interface SortOptions {
   sortColumn: keyof Row
   algorithm: 'bubble' | 'merge' | 'quick'
   sortOrder: 'asc' | 'desc'
}

const sortRows = (rows: Row[], sortOptions: SortOptions) => {
   switch (sortOptions.algorithm) {
      case 'bubble':
         rows = bubbleSort(rows, sortOptions.sortColumn, sortOptions.sortOrder)
         break
      case 'merge':
         rows = mergeSort(rows, sortOptions.sortColumn, sortOptions.sortOrder)
         break
      case 'quick':
         rows = quickSort(rows, sortOptions.sortColumn, sortOptions.sortOrder)
         break
      default:
         break
   }
   return rows
}

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
   const [sortOptions, setSortOptions] = useState<SortOptions>({sortColumn: columns[0].id as keyof Row, algorithm: 'merge', sortOrder: 'asc'})
   const [sortedRows, setSortedRows] = useState<Row[]>(sortRows(rows, sortOptions))
   const [searchInput, setSearchInput] = useState<string>('')

   const algorithmOptions = [
      {id: 'bubble', display: 'Bubble sort'}, 
      {id: 'merge', display: 'Merge sort'}, 
      {id: 'quick', display: 'Quick sort'}
   ]
   const sortPopperOpen = Boolean(sortAnchorEl);

   const handleChangePage = (event: unknown, newPage: number) => {
     setPage(newPage)
   }
 
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setRowsPerPage(+event.target.value)
     setPage(0)
   }

   const getDisplayRows = () => {
      if (searchInput === '') {
         return sortedRows
      } else {
         return sortedRows.filter((row) => {
            return Object.values(row).some((value) => {
               if (typeof value === 'string') {
                  return value.toLowerCase().includes(searchInput.toLowerCase())
               } else if (typeof value === 'number') {
                  return value.toString().includes(searchInput)
               }
               return false
            })
         })
      }
   }

   return (
     <>
      <Paper sx={{ width: '90%', minWidth: '550px', marginY: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h2 style={{ padding: '0 16px' }}>{title}</h2>
         <div style={{ padding: '0 16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(105, 47, 107, .2)', borderRadius: '20px', padding: '5px 20px 5px 10px' }}>
               <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
               <TextField 
                  id='search' 
                  placeholder='Search' 
                  variant='standard' 
                  value={searchInput} 
                  onChange={(e) => {
                     setSearchInput(e.target.value)
                  }} 
                  sx={{ marginTop: 0 }}/>
            </Box>
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
                     onChange={(e: SelectChangeEvent) => setSortOptions({ ...sortOptions, sortColumn: e.target.value as SortOptions['sortColumn'] })}
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
                     onChange={(e: SelectChangeEvent) => setSortOptions({ ...sortOptions, algorithm: e.target.value as SortOptions['algorithm'] })}
                  >
                     {algorithmOptions.map((algo) => (
                        <MenuItem key={algo.id} value={algo.id}>{algo.display}</MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <ToggleButtonGroup
                  color="primary"
                  value={sortOptions.sortOrder}
                  exclusive
                  onChange={(e: React.MouseEvent<HTMLElement>, value: string) => setSortOptions({ ...sortOptions, sortOrder: value as SortOptions['sortOrder'] })}
                  aria-label="sort order"
               >
                  <ToggleButton value="asc">Asc</ToggleButton>
                  <ToggleButton value="desc">Desc</ToggleButton>
               </ToggleButtonGroup>
               <Button 
                  variant='contained' 
                  onClick={() => {
                     setSortedRows((prevRows) => sortRows(prevRows, sortOptions))
                     setSortAnchorEl(null)
                  }}
                  >Sort</Button>
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
                  <TableCell key='actions' align='center' style={{ minWidth: 100 }}></TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {getDisplayRows()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                  return (
                     <TableRow hover tabIndex={-1} key={row.id} onMouseEnter={() => setHoveredRowID(row.id)} onMouseLeave={() => setHoveredRowID(null)}>
                        {columns.map((column) => {
                           return (
                              <TableCell key={column.id} align={column.align}>
                                 {row[column.id as keyof Row]}
                              </TableCell>
                           )
                        })}
                        <TableCell key='actions' align='center' sx={{ padding: '0px 16px' }}>
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