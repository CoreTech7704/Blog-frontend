export default function TermsPolicyModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">
            Terms & Privacy Policy
          </h2>
          <button
            onClick={onClose}
            aria-label="Close terms and privacy policy"
            className="text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4 text-sm text-slate-300 space-y-4">
          <section>
            <h3 className="font-semibold text-white mb-1">
              1. Terms of Service
            </h3>
            <p>
              By using this application, you agree to comply with our terms and
              conditions. You are responsible for maintaining the
              confidentiality of your account and password.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-white mb-1">2. Privacy Policy</h3>
            <p>
              We collect only the information necessary to provide our services.
              Your personal data is securely stored and protected.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-white mb-1">
              3. Data Usage & Security
            </h3>
            <p>
              We do not sell, trade, or share your personal information with
              third parties. All authentication data is encrypted.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-white mb-1">4. Updates</h3>
            <p>
              These terms may be updated from time to time. Continued use of the
              service indicates acceptance of the updated terms.
            </p>
          </section>

          <p className="text-xs text-slate-500">Last updated: Feb 2026</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm bg-white/10 text-white hover:bg-white/20 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
