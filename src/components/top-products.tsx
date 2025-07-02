import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$299.99",
    sales: 1234,
    status: "In Stock",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    sales: 987,
    status: "In Stock",
  },
  {
    name: "Laptop Stand",
    category: "Accessories",
    price: "$49.99",
    sales: 756,
    status: "Low Stock",
  },
  {
    name: "USB-C Cable",
    category: "Accessories",
    price: "$19.99",
    sales: 543,
    status: "In Stock",
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$79.99",
    sales: 432,
    status: "Out of Stock",
  },
];

export function TopProducts() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Best selling products this month</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sales}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "default"
                        : product.status === "Low Stock"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
