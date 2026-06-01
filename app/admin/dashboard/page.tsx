// app/(admin)/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import type { Product, Order } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch data
  const [
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    recentProducts,
    recentOrders
  ] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { total: true }
    }),
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })
  ]);

  const revenue = totalRevenue._sum.total || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${revenue.toLocaleString()}`} 
          icon={TrendingUp} 
          trend="+12.5%" 
        />
        <StatCard 
          title="Total Products" 
          value={totalProducts.toString()} 
          icon={Package} 
          trend="+3" 
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders.toString()} 
          icon={ShoppingBag} 
          trend="+18" 
        />
        <StatCard 
          title="Active Users" 
          value={totalUsers.toString()} 
          icon={Users} 
          trend="+5" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Products</h2>
            <a href="/admin/products" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            {recentProducts.map((product: Product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{product.price}</p>
                  <p className="text-xs text-green-600">In Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">#{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{order.user?.name || 'Customer'}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.total}</p>
                  <p className={`text-xs px-3 py-1 rounded-full inline-block ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                    order.status === 'PAID' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  icon: any; 
  trend: string;
}) {
  return (
    <div className="bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-violet-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-green-600">
        <ArrowUpRight className="h-4 w-4 mr-1" />
        {trend} from last month
      </div>
    </div>
  );
}