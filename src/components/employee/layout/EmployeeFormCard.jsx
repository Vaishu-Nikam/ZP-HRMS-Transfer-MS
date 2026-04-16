const EmployeeFormCard = ({
  title,
  children,
  onNext,
  onPrev,
  onCancel,
  isFirst,
  isLast,
}) => {
  return (
    <div className="mt-10 rounded-2xl border border-slate-200 overflow-visible bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
      
      {/* 🔷 Header strip */}
      <div className="flex items-stretch bg-blue-500/90">
        
        {/* Tricolor */}
        <div className="flex flex-col w-1.5">
          <div className="flex-1 bg-orange-400" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-green-500" />
        </div>

        <div className="px-5 py-3.5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            {title}
          </h2>
        </div>
      </div>

      {/* 🔷 Body */}
      <div className="p-6 space-y-6">
        {children}
      </div>

      {/* 🔥 Footer Buttons */}
      <div className="flex justify-between px-6 py-4 bg-slate-50 border-t">
        
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="btn-secondary disabled:opacity-50"
        >
          मागे
        </button>

        <div className="flex gap-3">
          
          {/* Cancel */}
          <button onClick={onCancel} className="btn-danger">
            रद्द करा
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={isLast}
            className="btn-primary disabled:opacity-50"
          >
            {isLast ? "जतन करा" : "पुढे"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EmployeeFormCard;