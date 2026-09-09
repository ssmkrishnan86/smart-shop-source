-- ============================================================================
-- 05_seed_data.sql
-- Initial Seed Data matching DivineKart & SmartShop Enterprise Products
-- ============================================================================

-- Seed Users
-- Demo password for all seeded accounts below: "Password123"
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role)
VALUES 
('usr_101', 'rahul.sharma@example.com', '$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6', 'Rahul', 'Sharma', '9876543210', 'CUSTOMER'),
('usr_ven_101', 'contact@vediccrafts.com', '$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6', 'Aarav', 'Sharma', '9876543210', 'VENDOR_OWNER'),
('usr_ven_102', 'info@sacredorganics.com', '$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6', 'Priya', 'Sundaram', '9876543211', 'VENDOR_OWNER'),
('usr_admin_001', 'admin@smartshop.com', '$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6', 'Super', 'Admin', '9900011223', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Seed Vendors
INSERT INTO vendors (id, user_id, name, slug, logo, category, status, commission_rate, rating, gst_number, phone, email, street, city, state, zip_code)
VALUES 
('ven_1', 'usr_ven_101', 'Vedic Crafts Heritage', 'vedic-crafts-heritage', '/images/ganesha_idol.jpg', 'Idols & Puja Samagri', 'ACTIVE', 8.00, 4.90, '33AAAAA0000A1Z5', '9876543210', 'contact@vediccrafts.com', '123, Temple Street, Gandhi Road', 'Kanchipuram', 'Tamil Nadu', '631502'),
('ven_2', 'usr_ven_102', 'Sacred Organics & Incense', 'sacred-organics-incense', '/images/products/panchamrita_kalash.jpg', 'Puja Samagri', 'ACTIVE', 10.00, 4.85, '27BBBBB1111B2Z4', '9876543211', 'info@sacredorganics.com', '45, Giri Path, Ashram Marg', 'Varanasi', 'Uttar Pradesh', '221001')
ON CONFLICT (slug) DO NOTHING;

-- Seed Categories
INSERT INTO categories (id, name, slug, image, item_count)
VALUES 
('cat_1', 'Idols', 'idols', '/images/ganesha_idol.jpg', 450),
('cat_2', 'Puja Samagri', 'puja-samagri', '/images/puja_samagri.jpg', 820),
('cat_3', 'Rudraksha', 'rudraksha', '/images/rudraksha_mala.jpg', 140),
('cat_4', 'Books', 'books', '/images/books.jpg', 310),
('cat_5', 'Yantra', 'yantra', '/images/yantra.jpg', 95),
('cat_6', 'Incense & Dhoop', 'incense-dhoop', '/images/incense_dhoop.jpg', 280),
('cat_7', 'Ayurveda', 'ayurveda', '/images/ayurveda.jpg', 190),
('cat_8', 'Return Gifts', 'return-gifts', '/images/return_gifts.jpg', 340),
('cat_9', 'Music', 'music', '/images/music_category.jpg', 165)
ON CONFLICT (slug) DO NOTHING;

-- Seed Products
INSERT INTO products (id, vendor_id, vendor_name, name, slug, description, short_description, price, original_price, discount_percentage, category, brand, sku, stock, rating, review_count, status, approval_status, approved_by, thumbnail, is_featured)
VALUES 
('prod_1', 'ven_1', 'Vedic Crafts Heritage', 'Brass Ganesha Idol', 'brass-ganesha-idol', 'Brass Ganesha idol for home, office and puja room. Handcrafted solid brass.', 'Premium brass Ganesha idol.', 1599.00, 1999.00, 20, 'Idols', 'DivineKart Artisan', 'VD-GANESHA-8IN', 45, 4.80, 126, 'ACTIVE', 'APPROVED', 'Super Admin', '/images/products/brass_ganesha_idol.jpg', TRUE),
('prod_2', 'ven_1', 'Vedic Crafts Heritage', 'Marble Lakshmi Idol', 'marble-lakshmi-idol', 'Handcarved white marble Goddess Lakshmi idol.', 'Sacred Goddess Lakshmi idol in Makrana marble.', 2299.00, 2999.00, 23, 'Idols', 'DivineKart Artisan', 'VD-LAKSHMI-7IN', 14, 4.90, 94, 'ACTIVE', 'APPROVED', 'Super Admin', '/images/products/lakshmi_saraswati_ganesha.jpg', TRUE),
('prod_3', 'ven_2', 'Sacred Organics & Incense', 'Organic Dhoop & Incense Sticks Box', 'organic-dhoop-incense-sticks-box', 'Pure natural herbal dhoop cones and agarbatti prepared using ancient Ayurvedic formulas.', 'Organic herbal incense box.', 349.00, 499.00, 30, 'Puja Samagri', 'Sacred Organics', 'SO-DHOOP-ORGANIC', 80, 4.85, 58, 'ACTIVE', 'APPROVED', 'Super Admin', '/images/products/panchamrita_kalash.jpg', TRUE),
('prod_6', 'ven_1', 'Vedic Crafts Heritage', '5 Mukhi Certified Rudraksha Mala', '5-mukhi-certified-rudraksha-mala', 'Authentic 5 Mukhi Rudraksha Mala with 108+1 sacred beads.', 'Lab-certified 5 Mukhi Rudraksha Mala.', 1299.00, 1599.00, 18, 'Rudraksha', 'Vedic Rudraksha', 'VD-RUDRAKSHA-5M', 35, 4.90, 205, 'ACTIVE', 'APPROVED', 'Super Admin', '/images/products/5_mukhi_rudraksha_mala.jpg', FALSE),
('prod_pending_1', 'ven_1', 'Vedic Crafts Heritage', 'Silver Plated Pooja Thali Set', 'silver-plated-pooja-thali-set', 'Traditional 7-piece silver plated pooja thali set for daily rituals.', '7-piece silver pooja thali set.', 899.00, 1199.00, 25, 'Puja Samagri', 'Vedic Crafts', 'VD-THALI-SILVER', 20, 0.00, 0, 'ACTIVE', 'PENDING_APPROVAL', NULL, '/images/products/panchamrita_kalash.jpg', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- Seed Product Approval Audit Logs
INSERT INTO product_approval_logs (id, product_id, product_name, admin_name, previous_status, new_status, comments)
VALUES 
('log_1', 'prod_1', 'Brass Ganesha Idol', 'Super Admin', 'PENDING_APPROVAL', 'APPROVED', 'Product specifications and pricing verified.'),
('log_2', 'prod_2', 'Marble Lakshmi Idol', 'Super Admin', 'PENDING_APPROVAL', 'APPROVED', 'Verified Makrana marble certification.')
ON CONFLICT (id) DO NOTHING;

