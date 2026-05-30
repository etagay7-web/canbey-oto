-- ============================================================
-- CANBEY OTO TAMİR — Supabase Schema
-- ============================================================

-- ============= TABLES =============

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'Canbey Oto Tamir'),
  ('phone', '+90 552 291 3713'),
  ('email', 'info@canbeyototamir.com'),
  ('address', 'Fatih M. Akif Bulvarı No:317, Bağcılar / İstanbul'),
  ('working_hours', 'Pzt-Cuma: 08:00-19:00, Cmt: 09:00-17:00'),
  ('whatsapp', '905522913713'),
  ('instagram', ''),
  ('facebook', '')
ON CONFLICT (key) DO NOTHING;

CREATE TABLE IF NOT EXISTS hero_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL DEFAULT 'ARACINIZ EMİN ELLERDE',
  subtitle text,
  button1_text text DEFAULT 'Hemen Randevu Al',
  button2_text text DEFAULT 'Hizmetlerimizi Gör',
  badge1 text DEFAULT 'Orijinal Yedek Parça',
  badge2 text DEFAULT 'Garantili İşçilik',
  badge3 text DEFAULT 'Ücretsiz Ekspertiz',
  updated_at timestamptz DEFAULT now()
);

INSERT INTO hero_content (title, subtitle)
SELECT 'ARACINIZ EMİN ELLERDE',
       'İstanbul''da profesyonel oto tamir, bakım ve yedek parça hizmetleri. 20 yılı aşkın tecrübe ile aracınıza uzman dokunuş.'
WHERE NOT EXISTS (SELECT 1 FROM hero_content);

CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  icon text DEFAULT 'Wrench',
  detail_content text,
  price_range text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  title text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text,
  category text DEFAULT 'Atölye',
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  value text NOT NULL,
  order_index integer DEFAULT 0
);

INSERT INTO stats (label, value, order_index)
SELECT * FROM (VALUES
  ('Yıl Tecrübe', '20+', 1),
  ('Araç Tamir', '15.000+', 2),
  ('Müşteri Memnuniyeti', '%98', 3),
  ('Uzman Teknisyen', '50+', 4)
) AS v(label, value, order_index)
WHERE NOT EXISTS (SELECT 1 FROM stats);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  title text,
  specialty text,
  image_url text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  phone text,
  email text,
  car_brand text,
  service_type text,
  appointment_date date,
  message text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============= RLS =============

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read for everything except contact_submissions (admin only)
DROP POLICY IF EXISTS "Public read" ON site_settings;
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON site_settings;
CREATE POLICY "Auth write" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON hero_content;
CREATE POLICY "Public read" ON hero_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON hero_content;
CREATE POLICY "Auth write" ON hero_content FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON services;
CREATE POLICY "Public read" ON services FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON services;
CREATE POLICY "Auth write" ON services FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON testimonials;
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON testimonials;
CREATE POLICY "Auth write" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON gallery;
CREATE POLICY "Public read" ON gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON gallery;
CREATE POLICY "Auth write" ON gallery FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON stats;
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON stats;
CREATE POLICY "Auth write" ON stats FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON team_members;
CREATE POLICY "Public read" ON team_members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON team_members;
CREATE POLICY "Auth write" ON team_members FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read" ON contact_submissions;
CREATE POLICY "Public read" ON contact_submissions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Auth write" ON contact_submissions;
CREATE POLICY "Auth write" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
