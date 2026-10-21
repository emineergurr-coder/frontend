import React, { useState, useEffect } from "react";
import { CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  mode: "add" | "update";
  initialData?: CampusEvent;
  onSubmit: (formData: any) => void;
}

function EventForm({ mode, initialData, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        date: initialData.date,
        time: initialData.time,
        location: initialData.location,
        capacity: initialData.capacity ? String(initialData.capacity) : "",
        description: initialData.description,
      });
    } else {
      setFormData({ title: "", category: "", date: "", time: "", location: "", capacity: "", description: "" });
    }
    setErrors({});
    setSubmittedData(null);
  }, [mode, initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (formData.title.trim().length < 3) newErrors.title = "Etkinlik adı en az 3 karakter olmalı.";
    if (!formData.category) newErrors.category = "Lütfen bir kategori seçin.";
    if (!formData.date) newErrors.date = "Tarih alanı zorunludur.";
    if (!formData.time) newErrors.time = "Saat alanı zorunludur.";
    if (!formData.location.trim()) newErrors.location = "Yer bilgisi girilmelidir.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const resultObj = {
        id: mode === "update" && initialData ? initialData.id : "event-new",
        title: formData.title.trim(),
        category: formData.category,
        date: formData.date,
        time: formData.time,
        location: formData.location.trim(),
        capacity: formData.capacity ? Number(formData.capacity) : null,
        description: formData.description.trim(),
      };
      setSubmittedData(resultObj);
      onSubmit(resultObj);
    }
  }

  return (
    <section className="form">
      <h2>{mode === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Etkinlik Adı *</label>
          <input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          {errors.title && <span className="hata-mesaji">{errors.title}</span>}
        </div>
        <div>
          <label htmlFor="category">Kategori *</label>
          <select id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
          </select>
          {errors.category && <span className="hata-mesaji">{errors.category}</span>}
        </div>
        <div>
          <label htmlFor="date">Tarih *</label>
          <input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          {errors.date && <span className="hata-mesaji">{errors.date}</span>}
        </div>
        <div>
          <label htmlFor="time">Saat *</label>
          <input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          {errors.time && <span className="hata-mesaji">{errors.time}</span>}
        </div>
        <div>
          <label htmlFor="location">Yer *</label>
          <input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          {errors.location && <span className="hata-mesaji">{errors.location}</span>}
        </div>
        <div>
          <label htmlFor="description">Açıklama</label>
          <textarea id="description" rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </div>
        <br />
        <button type="submit">{mode === "add" ? "Kaydet" : "Güncelle"}</button>
      </form>
      {submittedData && (
        <div className="basari-kutusu">
          <p><strong>Etkinlik {mode === "add" ? "oluşturuldu" : "güncellendi"}:</strong></p>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

export default EventForm;