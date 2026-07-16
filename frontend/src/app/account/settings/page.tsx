'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { Save, KeyRound } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthStore();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulasi update profil berhasil. (API belum terhubung)');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Password baru tidak cocok!');
      return;
    }
    alert('Simulasi ganti password berhasil. (API belum terhubung)');
    setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-xl font-bold font-heading mb-1">Informasi Profil</h2>
        <p className="text-gray-500 text-sm mb-6">Perbarui detail akun dan informasi kontak Anda.</p>
        
        <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
            <input 
              type="email" 
              name="email"
              value={profileData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah karena terhubung dengan kredensial login.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon (Opsional)</label>
            <input 
              type="tel" 
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="flex items-center px-6 py-2 bg-primary text-white rounded font-bold uppercase text-sm hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-none md:rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center mb-6">
          <KeyRound className="w-5 h-5 mr-2 text-gray-400" />
          <h2 className="text-xl font-bold font-heading">Ubah Password</h2>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
            <input 
              type="password" 
              name="current_password"
              value={passwordData.current_password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input 
                type="password" 
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
              <input 
                type="password" 
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                required
                minLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="px-6 py-2 border-2 border-primary text-primary rounded font-bold uppercase text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
