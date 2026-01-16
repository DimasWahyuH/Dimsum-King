import { SalesChart } from '@/components/sales-chart'
import prisma from '@/lib/prisma'
import { formatRupiah } from '@/lib/utils'
import { DollarSign, TrendingUp, Package, AlertCircle, Truck } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Total Sales Today
    const todayTransactions = await prisma.transaction.findMany({
      where: { createdAt: { gte: today } }
    })
    const todaySales = todayTransactions.reduce((acc: number, curr: any) => acc + Number(curr.totalAmount), 0)
    const todayProfit = todayTransactions.reduce((acc: number, curr: any) => acc + Number(curr.profit), 0)

    // Low Stock
    const lowStockCount = await prisma.product.count({
      where: { stock: { lte: 10 } }
    })

    // Chart Data (Last 7 days)
    const chartData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDate = new Date(date)
      nextDate.setDate(date.getDate() + 1)

      const txs = await prisma.transaction.findMany({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      })

      const total = txs.reduce((acc: number, curr: any) => acc + Number(curr.totalAmount), 0)
      chartData.push({
        name: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        total
      })
    }

    // Recent Delivery Orders
    const deliveryOrders = await prisma.transaction.findMany({
      where: { type: 'DELIVERY' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        items: {
          include: { product: true }
        }
      }
    })

    return {
      todaySales,
      todayProfit,
      lowStockCount,
      chartData,
      deliveryOrders: deliveryOrders.map((order: any) => ({
        ...order,
        totalAmount: Number(order.totalAmount),
        profit: Number(order.profit),
        items: order.items.map((item: any) => ({
          ...item,
          priceAtTime: Number(item.priceAtTime),
          product: item.product ? {
            ...item.product,
            price: Number(item.product.price),
            costPrice: Number(item.product.costPrice)
          } : null
        }))
      }))
    }
  } catch (error) {
    return { todaySales: 0, todayProfit: 0, lowStockCount: 0, chartData: [], deliveryOrders: [], error: "Gagal terhubung ke database. Pastikan MySQL berjalan di port 3308." }
  }
}

export default async function Dashboard() {
  const { todaySales, todayProfit, lowStockCount, chartData, deliveryOrders, error } = await getDashboardData()

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h1 className="text-red-700 text-xl font-bold mb-2">Terjadi Kesalahan</h1>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  const cards = [
    { label: 'Penjualan Hari Ini', value: formatRupiah(todaySales), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Keuntungan Hari Ini', value: formatRupiah(todayProfit), icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Stok Menipis', value: `${lowStockCount} Item`, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500 mt-1">Ringkasan aktivitas Dimsum shop hari ini.</p>
        </div>
        <div className="text-sm text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm border">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{card.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalesChart data={chartData} />

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Truck className="text-blue-500" /> Pesanan Masuk (Delivery)
              </h3>
              <Link href="/reports" className="text-orange-600 text-sm font-bold hover:underline">Lihat Semua</Link>
            </div>

            <div className="space-y-4">
              {deliveryOrders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 italic bg-slate-50 rounded-xl">Belum ada pesanan delivery</div>
              ) : deliveryOrders.map((order: any) => (
                <div key={order.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase">Delivery</span>
                      <h4 className="font-bold text-slate-800 mt-1">{order.customerName}</h4>
                      <p className="text-xs text-slate-400">{order.customerPhone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{formatRupiah(Number(order.totalAmount))}</p>
                      <p className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleTimeString('id-ID')}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {order.items.map((item: any) => (
                      <span key={item.id} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-600">
                        {item.product?.name} <span className="text-orange-600 font-bold">x{item.quantity}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-center">
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Mulai Transaksi!</h3>
          <p className="text-orange-100 mb-8 max-w-xs text-lg">Siap melayani pelanggan? Buka menu Kasir untuk membuat pesanan baru.</p>
          <Link href="/pos" className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition transform hover:scale-105 inline-block">
            Buka Kasir
          </Link>
        </div>
        <Package className="absolute -bottom-8 -right-8 w-64 h-64 opacity-10 rotate-12" />
      </div>
    </div>
  )
}
