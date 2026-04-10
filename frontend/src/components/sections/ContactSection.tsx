import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";

import { contactLinks } from "../../data/portfolio";
import { FadeUpBlock } from "../effects/FadeUpBlock";
import { SplitReveal } from "../effects/SplitReveal";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: ""
};

export function ContactSection() {
  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
    []
  );
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    if (form.name.trim().length < 2) {
      return "Please enter your name.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Please enter a valid email.";
    }
    if (form.message.trim().length < 20) {
      return "Please add a message with a little more detail.";
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationMessage = validate();

    if (validationMessage) {
      setStatus({ type: "error", message: validationMessage });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      };

      let response = await fetch(`${apiBaseUrl}/send-email`, requestConfig);

      if (response.status === 404) {
        response = await fetch(`${apiBaseUrl}/contact`, requestConfig);
      }

      const payload = (await response.json()) as { success?: boolean; message?: string; detail?: string };

      if (!response.ok) {
        throw new Error(payload.message || payload.detail || "Message delivery failed.");
      }

      setStatus({
        type: "success",
        message: payload.message || "Message sent successfully."
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please email Anshul directly."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-white/[0.05] bg-[#020202] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[92rem]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,2,2,0.98),rgba(2,2,2,0.96))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_62%)]" />
        <div className="relative">
        <FadeUpBlock>
          <p className="text-[11px] uppercase tracking-[0.48em] text-zinc-500">Contact</p>
        </FadeUpBlock>

        <SplitReveal
          as="h2"
          text="If the portfolio now feels like a product, the next move is a conversation."
          className="mt-5 max-w-6xl font-display text-4xl leading-[0.9] text-white sm:text-5xl lg:text-[5rem]"
        />

        <FadeUpBlock className="mt-6 max-w-3xl" delay={120}>
          <p className="text-lg leading-9 text-zinc-300">
            The contact flow is still wired to a real backend API, but the presentation now matches the darker editorial direction across the site.
          </p>
        </FadeUpBlock>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {contactLinks.map((link) => {
            const Icon =
              link.label === "Email"
                ? Mail
                : link.label === "Location"
                  ? MapPin
                  : link.label === "GitHub"
                    ? Github
                    : Linkedin;

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                data-cursor={link.label}
                className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-black/55 p-5 shadow-glass backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-lime-300/25 hover:bg-white/[0.04]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black/70 text-lime-100">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-zinc-400">{link.label}</p>
                  <p className="mt-2 text-sm text-zinc-200">{link.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-black/58 p-6 shadow-glass backdrop-blur-2xl sm:p-8"
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm text-zinc-200">
              Name
              <input
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                data-cursor="Type"
                className="rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-lime-300/40"
                placeholder="Your name"
              />
            </label>

            <label className="grid gap-2 text-sm text-zinc-200">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                data-cursor="Type"
                className="rounded-2xl border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-lime-300/40"
                placeholder="you@example.com"
              />
            </label>

            <label className="grid gap-2 text-sm text-zinc-200">
              Message
              <textarea
                rows={6}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                data-cursor="Type"
                className="rounded-[1.75rem] border border-white/10 bg-black/75 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-lime-300/40"
                placeholder="Tell me about the role, product, or problem you want to solve."
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              data-cursor="Send"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,255,255,0.08)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send size={16} />
              {submitting ? "Sending..." : "Send Message"}
            </button>

            <AnimatePresence mode="wait">
              {status ? (
                <motion.div
                  key={status.message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-lime-300/20 bg-lime-300/10 text-lime-50"
                      : "border-white/12 bg-white/[0.06] text-white"
                  }`}
                >
                  {status.message}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </form>
        </div>
        </div>
      </div>
    </section>
  );
}
