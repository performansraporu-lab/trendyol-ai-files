import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Settings, LogOut, Home, HelpCircle, FileText, Users, BarChart3, CheckCircle, Clock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { firma, sorular, urunler, istatistikler } from '../api';

function HomePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    istatistikler()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Kontrol Paneli</h1>
          <p className="text-gray-600">Sistem durumunuzu ve istatistiklerinizi görüntüleyin</p>
        </div>
      </div>
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold mb-1">{stats?.toplamSoru || '0'}</div>
              <div className="text-blue-100 font-medium">Toplam Soru</div>
            </div>
            <div className="bg-blue-400/30 p-4 rounded-2xl">
              <HelpCircle className="h-8 w-8 text-blue-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold mb-1">{stats?.cevaplanan || '0'}</div>
              <div className="text-green-100 font-medium">Cevaplanan</div>
            </div>
            <div className="bg-green-400/30 p-4 rounded-2xl">
              <CheckCircle className="h-8 w-8 text-green-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold mb-1">{stats?.bekleyen || '0'}</div>
              <div className="text-yellow-100 font-medium">Bekleyen</div>
            </div>
            <div className="bg-yellow-400/30 p-4 rounded-2xl">
              <Clock className="h-8 w-8 text-yellow-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Başlangıç */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-orange-100 p-3 rounded-xl mr-4">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            Hızlı Başlangıç
          </h3>
          <div className="space-y-4">
            <Link to="/dashboard/ayarlar" className="block group">
              <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 group-hover:border-orange-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-orange-800 text-lg">1. Trendyol API Ayarları</div>
                    <div className="text-orange-600">API anahtarlarınızı ekleyin</div>
                  </div>
                  <div className="text-orange-400 group-hover:text-orange-600 transition-colors">
                    <Settings className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/dashboard/urunler" className="block group">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 group-hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-800 text-lg">2. Ürün Bilgileri</div>
                    <div className="text-blue-600">Excel dosyanızı yükleyin</div>
                  </div>
                  <div className="text-blue-400 group-hover:text-blue-600 transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="bg-green-100 p-3 rounded-xl mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            Sistem Durumu
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <div className="font-semibold text-green-800">Backend Aktif</div>
                <div className="text-green-600 text-sm">API servisleri çalışıyor</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <div className="font-semibold text-green-800">Database Bağlantısı</div>
                <div className="text-green-600 text-sm">Veritabanı erişilebilir</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0" />
              <div>
                <div className="font-semibold text-yellow-800">Trendyol API</div>
                <div className="text-yellow-600 text-sm">Ayarları yapılandırın</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SorularPage() {
  const [soruListesi, setSoruListesi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sorular.liste().then(res => setSoruListesi(res.data)).catch(console.error);
  }, []);

  const syncSorular = async () => {
    setLoading(true);
    try {
      await sorular.sync();
      const res = await sorular.liste();
      setSoruListesi(res.data);
      alert('✅ Sorular başarıyla çekildi!');
    } catch (err) {
      alert('❌ Hata: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">❓ Müşteri Soruları</h1>
          <p className="text-gray-600">Trendyol'dan gelen sorularınızı yönetin</p>
        </div>
        <button 
          onClick={syncSorular} 
          disabled={loading}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 shadow-xl transition-all transform hover:scale-105 disabled:transform-none"
        >
          {loading ? '⏳ Yükleniyor...' : '📥 Soruları Çek'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {soruListesi.length === 0 ? (
          <div className="p-16 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Henüz soru yok</h3>
            <p className="text-gray-600 mb-6">Trendyol'dan sorular çekmek için yukarıdaki butona tıklayın</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Soru</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Ürün</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Durum</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {soruListesi.map(soru => (
                  <tr key={soru.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-900 max-w-md">
                        {soru.soru_metni?.substring(0, 120) + (soru.soru_metni?.length > 120 ? '...' : '')}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-700">{soru.urun_adi || '-'}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                        soru.durum === 'bekliyor' ? 'bg-yellow-100 text-yellow-800' : 
                        soru.durum === 'gonderildi' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {soru.durum === 'bekliyor' ? '⏳ Bekliyor' : 
                         soru.durum === 'gonderildi' ? '✅ Gönderildi' : '🤖 AI Cevapladı'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-orange-600 hover:text-orange-800 font-semibold hover:bg-orange-50 px-4 py-2 rounded-lg transition-all">
                        👁️ Görüntüle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function UrunlerPage() {
  const [urunListesi, setUrunListesi] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    urunler.liste().then(res => setUrunListesi(res.data)).catch(console.error);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      await urunler.excelYukle(file);
      const res = await urunler.liste();
      setUrunListesi(res.data);
      alert('✅ Excel dosyası başarıyla yüklendi!');
    } catch (err) {
      alert('❌ Hata: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📦 Ürün Bilgileri</h1>
          <p className="text-gray-600">Ürün açıklamalarınızı yönetin</p>
        </div>
        <div>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={loading}
          />
          <label 
            htmlFor="file-upload" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-blue-700 cursor-pointer shadow-xl transition-all inline-flex items-center transform hover:scale-105"
          >
            📄 Excel Yükle
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {urunListesi.length === 0 ? (
          <div className="p-16 text-center">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Henüz ürün yok</h3>
            <p className="text-gray-600">Excel dosyası yükleyerek ürün bilgilerini ekleyin</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Barkod</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Ürün Adı</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {urunListesi.map(urun => (
                  <tr key={urun.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 text-sm font-mono text-gray-900">{urun.barkod}</td>
                    <td className="px-8 py-6 text-sm font-semibold text-gray-900">{urun.urun_adi || '-'}</td>
                    <td className="px-8 py-6 text-sm text-gray-600 max-w-xs">
                      <div className="truncate">
                        {urun.urun_aciklamasi?.substring(0, 80) + (urun.urun_aciklamasi?.length > 80 ? '...' : '') || '-'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AyarlarPage() {
  const [firmaInfo, setFirmaInfo] = useState(null);
  const [trendyolAyar, setTrendyolAyar] = useState({ 
    trendyol_api_key: '', 
    trendyol_api_secret: '', 
    trendyol_seller_id: '' 
  });
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Backend'den mevcut ayarları çek
  useEffect(() => {
    firma.profil()
      .then(res => {
        setFirmaInfo(res.data);
        setTrendyolAyar({
          trendyol_api_key: res.data.trendyol_api_key || '',
          trendyol_api_secret: res.data.trendyol_api_secret || '',
          trendyol_seller_id: res.data.trendyol_seller_id || ''
        });
      })
      .catch(console.error)
      .finally(() => setPageLoading(false));
  }, []);
  
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firma.trendyolAyarlar(trendyolAyar);
      alert('✅ Trendyol API ayarları başarıyla kaydedildi!');
      
      // Sayfa yenilenmeden firmaInfo'yu güncelle
      const updatedInfo = await firma.profil();
      setFirmaInfo(updatedInfo.data);
    } catch (err) {
      alert('❌ Hata: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const toggleOtomatik = async () => {
    try {
      const yeniDurum = !firmaInfo.otomatik_cevap_aktif;
      await firma.otomatikCevap({ otomatik_cevap_aktif: yeniDurum });
      setFirmaInfo({ ...firmaInfo, otomatik_cevap_aktif: yeniDurum });
      alert(`✅ Otomatik cevaplama ${yeniDurum ? 'açıldı' : 'kapatıldı'}!`);
    } catch (err) {
      alert('❌ Hata: ' + (err.response?.data?.error || err.message));
    }
  };

  if (pageLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="bg-gray-300 h-64 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!firmaInfo) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          ⚠️ Firma bilgileri yüklenemedi. Lütfen sayfayı yenileyin.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">⚙️ Sistem Ayarları</h1>
        <p className="text-gray-600">API ayarlarınızı ve sistem yapılandırmanızı yönetin</p>
      </div>
      
      {/* Trendyol API Ayarları */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div className="flex items-center text-white">
            <div className="bg-white/20 p-4 rounded-2xl mr-4">
              <Settings className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Trendyol API Ayarları</h2>
              <p className="text-orange-100">Trendyol satıcı panelinden API bilgilerinizi girin</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🔑 API Key
              </label>
              <input
                type="text"
                value={trendyolAyar.trendyol_api_key}
                onChange={(e) => setTrendyolAyar({ ...trendyolAyar, trendyol_api_key: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                placeholder="Trendyol API Key'inizi girin"
              />
              {trendyolAyar.trendyol_api_key && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  API Key tanımlandı
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🔒 API Secret
              </label>
              <div className="relative">
                <input
                  type={showSecret ? "text" : "password"}
                  value={trendyolAyar.trendyol_api_secret}
                  onChange={(e) => setTrendyolAyar({ ...trendyolAyar, trendyol_api_secret: e.target.value })}
                  className="w-full px-4 py-4 pr-14 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                  placeholder="Trendyol API Secret'ınızı girin"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-all"
                >
                  {showSecret ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
              </div>
              {trendyolAyar.trendyol_api_secret && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  API Secret tanımlandı
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🏪 Seller ID
              </label>
              <input
                type="text"
                value={trendyolAyar.trendyol_seller_id}
                onChange={(e) => setTrendyolAyar({ ...trendyolAyar, trendyol_seller_id: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                placeholder="Seller ID'nizi girin"
              />
              {trendyolAyar.trendyol_seller_id && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Seller ID tanımlandı
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 shadow-xl transition-all transform hover:scale-105 disabled:transform-none"
            >
              {loading ? '💾 Kaydediliyor...' : '💾 Ayarları Kaydet'}
            </button>
          </form>
        </div>
      </div>

      {/* Otomatik Cevaplama */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-100 p-4 rounded-2xl mr-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">🤖 Otomatik Cevaplama</h3>
              <p className="text-gray-600">AI tarafından oluşturulan cevapları otomatik olarak gönder</p>
            </div>
          </div>
          <button
            onClick={toggleOtomatik}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-110 ${
              firmaInfo.otomatik_cevap_aktif ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                firmaInfo.otomatik_cevap_aktif ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Firma Bilgileri */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex items-center text-white">
            <div className="bg-white/20 p-4 rounded-2xl mr-4">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Firma Bilgileri</h2>
              <p className="text-blue-100">Hesap detaylarınız</p>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">🏢 Firma Adı</label>
              <div className="text-2xl font-bold text-gray-900">{firmaInfo.firma_adi}</div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">📧 Email</label>
              <div className="text-2xl font-bold text-gray-900">{firmaInfo.email}</div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">🏷️ Firma Kodu</label>
              <div className="text-2xl font-mono font-bold text-orange-600">{firmaInfo.firma_kodu}</div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">📅 Kayıt Tarihi</label>
              <div className="text-2xl font-bold text-gray-900">{new Date(firmaInfo.created_at).toLocaleDateString('tr-TR')}</div>
            </div>
          </div>
        </div>
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

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Ana Sayfa', description: 'Özet ve istatistikler' },
    { path: '/dashboard/sorular', icon: HelpCircle, label: 'Sorular', description: 'Müşteri soruları' },
    { path: '/dashboard/urunler', icon: FileText, label: 'Ürünler', description: 'Ürün bilgileri' },
    { path: '/dashboard/ayarlar', icon: Settings, label: 'Ayarlar', description: 'Sistem yapılandırması' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-2xl mr-4 shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  Trendyol AI
                </h1>
                <p className="text-gray-600 text-sm">Müşteri Sorularını Otomasyonu</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center text-gray-600 hover:text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-medium"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-80 bg-white shadow-xl rounded-2xl p-6 h-fit">
            <ul className="space-y-3">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`group flex items-center px-6 py-4 rounded-xl transition-all font-semibold text-lg ${
                        isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl transform scale-105' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:transform hover:scale-105'
                      }`}
                    >
                      <Icon className="h-6 w-6 mr-4 flex-shrink-0" />
                      <div className="flex-1">
                        <div>{item.label}</div>
                        <div className={`text-sm ${isActive ? 'text-orange-100' : 'text-gray-500 group-hover:text-gray-600'}`}>
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 bg-white shadow-xl rounded-2xl overflow-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sorular" element={<SorularPage />} />
              <Route path="/urunler" element={<UrunlerPage />} />
              <Route path="/ayarlar" element={<AyarlarPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
