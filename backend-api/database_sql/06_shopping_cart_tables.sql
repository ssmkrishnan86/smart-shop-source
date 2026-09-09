-- ============================================================================
-- 06_shopping_cart_tables.sql
-- Industry-standard persistent shopping cart tables for DivineKart
-- Follows eCommerce best practices with separate cart + cart_items tables
-- ============================================================================

-- Enable UUID extension if not already enabled
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── TABLE 1: shopping_cart ─────────────────────────────────────────────────
-- One record per user (or session for guest). Contains cart-level metadata.
CREATE TABLE IF NOT EXISTS shopping_cart (
    id                  VARCHAR(50)         PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id             VARCHAR(50)         REFERENCES users(id) ON DELETE CASCADE,
    session_id          VARCHAR(255),                              -- Future: guest cart support
    coupon_code         VARCHAR(50),
    discount_amount     NUMERIC(10, 2)      NOT NULL DEFAULT 0.00,
    notes               TEXT,                                      -- Optional order notes
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted          BOOLEAN             NOT NULL DEFAULT FALSE,

    -- Each user has at most one active cart (soft-delete enables history)
    CONSTRAINT uq_shopping_cart_user UNIQUE (user_id)
);

COMMENT ON TABLE shopping_cart IS
    'One active cart per user. Persists across page refreshes and device sessions.';

-- ─── TABLE 2: shopping_cart_items ────────────────────────────────────────────
-- One record per product in the cart. Stores a snapshot of price at add-time.
CREATE TABLE IF NOT EXISTS shopping_cart_items (
    id                  VARCHAR(50)         PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    cart_id             VARCHAR(50)         NOT NULL REFERENCES shopping_cart(id) ON DELETE CASCADE,
    product_id          VARCHAR(50)         NOT NULL,
    product_name        VARCHAR(255)        NOT NULL,
    product_thumbnail   VARCHAR(500),
    product_category    VARCHAR(100),
    product_sku         VARCHAR(100),
    unit_price          NUMERIC(10, 2)      NOT NULL,              -- Price at time of add
    original_price      NUMERIC(10, 2),                            -- MRP before discount
    quantity            INT                 NOT NULL DEFAULT 1 CHECK (quantity > 0),
    selected_variant    VARCHAR(255),                              -- e.g. "Size: L, Color: Red"
    added_at            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Prevent duplicate product entries in same cart
    CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id)
);

COMMENT ON TABLE shopping_cart_items IS
    'Individual line items in a customer shopping cart. Prices snapshotted at add-time.';

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_shopping_cart_user_id
    ON shopping_cart(user_id) WHERE is_deleted = FALSE;

CREATE INDEX IF NOT EXISTS idx_shopping_cart_items_cart_id
    ON shopping_cart_items(cart_id);

CREATE INDEX IF NOT EXISTS idx_shopping_cart_items_product_id
    ON shopping_cart_items(product_id);

-- ─── TRIGGER: auto-update updated_at on shopping_cart ────────────────────────
-- Reuses the existing update_updated_at_column() function from 04_create_functions_and_triggers.sql
CREATE OR REPLACE TRIGGER trg_shopping_cart_updated_at
    BEFORE UPDATE ON shopping_cart
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER trg_shopping_cart_items_updated_at
    BEFORE UPDATE ON shopping_cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
