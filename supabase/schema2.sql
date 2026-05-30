-- ============================================================
-- CANBEY OTO TAMİR — Schema 2: Sayfa İçerikleri
-- ============================================================

CREATE TABLE IF NOT EXISTS pages_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  page text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON pages_content;
CREATE POLICY "Public read" ON pages_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth write" ON pages_content;
CREATE POLICY "Auth write" ON pages_content FOR ALL USING (auth.role() = 'authenticated');

-- Varsayılan içerikler
INSERT INTO pages_content (page, content) VALUES
  ('hakkimizda', '{
    "title":"HAKKIMIZDA",
    "subtitle":"1998''den bu yana İstanbul Bağcılar''da güvenilir oto tamir hizmeti",
    "story":"Canbey Oto Tamir, 1998 yılında küçük bir atölye olarak yola çıktı. Bugün 50+ uzman teknisyeni ve modern ekipmanlarıyla İstanbul''un en güvenilir oto servislerinden biri haline geldi.",
    "mission":"Müşterilerimizin araçlarını en iyi şekilde tamir ederek güvenli bir sürüş deneyimi sunmak.",
    "vision":"Türkiye''nin en güvenilir ve yenilikçi oto tamir zinciri olmak."
  }'::jsonb),
  ('hizmetler', '{
    "title":"HİZMETLERİMİZ",
    "subtitle":"Her marka ve model araç için profesyonel tamir ve bakım hizmetleri"
  }'::jsonb),
  ('galeri', '{
    "title":"GALERİ",
    "subtitle":"Atölyemizden gerçek görüntüler. Bağcılar / İstanbul''da tüm marka araç servisi."
  }'::jsonb),
  ('iletisim', '{
    "title":"BİZE ULAŞIN",
    "subtitle":"Aracınız için WhatsApp''tan yazın veya hemen arayın. Bağcılar / İstanbul''daki atölyemizi ziyaret edebilirsiniz."
  }'::jsonb),
  ('anasayfa', '{
    "title":"ARACINIZ EMİN ELLERDE",
    "subtitle":"İstanbul''da profesyonel oto tamir, bakım ve yedek parça hizmetleri. 20 yılı aşkın tecrübe ile aracınıza uzman dokunuş.",
    "whyus_title":"NEDEN CANBEY OTO?",
    "whyus_items":"Sertifikalı Teknisyenler,Orijinal Parça Garantisi,Sigorta Anlaşmalı,7/24 Yol Yardım,Online Randevu"
  }'::jsonb)
ON CONFLICT (page) DO NOTHING;
