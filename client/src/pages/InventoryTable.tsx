import { useState } from "react"
import Table, { Column } from "../components/Table"
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

interface InventoryColumn extends Column {
   id: 'id' | 'name' | 'count' | 'description' | 'actions'
 }

 export interface InventoryRow {
   id: number
   name: string
   count: number
   description: string | null
 }

export default function InventoryTable() {
   const [editingRow, setEditingRow] = useState<InventoryRow>() 
   const [editFormState, setEditFormState] = useState<InventoryRow>({} as InventoryRow)

   const columns: InventoryColumn[] = [
      { 
         id: 'id', 
         label: 'ID', 
         minWidth: 50,
         align: 'center',
      },
      { 
         id: 'name', 
         label: 'Name', 
         minWidth: 75,
         align: 'left',
      },
      {
        id: 'count',
        label: 'Count',
        minWidth: 50,
        align: 'center',
      },
      {
        id: 'description',
        label: 'Description',
        minWidth: 100,
        align: 'left',
      },
      {
        id: 'actions',
        label: 'Actions',
        minWidth: 100,
        align: 'center',
      },
   ]

   const rows: InventoryRow[] = [
      { id: 1, name: 'Apples', count: 35, description: 'Fuji' },
      { id: 2, name: 'Oranges', count: 42, description: 'Navel - Florida' },
      { id: 3, name: 'Bananas', count: 45, description: null },
      { id: 4, name: 'Carrots', count: 16, description: 'Regular' },
      { id: 5, name: 'Kale', count: 12, description: 'Lacinato - Organic' },
      { id: 6, name: 'Apples', count: 150, description: 'Granny Smith' },
      { id: 7, name: 'Apples', count: 44, description: 'Fuji - Organic' },
      { id: 8, name: 'Kiwis', count: 36, description: null },
      { id: 9, name: 'Carrots', count: 65, description: 'Organic' }
   ]
      
   const handleEditRow = (row: InventoryRow) => {
      setEditingRow(row)
      setEditFormState(row)
   }

   return (
      <>
         <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
         }}>
            <Table columns={columns} rows={rows} title='Inventory Table' handleEditClick={handleEditRow}/>
         </div>
         <Modal
            open={editingRow !== undefined}
            onClose={() => setEditingRow({} as InventoryRow)}
         >
            <Box sx={{
                 position: 'absolute',
                 top: '50%',
                 left: '50%',
                 transform: 'translate(-50%, -50%)',
                 width: 400,
                 bgcolor: 'background.paper',
                 boxShadow: 24,
                 padding: '16px',
                 display: 'flex',
                 flexDirection: 'column',
                 rowGap: '15px',
            }}>
               <h2 style={{ margin: '10px 5px' }}>Edit Inventory Item</h2>
               <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={editingRow?.name}
                  onChange={(e) => setEditFormState({ ...editFormState, name: e.target.value })} 
               />
               <TextField
                  id="count"
                  label="Count"
                  variant="outlined"
                  value={editingRow?.count}
                  onChange={(e) => setEditFormState({ ...editFormState, count: +e.target.value })}
               />
               <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  value={editingRow?.description}
                  onChange={(e) => setEditFormState({ ...editFormState, description: e.target.value })}
               />  
               <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button variant="outlined" sx={{ color: '#692f6b', borderColor: '#692f6b' }} onClick={() => setEditingRow(undefined)}>
                     Cancel
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#692f6b' }} onClick={() => {
                     console.log(editFormState)
                     setEditingRow(undefined)
                  }}>
                     Save
                  </Button>
               </span>
            </Box>   
         </Modal>
      </>
   )
}