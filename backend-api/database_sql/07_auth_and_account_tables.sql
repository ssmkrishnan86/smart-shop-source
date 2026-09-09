-- ============================================================================
-- 07_auth_and_account_tables.sql
-- Customer authentication, session management, and account modules:
-- refresh tokens (sessions/SSO), email/password verification tokens, mobile
-- OTP codes, saved addresses, wishlist, notifications.
-- ============================================================================

-- Self-heal older databases created before these columns existed
-- (CREATE TABLE IF NOT EXISTS is a no-op against a pre-existing table).
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE is_deleted = FALSE;

-- ─── TABLE: refresh_tokens ────────────────────────────────────────────────────
-- One row per active session/device. Powers token refresh, logout/revocation,
-- cross-app SSO (shared cookie), and the "active sessions" list in Security
-- Settings. The raw token is never stored — only its SHA-256 hash.
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) UNIQUE NOT NULL,
    user_agent      VARCHAR(500),
    ip_address      VARCHAR(64),
    expires_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at      TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);

-- ─── TABLE: user_verification_tokens ─────────────────────────────────────────
-- Shared single-use token table for email verification and password reset.
CREATE TABLE IF NOT EXISTS user_verification_tokens (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      VARCHAR(255) UNIQUE NOT NULL,
    purpose         VARCHAR(30)  NOT NULL CHECK (purpose IN ('EMAIL_VERIFY', 'PASSWORD_RESET')),
    expires_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at         TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON user_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_hash ON user_verification_tokens(token_hash);

-- ─── TABLE: otp_codes ─────────────────────────────────────────────────────────
-- Mobile number OTP verification.
CREATE TABLE IF NOT EXISTS otp_codes (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    phone           VARCHAR(50)  NOT NULL,
    code_hash       VARCHAR(255) NOT NULL,
    purpose         VARCHAR(30)  NOT NULL DEFAULT 'MOBILE_VERIFY',
    attempts        INT          NOT NULL DEFAULT 0,
    expires_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    verified_at     TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_otp_codes_user_id ON otp_codes(user_id);

-- ─── TABLE: addresses ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS addresses (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label           VARCHAR(50)  NOT NULL DEFAULT 'Home',
    full_name       VARCHAR(255) NOT NULL,
    phone           VARCHAR(50)  NOT NULL,
    street          VARCHAR(255) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    zip_code        VARCHAR(20)  NOT NULL,
    country         VARCHAR(100) NOT NULL DEFAULT 'India',
    is_default      BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted      BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id) WHERE is_deleted = FALSE;

CREATE OR REPLACE TRIGGER trg_addresses_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── TABLE: wishlist_items ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist_items (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id      VARCHAR(50)  NOT NULL,
    added_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_wishlist_user_product UNIQUE (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);

-- ─── TABLE: notifications ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id              VARCHAR(50)  PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id         VARCHAR(50)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title           VARCHAR(255) NOT NULL,
    message         TEXT         NOT NULL,
    type            VARCHAR(30)  NOT NULL DEFAULT 'SYSTEM' CHECK (type IN ('ORDER','PROMO','SYSTEM','WISHLIST')),
    link            VARCHAR(500),
    is_read         BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id) WHERE is_read = FALSE;

-- ─── SEED: demo data for the seeded customer usr_101 ────────────────────────────
INSERT INTO addresses (id, user_id, label, full_name, phone, street, city, state, zip_code, country, is_default)
VALUES
('addr_1', 'usr_101', 'Home', 'Rahul Sharma', '9876543210', '221B, Gandhi Nagar', 'Chennai', 'Tamil Nadu', '600020', 'India', TRUE),
('addr_2', 'usr_101', 'Work', 'Rahul Sharma', '9876543211', 'Tech Park, OMR Road', 'Chennai', 'Tamil Nadu', '600096', 'India', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO notifications (id, user_id, title, message, type, is_read)
VALUES
('notif_1', 'usr_101', 'Order Shipped', 'Your order DK-2026-0001 has been shipped and is on its way.', 'ORDER', FALSE),
('notif_2', 'usr_101', 'Festival Offer', 'Get 20% off on all Brass Idols this Akshaya Tritiya!', 'PROMO', FALSE),
('notif_3', 'usr_101', 'Welcome to DivineKart', 'Thanks for joining DivineKart. Explore our sacred collection today.', 'SYSTEM', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO wishlist_items (id, user_id, product_id)
VALUES
('wish_1', 'usr_101', 'prod_6')
ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, order_number, user_id, vendor_id, customer_name, customer_email, customer_phone, street, city, state, zip_code, status, payment_method, subtotal, discount, shipping_fee, total, tracking_number, courier_partner)
VALUES
('order_1', 'DK-2026-0001', 'usr_101', 'ven_1', 'Rahul Sharma', 'rahul.sharma@example.com', '9876543210', '221B, Gandhi Nagar', 'Chennai', 'Tamil Nadu', '600020', 'DELIVERED', 'UPI', 1599.00, 0, 0, 1599.00, 'TRK1029384756', 'BlueDart'),
('order_2', 'DK-2026-0002', 'usr_101', 'ven_1', 'Rahul Sharma', 'rahul.sharma@example.com', '9876543210', '221B, Gandhi Nagar', 'Chennai', 'Tamil Nadu', '600020', 'PROCESSING', 'UPI', 2299.00, 20.00, 0, 2279.00, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO order_items (id, order_id, product_id, product_name, product_image, price, quantity)
VALUES
('oi_1', 'order_1', 'prod_1', 'Brass Ganesha Idol', '/images/ganesha_idol.jpg', 1599.00, 1),
('oi_2', 'order_2', 'prod_2', 'Marble Lakshmi Idol', 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80', 2299.00, 1)
ON CONFLICT (id) DO NOTHING;
