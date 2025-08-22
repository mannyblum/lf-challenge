export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Cinema reel animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-spin">
            <div className="absolute inset-2 bg-purple-500/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Film strip dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/60 rounded-full animate-pulse"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${i * 45}deg) translate(24px, -4px)`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            Loading
          </h2>
          <p
            className="text-gray-400 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            Preparing your cinematic experience...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
