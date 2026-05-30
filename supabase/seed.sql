-- ============================================================
-- CANBEY OTO TAMİR — Seed Data
-- ============================================================

-- ============= SERVICES =============
INSERT INTO services (title, description, icon, price_range, order_index, is_active) VALUES
  ('Motor Revizyonu', 'Tam motor revizyonu, segman, sübap ayarı ve performans tuning.', 'Cog', NULL, 1, true),
  ('Şanzıman Tamiri', 'Otomatik, manuel ve CVT şanzıman tamir, bakım, değişim.', 'Settings', NULL, 2, true),
  ('Fren & Amortisör', 'Disk, balata, amortisör, ABS ve süspansiyon servisleri.', 'GaugeCircle', NULL, 3, true),
  ('Elektrik & Elektronik', 'ECU yazılım, OBD-II arıza tespit, alternatör, marş.', 'Zap', NULL, 4, true),
  ('Kaporta & Boya', 'Fırın boya, çekme, lokal tamir, sigorta anlaşmalı.', 'PaintBucket', NULL, 5, true),
  ('Ön Takım & Rot', 'Ön takım yenileme, rot, balans, salıncak ve kapı altı.', 'Wrench', NULL, 6, true),
  ('Periyodik Bakım', 'Yağ, filtre, triger ve marka servis prosedürleri.', 'Droplets', NULL, 7, true),
  ('LPG Montajı', 'TSE belgeli BRC, Lovato, Atiker LPG sistem montajı.', 'Fuel', NULL, 8, true)
ON CONFLICT DO NOTHING;

-- ============= TESTIMONIALS =============
INSERT INTO testimonials (name, title, content, rating, is_active) VALUES
  ('Ahmet Yılmaz', 'BMW 320d Sürücüsü', 'Motor tamirinde inanılmaz işçilik gördüm. Yetkili servisin yarısı fiyatına orijinal parça ile değişim yaptılar. Aracım fabrika çıkışından daha iyi.', 5, true),
  ('Kemal Demir', 'Ford Focus Sahibi', '20 yıldır bu servise gidiyorum. Asla beni hayal kırıklığına uğratmadılar. Dürüst, hızlı ve garantili. Canbey Usta ve ekibine sonsuz teşekkür.', 5, true),
  ('Selin Mutlu', 'Volkswagen Polo Sahibi', 'Kaporta boyasında mükemmel sonuç aldım. Çarpışma izi bile yok. Sigorta süreciyle de baştan sona ilgilendiler. Güvenle gidiyorum.', 5, true)
ON CONFLICT DO NOTHING;

-- ============= TEAM MEMBERS =============
INSERT INTO team_members (name, title, specialty, image_url, order_index, is_active) VALUES
  ('Hasan Canbey', 'Kurucu & Usta Başı', 'Motor & Şanzıman', NULL, 1, true),
  ('Murat Demir', 'Kaporta Şefi', 'Kaporta & Boya', NULL, 2, true),
  ('Selçuk Yıldız', 'Elektrik Uzmanı', 'Beyin & ECU', NULL, 3, true),
  ('İbrahim Kara', 'Lastik & Süspansiyon', 'Rot, balans, amortisör', NULL, 4, true)
ON CONFLICT DO NOTHING;

-- ============= GALLERY (mevcut local fotoğraflar) =============
INSERT INTO gallery (title, category, image_url, order_index, is_active) VALUES
  ('Atölye Dış Cephe', 'Atölye', '/photos/canbey-01.jpeg', 1, true),
  ('Servis Veren Dükkan Görünümü', 'Atölye', '/photos/canbey-02.jpeg', 2, true),
  ('Hizmet Listesi Panosu', 'Atölye', '/photos/canbey-03.jpeg', 3, true),
  ('Müşteri Aracı', 'Servis', '/photos/canbey-04.jpeg', 4, true),
  ('Akşam Vardiyası', 'Atölye', '/photos/canbey-05.jpeg', 5, true)
ON CONFLICT DO NOTHING;
