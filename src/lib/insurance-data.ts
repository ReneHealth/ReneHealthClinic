import type { InsuranceContent } from "./types/insurance";

const img = (src: string, alt: string, width: number, height: number) => ({
  src,
  alt,
  width,
  height,
});

const p = (text: string) => `<p>${text}</p>`;

const tick = img("/images/insurance/tick-icon.svg", "", 20, 20);

const list = (items: string[]) =>
  `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const listTab = (items: string[]) => ({
  html: list(items),
  providers: items.map((name) => ({ name, logo: null })),
});

export const insurance: InsuranceContent = {
  hero: {
    logo: null,
    label: "Insurance",
    heading: "Direct Billing & Insurance Coverage",
    paragraph: p(
      "Rene Health offers direct billing for eligible extended health plans, ICBC claims, and approved WorkSafeBC claims. Coverage and reimbursement depend on your provider, plan, service, and practitioner.",
    ),
    cta: { label: "View Coverage Options", href: "#coverage" },
    image: img(
      "/images/insurance/insurance-banner.png",
      "Family walking together outdoors",
      1440,
      800,
    ),
  },

  coverage: {
    label: "Coverage",
    heading: "Find your coverage",
    paragraph: p(
      "Choose the type of coverage you are using to review eligibility, billing requirements, and what to prepare before your appointment.",
    ),
    cards: [
      {
        title: "Extended Health",
        description: p(
          "Coverage may be available for counselling and physical health services. Eligible services, practitioner credentials, annual limits, reimbursement rates, and referral requirements vary by plan.",
        ),
        icon: img("/images/insurance/extended-health-icon.png", "", 60, 30),
        cta: { label: "Extended Health Details", href: "#who-we-bill" },
      },
      {
        title: "ICBC",
        description: p(
          "Coverage may be available for eligible treatment following a motor vehicle accident. Approved services, claim status, treatment limits, referral requirements, and direct billing eligibility depend on your ICBC claim.",
        ),
        icon: img("/images/insurance/icbc-icon.png", "", 35, 35),
        cta: { label: "ICBC Coverage", href: "#who-we-bill" },
      },
      {
        title: "WorkSafeBC",
        description: p(
          "Coverage may be available for workplace injury assessment and rehabilitation. Eligible services, claim status, authorization requirements, treatment limits, and direct billing depend on your WorkSafeBC claim.",
        ),
        icon: img("/images/insurance/worksafebc-icon.png", "", 35, 35),
        cta: { label: "WorkSafeBC Coverage", href: "#who-we-bill" },
      },
    ],
  },

  process: {
    label: "Process",
    heading: "How it works",
    paragraph: p(
      "When direct billing is available, Rene submits the eligible portion of your appointment fee to your provider.",
    ),
    steps: [
      {
        title: "Confirm your plan",
        description: p(
          "Contact your insurance provider to confirm that your service and practitioner type are covered.",
        ),
        image: img("/images/insurance/confirm-plan-icon.png", "", 40, 20),
      },
      {
        title: "Provide your details",
        description: p(
          "Share your policy information or active claim number when booking or arriving for your appointment.",
        ),
        image: img("/images/insurance/provide-details-icon.png", "", 35, 35),
      },
      {
        title: "Rene submits the claim",
        description: p(
          "Reception submits the eligible claim directly to your provider when direct billing is supported.",
        ),
        image: img(
          "/images/insurance/rene-submits-claim-icon.png",
          "",
          38,
          20,
        ),
      },
      {
        title: "Pay the remainder",
        description: p(
          "You pay any deductible, co-payment, declined amount, or balance not covered by your plan.",
        ),
        image: img("/images/insurance/pay-remainder-icon.png", "", 36, 35),
      },
    ],
  },

  benefits: {
    label: "Prepare",
    heading: "Check your benefits",
    paragraph: p(
      "Before you book, a quick call to your insurance provider can save you a surprise bill later. Here's what's worth confirming ahead of time.",
    ),
    footnote: p(
      "Using <strong>ICBC</strong> or <strong>WorkSafeBC</strong>? Have your active claim number and related claim information ready.",
    ),
    icon: tick,
    items: [
      {
        title: "Covered services",
        description: p(
          "Confirm whether the treatment you are booking is included in your plan.",
        ),
      },
      {
        title: "Eligible practitioners",
        description: p(
          "Check which professional credentials your insurance plan accepts.",
        ),
      },
      {
        title: "Reimbursement rate",
        description: p(
          "Find out what percentage of the appointment fee your plan covers.",
        ),
      },
      {
        title: "Plan limits",
        description: p(
          "Review your annual maximum, remaining balance, and session limits.",
        ),
      },
      {
        title: "Referral rules",
        description: p(
          "Ask whether your plan requires a referral before treatment begins.",
        ),
      },
      {
        title: "Direct billing",
        description: p(
          "Confirm whether your plan accepts claims submitted directly by Rene Health.",
        ),
      },
    ],
  },

  providers: {
    label: "Providers",
    heading: "Who we bill",
    paragraph: p(
      "Search for your provider or browse the categories below. Direct billing availability may still depend on your specific plan and service.",
    ),
    tabs: [
      {
        id: "major-insurance-carriers",
        label: "Major Insurance Carriers",
        providers: [
          {
            name: "Sun Life",
            logo: img("/images/insurance/carrier-logo-1.png", "Sun Life", 164, 40),
          },
          {
            name: "Canada Life",
            logo: img(
              "/images/insurance/carrier-logo-2.png",
              "Canada Life",
              130,
              45,
            ),
          },
          {
            name: "Public Service Health Care Plan Administration Authority",
            logo: img(
              "/images/insurance/carrier-logo-3.png",
              "Public Service Health Care Plan Administration Authority",
              203,
              88,
            ),
          },
          {
            name: "Manulife",
            logo: img(
              "/images/insurance/carrier-logo-4.png",
              "Manulife",
              147,
              30,
            ),
          },
          {
            name: "Desjardins",
            logo: img(
              "/images/insurance/carrier-logo-5.png",
              "Desjardins",
              150,
              32,
            ),
          },
          {
            name: "iA Financial Group",
            logo: img(
              "/images/insurance/carrier-logo-6.png",
              "iA Financial Group",
              74,
              40,
            ),
          },
          {
            name: "Pacific Blue Cross",
            logo: img(
              "/images/insurance/carrier-logo-7.png",
              "Pacific Blue Cross",
              182,
              28,
            ),
          },
          {
            name: "Alberta Blue Cross",
            logo: img(
              "/images/insurance/carrier-logo-8.png",
              "Alberta Blue Cross",
              185,
              28,
            ),
          },
          {
            name: "Medavie Blue Cross",
            logo: img(
              "/images/insurance/carrier-logo-9.png",
              "Medavie Blue Cross",
              187,
              28,
            ),
          },
          {
            name: "GreenShield",
            logo: img(
              "/images/insurance/carrier-logo-10.png",
              "GreenShield",
              161,
              35,
            ),
          },
        ],
      },
      {
        id: "union-construction-benefit-plans",
        label: "Union & Construction Benefit Plans",
        ...listTab([
          "LiUNA Local 183",
          "LiUNA Local 506",
          "Canadian Construction Workers Union",
          "Medic Construction",
          "Union Benefits",
        ]),
      },
      {
        id: "group-professional-benefit-administrators",
        label: "Group & Professional Benefit Administrators",
        ...listTab([
          "AGA Financial Group",
          "BPA – Benefit Plan Administrators",
          "Beneva",
          "CINUP",
          "Chambers of Commerce Group Insurance",
          "ClaimSecure",
          "Coughlin & Associates",
          "Cowan",
          "Equitable",
          "First Canadian",
          "Global Benefits",
          "GMS (Carrier 49 / 50)",
          "GPM Group Benefits",
          "GroupHEALTH",
          "GroupSource",
          "Johnston Group",
          "MDM Insurance Services",
          "Manion",
          "Maximum Benefit",
          "People Corporation",
          "RWAM Insurance Administrators",
          "Simply Benefits",
          "TELUS Adjudicare",
          "UV Insurance",
          "The Operators",
          "belairdirect",
        ]),
      },
    ],
    note: p(
      "Don't see your provider? Contact reception before booking to ask whether direct billing is available.",
    ),
  },

  beforeYouBook: {
    label: "Important",
    heading: "Before you book",
    paragraph: p(
      "Direct billing does not confirm that a service is covered or that your claim will be paid in full. Coverage limits, eligible practitioners, referral requirements, deductibles, and reimbursement amounts are determined by your insurance plan.<br><br>Rene may be able to process your claim, but only your insurance provider can confirm the details of your personal benefits. Detailed receipts can be provided when direct billing is unavailable.",
    ),
    cta: null,
  },

  faq: {
    label: "FAQ",
    heading: "Common Questions",
    paragraph: p(
      "Find quick answers to common questions about appointments, insurance, <br>referrals and virtual care.",
    ),
    items: [
      {
        id: "insurance-faq-1",
        question: "What is direct billing?",
        answer: p(
          "Direct billing allows Rene Health to submit an eligible claim directly to your insurance provider. When the claim is processed successfully, you only pay the remaining balance, if there is one.",
        ),
      },
      {
        id: "insurance-faq-2",
        question: "Does direct billing mean my appointment is fully covered?",
        answer: p(
          "No. Direct billing only means the claim is submitted on your behalf. Whether the service is fully covered depends on your plan's limits, reimbursement rate, and eligibility rules.",
        ),
      },
      {
        id: "insurance-faq-3",
        question: "How do I confirm what my plan covers?",
        answer: p(
          "Contact your insurance provider directly, or check your plan documents, to confirm covered services, eligible practitioners, and your remaining annual limit.",
        ),
      },
      {
        id: "insurance-faq-4",
        question: "What happens if my claim is declined?",
        answer: p(
          "If a claim is declined, you are responsible for the full appointment fee. Reception can provide a detailed receipt so you can follow up with your provider directly.",
        ),
      },
      {
        id: "insurance-faq-5",
        question: "Do you direct bill ICBC and WorkSafeBC?",
        answer: p(
          "Direct billing for ICBC and WorkSafeBC depends on your active claim status and the treatment authorized under your claim. Have your claim number ready when booking.",
        ),
      },
      {
        id: "insurance-faq-6",
        question: "Can reception confirm exactly how much my plan covers?",
        answer: p(
          "Reception can submit claims on your behalf, but only your insurance provider can confirm the exact details of your personal benefits.",
        ),
      },
    ],
  },
};
