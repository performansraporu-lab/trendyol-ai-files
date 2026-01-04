import React, { useState } from 'react';
import { auth } from '../api';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', sifre: '' });
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await auth[mode](formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('firma', JSON.stringify(data.firma));
      onLogin(data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">🤖</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
            Trendyol AI
          </h1>
          <p className="text-gray-600 text-lg">Müşteri Sorularını Otomasyonu</p>
        </div>
        
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
          {/* Mode Switcher */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
                mode === 'login' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔑 Giriş Yap
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📝 Kayıt Ol
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏢 Firma Adı
                </label>
                <input
                  type="text"
                  required
                  value={formData.firma_adi || ''}
                  onChange={(e) => setFormData({ ...formData, firma_adi: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80"
                  placeholder="Firma adınızı girin"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔒 Şifre
              </label>
              <input
                type="password"
                required
                value={formData.sifre}
                onChange={(e) => setFormData({ ...formData, sifre: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/80"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 shadow-lg transition-all transform hover:scale-105 disabled:transform-none"
            >
              {loading ? '⏳ İşlem yapılıyor...' : (mode === 'login' ? '🚀 Giriş Yap' : '✨ Hesap Oluştur')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>🛡️ Güvenli ve şifreli bağlantı</p>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          © 2026 Trendyol AI - Powered by DMEG Global
        </div>
      </div>
    </div>
  );
}
