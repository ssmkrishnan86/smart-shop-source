-- ============================================================================
-- 08_multi_vendor_orders.sql
-- Multi-Vendor Parent Order + Vendor Sub-Orders Schema & Inventory Ledger
-- ============================================================================

-- 1. EXTEND ORDERS TABLE WITH MULTI-STATUS FIELDS
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) NOT NULL DEFAULT 'PAID';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS fulfillment_status VARCHAR(50) NOT NULL DEFAULT 'UNFULFILLED';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipment_status VARCHAR(50) NOT NULL DEFAULT 'NOT_SHIPPED';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS return_status VARCHAR(50) NOT NULL DEFAULT 'NONE';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_status VARCHAR(50) NOT NULL DEFAULT 'NONE';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_gateway_ref VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax NUMERIC(10,2) DEFAULT 0;

-- 2. VENDOR_SUB_ORDERS TABLE
CREATE TABLE IF NOT EXISTS vendor_sub_orders (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    parent_order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    sub_order_number VARCHAR(50) UNIQUE NOT NULL,
    vendor_id VARCHAR(50) REFERENCES vendors(id),
    vendor_name VARCHAR(255) NOT NULL,
    vendor_status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    fulfillment_status VARCHAR(50) NOT NULL DEFAULT 'UNFULFILLED',
    shipment_status VARCHAR(50) NOT NULL DEFAULT 'NOT_SHIPPED',
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
    discount NUMERIC(10,2) DEFAULT 0,
    shipping_fee NUMERIC(10,2) DEFAULT 0,
    tax NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) NOT NULL DEFAULT 0,
    courier_partner VARCHAR(100),
    tracking_number VARCHAR(100),
    pickup_date TIMESTAMP WITH TIME ZONE,
    shipped_date TIMESTAMP WITH TIME ZONE,
    estimated_delivery_date TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    return_reason TEXT,
    commission_rate NUMERIC(5,2) DEFAULT 8.00,
    platform_commission NUMERIC(10,2) DEFAULT 0,
    applicable_fees NUMERIC(10,2) DEFAULT 0,
    vendor_payable_amount NUMERIC(10,2) DEFAULT 0,
    settlement_status VARCHAR(50) DEFAULT 'PENDING',
    return_window_closes_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. EXTEND ORDER_ITEMS TABLE
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS sub_order_id VARCHAR(50) REFERENCES vendor_sub_orders(id) ON DELETE CASCADE;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS vendor_id VARCHAR(50) REFERENCES vendors(id);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS subtotal NUMERIC(10,2) DEFAULT 0;

-- 4. ORDER_TIMELINE_LOGS TABLE (Immutable Audit Log)
CREATE TABLE IF NOT EXISTS order_timeline_logs (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    sub_order_id VARCHAR(50),
    actor_type VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    actor_name VARCHAR(255) NOT NULL DEFAULT 'System Engine',
    event_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. INVENTORY_RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS inventory_reservations (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    sub_order_id VARCHAR(50),
    reserved_quantity INT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'RESERVED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. VENDOR_SETTLEMENT_LEDGER TABLE
CREATE TABLE IF NOT EXISTS vendor_settlement_ledger (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    vendor_id VARCHAR(50) REFERENCES vendors(id),
    sub_order_id VARCHAR(50) REFERENCES vendor_sub_orders(id) ON DELETE CASCADE,
    gross_amount NUMERIC(10,2) NOT NULL,
    commission_amount NUMERIC(10,2) NOT NULL,
    fee_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    net_payable NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    settled_at TIMESTAMP WITH TIME ZONE,
    payout_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
