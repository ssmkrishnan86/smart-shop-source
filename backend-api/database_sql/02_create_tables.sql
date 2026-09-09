-- ============================================================================
-- 02_create_tables.sql
-- DDL schema tables for SmartShop Enterprise (DivineKart, DivineVendor, DivineAdmin)
-- ============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
    avatar VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- 2. VENDORS TABLE
CREATE TABLE IF NOT EXISTS vendors (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo VARCHAR(500),
    banner VARCHAR(500),
    description TEXT,
    category VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_VERIFICATION',
    commission_rate NUMERIC(5,2) NOT NULL DEFAULT 8.00,
    rating NUMERIC(3,2) DEFAULT 5.00,
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    phone VARCHAR(50),
    email VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image VARCHAR(500),
    item_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- 4. BRANDS TABLE
CREATE TABLE IF NOT EXISTS brands (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo VARCHAR(500),
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- 5. PRODUCTS TABLE (Enhanced for Product Approval Workflow)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    vendor_id VARCHAR(50) REFERENCES vendors(id) ON DELETE CASCADE,
    vendor_name VARCHAR(255) DEFAULT 'Vedic Crafts Heritage',
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    discount_percentage INT DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    sku VARCHAR(100) UNIQUE NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_APPROVAL',
    rejection_reason TEXT,
    approval_comments TEXT,
    approved_by VARCHAR(100),
    approved_at TIMESTAMP WITH TIME ZONE,
    thumbnail VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- Self-heal older databases created before these columns existed
-- (CREATE TABLE IF NOT EXISTS above is a no-op against a pre-existing table).
ALTER TABLE products ADD COLUMN IF NOT EXISTS vendor_name VARCHAR(255) DEFAULT 'Vedic Crafts Heritage';
ALTER TABLE products ADD COLUMN IF NOT EXISTS approval_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_APPROVAL';
ALTER TABLE products ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS approval_comments TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS approved_by VARCHAR(100);
ALTER TABLE products ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- 6. PRODUCT_CHANGE_REQUESTS TABLE (Draft Product Edit Approvals)
CREATE TABLE IF NOT EXISTS product_change_requests (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    vendor_id VARCHAR(50) REFERENCES vendors(id) ON DELETE CASCADE,
    vendor_name VARCHAR(255) DEFAULT 'Vedic Crafts Heritage',
    product_name VARCHAR(255) NOT NULL,
    proposed_name VARCHAR(255),
    proposed_price NUMERIC(10,2),
    proposed_category VARCHAR(100),
    proposed_stock INT,
    proposed_description TEXT,
    proposed_thumbnail VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING_APPROVAL',
    admin_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PRODUCT_APPROVAL_LOGS TABLE (Audit History)
CREATE TABLE IF NOT EXISTS product_approval_logs (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    admin_name VARCHAR(255) NOT NULL,
    previous_status VARCHAR(50) NOT NULL,
    new_status VARCHAR(50) NOT NULL,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. PRODUCT_VARIANTS TABLE
CREATE TABLE IF NOT EXISTS product_variants (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 0,
    attributes_json TEXT
);

-- 9. PRODUCT_IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0
);

-- 10. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(50) REFERENCES users(id),
    vendor_id VARCHAR(50) REFERENCES vendors(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    status VARCHAR(50) NOT NULL DEFAULT 'PROCESSING',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'UPI',
    subtotal NUMERIC(10,2) NOT NULL,
    discount NUMERIC(10,2) DEFAULT 0,
    shipping_fee NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) NOT NULL,
    tracking_number VARCHAR(100),
    courier_partner VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- 11. ORDER_ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1
);

-- 12. PAYOUTS TABLE
CREATE TABLE IF NOT EXISTS payouts (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    payout_number VARCHAR(50) UNIQUE NOT NULL,
    vendor_id VARCHAR(50) REFERENCES vendors(id),
    vendor_name VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    fee NUMERIC(10,2) NOT NULL,
    net_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    bank_name VARCHAR(100),
    account_ending VARCHAR(20),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- 13. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    user_id VARCHAR(50) REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    seller_reply TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. AUDIT_LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    admin_name VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
