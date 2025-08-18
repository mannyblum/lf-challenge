export default function Loading() {
  return (
    <div className="relative animate-pulse">
      <div className="bg-slate-800 h-20 mb-8" />
      <div className="container mx-auto ">
        <div className="my-8">
          <div className="bg-slate-800 rounded-xl h-8 w-96 mb-2" />
          <div className="bg-slate-800 rounded-xl h-5 w-50" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <div className="bg-slate-800 rounded-xl h-80 mb-4" />
              <div className="bg-slate-800 rounded h-4 mb-2" />
              <div className="bg-slate-800 rounded h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
