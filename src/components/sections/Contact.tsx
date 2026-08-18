"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import type { ContactSection } from "@/lib/types";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import Parallax from "@/components/ui/Parallax";
import { SERVICE_OPTIONS } from "@/lib/contact-form";
import { trackLeadConversion } from "@/lib/google-ads";

const selectChevronStyle = {
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%229%22 viewBox=%220 0 14 9%22 fill=%22none%22><path d=%22M1 1.5L7 7.5L13 1.5%22 stroke=%22%23203a42%22 stroke-width=%221.6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')",
  backgroundPosition: "right 0.25rem center",
  backgroundRepeat: "no-repeat",
};

export default function Contact({ content }: { content: ContactSection }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      service: formData.get("service")?.toString().trim() || "",
      dateTime: formData.get("dateTime")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message.");
      }
    trackLeadConversion();
      setStatus({
        type: "success",
        message:
          result.message ||
          "Thank you! Your message has been sent successfully.",
      });

      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="grid bg-mist lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]"
      >
        <Parallax speed={0.12} className="absolute inset-0">
          {content.image ? (
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </Parallax>

        <div className="absolute bottom-0 left-0 p-8 text-white md:p-12 md:pl-24">
          <p className="section-label">{content.label}</p>

          <SplitReveal className="display-serif mt-2 text-[30px] leading-[normal] md:text-[50px]">
            {content.heading}
          </SplitReveal>

          <RichText
            html={content.paragraph}
            className="mt-2 max-w-md text-[16px] leading-[normal] text-white"
          />
        </div>
      </motion.div>

      <div className="flex items-center px-5 py-10 md:px-14 md:py-20">
        <form onSubmit={handleSubmit} className="w-full max-w-xl">
          <label className="block">
            <span className="text-[16px] font-bold">Your Name</span>

            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              className="input-line mt-2"
              disabled={isSubmitting}
            />
          </label>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <label className="block">
              <span className="text-[16px] font-bold">Email</span>

              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@example.com"
                className="input-line mt-2"
                disabled={isSubmitting}
              />
            </label>

            <label className="block">
              <span className="text-[16px] font-bold">Phone Number</span>

              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="000-000-0000"
                className="input-line mt-2"
                disabled={isSubmitting}
              />
            </label>

            <label className="block sm:col-[1_/_span_2]">
              <span className="text-[16px] font-bold">Service Type</span>

              <select
                name="service"
                defaultValue=""
                className="input-line mt-2 appearance-none"
                style={selectChevronStyle}
                disabled={isSubmitting}
              >
                <option value="">Select a service</option>

                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-10 block">
            <span className="text-[16px] font-bold">Message</span>

            <textarea
              required
              rows={3}
              name="message"
              placeholder="Your Message"
              className="input-line mt-2 resize-none"
              disabled={isSubmitting}
            />
          </label>

          {status ? (
            <div
              role="alert"
              className={`mt-6 rounded-xl px-5 py-4 text-sm ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-3d mt-10 rounded-full bg-aqua px-8 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "SUBMIT YOUR REQUEST"}
          </button>
        </form>
      </div>
    </section>
  );
}
