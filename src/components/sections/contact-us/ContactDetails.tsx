"use client";

import Image from "next/image";
import type { ContactInfoSection, SiteSettings } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import SplitReveal from "@/components/ui/SplitReveal";
import { SERVICE_OPTIONS } from "@/lib/contact-form";

const fieldClass =
  "mt-2 w-full rounded-full bg-[#fff] px-6 py-3.5 text-[15px] text-ink placeholder:text-slate-body/60 outline-none ring-1 ring-transparent transition focus:ring-aqua";
const selectClass = `${fieldClass} appearance-none bg-no-repeat`;
const selectChevronStyle = {
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%229%22 viewBox=%220 0 14 9%22 fill=%22none%22><path d=%22M1 1.5L7 7.5L13 1.5%22 stroke=%22%23203a42%22 stroke-width=%221.6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')",
  backgroundPosition: "right 1.5rem center",
};

export default function ContactDetails({
  content,
  settings,
}: {
  content: ContactInfoSection;
  settings: SiteSettings;
}) {
  return (
    <section className="px-5 py-10 md:px-6 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-[850px]">
            <Reveal from="left">
              <p className="section-label">{content.label}</p>
            </Reveal>
            <SplitReveal
              delay={0.1}
              html={content.heading}
              className="mt-1 text-[30px] font-bold leading-[normal] md:text-[40px]"
            />
            <Reveal delay={0.2} from="left">
              <RichText
                html={content.paragraph}
                className="mt-6 max-w-[600px] leading-[normal]"
              />
            </Reveal>

            {settings.phone ? (
              <Reveal
                delay={0.25}
                from="left"
                className="mt-8 flex items-center gap-4"
              >
                <span className="grid h-[65px] w-[65px] shrink-0 place-items-center rounded-full bg-aqua text-ink">
                  <Image
                    src="/images/call-icon.svg"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="tracking-[0.1em]">Call Us</p>
                  <a
                    href={settings.phoneHref}
                    className="text-[20px] hover:text-teal-text text-[18px] font-bold leading-[normal] md:text-[28px]"
                  >
                    {settings.phone}
                  </a>
                </div>
              </Reveal>
            ) : null}

            <Reveal
              delay={0.3}
              from="left"
              className="mt-8 grid md:grid-cols-2 gap-6 md:gap-2"
            >
              {settings.address ? (
                <div>
                  <p className="opacity-45">Address</p>
                  <RichText
                    html={settings.address}
                    as="p"
                    className="mt-2 text-[18px] leading-[normal]"
                  />
                </div>
              ) : null}
              {settings.hours.length ? (
                <div>
                  <p className="opacity-45">Business Hours</p>
                  <ul className="mt-2 text-[18px] space-y-1 leading-[normal]">
                    {settings.hours.map((h, i) => (
                      <li key={i}>
                        {h.days} : {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>

            {settings.email ? (
              <Reveal delay={0.35} from="left" className="mt-8">
                <p className="opacity-45">Email</p>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-2 inline-block text-[18px] leading-[normal] hover:text-teal-text"
                >
                  {settings.email}
                </a>
              </Reveal>
            ) : null}
          </div>

          <Reveal
            delay={0.15}
            className="rounded-2xl border border-aqua/20 bg-foam p-6 md:p-10"
          >
            <form>
              <label className="block">
                <span className="text-[16px] font-bold">Your Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your Name"
                  className={fieldClass}
                />
              </label>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[16px] font-bold">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="text-[16px] font-bold">Phone Number</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="000-000-0000"
                    className={fieldClass}
                  />
                </label>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[16px] font-bold">Service Type</span>
                  <select
                    name="service"
                    defaultValue=""
                    className={selectClass}
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
                  <input type="date" name="dateTime" className={fieldClass} />
                </label>
              </div>

              <label className="mt-8 block">
                <span className="text-[16px] font-bold">Message</span>
                <textarea
                  required
                  rows={3}
                  name="message"
                  placeholder="Your Message"
                  className={`${fieldClass} resize-none !rounded-xl md:!rounded-2xl`}
                />
              </label>

              <button
                type="submit"
                className="btn-3d mt-8 rounded-full bg-aqua px-8 py-3.5 text-sm font-medium uppercase tracking-[0.05em] text-ink transition-all duration-500 hover:bg-ink hover:text-white"
              >
                Book Appointment
              </button>
            </form>
          </Reveal>
        </div>

        {content.mapEmbed ? (
          <Reveal delay={0.1} className="mt-8">
            <RichText
              html={content.mapEmbed}
              className="relative aspect-[16/9] w-full overflow-hidden rounded-xl md:aspect-[1400/420] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
