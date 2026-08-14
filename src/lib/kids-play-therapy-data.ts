import type { KidsPlayTherapyContent } from "./types/kids-play-therapy";

const img = (src: string, alt: string, width: number, height: number) => ({
  src,
  alt,
  width,
  height,
});

const p = (text: string) => `<p>${text}</p>`;

export const kidsPlayTherapy: KidsPlayTherapyContent = {
  hero: {
    logo: null,
    label: "Counselling",
    heading: "Kids & Play Therapy",
    paragraph: p(
      "Support for children who are having a hard time with emotions, behaviour, confidence, relationships, or major changes at home or school.",
    ),
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    image: img(
      "/images/kids-play-therapy/Kids-Play-Therapy-banner.png",
      "Kids & Play Therapy",
      1440,
      800,
    ),
  },

  notice: {
    label: "Support",
    heading: "What parents notice",
    paragraph: p(
      "Children do not always have the words to explain what is bothering them. Changes in emotions, behaviour, sleep, relationships, or school life may be signs that they need more support.",
    ),
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    items: [
      {
        title: "Frequent worries",
        description: p(
          "Anxiety, fears, separation concerns, or difficulty settling down.",
        ),
        icon: img(
          "/images/kids-play-therapy/Frequent-worries-icon.svg",
          "Frequent worries",
          35,
          35,
        ),
      },
      {
        title: "Strong reactions",
        description: p(
          "Frequent anger, meltdowns, frustration, or difficulty calming after becoming upset.",
        ),
        icon: img(
          "/images/kids-play-therapy/Strong-reactions-icon.svg",
          "Strong reactions",
          35,
          35,
        ),
      },
      {
        title: "Hard-to-share feelings",
        description: p(
          "Trouble identifying emotions or explaining what is wrong.",
        ),
        icon: img(
          "/images/kids-play-therapy/Hard-to-share-feelings-icon.svg",
          "Hard-to-share feelings",
          35,
          35,
        ),
      },
      {
        title: "Behaviour changes",
        description: p(
          "Withdrawal, acting out, difficulty following routines, or changes at home or school.",
        ),
        icon: img(
          "/images/kids-play-therapy/Behaviour-changes-icon.svg",
          "Behaviour changes",
          35,
          35,
        ),
      },
      {
        title: "Social challenges",
        description: p(
          "Difficulty making friends, communicating, setting boundaries, or handling conflict.",
        ),
        icon: img(
          "/images/kids-play-therapy/Social-challenges-icon.svg",
          "Social challenges",
          35,
          35,
        ),
      },
      {
        title: "Major changes",
        description: p(
          "Grief, family separation, moving, changing schools, a new sibling, or another stressful experience.",
        ),
        icon: img(
          "/images/kids-play-therapy/Major-changes-icon.svg",
          "Major changes",
          35,
          35,
        ),
      },
    ],
  },

  approach: {
    label: "Approach",
    heading: "Why play therapy works",
    paragraph:
      p(
        "Children often communicate through play before they can clearly explain their thoughts and emotions with words.",
      ) +
      p(
        "In play therapy, a counsellor may use toys, art, stories, games, or imaginative activities to help a child express themselves and explore difficult experiences. The activities are chosen intentionally based on the child's age, needs, and comfort level.",
      ) +
      p(
        "Play therapy is not simply unsupervised playtime. The Association for Play Therapy describes it as a structured and developmentally appropriate therapeutic approach led by a trained mental-health professional.",
      ),
    image: img(
      "/images/kids-play-therapy/Why-play-therapy-works.png",
      "Why play therapy works",
      710,
      740,
    ),
    quote:
      'For many children, play makes it easier to <span class="text-aqua">show</span> what is hard to <span class="display-serif italic text-aqua">say</span>.',
  },

  support: {
    label: "Goals",
    heading: "What we support",
    paragraph: p(
      "Sessions are tailored to the child. Depending on their needs, counselling may focus on one or several of the following areas.",
    ),
    image: img(
      "/images/kids-play-therapy/What-we-support.png",
      "What we support",
      447,
      490,
    ),
    cards: [
      {
        title: "Expressing emotions",
        description: p(
          "Recognizing feelings and finding safer ways to communicate them.",
        ),
        icon: img(
          "/images/kids-play-therapy/Expressing-emotions-icon.svg",
          "Expressing emotions",
          35,
          35,
        ),
        cta: null,
      },
      {
        title: "Growing confidence",
        description: p(
          "Supporting self-esteem, independence, problem-solving, and social skills.",
        ),
        icon: img(
          "/images/kids-play-therapy/Growing-confidence-icon.svg",
          "Growing confidence",
          35,
          35,
        ),
        cta: null,
      },
      {
        title: "Managing reactions",
        description: p(
          "Building strategies for anxiety, frustration, anger, and emotional overwhelm.",
        ),
        icon: img(
          "/images/kids-play-therapy/Managing-reactions-icon.svg",
          "Managing reactions",
          35,
          35,
        ),
        cta: null,
      },
      {
        title: "Handling change",
        description: p(
          "Processing grief, family changes, school transitions, trauma, or other stressful experiences.",
        ),
        icon: img(
          "/images/kids-play-therapy/Handling-change-icon.svg",
          "Handling change",
          35,
          35,
        ),
        cta: null,
      },
    ],
  },

  process: {
    label: "Process",
    heading: "What to expect",
    paragraph: p(
      "A simple look at how counselling may begin, what sessions can involve, and how support develops over time.",
    ),
    backgrounds: [
      "/images/kids-play-therapy/Kids-Play-Therapy-What-to-expect.png",
      "/images/kids-play-therapy/Kids-Play-Therapy-Ready-to-talk.png",
      "/images/kids-play-therapy/Kids-Play-Therapy-banner.png",
    ],
    cards: [
      {
        title: "Parent Conversation",
        description: p(
          "You will have an opportunity to share what you have noticed, when the concerns began, what has changed, and what you hope counselling can support.",
        ),
        cta: null,
      },
      {
        title: "Child Sessions",
        description: p(
          "The counsellor will take time to help your child feel comfortable. Sessions may include play, art, storytelling, games, conversation, or other age-appropriate activities.",
        ),
        cta: null,
      },
      {
        title: "Ongoing Check-ins",
        description: p(
          "The counsellor may meet with you periodically to discuss general progress, provide practical strategies for home, and decide whether the plan should change.",
        ),
        cta: null,
      },
    ],
    footnote: p(
      "The exact format depends on your child's age, needs, consent, and counsellor's approach.",
    ),
  },

  role: {
    label: "Involvement",
    heading: "Your role",
    paragraph:
      p(
        "Parents and caregivers are an important part of child counselling. Your knowledge of your child helps the counsellor understand what is happening outside the session and what support may be useful at home.",
      ) +
      p(
        "At the same time, children need an age-appropriate level of trust and privacy with their counsellor. Before counselling begins, the counsellor should explain how consent, confidentiality, parent updates, and safety concerns will be handled.",
      ),
    items: [
      {
        title: "Share context",
        description: p(
          "Tell the counsellor about recent changes, concerns at home or school, and any strategies you have already tried to support your child.",
        ),
        image: img(
          "/images/kids-play-therapy/Share-context.png",
          "Share context",
          100,
          100,
        ),
      },
      {
        title: "Support at home",
        description: p(
          "Use the activities or communication strategies your counsellor recommends between sessions to support progress at home.",
        ),
        image: img(
          "/images/kids-play-therapy/Support-at-home.png",
          "Support at home",
          100,
          100,
        ),
      },
      {
        title: "Give them space",
        description: p(
          "Avoid repeatedly asking your child to report everything that happened in their session. Let the counsellor explain what information can appropriately be shared.",
        ),
        image: img(
          "/images/kids-play-therapy/Give-them-space.png",
          "Give them space",
          100,
          100,
        ),
      },
    ],
  },

  team: {
    label: "Our Practitioners",
    heading: "Meet the Team",
    paragraph: p(
      "Meet counsellors who work with children, youth, and age-appropriate creative approaches.",
    ),
    cta: null,
    categories: [],
    members: [
      {
        id: "kids-team-elnaz-bondar",
        name: "Elnaz Bondar",
        role: "Registered Clinical Counsellor",
        bio: p(
          "Supports children and youth through art, play, and creative activities that build coping and emotional regulation.",
        ),
        image: img("/images/team/elnaz-bondar.png", "Elnaz Bondar", 566, 566),
        category: "counselling",
      },
      {
        id: "kids-team-wendy-blackshaw-humphrey",
        name: "Wendy Blackshaw Humphrey",
        role: "Registered Clinical Counsellor",
        bio: p(
          "Supports children and adults with anxiety, ADHD, communication, and family concerns.",
        ),
        image: img(
          "/images/team/wendy-blackshaw-humphrey.png",
          "Wendy Blackshaw Humphrey",
          566,
          566,
        ),
        category: "counselling",
      },
    ],
  },

  insurance: {
    label: "Coverage",
    heading: "Using benefits?",
    paragraph: p(
      "Your extended health plan may cover counselling provided by an eligible practitioner. Coverage limits, practitioner requirements, reimbursement amounts, and direct-billing availability depend on your plan.",
    ),
    cta: {
      label: "View Insurance Information",
      href: "/insurance-direct-billing",
    },
  },

  faq: {
    label: "FAQ",
    heading: "Common Questions",
    paragraph: p(
      `Find quick answers to common questions about appointments, insurance, <br>referrals and virtual care.`,
    ),
    items: [
      {
        id: "kids-faq-1",
        question: "What exactly is play therapy and how does it help my child?",
        answer: p(
          `Play is a child’s natural way of communicating. While adults often use words to process emotions, children may use toys, sand, art, and games to express experiences they cannot yet explain. This can help them process trauma, manage anxiety, and develop problem-solving skills in a way that feels safe and natural.`,
        ),
      },
      {
        id: "kids-faq-2",
        question: "At what age can a child start play therapy?",
        answer: p(
          `Play therapy is typically most effective for children between the ages of 3 and 12. However, the approach is highly developmental. For younger children, the focus is on emotional regulation and attachment, while for older children (pre-teens), we may blend play with more traditional talk therapy or creative arts to help them navigate their growing independence and social challenges.`,
        ),
      },
      {
        id: "kids-faq-3",
        question: "What is the parent's role during the play therapy process?",
        answer: p(
          `You are the most important person in your child’s life, so your involvement is key! While the child usually meets with the therapist one-on-one to build trust and privacy, we schedule regular parent consultation sessions. During these meetings, we discuss your child's progress, share insights into their emotional world, and give you practical "at-home" tools to support their growth.`,
        ),
      },
      {
        id: "kids-faq-4",
        question: "What specific challenges can play therapy help treat?",
        answer: p(
          'Play therapy is highly effective for a wide range of social, emotional, and behavioral issues. This includes generalized anxiety, social withdrawal, difficulty adjusting to life changes (like divorce or a new sibling), grief and loss, ADHD-related frustrations, and healing after a traumatic event. It helps the child move from a state of "reaction" to a state of "resilience."',
        ),
      },
      {
        id: "kids-faq-5",
        question: "How long does it take for play therapy to show results?",
        answer: p(
          'Every child’s healing journey is unique. Some children show signs of improvement—such as better sleep, fewer meltdowns, or increased confidence—within 8 to 12 sessions. However, deep-seated emotional challenges may take longer. Our goal at Rene Health is not just a "quick fix," but to help your child build a strong emotional foundation that lasts a lifetime.',
        ),
      },
    ],
  },

  cta: {
    heading: "Ready to talk?",
    paragraph: p(
      "Book an appointment or contact reception to ask which counselling service and practitioner may be a good fit for your child.",
    ),
    cta: {
      label: "Book an Appointment",
      href: "https://renehealthclinic.janeapp.com/",
    },
    image: img(
      "/images/kids-play-therapy/ready-to-talk.webp",
      "Kids & Play Therapy Ready to Talk",
      1440,
      600,
    ),
  },
};
