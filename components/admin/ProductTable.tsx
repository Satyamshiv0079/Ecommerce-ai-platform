'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { Product } from '@prisma/client';
import { deleteProduct } from '@/lib/actions/products';

interface ProductTableProps {
  products: Product[];
}

export function ProductTable({ products }: ProductTableProps) {
  const [data, setData] = useState(products);

  const handleDelete = async (id: string, name: string) => {
    const isConfirmed = confirm(`Are you sure you want to delete the product "${name}"?\nThis action cannot be undone.`);
    
    if (!isConfirmed) return;

    const result = await deleteProduct(id);
    if (result.success) {
      setData((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(result.error || "Failed to delete the product");
    }
  };

  return (
    <div className="bg-white rounded-2xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{product.category}</Badge>
              </TableCell>
              <TableCell className="font-medium">₹{product.price}</TableCell>
              <TableCell>
                <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/products/${product.slug}`} target="_blank">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => handleDelete(product.id, product.name)}
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Inline import for Next Link since we added a target blank view icon redirect
import Link from 'next/link';