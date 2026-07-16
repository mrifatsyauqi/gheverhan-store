'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { addressService, Address } from '@/services/address.service';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    recipient_name: '',
    phone_number: '',
    full_address: '',
    city: '',
    postal_code: '',
    is_primary: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const newAddress = await addressService.createAddress(formData);
      if (newAddress.is_primary) {
        setAddresses(addresses.map(a => ({ ...a, is_primary: false })).concat(newAddress));
      } else {
        setAddresses([...addresses, newAddress]);
      }
      setShowForm(false);
      setFormData({
        recipient_name: '',
        phone_number: '',
        full_address: '',
        city: '',
        postal_code: '',
        is_primary: false,
      });
    } catch (err: any) {
      alert(err.message || 'Gagal menambahkan alamat');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus alamat ini?')) return;
    try {
      await addressService.deleteAddress(id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (err) {
      alert('Gagal menghapus alamat');
    }
  };

  return (
    <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold font-heading mb-1">Alamat Pengiriman</h2>
          <p className="text-gray-500 text-sm">Kelola daftar alamat untuk mempermudah proses checkout.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Alamat</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-4">Tambah Alamat Baru</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                <input 
                  type="text" 
                  name="recipient_name"
                  value={formData.recipient_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <input 
                  type="text" 
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea 
                name="full_address"
                value={formData.full_address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input 
                  type="text" 
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="is_primary" 
                name="is_primary"
                checked={formData.is_primary}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
              />
              <label htmlFor="is_primary" className="ml-2 text-sm text-gray-700">Jadikan sebagai alamat utama</label>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-bold uppercase text-sm hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-primary text-white rounded font-bold uppercase text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Menyimpan...' : 'Simpan Alamat'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map(i => (
            <div key={i} className="h-40 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      ) : addresses.length === 0 ? (
        !showForm && (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Belum ada alamat</h3>
            <p className="text-gray-500 text-sm mb-6">Anda belum menambahkan alamat pengiriman apapun.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-2 border-2 border-primary text-primary text-sm rounded font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Alamat
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {addresses.map((address) => (
            <div key={address.id} className={`border rounded-lg p-6 relative ${address.is_primary ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}>
              {address.is_primary && (
                <div className="absolute top-4 right-4 flex items-center text-primary text-xs font-bold bg-white px-2 py-1 rounded shadow-sm border border-primary/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Utama
                </div>
              )}
              
              <h3 className="font-bold text-gray-900 mb-1 pr-16">{address.recipient_name}</h3>
              <p className="text-sm text-gray-600 mb-4">{address.phone_number}</p>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-1">{address.full_address}</p>
              <p className="text-sm text-gray-600 mb-6">{address.city}, {address.postal_code}</p>
              
              <div className="flex space-x-4 border-t border-gray-100 pt-4 mt-auto">
                <button 
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
