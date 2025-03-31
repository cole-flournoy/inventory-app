import { InventoryRow } from "../pages/InventoryTable"

export default function quickSort(arr: InventoryRow[], column: keyof InventoryRow, order: 'asc' | 'desc'): InventoryRow[] {
   if (arr.length <= 1) {
      return arr
   }

   const pivot = arr[arr.length - 1]
   const left: InventoryRow[] = []
   const right: InventoryRow[] = []

   for (let i = 0; i < arr.length - 1; i++) {
      if (order === 'asc') {
         if ((arr[i][column] ?? '') < (pivot[column] ?? '')) {
            left.push(arr[i])
         } else {
            right.push(arr[i])
         }
      } else {
         if ((arr[i][column] ?? '') > (pivot[column] ?? '')) {
            left.push(arr[i])
         } else {
            right.push(arr[i])
         }
      }
   }

   return [...quickSort(left, column, order), pivot, ...quickSort(right, column, order)]
}