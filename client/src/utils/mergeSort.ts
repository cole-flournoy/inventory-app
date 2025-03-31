import { InventoryRow } from "../pages/InventoryTable"

export default function mergeSort(arr: InventoryRow[], column: keyof InventoryRow, /*order: string*/): InventoryRow[] {
   if (arr.length <= 1) {
      return arr
   }
  
   const middle = Math.floor(arr.length / 2)
   const left = mergeSort(arr.slice(0, middle), column)
   const right = mergeSort(arr.slice(middle), column)

   const result: InventoryRow[] = []
   let i = 0
   let j = 0

   while (i < left.length && j < right.length) {
   if ((left[i][column] ?? '') < (right[j][column] ?? '')) {
      result.push(left[i])
      i++
   } else {
      result.push(right[j])
      j++
   }
   }

   return result.concat(left.slice(i)).concat(right.slice(j))
}