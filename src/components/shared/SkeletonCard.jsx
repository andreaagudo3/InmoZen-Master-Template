/**
 * SkeletonCard — animated placeholder matching PropertyCard dimensions.
 */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-video bg-slate-200" />

      <div className="p-5 space-y-3">
        {/* Badges row */}
        <div className="flex gap-2">
          <div className="h-5 w-14 bg-slate-200 rounded-full" />
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
        </div>
        {/* Title */}
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        {/* Location */}
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        {/* Price */}
        <div className="h-7 bg-slate-200 rounded w-2/5 mt-1" />
        {/* Specs */}
        <div className="flex gap-4 pt-2 border-t border-slate-100">
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-4 bg-slate-200 rounded w-16" />
        </div>
      </div>
    </div>
  )
}
