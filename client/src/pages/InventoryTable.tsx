import Table, { Column } from "../components/Table"

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
        minWidth: 125,
        align: 'left',
      },
      {
        id: 'actions',
        label: 'Actions',
        minWidth: 75,
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
      

   return (
      <div style={{ 
         display: 'flex', 
         justifyContent: 'center', 
         alignItems: 'center', 
         height: '90vh', 
         width: '90vw' }}>
         <Table columns={columns} rows={rows} title='Inventory Table' />
      </div>
   )
}