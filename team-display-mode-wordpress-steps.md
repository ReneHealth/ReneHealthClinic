# Team display mode — WordPress / ACF setup

Adds an editor-controlled choice on **Mental Health** and **Physical Health**:

- **All Members** → today's behaviour. No tabs, one horizontal rail, everyone.
- **Team Categories** → one tab per category you tick, above the same rail.
  **There is no "All" tab on these two pages** — the first ticked category is
  selected on page load.

> **Do the WordPress steps first.** The Next.js queries already ask for
> `teamDisplayMode` and `teamCategoriesPicked`. Until those fields exist in
> WPGraphQL the whole query 400s and both pages silently fall back to the local
> fixtures. WP first, deploy second.

---

## 1. Open the right field group

WP Admin → **ACF → Field Groups** → the group whose location rule is
`Page is equal to Mental Health` (repeat everything below for the
`Physical Health` group).

Scroll to the existing **Meet The Team** tab field. The two new fields go
*after* `Team Paragraph` and *before* the next tab field, so they land inside
the Meet The Team tab.

---

## 2. Field A — the mode switch

**+ Add Field**

| Setting | Value |
| :--- | :--- |
| Field Label | `Show Team Members As` |
| Field Name | `team_display_mode` |
| Field Type | **Button Group** |
| Choices | `all : All Members`<br>`categories : Team Categories` |
| Default Value | `all` |
| Return Format | **Value** |
| Allow Null | No |

Then open the field's **GraphQL** tab (added by *WPGraphQL for ACF*):

| Setting | Value |
| :--- | :--- |
| Show in GraphQL | ✅ Yes |
| GraphQL Field Name | `teamDisplayMode` |

⚠️ The choice **keys must be exactly `all` and `categories`** — lowercase, no
spaces. The frontend compares against those strings. The labels on the right of
the colon are free text and can be reworded any time.

---

## 3. Field B — which categories

**+ Add Field**

| Setting | Value |
| :--- | :--- |
| Field Label | `Team Categories To Show` |
| Field Name | `team_categories_picked` |
| Field Type | **Taxonomy** |
| Taxonomy | **Team Category** (the one used on Team Members) |
| Appearance | **Checkbox** |
| Allow Null | Yes |
| Create Terms | ❌ No |
| **Save Terms** | ❌ **No** |
| **Load Terms** | ❌ **No** |
| Return Value | Term Object |

**Conditional Logic** → enable, and set:

> Show this field if `Show Team Members As` **is equal to** `Team Categories`

**GraphQL** tab:

| Setting | Value |
| :--- | :--- |
| Show in GraphQL | ✅ Yes |
| GraphQL Field Name | `teamCategoriesPicked` |

⚠️ **Save Terms / Load Terms must both be off.** With them on, ACF assigns the
*page itself* to those Team Category terms on every save, which pollutes the
taxonomy and can make the page turn up inside category archives.

---

## 4. Verify in GraphiQL before deploying

WP Admin → **GraphQL → GraphiQL IDE**, run:

```graphql
{
  page: nodeByUri(uri: "/mental-health/") {
    ... on Page {
      mentalHealthPage {
        teamDisplayMode
        teamCategoriesPicked(first: 100) {
          nodes {
            ... on TeamCategory {
              slug
            }
          }
        }
      }
    }
  }
}
```

You want a clean result, e.g.:

```json
{
  "data": {
    "page": {
      "mentalHealthPage": {
        "teamDisplayMode": "categories",
        "teamCategoriesPicked": { "nodes": [{ "slug": "counsellors" }] }
      }
    }
  }
}
```

Repeat with `uri: "/physical-health/"` and `physicalHealthPage`.

**If it errors:**

- `Cannot query field "teamDisplayMode"` → the field exists but *Show in
  GraphQL* is off, or the GraphQL Field Name doesn't match. Re-check step 2/3.
- `Unknown argument "first"` on `teamCategoriesPicked` → your WPGraphQL for ACF
  version exposes the taxonomy field as a plain list, not a connection. Tell me
  what shape it returns and I'll adjust `src/lib/queries.ts`; there are only
  those two spots to change.
- `Unknown type "TeamCategory"` → the taxonomy's `graphql_single_name` differs.
  Check **GraphQL → Settings** or the taxonomy registration and use that name in
  the inline fragment.

---

## 5. Set it per page

1. **Pages → Mental Health → Meet The Team tab**
2. *Show Team Members As* → **Team Categories**
3. Tick the categories relevant to that page (e.g. Counsellors, Psychologists)
4. **Update**
5. Same for **Physical Health** (e.g. Physiotherapists, Massage, Chiropractic)

Leaving a page on **All Members** keeps it exactly as it is today.

---

## 6. Get the tab order right

With no "All" tab, **the first tab is what visitors see on arrival** — so tab
order is now a content decision, not cosmetics.

Order does **not** come from the sequence you tick the checkboxes. It comes from
each term's own **Display Order** field:

1. **Team Members → Team Categories**
2. Edit a category → set **Display Order** (lower number = further left)
3. Repeat so the categories you use have distinct, deliberate numbers

Ties fall back to alphabetical by label, which is rarely what you want — give
every category its own number.

---

## 7. Check every member has a category

This is the one that bites. Because there's no "All" tab, **a Team Member with
no Team Category assigned will not appear on either hub page.**

1. **Team Members → All Team Members**
2. Add the **Team Category** column via *Screen Options* if it isn't showing
3. Sort/scan for blanks and assign one to each

Two related notes:

- A member is matched on their **first** Team Category only (existing behaviour,
  unchanged). Assigning someone to two categories will not list them under both
  tabs.
- Don't create a Team Category with the slug **`all`** — that string is reserved
  internally for the un-filtered state and the tab would show everyone.

---

## Behaviour notes / safety nets

| Situation | What renders |
| :--- | :--- |
| Mode = **All Members** | No tabs, one rail, every member. |
| Mode = **Team Categories**, categories ticked | One tab per ticked category, first one active. No "All". |
| Mode = **Team Categories**, nothing ticked yet | Falls back to every category that has members — never an empty rail. |
| A ticked category with **zero** members | That tab is dropped automatically rather than rendering a blank rail. |
| No member anywhere has a category | Falls back to no tabs + the full rail. |

Cache tags `page:mental-health`, `page:physical-health` and `team` already cover
these fields, so the existing revalidate webhook picks changes up.

---

## What changed in Next.js

| File | Change |
| :--- | :--- |
| `src/lib/queries.ts` | `teamDisplayMode` + `teamCategoriesPicked` added to both hub queries |
| `src/lib/wp-schema.ts` | `WpTeamCategorySlugs`; two optional fields on `WpMentalHealthPage` |
| `src/lib/wp.ts` | `teamDisplay()` resolves mode → `{ members, categories }`, drops empty categories, wired into `toCounsellingHub` |
| `src/components/sections/Team.tsx` | New `allTab` prop (default `true`). `scroll` no longer suppresses the tab row. Switching tabs resets the rail's scroll position and progress bar. |
| `src/app/{mental,physical}-health/page.tsx` | Pass `allTab={false}` |

`categories: []` is the signal for "All Members" — the `/`,
`/kids-and-play-therapy` and hub sub-page callers keep the default `allTab`, so
the homepage tab row still starts with **All**.
