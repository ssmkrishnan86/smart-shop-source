import React, { useEffect, useState } from 'react';
import { vendorProductService } from '../../services/vendorProductService';
import { subscribeProductSync, notifyProductSync } from '../../services/productSyncService';
import { Boxes, Save, RefreshCw, CheckCircle2, AlertCircle, X, Search, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [stockInputs, setStockInputs] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadInventory = () => {
    vendorProductService.getProducts().then((res) => {
      const data = res.data || [];
      setProducts(data);
      const inputs: { [key: string]: number } = {};
      data.forEach((p: any) => {
        inputs[p.id] = p.stock || 0;
      });
      setStockInputs((prev) => ({ ...inputs, ...prev }));
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadInventory();

    const unsubscribe = subscribeProductSync(() => {
      loadInventory();
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleSaveStock = async (id: string, name: string) => {
    const newStock = stockInputs[id] ?? 0;
    setSavingId(id);
    try {
      await vendorProductService.updateStock(id, newStock);
      notifyProductSync('EDITED');
      showToast('success', `Stock level for "${name}" updated to ${newStock} units.`);
      loadInventory();
    } catch {
      showToast('error', 'Failed to update stock level.');
    } finally {
      setSavingId(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
              : 'bg-rose-900 text-rose-50 border-rose-700'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-serif">Real-Time Inventory Manager</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automatic inventory deduction on order placement &amp; automatic restoration on order cancellation.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search SKU or Product Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Inventory Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-4 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin" />
            <span>Syncing real-time warehouse inventory...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Boxes className="w-8 h-8 text-amber-300 stroke-1" />
            <p className="font-bold text-slate-700">No products found in inventory</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-amber-50/80 text-slate-600 uppercase text-[10px] font-bold border-b border-amber-200/80 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Available Inventory</th>
                  <th className="py-3.5 px-4">Stock Level Editor</th>
                  <th className="py-3.5 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100/70">
                {filteredProducts.map((prod) => {
                  const currentStock = prod.stock || 0;
                  const isLow = currentStock <= 10;
                  return (
                    <tr key={prod.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Boxes className="w-4 h-4 text-amber-800 shrink-0" />
                          <span>{prod.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-500 whitespace-nowrap">
                        {prod.sku || 'SKU-NEW'}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                            isLow
                              ? 'bg-rose-100 text-rose-900 border-rose-300'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          {isLow ? <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {currentStock} units available
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <input
                          type="number"
                          min={0}
                          value={stockInputs[prod.id] ?? currentStock}
                          onChange={(e) =>
                            setStockInputs({ ...stockInputs, [prod.id]: Math.max(0, parseInt(e.target.value) || 0) })
                          }
                          className="w-28 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50/50 text-xs font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          isLoading={savingId === prod.id}
                          onClick={() => handleSaveStock(prod.id, prod.name)}
                          leftIcon={<Save className="w-3.5 h-3.5" />}
                        >
                          Save Stock
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
