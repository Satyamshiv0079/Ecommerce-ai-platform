export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header Skeleton */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-4 animate-pulse">
        <div className="bg-gray-200 h-6 w-32 mx-auto rounded-full"></div>
        <div className="bg-gray-200 h-10 w-64 mx-auto rounded-xl"></div>
        <div className="bg-gray-200 h-4 w-80 mx-auto rounded-lg"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm space-y-4 p-4 animate-pulse">
            <div className="bg-gray-200 h-48 w-full rounded-lg"></div>
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="bg-gray-200 h-6 w-20 rounded"></div>
              <div className="bg-gray-200 h-8 w-8 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
