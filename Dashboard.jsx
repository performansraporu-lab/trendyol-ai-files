import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Settings, LogOut, Home, HelpCircle, FileText } from 'lucide-react';
import { firma, sorular, urunler, istatistikler } from '../api';

function HomePage() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    istatistikler().then(res => setStats(res.data)).catch(console.error);
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Kontrol Paneli</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{stats?.toplamSoru || '0'}</div>
          <div className="text-blue-100">Toplam Soru</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{stats?.cevaplanan || '0'}</div>
          <div className="text-green-100">Cevaplanan</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold">{stats?.bekleyen || '0'}</div>
          <div className="text-yellow-100">Bekleyen</div>
        </div>
      </div>
    </div>
  );
}

function AyarlarPage() {
  const [trendyolAyar, setTrendyolAyar] = useState({ 
    trendyol_api_key: '', 
    trendyol_api_secret: '', 
    trendyol_seller_id: '' 
  });
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await firma.trendyolAyarlar(trendyolAyar);
      alert('Trendyol API ayarları başarıyla kaydedildi!');
    } catch (err) {
      alert('Hata: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trendyol API Ayarları</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key:</label>
            <input 
              type="text"
              value={trendyolAyar.trendyol_api_key}
              onChange={(e) => setTrendyolAyar({...trendyolAyar, trendyol_api_key: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Trendyol API Key'inizi girin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Secret:</label>
            <input 
              type="password"
              value={trendyolAyar.trendyol_api_secret}
              onChange={(e) => setTrendyolAyar({...trendyolAyar, trendyol_api_secret: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Trendyol API Secret'ınızı girin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Seller ID:</label>
            <input 
              type="text"
              value={trendyolAyar.trendyol_seller_id}
              onChange={(e) => setTrendyolAyar({...trendyolAyar, trendyol_seller_id: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Seller ID'nizi girin"
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 shadow-lg">
            💾 Ayarları Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firma');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">Trendyol AI</h1>
          <button onClick={handleLogout} className="flex items-center text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100">
            <LogOut size={20} className="mr-2" />
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 flex gap-6">
        <nav className="w-64 bg-white shadow-lg rounded-xl p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center py-3 px-4 rounded-lg transition-colors ${location.pathname === '/dashboard' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Home size={18} className="mr-3" />
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard/ayarlar" 
                className={`flex items-center py-3 px-4 rounded-lg transition-colors ${location.pathname === '/dashboard/ayarlar' ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Settings size={18} className="mr-3" />
                Ayarlar
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 bg-white shadow-lg rounded-xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ayarlar" element={<AyarlarPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
