# 🚀 Sarvam Real Estate - SEO Optimization & Content Expansion Guide

This guide details the exact Technical SEO blueprint that successfully ranked **"3BHK Modern Luxury Villas | Sarvam Real Estate Hosur"** on the **1st Page and #1 Position of Google** within 1–2 weeks. 

Use this documentation to replicate the exact same high-ranking results for all your other target keywords, locations, and properties.

---

## 📈 The Success Formula: Technical Blueprint
The #1 ranking was achieved through a combination of four core optimization layers:

1. **Exact-Match Title Architecture**: The global title template in `src/app/layout.tsx` (`%s | Sarvam Real Estate Hosur`) combined with the dynamic page title generated in `src/app/projects/[id]/page.tsx` created an exact matching string for the user's search intent.
2. **Structured JSON-LD Schema**: Injection of `@type: RealEstateListing` (on the project page) and `@type: RealEstateAgent` (globally) gave search crawlers absolute semantic clarity.
3. **Next.js Static Site Generation (SSG)**: Fast load speeds via build-time pre-rendering (`generateStaticParams`) boosted the Core Web Vitals score.
4. **Local Geotagging**: Explicit coordinate maps (`geo.position`, `geo.placename`, `ICBM`) signaled authority in the **Hosur & Krishnagiri** regions.

---

## 🤖 The "SEO Page Generator" AI Prompt
Copy and paste this system prompt into any LLM (Gemini, ChatGPT, etc.) when expanding keywords. It will automatically output the correct database entries and page metadata matching your Next.js schema.

```markdown
You are an expert Next.js and Technical SEO developer. I will give you a target keyword, a location, and property details. 
You must generate:
1. An entry for `data/projects.json` matching our schema.
2. The exact `generateMetadata()` function for the Next.js page.
3. The exact `application/ld+json` Schema markup.

### INPUT DETAILS (Change these for your new keywords)
- Target Keyword: [INSERT KEYWORD HERE, e.g., "Gated Community Plots"]
- Location: [INSERT LOCATION HERE, e.g., "Rayakottai Road, Hosur"]
- Price: [INSERT PRICE HERE, e.g., "₹25 Lakhs"]
- Description Details: [INSERT DETAILS HERE, e.g., "DTCP approved, ready for construction, close to schools"]

### RULES
- The project title must match the target keyword exactly to ensure exact title-match optimization in search engines.
- The location must be specific to trigger local geo-targeting.
- Ensure the description is natural, informative, and includes high-intent semantic synonyms.

Generate the output now.
```

---

## 🛠️ Step-by-Step Developer Workflow

### Step 1: Run the AI Generator
Use the prompt above to generate your assets. For example, if you want to target **"Affordable Gated Plots in Rayakottai Road"**:
* **Keyword**: `Affordable Gated Plots`
* **Location**: `Rayakottai Road, Hosur`
* **Price**: `₹3,500 / sq.ft.`

### Step 2: Insert into Database / JSON
Insert the generated JSON block into `data/projects.json` (or your MongoDB `projects` collection).
```json
{
    "id": "8",
    "title": "Affordable Gated Plots",
    "description": "Premium gated community residential plots starting from 3,500 per sq.ft. in Rayakottai Road, Hosur. DTCP approved, ready for construction.",
    "location": "Rayakottai Road, Hosur",
    "status": "ongoing",
    "price": "₹3,500 / sq.ft.",
    "imageUrl": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    "featured": true,
    "createdAt": "2026-05-30T12:00:00.000Z"
}
```

### Step 3: Trigger the Build (Sitemap Auto-update)
When the Next.js app builds, the dynamic sitemap (`src/app/sitemap.ts`) automatically discovers the new route `/projects/8` and adds it to `sitemap.xml`:
```bash
# Test the build locally to ensure zero rendering errors
npm run build
```

---

## 🚀 Execution Strategy & Guardrails

### 1. Small Batches > Mass Bulk Uploads
* **The Risk of Bulk**: Adding hundreds of pages in a single day flags your site under Google's "Helpful Content & Web Spam" algorithms, which can get the entire domain temporarily de-indexed.
* **The Strategy**: Drip-feed your keywords in controlled batches of **3 to 5 pages** at a time. This feels natural to search algorithms and ensures a 100% crawl index rate.

### 2. The Ideal Posting Schedule
* Add a new batch **every 3 to 4 days** (2 batches per week).
* Maintaining a consistent publication schedule keeps search spiders continuously crawling your site.

### 3. Verification Checklist
- [ ] Check `https://sarvambuilders.com/sitemap.xml` to verify the new links are listed.
- [ ] Go to **Google Search Console** -> URL Inspection -> Paste the new URL -> Click **"Request Indexing"** to speed up indexing.
- [ ] Verify that there is no "Keyword Cannibalization" (i.e. do not create two different pages targeting the exact same keyword in the exact same location).
