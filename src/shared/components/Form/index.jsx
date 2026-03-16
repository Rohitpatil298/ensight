export function Form({ onSubmit, children, className = '' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  );
}

export function FormField({ label, error, children, required = false }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
