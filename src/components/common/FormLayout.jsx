import { ArrowLeft } from "lucide-react";
import { Button } from "./Button";

const FormLayout = ({
  title,
  icon: Icon,
  children,
  onSubmit,
  onCancel,
  isEditMode,
  isViewMode,
  loading,
}) => {
  return (
    <div className="space-y-6 mt-2">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3">

        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onCancel}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="h-9 w-9 p-0 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 shadow-sm flex-shrink-0"
        />

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200 flex-shrink-0" />

        {/* Icon */}
        {Icon && (
          <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4.5 w-4.5 text-blue-600" />
          </div>
        )}

        {/* Title */}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-slate-800 leading-tight tracking-tight">
            {isViewMode
              ? `View ${title}`
              : isEditMode
              ? `Edit ${title}`
              : `Add New ${title}`}
          </h1>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xl mt-4 hover:shadow-2xl transition-all duration-300 relative">

        {/* ── Card Header ── */}
        <div className="flex items-stretch bg-blue-500/90">
          
          {/* Tricolor strip */}
          <div className="flex flex-col w-1.5 flex-shrink-0">
            <div className="flex-1 bg-orange-400" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-green-500" />
          </div>

          <div className="px-5 py-3.5">
            <h2 className="text-sm font-semibold text-white/95 uppercase tracking-wide">
              {title} Information
            </h2>
          </div>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-6">
            {children}
          </div>

          {/* ── Footer ── */}
          {!isViewMode ? (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
              
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Fields marked{" "}
                <span className="text-red-500 font-bold mx-0.5">*</span> are required
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isLoading={loading}
                >
                  {isEditMode ? `Update ${title}` : `Create ${title}`}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Back
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormLayout;