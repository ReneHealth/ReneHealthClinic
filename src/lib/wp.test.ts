import assert from "node:assert/strict";
import { toSettings, toHome } from "./wp";
import type { WpHomeQuery } from "./wp-schema";

const member = (title: string, category: string | string[] | null) => ({
  id: `id-${title}`,
  title,
  featuredImage: null,
  teamMemberFields: { role: "", bio: "", category },
});

const query = {
  globalSettings: {
    siteSettings: {
      bookingLabel: "Book",
      bookingUrl: "/contact",
      menuBookingLabel: "Book Now",
      menuBookingUrl: "https://booking.example.com",
      menuPhone: "(604) 554-2620",
      menuPhoneLink: null,
      menuHours: [{ days: "Monday", time: "9–5" }],
      menuAddress: "<p>1203 Glen Drive</p>",
    },
  },
  teamMembers: {
    nodes: [
      member("Physio", ["physical"]),
      member("Counsellor", ["counselling"]),
      member("Unset", null),
    ],
  },
  page: {
    id: "home",
    homePage: {
      heroPanels: [
        {
          title: "Counselling",
          description: "",
          buttonLabel: "Explore",
          buttonUrl: "/counselling",
          image: null,
        },
        {
          title: "Physical",
          description: "",
          buttonLabel: "Explore",
          buttonUrl: null,
          image: null,
        },
      ],
      teamButtonLabel: "All",
      teamButtonUrl: "/our-team",
    },
  },
} as unknown as WpHomeQuery;

const home = toHome(query);
const settings = toSettings(query);

const team = home.team;
assert.ok(team, "team section is dropped only when its ACF group is empty");

assert.deepEqual(
  team.members.map((m) => m.category),
  ["physical", "counselling", "counselling"],
);
assert.equal(team.members.filter((m) => m.category === "physical").length, 1);

assert.deepEqual(home.hero[0].cta, {
  label: "Explore",
  href: "/counselling",
});
assert.equal(home.hero[1].cta, null, "no URL means no button");
assert.deepEqual(team.cta, { label: "All", href: "/our-team" });

assert.equal(settings.booking.target, undefined);
assert.equal(settings.menu.booking.target, "_blank");

assert.equal(settings.menu.phoneHref, "tel:6045542620");
assert.equal(settings.menu.address, "<p>1203 Glen Drive</p>");
assert.equal(settings.menu.hours.length, 1);

console.log("wp mappers: ok");
