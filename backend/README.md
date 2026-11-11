# 🚀 Kampüs Etkinlikleri - REST API (Sprint 7)

Express.js kullanılarak geliştirilmiş REST API backend sunucusu.

## 📌 REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata |
|---|---|---|---|---|
| `GET` | `/health` | Sunucu durum kontrolü | `200` | - |
| `GET` | `/events` | Tüm etkinlikleri getir (`?category=...`) | `200` | - |
| `GET` | `/events/:id` | Tek etkinlik getir | `200` | `404` |
| `POST` | `/events` | Yeni etkinlik ekle | `201` | `400` |

## 🛠️ Çalıştırma

```bash
npm install
npm run dev