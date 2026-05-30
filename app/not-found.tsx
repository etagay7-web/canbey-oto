import Link from "next/link";
import { Home, ArrowLeft, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F9] px-6 pt-32 pb-20">
      <div className="text-center max-w-xl">
        <div className="font-display text-[140px] sm:text-[200px] leading-none text-[#E63946] mb-2">
          404
        </div>
        <div className="tag mb-5 inline-flex">
          <span>Sayfa Bulunamadı</span>
        </div>
        <h1 className="headline font-display text-3xl sm:text-4xl text-[#14141A] mb-3">
          ARANAN SAYFA <span className="text-[#E63946]">SERVİSTE YOK</span>
        </h1>
        <p className="text-[#5A5A66] mb-8 max-w-md mx-auto">
          Bu sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Home size={14} strokeWidth={2.5} />
            Ana Sayfa
          </Link>
          <Link href="/iletisim" className="btn btn-outline">
            <MessageCircle size={14} strokeWidth={2.5} />
            İletişim
          </Link>
        </div>
      </div>
    </section>
  );
}
