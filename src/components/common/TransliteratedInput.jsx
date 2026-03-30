import React, { useEffect, useState, useRef } from 'react';
import { Input } from './Input';
import { useTransliteration } from '../../hooks/useTransliteration';
import { useDebounce } from '../../hooks/useDebounce';
import { Loader2 } from 'lucide-react';

export const TransliteratedInput = ({
    label,
    value,
    onChange,
    labelMr,
    valueMr,
    onChangeMr,
    isTextArea = false,
    required = false,
    disabled = false,
    placeholder = '',
    placeholderMr = '',
    className = '',
    error,
    errorMr,
    manualTranslate = false,
    translateButtonLabel = 'Translate to Marathi'
}) => {
    const { transliterate, loading } = useTransliteration();
    const debouncedValue = useDebounce(value, 500);
    const [isManuallyEdited, setIsManuallyEdited] = useState(false);

    // Track previous debounced value to detect changes
    const prevDebouncedValueRef = useRef('');

    useEffect(() => {
        if (manualTranslate) return; // Skip auto transliteration when manual mode is enabled

        // If English value is empty, clear Marathi value
        if (!value) {
            if (valueMr) onChangeMr({ target: { value: '' } });
            prevDebouncedValueRef.current = '';
            return;
        }

        // Only transliterate if:
        // 1. Not disabled
        // 2. English value changed (debounced)
        // 3. Marathi value is empty OR (we want to update it) - Removing "isManuallyEdited" check for now to enforce "change when English changes" rule requested by user
        //    User said: "if i change or remove the english name or retype new text try to make chnage sin mr field as well"
        //    So we should update Marathi field whenever English field stabilizes, unless we want to be strict about manual edits.
        //    Let's stick to: if English changes, we update Marathi. Manual edits to Marathi persist until English changes again.

        if (debouncedValue && debouncedValue !== prevDebouncedValueRef.current && !disabled) {
            transliterate(debouncedValue).then(transliteratedText => {
                onChangeMr({ target: { value: transliteratedText } });
            });
            prevDebouncedValueRef.current = debouncedValue;
        }
    }, [debouncedValue, disabled, manualTranslate, onChangeMr, transliterate, value, valueMr]);

    const handleTranslateClick = async () => {
        if (!value || disabled) return;
        const transliteratedText = await transliterate(value);
        onChangeMr({ target: { value: transliteratedText } });
        setIsManuallyEdited(false);
    };

    // When manualTranslate is true, show a three-column layout (EN | button | MR) on desktop, stacked on mobile.
    if (manualTranslate) {
        return (
            <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-4 ${className}`}>
                {/* English Input */}
                <div>
                    {isTextArea ? (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                                value={value}
                                onChange={onChange}
                                disabled={disabled}
                                placeholder={placeholder}
                                className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm min-h-[80px] ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                            />
                            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                        </div>
                    ) : (
                        <Input
                            label={label}
                            value={value}
                            onChange={onChange}
                            required={required}
                            disabled={disabled}
                            placeholder={placeholder}
                            error={error}
                        />
                    )}
                </div>

                {/* Translate Button */}
                <div className="flex md:flex-col items-center justify-center gap-2 md:mt-8">
                    <button
                        type="button"
                        onClick={handleTranslateClick}
                        className="px-3 py-2 md:px-4 md:py-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium shadow-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={!value || loading || disabled}
                    >
                        {loading ? 'Translating…' : translateButtonLabel}
                    </button>
                </div>

                {/* Marathi Input */}
                <div className="relative">
                    {isTextArea ? (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex justify-between items-center">
                                <span>{labelMr || `${label} (Marathi)`}</span>
                                {loading && <Loader2 className="h-3 w-3 animate-spin text-blue-500" />}
                            </label>
                            <textarea
                                value={valueMr}
                                onChange={(e) => {
                                    setIsManuallyEdited(true);
                                    onChangeMr(e);
                                }}
                                disabled={disabled}
                                placeholder={placeholderMr || placeholder}
                                className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm min-h-[80px] ${errorMr ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                            />
                            {errorMr && <p className="mt-1 text-sm text-red-500">{errorMr}</p>}
                        </div>
                    ) : (
                        <div className="relative">
                            <Input
                                label={labelMr || `${label} (Marathi)`}
                                value={valueMr}
                                onChange={(e) => {
                                    setIsManuallyEdited(true);
                                    onChangeMr(e);
                                }}
                                disabled={disabled}
                                placeholder={placeholderMr || placeholder}
                                error={errorMr}
                            />
                            {loading && (
                                <div className="absolute right-3 top-9">
                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default auto-transliterate layout
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${className}`}>
            {/* English Input */}
            <div>
                {isTextArea ? (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            placeholder={placeholder}
                            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm min-h-[80px] ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        />
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </div>
                ) : (
                    <Input
                        label={label}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        error={error}
                    />
                )}
            </div>

            {/* Marathi Input */}
            <div className="relative">
                {isTextArea ? (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 flex justify-between items-center">
                            <span>{labelMr || `${label} (Marathi)`}</span>
                            <div className="flex items-center gap-2">
                                {manualTranslate && !disabled && (
                                    <button
                                        type="button"
                                        onClick={handleTranslateClick}
                                        className="text-xs px-2 py-1 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700 transition-colors"
                                        disabled={!value || loading}
                                    >
                                        {translateButtonLabel}
                                    </button>
                                )}
                                {loading && <Loader2 className="h-3 w-3 animate-spin text-blue-500" />}
                            </div>
                        </label>
                        <textarea
                            value={valueMr}
                            onChange={(e) => {
                                setIsManuallyEdited(true);
                                onChangeMr(e);
                            }}
                            disabled={disabled}
                            placeholder={placeholderMr || placeholder}
                            className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm min-h-[80px] ${errorMr ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        />
                        {errorMr && <p className="mt-1 text-sm text-red-500">{errorMr}</p>}
                    </div>
                ) : (
                    <div className="relative">
                        <div className="flex justify-between items-center">
                            <Input
                                label={labelMr || `${label} (Marathi)`}
                                value={valueMr}
                                onChange={(e) => {
                                    setIsManuallyEdited(true);
                                    onChangeMr(e);
                                }}
                                disabled={disabled}
                                placeholder={placeholderMr || placeholder}
                                error={errorMr}
                            />
                            {manualTranslate && !disabled && (
                                <button
                                    type="button"
                                    onClick={handleTranslateClick}
                                    className="ml-2 mt-7 h-10 px-3 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-xs text-slate-700 whitespace-nowrap shadow-sm transition-colors"
                                    disabled={!value || loading}
                                >
                                    {loading ? 'Translating...' : translateButtonLabel}
                                </button>
                            )}
                        </div>
                        {loading && !manualTranslate && (
                            <div className="absolute right-3 top-9">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
