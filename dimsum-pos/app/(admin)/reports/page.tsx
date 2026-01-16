import { getTransactions } from "@/app/actions/transactions"
import { formatRupiah } from "@/lib/utils"

export const dynamic = 'force-dynamic'

export default async function ReportsPage() {
    const transactions = await getTransactions()

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Laporan Penjualan</h2>
                <p className="text-slate-500">Riwayat transaksi store.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="py-4 px-6 font-semibold text-slate-500">ID</th>
                                <th className="py-4 px-6 font-semibold text-slate-500">Tipe / Pelanggan</th>
                                <th className="py-4 px-6 font-semibold text-slate-500">Tanggal & Waktu</th>
                                <th className="py-4 px-6 font-semibold text-slate-500">Detail Item</th>
                                <th className="py-4 px-6 font-semibold text-slate-500">Total Transaksi</th>
                                <th className="py-4 px-6 font-semibold text-slate-500">Profit</th>
                                <th className="py-4 px-6 font-semibold text-slate-500 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-slate-400 italic">Belum ada transaksi tercatat</td>
                                </tr>
                            ) : transactions.map((tx: any) => (
                                <tr key={tx.id} className="hover:bg-orange-50/30 transition duration-150">
                                    <td className="py-4 px-6 font-mono text-slate-400 text-sm">#{tx.id}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full w-fit mb-1 border ${tx.type === 'DELIVERY' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                {tx.type}
                                            </span>
                                            {tx.customerName && (
                                                <div className="text-sm font-bold text-slate-800">{tx.customerName}</div>
                                            )}
                                            {tx.customerPhone && (
                                                <div className="text-xs text-slate-400">{tx.customerPhone}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-slate-700 font-medium whitespace-nowrap">
                                        {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        <div className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleTimeString('id-ID')}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1 max-h-20 overflow-y-auto custom-scrollbar">
                                            {tx.items.map((item: any) => (
                                                <div key={item.id} className="text-sm text-slate-600 flex justify-between pr-4 items-center gap-4">
                                                    <span>{item.product?.name || <span className="text-red-400 italic">Produk dihapus</span>}</span>
                                                    <span className="text-slate-400 bg-slate-100 px-1.5 rounded text-xs">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-slate-800 font-mono">{formatRupiah(Number(tx.totalAmount))}</td>
                                    <td className="py-4 px-6 text-green-600 font-medium font-mono text-sm">+{formatRupiah(Number(tx.profit))}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
