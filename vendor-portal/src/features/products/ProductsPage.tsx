import React, { useEffect, useState } from 'react';
import { vendorProductService, getImageUrl } from '../../services/vendorProductService';
import { notifyProductSync, subscribeProductSync } from '../../services/productSyncService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Clock, CheckCircle2, XCircle, Edit, Trash2, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Idols');
  const [stock, setStock] = useState('20');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const loadProducts = () => {
    vendorProductService.getProducts().then((res) => {
      const normalized = (res.data || []).map((p: any) => ({
        ...p,
        approvalStatus: p.approvalStatus || p.approval_status || 'PENDING_APPROVAL',
        approvalComments: p.approvalComments || p.approval_comments || 'Submitted for administrator approval',
        price: p.price || 0,
        sku: p.sku || 'SKU-NEW',
        stock: p.stock || 0,
        thumbnail: p.thumbnail || '/images/products/brass_ganesha_idol.jpg'
      }));
      setProducts(normalized);
    });
  };

  useEffect(() => {
    loadProducts();

    const unsubscribe = subscribeProductSync(() => {
      loadProducts();
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setIsUploading(true);
      try {
        const uploadedUrl = await vendorProductService.uploadImage(file);
        setImagePreview(uploadedUrl);
      } catch (err) {
        console.error('Failed to upload image', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    await vendorProductService.createProduct({
      name: title,
      price: parseFloat(price),
      category: category,
      stock: parseInt(stock) || 10,
      thumbnail: imagePreview || '/images/products/brass_ganesha_idol.jpg',
    });

    notifyProductSync('CREATED');
    loadProducts();
    setIsAddModalOpen(false);
    setTitle('');
    setPrice('');
    setImagePreview('');
  };

  const handleOpenEditModal = (prod: any) => {
    setSelectedProduct(prod);
    setTitle(prod.name);
    setPrice(prod.price.toString());
    setCategory(prod.category);
    setStock(prod.stock.toString());
    setImagePreview(prod.thumbnail || '');
    setIsEditModalOpen(true);
  };

  const handleEditProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !title || !price) return;

    await vendorProductService.submitEditRequest(selectedProduct.id, {
      name: title,
      price: parseFloat(price),
      category: category,
      stock: parseInt(stock) || 10,
      thumbnail: imagePreview || selectedProduct.thumbnail,
    });

    notifyProductSync('EDITED');
    loadProducts();
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setTitle('');
    setPrice('');
    setImagePreview('');
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product listing? It will be removed from DivineKart.')) return;
    await vendorProductService.deleteProduct(id);
    notifyProductSync('DELETED');
    loadProducts();
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">DivineVendor Product Catalog</h1>
          <p className="text-xs text-slate-500 mt-0.5">Submit new products or edit existing listings for DivineAdmin verification before publishing live to DivineKart.</p>
        </div>
        <Button onClick={() => { setTitle(''); setPrice(''); setImagePreview(''); setIsAddModalOpen(true); }} leftIcon={<Plus className="w-4 h-4 text-[#DAA520]" />}>
          Submit New Product Listing
        </Button>
      </div>

      {/* Workflow Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#800020] shrink-0" />
          <p className="text-xs font-semibold text-slate-800">
            Product edits enter <span className="font-extrabold text-[#800020]">Pending Approval</span>. The existing live product on <span className="font-bold">DivineKart</span> remains active until <span className="font-bold">DivineAdmin</span> approves the changes.
          </p>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-amber-200 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">Submit Product for DivineAdmin Approval</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <Input label="Product Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input label="Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-amber-200 bg-white"
                >
                  <option value="Idols">Idols</option>
                  <option value="Puja Samagri">Puja Samagri</option>
                  <option value="Rudraksha">Rudraksha</option>
                  <option value="Books">Books</option>
                  <option value="Yantra">Yantra</option>
                  <option value="Incense & Dhoop">Incense &amp; Dhoop</option>
                  <option value="Ayurveda">Ayurveda</option>
                  <option value="Return Gifts">Return Gifts</option>
                  <option value="Music">Music</option>
                </select>
              </div>
              <Input label="Initial Stock Units" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
              
              {/* Product Image File Upload Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#800020]" />
                  Product Image File Upload
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50/50">
                  {imagePreview ? (
                    <img
                      src={getImageUrl(imagePreview)}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-amber-300 shadow-sm shrink-0 bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg border border-dashed border-amber-300 bg-amber-100/50 flex flex-col items-center justify-center shrink-0 text-amber-700">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      onChange={handleImageChange}
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#800020] file:text-white hover:file:bg-[#600018] cursor-pointer"
                    />
                    {isUploading ? (
                      <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1 mt-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Resizing and optimizing image...
                      </p>
                    ) : imagePreview ? (
                      <p className="text-[10px] font-bold text-emerald-700 mt-1 truncate">Image optimized &amp; uploaded successfully</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 15MB (Auto 800x800 optimized)</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isUploading}>Submit to DivineAdmin</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-amber-200 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">Submit Product Edit Change Request</h3>
            <p className="text-xs text-slate-500">Live store listing for <span className="font-bold text-slate-900">{selectedProduct.name}</span> will stay active on DivineKart until approved.</p>
            <form onSubmit={handleEditProductSubmit} className="space-y-3">
              <Input label="Proposed Product Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <Input label="Proposed Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Proposed Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-amber-200 bg-white"
                >
                  <option value="Idols">Idols</option>
                  <option value="Puja Samagri">Puja Samagri</option>
                  <option value="Rudraksha">Rudraksha</option>
                  <option value="Books">Books</option>
                  <option value="Yantra">Yantra</option>
                  <option value="Incense & Dhoop">Incense &amp; Dhoop</option>
                  <option value="Ayurveda">Ayurveda</option>
                  <option value="Return Gifts">Return Gifts</option>
                  <option value="Music">Music</option>
                </select>
              </div>
              <Input label="Proposed Stock Units" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

              {/* Product Image File Upload Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#800020]" />
                  Proposed Image File Upload
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50/50">
                  {imagePreview ? (
                    <img
                      src={getImageUrl(imagePreview)}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-amber-300 shadow-sm shrink-0 bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-lg border border-dashed border-amber-300 bg-amber-100/50 flex flex-col items-center justify-center shrink-0 text-amber-700">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                      onChange={handleImageChange}
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#800020] file:text-white hover:file:bg-[#600018] cursor-pointer"
                    />
                    {isUploading ? (
                      <p className="text-[10px] font-bold text-amber-700 flex items-center gap-1 mt-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Resizing and optimizing image...
                      </p>
                    ) : imagePreview ? (
                      <p className="text-[10px] font-bold text-emerald-700 mt-1 truncate">Image optimized &amp; uploaded successfully</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 15MB (Auto 800x800 optimized)</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isUploading}>Submit Edit to DivineAdmin</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Catalog Table */}
      <div className="p-6 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-amber-50/60 text-slate-500 uppercase text-[10px] font-bold border-b border-amber-200">
              <tr>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Approval Status</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-amber-50/40">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img
                      src={getImageUrl(prod.thumbnail)}
                      alt={prod.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'http://127.0.0.1:8000/images/products/brass_ganesha_idol.jpg';
                      }}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-200 shrink-0 bg-amber-50"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{prod.name}</p>
                      <p className="text-[10px] text-slate-400">{prod.category}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-600">{prod.sku}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#800020]">₹{prod.price.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-bold">{prod.stock} units</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                      prod.approvalStatus === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prod.approvalStatus === 'REJECTED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {prod.approvalStatus === 'APPROVED' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {prod.approvalStatus === 'PENDING_APPROVAL' && <Clock className="w-3 h-3 text-amber-600" />}
                      {prod.approvalStatus === 'REJECTED' && <XCircle className="w-3 h-3 text-rose-600" />}
                      {prod.approvalStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      className="px-3 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1 text-slate-800"
                    >
                      <Edit className="w-3.5 h-3.5 text-[#800020]" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="px-3 py-1 rounded-lg border border-rose-200 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1 text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
