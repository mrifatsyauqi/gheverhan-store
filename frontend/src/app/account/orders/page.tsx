'use client';

import React, { useEffect, useState } from 'react';
import { Package, Search, ChevronRight } from 'lucide-react';
import { orderService, Order } from '@/services/order.service';
import Link from 'next/link';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getCustomerOrders();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold font-heading mb-1">Pesanan Saya</h2>
          <p className="text-gray-500 text-sm">Lihat riwayat belanja dan lacak status pesanan Anda.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Cari pesanan..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
          <p className="text-gray-500 text-sm mb-6">Anda belum pernah melakukan pemesanan.</p>
          <Link href="/products" className="inline-block px-6 py-2 bg-primary text-white text-sm rounded font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-100 space-y-2 md:space-y-0 text-sm">
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                  <div>
                    <p className="text-gray-500 mb-1">Nomor Pesanan</p>
                    <p className="font-bold text-gray-900">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Tanggal Pesanan</p>
                    <p className="font-medium text-gray-900">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Total</p>
                    <p className="font-bold text-gray-900">{formatCurrency(parseFloat(order.total_amount))}</p>
                  </div>
                </div>
                <div className="pt-2 md:pt-0">
                  <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                    order.status === 'Pending Payment' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4">
                {order.items.map((item, idx) => (
                  <div key={item.id} className={`flex items-center space-x-4 ${idx !== 0 ? 'mt-4 pt-4 border-t border-gray-50' : ''}`}>
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{item.variant?.product?.name || 'Unknown Product'}</h4>
                      <p className="text-sm text-gray-500">Variant: {item.variant?.sku} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
                <Link href={`/account/orders/${order.order_number}`} className="flex items-center text-sm font-medium text-primary hover:underline">
                  Lihat Detail Pesanan <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
