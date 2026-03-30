import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const formatDisplay = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const DatePicker = React.forwardRef(({
  label,
  error,
  value,
  onChange,
  placeholder = 'Select date',
  min,
  max,
  disabled,
  required,
  className,
}, ref) => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value ? new Date(value).getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? new Date(value).getMonth() : today.getMonth());
  const [mode, setMode] = useState('day'); // 'day' | 'month' | 'year'
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setMode('day');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      setViewYear(new Date(value).getFullYear());
      setViewMonth(new Date(value).getMonth());
    }
  }, [value]);

  const selectedDate = value ? new Date(value) : null;
  const minDate = min ? new Date(min) : null;
  const maxDate = max ? new Date(max) : null;

  const isDisabledDate = (year, month, day) => {
    const d = new Date(year, month, day);
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  const selectDate = (year, month, day) => {
    if (isDisabledDate(year, month, day)) return;
    const d = new Date(year, month, day);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    onChange?.(iso);
    setOpen(false);
    setMode('day');
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Year range for year picker
  const yearStart = Math.floor(viewYear / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => yearStart + i);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input trigger */}
      <div
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 cursor-pointer',
          'focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500',
          open && 'ring-2 ring-blue-500/20 border-blue-500',
          error && 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20',
          disabled && 'cursor-not-allowed opacity-50 bg-slate-50',
        )}
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span className={cn('flex-1', !value && 'text-slate-400')}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <CalendarDays className={cn('h-4 w-4 flex-shrink-0', open ? 'text-blue-500' : 'text-slate-400')} />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {/* Dropdown Calendar */}
      {open && (
        <div className="absolute z-50 mt-1.5 w-72 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">

          {/* ── Day View ── */}
          {mode === 'day' && (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800">
                <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setMode('month')}
                  className="text-sm font-semibold text-white hover:text-blue-300 transition-colors"
                >
                  {MONTHS[viewMonth]} {viewYear}
                </button>
                <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-100">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 p-2 gap-0.5">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const isSelected = selectedDate &&
                    selectedDate.getFullYear() === viewYear &&
                    selectedDate.getMonth() === viewMonth &&
                    selectedDate.getDate() === day;
                  const isToday =
                    today.getFullYear() === viewYear &&
                    today.getMonth() === viewMonth &&
                    today.getDate() === day;
                  const isOff = isDisabledDate(viewYear, viewMonth, day);

                  return (
                    <button
                      key={day}
                      onClick={() => selectDate(viewYear, viewMonth, day)}
                      disabled={isOff}
                      className={cn(
                        'h-8 w-full rounded-lg text-xs font-medium transition-all duration-150',
                        isSelected && 'bg-blue-600 text-white shadow-md',
                        !isSelected && isToday && 'border border-blue-400 text-blue-600 font-bold',
                        !isSelected && !isToday && !isOff && 'text-slate-700 hover:bg-blue-50 hover:text-blue-600',
                        isOff && 'text-slate-300 cursor-not-allowed',
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Today button */}
              <div className="px-3 pb-3">
                <button
                  onClick={() => {
                    setViewYear(today.getFullYear());
                    setViewMonth(today.getMonth());
                    selectDate(today.getFullYear(), today.getMonth(), today.getDate());
                  }}
                  className="w-full py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors border border-blue-200"
                >
                  Today
                </button>
              </div>
            </>
          )}

          {/* ── Month View ── */}
          {mode === 'month' && (
            <>
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800">
                <button onClick={() => setViewYear(y => y - 1)} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => setMode('year')} className="text-sm font-semibold text-white hover:text-blue-300 transition-colors">
                  {viewYear}
                </button>
                <button onClick={() => setViewYear(y => y + 1)} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => { setViewMonth(i); setMode('day'); }}
                    className={cn(
                      'py-2 rounded-lg text-xs font-medium transition-all',
                      viewMonth === i ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                    )}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Year View ── */}
          {mode === 'year' && (
            <>
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800">
                <button onClick={() => setViewYear(y => y - 12)} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-white">{yearStart} – {yearStart + 11}</span>
                <button onClick={() => setViewYear(y => y + 12)} className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => { setViewYear(y); setMode('month'); }}
                    className={cn(
                      'py-2 rounded-lg text-xs font-medium transition-all',
                      viewYear === y ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;