import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "../components/ui/table";

const transactions = [
  { customer_id: "R001", product_count: 4, location: "Delhi", payment_method: "Cash", product_category: "Fruits", date: "01 Sep 2024", total_price: "₹7,500" },
  { customer_id: "R002", product_count: 2, location: "Mumbai", payment_method: "UPI", product_category: "Veggies", date: "02 Sep 2024", total_price: "₹4,299" },
  { customer_id: "R003", product_count: 5, location: "Bangalore", payment_method: "Card", product_category: "Exotic", date: "03 Sep 2024", total_price: "₹9,999" },
  { customer_id: "R004", product_count: 3, location: "Hyderabad", payment_method: "Wallet", product_category: "Organic", date: "04 Sep 2024", total_price: "₹3,750" },
  { customer_id: "R005", product_count: 1, location: "Kolkata", payment_method: "Cash", product_category: "Fruits", date: "05 Sep 2024", total_price: "₹1,999" }
];

export function TransactionTable() {
  const totalItems = transactions.reduce((sum, txn) => sum + txn.product_count, 0);
  const totalPrice = transactions.reduce((sum, txn) => sum + parseInt(txn.total_price.replace('₹','').replace(',','')), 0);

  return (
    <Table className="w-full shadow-lg bg-white">
      <TableCaption className="text-center text-gray-500 text-sm py-2 ">
        Recent customer transactions.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px] px-6 py-3">Customer ID</TableHead>
          <TableHead className="px-6 py-3">Product Count</TableHead>
          <TableHead className="px-6 py-3">Location</TableHead>
          <TableHead className="px-6 py-3">Payment Method</TableHead>
          <TableHead className="px-6 py-3">Product Category</TableHead>
          <TableHead className="px-6 py-3">Date</TableHead>
          <TableHead className="px-6 py-3">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((txn) => (
          <TableRow key={txn.customer_id + txn.date} className="hover:bg-gray-50">
            <TableCell className="font-medium px-6 py-3">{txn.customer_id}</TableCell>
            <TableCell className="px-6 py-3">{txn.product_count}</TableCell>
            <TableCell className="px-6 py-3">{txn.location}</TableCell>
            <TableCell className="px-6 py-3">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                {txn.payment_method}
              </span>
            </TableCell>
            <TableCell className="px-6 py-3">{txn.product_category}</TableCell>
            <TableCell className="px-6 py-3">{txn.date}</TableCell>
            <TableCell className="px-6 py-3">{txn.total_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-gray-100 font-semibold">
        <TableRow>
            <TableCell className="px-6 py-3"></TableCell>
            <TableCell className="px-6 py-3">{totalItems}</TableCell>
            <TableCell className="px-6 py-3"></TableCell>
            <TableCell className="px-6 py-3"></TableCell>
            <TableCell className="px-6 py-3"></TableCell>
            <TableCell className="px-6 py-3"></TableCell>
            <TableCell className="px-6 py-3">{`₹${totalPrice.toLocaleString()}`}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
