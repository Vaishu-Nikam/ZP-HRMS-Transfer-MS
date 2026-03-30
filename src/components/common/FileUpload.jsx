import React, { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { MediaViewer } from './MediaViewer';
import toast from 'react-hot-toast';

/**
 * Reusable File Upload Component
 * Supports single/multiple file uploads with preview
 * 
 * @param {Object} props
 * @param {boolean} props.multiple - Allow multiple file uploads
 * @param {string[]} props.accept - Accepted file types (e.g., ['image/jpeg', 'image/png', 'application/pdf'])
 * @param {number} props.maxSize - Max file size in bytes (default: 2MB)
 * @param {Function} props.onChange - Callback when files change
 * @param {File[]} props.value - Current file(s)
 * @param {string} props.label - Label for the upload area
 * @param {string} props.helperText - Helper text below label
 * @param {boolean} props.disabled - Disable upload
 * @param {boolean} props.required - Mark as required
 * @param {string[]} props.existingFiles - URLs of existing files to display
 * @param {Function} props.onRemoveExisting - Callback when removing existing file
 */
export const FileUpload = ({
  multiple = false,
  accept = ['image/jpeg', 'image/png', 'application/pdf'],
  maxSize = 2 * 1024 * 1024, // 2MB default
  onChange,
  value = [],
  label,
  helperText,
  disabled = false,
  required = false,
  existingFiles = [],
  onRemoveExisting
}) => {
  const [dragActive, setDragActive] = useState(false);

  const acceptString = accept.join(',');
  const files = Array.isArray(value) ? value : value ? [value] : [];

  const validateFile = (file) => {
    // Check file type
    if (!accept.includes(file.type)) {
      const acceptedTypes = accept.map(type => type.split('/')[1].toUpperCase()).join(', ');
      toast.error(`Invalid file type. Accepted: ${acceptedTypes}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(validateFile);
    
    if (validFiles.length === 0) return;

    if (multiple) {
      onChange([...files, ...validFiles]);
    } else {
      onChange(validFiles[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    if (multiple) {
      onChange(files.filter((_, i) => i !== index));
    } else {
      onChange(null);
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}

      {/* Upload Area */}
      {!disabled && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 md:p-6 transition-all duration-200 group ${
            dragActive
              ? 'border-blue-500 bg-blue-50 scale-[0.99]'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple={multiple}
            accept={acceptString}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            disabled={disabled}
          />
          
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                <Upload className="h-6 w-6 text-slate-500 group-hover:text-blue-500" />
            </div>
            <div className="mt-2">
              <label className="cursor-pointer relative z-20">
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>
                <span className="text-sm text-slate-500"> or drag and drop</span>
              </label>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {accept.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {(maxSize / (1024 * 1024)).toFixed(1)}MB
            </p>
          </div>
        </div>
      )}

      {/* Existing Files Preview */}
      {existingFiles.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">Current Files</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {existingFiles.map((fileUrl, index) => (
              <div key={index} className="flex items-center justify-between p-2 pr-3 bg-white rounded-lg border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <MediaViewer
                        src={fileUrl}
                        alt={`Existing file ${index + 1}`}
                        variant="thumbnail"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">File {index + 1}</p>
                  </div>
                </div>
                {onRemoveExisting && !disabled && (
                  <button
                    type="button"
                    onClick={() => onRemoveExisting(index)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Files Preview */}
      {files.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700">
            {existingFiles.length > 0 ? 'New Files' : 'Selected Files'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file, index) => {
              const preview = getFilePreview(file);
              return (
                <div key={index} className="flex items-center justify-between p-2 pr-3 bg-blue-50/50 rounded-lg border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {preview ? (
                      <img
                        src={preview}
                        alt={file.name}
                        className="h-10 w-10 object-cover rounded-md border border-blue-100 flex-shrink-0"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md flex-shrink-0">
                        {getFileIcon(file)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
