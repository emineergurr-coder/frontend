import { useState, useEffect } from "react";
// @ts-ignore
import "./App.css";
import { events as initialEvents } from "./data/events";
import type { PageName } from "./types/page";
import type { CampusEvent } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export default function App() {
  const [page, setPage] = useState<PageName | "forgot">("home");
  const [eventsList, setEventsList] = useState<CampusEvent[]>(initialEvents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<string>("");

  // Başarı bildirim durumları
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Form alanları (Kayıt Ol)
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Form alanları (Giriş Yap)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Form alanları (Şifre Sıfırlama)
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotErrors, setForgotErrors] = useState<Record<string, string>>({});

  function go(next: PageName | "forgot", id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    setRegisterSuccess(false);
    setLoginSuccess(false);
    setForgotSuccess(false);
    setRegErrors({});
    setLoginErrors({});
    setForgotErrors({});
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${page}`;
  }, [page]);

  // ETKİNLİK SİLME
  const handleDelete = (id: string) => {
    if (window.confirm("Bu etkinliği silmek istediğinizden emin misiniz?")) {
      setEventsList((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // ETKİNLİK EKLEME VE GÜNCELLEME İŞLEMİ
  const handleSaveEvent = (data: any) => {
    if (page === "add") {
      const newEvent: CampusEvent = {
        id: String(Date.now()),
        title: data?.title || "Yeni Etkinlik",
        date: data?.date || "2026-11-03",
        category: data?.category || "Diğer",
        description: data?.description || "",
        location: data?.location || "Kampüs",
        time: data?.time || "14:00",
        ...data,
      } as CampusEvent;

      setEventsList((prev) => [newEvent, ...prev]);
    } else if (page === "update" && selectedId) {
      setEventsList((prev) =>
        prev.map((item) => (item.id === selectedId ? ({ ...item, ...data } as CampusEvent) : item))
      );
    }
    go("admin");
  };

  // KAYIT OL DOĞRULAMA
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!regName.trim() || regName.trim().length < 3) {
      errors.name = "Ad soyad en az 3 karakter olmalı.";
    }
    if (!regEmail.trim() || !/\S+@\S+\.\S+/.test(regEmail)) {
      errors.email = "Geçerli bir e-posta girin.";
    }
    if (!regPass || regPass.length < 6) {
      errors.password = "Şifre en az 6 karakter olmalı.";
    }
    if (regPass !== regConfirmPass) {
      errors.confirmPassword = "Şifreler eşleşmiyor.";
    }

    setRegErrors(errors);
    setRegisterSuccess(Object.keys(errors).length === 0);
  };

  // GİRİŞ YAP DOĞRULAMA
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!loginEmail.trim() || !/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.email = "Geçerli bir e-posta girin.";
    }
    if (!loginPass) {
      errors.password = "Şifre alanı boş bırakılamaz.";
    }

    setLoginErrors(errors);
    setLoginSuccess(Object.keys(errors).length === 0);
  };

  // ŞİFRE SIFIRLAMA DOĞRULAMA
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      errors.email = "Geçerli bir e-posta girin.";
    }

    setForgotErrors(errors);
    setForgotSuccess(Object.keys(errors).length === 0);
  };

  const selectedEvent = selectedId ? findEventById(eventsList, selectedId) : undefined;
  const categories = [...new Set(eventsList.map((e) => e.category))];

  const getInputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "0.6rem",
    marginTop: "0.3rem",
    border: hasError ? "1px solid #b91c1c" : "1px solid #cbd5e1",
    backgroundColor: hasError ? "#fff5f5" : "#ffffff",
    borderRadius: "6px",
    outline: "none",
    fontSize: "0.95rem"
  });

  const buttonStyle = {
    width: "100%",
    marginTop: "0.5rem",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.6rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold" as const,
    cursor: "pointer"
  };

  return (
    <div>
      {/* ÜST BAR (TEMİZ BEYAZ KAPLAYICI) */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "1.5rem" }}>
          <Header title={page === "admin" ? "Etkinlik Yönetimi" : page === "login" ? "Giriş Yap" : page === "register" ? "Kayıt Ol" : page === "forgot" ? "Şifre Sıfırlama" : "Kampüs Etkinlikleri"} />
          <Navigation current={page as PageName} onNavigate={(p) => go(p)} />
        </div>
      </div>

      <main>
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <EventList events={eventsList.slice(0, 4)} onShowDetail={(id) => go("detail", id)} />
          </section>
        )}

        {/* TÜM ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={(cat) => setCategory(cat)} />
            <p>{eventsList.length} etkinlik listeleniyor.</p>
            <EventList events={filterByCategory(searchEvents(eventsList, searchText), category as any)} onShowDetail={(id) => go("detail", id)} emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </section>
        )}

        {/* YÖNETİM (ADMIN) SAYFASI */}
        {page === "admin" && (
          <section className="detay">
            <button onClick={() => go("add")} style={{ ...buttonStyle, width: "auto", marginBottom: "1.5rem" }}>+ Yeni Etkinlik Ekle</button>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", height: "45px" }}>
                  <th>Etkinlik</th>
                  <th>Tarih</th>
                  <th>Kategori</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0", height: "50px" }}>
                    <td><strong>{item.title}</strong></td>
                    <td>{item.date}</td>
                    <td>{item.category}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => go("update", item.id)} style={{ padding: "0.3rem 0.6rem" }}>Düzenle</button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: "#ef4444", color: "white", padding: "0.3rem 0.6rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>Sil</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* GİRİŞ YAP SAYFASI */}
        {page === "login" && (
          <section className="form" style={{ maxWidth: "450px", margin: "2rem auto" }}>
            {loginSuccess && (
              <div style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem", border: "1px solid #65a30d", backgroundColor: "#f7fee7", color: "#3f6212", borderRadius: "8px", fontSize: "1rem" }}>
                Form geçerli. Gerçek giriş Sprint 10'da eklenecek.
              </div>
            )}
            <h2>Giriş Yap</h2>
            <form onSubmit={handleLoginSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <label>
                <strong>E-posta</strong>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={getInputStyle(!!loginErrors.email)} />
                {loginErrors.email && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{loginErrors.email}</span>}
              </label>

              <label>
                <strong>Şifre</strong>
                <input type="password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} style={getInputStyle(!!loginErrors.password)} />
                {loginErrors.password && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{loginErrors.password}</span>}
              </label>

              <button type="submit" style={buttonStyle}>Giriş Yap</button>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                <a style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => go("forgot")}>Şifremi unuttum</a>
                <a style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => go("register")}>Kayıt Ol</a>
              </div>
            </form>
          </section>
        )}

        {/* KAYIT OL SAYFASI */}
        {page === "register" && (
          <section className="form" style={{ maxWidth: "450px", margin: "2rem auto" }}>
            {registerSuccess && (
              <div style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem", border: "1px solid #65a30d", backgroundColor: "#f7fee7", color: "#3f6212", borderRadius: "8px", fontSize: "1rem" }}>
                Form geçerli. Gerçek kayıt Sprint 10'da eklenecek.
              </div>
            )}
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegisterSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
              <label>
                <strong>Ad Soyad</strong>
                <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} style={getInputStyle(!!regErrors.name)} />
                {regErrors.name && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{regErrors.name}</span>}
              </label>

              <label>
                <strong>E-posta</strong>
                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} style={getInputStyle(!!regErrors.email)} />
                {regErrors.email && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{regErrors.email}</span>}
              </label>

              <label>
                <strong>Şifre</strong>
                <input type="password" value={regPass} onChange={(e) => setRegPass(e.target.value)} style={getInputStyle(!!regErrors.password)} />
                {regErrors.password && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{regErrors.password}</span>}
              </label>

              <label>
                <strong>Şifre (tekrar)</strong>
                <input type="password" value={regConfirmPass} onChange={(e) => setRegConfirmPass(e.target.value)} style={getInputStyle(!!regErrors.confirmPassword)} />
                {regErrors.confirmPassword && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{regErrors.confirmPassword}</span>}
              </label>

              <button type="submit" style={buttonStyle}>Kayıt ol</button>

              <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                <a style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => go("login")}>Zaten hesabın var mı? Giriş Yap</a>
              </div>
            </form>
          </section>
        )}

        {/* ŞİFRE SIFIRLAMA SAYFASI */}
        {page === "forgot" && (
          <section className="form" style={{ maxWidth: "450px", margin: "2rem auto" }}>
            <p style={{ marginBottom: "1rem", color: "#374151" }}>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
            {forgotSuccess && (
              <div style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem", border: "1px solid #65a30d", backgroundColor: "#f7fee7", color: "#3f6212", borderRadius: "8px", fontSize: "1rem" }}>
                Bağlantı {forgotEmail || "emineergurr@gmail.com"} adresine gönderildi (demo).
              </div>
            )}
            <form onSubmit={handleForgotSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label>
                <strong>E-posta</strong>
                <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="emineergurr@gmail.com" style={getInputStyle(!!forgotErrors.email)} />
                {forgotErrors.email && <span style={{ color: "#b91c1c", fontSize: "0.85rem", marginTop: "0.25rem", display: "block" }}>{forgotErrors.email}</span>}
              </label>
              <button type="submit" style={buttonStyle}>Bağlantı gönder</button>
              <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                <a style={{ color: "#2563eb", cursor: "pointer", textDecoration: "underline" }} onClick={() => go("login")}>← Girişe dön</a>
              </div>
            </form>
          </section>
        )}

        {/* ETKİNLİK DETAY SAYFASI */}
        {page === "detail" && <EventDetail event={selectedEvent} onBack={() => go("events")} onEdit={(id) => go("update", id)} />}

        {/* ETKİNLİK EKLE / GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <EventForm
            mode={page as "add" | "update"}
            initialData={selectedEvent}
            onSubmit={(data) => handleSaveEvent(data || {})}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}