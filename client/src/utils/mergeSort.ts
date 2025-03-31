import { InventoryRow } from "../pages/InventoryTable"

export default function mergeSort(arr: InventoryRow[], column: keyof InventoryRow, order: 'asc' | 'desc'): InventoryRow[] {
   if (arr.length <= 1) {
      return arr
   }
  
   const middle = Math.floor(arr.length / 2)
   const left = mergeSort(arr.slice(0, middle), column, order)
   const right = mergeSort(arr.slice(middle), column, order)

   const result: InventoryRow[] = []
   let i = 0
   let j = 0

   while (i < left.length && j < right.length) {
      if (order === 'asc') {
         if ((left[i][column] ?? '') < (right[j][column] ?? '')) {
            result.push(left[i])
            i++
         } else {
            result.push(right[j])
            j++
         }
      } else {
         if ((left[i][column] ?? '') > (right[j][column] ?? '')) {
            result.push(left[i])
            i++
         } else {
            result.push(right[j])
            j++
         }
      }
   }

   return result.concat(left.slice(i)).concat(right.slice(j))
}