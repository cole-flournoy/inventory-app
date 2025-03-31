import { InventoryRow } from "../pages/InventoryTable"

export default function bubbleSort(arr: InventoryRow[], column: keyof InventoryRow, order: 'asc' | 'desc'): InventoryRow[] {
   for (let i = arr.length; i >= 0; i--) {
      for (let j = 0; j < i - 1; j++) {
         if (order === 'asc') {
            if ((arr[j][column] ?? '') > (arr[j + 1][column] ?? '')) {
               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
         } else {
            if ((arr[j][column] ?? '') < (arr[j + 1][column] ?? '')) {
               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
         }
      }
   }

   return arr
}