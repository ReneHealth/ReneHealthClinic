import type { ContactUsContent } from "./types/contact-us";

const img = (src: string, alt: string, width: number, height: number) => ({
  src,
  alt,
  width,
  height,
});

const p = (text: string) => `<p>${text}</p>`;

export const contactUs: ContactUsContent = {
  hero: {
    label: "Contact",
    heading: "We're Here to Help",
    paragraph: p(
      "Have questions or ready to book an appointment? Our friendly team is here to help you find the right care and answer any questions you may have. Contact us today and take the first step toward better health and wellness.",
    ),
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    image: img(
      "/images/contact-us/contact-banner.png",
      "Rene Health Clinic reception",
      1439,
      800,
    ),
  },

  info: {
    label: "Let's Connect",
    heading:
      'Your Journey to <span class="text-aqua">Better</span> Health Starts <span class="display-serif italic text-aqua">Here</span>?',
    paragraph: p(
      "Whether you're looking for expert advice, scheduling your first visit, or learning more about our services, we're just a call or message away. Reach out today — we look forward to caring for you.",
    ),
    mapEmbed:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.680517073576!2d-122.7946244!3d49.2824507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa44b7c4e195aac45%3A0x5702c7a182106ef1!2sRene%20Health%20Clinic%20Ltd.!5e0!3m2!1sen!2sca!4v1785596087897!5m2!1sen!2sca" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
  },

  guide: {
    label: "Visitor Guide",
    heading: "Download Our Visitor Guide",
    paragraph: p(
      "Planning your visit? Our Visitor Guide provides everything you need to make your arrival smooth and stress-free. It includes detailed directions to our front entrance, parking information, accessibility options, and other useful tips to help you find your way easily. Click below to download your copy and prepare for a seamless visit!",
    ),
    cta: { label: "View & Download Our Visitor Guide", href: "#" },
    image: img(
      "/images/contact-us/visitor-guide-bg.png",
      "Visitor holding the Rene Health visitor guide",
      1440,
      412,
    ),
  },

  faq: {
    label: "FAQ",
    heading: "Common Questions",
    paragraph: p(
      "Find quick answers to common questions about appointments, insurance, <br>referrals and virtual care.",
    ),
    items: [
      {
        id: "contact-faq-1",
        question: "Do I need to be in crisis to start counselling?",
        answer: p(
          "No. People seek counselling for many reasons, including stress, relationship concerns, burnout, life transitions, personal growth, or wanting to better understand their thoughts and patterns.",
        ),
      },
      {
        id: "contact-faq-2",
        question: "What happens during the first appointment?",
        answer: p(
          "Your first session focuses on understanding your history, current concerns, and goals so your counsellor can recommend the best path forward.",
        ),
      },
      {
        id: "contact-faq-3",
        question: "How do I choose the right counsellor?",
        answer: p(
          "Our reception team can help match you with a practitioner based on your needs, availability, and the type of support you're looking for.",
        ),
      },
      {
        id: "contact-faq-4",
        question: "Are virtual appointments available?",
        answer: p(
          "Yes. Most of our practitioners offer secure virtual sessions in addition to in-person visits at our Coquitlam clinic.",
        ),
      },
      {
        id: "contact-faq-5",
        question: "Is counselling covered by extended health insurance?",
        answer: p(
          "Many extended health plans cover counselling with a Registered Clinical Counsellor. Coverage varies by provider, so we recommend checking your policy or asking our team for guidance.",
        ),
      },
    ],
  },

  cta: {
    heading: "Ready to talk?",
    paragraph: p(
      "Find a counsellor who fits your needs and take the next step at a pace that feels comfortable for you.",
    ),
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    image: img(
      "/images/mental-health/ready-to-talk.webp",
      "Ready to talk",
      1440,
      600,
    ),
  },
};
