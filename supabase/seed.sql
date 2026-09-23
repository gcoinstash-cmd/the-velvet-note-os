-- ==============================================================================
-- THE VELVET NOTE — SUPABASE SEED DATA (v1.0.0)
-- ==============================================================================

-- Seed Cellar Lockers
INSERT INTO public.cellar_lockers (locker_id, patron_name, membership_tier, bottles_stored, featured_vintage, annual_dues, status)
VALUES
('LCK-01', 'Sterling Family Trust', 'Founding Member', 18, '1982 Château Lafite Rothschild', 12000.00, 'Active'),
('LCK-02', 'Julian Vance', 'Master Sommelier Reserve', 24, 'Karuizawa 1981 Single Cask Whisky', 15000.00, 'Active'),
('LCK-03', 'Rostova Capital Holdings', 'Black Card Vinyl', 12, '2008 Louis Roederer Cristal Rosé', 9500.00, 'Restocking'),
('LCK-04', 'Dr. Alistair Chen', 'Founding Member', 16, '2010 Domaine de la Romanée-Conti', 18000.00, 'Active')
ON CONFLICT (locker_id) DO NOTHING;

-- Seed VIP Reservations
INSERT INTO public.vip_reservations (reservation_code, guest_name, guest_email, guest_phone, party_size, reservation_date, seating_slot, seating_zone, spend_commitment, cellar_special_request, status)
VALUES
('VN-984210', 'Julian Vance & Associates', 'vance@velvetnote.internal', '+1 (415) 890-2100', 6, CURRENT_DATE, '20:30', 'indoor', 2400.00, '1996 Château Margaux + 1942 Don Julio Flight', 'Bottles Pre-Poured'),
('VN-762149', 'Soren K. & Guest', 'soren@k-holding.io', '+1 (415) 890-5541', 2, CURRENT_DATE, '22:45', 'bar', 850.00, 'Japanese Highball Omotenashi Service + Caviar Tartlet', 'Confirmed'),
('VN-552091', 'Elena Rostova Group', 'elena@rostovacap.com', '+1 (212) 440-9811', 8, CURRENT_DATE, '20:30', 'indoor', 3800.00, 'Dom Pérignon P2 Vintage 2004 (2 Bottles)', 'Seated'),
('VN-441029', 'Marcus Sterling', 'msterling@sterlingtrust.org', '+1 (310) 902-1433', 4, CURRENT_DATE, '18:00', 'patio', 1200.00, 'Reserve Oregon Pinot Noir + Prime Wagyu Striploin', 'Completed')
ON CONFLICT (reservation_code) DO NOTHING;

-- Seed Live Jazz Events
INSERT INTO public.live_events (title, event_date, event_time, artist, cover_charge, status)
VALUES
('Miles Ahead: Modern Quintet in Residence', CURRENT_DATE + INTERVAL '1 day', '8:30 PM', 'Marcus Sterling Quintet', 65.00, 'Selling Fast'),
('Blue Nocturne: Late Night Solo Piano & Bourbon', CURRENT_DATE + INTERVAL '2 days', '10:45 PM', 'Thelonious Miller', 45.00, 'Available'),
('Velvet Sessions: Hard Bop Sextet & Cellar Tastings', CURRENT_DATE + INTERVAL '3 days', '8:00 PM', 'Elena Rostova Trio', 85.00, 'Sold Out')
ON CONFLICT DO NOTHING;
