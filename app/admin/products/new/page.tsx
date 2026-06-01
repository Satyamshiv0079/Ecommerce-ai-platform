// app/(admin)/products/new/page.tsx
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Fill in the details and use AI to generate description</p>
      </div>

      <ProductForm />
    </div>
  );
}