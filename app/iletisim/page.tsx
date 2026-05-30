import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim - Bize Ulaşın",
  description:
    "Canbey Oto Tamir ile iletişime geçin. WhatsApp, telefon, e-posta ve haritada konum bilgilerimiz.",
};

export default function IletisimPage() {
  return (
    <>
      <section className="bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="tag mb-4 inline-flex">
            <MessageCircle size={11} />
            <span>İletişim</span>
          </div>
          <h1 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-[#14141A] mb-4">
            BİZE ULAŞIN
          </h1>
          <p className="text-[#5A5A66] max-w-2xl text-base sm:text-lg">
            Aracınız için WhatsApp&apos;tan yazın veya hemen arayın. Bağcılar /
            İstanbul&apos;daki atölyemizi ziyaret edebilirsiniz.
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
