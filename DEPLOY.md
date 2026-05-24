# NutriLoop Africa — Deployment Guide

Complete step-by-step guide from unzipping the project to a live production URL.
Estimated time: **2–3 hours** for a developer, **4–6 hours** if setting up all services for the first time.

---

## Prerequisites

- Node.js 20+ (`node --version`)
- npm 10+ (`npm --version`)
- Git (`git --version`)
- A GitHub account
- Accounts at: Vercel, Supabase, Sanity, Resend

---

## Step 1 — Local setup

```bash
# Unzip and enter the project
unzip nutriloop-africa-v1.0.zip
cd nutriloop-africa

# Install all dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
```

Now open `.env.local` and fill in each variable (instructions below per service).

---

## Step 2 — Supabase (database)

### 2a. Create a project
1. Go to [supabase.com](https://supabase.com) → New project
2. Name: `nutriloop-africa` · Region: **Africa (Cape Town)** · Generate a strong database password → Save it

### 2b. Run the database migration
1. In your Supabase project → **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste into the SQL editor → **Run**
4. Check the **Table Editor** — you should see 4 tables: `partner_applications`, `contact_submissions`, `newsletter_subscribers`, `kpi_values`

### 2c. Seed the KPI data
1. In SQL Editor, copy `supabase/seed.sql` → Paste → **Run**
2. Verify: `SELECT key, value FROM kpi_values ORDER BY display_order;` should return 14 rows

### 2d. Get your credentials
- **Settings → API** in Supabase
- Copy `NEXT_PUBLIC_SUPABASE_URL` (the Project URL)
- Copy `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon / public key)
- Copy `SUPABASE_SERVICE_ROLE_KEY` (service_role key — keep this secret)

### 2e. Update .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3 — Resend (email delivery)

### 3a. Create account and verify domain
1. Go to [resend.com](https://resend.com) → Create account
2. **Domains** → Add domain → Enter `nutriloopAfrica.com`
3. Add the DNS records Resend provides to your domain registrar
4. Wait for verification (usually 5–30 minutes)

### 3b. Get API key
- **API Keys** → Create API Key → Name: `nutriloop-production`
- Copy the key (shown once)

### 3c. Update .env.local
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=NutriLoop Africa <hello@nutriloopAfrica.com>
FOUNDER_NOTIFICATION_EMAIL=founders@nutriloopAfrica.com
```

---

## Step 4 — Sanity CMS

### 4a. Create a project
```bash
# In the project directory
npx sanity init --project nutriloop-africa

# OR create at sanity.io/manage → New Project → Copy the project ID
```

### 4b. Get credentials
- Go to [sanity.io/manage](https://sanity.io/manage) → Your project
- Copy the **Project ID**
- **API** tab → Add API Token → Name: `nutriloop-read` → Viewer permissions → Copy

### 4c. Update .env.local
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-15
SANITY_API_READ_TOKEN=skxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4d. Deploy Sanity Studio (optional for Phase 1)
```bash
npx sanity deploy
# Studio will be available at: https://nutriloop-africa.sanity.studio
```

Alternatively, access it locally at `http://localhost:3000/studio` during development.

---

## Step 5 — NextAuth admin

### 5a. Generate a secure secret
```bash
openssl rand -base64 32
# Copy the output
```

### 5b. Set admin credentials
```env
NEXTAUTH_SECRET=<paste the generated secret>
NEXTAUTH_URL=https://nutriloopAfrica.com
ADMIN_EMAIL=founders@nutriloopAfrica.com
ADMIN_PASSWORD=<choose a strong password — 16+ chars>
```

> ⚠️ The admin password is stored in your environment variable, not hashed in a database. Use a strong, unique password (e.g. `openssl rand -hex 16`). Change it if compromised via Vercel environment variable update.

---

## Step 6 — Mapbox (for /contact page map)

1. Go to [account.mapbox.com](https://account.mapbox.com) → Access Tokens
2. Create a token → Copy it

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoibnV0cmkxxxxxxxx
```

---

## Step 7 — Analytics (optional but recommended)

### Google Analytics 4
1. [analytics.google.com](https://analytics.google.com) → Create property → Web → Copy the Measurement ID
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### Microsoft Clarity
1. [clarity.microsoft.com](https://clarity.microsoft.com) → New project → Web → Copy Project ID
```env
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

---

## Step 8 — Test locally

```bash
npm run dev
# Open http://localhost:3000
```

**Test checklist before deploying:**
- [ ] Homepage loads with all 10 sections
- [ ] Navbar transparent → glass on scroll
- [ ] Mobile hamburger menu opens/closes
- [ ] `/apply` form: all 5 tabs load, submit one form, check Supabase for the row
- [ ] `/contact` form: submit, check Supabase and founder email
- [ ] `/api/newsletter` subscribe: check Supabase row + welcome email
- [ ] `/partner/waste-suppliers` loads full content
- [ ] `/faq` accordion opens and closes
- [ ] `/studio` loads Sanity CMS (if Sanity configured)

---

## Step 9 — Deploy to Vercel

### 9a. Push to GitHub
```bash
git init
git add .
git commit -m "feat: NutriLoop Africa v1.0 — complete frontend + backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nutriloop-africa.git
git push -u origin main
```

### 9b. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from GitHub → Select `nutriloop-africa`
3. Framework: **Next.js** (auto-detected)
4. Root directory: leave as `/`
5. **Do not deploy yet** — add environment variables first

### 9c. Add environment variables in Vercel
- **Settings → Environment Variables**
- Add every variable from your `.env.local` one by one
- Set **Environment** to `Production, Preview, Development` for each
- For `NEXTAUTH_URL` — set to `https://nutriloopAfrica.com` (Production) and `https://YOUR-BRANCH.vercel.app` (Preview)

### 9d. Deploy
- Click **Deploy** from the Deployments tab
- Wait ~2 minutes for the build to complete
- Open the generated Vercel URL (e.g. `nutriloop-africa.vercel.app`) and test

---

## Step 10 — Custom domain

### 10a. Add domain in Vercel
1. **Settings → Domains** → Add domain: `nutriloopAfrica.com`
2. Also add: `www.nutriloopAfrica.com`
3. Vercel will show you the DNS records to add

### 10b. Update DNS at your registrar
Add these records at your domain registrar (Namecheap, GoDaddy, etc.):

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 (Vercel IP) |
| CNAME | www | cname.vercel-dns.com |

DNS propagation takes 5 minutes to 48 hours.

### 10c. Update NEXTAUTH_URL
In Vercel → Settings → Environment Variables → update `NEXTAUTH_URL` to `https://nutriloopAfrica.com`

### 10d. Trigger a new deployment
Settings → Deployments → Redeploy (to pick up the NEXTAUTH_URL change)

---

## Step 11 — Post-deployment checklist

### Verify every page loads
```
/ (home)              /about           /problem
/solution             /products        /impact
/partner/waste-suppliers               /partner/buyers
/partner/investors    /partner/government /partner/research
/sustainability       /news            /team
/faq                  /apply           /contact
/privacy              /terms
```

### Verify all forms
- [ ] Submit a waste supplier application → check Supabase + both emails
- [ ] Submit a buyer application → check Supabase + both emails
- [ ] Submit investor enquiry → check for investor brief note in email
- [ ] Submit contact form → check Supabase + founder notification
- [ ] Subscribe to newsletter → check Supabase + welcome email
- [ ] Unsubscribe via DELETE `/api/newsletter?email=x` → status updates to 'unsubscribed'

### Performance audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://nutriloopAfrica.com --output html --output-path ./lighthouse-report.html
```

Target: 95+ Performance · 100 Accessibility · 100 SEO · 100 Best Practices

### SEO setup
1. [Google Search Console](https://search.google.com/search-console) → Add property
2. Verify via HTML tag → add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var in Vercel
3. Submit sitemap: `https://nutriloopAfrica.com/sitemap.xml`

---

## Step 12 — Sanity CMS: publishing content

Once deployed, your CMS studio is at `/studio` on your domain.

**First steps in Sanity:**
1. Add your team members (Founders first, then advisors)
2. Update KPI values to match your current actual numbers
3. Add affiliate logos (ICIPE, CGIAR, Verra, NEMA, GCA, AECF)
4. Publish your first news post

```
https://nutriloopAfrica.com/studio
```

Login with your Sanity account. Use the structured sidebar to manage content.

---

## Step 13 — WhatsApp Business

1. Set up [WhatsApp Business](https://business.whatsapp.com/) for `+254 700 000 000`
2. Update all WhatsApp links in the codebase to your actual number:
   ```bash
   grep -r "wa.me/254700000000" . --include="*.tsx" --include="*.ts"
   ```
3. Replace `254700000000` with your real number

---

## Environment Variables — Complete Reference

| Variable | Required | Service | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase | Server-only service key |
| `RESEND_API_KEY` | ✅ | Resend | Email delivery |
| `RESEND_FROM_EMAIL` | ✅ | Resend | Verified sender address |
| `FOUNDER_NOTIFICATION_EMAIL` | ✅ | Internal | Where form alerts go |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ | Sanity | CMS project |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ | Sanity | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ | Sanity | e.g. `2024-05-15` |
| `SANITY_API_READ_TOKEN` | Optional | Sanity | For preview drafts |
| `NEXTAUTH_SECRET` | ✅ | NextAuth | 32-char random secret |
| `NEXTAUTH_URL` | ✅ | NextAuth | Production URL |
| `ADMIN_EMAIL` | ✅ | Admin | Login email |
| `ADMIN_PASSWORD` | ✅ | Admin | Login password (strong) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Optional | Mapbox | Contact page map |
| `NEXT_PUBLIC_GA4_ID` | Optional | Analytics | Google Analytics 4 |
| `NEXT_PUBLIC_CLARITY_ID` | Optional | Analytics | Microsoft Clarity |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | SEO | Search Console verify |

---

## Troubleshooting

**Build fails with TypeScript errors**
```bash
npm run type-check
# Fix all reported errors — zero `any` policy is enforced
```

**Forms submit but emails not arriving**
- Check Resend dashboard → Logs for delivery status
- Verify domain is confirmed in Resend
- Check `FOUNDER_NOTIFICATION_EMAIL` is correct

**Supabase RLS blocking API**
- All API routes use the service_role key which bypasses RLS
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly in Vercel env vars
- Never use the service_role key in client-side code

**Sanity content not showing**
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your Sanity project
- Check that content is published (not draft) in the studio
- Pages use ISR — changes may take up to 1 hour to appear; trigger revalidation manually

**Admin dashboard inaccessible**
- Verify `NEXTAUTH_URL` matches your actual production domain exactly
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` match what you're entering
- Ensure `NEXTAUTH_SECRET` is set (32-char minimum)

---

## Maintenance

**Updating KPI values**
Option 1 (recommended): Update via Sanity Studio → KPI Values
Option 2: Update directly in Supabase → `kpi_values` table → edit `value` column

**Adding news posts**
Sanity Studio → News Posts → New → Fill fields → Publish

**Regenerating Supabase types**
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
```

**Updating dependencies**
```bash
npm outdated
npm update
npm run type-check && npm run build
```

---

*NutriLoop Africa v1.0 — Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, Sanity, Resend, Vercel.*
