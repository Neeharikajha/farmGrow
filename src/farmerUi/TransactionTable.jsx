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
  {
    customer_id: "R001",
    product_count: 4,
    location: "Delhi",
    payment_method: "Cash",
    product_category: "Fruits",
    date: "01 Sep 2024",
    total_price: "₹7,500"
  },
  {
    customer_id: "R002",
    product_count: 2,
    location: "Mumbai",
    payment_method: "UPI",
    product_category: "Veggies",
    date: "02 Sep 2024",
    total_price: "₹4,299"
  },
  {
    customer_id: "R003",
    product_count: 5,
    location: "Bangalore",
    payment_method: "Card",
    product_category: "Exotic",
    date: "03 Sep 2024",
    total_price: "₹9,999"
  },
  {
    customer_id: "R004",
    product_count: 3,
    location: "Hyderabad",
    payment_method: "Wallet",
    product_category: "Organic",
    date: "04 Sep 2024",
    total_price: "₹3,750"
  },
  {
    customer_id: "R005",
    product_count: 1,
    location: "Kolkata",
    payment_method: "Cash",
    product_category: "Fruits",
    date: "05 Sep 2024",
    total_price: "₹1,999"
  }
];

export function TransactionTable() {
  // calculate total items
  const totalItems = transactions.reduce((sum, txn) => sum + txn.product_count, 0);
  const totalPrice = transactions.reduce((sum, txn) => sum + parseInt(txn.total_price.replace('₹','').replace(',','')), 0);

  return (
    <Table className="w-full">
      <TableCaption>Recent customer transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Customer ID</TableHead>
          <TableHead>Product Count</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Product Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((txn) => (
          <TableRow key={txn.customer_id + txn.date}>
            <TableCell className="font-medium">{txn.customer_id}</TableCell>
            <TableCell>{txn.product_count}</TableCell>
            <TableCell>{txn.location}</TableCell>
            <TableCell>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                {txn.payment_method}
              </span>
            </TableCell>
            <TableCell>{txn.product_category}</TableCell>
            <TableCell>{txn.date}</TableCell>
            <TableCell>{txn.total_price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
            <TableCell></TableCell> {/* Customer ID */}
            <TableCell>{totalItems}</TableCell> {/* Product Count total */}
            <TableCell></TableCell> {/* Location */}
            <TableCell></TableCell> {/* Payment Method */}
            <TableCell></TableCell> {/* Product Category */}
            <TableCell></TableCell> {/* Date */}
            <TableCell>{`₹${totalPrice.toLocaleString()}`}</TableCell> {/* Total Price total */}
        </TableRow>
        </TableFooter>
    </Table>
  );
}
