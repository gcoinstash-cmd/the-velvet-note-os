# Turnkey Supabase Setup — The Velvet Note (VIP Speakeasy & Cellar OS)

Follow this 3-minute turnkey walkthrough to wire your PostgreSQL database, real-time table reservations, and private cellar locker engine.

---

## Step 1: Create Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it `the-velvet-note` (Select region nearest your clientele).
3. Save your database password securely.

---

## Step 2: Run SQL Schema & Seed Data
1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Open `supabase/schema.sql` from this directory, copy its entire contents, paste into the editor, and click **Run**.
3. Open `supabase/seed.sql`, copy and paste into the SQL editor, and click **Run** to inject sample VIP patron profiles, cellar lockers, and reservation tickets.

---

## Step 3: Wire Environment Keys
1. In Supabase, navigate to **Project Settings** > **API**.
2. Copy your **Project URL** (`https://<project-ref>.supabase.co`) and **anon / public key**.
3. Create a `.env` file in the root of `the-velvet-note`:
   ```bash
   VITE_SUPABASE_URL="https://your-project-id.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   ```
4. Run `npm run build` and launch:
   ```bash
   npm run dev
   ```

---

## Maître D' Admin Door
- Visit `/admin` or click **ADMIN PASS** in the top navigation.
- Passcode: `velvet2026`
- Instantly verify table occupancy, bottle pre-pours, and annual cellar locker revenues.
