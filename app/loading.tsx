export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="text-center mb-12">
          <div className="h-3 w-32 bg-[#E8E8EC] mx-auto mb-4 rounded" />
          <div className="h-14 w-2/3 bg-[#E8E8EC] mx-auto mb-3 rounded" />
          <div className="h-4 w-1/2 bg-[#E8E8EC] mx-auto rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="h-8 w-40 bg-[#E8E8EC] rounded" />
            <div className="h-16 bg-[#E8E8EC] rounded" />
            <div className="h-4 w-3/4 bg-[#E8E8EC] rounded" />
            <div className="flex gap-3">
              <div className="h-12 w-36 bg-[#E63946]/30 rounded" />
              <div className="h-12 w-36 bg-[#E8E8EC] rounded" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-20 bg-[#E8E8EC] rounded" />
            <div className="h-20 bg-[#E8E8EC] rounded" />
            <div className="h-20 bg-[#E8E8EC] rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#E8E8EC] h-40 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
