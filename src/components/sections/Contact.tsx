"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ContactSection } from "@/lib/types";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import Parallax from "@/components/ui/Parallax";
import { SERVICE_OPTIONS } from "@/lib/contact-form";

const selectChevronStyle = {
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%229%22 viewBox=%220 0 14 9%22 fill=%22none%22><path d=%22M1 1.5L7 7.5L13 1.5%22 stroke=%22%23203a42%22 stroke-width=%221.6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')",
  backgroundPosition: "right 0.25rem center",
  backgroundRepeat: "no-repeat",
};

export default function Contact({ content }: { content: ContactSection }) {
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
          <p className="section-label ">{content.label}</p>
          <SplitReveal className="display-serif mt-2 text-[30px] md:text-[50px] leading-[normal]">
            {content.heading}
          </SplitReveal>
          <RichText
            html={content.paragraph}
            className="mt-2 max-w-md text-[16px] text-white leading-[normal]"
          />
        </div>
      </motion.div>

      <div className="flex items-center px-5 md:px-6 py-10 md:px-14 lg:py-20">
        <form className="w-full max-w-xl">
          <label className="block">
            <span className="text-[16px] font-bold">Your Name</span>
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              className="input-line mt-2"
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
              />
            </label>
            <label className="block">
              <span className="text-[16px] font-bold">Service Type</span>
              <select
                name="service"
                defaultValue=""
                className="input-line mt-2 appearance-none"
                style={selectChevronStyle}
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[16px] font-bold">Date &amp; Time</span>
              <input
                type="date"
                name="dateTime"
                className="input-line mt-2"
              />
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
            />
          </label>

          <button
            type="submit"
            className="btn-3d mt-10 rounded-full bg-aqua px-8 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:bg-ink hover:text-white"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
