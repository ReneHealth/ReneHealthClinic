import type { SiteMenus, SiteSettings } from "./types/common";
import type { HomeContent } from "./types/home";
import type {
  MentalHealthContent,
  PhysicalHealthContent,
} from "./types/mental-health";

const img = (src: string, alt: string, width: number, height: number) => ({
  src,
  alt,
  width,
  height,
});

const link = (label: string, href: string) => ({
  id: `${href}#${label}`,
  label,
  href,
});

const p = (text: string) => `<p>${text}</p>`;

export const settings: SiteSettings = {
  headerLogo: img("/images/logo.svg", "Header Logo", 100, 100),
  marquee: "Header Marquee Content",
  footerLogo: img("/images/logo.svg", "Footer Logo", 90, 90),
  footerLogoContent: p("Footer Logo Content"),
  newsletterNote: p("Newsletter Content"),
  newsletterSuccess: "Newsletter Success Message",
  hoursTitle: "Footer Hours Heading",
  hours: [
    { days: "Footer Days 1", time: "Footer Time 1" },
    { days: "Footer Days 2", time: "Footer Time 2" },
    { days: "Footer Days 3", time: "Footer Time 3" },
  ],
  visitTitle: "Footer Visit Heading",
  contactTitle: "Footer Contact Heading",
  exploreTitle: "Footer Explore Heading",
  socialTitle: "Social Media Links",
  socialFacebook: "https://www.facebook.com/",
  socialInstagram: "https://www.instagram.com/",
  footerWordmark: "FOOTER WORDMARK",
  phone: "Footer Phone",
  phoneHref: "tel:+10000000000",
  email: "footer@example.com",
  address: p("Footer Address Line 1<br />Footer Address Line 2"),
  booking: { label: "Booking Button", href: "/contact-us" },
  menu: {
    contactTitle: "Menu Contact Heading",
    phone: "Menu Phone",
    phoneHref: "tel:+10000000000",
    email: "menu@example.com",
    address: p("Menu Address Line 1, Menu Address Line 2"),
    hoursTitle: "Menu Hours Heading",
    hours: [
      { days: "Menu Days 1", time: "Menu Time 1" },
      { days: "Menu Days 2", time: "Menu Time 2" },
      { days: "Menu Days 3", time: "Menu Time 3" },
    ],
    booking: { label: "Menu Booking Button", href: "/contact-us" },
  },
};

const navLeft = [
  link("Nav Left 1", "/mental-health"),
  {
    ...link("Nav Left 2", "/physical-health"),
    children: [
      link("Nav Left 2 Child 1", "/acupuncture"),
      link("Nav Left 2 Child 2", "/chiropractic"),
      link("Nav Left 2 Child 3", "/dietetic"),
      link("Nav Left 2 Child 4", "/facials-skin-care"),
      link("Nav Left 2 Child 5", "/massage-therapy"),
      link("Nav Left 2 Child 6", "/naturopathy"),
      link("Nav Left 2 Child 7", "/nutrition"),
      link("Nav Left 2 Child 8", "/osteopathy"),
    ],
  },
  {
    ...link("Nav Left 3", "/insurance-direct-billing"),
    children: [
      link("Nav Left 3 Child 1", "/icbc"),
      link("Nav Left 3 Child 2", "/extended-health-insurance"),
      link("Nav Left 3 Child 3", "/worksafebc"),
    ],
  },
];

const navRight = [
  link("Nav Right 1", "/our-team"),
  link("Nav Right 2", "/blog"),
  link("Nav Right 3", "/contact-us"),
];

export const menus: SiteMenus = {
  headerDesktopLeft: navLeft,
  headerDesktopRight: navRight,
  menuFullscreen: [...navLeft, ...navRight],
  footerExplore: [
    link("Footer Explore 1", "/mental-health"),
    link("Footer Explore 2", "/physical-health"),
    link("Footer Explore 3", "/our-team"),
    link("Footer Explore 4", "/insurance-direct-billing"),
    link("Footer Explore 5", "/#faq"),
    link("Footer Explore 6", "/contact-us"),
  ],
  footerBottom: [...navLeft, ...navRight].map(({ id, label, href }) => ({
    id,
    label,
    href,
  })),
};

export const home: HomeContent = {
  hero: [
    {
      title: "Hero Panel 1 Heading",
      description: p("Hero Panel 1 Content"),
      cta: { label: "Hero Panel 1 Button", href: "/mental-health" },
      image: img("/images/hero-counselling.png", "Hero Panel 1", 1600, 2000),
    },
    {
      title: "Hero Panel 2 Heading",
      description: p("Hero Panel 2 Content"),
      cta: { label: "Hero Panel 2 Button", href: "/physical-health" },
      image: img("/images/hero-physical.png", "Hero Panel 2", 1600, 2000),
    },
  ],

  about: {
    label: "About Label",
    heading:
      'About <span>Heading</span> with <span class="boska">emphasis</span>.',
    paragraph: p("About Content"),
    cards: [
      {
        titleA: "About Card 1 +",
        titleB: "Heading 1",
        description: p("About Card 1 Content"),
        image: img("/images/about-clinic.png", "About Card 1", 300, 300),
      },
      {
        titleA: "About Card 2 +",
        titleB: "Heading 2",
        description: p("About Card 2 Content"),
        image: img("/images/about-virtual.png", "About Card 2", 300, 300),
      },
      {
        titleA: "About Card 3 +",
        titleB: "Heading 3",
        description: p("About Card 3 Content"),
        image: img("/images/about-icbc.png", "About Card 3", 300, 300),
      },
    ],
  },

  differentNeeds: {
    label: "Different Needs Label",
    heading: "Different Needs Heading",
    paragraph: p("Different Needs Content"),
    items: [
      {
        verb: "ONE",
        title: "Different Needs Item 1 Heading",
        description: p("Different Needs Item 1 Content"),
      },
      {
        verb: "TWO",
        title: "Different Needs Item 2 Heading",
        description: p("Different Needs Item 2 Content"),
      },
      {
        verb: "THREE",
        title: "Different Needs Item 3 Heading",
        description: p("Different Needs Item 3 Content"),
      },
      {
        verb: "FOUR",
        title: "Different Needs Item 4 Heading",
        description: p("Different Needs Item 4 Content"),
      },
      {
        verb: "FIVE",
        title: "Different Needs Item 5 Heading",
        description: p("Different Needs Item 5 Content"),
      },
    ],
  },

  team: {
    label: "Team Label",
    heading: "Team Heading",
    paragraph: p("Team Content"),
    cta: { label: "Team Button", href: "/our-team" },
    categories: [
      { id: "counselling", label: "Counselling" },
      { id: "physical", label: "Physical Health" },
    ],
    members: [
      {
        id: "team-member-1",
        name: "Team Member 1",
        role: "Team Member 1 Role",
        bio: p("Team Member 1 Content"),
        image: img("/images/team/elnaz-bondar.png", "Team Member 1", 566, 566),
        category: "counselling",
      },
      {
        id: "team-member-2",
        name: "Team Member 2",
        role: "Team Member 2 Role",
        bio: p("Team Member 2 Content"),
        image: img("/images/team/susan-tavakol.png", "Team Member 2", 566, 566),
        category: "counselling",
      },
      {
        id: "team-member-3",
        name: "Team Member 3",
        role: "Team Member 3 Role",
        bio: p("Team Member 3 Content"),
        image: img(
          "/images/team/maryam-mousavi-nik.png",
          "Team Member 3",
          566,
          566,
        ),
        category: "counselling",
      },
      {
        id: "team-member-4",
        name: "Team Member 4",
        role: "Team Member 4 Role",
        bio: p("Team Member 4 Content"),
        image: img(
          "/images/team/wendy-blackshaw-humphrey.png",
          "Team Member 4",
          566,
          566,
        ),
        category: "counselling",
      },
      {
        id: "team-member-5",
        name: "Team Member 5",
        role: "Team Member 5 Role",
        bio: p("Team Member 5 Content"),
        image: img("/images/team/akash-landge.png", "Team Member 5", 566, 566),
        category: "physical",
      },
      {
        id: "team-member-6",
        name: "Team Member 6",
        role: "Team Member 6 Role",
        bio: p("Team Member 6 Content"),
        image: img("/images/team/ling-ling-qin.png", "Team Member 6", 566, 566),
        category: "physical",
      },
      {
        id: "team-member-7",
        name: "Team Member 7",
        role: "Team Member 7 Role",
        bio: p("Team Member 7 Content"),
        image: img(
          "/images/team/mehdi-tafreshi.png",
          "Team Member 7",
          566,
          566,
        ),
        category: "physical",
      },
      {
        id: "team-member-8",
        name: "Team Member 8",
        role: "Team Member 8 Role",
        bio: p("Team Member 8 Content"),
        image: img("/images/team/jessica-chan.png", "Team Member 8", 566, 566),
        category: "physical",
      },
    ],
  },

  video: {
    src: "/videos/rene-health.mp4",
    poster: "/images/video-poster.webp",
    label: "Video Content",
  },

  services: {
    label: "Services Label",
    heading: "Services Heading",
    paragraph: p("Services Content"),
    columns: [
      {
        label: "Services Column 1 Label",
        title: "Services Column 1 Heading",
        layout: "stacked",
        cta: { label: "Services Column 1 Button", href: "/mental-health" },
        image: img(
          "/images/service-counselling.png",
          "Services Column 1",
          1400,
          600,
        ),
        items: [
          {
            title: "Services Column 1 Item 1 Heading",
            description: p("Services Column 1 Item 1 Content"),
          },
          {
            title: "Services Column 1 Item 2 Heading",
            description: p("Services Column 1 Item 2 Content"),
          },
          {
            title: "Services Column 1 Item 3 Heading",
            description: p("Services Column 1 Item 3 Content"),
          },
        ],
      },
      {
        label: "Services Column 2 Label",
        title: "Services Column 2 Heading",
        layout: "stacked",
        cta: { label: "Services Column 2 Button", href: "/physical-health" },
        image: img(
          "/images/service-physical.png",
          "Services Column 2",
          1400,
          600,
        ),
        items: [
          {
            title: "Services Column 2 Item 1 Heading",
            description: p("Services Column 2 Item 1 Content"),
          },
          {
            title: "Services Column 2 Item 2 Heading",
            description: p("Services Column 2 Item 2 Content"),
          },
          {
            title: "Services Column 2 Item 3 Heading",
            description: p("Services Column 2 Item 3 Content"),
          },
        ],
      },
    ],
  },

  goodToKnow: {
    label: "Good to Know Label",
    heading: "Good to Know Heading",
    paragraph: p("Good to Know Content"),
    cta: { label: "Good to Know Button", href: "/insurance-direct-billing" },
    backgrounds: [
      "/images/good-to-know.webp",
      "/images/service-counselling.webp",
      "/images/service-physical.webp",
    ],
    cards: [
      {
        title: "Good to Know Card 1 Heading",
        description: p("Good to Know Card 1 Content"),
      },
      {
        title: "Good to Know Card 2 Heading",
        description: p("Good to Know Card 2 Content"),
      },
      {
        title: "Good to Know Card 3 Heading",
        description: p("Good to Know Card 3 Content"),
      },
    ],
  },

  faq: {
    label: "FAQ Label",
    heading: "FAQ Heading",
    paragraph: p("FAQ Content"),
    items: [
      {
        id: "faq-1",
        question: "FAQ Item 1 Heading",
        answer: p("FAQ Item 1 Content"),
      },
      {
        id: "faq-2",
        question: "FAQ Item 2 Heading",
        answer: p("FAQ Item 2 Content"),
      },
      {
        id: "faq-3",
        question: "FAQ Item 3 Heading",
        answer: p("FAQ Item 3 Content"),
      },
      {
        id: "faq-4",
        question: "FAQ Item 4 Heading",
        answer: p("FAQ Item 4 Content"),
      },
      {
        id: "faq-5",
        question: "FAQ Item 5 Heading",
        answer: p("FAQ Item 5 Content"),
      },
    ],
  },

  reviews: {
    label: "Reviews Label",
    heading: "Reviews Heading",
    paragraph: p("Reviews Content"),
    items: [
      {
        id: "review-1",
        tagline: "Review 1 Heading",
        quote: p("Review 1 Content"),
        name: "Review 1 Name",
        avatar: null,
        rating: 5,
      },
      {
        id: "review-2",
        tagline: "Review 2 Heading",
        quote: p("Review 2 Content"),
        name: "Review 2 Name",
        avatar: null,
        rating: 5,
      },
      {
        id: "review-3",
        tagline: "Review 3 Heading",
        quote: p("Review 3 Content"),
        name: "Review 3 Name",
        avatar: null,
        rating: 5,
      },
      {
        id: "review-4",
        tagline: "Review 4 Heading",
        quote: p("Review 4 Content"),
        name: "Review 4 Name",
        avatar: null,
        rating: 5,
      },
    ],
  },

  contact: {
    label: "Contact Label",
    heading: "Contact Heading",
    paragraph: p("Contact Content"),
    image: img("/images/contact-us.png", "Contact Image", 1200, 1400),
  },
};

const supportIcons = [
  "individual",
  "couples",
  "family",
  "kids-play",
  "adhd",
  "anger",
];

export const mentalHealth: MentalHealthContent = {
  hero: {
    logo: null,
    label: "Counselling Hero Label",
    heading: "Counselling Hero Heading",
    paragraph: p("Counselling Hero Content"),
    cta: { label: "Counselling Hero Button", href: "/contact-us" },
    image: img(
      "/images/mental-health/hero.webp",
      "Counselling Hero",
      1440,
      800,
    ),
  },

  intro: {
    label: "Counselling Intro Label",
    heading:
      "Counselling Intro <span>Heading</span> with <span>emphasis</span>.",
    paragraph: p("Counselling Intro Content"),
    image: img(
      "/images/mental-health/intro.webp",
      "Counselling Intro",
      710,
      740,
    ),
  },

  support: {
    label: "Support Label",
    heading: "Support Heading",
    paragraph: p("Support Content"),
    cards: supportIcons.map((icon, i) => ({
      title: `Support Card ${i + 1} Heading`,
      description: p(`Support Card ${i + 1} Content`),
      icon: img(
        `/images/mental-health/icons/${icon}.svg`,
        `Support Card ${i + 1}`,
        37,
        37,
      ),
      cta: { label: "Learn More", href: "/contact-us" },
    })),
  },

  process: {
    label: "Process Label",
    heading: "Process Heading",
    paragraph: p("Process Content"),
    steps: [1, 2, 3, 4].map((n) => ({
      title: `Process Step ${n} Heading`,
      description: p(`Process Step ${n} Content`),
      image: img(
        `/images/mental-health/step-${n}.webp`,
        `Process Step ${n}`,
        700,
        520,
      ),
    })),
  },

  team: {
    label: "Counselling Team Label",
    heading: "Counselling Team Heading",
    paragraph: p("Counselling Team Content"),
    cta: { label: "Counselling Team Button", href: "/our-team" },
    categories: [
      { id: "counselling", label: "Counselling" },
      { id: "physical", label: "Physical Health" },
    ],
    members: home.team?.members ?? [],
  },

  benefits: {
    label: "Benefits Label",
    heading: "Benefits Heading",
    paragraph: p("Benefits Content"),
    backgrounds: [
      "/images/mental-health/benefits.webp",
      "/images/mental-health/benefits-2.webp",
      "/images/mental-health/benefits-3.webp",
    ],
    cards: [1, 2, 3].map((n) => ({
      title: `Benefits Card ${n} Heading`,
      description: p(`Benefits Card ${n} Content`),
      cta: { label: `Benefits Card ${n} Button`, href: "/contact-us" },
    })),
    footnote: p("Benefits Footnote"),
  },

  faq: {
    label: "Counselling FAQ Label",
    heading: "Counselling FAQ Heading",
    paragraph: p("Counselling FAQ Content"),
    items: [1, 2, 3, 4, 5].map((n) => ({
      id: `counselling-faq-${n}`,
      question: `Counselling FAQ Item ${n} Heading`,
      answer: p(`Counselling FAQ Item ${n} Content`),
    })),
  },

  cta: {
    heading: "Counselling CTA Heading",
    paragraph: p("Counselling CTA Content"),
    cta: { label: "Counselling CTA Button", href: "/contact-us" },
    image: img(
      "/images/mental-health/ready-to-talk.webp",
      "Counselling CTA Background",
      1440,
      600,
    ),
  },
};

export const physicalHealth: PhysicalHealthContent = {
  hero: {
    logo: null,
    label: "Physical Health Hero Label",
    heading: "Physical Health Hero Heading",
    paragraph: p("Physical Health Hero Content"),
    cta: { label: "Physical Health Hero Button", href: "/contact-us" },
    image: img(
      "/images/mental-health/hero.webp",
      "Physical Health Hero",
      1440,
      800,
    ),
  },

  intro: {
    label: "Physical Health Intro Label",
    heading:
      "Physical Health Intro <span>Heading</span> with <span>emphasis</span>.",
    paragraph: p("Physical Health Intro Content"),
    image: img(
      "/images/mental-health/intro.webp",
      "Physical Health Intro",
      710,
      740,
    ),
  },

  support: {
    label: "Physical Health Support Label",
    heading: "Physical Health Support Heading",
    paragraph: p("Physical Health Support Content"),
    cards: supportIcons.map((icon, i) => ({
      title: `Physical Health Support Card ${i + 1} Heading`,
      description: p(`Physical Health Support Card ${i + 1} Content`),
      icon: img(
        `/images/mental-health/icons/${icon}.svg`,
        `Physical Health Support Card ${i + 1}`,
        37,
        37,
      ),
      cta: { label: "Learn More", href: "/contact-us" },
    })),
  },

  process: {
    label: "Physical Health Process Label",
    heading: "Physical Health Process Heading",
    paragraph: p("Physical Health Process Content"),
    steps: [1, 2, 3, 4].map((n) => ({
      title: `Physical Health Process Step ${n} Heading`,
      description: p(`Physical Health Process Step ${n} Content`),
      image: img(
        `/images/mental-health/step-${n}.webp`,
        `Physical Health Process Step ${n}`,
        700,
        520,
      ),
    })),
  },

  team: {
    label: "Physical Health Team Label",
    heading: "Physical Health Team Heading",
    paragraph: p("Physical Health Team Content"),
    cta: null,
    categories: [
      { id: "counselling", label: "Counselling" },
      { id: "physical", label: "Physical Health" },
    ],
    members: home.team?.members ?? [],
  },

  benefits: {
    label: "Physical Health Benefits Label",
    heading: "Physical Health Benefits Heading",
    paragraph: p("Physical Health Benefits Content"),
    backgrounds: [
      "/images/mental-health/benefits.webp",
      "/images/mental-health/benefits-2.webp",
      "/images/mental-health/benefits-3.webp",
    ],
    cards: [1, 2, 3].map((n) => ({
      title: `Physical Health Benefits Card ${n} Heading`,
      description: p(`Physical Health Benefits Card ${n} Content`),
      cta: {
        label: `Physical Health Benefits Card ${n} Button`,
        href: "/contact-us",
      },
    })),
    footnote: p("Physical Health Benefits Footnote"),
  },

  faq: {
    label: "Physical Health FAQ Label",
    heading: "Physical Health FAQ Heading",
    paragraph: p("Physical Health FAQ Content"),
    items: [1, 2, 3, 4, 5].map((n) => ({
      id: `physical-health-faq-${n}`,
      question: `Physical Health FAQ Item ${n} Heading`,
      answer: p(`Physical Health FAQ Item ${n} Content`),
    })),
  },

  cta: {
    heading: "Physical Health CTA Heading",
    paragraph: p("Physical Health CTA Content"),
    cta: { label: "Physical Health CTA Button", href: "/contact-us" },
    image: img(
      "/images/mental-health/ready-to-talk.webp",
      "Physical Health CTA Background",
      1440,
      600,
    ),
  },
};
