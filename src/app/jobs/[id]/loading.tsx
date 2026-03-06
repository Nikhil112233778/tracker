export default function JobDetailLoading() {
  return (
    <div className="min-h-screen bg-background pb-44">
      <div className="max-w-md mx-auto">
        {/* Top Bar Skeleton */}
        <div className="sticky top-0 bg-background z-10 px-4 py-3 flex items-center justify-between border-b border-border">
          <div className="w-8 h-8 bg-surface-hover rounded-lg animate-pulse" />
          <div className="w-20 h-6 bg-surface-hover rounded-full animate-pulse" />
          <div className="w-8 h-8 bg-surface-hover rounded-lg animate-pulse" />
        </div>

        {/* Company Hero Skeleton */}
        <div className="px-4 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-surface-hover rounded-2xl animate-pulse" />
          </div>
          <div className="h-8 w-48 mx-auto bg-surface-hover rounded-lg animate-pulse mb-2" />
          <div className="h-5 w-32 mx-auto bg-surface-hover rounded-lg animate-pulse" />
        </div>

        <div className="px-4 space-y-4">
          {/* HR Contact Card Skeleton */}
          <div className="card">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-hover animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-surface-hover rounded animate-pulse" />
                <div className="h-4 w-40 bg-surface-hover rounded animate-pulse" />
                <div className="h-4 w-48 bg-surface-hover rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Timeline Skeleton */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-16 bg-surface-hover rounded animate-pulse" />
              <div className="h-3 w-20 bg-surface-hover rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-surface-hover animate-pulse mt-1.5" />
                    {i < 3 && <div className="w-0.5 h-full bg-surface-hover mt-1" />}
                  </div>
                  <div className="flex-1 pb-6 space-y-2">
                    <div className="h-4 w-24 bg-surface-hover rounded animate-pulse" />
                    <div className="h-12 w-full bg-surface-hover rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
