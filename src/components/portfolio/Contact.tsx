import { useState, FormEvent, useId, ChangeEvent } from "react";
import { Check, Paperclip, Loader2, X, AlertCircle } from "lucide-react";
import SocialFooter from "./SocialFooter";
import { sendContactEmail } from "@/lib/contact-server";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
];
const MAX_SIZE_MB = 5;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const typeId = useId();
  const budgetId = useId();
  const detailsId = useId();
  const fileId = useId();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`File exceeds maximum size of ${MAX_SIZE_MB}MB.`);
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Invalid format. Please upload PDF, Word Doc, TXT, or Image.");
      setSelectedFile(null);
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError(null);
    const input = document.getElementById(fileId) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const formEl = e.currentTarget;
      const formData = new FormData(formEl);

      const res = await sendContactEmail({ data: formData });

      if (res.success) {
        setSent(true);
        formEl.reset();
        setSelectedFile(null);
        setTimeout(() => setSent(false), 5000);
      } else {
        setErrorMsg(res.error || "Failed to send message.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Let's Build</p>
          <h2 className="mt-3 font-display text-5xl font-bold text-white md:text-7xl">
            Hire Me
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-[1.6] text-white/60">
            Have a fullstack build or an AI automation idea? Drop the details and optional project scope file.
          </p>
        </div>

        <form onSubmit={submit} className="glass-panel space-y-5 rounded-3xl p-8 md:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name *" htmlFor={nameId}>
              <input id={nameId} name="name" required className={inputCls} placeholder="Your name" autoComplete="name" />
            </Field>
            <Field label="Email Address *" htmlFor={emailId}>
              <input id={emailId} name="email" required type="email" className={inputCls} placeholder="you@company.com" autoComplete="email" />
            </Field>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Project Type" htmlFor={typeId}>
              <select id={typeId} name="projectType" className={inputCls} defaultValue="">
                <option value="" disabled>Select…</option>
                <option>Fullstack Project</option>
                <option>AI Automation</option>
                <option>Full-time Hire</option>
              </select>
            </Field>
            <Field label="Budget Range" htmlFor={budgetId}>
              <select id={budgetId} name="budget" className={inputCls} defaultValue="">
                <option value="" disabled>Select…</option>
                <option>$1k – $5k</option>
                <option>$5k – $15k</option>
                <option>$15k+</option>
              </select>
            </Field>
          </div>
          <Field label="Project Details" htmlFor={detailsId}>
            <textarea id={detailsId} name="details" rows={4} className={inputCls} placeholder="Tell me about the project specifications, goals, or timelines…" />
          </Field>

          {/* Secure File Upload Field */}
          <Field label="Attach Scope Document / Design (Optional - Max 5MB)" htmlFor={fileId}>
            <div className="relative">
              <input
                id={fileId}
                name="file"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
                className="hidden"
              />
              {!selectedFile ? (
                <label
                  htmlFor={fileId}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3.5 text-xs text-white/70 transition-all hover:border-violet hover:bg-white/10 hover:text-white"
                >
                  <Paperclip className="h-4 w-4 text-violet" />
                  <span>Upload Scope File (PDF, DOCX, TXT, Images)</span>
                </label>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-violet/40 bg-violet/10 px-4 py-3 text-xs text-white">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Paperclip className="h-4 w-4 shrink-0 text-cyan" />
                    <span className="truncate font-medium">{selectedFile.name}</span>
                    <span className="shrink-0 text-white/40">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="ml-2 rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {fileError && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                {fileError}
              </p>
            )}
          </Field>

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || sent}
            aria-label={sent ? "Message sent successfully" : "Send message"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-4 font-display text-sm font-semibold text-white transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(166,61,64,0.45),0_16px_64px_rgba(166,61,64,0.18)] disabled:opacity-70 motion-reduce:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Sending...
              </span>
            ) : sent ? (
              <span role="status" aria-live="polite" className="flex items-center gap-2 text-cyan">
                <Check className="h-4 w-4" /> Message sent to uzairy099@gmail.com!
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="mt-14 flex flex-col items-center gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <a href="mailto:uzairy099@gmail.com" className="hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet">uzairy099@gmail.com</a>
            <span className="text-white/20">·</span>
            <a href="https://github.com/uzair0100" target="_blank" rel="noreferrer" className="hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet">github.com/uzair0100</a>
            <span className="text-white/20">·</span>
            <a href="https://www.linkedin.com/in/uzair-younis-347438364/" target="_blank" rel="noreferrer" className="hover:text-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet">LinkedIn</a>
          </div>

          <SocialFooter />

          <p className="text-xs text-white/40">© 2026 Uzair Younis — built with Sora & caffeine.</p>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] placeholder:text-white/30 focus:border-violet focus:shadow-[0_0_0_4px_rgba(166,61,64,0.25)] [&>option]:bg-[#1a1414] [&>option]:text-white";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block text-xs uppercase tracking-widest text-white/50">{label}</span>
      {children}
    </label>
  );
}
