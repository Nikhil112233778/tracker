export default function DashboardLoading() {
  return (
    <div className="min-h-screen pb-28">
      <div className="max-w-md mx-auto p-4">
        {/* Header Skeleton */}
        <header className="mb-6">
          <div className="h-9 w-40 bg-surface-hover rounded-lg animate-pulse mb-2" />
          <div className="h-5 w-32 bg-surface-hover rounded-lg animate-pulse" />
        </header>

        {/* Job Cards Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-surface-hover rounded-xl animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-32 bg-surface-hover rounded animate-pulse" />
                      <div className="h-4 w-40 bg-surface-hover rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-20 bg-surface-hover rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="h-3 w-24 bg-surface-hover rounded animate-pulse" />
                    <div className="h-3 w-16 bg-surface-hover rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
