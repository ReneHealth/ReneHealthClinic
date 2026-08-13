export type TeamImageType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
export type TeamPopupType = {
  title: string;
  designation: string;
  image: TeamImageType;
  introduction: string;
  content?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};
export type TeamMemberType = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: TeamImageType;
  profileUrl: string;
  popup: TeamPopupType;
};
export type TeamCategoryType = {
  id: string;
  label: string;
  title: string;
  description: string;
  members: TeamMemberType[];
};
export interface VideoSectionContent {
  src: string;
  poster: string;
  label: string;
}
export type TeamSectionType = {
  categories: TeamCategoryType[];
  video?: VideoSectionContent[];
};
export type TeamHeroType = {
  label: string;
  heading: string;
  paragraph: string;
  image: {
    src: string;
    alt: string;
  };
  cta?: {
    label: string;
    href: string;
    target?: "_self" | "_blank";
  };
};
export const teamHeroContent: TeamHeroType = {
  label: "OUR TEAM",
  heading: "Meet our experts, advisors and collaborators",
  paragraph: `
    <p>
      Our experienced team of healthcare professionals is committed to
      delivering personalized, evidence-based care in a welcoming and
      supportive environment.
    </p>
  `,
  image: {
    src: "/images/team/team-banner.jpg",
    alt: "Meet our experts, advisors and collaborators",
  },
  cta: {
    label: "Meet Our Team",
    href: "#team",
    target: "_self",
  },
};
export const teamContent: TeamSectionType = {
  categories: [
    {
      id: "counselling",
      label: "COUNSELLING",
      title: "Professional Counselling for a Healthier Mind",
      description:
        "Our experienced counsellors provide a safe, supportive, and confidential environment where you can navigate life's challenges with confidence.",
      members: [
        {
          id: "elnaz-bondar",
          name: "Elnaz Bondar",
          role: "Registered Clinical Counsellor",
          description:
            "Supports individuals, couples and children with anxiety, depression, ADHD, conflict and communication concerns.",
          image: {
            src: "/images/team/elnaz-bondar.png",
            alt: "Elnaz Bondar",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/elnaz-bondar",
          popup: {
            title: "Elnaz Bondar",
            designation: "Registered Clinical Counsellor",
            image: {
              src: "/images/team/elnaz-bondar.png",
              alt: "Elnaz Bondar",
              width: 700,
              height: 900,
            },
            introduction: `
      <p>
        Elnaz is passionate about helping people navigate life's emotional
        challenges with confidence and resilience. She believes that every
        individual has the capacity for growth and healing when provided with
        the right support, understanding, and practical therapeutic tools.
      </p>
      <p>
        She creates a respectful, welcoming, and judgment-free space where
        clients can openly discuss their concerns, better understand their
        experiences, and work toward meaningful personal change.
      </p>
    `,
            content: `
      <h3>Areas of Practice</h3>
      <ul>
        <li>Anxiety and panic disorders</li>
        <li>Depression and low mood</li>
        <li>Stress and burnout</li>
        <li>Trauma and emotional healing</li>
        <li>Relationship and family concerns</li>
        <li>Grief and loss</li>
        <li>Self-esteem and confidence building</li>
        <li>Life transitions and personal development</li>
      </ul>
      <h3>Treatment Philosophy</h3>
      <p>
        Elnaz takes a collaborative and individualized approach to therapy.
        She works closely with each client to understand their unique
        circumstances, identify personal strengths, and develop practical
        strategies that support long-term emotional well-being.
      </p>
      <p>
        Her sessions are guided by empathy, evidence-based therapeutic
        methods, and a genuine commitment to helping clients achieve
        sustainable, positive change.
      </p>
      <h3>Professional Background</h3>
      <p>
        With professional training in clinical counselling and a commitment
        to lifelong learning, Elnaz integrates current research and
        evidence-based practices into her work. She continually develops
        her clinical skills to provide effective, compassionate care for
        individuals with diverse backgrounds and experiences.
      </p>
      <h3>Languages</h3>
      <ul>
        <li>English</li>
        <li>Persian (Farsi)</li>
      </ul>
    `,
            buttonLabel: "Book Appointment",
            buttonUrl: "https://renehealthclinic.janeapp.com/#/staff_member/6",
          },
        },
        {
          id: "susan-tavakol",
          name: "Susan Tavakol",
          role: "Registered Clinical Counsellor",
          description:
            "Brings over 30 years of experience supporting mental health, relationship and emotional concerns.",
          image: {
            src: "/images/team/susan-tavakol.png",
            alt: "Susan Tavakol",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/susan-tavakol",
          popup: {
            title: "Susan Tavakol",
            designation: "Registered Clinical Counsellor",
            image: {
              src: "/images/team/susan-tavakol.png",
              alt: "Susan Tavakol",
              width: 700,
              height: 900,
            },
            introduction: `<p>Helping individuals, couples and families achieve emotional well-being for over 30 years.</p>`,
            content: `<h3>Specialties</h3><ul><li>Anxiety</li><li>Relationships</li><li>Family Therapy</li></ul>`,
          },
        },
        {
          id: "maryam-mousavi-nik",
          name: "Maryam Mousavi Nik",
          role: "Registered Clinical Counsellor",
          description:
            "Provides evidence-based support for anxiety, trauma, OCD, grief, relationships and major life changes.",
          image: {
            src: "/images/team/maryam-mousavi-nik.png",
            alt: "Maryam Mousavi Nik",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/maryam-mousavi-nik",
          popup: {
            title: "Maryam Mousavi Nik",
            designation: "Registered Clinical Counsellor",
            image: {
              src: "/images/team/maryam-mousavi-nik.png",
              alt: "Maryam Mousavi Nik",
              width: 700,
              height: 900,
            },
            introduction: `<p>Providing compassionate, evidence-based counselling for individuals and families.</p>`,
            content: `<h3>Areas of Practice</h3><ul><li>Trauma</li><li>OCD</li><li>Grief</li><li>Life Transitions</li></ul>`,
          },
        },
        {
          id: "wendy-blackshaw-humphrey",
          name: "Wendy Blackshaw Humphrey",
          role: "Registered Clinical Counsellor",
          description:
            "Supports children, youth and adults through counselling, art therapy and practical coping tools.",
          image: {
            src: "/images/team/wendy-blackshaw-humphrey.png",
            alt: "Wendy Blackshaw Humphrey",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/wendy-blackshaw-humphrey",
          popup: {
            title: "Wendy Blackshaw Humphrey",
            designation: "Registered Clinical Counsellor",
            image: {
              src: "/images/team/wendy-blackshaw-humphrey.png",
              alt: "Wendy Blackshaw Humphrey",
              width: 700,
              height: 900,
            },
            introduction: `<p>Supporting children, youth and adults through counselling and creative therapeutic approaches.</p>`,
            content: `<h3>Services</h3><ul><li>Art Therapy</li><li>Child Counselling</li><li>Youth Counselling</li></ul>`,
          },
        },
      ],
    },
    {
      id: "physical-health",
      label: "PHYSICAL HEALTH",
      title: "Expert Care for Your Physical Health",
      description:
        "Our physical health specialists provide personalized, evidence-based treatments to relieve pain, restore mobility, and improve your overall well-being.",
      members: [
        {
          id: "akash-landge",
          name: "Akash Landge",
          role: "Registered Massage Therapist",
          description:
            "Provides massage therapy for chronic pain, injury recovery, mobility and TMJ discomfort.",
          image: {
            src: "/images/team/akash-landge.png",
            alt: "Akash Landge",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/akash-landge",
          popup: {
            title: "Akash Landge",
            designation: "Registered Massage Therapist",
            image: {
              src: "/images/team/akash-landge.png",
              alt: "Akash Landge",
              width: 700,
              height: 900,
            },
            introduction: `<p>Helping patients recover through therapeutic massage treatments.</p>`,
            content: `<h3>Treatments</h3><ul><li>Sports Massage</li><li>Deep Tissue</li><li>TMJ Therapy</li></ul>`,
          },
        },
        {
          id: "ling-ling-qin",
          name: "Ling Ling Qin",
          role: "Registered Acupuncturist",
          description:
            "Uses acupuncture and Traditional Chinese Medicine to support pain, stress, sleep and recovery.",
          image: {
            src: "/images/team/ling-ling-qin.png",
            alt: "Ling Ling Qin",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/ling-ling-qin",
          popup: {
            title: "Ling Ling Qin",
            designation: "Registered Acupuncturist",
            image: {
              src: "/images/team/ling-ling-qin.png",
              alt: "Ling Ling Qin",
              width: 700,
              height: 900,
            },
            introduction: `<p>Combining Traditional Chinese Medicine with modern care.</p>`,
            content: `<h3>Treatments</h3><ul><li>Acupuncture</li><li>Cupping</li><li>Herbal Medicine</li></ul>`,
          },
        },
        {
          id: "mehdi-tafreshi",
          name: "Mehdi Tafreshi",
          role: "Osteopath (DOMP)",
          description:
            "Over 20 years of experience supporting pain relief, mobility and recovery through hands-on care.",
          image: {
            src: "/images/team/mehdi-tafreshi.png",
            alt: "Mehdi Tafreshi",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/mehdi-tafreshi",
          popup: {
            title: "Mehdi Tafreshi",
            designation: "Osteopath (DOMP)",
            image: {
              src: "/images/team/mehdi-tafreshi.png",
              alt: "Mehdi Tafreshi",
              width: 700,
              height: 900,
            },
            introduction: `<p>Providing osteopathic treatment for pain relief and improved mobility.</p>`,
            content: `<h3>Expertise</h3><ul><li>Back Pain</li><li>Neck Pain</li><li>Joint Dysfunction</li></ul>`,
          },
        },
        {
          id: "jessica-chan",
          name: "Jessica Chan",
          role: "Registered Dietitian",
          description:
            "Offers practical nutrition support for digestive health, chronic conditions and emotional eating.",
          image: {
            src: "/images/team/jessica-chan.png",
            alt: "Jessica Chan",
            width: 480,
            height: 640,
          },
          profileUrl: "/team/jessica-chan",
          popup: {
            title: "Jessica Chan",
            designation: "Registered Dietitian",
            image: {
              src: "/images/team/jessica-chan.png",
              alt: "Jessica Chan",
              width: 700,
              height: 900,
            },
            introduction: `<p>Helping clients achieve long-term health through evidence-based nutrition.</p>`,
            content: `<h3>Nutrition Support</h3><ul><li>Digestive Health</li><li>Weight Management</li><li>Diabetes</li></ul>`,
          },
        },
      ],
    },
  ],
};
