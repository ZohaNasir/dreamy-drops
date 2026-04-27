import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  await connectDB();
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-light tracking-widest uppercase">Admin Dashboard</h1>
        <form action="/api/sync-instagram" method="POST">
          <Button type="submit" className="rounded-none bg-black hover:bg-gray-800">
            Sync Instagram Mock Data
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Total Products</h2>
          <p className="text-4xl font-light text-gray-900">{productCount}</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Total Orders</h2>
          <p className="text-4xl font-light text-gray-900">{orderCount}</p>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Revenue</h2>
          <p className="text-4xl font-light text-gray-900">$0.00</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-medium mb-6">Recent Orders</h2>
        <div className="bg-white border rounded-sm overflow-hidden">
          <div className="p-8 text-center text-gray-500">
            No orders found yet.
          </div>
        </div>
      </div>
    </div>
  );
}
