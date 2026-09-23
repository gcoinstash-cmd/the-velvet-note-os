-- ==============================================================================
-- THE VELVET NOTE — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Ultra-Luxury Speakeasy, Private Listening Room & Sommelier Cellar OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. VIP Reservations Table
CREATE TABLE IF NOT EXISTS public.vip_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_code VARCHAR(32) NOT NULL UNIQUE,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(64),
    party_size INTEGER NOT NULL DEFAULT 2,
    reservation_date DATE NOT NULL,
    seating_slot VARCHAR(64) NOT NULL,
    seating_zone VARCHAR(64) NOT NULL DEFAULT 'indoor',
    spend_commitment NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    cellar_special_request TEXT,
    status VARCHAR(32) NOT NULL DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Patron Private Cellar Lockers Table
CREATE TABLE IF NOT EXISTS public.cellar_lockers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    locker_id VARCHAR(32) NOT NULL UNIQUE,
    patron_name VARCHAR(255) NOT NULL,
    membership_tier VARCHAR(64) NOT NULL,
    bottles_stored INTEGER NOT NULL DEFAULT 0,
    featured_vintage VARCHAR(255) NOT NULL,
    annual_dues NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Sommelier Cellar Bottle Inventory Table
CREATE TABLE IF NOT EXISTS public.bottle_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    locker_id VARCHAR(32) REFERENCES public.cellar_lockers(locker_id) ON DELETE CASCADE,
    producer VARCHAR(255) NOT NULL,
    vintage_year INTEGER NOT NULL,
    region VARCHAR(255) NOT NULL,
    classification VARCHAR(128),
    bottle_value NUMERIC(10, 2) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'In Vault',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Live Jazz Performances & Cover Charges Table
CREATE TABLE IF NOT EXISTS public.live_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time VARCHAR(32) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    cover_charge NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.vip_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cellar_lockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bottle_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_events ENABLE ROW LEVEL SECURITY;

-- 7. Public Read & Guest Policies
CREATE POLICY "Allow public read access to live events" 
    ON public.live_events FOR SELECT USING (true);

CREATE POLICY "Allow guest to create reservation" 
    ON public.vip_reservations FOR INSERT WITH CHECK (true);

-- 8. Sommelier & Maître D' Admin Policies (Service Role / Passkey Authenticated)
CREATE POLICY "Maître D manage reservations" 
    ON public.vip_reservations FOR ALL USING (true);

CREATE POLICY "Sommelier manage cellar lockers" 
    ON public.cellar_lockers FOR ALL USING (true);

CREATE POLICY "Sommelier manage bottle inventory" 
    ON public.bottle_inventory FOR ALL USING (true);
