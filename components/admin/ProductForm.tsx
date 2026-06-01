'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Sparkles } from 'lucide-react';
import { createProduct } from '@/lib/actions/products';

export function ProductForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    stock: '20',
    image: '',
    isActive: true,
  });

  const generateDescription = async () => {
    if (!formData.name || !formData.category) {
      alert("Please enter Product Name and Category first");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
        }),
      });

      const data = await res.json();
      if (data.description) {
        setFormData(prev => ({ ...prev, description: data.description }));
      }
    } catch (error) {
      alert("Failed to generate description");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await createProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    });

    if (result.success) {
      router.push('/admin/products');
      router.refresh();
    } else {
      alert(result.error || "Something went wrong");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Product Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="product-name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label>Price (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Description</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generateDescription}
            disabled={isGenerating || !formData.name || !formData.category}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate with AI
          </Button>
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label>Active Product</Label>
      </div>

      <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? "Creating Product..." : "Create Product"}
      </Button>
    </form>
  );
}