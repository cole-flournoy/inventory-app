import { useEffect, useState } from "react"
import Table, { Column } from "../components/Table"
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

 export interface InventoryRow {
   SKU: string
   name: string
   companyId: string
   count: number
   description: string | null
 }

export default function InventoryTable() {
   const [editingRow, setEditingRow] = useState<InventoryRow>() 
   const [modalFormState, setModalFormState] = useState<InventoryRow>({} as InventoryRow)
   const [rows, setRows] = useState<InventoryRow[]>([])
   const [addingInventory, setAddingInventory] = useState(false)
   const [loggedInUser, setLoggedInUser] = useState<any>({})

   const navigate = useNavigate()
   const [cookies, removeCookie] = useCookies(['token'])
   

   const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login')
      }
      
      try {
         const { data } = await axios.post(
           'http://localhost:8080/api/verify',
           {},
           { withCredentials: true }
         )
         
         const { user } = data
         setLoggedInUser(user)
      } catch {
         toast.error('Session expired. Please login again.', {
            duration: 5000,
         })
         removeCookie('token', '')
         navigate('/login')
      }
   }

   useEffect(() => {
      verifyCookie()
   }, [cookies, navigate, removeCookie])

   const fetchInventoryData = async () => {
      try {
         const { data } = await axios.get(
            'http://localhost:8080/api/inventory',
            { withCredentials: true }
         )
         setRows(data.map((item: any) => ({
            SKU: item.SKU,
            name: item.name,
            companyId: item.companyId,
            count: item.count,
            description: item.description,
         })))
      } catch (error) {
         toast.error('Error fetching inventory data')
      }
   }

   useEffect(() => {
      fetchInventoryData()
   }, [])
   
   const handleLogout = () => {
      removeCookie('token', '')
      navigate('/login')
   }

   const columns: Column[] = [
      { 
         id: 'SKU', 
         label: 'SKU', 
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
   ]
    
   const handleEditInventory = (row: InventoryRow) => {
      setEditingRow(row)
      setModalFormState(row)
   }

   const handleAddInventory = () => {
      setAddingInventory(true)
   }

   const handleSubmitModal = async () => {
      if (!modalFormState.SKU || !modalFormState.name || !modalFormState.count) {
         toast.error('SKU, name, and count are required')
         return
      }

      modalFormState.companyId = loggedInUser.companyId

      if (addingInventory){
         try {
            const response = await axios.post(
               'http://localhost:8080/api/inventory',
               modalFormState,
               { withCredentials: true }
            )
   
            if (response.status === 201 || response.status === 200) {
               toast.success('New inventory item added')
               fetchInventoryData()
            } else {
               toast.error('Error adding inventory item')
            }
         } catch (error) {
            toast.error('Error adding inventory item')
         } 
      } else {
         try {
            const response = await axios.put(
               'http://localhost:8080/api/inventory',
               {
                  currentSKU: editingRow?.SKU,
                  updatedItem: modalFormState,
               },
               { withCredentials: true }
            )
   
            if (response.status === 201 || response.status === 200) {
               toast.success('Inventory item updated')
               fetchInventoryData()
            } else {
               toast.error('Error updating inventory item')
            }
         } catch (error) {
            toast.error('Error updating inventory item')
         }
      }
      setEditingRow(undefined)
      setAddingInventory(false)
   }

   const handleDeleteInventory = async (row: InventoryRow) => {
      if (!window.confirm('Are you sure you want to delete this inventory item?')) {
         return
      }
      
      try {
         const response = await axios.delete(
            'http://localhost:8080/api/inventory',
            { 
               data: { itemSKU: row.SKU },
               withCredentials: true 
            }
         )

         if (response.status === 200) {
            toast.success('Inventory item deleted')
            fetchInventoryData()
         } else {
            toast.error('Error deleting inventory item')
         }
      } catch (error) {
         toast.error('Error deleting inventory item')
      }
   }

   return (
      <>
         <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
         }}>
            <Table columns={columns} rows={rows} title='Inventory Table' handleEditClick={handleEditInventory} handleRemoveClick={loggedInUser?.role === 'ADMIN' ? handleDeleteInventory : undefined} />
         </div>
         <Modal
            open={!!editingRow || addingInventory}
            onClose={() => {
               setEditingRow(undefined)
               setAddingInventory(false)
            }}
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
               <h2 style={{ margin: '10px 5px' }}>{(addingInventory ? 'Add' : 'Edit') + ' Inventory Item'}</h2>
               <TextField
                  id="SKU"
                  label="SKU"
                  variant="outlined"
                  value={editingRow?.SKU}
                  onChange={(e) => setModalFormState({ ...modalFormState, SKU: e.target.value })} 
               />
               <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={editingRow?.name}
                  onChange={(e) => setModalFormState({ ...modalFormState, name: e.target.value })} 
               />
               <TextField
                  id="count"
                  label="Count"
                  variant="outlined"
                  value={editingRow?.count}
                  onChange={(e) => setModalFormState({ ...modalFormState, count: +e.target.value })}
               />
               <TextField
                  id="description"
                  label="Description"
                  variant="outlined"
                  value={editingRow?.description}
                  onChange={(e) => setModalFormState({ ...modalFormState, description: e.target.value })}
               />  
               <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <Button 
                     variant="outlined" 
                     sx={{ color: '#692f6b', borderColor: '#692f6b' }} 
                     onClick={() => () => {
                        setEditingRow(undefined)
                        setAddingInventory(false)
                     }}
                  >
                     Cancel
                  </Button>
                  <Button 
                     variant="contained" 
                     sx={{ backgroundColor: '#692f6b' }} 
                     onClick={() => handleSubmitModal()}
                  >
                     Save
                  </Button>
               </span>
            </Box>   
         </Modal>
         {loggedInUser?.role === 'ADMIN' && <Fab 
            sx={{ 
               backgroundColor: '#692f6b', 
               color: '#fff', 
               position: 'fixed', 
               bottom: 20, 
               right: 20, 
               ':hover': { backgroundColor: '#875989' } 
            }} 
            onClick={handleAddInventory}
         >
            <AddIcon />
         </Fab>}
      </>
   )
}