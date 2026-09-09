--
-- PostgreSQL database dump
--

\restrict ilSQ4bORCWab5jSvZvvgct238NqOSSVhRl7RfuokQpZVh3YlxEvqonAgVKdQWKz

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_sub_orders DROP CONSTRAINT IF EXISTS vendor_sub_orders_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_sub_orders DROP CONSTRAINT IF EXISTS vendor_sub_orders_parent_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_settlement_ledger DROP CONSTRAINT IF EXISTS vendor_settlement_ledger_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vendor_settlement_ledger DROP CONSTRAINT IF EXISTS vendor_settlement_ledger_sub_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_verification_tokens DROP CONSTRAINT IF EXISTS user_verification_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.shopping_cart DROP CONSTRAINT IF EXISTS shopping_cart_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.shopping_cart_items DROP CONSTRAINT IF EXISTS shopping_cart_items_cart_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_variants DROP CONSTRAINT IF EXISTS product_variants_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_change_requests DROP CONSTRAINT IF EXISTS product_change_requests_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_change_requests DROP CONSTRAINT IF EXISTS product_change_requests_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_approval_logs DROP CONSTRAINT IF EXISTS product_approval_logs_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.payouts DROP CONSTRAINT IF EXISTS payouts_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.otp_codes DROP CONSTRAINT IF EXISTS otp_codes_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_timeline_logs DROP CONSTRAINT IF EXISTS order_timeline_logs_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_vendor_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_sub_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.notifications DROP CONSTRAINT IF EXISTS notifications_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.inventory_reservations DROP CONSTRAINT IF EXISTS inventory_reservations_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.inventory_reservations DROP CONSTRAINT IF EXISTS inventory_reservations_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS addresses_user_id_fkey;
DROP TRIGGER IF EXISTS update_vendors_updated_at ON public.vendors;
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
DROP TRIGGER IF EXISTS trg_shopping_cart_updated_at ON public.shopping_cart;
DROP TRIGGER IF EXISTS trg_shopping_cart_items_updated_at ON public.shopping_cart_items;
DROP TRIGGER IF EXISTS trg_addresses_updated_at ON public.addresses;
DROP INDEX IF EXISTS public.idx_wishlist_user_id;
DROP INDEX IF EXISTS public.idx_verification_tokens_user_id;
DROP INDEX IF EXISTS public.idx_verification_tokens_hash;
DROP INDEX IF EXISTS public.idx_users_email;
DROP INDEX IF EXISTS public.idx_shopping_cart_user_id;
DROP INDEX IF EXISTS public.idx_shopping_cart_items_product_id;
DROP INDEX IF EXISTS public.idx_shopping_cart_items_cart_id;
DROP INDEX IF EXISTS public.idx_reviews_product_id;
DROP INDEX IF EXISTS public.idx_refresh_tokens_user_id;
DROP INDEX IF EXISTS public.idx_refresh_tokens_token_hash;
DROP INDEX IF EXISTS public.idx_products_vendor_id;
DROP INDEX IF EXISTS public.idx_products_status;
DROP INDEX IF EXISTS public.idx_products_category;
DROP INDEX IF EXISTS public.idx_otp_codes_user_id;
DROP INDEX IF EXISTS public.idx_orders_vendor_id;
DROP INDEX IF EXISTS public.idx_orders_user_id;
DROP INDEX IF EXISTS public.idx_orders_status;
DROP INDEX IF EXISTS public.idx_notifications_user_unread;
DROP INDEX IF EXISTS public.idx_notifications_user_id;
DROP INDEX IF EXISTS public.idx_audit_logs_action;
DROP INDEX IF EXISTS public.idx_addresses_user_id;
ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS wishlist_items_pkey;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_slug_key;
ALTER TABLE IF EXISTS ONLY public.vendors DROP CONSTRAINT IF EXISTS vendors_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_sub_orders DROP CONSTRAINT IF EXISTS vendor_sub_orders_sub_order_number_key;
ALTER TABLE IF EXISTS ONLY public.vendor_sub_orders DROP CONSTRAINT IF EXISTS vendor_sub_orders_pkey;
ALTER TABLE IF EXISTS ONLY public.vendor_settlement_ledger DROP CONSTRAINT IF EXISTS vendor_settlement_ledger_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.user_verification_tokens DROP CONSTRAINT IF EXISTS user_verification_tokens_token_hash_key;
ALTER TABLE IF EXISTS ONLY public.user_verification_tokens DROP CONSTRAINT IF EXISTS user_verification_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.wishlist_items DROP CONSTRAINT IF EXISTS uq_wishlist_user_product;
ALTER TABLE IF EXISTS ONLY public.shopping_cart DROP CONSTRAINT IF EXISTS uq_shopping_cart_user;
ALTER TABLE IF EXISTS ONLY public.shopping_cart_items DROP CONSTRAINT IF EXISTS uq_cart_product;
ALTER TABLE IF EXISTS ONLY public.shopping_cart DROP CONSTRAINT IF EXISTS shopping_cart_pkey;
ALTER TABLE IF EXISTS ONLY public.shopping_cart_items DROP CONSTRAINT IF EXISTS shopping_cart_items_pkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_token_hash_key;
ALTER TABLE IF EXISTS ONLY public.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_slug_key;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_sku_key;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.product_variants DROP CONSTRAINT IF EXISTS product_variants_pkey;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS product_images_pkey;
ALTER TABLE IF EXISTS ONLY public.product_change_requests DROP CONSTRAINT IF EXISTS product_change_requests_pkey;
ALTER TABLE IF EXISTS ONLY public.product_approval_logs DROP CONSTRAINT IF EXISTS product_approval_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.payouts DROP CONSTRAINT IF EXISTS payouts_pkey;
ALTER TABLE IF EXISTS ONLY public.payouts DROP CONSTRAINT IF EXISTS payouts_payout_number_key;
ALTER TABLE IF EXISTS ONLY public.otp_codes DROP CONSTRAINT IF EXISTS otp_codes_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_order_number_key;
ALTER TABLE IF EXISTS ONLY public.order_timeline_logs DROP CONSTRAINT IF EXISTS order_timeline_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.notifications DROP CONSTRAINT IF EXISTS notifications_pkey;
ALTER TABLE IF EXISTS ONLY public.inventory_reservations DROP CONSTRAINT IF EXISTS inventory_reservations_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_slug_key;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_slug_key;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.addresses DROP CONSTRAINT IF EXISTS addresses_pkey;
DROP TABLE IF EXISTS public.wishlist_items;
DROP TABLE IF EXISTS public.vendors;
DROP TABLE IF EXISTS public.vendor_sub_orders;
DROP TABLE IF EXISTS public.vendor_settlement_ledger;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_verification_tokens;
DROP TABLE IF EXISTS public.shopping_cart_items;
DROP TABLE IF EXISTS public.shopping_cart;
DROP TABLE IF EXISTS public.reviews;
DROP TABLE IF EXISTS public.refresh_tokens;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.product_variants;
DROP TABLE IF EXISTS public.product_images;
DROP TABLE IF EXISTS public.product_change_requests;
DROP TABLE IF EXISTS public.product_approval_logs;
DROP TABLE IF EXISTS public.payouts;
DROP TABLE IF EXISTS public.otp_codes;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.order_timeline_logs;
DROP TABLE IF EXISTS public.order_items;
DROP TABLE IF EXISTS public.notifications;
DROP TABLE IF EXISTS public.inventory_reservations;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.brands;
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.addresses;
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP EXTENSION IF EXISTS "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    label character varying(50) DEFAULT 'Home'::character varying NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    street character varying(255) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    zip_code character varying(20) NOT NULL,
    country character varying(100) DEFAULT 'India'::character varying NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    admin_name character varying(255) NOT NULL,
    action character varying(100) NOT NULL,
    details text,
    ip_address character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    logo character varying(500),
    verified boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    image character varying(500),
    item_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: inventory_reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory_reservations (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    order_id character varying(50),
    sub_order_id character varying(50),
    reserved_quantity integer NOT NULL,
    status character varying(50) DEFAULT 'RESERVED'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.inventory_reservations OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    type character varying(30) DEFAULT 'SYSTEM'::character varying NOT NULL,
    link character varying(500),
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT notifications_type_check CHECK (((type)::text = ANY ((ARRAY['ORDER'::character varying, 'PROMO'::character varying, 'SYSTEM'::character varying, 'WISHLIST'::character varying])::text[])))
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    order_id character varying(50),
    product_id character varying(50),
    product_name character varying(255) NOT NULL,
    product_image character varying(500),
    price numeric(10,2) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    sub_order_id character varying(50),
    vendor_id character varying(50),
    subtotal numeric(10,2) DEFAULT 0
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_timeline_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_timeline_logs (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    order_id character varying(50),
    sub_order_id character varying(50),
    actor_type character varying(50) DEFAULT 'SYSTEM'::character varying NOT NULL,
    actor_name character varying(255) DEFAULT 'System Engine'::character varying NOT NULL,
    event_name character varying(100) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_timeline_logs OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    order_number character varying(50) NOT NULL,
    user_id character varying(50),
    vendor_id character varying(50),
    customer_name character varying(255) NOT NULL,
    customer_email character varying(255) NOT NULL,
    customer_phone character varying(50),
    street character varying(255),
    city character varying(100),
    state character varying(100),
    zip_code character varying(20),
    status character varying(50) DEFAULT 'PROCESSING'::character varying NOT NULL,
    payment_method character varying(50) DEFAULT 'UPI'::character varying NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    discount numeric(10,2) DEFAULT 0,
    shipping_fee numeric(10,2) DEFAULT 0,
    total numeric(10,2) NOT NULL,
    tracking_number character varying(100),
    courier_partner character varying(100),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL,
    order_status character varying(50) DEFAULT 'CONFIRMED'::character varying NOT NULL,
    payment_status character varying(50) DEFAULT 'PAID'::character varying NOT NULL,
    fulfillment_status character varying(50) DEFAULT 'UNFULFILLED'::character varying NOT NULL,
    shipment_status character varying(50) DEFAULT 'NOT_SHIPPED'::character varying NOT NULL,
    return_status character varying(50) DEFAULT 'NONE'::character varying NOT NULL,
    refund_status character varying(50) DEFAULT 'NONE'::character varying NOT NULL,
    payment_gateway_ref character varying(100),
    tax numeric(10,2) DEFAULT 0
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: otp_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_codes (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    code_hash character varying(255) NOT NULL,
    purpose character varying(30) DEFAULT 'MOBILE_VERIFY'::character varying NOT NULL,
    attempts integer DEFAULT 0 NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.otp_codes OWNER TO postgres;

--
-- Name: payouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payouts (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    payout_number character varying(50) NOT NULL,
    vendor_id character varying(50),
    vendor_name character varying(255) NOT NULL,
    amount numeric(10,2) NOT NULL,
    fee numeric(10,2) NOT NULL,
    net_amount numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    bank_name character varying(100),
    account_ending character varying(20),
    requested_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    processed_at timestamp with time zone
);


ALTER TABLE public.payouts OWNER TO postgres;

--
-- Name: product_approval_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_approval_logs (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    product_name character varying(255) NOT NULL,
    admin_name character varying(255) NOT NULL,
    previous_status character varying(50) NOT NULL,
    new_status character varying(50) NOT NULL,
    comments text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_approval_logs OWNER TO postgres;

--
-- Name: product_change_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_change_requests (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    vendor_id character varying(50),
    vendor_name character varying(255) DEFAULT 'Vedic Crafts Heritage'::character varying,
    product_name character varying(255) NOT NULL,
    proposed_name character varying(255),
    proposed_price numeric(10,2),
    proposed_category character varying(100),
    proposed_stock integer,
    proposed_description text,
    proposed_thumbnail character varying(500),
    status character varying(50) DEFAULT 'PENDING_APPROVAL'::character varying NOT NULL,
    admin_comments text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.product_change_requests OWNER TO postgres;

--
-- Name: product_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_images (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    url character varying(500) NOT NULL,
    is_primary boolean DEFAULT false,
    display_order integer DEFAULT 0
);


ALTER TABLE public.product_images OWNER TO postgres;

--
-- Name: product_variants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_variants (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    sku character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    attributes_json text
);


ALTER TABLE public.product_variants OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    vendor_id character varying(50),
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    description text,
    short_description text,
    price numeric(10,2) NOT NULL,
    original_price numeric(10,2),
    discount_percentage integer DEFAULT 0,
    category character varying(100) NOT NULL,
    brand character varying(100),
    sku character varying(100) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    rating numeric(3,2) DEFAULT 5.00,
    review_count integer DEFAULT 0,
    status character varying(50) DEFAULT 'ACTIVE'::character varying NOT NULL,
    thumbnail character varying(500),
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL,
    vendor_name character varying(255) DEFAULT 'Vedic Crafts Heritage'::character varying,
    approval_status character varying(50) DEFAULT 'PENDING_APPROVAL'::character varying NOT NULL,
    rejection_reason text,
    approval_comments text,
    approved_by character varying(100),
    approved_at timestamp with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_tokens (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    token_hash character varying(255) NOT NULL,
    user_agent character varying(500),
    ip_address character varying(64),
    expires_at timestamp with time zone NOT NULL,
    revoked_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.refresh_tokens OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    product_id character varying(50),
    user_id character varying(50),
    customer_name character varying(255) NOT NULL,
    rating integer NOT NULL,
    comment text,
    seller_reply text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50),
    session_id character varying(255),
    coupon_code character varying(50),
    discount_amount numeric(10,2) DEFAULT 0.00 NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.shopping_cart OWNER TO postgres;

--
-- Name: TABLE shopping_cart; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.shopping_cart IS 'One active cart per user. Persists across page refreshes and device sessions.';


--
-- Name: shopping_cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart_items (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    cart_id character varying(50) NOT NULL,
    product_id character varying(50) NOT NULL,
    product_name character varying(255) NOT NULL,
    product_thumbnail character varying(500),
    product_category character varying(100),
    product_sku character varying(100),
    unit_price numeric(10,2) NOT NULL,
    original_price numeric(10,2),
    quantity integer DEFAULT 1 NOT NULL,
    selected_variant character varying(255),
    added_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT shopping_cart_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.shopping_cart_items OWNER TO postgres;

--
-- Name: TABLE shopping_cart_items; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.shopping_cart_items IS 'Individual line items in a customer shopping cart. Prices snapshotted at add-time.';


--
-- Name: user_verification_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_verification_tokens (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    token_hash character varying(255) NOT NULL,
    purpose character varying(30) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    used_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_verification_tokens_purpose_check CHECK (((purpose)::text = ANY ((ARRAY['EMAIL_VERIFY'::character varying, 'PASSWORD_RESET'::character varying])::text[])))
);


ALTER TABLE public.user_verification_tokens OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    phone character varying(50),
    role character varying(50) DEFAULT 'CUSTOMER'::character varying NOT NULL,
    avatar text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    phone_verified boolean DEFAULT false NOT NULL,
    last_login_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: vendor_settlement_ledger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor_settlement_ledger (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    vendor_id character varying(50),
    sub_order_id character varying(50),
    gross_amount numeric(10,2) NOT NULL,
    commission_amount numeric(10,2) NOT NULL,
    fee_amount numeric(10,2) DEFAULT 0 NOT NULL,
    net_payable numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'PENDING'::character varying NOT NULL,
    settled_at timestamp with time zone,
    payout_id character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.vendor_settlement_ledger OWNER TO postgres;

--
-- Name: vendor_sub_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor_sub_orders (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    parent_order_id character varying(50),
    sub_order_number character varying(50) NOT NULL,
    vendor_id character varying(50),
    vendor_name character varying(255) NOT NULL,
    vendor_status character varying(50) DEFAULT 'NEW'::character varying NOT NULL,
    fulfillment_status character varying(50) DEFAULT 'UNFULFILLED'::character varying NOT NULL,
    shipment_status character varying(50) DEFAULT 'NOT_SHIPPED'::character varying NOT NULL,
    subtotal numeric(10,2) DEFAULT 0 NOT NULL,
    discount numeric(10,2) DEFAULT 0,
    shipping_fee numeric(10,2) DEFAULT 0,
    tax numeric(10,2) DEFAULT 0,
    total numeric(10,2) DEFAULT 0 NOT NULL,
    courier_partner character varying(100),
    tracking_number character varying(100),
    pickup_date timestamp with time zone,
    shipped_date timestamp with time zone,
    estimated_delivery_date timestamp with time zone,
    delivered_at timestamp with time zone,
    cancellation_reason text,
    return_reason text,
    commission_rate numeric(5,2) DEFAULT 8.00,
    platform_commission numeric(10,2) DEFAULT 0,
    applicable_fees numeric(10,2) DEFAULT 0,
    vendor_payable_amount numeric(10,2) DEFAULT 0,
    settlement_status character varying(50) DEFAULT 'PENDING'::character varying,
    return_window_closes_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.vendor_sub_orders OWNER TO postgres;

--
-- Name: vendors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendors (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50),
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    logo character varying(500),
    banner character varying(500),
    description text,
    category character varying(100),
    status character varying(50) DEFAULT 'PENDING_VERIFICATION'::character varying NOT NULL,
    commission_rate numeric(5,2) DEFAULT 8.00 NOT NULL,
    rating numeric(3,2) DEFAULT 5.00,
    gst_number character varying(50),
    pan_number character varying(50),
    phone character varying(50),
    email character varying(255),
    street character varying(255),
    city character varying(100),
    state character varying(100),
    zip_code character varying(20),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.vendors OWNER TO postgres;

--
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wishlist_items (
    id character varying(50) DEFAULT (public.uuid_generate_v4())::text NOT NULL,
    user_id character varying(50) NOT NULL,
    product_id character varying(50) NOT NULL,
    added_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.wishlist_items OWNER TO postgres;

--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, user_id, label, full_name, phone, street, city, state, zip_code, country, is_default, created_at, updated_at, is_deleted) FROM stdin;
addr_1	usr_101	Home	Rahul Sharma	9876543210	221B, Gandhi Nagar	Chennai	Tamil Nadu	600020	India	t	2026-08-09 02:25:14.697104+05:30	2026-08-09 02:25:14.697104+05:30	f
addr_2	usr_101	Work	Rahul Sharma	9876543211	Tech Park, OMR Road	Chennai	Tamil Nadu	600096	India	f	2026-08-09 02:25:14.697104+05:30	2026-08-09 02:25:14.697104+05:30	f
0127584c-aa2c-4ff5-9bb0-1a70ef899490	c263b889-de06-4136-a960-7c0976f99f17	Homeasdf	test	sadf	asdf	asdf	asfd	sdaf	India	f	2026-08-09 07:05:05.016065+05:30	2026-08-09 12:35:19.221436+05:30	t
30cd9551-246e-4081-813e-8d1caaedc121	c263b889-de06-4136-a960-7c0976f99f17	Home	murali krishnan	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	India	t	2026-08-09 11:18:38.654082+05:30	2026-08-09 17:10:47.048323+05:30	f
72bff0dd-c4ca-4f07-9576-c0fd6bddfc93	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	Home	Muralikrishnan	s	Kamatchi amman avenue	Kanchipuram	Tamilnadu	631502	India	t	2026-08-09 12:44:45.436963+05:30	2026-08-09 12:44:45.436969+05:30	f
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, admin_name, action, details, ip_address, created_at) FROM stdin;
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brands (id, name, slug, logo, verified, created_at, updated_at, is_deleted) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, slug, image, item_count, created_at, updated_at, is_deleted) FROM stdin;
cat_1	Idols	idols	https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=400&q=80	450	2026-08-08 23:34:11.803322+05:30	2026-08-08 23:34:11.803322+05:30	f
cat_2	Puja Samagri	puja-samagri	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80	820	2026-08-08 23:34:11.803322+05:30	2026-08-08 23:34:11.803322+05:30	f
cat_3	Rudraksha	rudraksha	/images/rudraksha_mala.jpg	140	2026-08-08 23:34:11.803322+05:30	2026-08-08 23:34:11.803322+05:30	f
cat_4	Books	books	https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80	310	2026-08-08 23:34:11.803322+05:30	2026-08-08 23:34:11.803322+05:30	f
cat_5	Yantra	yantra	/images/yantra.jpg	95	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
cat_6	Incense & Dhoop	incense-dhoop	/images/incense_dhoop.jpg	280	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
cat_7	Ayurveda	ayurveda	/images/ayurveda.jpg	190	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
cat_8	Return Gifts	return-gifts	/images/return_gifts.jpg	340	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
cat_9	Music	music	/images/music_category.jpg	165	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
\.


--
-- Data for Name: inventory_reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_reservations (id, product_id, order_id, sub_order_id, reserved_quantity, status, created_at, updated_at) FROM stdin;
b973e3f6-1796-4381-8c39-962c5da2f446	prod_1	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	5	RESERVED	2026-08-09 11:44:08.349767+05:30	2026-08-09 11:44:08.349771+05:30
8ca38891-0556-44b3-bfef-d7a8f53e449a	prod_2	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	1	RESERVED	2026-08-09 11:44:08.349779+05:30	2026-08-09 11:44:08.349781+05:30
ed46a76d-7ae7-48a3-bf75-c80c86c928b5	prod_3	8e3bb57d-b0f1-43ad-880e-86f00da46e07	e94a6279-d77a-4d6d-b5e7-ac75a958b844	8	RESERVED	2026-08-09 11:44:08.369535+05:30	2026-08-09 11:44:08.369538+05:30
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, user_id, title, message, type, link, is_read, created_at) FROM stdin;
notif_1	usr_101	Order Shipped	Your order DK-2026-0001 has been shipped and is on its way.	ORDER	\N	f	2026-08-09 02:25:14.70863+05:30
notif_2	usr_101	Festival Offer	Get 20% off on all Brass Idols this Akshaya Tritiya!	PROMO	\N	f	2026-08-09 02:25:14.70863+05:30
notif_3	usr_101	Welcome to DivineKart	Thanks for joining DivineKart. Explore our sacred collection today.	SYSTEM	\N	t	2026-08-09 02:25:14.70863+05:30
277a3af7-7855-4cfd-b9f9-4d61718d90c0	usr_101	Order Placed Successfully	Your order #DK2026110CE6 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/8e3bb57d-b0f1-43ad-880e-86f00da46e07	f	2026-08-09 11:44:08.366379+05:30
f52cf82d-22c0-4f41-bea2-edf41601024d	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026DF1A07 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/32bbcdda-389e-4762-b8a1-2baa47e3a694	f	2026-08-09 17:59:59.755428+05:30
a8638880-0e0e-4913-bf95-e77f055912f0	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026E0A273 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/dcf8348d-6d20-4843-ac49-b73da1da5871	f	2026-08-09 18:01:36.864899+05:30
81f2b244-58f2-4a7c-8e51-e1479cdd11bf	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026C41C0D has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/ddf6ae80-c38e-4b2b-89bb-165437a20582	f	2026-08-09 18:03:40.314046+05:30
8eb0b99d-749e-4b80-bf5e-050062a3d538	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026AE0E77 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	f	2026-08-09 18:04:58.529359+05:30
bfbc6d67-2bb7-42cd-96d3-75007709e895	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026CFCA5E has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/e3e15bd0-76c5-42ff-ae31-b08210723a33	f	2026-08-09 18:05:27.925137+05:30
ad4c5e42-f0e2-49d8-9e4b-43365ff29d31	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026186872 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/6fd6d5f6-6e96-46ef-ad66-400c2539e548	f	2026-08-09 18:05:58.315839+05:30
0627b148-6ad9-4c79-a2e2-c1b7e36fdcab	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026BFB9E8 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	f	2026-08-09 18:08:21.591091+05:30
fd29f673-8f53-4d02-b984-a813911b84a3	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026DAB185 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/1a79b001-c7f7-4ca2-9725-8c20bf24ff09	f	2026-08-09 18:08:58.795596+05:30
2eae8d86-8299-4a3b-bb49-6baa5e79918d	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026144D34 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/8d3359b8-afaf-41c5-ba55-32555136d5af	f	2026-08-09 18:10:15.581336+05:30
88801a66-82e1-4103-a5ea-d007cf7d6af8	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK20264FB25D has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/b8662f14-67b4-43a2-99f3-54a299858746	f	2026-08-09 18:12:25.689562+05:30
595af45a-23fc-4c75-810c-bd7c2ec3d845	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK2026C192B0 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	f	2026-08-10 05:39:36.430367+05:30
53111dbe-f0e1-46e4-a943-33535d7e613c	c263b889-de06-4136-a960-7c0976f99f17	Order Placed Successfully	Your order #DK20266A51D9 has been confirmed. Vendor sub-orders are being processed.	ORDER	/account/orders/d70ee801-50f2-40ae-aafb-7ccefb2407c6	f	2026-08-10 16:37:53.274098+05:30
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, product_name, product_image, price, quantity, sub_order_id, vendor_id, subtotal) FROM stdin;
oi_1	order_1	prod_1	Brass Ganesha Idol	/images/ganesha_idol.jpg	1599.00	1	\N	\N	0.00
oi_2	order_2	prod_2	Marble Lakshmi Idol	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	2299.00	1	\N	\N	0.00
5b98e8fc-3239-43b7-97b0-4328ac03d497	6d100bdf-7521-40a6-aacf-f506a149f892	prod_1	Brass Ganesha Idol	/images/ganesha_idol.jpg	1599.00	1	\N	\N	0.00
3fb759d3-b31c-4339-92e3-ba4a131bc44b	6d100bdf-7521-40a6-aacf-f506a149f892	prod_2	Marble Lakshmi Idol	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	2299.00	1	\N	\N	0.00
9a70a62c-e91d-4e96-8c0d-46d1a5377fce	6d100bdf-7521-40a6-aacf-f506a149f892	prod_pending_1	kungumam	http://127.0.0.1:8000/images/products/prod_img_751c7e64b4.jpg	323.00	1	\N	\N	0.00
af640793-2241-4162-ba8a-6c0f7b79d644	1bde4992-290f-4c0f-a931-1096eda1ccd8	prod_pending_1	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	\N	\N	0.00
adf9a0a5-b3ef-47e4-80d0-3f00e9e401bc	1bde4992-290f-4c0f-a931-1096eda1ccd8	prod_pending_1	Sacred Panchaloha Radha Krishna Idol (9.5 Inch)	/images/products/radha_krishna_idol.jpg	2499.00	1	\N	\N	0.00
914d4e7e-66df-4c2b-b4a8-3895571ca22b	1bde4992-290f-4c0f-a931-1096eda1ccd8	prod_pending_1	Pure Brass Nataraja Dancing Shiva Idol (10 Inch)	/images/products/nataraja_shiva_idol.jpg	2999.00	1	\N	\N	0.00
802e7142-70a4-4214-8ad6-acaf11e1546a	8e3bb57d-b0f1-43ad-880e-86f00da46e07	prod_1	Brass Ganesha Idol	/images/ganesha_idol.jpg	1599.00	5	2531d318-8934-4a29-a176-c475ad9e0225	ven_1	7995.00
f488b27f-1ccc-48c3-80d2-0cf8d09cd86d	8e3bb57d-b0f1-43ad-880e-86f00da46e07	prod_2	Marble Lakshmi Idol	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	2299.00	1	2531d318-8934-4a29-a176-c475ad9e0225	ven_1	2299.00
27bb9204-30d2-4c7e-bad3-77222f9b15d0	8e3bb57d-b0f1-43ad-880e-86f00da46e07	prod_3	Organic Dhoop	\N	349.00	8	e94a6279-d77a-4d6d-b5e7-ac75a958b844	ven_2	2792.00
5ad6aef0-b624-4558-a2d4-6292937e5eef	ce2f089f-ccdc-4d01-aca9-e420734b59bc	prod_pending_1	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	\N	\N	0.00
0751f49b-7583-43bc-97b1-9dea58167ec2	ce2f089f-ccdc-4d01-aca9-e420734b59bc	prod_pending_1	Sacred Panchaloha Radha Krishna Idol (9.5 Inch)	/images/products/radha_krishna_idol.jpg	2499.00	1	\N	\N	0.00
8655c36e-7977-46c0-8411-c3c598319315	ce2f089f-ccdc-4d01-aca9-e420734b59bc	prod_pending_1	Pure Brass Nataraja Dancing Shiva Idol (10 Inch)	/images/products/nataraja_shiva_idol.jpg	2999.00	1	\N	\N	0.00
ef3d8bbd-e881-4094-a8e9-c39e55406307	5f94135d-6979-4a8a-a4c4-de5bf6ae9227	prod_pending_1	Brass Goddess Durga Idol on Lion (8.5 Inch)	/images/products/durga_idol.jpg	2199.00	1	\N	\N	0.00
1206a4b7-6665-4890-b0b0-bd8594eb0a4c	5f94135d-6979-4a8a-a4c4-de5bf6ae9227	prod_pending_1	Kanchi Kamakshi Amman Brass Idol (7 Inch)	/images/products/kamakshi_amman.jpg	1799.00	1	\N	\N	0.00
5c53a1ca-c981-412a-9922-1f861f437ef1	deef3c82-c7bb-4024-9bae-eee4f527049a	prod_1	Brass Ganesha Idol	/images/ganesha_idol.jpg	1599.00	1	\N	\N	0.00
da869248-d016-4e8a-a794-03af37770fb3	deef3c82-c7bb-4024-9bae-eee4f527049a	prod_2	Marble Lakshmi Idol	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	2299.00	1	\N	\N	0.00
76ecd85a-b01f-476e-9bc5-4942d490950a	deef3c82-c7bb-4024-9bae-eee4f527049a	prod_pending_1	Pure Brass Nataraja Dancing Shiva Idol (10 Inch)	/images/products/nataraja_shiva_idol.jpg	2999.00	1	\N	\N	0.00
6fa586e7-c0e8-457b-a857-4b7e9edea15e	b8a1c801-a948-4942-b0ae-f88f80883c0f	prod_pending_1	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	\N	\N	0.00
b3748fb5-5dd7-482d-925c-9f46cd44207f	b8a1c801-a948-4942-b0ae-f88f80883c0f	prod_pending_1	Sacred Panchaloha Radha Krishna Idol (9.5 Inch)	/images/products/radha_krishna_idol.jpg	2499.00	1	\N	\N	0.00
9c672797-5b62-4fe1-a7af-2c00bc279cad	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	6ad3811d-edc8-4ade-b64c-c9fb8c176ba5	ven_1	1599.00
d307151d-b568-4f24-8cde-17578e0d1416	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	Sacred Panchaloha Radha Krishna Idol (9.5 Inch)	/images/products/radha_krishna_idol.jpg	2499.00	1	6ad3811d-edc8-4ade-b64c-c9fb8c176ba5	ven_1	2499.00
21d826f3-2615-4ec8-80d4-08b604fd1cf5	dcf8348d-6d20-4843-ac49-b73da1da5871	\N	Brass Goddess Durga Idol on Lion (8.5 Inch)	/images/products/durga_idol.jpg	2199.00	1	3f9cc94d-71b9-4663-9ab6-aea99a30ecf1	ven_1	2199.00
7a5e6232-5b7b-4737-b414-cee45b26451e	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	fb476209-2cda-497d-990c-35f4cfd7216d	ven_1	1599.00
01f7f5ac-097a-4a04-9c5e-f941a3b10a75	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	Black Stone Mahadev Shiva Lingam with Brass Yoni Base	/images/products/shiva_lingam.jpg	1499.00	1	e922d22b-b424-4209-a37c-e48af56c70b8	ven_1	1499.00
740f3e94-676a-4d67-8110-3d4521d8cc8f	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	2	776fb8c6-c779-43d5-976b-fa130f62b376	ven_1	3198.00
bd4de912-24f9-4522-b908-85c94aadd553	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	Black Stone Mahadev Shiva Lingam with Brass Yoni Base	/images/products/shiva_lingam.jpg	1499.00	1	03c51076-038a-46c9-bc68-373f31dd48e3	ven_1	1499.00
80523ca3-bfec-443a-89d3-db3bdcf9e335	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	\N	Marble Dust Goddess Lakshmi Saraswati Ganesha Set	/images/products/lakshmi_saraswati_ganesha.jpg	1899.00	1	5d6f0256-bc0f-441f-a1ee-86808a82b7f4	ven_1	1899.00
c58fa85b-c8e1-479e-ac12-9a6505b96520	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	1646722f-8be5-425b-a7de-2cd782f12fee	ven_1	1599.00
fa4317f2-e725-415b-9d0b-a5fea959c6ba	b8662f14-67b4-43a2-99f3-54a299858746	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	926740bf-d6a6-4654-90d0-40e6d8af5856	ven_1	1599.00
0e015e52-61dd-4a9d-9a7e-d993ef9cf6df	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	Sacred Hanuman Chalisa & Sundarkand Pocket Leatherette Edition	/images/products/hanuman_chalisa_pocket.jpg	299.00	1	8c279e3f-d367-492e-8abe-5b51451b7265	ven_1	299.00
802931b5-5a0f-4dbf-ae37-c13a3fec28ef	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	abc prod	http://localhost:8000/images/products/prod_img_3506dd8f8b.jpg	5000.00	1	55b0336f-c664-44d3-8be7-e0dc8777b8e3	ven_1	5000.00
db32d193-a14d-4fce-a99f-22d8f7794bff	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	55b0336f-c664-44d3-8be7-e0dc8777b8e3	ven_1	1599.00
5478fbcf-a6f3-4485-b003-53071708326e	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	Pure Brass Lord Balaji Venkateshwara Idol (12 Inch)	/images/products/balaji_venkateshwara.jpg	3499.00	1	bd016ae0-55d8-4894-adde-34587b8f33ca	ven_1	3499.00
31e594c0-7a13-4ec1-9ee3-43400eb0128a	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	Handcrafted Antique Brass Ganesha Idol (8 Inch)	/images/products/brass_ganesha_idol.jpg	1599.00	1	bd016ae0-55d8-4894-adde-34587b8f33ca	ven_1	1599.00
\.


--
-- Data for Name: order_timeline_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_timeline_logs (id, order_id, sub_order_id, actor_type, actor_name, event_name, description, created_at) FROM stdin;
020ff237-bb83-4180-9b1a-6e5a13385073	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026110CE6-V1 allocated to Vedic Crafts Heritage with 2 product(s).	2026-08-09 11:44:08.353041+05:30
4157c46e-efa4-4781-be4c-db40abcf41d4	8e3bb57d-b0f1-43ad-880e-86f00da46e07	e94a6279-d77a-4d6d-b5e7-ac75a958b844	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026110CE6-V2 allocated to Sacred Organics & Incense with 1 product(s).	2026-08-09 11:44:08.372359+05:30
6e8c3d92-3b9d-4fb5-831a-6cf2f5f7d859	8e3bb57d-b0f1-43ad-880e-86f00da46e07	\N	CUSTOMER	Rahul Sharma	Order Placed	Customer placed order #DK2026110CE6 for total ₹15441.48.	2026-08-09 11:44:08.372366+05:30
79c68fc5-9c88-413c-b5f5-582f3b7723a3	8e3bb57d-b0f1-43ad-880e-86f00da46e07	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via UPI. Ref: PG_TXN_D185928A11	2026-08-09 11:44:08.37237+05:30
c61eac0e-34bf-4eaa-9c57-94f47f83a839	8e3bb57d-b0f1-43ad-880e-86f00da46e07	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 11:44:08.372373+05:30
858c8549-0ed2-4a77-ae1a-edf30a3564ef	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	VENDOR	Vedic Crafts Heritage	Vendor Accepted	Vedic Crafts Heritage accepted sub-order #DK2026110CE6-V1 for processing.	2026-08-09 17:32:58.599539+05:30
01ec55a0-4f8a-46e2-8644-2ea199a09d39	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	VENDOR	Vedic Crafts Heritage	Order Packed	Vedic Crafts Heritage packed sub-order #DK2026110CE6-V1 and generated packing slip.	2026-08-09 17:32:59.849782+05:30
55b86d75-26ba-4a82-824e-0d70c33606f9	8e3bb57d-b0f1-43ad-880e-86f00da46e07	2531d318-8934-4a29-a176-c475ad9e0225	VENDOR	Vedic Crafts Heritage	Order Shipped	Vedic Crafts Heritage shipped sub-order #DK2026110CE6-V1 via BlueDart Express (AWB: BD-81390441).	2026-08-09 17:33:01.897336+05:30
fbb4ac83-151a-4513-ace5-e9257b2e567d	32bbcdda-389e-4762-b8a1-2baa47e3a694	6ad3811d-edc8-4ade-b64c-c9fb8c176ba5	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026DF1A07-V1 allocated to Vedic Crafts Heritage with 2 product(s).	2026-08-09 17:59:59.77253+05:30
5e9f183a-bd32-4122-89e9-259e8c6c5323	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026DF1A07 for total ₹4835.64.	2026-08-09 17:59:59.77255+05:30
e9aaa0d5-f038-46f9-b62e-fc151ec51726	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_215CEC06F2	2026-08-09 17:59:59.772565+05:30
cb27ce3e-1c50-49b1-a948-daf2a28e5091	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 17:59:59.772575+05:30
3bbab109-522d-41ba-9ea2-9eafef8e64b6	32bbcdda-389e-4762-b8a1-2baa47e3a694	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_db892643cad6 for amount ₹4835.64. Key ID: rzp_test_SmartShopKey123	2026-08-09 17:59:59.88479+05:30
6a28adb8-b21e-43cc-9e09-f09dd44056bb	dcf8348d-6d20-4843-ac49-b73da1da5871	3f9cc94d-71b9-4663-9ab6-aea99a30ecf1	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026E0A273-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:01:36.866903+05:30
b0202538-3603-4673-bc78-9333c2970224	dcf8348d-6d20-4843-ac49-b73da1da5871	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026E0A273 for total ₹2594.82.	2026-08-09 18:01:36.866908+05:30
f7579dc6-6a14-45ad-9a06-7b8cad6018ce	dcf8348d-6d20-4843-ac49-b73da1da5871	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via CREDIT_CARD. Ref: PG_TXN_65CD69D3FC	2026-08-09 18:01:36.866913+05:30
ad142c0d-59e0-4e4b-8a5e-30afe9f4a44f	dcf8348d-6d20-4843-ac49-b73da1da5871	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:01:36.866917+05:30
54cfa3ed-9c4d-45ee-85f6-42b00e296693	dcf8348d-6d20-4843-ac49-b73da1da5871	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_b2fad19103f7 for amount ₹2594.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:01:36.895903+05:30
b7742487-bfee-4bf1-9236-9eca3ec5e320	ddf6ae80-c38e-4b2b-89bb-165437a20582	fb476209-2cda-497d-990c-35f4cfd7216d	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026C41C0D-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:03:40.31837+05:30
8cd5872a-10eb-48f3-85dc-bb74ff58d33a	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026C41C0D for total ₹1886.82.	2026-08-09 18:03:40.318387+05:30
9d0eb42e-da0a-4a74-a035-fb3947ba9d59	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via CREDIT_CARD. Ref: PG_TXN_304FA3F2D0	2026-08-09 18:03:40.318397+05:30
06770ef2-6c5d-40cc-915e-fd9a2409aebb	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:03:40.318408+05:30
decd1c8e-9d41-4c29-9b92-e91b4eac4267	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_0171819f39da for amount ₹1886.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:03:40.364201+05:30
bf3aef5b-a45d-4c4e-a58e-dfa43735c884	ddf6ae80-c38e-4b2b-89bb-165437a20582	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM42TMQ4YA4. Order #order_rzp_0171819f39da.	2026-08-09 18:03:41.927081+05:30
72efe04c-7ea9-44c9-b779-e964f6453c5d	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	e922d22b-b424-4209-a37c-e48af56c70b8	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026AE0E77-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:04:58.532286+05:30
d80db096-25cf-428a-8d4f-6bfcba84a52f	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026AE0E77 for total ₹1768.82.	2026-08-09 18:04:58.532299+05:30
b513d466-0111-463f-8288-e469aa7ff712	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via UPI. Ref: PG_TXN_9FCA33DB5C	2026-08-09 18:04:58.532308+05:30
77fbde89-044e-493e-8018-cb8c201322a3	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:04:58.532315+05:30
d9488005-b838-43d0-a6dc-d1dffdbe9a17	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_b4eaba8fc2a0 for amount ₹1768.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:04:58.576246+05:30
8c954339-60cd-4469-a0d2-85f0e7317aa4	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM44HZF1XII. Order #order_rzp_b4eaba8fc2a0.	2026-08-09 18:04:59.810303+05:30
8b449d7c-d64c-484a-8b0a-f09d4c09200c	e3e15bd0-76c5-42ff-ae31-b08210723a33	776fb8c6-c779-43d5-976b-fa130f62b376	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026CFCA5E-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:05:27.927934+05:30
ef771768-96d6-469a-8529-5af1f801a057	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026CFCA5E for total ₹3773.64.	2026-08-09 18:05:27.927942+05:30
1d62f9f9-aff5-4bce-ab10-edef13b7010a	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_D8C0A77DEF	2026-08-09 18:05:27.927946+05:30
07212aa3-9f65-4023-a22c-f3681d30a788	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:05:27.92795+05:30
1fcb4483-f68c-46f2-8592-721d6c4f7f88	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_236844e696d0 for amount ₹3773.64. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:05:27.96545+05:30
2136c61a-dae4-410f-b16c-ab9d3652c77a	e3e15bd0-76c5-42ff-ae31-b08210723a33	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM454NXQTE1. Order #order_rzp_236844e696d0.	2026-08-09 18:05:29.21578+05:30
296f4df7-ce7c-46d3-802d-c508bafbd255	6fd6d5f6-6e96-46ef-ad66-400c2539e548	03c51076-038a-46c9-bc68-373f31dd48e3	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026186872-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:05:58.321506+05:30
a00df397-dad7-4081-9878-9bca333f79f5	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026186872 for total ₹1768.82.	2026-08-09 18:05:58.321518+05:30
f1b4ab4c-5f1c-453c-adf7-f3489623a5da	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_D4CF97ABAE	2026-08-09 18:05:58.321525+05:30
23a2df38-bc68-43e4-b5ec-fb9d73316802	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:05:58.321532+05:30
b13a6cf2-dd08-4c85-ae97-f2de681763bf	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_c2e86e675645 for amount ₹1768.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:05:58.372014+05:30
828b0dc1-9cc2-495d-8355-9cace72aef73	6fd6d5f6-6e96-46ef-ad66-400c2539e548	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM45S4CQJKF. Order #order_rzp_c2e86e675645.	2026-08-09 18:05:59.597108+05:30
2c09152c-658b-4c22-9bd8-c71732d0fbad	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM4A1XXKC5K. Order #order_rzp_6af387c42b49.	2026-08-09 18:09:19.573241+05:30
12daa514-569a-48b6-9945-812896e5435f	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	5d6f0256-bc0f-441f-a1ee-86808a82b7f4	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026BFB9E8-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:08:21.595704+05:30
7d488775-d6e9-4437-8941-e9e889d8c80e	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026BFB9E8 for total ₹2240.82.	2026-08-09 18:08:21.595714+05:30
2c4c08fa-81eb-4787-a355-adb795b5619b	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_06C239DCCB	2026-08-09 18:08:21.595719+05:30
12095e98-2a88-452b-b456-e85eae78f67b	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:08:21.595726+05:30
62271253-7876-4206-8add-9d27f19e0f65	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_9f6d9c08fe17 for amount ₹2240.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:08:21.633558+05:30
383c7ab4-f8aa-4730-a90d-a1aae9b86b85	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	1646722f-8be5-425b-a7de-2cd782f12fee	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026DAB185-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:08:58.798166+05:30
61d19c8a-6ff9-4739-a0a2-b69f6fe3d45a	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026DAB185 for total ₹1886.82.	2026-08-09 18:08:58.798173+05:30
529c9113-fc2e-47d0-b37b-f39f2d346faa	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_0697B813C4	2026-08-09 18:08:58.798176+05:30
8c355042-881b-4797-8ef5-099347827ae0	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:08:58.79818+05:30
55de5b85-6940-44ec-a92b-73351c20959b	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_6af387c42b49 for amount ₹1886.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:08:58.836991+05:30
d08ff8a6-965d-45bf-877d-d6c9624070e8	8d3359b8-afaf-41c5-ba55-32555136d5af	8c279e3f-d367-492e-8abe-5b51451b7265	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026144D34-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:10:15.594569+05:30
88730bc5-80a9-4b9e-a0e4-737af2850559	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026144D34 for total ₹412.82.	2026-08-09 18:10:15.59458+05:30
a4f2ebb8-72ec-4313-97e0-63b5eb2fb90d	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via WALLETS. Ref: PG_TXN_83135C128B	2026-08-09 18:10:15.594588+05:30
36be8295-254b-432a-ae58-799807170347	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:10:15.594595+05:30
d8aaf18f-d4d6-4454-87ac-3d2c62793fa3	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_26061b7cf8c1 for amount ₹412.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:10:15.651354+05:30
e81babff-1956-4b37-805e-30cb688fbf31	8d3359b8-afaf-41c5-ba55-32555136d5af	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM4BJ2WAZ15. Order #order_rzp_26061b7cf8c1.	2026-08-09 18:10:28.131991+05:30
160fde28-447e-4592-a599-06b51851a952	b8662f14-67b4-43a2-99f3-54a299858746	926740bf-d6a6-4654-90d0-40e6d8af5856	SYSTEM	Order Service	Vendor Notified	Sub-order #DK20264FB25D-V1 allocated to Vedic Crafts Heritage with 1 product(s).	2026-08-09 18:12:25.693263+05:30
2cefc5f9-fb0f-486e-b8de-a53f44d95f7f	b8662f14-67b4-43a2-99f3-54a299858746	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK20264FB25D for total ₹1886.82.	2026-08-09 18:12:25.693275+05:30
15ca77c9-2e7d-4a2a-b550-d6324fe898e5	b8662f14-67b4-43a2-99f3-54a299858746	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_B20DDD4DEF	2026-08-09 18:12:25.693282+05:30
aa8340f1-7afb-477d-8616-fc9a442bc7e2	b8662f14-67b4-43a2-99f3-54a299858746	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-09 18:12:25.693288+05:30
3eba8f42-1401-4c03-adb7-f5830687143b	b8662f14-67b4-43a2-99f3-54a299858746	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_aa7dae8177ce for amount ₹1886.82. Key ID: rzp_test_SmartShopKey123	2026-08-09 18:12:25.748085+05:30
403c8f89-70f7-4d2f-b5c0-e32bf9b8cb59	b8662f14-67b4-43a2-99f3-54a299858746	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSM4E471SS7W. Order #order_rzp_aa7dae8177ce.	2026-08-09 18:12:28.496827+05:30
4b02d7d2-9bec-4c6f-a06e-02179be22cf2	b8662f14-67b4-43a2-99f3-54a299858746	\N	CUSTOMER	murali krishnan	Order Cancelled	Order cancelled by customer. Reason: Ordered by mistake. Stock released to inventory.	2026-08-09 18:15:02.959451+05:30
1cb25e43-e68d-46bd-b0ac-bf8cedc6eefa	8d3359b8-afaf-41c5-ba55-32555136d5af	8c279e3f-d367-492e-8abe-5b51451b7265	VENDOR	Vedic Crafts Heritage	Order Packed	Vedic Crafts Heritage packed sub-order #DK2026144D34-V1 and generated packing slip.	2026-08-09 18:27:31.118661+05:30
83ee62bf-5fae-4942-8341-84d96666a815	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	55b0336f-c664-44d3-8be7-e0dc8777b8e3	SYSTEM	Order Service	Vendor Notified	Sub-order #DK2026C192B0-V1 allocated to Vedic Crafts Heritage with 2 product(s).	2026-08-10 05:39:36.475969+05:30
22058261-bf42-405c-b171-1fa6e2577373	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK2026C192B0 for total ₹7786.82.	2026-08-10 05:39:36.476007+05:30
b6d79a25-076e-4edf-8739-fcfca2114f15	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via NET_BANKING. Ref: PG_TXN_63F06FB8EE	2026-08-10 05:39:36.476029+05:30
8ae5266b-4104-4f37-bc55-ac7f8afbc6e7	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-10 05:39:36.476049+05:30
f9108982-6a1c-4f76-9a48-d4bce26e580e	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_6893cd2c8e92 for amount ₹7786.82. Key ID: rzp_test_SmartShopKey123	2026-08-10 05:39:36.650762+05:30
bde90533-879e-4d76-8a3e-63531f7dd2c0	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSMSXWJR2E4O. Order #order_rzp_6893cd2c8e92.	2026-08-10 05:39:42.533988+05:30
28134f28-d5e3-4aa1-9f51-8cd4c5f7a2a3	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	55b0336f-c664-44d3-8be7-e0dc8777b8e3	VENDOR	Vedic Crafts Heritage	Order Packed	Vedic Crafts Heritage packed sub-order #DK2026C192B0-V1 and generated packing slip.	2026-08-10 05:43:15.839702+05:30
e7f7fa94-9e99-45ce-be85-7267da541a1a	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	55b0336f-c664-44d3-8be7-e0dc8777b8e3	VENDOR	Vedic Crafts Heritage	Order Shipped	Vedic Crafts Heritage shipped sub-order #DK2026C192B0-V1 via Delhivery Logistics (AWB: BD-15345750).	2026-08-10 05:43:32.557335+05:30
d9c2d7eb-1a9f-4eb5-8577-e39449f8cb2d	d70ee801-50f2-40ae-aafb-7ccefb2407c6	bd016ae0-55d8-4894-adde-34587b8f33ca	SYSTEM	Order Service	Vendor Notified	Sub-order #DK20266A51D9-V1 allocated to Vedic Crafts Heritage with 2 product(s).	2026-08-10 16:37:53.330732+05:30
ac8d2ba6-3f74-4629-a6e2-ca5fd737df7a	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	CUSTOMER	murali krishnan	Order Placed	Customer placed order #DK20266A51D9 for total ₹6015.64.	2026-08-10 16:37:53.330745+05:30
98598ffb-f872-47dc-be72-36fd1e8f9179	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	SYSTEM	Payment Gateway	Payment Confirmed	Payment verified successfully via CREDIT_CARD. Ref: PG_TXN_7F9410C42C	2026-08-10 16:37:53.330751+05:30
23a87c5c-285d-4904-aeba-65f48b8a3a2e	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	SYSTEM	Inventory Engine	Inventory Reserved	Stock quantities reserved across vendor warehouses.	2026-08-10 16:37:53.330757+05:30
38a16991-92ea-40e1-8815-0a1d99e0dbd5	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	SYSTEM	Razorpay Engine	Razorpay Order Created	Generated Razorpay Order #order_rzp_7e8cbc1b935f for amount ₹6015.64. Key ID: rzp_test_SmartShopKey123	2026-08-10 16:37:53.748764+05:30
75f92535-31aa-4e7a-af43-577b902fc1ff	d70ee801-50f2-40ae-aafb-7ccefb2407c6	\N	SYSTEM	Razorpay Engine	Payment Confirmed	Razorpay payment verified successfully. Payment Ref: rzp_pay_MSNGGG0O8XZS. Order #order_rzp_7e8cbc1b935f.	2026-08-10 16:37:58.776558+05:30
c018a8a8-2f02-4f5e-921f-a7d36e0f13a3	d70ee801-50f2-40ae-aafb-7ccefb2407c6	bd016ae0-55d8-4894-adde-34587b8f33ca	VENDOR	Vedic Crafts Heritage	Order Packed	Vedic Crafts Heritage packed sub-order #DK20266A51D9-V1 and generated packing slip.	2026-08-10 16:38:14.849317+05:30
b35e6c2e-06f7-4f01-a493-7b8bc3097b2e	d70ee801-50f2-40ae-aafb-7ccefb2407c6	bd016ae0-55d8-4894-adde-34587b8f33ca	VENDOR	Vedic Crafts Heritage	Order Shipped	Vedic Crafts Heritage shipped sub-order #DK20266A51D9-V1 via Delhivery Logistics (AWB: BD-39062314).	2026-08-10 16:38:24.298641+05:30
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, order_number, user_id, vendor_id, customer_name, customer_email, customer_phone, street, city, state, zip_code, status, payment_method, subtotal, discount, shipping_fee, total, tracking_number, courier_partner, created_at, updated_at, is_deleted, order_status, payment_status, fulfillment_status, shipment_status, return_status, refund_status, payment_gateway_ref, tax) FROM stdin;
order_1	DK-2026-0001	usr_101	ven_1	Rahul Sharma	rahul.sharma@example.com	9876543210	221B, Gandhi Nagar	Chennai	Tamil Nadu	600020	DELIVERED	UPI	1599.00	0.00	0.00	1599.00	TRK1029384756	BlueDart	2026-08-09 02:25:14.719228+05:30	2026-08-09 02:25:14.719228+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
order_2	DK-2026-0002	usr_101	ven_1	Rahul Sharma	rahul.sharma@example.com	9876543210	221B, Gandhi Nagar	Chennai	Tamil Nadu	600020	PROCESSING	UPI	2299.00	20.00	0.00	2279.00	\N	\N	2026-08-09 02:25:14.719228+05:30	2026-08-09 02:25:14.719228+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
6d100bdf-7521-40a6-aacf-f506a149f892	DK-2026-2EAEAA18	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	test	saf	asfd	2342	PROCESSING	CASH_ON_DELIVERY	4221.00	0.00	0.00	4980.78	\N	\N	2026-08-09 11:22:55.812072+05:30	2026-08-09 11:22:55.812081+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
1bde4992-290f-4c0f-a931-1096eda1ccd8	DK-2026-E2AA0B82	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	PROCESSING	CASH_ON_DELIVERY	7097.00	0.00	0.00	8374.46	\N	\N	2026-08-09 11:40:58.298892+05:30	2026-08-09 11:40:58.298896+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
ce2f089f-ccdc-4d01-aca9-e420734b59bc	DK-2026-DBBBAC71	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	PROCESSING	CASH_ON_DELIVERY	7097.00	0.00	0.00	8374.46	\N	\N	2026-08-09 11:45:46.670803+05:30	2026-08-09 11:45:46.670811+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
5f94135d-6979-4a8a-a4c4-de5bf6ae9227	DK-2026-743CA2C4	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	PROCESSING	CASH_ON_DELIVERY	3998.00	0.00	0.00	4717.64	\N	\N	2026-08-09 11:48:39.675589+05:30	2026-08-09 11:48:39.675596+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
deef3c82-c7bb-4024-9bae-eee4f527049a	DK-2026-EFD24AB5	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	\N	Muralikrishnan	ssmkrishnan86@gmail.com	s	Kamatchi amman avenue	Kanchipuram	Tamilnadu	631502	PROCESSING	UPI	6897.00	0.00	0.00	8138.46	\N	\N	2026-08-09 12:45:08.182669+05:30	2026-08-09 12:45:08.182676+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
b8a1c801-a948-4942-b0ae-f88f80883c0f	DK-2026-82B1672A	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	PROCESSING	CASH_ON_DELIVERY	4098.00	0.00	0.00	4835.64	\N	\N	2026-08-09 12:58:51.105793+05:30	2026-08-09 12:58:51.105797+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	\N	0.00
8e3bb57d-b0f1-43ad-880e-86f00da46e07	DK2026110CE6	usr_101	\N	Rahul Sharma	rahul.sharma@example.com	9876543210	123, Temple Street	Kanchipuram	Tamil Nadu	631502	PARTIALLY_SHIPPED	UPI	13086.00	0.00	0.00	15441.48	\N	\N	2026-08-09 11:44:08.325992+05:30	2026-08-09 23:03:01.882876+05:30	f	PARTIALLY_SHIPPED	PAID	PROCESSING	SHIPPED	NONE	NONE	PG_TXN_D185928A11	2355.48
32bbcdda-389e-4762-b8a1-2baa47e3a694	DK2026DF1A07	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	NET_BANKING	4098.00	0.00	0.00	4835.64	\N	\N	2026-08-09 17:59:59.70697+05:30	2026-08-09 23:29:59.869192+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	order_rzp_db892643cad6	737.64
dcf8348d-6d20-4843-ac49-b73da1da5871	DK2026E0A273	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	CREDIT_CARD	2199.00	0.00	0.00	2594.82	\N	\N	2026-08-09 18:01:36.857037+05:30	2026-08-09 23:31:36.889815+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	order_rzp_b2fad19103f7	395.82
6fd6d5f6-6e96-46ef-ad66-400c2539e548	DK2026186872	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	NET_BANKING	1499.00	0.00	0.00	1768.82	\N	\N	2026-08-09 18:05:58.303895+05:30	2026-08-09 23:35:59.587298+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM45S4CQJKF	269.82
ddf6ae80-c38e-4b2b-89bb-165437a20582	DK2026C41C0D	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	CREDIT_CARD	1599.00	0.00	0.00	1886.82	\N	\N	2026-08-09 18:03:40.298186+05:30	2026-08-09 23:33:41.895116+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM42TMQ4YA4	287.82
f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	DK2026AE0E77	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	UPI	1499.00	0.00	0.00	1768.82	\N	\N	2026-08-09 18:04:58.519652+05:30	2026-08-09 23:34:59.795527+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM44HZF1XII	269.82
cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	DK2026BFB9E8	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	NET_BANKING	1899.00	0.00	0.00	2240.82	\N	\N	2026-08-09 18:08:21.580115+05:30	2026-08-09 23:38:21.628379+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	order_rzp_9f6d9c08fe17	341.82
e3e15bd0-76c5-42ff-ae31-b08210723a33	DK2026CFCA5E	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	NET_BANKING	3198.00	0.00	0.00	3773.64	\N	\N	2026-08-09 18:05:27.916656+05:30	2026-08-09 23:35:29.190305+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM454NXQTE1	575.64
8d3359b8-afaf-41c5-ba55-32555136d5af	DK2026144D34	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	PROCESSING	WALLETS	299.00	0.00	60.00	412.82	\N	\N	2026-08-09 18:10:15.571175+05:30	2026-08-09 23:57:31.079397+05:30	f	PROCESSING	PAID	PROCESSING	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM4BJ2WAZ15	53.82
1a79b001-c7f7-4ca2-9725-8c20bf24ff09	DK2026DAB185	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CONFIRMED	NET_BANKING	1599.00	0.00	0.00	1886.82	\N	\N	2026-08-09 18:08:58.788411+05:30	2026-08-09 23:39:19.560693+05:30	f	CONFIRMED	PAID	UNFULFILLED	NOT_SHIPPED	NONE	NONE	rzp_pay_MSM4A1XXKC5K	287.82
ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	DK2026C192B0	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	SHIPPED	NET_BANKING	6599.00	0.00	0.00	7786.82	\N	\N	2026-08-10 05:39:36.369325+05:30	2026-08-10 11:13:32.527524+05:30	f	SHIPPED	PAID	PROCESSING	SHIPPED	NONE	NONE	rzp_pay_MSMSXWJR2E4O	1187.82
b8662f14-67b4-43a2-99f3-54a299858746	DK20264FB25D	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	CANCELLED	NET_BANKING	1599.00	0.00	0.00	1886.82	\N	\N	2026-08-09 18:12:25.676532+05:30	2026-08-09 23:45:02.913901+05:30	f	CANCELLED	PAID	CANCELLED	NOT_SHIPPED	NONE	INITIATED	rzp_pay_MSM4E471SS7W	287.82
d70ee801-50f2-40ae-aafb-7ccefb2407c6	DK20266A51D9	c263b889-de06-4136-a960-7c0976f99f17	\N	murali krishnan	vensun@gmail.com	9500984141	58/18 kailasanathar koil mettu street	kanchipuram	tamilnadu	631502	SHIPPED	CREDIT_CARD	5098.00	0.00	0.00	6015.64	\N	\N	2026-08-10 16:37:53.160931+05:30	2026-08-10 22:08:24.250259+05:30	f	SHIPPED	PAID	PROCESSING	SHIPPED	NONE	NONE	rzp_pay_MSNGGG0O8XZS	917.64
\.


--
-- Data for Name: otp_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otp_codes (id, user_id, phone, code_hash, purpose, attempts, expires_at, verified_at, created_at) FROM stdin;
\.


--
-- Data for Name: payouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payouts (id, payout_number, vendor_id, vendor_name, amount, fee, net_amount, status, bank_name, account_ending, requested_at, processed_at) FROM stdin;
\.


--
-- Data for Name: product_approval_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_approval_logs (id, product_id, product_name, admin_name, previous_status, new_status, comments, created_at) FROM stdin;
log_1	prod_1	Brass Ganesha Idol	Super Admin	PENDING_APPROVAL	APPROVED	Product specifications and pricing verified.	2026-08-08 23:57:52.717378+05:30
log_2	prod_2	Marble Lakshmi Idol	Super Admin	PENDING_APPROVAL	APPROVED	Verified Makrana marble certification.	2026-08-08 23:57:52.717378+05:30
\.


--
-- Data for Name: product_change_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_change_requests (id, product_id, vendor_id, vendor_name, product_name, proposed_name, proposed_price, proposed_category, proposed_stock, proposed_description, proposed_thumbnail, status, admin_comments, created_at) FROM stdin;
\.


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_images (id, product_id, url, is_primary, display_order) FROM stdin;
\.


--
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_variants (id, product_id, sku, title, price, stock, attributes_json) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, vendor_id, name, slug, description, short_description, price, original_price, discount_percentage, category, brand, sku, stock, rating, review_count, status, thumbnail, is_featured, created_at, updated_at, is_deleted, vendor_name, approval_status, rejection_reason, approval_comments, approved_by, approved_at) FROM stdin;
prod_pending_1	ven_1	Silver Plated Pooja Thali Set	silver-plated-pooja-thali-set	Traditional 7-piece silver plated pooja thali set for daily rituals.	7-piece silver pooja thali set.	899.00	1199.00	25	Puja Samagri	Vedic Crafts	VD-THALI-SILVER	20	0.00	0	ACTIVE	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	f	2026-08-09 01:46:26.281517+05:30	2026-08-09 01:46:26.281517+05:30	f	Vedic Crafts Heritage	PENDING_APPROVAL	\N	\N	\N	\N
prod_6	ven_1	5 Mukhi Certified Rudraksha Mala	5-mukhi-certified-rudraksha-mala	Authentic 5 Mukhi Rudraksha Mala with 108+1 sacred beads.	Lab-certified 5 Mukhi Rudraksha Mala.	1299.00	1599.00	18	Rudraksha	Vedic Rudraksha	VD-RUDRAKSHA-5M	35	4.90	205	ACTIVE	/images/rudraksha_mala.jpg	f	2026-08-08 23:34:11.80756+05:30	2026-08-09 01:46:43.889254+05:30	f	Vedic Crafts Heritage	APPROVED	\N	\N	Super Admin	\N
prod_1	ven_1	Brass Ganesha Idol	brass-ganesha-idol	Brass Ganesha idol for home, office and puja room. Handcrafted solid brass.	Premium brass Ganesha idol.	1599.00	1999.00	20	Idols	DivineKart Artisan	VD-GANESHA-8IN	40	4.80	126	ACTIVE	/images/ganesha_idol.jpg	t	2026-08-08 23:34:11.80756+05:30	2026-08-09 17:14:08.319541+05:30	f	Vedic Crafts Heritage	APPROVED	\N	\N	Super Admin	\N
prod_2	ven_1	Marble Lakshmi Idol	marble-lakshmi-idol	Handcarved white marble Goddess Lakshmi idol.	Sacred Goddess Lakshmi idol in Makrana marble.	2299.00	2999.00	23	Idols	DivineKart Artisan	VD-LAKSHMI-7IN	13	4.90	94	ACTIVE	https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80	t	2026-08-08 23:34:11.80756+05:30	2026-08-09 17:14:08.319541+05:30	f	Vedic Crafts Heritage	APPROVED	\N	\N	Super Admin	\N
prod_3	ven_2	Organic Dhoop & Incense Sticks Box	organic-dhoop-incense-sticks-box	Pure natural herbal dhoop cones and agarbatti prepared using ancient Ayurvedic formulas.	Organic herbal incense box.	349.00	499.00	30	Puja Samagri	Sacred Organics	SO-DHOOP-ORGANIC	72	4.85	58	ACTIVE	/images/products/panchamrita_kalash.jpg	t	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:14:08.319541+05:30	f	Sacred Organics & Incense	APPROVED	\N	\N	Super Admin	\N
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_tokens (id, user_id, token_hash, user_agent, ip_address, expires_at, revoked_at, created_at) FROM stdin;
6cf5a0cc-b831-4c42-9c3a-7e6b025ad443	usr_101	11c11e0cbbc94d0ee72a199bdb5a918f18229bd7134b4de5d39c6b8674ca4208	curl/8.21.0	127.0.0.1	2026-09-08 02:28:09.427066+05:30	\N	2026-08-08 20:58:09.428733+05:30
0d5126ba-0144-4e3f-b0a6-173449cdd458	usr_101	fecfd2a103caadd261fb71f3c109e9efea3fcaf6366b4c1874c47b7ca3dae9f2	curl/8.21.0	127.0.0.1	2026-09-08 02:28:18.566385+05:30	\N	2026-08-08 20:58:18.567362+05:30
98f9276b-e4bd-40f0-9d5f-98b5af5426e5	usr_101	ff8d97724ea05e444d3e36d49de0fd8839d1d6d362108e06d44531846c883590	curl/8.21.0	127.0.0.1	2026-09-08 02:29:28.164255+05:30	2026-08-09 02:29:28.924295+05:30	2026-08-08 20:59:28.166824+05:30
9a8f2320-e532-47ee-b232-bfa0873d61c9	usr_101	9d4f4b29da94692cf0faecf0554aa9e0ccf0aba614619e35ced28ef457a9423c	curl/8.21.0	127.0.0.1	2026-09-08 02:29:28.928845+05:30	2026-08-09 02:29:30.539248+05:30	2026-08-08 20:59:28.929324+05:30
1d1c2a3e-867a-4fac-890b-12b9bd88fb51	usr_101	5d7595bddb9fca5198dc913857b5d94bf4effb66b20c5c79c243e73e81652583	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:41:53.289103+05:30	2026-08-09 02:42:14.337159+05:30	2026-08-08 21:11:53.289697+05:30
47f08717-07cf-443e-8092-5e9c5412113a	usr_101	5ed78bd4ea66daab7182aefbff4c46edb736a1e13493c029459428f17870a26b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:42:14.340432+05:30	2026-08-09 02:42:28.056735+05:30	2026-08-08 21:12:14.340931+05:30
adcedf58-8a40-41a4-bff4-dba811eefb1a	usr_101	70f7823b129c04a3fe8411d99f5de661fb67dbe6ac3785920fb402e548f56a09	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:42:28.064116+05:30	2026-08-09 02:42:57.976109+05:30	2026-08-08 21:12:28.067411+05:30
470d4246-e746-411d-a947-2f5fb3f5d9df	usr_101	5786d2fe0ec4eea3c55fcbb68928d6e15967407f25c08dcf29011af8a821fb8c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:42:57.979205+05:30	2026-08-09 02:43:02.958489+05:30	2026-08-08 21:12:57.979676+05:30
e3a7fbe7-e292-41ea-9339-abbf1d6e2a39	usr_101	57e1615f59b4ff83637e26b7345f7b2be3d94a2fae46478e2804dbe1628f8cb6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:43:02.965679+05:30	2026-08-09 02:43:44.969764+05:30	2026-08-08 21:13:02.967156+05:30
ab41b844-4837-47e6-88ad-49bd8df338cc	usr_101	3ae12a07b29ce8c6e68067b6a9a40c2bcf252ea98ac5e8b23bf007d15621a996	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:43:44.976093+05:30	2026-08-09 02:44:10.825789+05:30	2026-08-08 21:13:44.976906+05:30
debb8c5e-a5e1-4312-9348-4983f5e5acc6	usr_101	2d0f1f83217972ce26f009baa9e1d565528aa335fcd24fd09529b8dfffe549a5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:44:10.83011+05:30	2026-08-09 02:44:22.515657+05:30	2026-08-08 21:14:10.831063+05:30
ecabe393-ff20-4a0d-a9c7-663acf58f510	usr_101	fccc30ea8827408498228d0414ddbcb7cd858c20ddde51d86e158622f5e42692	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:44:22.522856+05:30	2026-08-09 02:44:34.08884+05:30	2026-08-08 21:14:22.523729+05:30
0b37b63f-668f-4380-93a5-af94a8a8503c	usr_101	2d88d10a491be771ea2c8c9a44b21e62330db6e050c8c7310708fe09221ac18f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:44:34.095046+05:30	2026-08-09 02:44:45.658454+05:30	2026-08-08 21:14:34.095871+05:30
f546360a-c194-4d78-8ca4-d0a2e8fcbf69	usr_101	dc1fdc9ad68f86ad7a3f7b79609478fefe1295d842a188af56f3b606e5a51064	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:44:45.664352+05:30	2026-08-09 02:44:56.004515+05:30	2026-08-08 21:14:45.665556+05:30
5eba9bb9-dda5-42fe-a816-4302d1ed0e29	usr_101	590e20c176a3fd0726a73069d2ffe7a28e4f1b5216aacbca490088611098dfff	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:44:56.010461+05:30	2026-08-09 02:49:40.041621+05:30	2026-08-08 21:14:56.011417+05:30
49ef496f-3d8e-42a1-9cdf-691966defd5a	usr_ven_101	757ecc52ee3042318a0f7621791e11b1f3e3ca7748da925781c8ae01828ba903	curl/8.21.0	127.0.0.1	2026-09-08 02:51:27.190737+05:30	\N	2026-08-08 21:21:27.194718+05:30
356ff5c8-309a-4cb0-9ea9-be29f911eda8	usr_101	cd103d31d1aabe8ee96f43e96577edc600eb0306d4a93e3a5555926fe4a22d62	curl/8.21.0	127.0.0.1	2026-09-08 02:51:29.365311+05:30	\N	2026-08-08 21:21:29.366947+05:30
c86ca189-83a7-4db3-baff-0bf0ea2d167c	usr_101	0dc17b77fd3e09adfac23b3fc4caac0a7b6475b5c7da80fb597903c506ef361d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:49:40.046937+05:30	2026-08-09 02:52:07.249475+05:30	2026-08-08 21:19:40.047979+05:30
004d061e-a209-4aac-b326-bb52d79bbf54	usr_101	05a89879effcadc91b0b1a6ce0cefad5eee2c42cdade347a070b9b0eb4345eed	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:52:07.258027+05:30	\N	2026-08-08 21:22:07.258939+05:30
4f73950d-8b1b-48aa-8685-453cc1e605c2	usr_ven_101	8274f5417bbf2c68ea2ab7e3bbbb7fc7e94229f69d75a4e500ac6ee05ae0fe4d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:52:34.247875+05:30	2026-08-09 02:52:52.477608+05:30	2026-08-08 21:22:34.248814+05:30
158ca28f-fb6f-4e96-94c2-56c849e5566f	usr_ven_101	2b724ebfb46eda91b1538e441f48bfa5ebf06be2b14ef9d52c2e1c846088ac46	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:52:52.483633+05:30	2026-08-09 02:53:07.486481+05:30	2026-08-08 21:22:52.484301+05:30
882fec6b-36d3-428f-abb1-675e61edaa73	usr_ven_101	b0cb3e59ec8c25bc804e8ab1b307bce5026ff3e64d5ccddbb3117a3228a64ca1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:53:07.493229+05:30	2026-08-09 02:53:18.277984+05:30	2026-08-08 21:23:07.494093+05:30
54b69428-dbf8-403d-a0b7-add93e0a5e37	usr_ven_101	32827ebe37af9228a492554e60408dd22e627d737ae9565b862ae1eb9cb2300b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Claude/1.24012.9 Chrome/148.0.7778.280 Electron/42.7.0 Safari/537.36 MSIX	127.0.0.1	2026-09-08 02:53:18.284888+05:30	2026-08-09 02:53:33.395336+05:30	2026-08-08 21:23:18.285939+05:30
d3741d3a-5cc3-4058-ada7-04e294f208a4	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	d75e066a2b07369bd729572e20651e811bd8fa75d453d6194427681c51ee18eb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:05:25.368337+05:30	2026-08-09 09:05:49.639928+05:30	2026-08-09 03:35:25.36931+05:30
dd73a397-a446-4d3c-afe4-57a5a03ef2fe	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	b49d5eaeb8557893a49b4e0780d16fef02e9e0a9b892fdd4a05e8fd964352021	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:11:34.50328+05:30	2026-08-09 09:11:43.149333+05:30	2026-08-09 03:41:34.504136+05:30
2c401209-681e-45ea-a050-e21f54f342fd	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	c6a34e122c08ea2c0cb9b82daa13182e5a9320bf229d0c0e99efa2fda113d55d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:05:51.561933+05:30	2026-08-09 09:06:46.48481+05:30	2026-08-09 03:35:51.562452+05:30
5cab83c3-1172-48d5-82ae-cde90d7f1326	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	8bd4d8b95b88fb0693687bb1a8bd907d28a220f766aa2ed31ce8a437157dfdd4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:06:46.50322+05:30	\N	2026-08-09 03:36:46.504103+05:30
9636d64f-4cf4-4a6f-b17b-598929f885d2	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	a09170a163bdb1830ac53826cea785b52b0f57f8da4ff57a4df66f78d1e7b09b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:06:46.515085+05:30	2026-08-09 09:06:56.22499+05:30	2026-08-09 03:36:46.51616+05:30
32fbbeb5-e953-479f-8a63-8c7eeae5add6	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	b92082fab0d2a4e62fba056424808a6af2c6f8a929c7347e05c78dad54b00294	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:06:56.240584+05:30	2026-08-09 09:07:45.087641+05:30	2026-08-09 03:36:56.242186+05:30
6c7be772-cecd-4740-84c3-c4f98bb5d3c1	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	da00335c4be6ba5fb54dff60b27b049d62daae8abacdcf7b8a3d9e91105de019	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:07:45.10033+05:30	\N	2026-08-09 03:37:45.101098+05:30
092584d4-df9c-457b-bad1-0ce787accc3c	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	7d79496cbd89859a8e93af14b23586f14734448e330ffcf793f4114af5100277	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:07:52.402674+05:30	2026-08-09 09:08:07.699535+05:30	2026-08-09 03:37:52.403324+05:30
a2e81056-36c2-431b-985b-17ab516bb482	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	4ff7c9bf2db588504f3edc90404ee8497c77f4e7d2fdb083e09e9c973fb6fa46	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:08:24.877871+05:30	2026-08-09 09:09:26.210011+05:30	2026-08-09 03:38:24.878674+05:30
36cf2a36-3bd5-4778-9f7f-16821d83b1b1	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	ae0f2a73898e63fa45d49136140ec56f5556fea8da38a1c2d82044b46637e13b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:09:26.251569+05:30	2026-08-09 09:09:55.754767+05:30	2026-08-09 03:39:26.257284+05:30
59c76819-00ca-4214-8439-b19083085e80	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	7cc57132979b52207781cb692d1d475e3db50b9c8bab25521a3aaf5b1a99e0d0	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:09:55.762365+05:30	\N	2026-08-09 03:39:55.76296+05:30
917f6960-6fde-44f6-992a-4f852c049d84	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	1ec2d9af62d4a19ec4bde0e61b454e9b37f8f6ca863660b72288630c1f9e35ec	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:09:56.422035+05:30	2026-08-09 09:11:28.803152+05:30	2026-08-09 03:39:56.422534+05:30
08f1cf1c-90ec-4e56-a091-4f766e65d797	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	182cc6af21cab25fff052190d188cf560a4b352ebf283d72c029a6cfc9a04dc6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:11:28.867262+05:30	2026-08-09 09:11:34.448012+05:30	2026-08-09 03:41:28.868864+05:30
f1998d15-e224-41ff-8eb0-27fe3c63cdec	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	70404dcb127282c1d369ca3c4cd5ea3a4016b81f7aea1dd622ce059d50ac1204	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:11:43.156351+05:30	\N	2026-08-09 03:41:43.157231+05:30
1b2943a6-64a1-4cb2-a94d-ad1f9ad2a1aa	c263b889-de06-4136-a960-7c0976f99f17	9af89492489e9fb4bee64c1313a51f6c679e8def1c80d2e6a57f6b0a931b76e4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:12:12.237478+05:30	\N	2026-08-09 03:42:12.23814+05:30
cdc88393-9fb0-42d7-bdb3-a7bd00ce682c	c263b889-de06-4136-a960-7c0976f99f17	a0b8f4571502ae344bef063c423517b556e39787144be1542f05369c88bbc371	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:12:18.828652+05:30	2026-08-09 09:12:58.187763+05:30	2026-08-09 03:42:18.829318+05:30
461aa77a-685b-48df-b4e4-7321d2ee8a52	c263b889-de06-4136-a960-7c0976f99f17	c89655e3ae45e5d98b0c570aee8c70a5b93151e902ffeb990c5086db237ebfb2	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:12:58.193639+05:30	2026-08-09 09:18:25.018472+05:30	2026-08-09 03:42:58.194645+05:30
b57c5a22-79aa-4cfc-92e7-d01eea7474dc	c263b889-de06-4136-a960-7c0976f99f17	8f4241da0f476d10f3fe473e4e90128dec5c9534db48ae92cb9301e52de1e4f6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:18:25.084204+05:30	2026-08-09 09:18:47.130401+05:30	2026-08-09 03:48:25.100311+05:30
88f2e05c-7524-4f85-b51e-ccf6355b18f0	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	9cd9a8753fa7963195e135285e9d3fd003f2bfcea164724490e0017e48792eec	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:33:39.169923+05:30	\N	2026-08-09 04:03:39.251133+05:30
3dda1152-3fa2-4463-8cc5-d02d3dfaac8d	c263b889-de06-4136-a960-7c0976f99f17	edb0b6c479a3b48ed073ffcc1e64ff6f7f5e89beed3d7369e027a4c285c9a892	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:18:47.140177+05:30	2026-08-09 09:33:40.138444+05:30	2026-08-09 03:48:47.141177+05:30
fdc989c7-464b-4707-b808-5b35b9b9addd	c263b889-de06-4136-a960-7c0976f99f17	48d0d1f4cca6822b0a5691698e0bf7f735cc20ebfa474dfb868a747175f9b503	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:33:40.516077+05:30	2026-08-09 09:58:22.065329+05:30	2026-08-09 04:03:40.516871+05:30
8b0fd23d-a761-4d63-922a-178c20e10a52	c263b889-de06-4136-a960-7c0976f99f17	75c5ca220bd704329be926e6d563bee26529b44328ef30069b83a7d988fb2cb7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 09:58:22.125106+05:30	2026-08-09 10:06:11.382941+05:30	2026-08-09 04:28:22.133351+05:30
d7162c86-0eeb-47e7-97c9-dcfafd055aad	c263b889-de06-4136-a960-7c0976f99f17	af54ec4e19cb290de1679a5a5210b80d682a2c03568081c3e3784829293a4c66	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:06:11.39992+05:30	2026-08-09 10:06:22.351856+05:30	2026-08-09 04:36:11.402606+05:30
f602477d-61a0-46bc-b188-6a1291cc5b49	c263b889-de06-4136-a960-7c0976f99f17	166fa7aad18e1f52458d571fb15b942735f5a83e91923f6099b2ef84e1aa5eac	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:06:22.366419+05:30	2026-08-09 10:06:50.846244+05:30	2026-08-09 04:36:22.367707+05:30
04a3961a-54fa-4c30-8696-aef14ab5a8d5	c263b889-de06-4136-a960-7c0976f99f17	a773178d5e1a456239ed18325d8d070ccdc51dffe55980ee78d9ac0f29768564	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:06:50.85449+05:30	2026-08-09 10:07:15.559027+05:30	2026-08-09 04:36:50.856602+05:30
c8cd84c2-f994-4ea9-bc69-c31518bc1f11	c263b889-de06-4136-a960-7c0976f99f17	f7810850a5dadde4de8444a12b0192a8ac81cb2036d50e7e071ede8ffda09a15	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:15.571558+05:30	2026-08-09 10:07:18.120739+05:30	2026-08-09 04:37:15.57319+05:30
e5f21103-bce1-4e37-8622-cf599d773e0a	c263b889-de06-4136-a960-7c0976f99f17	5bec7a41d4572b237e0551e2574feca8fcf0077c8202138a329ad3454ec8c85a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:18.139206+05:30	2026-08-09 10:07:28.106426+05:30	2026-08-09 04:37:18.142328+05:30
591178e9-0b3a-4920-8c8f-85f2a19e8695	c263b889-de06-4136-a960-7c0976f99f17	3c14d2a628a0d7525d3e8cadb4159b050c0fba805f2645e3a2c6391fbe3580c8	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:45.204565+05:30	2026-08-09 10:07:48.214744+05:30	2026-08-09 04:37:45.205911+05:30
ecbedb71-d3ad-4c27-a9d0-f090a580764a	c263b889-de06-4136-a960-7c0976f99f17	8c07055fe093558d79a3310b688f332a59d8aca37ca8772525cb97acd36b5d3c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:48.222106+05:30	2026-08-09 10:07:50.172309+05:30	2026-08-09 04:37:48.223329+05:30
bd68913f-e254-4199-a2d9-e5fabf9aa53d	c263b889-de06-4136-a960-7c0976f99f17	2634a488d3a96ceb936f172f2cca0c9d1224afd9b5d44e44cd397e3f7cdbb6b6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:19:57.021863+05:30	2026-08-09 10:20:34.501553+05:30	2026-08-09 04:49:57.024321+05:30
dda49b0d-6eeb-4068-abca-03fe1afd650b	c263b889-de06-4136-a960-7c0976f99f17	10b0b402e974003b5e182bdb01d8ef57a25b9d160e210affeab77a04589e711d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:20:34.513446+05:30	2026-08-09 10:21:50.702444+05:30	2026-08-09 04:50:34.514447+05:30
f18a4fea-9d21-48c9-845a-ee783f684e7c	c263b889-de06-4136-a960-7c0976f99f17	cf0d58ccf8af682b04769103f7576c228ed13836431545c871f9dccb22968d4d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:21:50.80101+05:30	2026-08-09 10:22:19.563581+05:30	2026-08-09 04:51:50.810987+05:30
a740d757-13bb-4472-ada2-8f876b49ebd9	c263b889-de06-4136-a960-7c0976f99f17	19123d47f451220c8eb3c31285f01e095b3807111cd7d70fa23f68053bbd7086	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:22:19.649038+05:30	2026-08-09 10:22:30.770975+05:30	2026-08-09 04:52:19.654022+05:30
e7f28b58-2a08-464c-bf04-ff56540cd8c4	c263b889-de06-4136-a960-7c0976f99f17	f8385afa2ef68c74c043b09f680ab307319c2195451b86547cc0891e646306de	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:22:31.132648+05:30	2026-08-09 10:22:59.742187+05:30	2026-08-09 04:52:31.134055+05:30
a6d9e782-221d-4b74-a8b1-39db6a886f11	c263b889-de06-4136-a960-7c0976f99f17	5c7113e82e07fac3e54c89b0206f0f809938554b92db91b64f2cbaaca87fbda6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:22:59.750927+05:30	2026-08-09 10:23:03.250546+05:30	2026-08-09 04:52:59.752357+05:30
3ec9bf83-d55f-46ed-adcc-7ebbfbf3c7aa	c263b889-de06-4136-a960-7c0976f99f17	4c8d47b8c75a0f0cf892ba1cd62347f53f2adbf93e573febba01515576fe0279	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:23:03.418967+05:30	2026-08-09 10:23:20.102513+05:30	2026-08-09 04:53:03.481788+05:30
9f2ac98f-166f-4085-8b30-0e6e28f1c1e0	c263b889-de06-4136-a960-7c0976f99f17	19d339bdb104af0d6157a4f57d6642b855c716c7e4702af7418120dd60b2c914	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:23:20.119458+05:30	2026-08-09 10:24:04.08344+05:30	2026-08-09 04:53:20.120702+05:30
3d87a6a3-4546-403c-92ce-e3e3ed6c8eaa	c263b889-de06-4136-a960-7c0976f99f17	ecd880058023857c005d3ddf70e026caffa0922c6a30f44d3148a2d871e41170	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:24:04.115086+05:30	2026-08-09 10:24:32.561758+05:30	2026-08-09 04:54:04.143036+05:30
143eb825-0f7d-4070-9152-e0440dcb6fd7	c263b889-de06-4136-a960-7c0976f99f17	df8870665b85ee2d104697c245ecd10d2364c3a62baaad4121b6f507394f0fa2	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:28.114757+05:30	2026-08-09 10:07:45.196576+05:30	2026-08-09 04:37:28.117243+05:30
337f8b9b-31d2-4fa5-b760-0aebf1506dad	c263b889-de06-4136-a960-7c0976f99f17	483a132a1eb6f221a5787ce83c5ef336d158df4fd20d2c96f758be65af374c14	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:50.189324+05:30	2026-08-09 10:07:51.211521+05:30	2026-08-09 04:37:50.200761+05:30
3674013e-9fb8-43ed-9ba9-92aa690bb672	c263b889-de06-4136-a960-7c0976f99f17	650bcf1699fff705733167efd0044d2b61dea9d44e97249a279b6e97d46951c0	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:51.21922+05:30	2026-08-09 10:07:52.4284+05:30	2026-08-09 04:37:51.220164+05:30
6df36abf-f43e-409f-bf1f-b0989c086cc1	c263b889-de06-4136-a960-7c0976f99f17	d2f69986d9df00e0afb35fa552c5be1aa7335e728ba9cb0302c5f2315e29f776	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:52.451227+05:30	2026-08-09 10:07:54.179219+05:30	2026-08-09 04:37:52.452106+05:30
aefd091f-6ce7-4dc2-93b5-3984d08af098	c263b889-de06-4136-a960-7c0976f99f17	b99b73f795d6af4592d6d3c3f3a7fc11185142f7418328ba5d41a17fd47d65b6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:54.190035+05:30	2026-08-09 10:07:56.853076+05:30	2026-08-09 04:37:54.191327+05:30
9d8691f8-b6ef-4315-beaa-2b3a6f09f082	c263b889-de06-4136-a960-7c0976f99f17	de227e004feab80b1aee6641f138df82a9fd6ed99bbd76b60ea7a2f90f983fb3	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:56.861528+05:30	2026-08-09 10:07:58.049806+05:30	2026-08-09 04:37:56.863222+05:30
460f5774-613c-4df7-8bc3-c32546c8ed7c	c263b889-de06-4136-a960-7c0976f99f17	de63394a9e53f7f022c6c9f5e04105fd3665417b975016b5f6871d6cc3882a84	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:07:58.063843+05:30	2026-08-09 10:09:38.817809+05:30	2026-08-09 04:37:58.064646+05:30
47501c40-216c-437e-8769-5a42b5352a41	c263b889-de06-4136-a960-7c0976f99f17	25db3dec83c0588ea727ea6070e17db85692ec52130c97eeea537d034ddf8047	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:09:38.831464+05:30	2026-08-09 10:14:54.878612+05:30	2026-08-09 04:39:38.832443+05:30
5851fcc0-6213-48a6-ac19-0eaaf2d3f6d1	c263b889-de06-4136-a960-7c0976f99f17	ee9f292e248660617c51ae3b3718d02dba41d1b5b040932384d1b8032db6e0d5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:14:57.353732+05:30	2026-08-09 10:19:56.980617+05:30	2026-08-09 04:44:57.355991+05:30
3ed2965a-3f25-45a3-b966-d857a9fe90c9	c263b889-de06-4136-a960-7c0976f99f17	0c8daf375b737b66f54632e3a2d19bc10d22a4f80ad0c468ad4ca3b24963f99c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:24:32.591434+05:30	2026-08-09 10:32:51.233922+05:30	2026-08-09 04:54:32.593041+05:30
da1cbd4b-a893-44f6-a9ec-f644792cde0e	c263b889-de06-4136-a960-7c0976f99f17	aa2a7a61a8d825eb2c6444ac8eae2d0abafe91c2dcda99c036eb54e2f11d0bea	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 10:32:51.252218+05:30	2026-08-09 11:20:59.040376+05:30	2026-08-09 05:02:51.255833+05:30
7d81fe67-523f-44aa-92bf-bcc1a5f45c33	c263b889-de06-4136-a960-7c0976f99f17	3348e94a391ec7b1569fc934bdd2b74462a91ef55f21662b1d9c9e8aeac38fef	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:20:59.070818+05:30	2026-08-09 11:22:03.94497+05:30	2026-08-09 05:50:59.075106+05:30
18f3e13a-2d7a-44ae-854d-dc1bb2267323	c263b889-de06-4136-a960-7c0976f99f17	a5e474be6aadd97da4072a9db099cd4d0a54d0eb1f325ff4161a0fa82c25ca6e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:22:03.956473+05:30	2026-08-09 11:23:45.596599+05:30	2026-08-09 05:52:03.957553+05:30
6719493b-97ad-4b97-a98d-1f7dc3025bfd	c263b889-de06-4136-a960-7c0976f99f17	d3fd3ac382516e98ec3b5b35f62272d67700c748dd56ab9481f8dd722752c014	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:23:45.609865+05:30	2026-08-09 11:23:48.438865+05:30	2026-08-09 05:53:45.610814+05:30
5bd958f0-e1fa-473e-ac2a-0c39c730e8fc	c263b889-de06-4136-a960-7c0976f99f17	c0f1ba5be1d0ac425003518a262b46844505ae7f7c8886a12d9ab305066dba4c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:23:48.446311+05:30	2026-08-09 11:23:50.8992+05:30	2026-08-09 05:53:48.447555+05:30
2883d60a-4436-4f9b-9982-bb14d7970961	c263b889-de06-4136-a960-7c0976f99f17	eeda7482013a72086d180fc99d1949cf372f78581e555677c3f96e1cfb728b1f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:23:50.908093+05:30	2026-08-09 11:23:53.696584+05:30	2026-08-09 05:53:50.915891+05:30
b316ca19-a8b5-421d-b1c7-21b0c918c4bb	c263b889-de06-4136-a960-7c0976f99f17	0f8ab15013d97ce87d6df94eac8678c9dc72100c2fef6c3f092c15655359cf9e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:23:53.721888+05:30	2026-08-09 11:24:10.51539+05:30	2026-08-09 05:53:53.723671+05:30
a598dd6f-b3f5-4ebd-87fe-513c9e662c58	c263b889-de06-4136-a960-7c0976f99f17	baf823be94c96cfdbdc111ab43b28d1ff0cfdb0ef1091ac856c60bf993887219	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:24:10.524191+05:30	2026-08-09 11:24:13.51202+05:30	2026-08-09 05:54:10.525293+05:30
845959ce-3e49-47d0-b085-69a6571528a8	c263b889-de06-4136-a960-7c0976f99f17	25880c8cc274e5822b1a98b1a64f3b98a3b4fd8c6941ced2965d9902d802625d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:24:13.528828+05:30	2026-08-09 11:24:20.526006+05:30	2026-08-09 05:54:13.530695+05:30
cd008147-b3d4-4c8f-99e9-64f398dae3a9	c263b889-de06-4136-a960-7c0976f99f17	4128a1b5d3cc59014b46443ea55a038598a4c4f6c4335f145d8cbd3ab7aa403b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:24:20.532188+05:30	2026-08-09 11:24:23.232499+05:30	2026-08-09 05:54:20.533016+05:30
9b5e4021-39f2-4f02-bfe7-e4407200f6f8	c263b889-de06-4136-a960-7c0976f99f17	ae3949e692b65dd7d741a2b309da86609ad5c984199210c4278ced91d98f5a59	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:24:23.261889+05:30	2026-08-09 11:24:40.262586+05:30	2026-08-09 05:54:23.26671+05:30
3c5fb121-e010-4385-a4ef-af20e48dc56a	c263b889-de06-4136-a960-7c0976f99f17	750eaf5da9e7b1f85e0970bc44880b35118332ca156739645784090449dbaa5b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:24:40.291344+05:30	2026-08-09 11:25:14.779707+05:30	2026-08-09 05:54:40.294506+05:30
04aa55f5-e472-41a8-b39c-f67e50f0175e	c263b889-de06-4136-a960-7c0976f99f17	9dec1314e77dfc335d421dce41c0fa724ad8103f61909a291a6af107eda9b618	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:25:14.817467+05:30	2026-08-09 11:25:18.138522+05:30	2026-08-09 05:55:14.818582+05:30
f120074c-ee72-499d-ab83-5e8175ffc498	c263b889-de06-4136-a960-7c0976f99f17	94868d28dc72831a28525cf2c31b882bbee8672a2d66430a35b2f7be2fdecd9c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 11:25:18.144487+05:30	2026-08-09 12:30:37.729029+05:30	2026-08-09 05:55:18.145263+05:30
436996a3-cef0-4cf2-bdf1-7a957a5f465a	c263b889-de06-4136-a960-7c0976f99f17	5e02cb94bed1021629ca8ac95c4b0b0292878bb7cc92fba180b2c591f98155bb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:30:37.757424+05:30	2026-08-09 12:33:20.095973+05:30	2026-08-09 07:00:37.758072+05:30
fc448984-cc3e-4c67-a662-f48a1ab3c717	c263b889-de06-4136-a960-7c0976f99f17	b8cf57e440ccc7923cb5f9995a00624dae73aa77ce2e432d3b3de357213ca520	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:33:20.105964+05:30	2026-08-09 12:33:32.269609+05:30	2026-08-09 07:03:20.108114+05:30
6f8f8b87-be84-4347-9f00-9c2c8288875d	c263b889-de06-4136-a960-7c0976f99f17	19bee08c8d1cb370ba54c8bb96943d0372e923416551f0b2d116dc98d4643e49	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:33:32.278672+05:30	2026-08-09 12:34:31.945774+05:30	2026-08-09 07:03:32.279508+05:30
9d0270e3-0b89-4dca-a07f-38679304d7fe	c263b889-de06-4136-a960-7c0976f99f17	bd003ea6826f7f40f5cb66f0551b29bf3ed60553f84d9437d47bb40d725dc4c5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:49:04.000784+05:30	2026-08-09 12:52:58.545947+05:30	2026-08-09 07:19:04.002719+05:30
5dffeb8f-a610-435a-b5c7-3dde641fc3d1	c263b889-de06-4136-a960-7c0976f99f17	514e973f4c8cb027d165371ec0fbeab8659648fe8af6629e1a6911e6639ad0cf	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:34:31.956995+05:30	2026-08-09 12:34:45.99107+05:30	2026-08-09 07:04:31.958478+05:30
feef779a-da56-44ad-80d5-e03aaaa42465	c263b889-de06-4136-a960-7c0976f99f17	f6eae0a3b456facf53826a51f5c4b65026f2873982e66de21eb3c4b72d2dc136	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:35:08.396867+05:30	2026-08-09 12:35:15.92522+05:30	2026-08-09 07:05:08.397517+05:30
1696cfb2-225f-48a2-b249-6f745a29639e	c263b889-de06-4136-a960-7c0976f99f17	03c2869ab8029802f20b26cbfe449d15355b60f898f8d2ec321e155e214adcda	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:35:17.198467+05:30	2026-08-09 12:38:01.583859+05:30	2026-08-09 07:05:17.199619+05:30
7657edbb-dc7f-4405-8eb7-f7e8c91df660	c263b889-de06-4136-a960-7c0976f99f17	17d2dbcd1715afb479ef7d64a5452d9cafebdf8745e9a93f0b361aea35c8e2d5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:38:01.592634+05:30	2026-08-09 12:38:22.646331+05:30	2026-08-09 07:08:01.593768+05:30
229e7ebf-e831-4375-9f53-9341e1990f43	c263b889-de06-4136-a960-7c0976f99f17	9e9ce8b7fbe3ca321d1383f9f83e0bb246d8e8367ac82a11fb14ac4f2484f54d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:38:22.685219+05:30	2026-08-09 12:38:26.160969+05:30	2026-08-09 07:08:22.685946+05:30
07ffdf29-5c87-4d66-9a1d-317025f13c75	c263b889-de06-4136-a960-7c0976f99f17	dc09ce2fbaac455542952f9e25c98c6333541df6eb9a82064edeea9be05fe793	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:43:18.915519+05:30	2026-08-09 12:46:17.277299+05:30	2026-08-09 07:13:18.916397+05:30
6d7229fd-5d2a-470d-a5d5-2082b42ed6a3	c263b889-de06-4136-a960-7c0976f99f17	39c0c3cc8f0ef40d088187d20809a6a45f2383bfbb70c7fd49456ab52db47bab	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:46:27.809514+05:30	2026-08-09 12:49:03.979721+05:30	2026-08-09 07:16:27.810584+05:30
d1cbbcd8-c858-4994-b6f4-98e4083d7bc5	c263b889-de06-4136-a960-7c0976f99f17	985e194b23e5b72501e2af88dd8bddef35141961cdfa59d2efbe8ac1bd63693d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:34:46.047111+05:30	2026-08-09 12:35:08.35121+05:30	2026-08-09 07:04:46.047684+05:30
a1518b1b-8ff2-4067-906d-7ed339b237d6	c263b889-de06-4136-a960-7c0976f99f17	b0778ed6e8b2cee98e00a4156ced0e02b468b56387cf540ea9e5cccb783555f9	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:35:15.932108+05:30	2026-08-09 12:35:17.193687+05:30	2026-08-09 07:05:15.932709+05:30
7d73eade-8d1f-45ce-879d-e2eb44b3ad15	c263b889-de06-4136-a960-7c0976f99f17	b2c18445bba4277408033255704527ca27cdb97c09527e3e3b77f37ca6d36f02	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:38:26.165398+05:30	2026-08-09 12:43:18.907894+05:30	2026-08-09 07:08:26.16614+05:30
86a4bb21-e891-4d08-90dc-015edec74878	c263b889-de06-4136-a960-7c0976f99f17	be67dacaaf44e227cfa3a5c0bd3c081df9e3987be075d6bde628ca4bd2507e66	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:46:17.298751+05:30	2026-08-09 12:46:27.778365+05:30	2026-08-09 07:16:17.300525+05:30
04ef400c-2a12-4e63-8576-305dadea08fa	c263b889-de06-4136-a960-7c0976f99f17	9b7916c4a9b465560571ad625bcb6ecd43c77775a5cf10a7ee2be5a4614c245f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:52:58.584177+05:30	2026-08-09 12:54:11.141401+05:30	2026-08-09 07:22:58.587319+05:30
02d2194e-b2e5-4f0a-ba62-00b49742e8cd	c263b889-de06-4136-a960-7c0976f99f17	491fff2a711cc426004d79687af8c8b991b2119c57b559e656478d24c1a360d1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:54:11.188749+05:30	2026-08-09 12:54:12.35375+05:30	2026-08-09 07:24:11.190298+05:30
734fd9c1-0086-4012-bf72-aca2c7429a3a	c263b889-de06-4136-a960-7c0976f99f17	4a099d1deabbdc5a821dc61191392768ee89b8f1216d364b25e9e529d6dd01ae	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:54:12.375046+05:30	2026-08-09 12:54:19.727857+05:30	2026-08-09 07:24:12.376768+05:30
484b6536-7c22-4d76-a391-ef0d18ef0e3a	c263b889-de06-4136-a960-7c0976f99f17	a6af1b327fe43157a9e2564b43a177e5e9ce3235c59a4c8d0c339476f631f43c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:54:19.740952+05:30	2026-08-09 12:54:28.104433+05:30	2026-08-09 07:24:19.741733+05:30
bee410a8-fd7d-4c47-a58a-86d032bec328	c263b889-de06-4136-a960-7c0976f99f17	f9e8b9fec0af29e0737903906c411ae508e58f4c3d8fdf062d2ec2f9596e4c3a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:54:28.145333+05:30	2026-08-09 12:54:35.485983+05:30	2026-08-09 07:24:28.146098+05:30
91cdc5ca-401c-4a59-8d21-abc53bbff6b9	c263b889-de06-4136-a960-7c0976f99f17	8e1de79ca3d51d99d4b2e1f2f856cb412a6c00c896915e4dbc0230fc85c9894b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:54:35.492386+05:30	2026-08-09 12:56:10.512844+05:30	2026-08-09 07:24:35.493327+05:30
0562c54b-5fc7-49b3-b163-6730fcda55fe	c263b889-de06-4136-a960-7c0976f99f17	396fbe1c4eb0f1743e13aaf47298e44531def9543db51b428ce39221a2f1cb63	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:56:10.523781+05:30	2026-08-09 12:56:50.406648+05:30	2026-08-09 07:26:10.525267+05:30
3d791555-e773-4118-be80-336624283ac2	c263b889-de06-4136-a960-7c0976f99f17	a5c30c5242eef32108e2ff8c03f6fd73a13781a15007bfe69ba459d79dd09462	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:56:50.414978+05:30	2026-08-09 12:58:14.089066+05:30	2026-08-09 07:26:50.416197+05:30
7963635d-337e-4184-b9bd-73f9beb73dcc	c263b889-de06-4136-a960-7c0976f99f17	12963a025eceb2e2f099c38f77ccb749d4ac134be4772cf5699609271166255b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:58:14.108086+05:30	2026-08-09 12:58:16.512017+05:30	2026-08-09 07:28:14.110745+05:30
6e3f12e1-d9e3-4f9c-9b13-53b458e36805	c263b889-de06-4136-a960-7c0976f99f17	a7569adf7827fe5125a6a14ccc08ef2919bf2ff345eaa6fe8b7488aaeb94b524	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:58:16.523182+05:30	2026-08-09 12:58:35.142937+05:30	2026-08-09 07:28:16.52412+05:30
ce6e9e1a-3a79-41e9-9a94-04d4eaba4c27	c263b889-de06-4136-a960-7c0976f99f17	eec656d305bae66184090d62c6ea0b9a1f6f9f89feb0a5f0e95ddb16dc4fbbdb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:58:35.234634+05:30	2026-08-09 12:59:12.074919+05:30	2026-08-09 07:28:35.235558+05:30
54b6dced-fde9-44c5-9ba1-054c3aa2a3b0	c263b889-de06-4136-a960-7c0976f99f17	8c36e94d52ef96977eb817653e37cd23cba21a1a85cc622e72df19e19ff6c0db	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:59:12.092182+05:30	2026-08-09 12:59:24.600054+05:30	2026-08-09 07:29:12.092987+05:30
72cf3a86-41b6-4b66-b2e6-7983d18af30b	c263b889-de06-4136-a960-7c0976f99f17	9f4e77be17c06b37ef5ed9790dac6488ff0bad36ff7af2e07b1b48b1c3b73eeb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:59:24.636817+05:30	2026-08-09 12:59:40.733494+05:30	2026-08-09 07:29:24.637569+05:30
e75d5dae-adfa-4ab5-850b-2b6a7c8c0c26	c263b889-de06-4136-a960-7c0976f99f17	ecc3251a0fc33bb27d91f236633b9479509b91ca6dac0320b68341de4bafafcd	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 12:59:40.761198+05:30	2026-08-09 13:00:26.175096+05:30	2026-08-09 07:29:40.763082+05:30
26d65dba-6236-4e26-893a-f70fe83dc7a2	c263b889-de06-4136-a960-7c0976f99f17	257a05886567b49f0e05386329da1717d48aad616c474027d1bffeb5e8b73fd1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:00:26.187596+05:30	2026-08-09 13:00:41.043831+05:30	2026-08-09 07:30:26.188463+05:30
eb61507a-daf9-41b0-aa78-63c2ce625289	c263b889-de06-4136-a960-7c0976f99f17	65a7606b2f58168e355665b0490ed8a640401050cd3f6c6994a214a72147530c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:00:41.052793+05:30	2026-08-09 13:08:19.929126+05:30	2026-08-09 07:30:41.053459+05:30
79d1932a-6b5c-4d28-a9c8-e15b7d9c725e	c263b889-de06-4136-a960-7c0976f99f17	adfa97c2fe8c7dbc3defc4c1353924de1978b294108710070348994f611fdf09	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:08:20.038321+05:30	2026-08-09 13:08:23.966066+05:30	2026-08-09 07:38:20.04432+05:30
8429cb3a-f1d0-44b8-989f-76f3ddd464de	c263b889-de06-4136-a960-7c0976f99f17	0b028aaf5cb0f606769a8b1eadbf315d32d67cbb84606cb9437324542c3fe908	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:08:24.005577+05:30	2026-08-09 13:54:01.934645+05:30	2026-08-09 07:38:24.02192+05:30
f899bd1d-a0ff-4c3b-bd46-c7162c6c43b8	c263b889-de06-4136-a960-7c0976f99f17	6a30d89c864410cded1687d820e4932190e5d9d8fdc17b22e61476724783d58b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:54:01.972319+05:30	2026-08-09 13:54:02.862994+05:30	2026-08-09 08:24:01.974814+05:30
c8b14708-a112-4dd0-a96c-858107b8df6a	c263b889-de06-4136-a960-7c0976f99f17	d3cf2de68129eed14c2a99e912f9dd74648372e7be218dd6fd2098c317974c01	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:54:02.867555+05:30	2026-08-09 13:54:57.680387+05:30	2026-08-09 08:24:02.868226+05:30
cfd5978e-81be-4c17-8843-3b572298bda4	c263b889-de06-4136-a960-7c0976f99f17	4729e5cb9758a978e10c4865f7a335441f40e538e6747de043d93a86d347f83f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:54:57.692001+05:30	2026-08-09 13:55:18.99452+05:30	2026-08-09 08:24:57.692861+05:30
db216bc7-ae2c-4e20-8b9b-2b805b069e2d	c263b889-de06-4136-a960-7c0976f99f17	915f8afaa404ed9e092e733cdd1dbf148cf4ea8e138eac9b8b9abcb87b74b8a3	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:55:19.003791+05:30	2026-08-09 13:55:24.870637+05:30	2026-08-09 08:25:19.004673+05:30
2e27b4ed-6d35-4b1c-ab41-cdd256adaab7	c263b889-de06-4136-a960-7c0976f99f17	dc390ba729a994124f528ef0785c5eca51535e71cd9903be694c552e111d2999	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:55:24.883411+05:30	2026-08-09 13:56:03.362643+05:30	2026-08-09 08:25:24.884208+05:30
fe184a14-f5a1-4142-8b93-d77371944892	c263b889-de06-4136-a960-7c0976f99f17	2a28dacf900de57a39e2782c4bfd989ac98eed521560fd6d2e46e63e46a217cb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:56:03.371849+05:30	2026-08-09 13:56:26.830538+05:30	2026-08-09 08:26:03.373737+05:30
66a6025e-99c0-4679-9040-cf7ecfc5bc47	c263b889-de06-4136-a960-7c0976f99f17	9ce37fccc70f5c39ac5581212b14146ea7949a0d98c217364e18462dc581191f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 13:56:26.846658+05:30	2026-08-09 14:00:53.329387+05:30	2026-08-09 08:26:26.847384+05:30
79c8ca25-e9bd-494d-865c-c657ddd9ce11	c263b889-de06-4136-a960-7c0976f99f17	0f5dfa6d0edbd3183d217109f30bdb00f431ac667526565b65dafabd629b7ba4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 14:00:53.421677+05:30	2026-08-09 14:03:46.688679+05:30	2026-08-09 08:30:53.427597+05:30
aeecd813-5203-4d36-99e3-cb5f9502581d	c263b889-de06-4136-a960-7c0976f99f17	c645d67fe12349de0d0871765cc322ebd8246287309e06ddc7721b4c18e70707	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 14:03:46.695104+05:30	2026-08-09 14:03:58.662007+05:30	2026-08-09 08:33:46.696186+05:30
e9605165-86e9-43f5-b63e-ad0c8a58be2c	c263b889-de06-4136-a960-7c0976f99f17	98982664bc2dd8699cdfbf8d0acf71cebac016fb47fdeeebfd65ed0a4639973c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 14:03:58.965925+05:30	2026-08-09 14:04:41.893325+05:30	2026-08-09 08:33:58.966602+05:30
ea138ad0-94d7-4d8f-9db5-abab1595b9a9	c263b889-de06-4136-a960-7c0976f99f17	9395c05c9881a396fc24f310f9bb8382d33d7543da547ce0d6469392267725c7	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 14:04:42.204235+05:30	2026-08-09 14:08:58.081837+05:30	2026-08-09 08:34:42.20709+05:30
485d577f-b289-4ee5-a588-2d7d7616409a	c263b889-de06-4136-a960-7c0976f99f17	c0d210e27c772b57aa9dba5c04d31a56d0f2ee614e18da1042d2ff667923365f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 14:08:58.175555+05:30	2026-08-09 15:13:35.183784+05:30	2026-08-09 08:38:58.179622+05:30
32cf1914-da1a-4db2-8eef-8323a7110c4c	c263b889-de06-4136-a960-7c0976f99f17	a8e329ac94dcd49685dca433290f7261ee82aa52cfa447141b036462e6f1ab72	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 15:13:35.238314+05:30	2026-08-09 15:15:57.578042+05:30	2026-08-09 09:43:35.241111+05:30
c5905de4-7ccb-4332-b5e1-b430434fcdac	c263b889-de06-4136-a960-7c0976f99f17	d42eabfdacafd096b3d0a0f9020658638b43c05832521321d16a4005016a0216	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 15:15:58.25496+05:30	2026-08-09 15:17:41.324796+05:30	2026-08-09 09:45:58.259473+05:30
c83aaadd-a3fd-4cea-84e5-18c77c5b75b8	c263b889-de06-4136-a960-7c0976f99f17	c75a3922abee9e7a86f3ebdb816858c76a67f87b4ce6e5734d40da7df3ec79e0	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 15:17:41.41941+05:30	2026-08-09 15:20:17.673372+05:30	2026-08-09 09:47:41.430692+05:30
380a9420-f4e4-4f5a-86c9-6526319412f0	c263b889-de06-4136-a960-7c0976f99f17	d623b20ef86868fd9c5b62ea40844452305527537059fcd48abec42511612fd4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 15:20:17.715362+05:30	2026-08-09 15:20:33.20624+05:30	2026-08-09 09:50:17.721381+05:30
8539936a-cd19-4f97-ba8a-6682cbab34d4	c263b889-de06-4136-a960-7c0976f99f17	d508280a5eac747647953d40d080704cdfb8c25e246771363630d6795339e41b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:24:40.720839+05:30	2026-08-09 16:24:42.80494+05:30	2026-08-09 10:54:40.721876+05:30
3bb5c4d8-f5fb-4671-968f-d86fde20952c	c263b889-de06-4136-a960-7c0976f99f17	5f99c6d91bedf8f9cd8b1b0c20e791df818dd66d45a3d88b36f28aff76e41473	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 15:20:33.2536+05:30	2026-08-09 16:22:36.346951+05:30	2026-08-09 09:50:33.256166+05:30
e9981676-0ec7-4721-8901-cdfd71c85ca0	c263b889-de06-4136-a960-7c0976f99f17	15d40557b728efca8ecce09f79aa8c47432a99fe922b13f605f511439494ee2b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:22:36.382408+05:30	\N	2026-08-09 10:52:36.382925+05:30
3c4e3717-aad2-4f5b-b314-fc652114c129	c263b889-de06-4136-a960-7c0976f99f17	d3ec76d585aa7da46282a32a56898bec01b92293c5b1082e14c570f11f42d210	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:22:36.374502+05:30	2026-08-09 16:24:28.353858+05:30	2026-08-09 10:52:36.377945+05:30
cb7ba0d9-2b28-47c7-b906-0fd3ceae2581	c263b889-de06-4136-a960-7c0976f99f17	3a31c080a4229af62e1b028e99e8e0da576ae87a585891cdf1477b96ea8bdeb9	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:24:28.362783+05:30	2026-08-09 16:24:40.712335+05:30	2026-08-09 10:54:28.36359+05:30
513be264-eedc-4c54-ba49-def3e3ad6c2b	c263b889-de06-4136-a960-7c0976f99f17	9d200bda33e41a790d2801c3b03603d899b11817ed8952470ed9fefc0641859c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:24:42.816066+05:30	2026-08-09 16:26:14.064483+05:30	2026-08-09 10:54:42.816978+05:30
d5ad75ce-a714-4a67-b5aa-97daf2b6db04	c263b889-de06-4136-a960-7c0976f99f17	6ed9391701a6e1311893c5e350bc004493e107e5c425523fd5963bf55e91440d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:26:14.093054+05:30	2026-08-09 16:30:51.712511+05:30	2026-08-09 10:56:14.095452+05:30
79ca2252-4e01-4e81-9ce1-4591739471c0	c263b889-de06-4136-a960-7c0976f99f17	cde0fc1e96e53cc25edd2208d9ee993ce5cf84288ccf9e87c513e6d4e0648a59	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:30:51.733477+05:30	2026-08-09 16:31:01.747352+05:30	2026-08-09 11:00:51.734517+05:30
a1f730c6-353c-4a64-bc15-0f5610ea6bbd	c263b889-de06-4136-a960-7c0976f99f17	bfef64ecb12b49509d1eddf66eb7889213b743ba245a476252d246e3e6ef4471	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:31:01.763565+05:30	2026-08-09 16:32:05.005842+05:30	2026-08-09 11:01:01.776413+05:30
0865d746-1217-4e3a-b915-448c5ad92fea	c263b889-de06-4136-a960-7c0976f99f17	b6fdf2b79b3f364eab8bd8c34f42f7b11f694c8f7aa9ab0404dfb2e9188ce5fb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:05.023863+05:30	2026-08-09 16:32:05.688465+05:30	2026-08-09 11:02:05.0246+05:30
1d8ae140-61ba-4857-8bcc-5068b31abbbd	c263b889-de06-4136-a960-7c0976f99f17	2e31e80966a45c00bcdad17da0f3fb71def1147f4dba7a5c2d0175a6e1368216	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:05.722316+05:30	2026-08-09 16:32:06.645112+05:30	2026-08-09 11:02:05.726741+05:30
2f9dd6a2-6b04-42df-93f8-41776dfcef72	c263b889-de06-4136-a960-7c0976f99f17	6b76da1203e5080d99c3c2de517e51dc03534f87b0cd66fb118a16cbdca849b1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:10.228168+05:30	2026-08-09 16:32:11.362299+05:30	2026-08-09 11:02:10.229223+05:30
6660bbb9-103d-4984-94aa-807860897a70	c263b889-de06-4136-a960-7c0976f99f17	b09bbbd2f613a14222f0f0388bd2cbdbb75c01174f5a9acb53e1dee90f0fcb47	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:06.667001+05:30	2026-08-09 16:32:10.189705+05:30	2026-08-09 11:02:06.668225+05:30
72884356-b41a-43f4-91e0-b318a9b504db	c263b889-de06-4136-a960-7c0976f99f17	3a07bb56c9e5ff92c124962de5611bf278f80e98743fc6f1a99e40e4fd5bb18d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:35:09.12109+05:30	2026-08-09 16:36:27.409129+05:30	2026-08-09 11:05:09.122748+05:30
eadeea65-b56e-4464-8118-6570b358d56a	c263b889-de06-4136-a960-7c0976f99f17	340cc89d57301bb057dbe50171f400934bc9f72f31ea791ed6b9e27861e8308a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:11.40437+05:30	2026-08-09 16:32:57.11043+05:30	2026-08-09 11:02:11.405878+05:30
3d73960f-167c-4fb2-a588-d8312666bd85	c263b889-de06-4136-a960-7c0976f99f17	28a735e56c29f6dd264ba90cfae580f3b41e6881b20e777a225812285e802990	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:36:27.440204+05:30	2026-08-09 16:39:49.085098+05:30	2026-08-09 11:06:27.441134+05:30
9437b306-f962-4d35-b43f-7aa9642245cf	c263b889-de06-4136-a960-7c0976f99f17	6702435facd61d21f1dd18baa182588fd441ea2cf1e4695430c7a3db52b2f4ce	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:32:57.118104+05:30	2026-08-09 16:35:09.016274+05:30	2026-08-09 11:02:57.119303+05:30
417e94de-195b-4874-84f3-4989c5413d3d	c263b889-de06-4136-a960-7c0976f99f17	c5f8b6a769702b7eb844943ef7a31147790baca6af717bdbaa67d77a5a13b8c5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:39:49.121451+05:30	2026-08-09 16:39:51.815718+05:30	2026-08-09 11:09:49.132995+05:30
8a40c37a-7bbe-480f-84eb-1acd388a9cc0	c263b889-de06-4136-a960-7c0976f99f17	b51fc6795abc646f1f2b25303e24b9eddda8445086808378a852483ddd966784	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:39:51.832714+05:30	2026-08-09 16:41:42.429441+05:30	2026-08-09 11:09:51.834796+05:30
88b3887f-e6ab-4fb4-b355-7ca90d0ca755	c263b889-de06-4136-a960-7c0976f99f17	bf160d64bbcacb80c4c60bfbc5ee7fb8b7749ecde3f95a766eb7a7058016b44b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:41:42.43521+05:30	2026-08-09 16:41:51.439984+05:30	2026-08-09 11:11:42.436021+05:30
26e54711-c6a0-47e1-adeb-38ec399cac10	c263b889-de06-4136-a960-7c0976f99f17	c9b8c4249ed3bb2677c8e16a8389bac7b5758e00961be8f4610ba4b02634ffe5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:41:51.458304+05:30	2026-08-09 16:42:16.47955+05:30	2026-08-09 11:11:51.459085+05:30
d7b0f133-ccd8-4d77-8ab5-1386daa07e04	c263b889-de06-4136-a960-7c0976f99f17	8833a95d7e4a99e40a5ee137c7cf758db09dad3ea8e01c2c978dac9efe282ed4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:42:16.495358+05:30	2026-08-09 16:46:31.961021+05:30	2026-08-09 11:12:16.499349+05:30
9ad789bc-0b50-46a0-98e6-8ace3be47608	c263b889-de06-4136-a960-7c0976f99f17	0f2757563a4eb83dc2f5cdbf13aa05addd438d09dd5d59b6b9a14bf76ce4b33e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:46:31.987768+05:30	2026-08-09 16:46:48.96446+05:30	2026-08-09 11:16:31.991218+05:30
49ac33bf-32b2-45f7-bf37-9a90801298a5	c263b889-de06-4136-a960-7c0976f99f17	c0b181d3ee8ebda2e6f472d8837d06aeca4932d06e22e1b4da5d2cec3419360d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:46:48.975031+05:30	2026-08-09 16:48:23.463509+05:30	2026-08-09 11:16:48.975623+05:30
d39391d1-b65a-499f-af00-ee15773b50dd	c263b889-de06-4136-a960-7c0976f99f17	a7cf5b22a3a071f8ec699f98144e4e4cd603a6e7069a6271ded4b70a6bfaee1c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:48:23.487096+05:30	2026-08-09 16:52:41.89111+05:30	2026-08-09 11:18:23.488621+05:30
9f25f566-f618-4507-9955-ef22f6deefea	c263b889-de06-4136-a960-7c0976f99f17	ef1294f8411f31dae8f5463357d6aaae63cab58b7602e03f68be2c49dc919e6d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:52:41.913561+05:30	2026-08-09 16:57:03.775844+05:30	2026-08-09 11:22:41.915905+05:30
0edc7a23-9591-44b8-9099-d88eeb5af0fa	c263b889-de06-4136-a960-7c0976f99f17	afddd28d87aebab4fb9b6c6659213bd401021705194b1570e0f4fa7cc4507860	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:57:03.951644+05:30	2026-08-09 16:57:37.319335+05:30	2026-08-09 11:27:03.952603+05:30
b867b42d-edfd-45bb-8fce-a7050ea04c00	c263b889-de06-4136-a960-7c0976f99f17	ce892a66cd417ca3d7d01123bd0add6432c152d01fd39f7a2d6362f1bc2151c5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 16:57:37.335183+05:30	2026-08-09 17:00:18.614856+05:30	2026-08-09 11:27:37.336324+05:30
121c95be-6bb2-4170-aa62-9a0af5431eb4	c263b889-de06-4136-a960-7c0976f99f17	4f07792f1770b2b94041089bc8192727758fab17befe44792ff312c8ea389b3d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:00:18.710465+05:30	2026-08-09 17:01:11.388611+05:30	2026-08-09 11:30:18.711895+05:30
d805e72b-b17e-47a6-a788-b0c8943e615b	c263b889-de06-4136-a960-7c0976f99f17	895bd320e9231766f6a8c637696a01988be004ca9a9b0b72532a864611c0bc65	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:01:11.453671+05:30	2026-08-09 17:03:21.054676+05:30	2026-08-09 11:31:11.570057+05:30
b2c07241-26b3-4fa5-a0af-c8230dbba23a	c263b889-de06-4136-a960-7c0976f99f17	dc8ca4b0a10577c22ac222688fa0964dd92aaa2a2254f7249ffcb5eefd270dcb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:03:21.073902+05:30	2026-08-09 17:03:31.554021+05:30	2026-08-09 11:33:21.074981+05:30
0dc29666-2d3d-45fc-8124-ecaa002cfbc7	c263b889-de06-4136-a960-7c0976f99f17	887f515fbcf183066b12c4f99fc326266ef711b2548c7e9dd219aee30d7fba79	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:03:31.669819+05:30	2026-08-09 17:05:47.57777+05:30	2026-08-09 11:33:31.672215+05:30
4b72399d-9d02-45f5-94d6-ca0ce4e5a365	c263b889-de06-4136-a960-7c0976f99f17	1a3a39f7fe0a2dd8bdd9cdbff910acda17168f50370eb598c94227a97bc141e9	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:05:47.588054+05:30	2026-08-09 17:07:10.427307+05:30	2026-08-09 11:35:47.589139+05:30
7355dac3-a9e2-4323-9d99-ea54427a73fc	c263b889-de06-4136-a960-7c0976f99f17	8b2512c57c228e38f6bab65574f51319b8de03643d68a30214cdd152d077dc4a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:07:11.795048+05:30	2026-08-09 17:07:24.99461+05:30	2026-08-09 11:37:11.796201+05:30
454b4947-3449-4a0c-bb9a-48f86ce258c1	c263b889-de06-4136-a960-7c0976f99f17	75a88276c531bfb6c08df53094c01dc0c84828956abd7f845af489826839fb9e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:07:25.022732+05:30	2026-08-09 17:11:16.120584+05:30	2026-08-09 11:37:25.023523+05:30
1b5f5740-7347-43b4-8636-9a2c0e94a232	c263b889-de06-4136-a960-7c0976f99f17	2fddedee752178673582c3be195939b285897309e65b61003f076347ba38d896	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:11:16.1715+05:30	2026-08-09 17:15:23.803539+05:30	2026-08-09 11:41:16.173829+05:30
870edb9b-4aad-41e3-9f30-89b7bed853fe	c263b889-de06-4136-a960-7c0976f99f17	f9ec404b624a7291ffd89dab73e6b10e618eaaaf6df786d08e35c596c1b1131a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:15:23.867585+05:30	2026-08-09 17:15:55.090275+05:30	2026-08-09 11:45:23.875937+05:30
9c66f669-cee1-4785-9d75-b56d624d0009	c263b889-de06-4136-a960-7c0976f99f17	aaf0c60b5aa4b40e0f4dd7ff13dfbc1d529b0124b51d117fbc194f51d9e2e92a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:15:55.1013+05:30	2026-08-09 17:15:59.403872+05:30	2026-08-09 11:45:55.102033+05:30
450af8c6-39e8-4b08-a19d-15b8dc167e0c	c263b889-de06-4136-a960-7c0976f99f17	9ef8378437e801d5aa0377d0ceccb71d692602a8e53491ff12e4c5fa8931145b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:15:59.413646+05:30	2026-08-09 17:17:03.970155+05:30	2026-08-09 11:45:59.414578+05:30
3a33adcd-fe7c-4f6b-8e53-768b087a30ce	c263b889-de06-4136-a960-7c0976f99f17	b521400f2267da6313b197e87fad5ff39b2167abe2aea0693ca478ee66a27172	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:17:04.024309+05:30	2026-08-09 17:18:07.490876+05:30	2026-08-09 11:47:04.025148+05:30
8ac3ebe6-31ff-4099-a848-b46d3cc11866	c263b889-de06-4136-a960-7c0976f99f17	ff9004e04cf72b7709d0b7d926132fbd71594b834dee7347dda0004a7521fc78	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:18:07.506694+05:30	2026-08-09 17:18:16.890098+05:30	2026-08-09 11:48:07.507611+05:30
0db899d2-6bff-4136-b4f0-8cdb4d943308	c263b889-de06-4136-a960-7c0976f99f17	e27e46a14bdba32b634876d1f358d8b72da2f37b8b77296ddd273b6199ce363a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:19:00.892678+05:30	2026-08-09 17:19:58.400976+05:30	2026-08-09 11:49:00.894584+05:30
c02f9dbf-3242-4739-8a6f-1ed0fd50c5fc	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	6f99dad474ae02e88779c9404aee4613c6d55931c9bc44174e905a140b1f1b0c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:13:48.178715+05:30	2026-08-09 18:15:26.612804+05:30	2026-08-09 12:43:48.179488+05:30
9684aac3-b0f3-4b71-8a85-871e98259831	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	75df0bc7820099759414c6eaf0f2309ec56870368c49d837d043b0a31f6dab4d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:15:26.619675+05:30	\N	2026-08-09 12:45:26.621362+05:30
2e67ab55-1623-4549-9ae2-27c4ae6d4b0b	c263b889-de06-4136-a960-7c0976f99f17	3ceb859ecb7fa3efbbda8dc8cb48b290900302e3afdf2d3deabb34b1f787ce56	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:18:16.919428+05:30	2026-08-09 17:19:00.887405+05:30	2026-08-09 11:48:16.920171+05:30
470e6ee3-92d4-4ec5-bef0-1b1af3940cb6	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	a7c7890d244c5a2076ce41a85e95ede1c0486367d75723685b298f824883a4f1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:26:23.252841+05:30	2026-08-09 17:26:27.894378+05:30	2026-08-09 11:56:23.25407+05:30
f772ec6e-6bcf-4d34-bc5c-b8eac5f75189	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	602da47ea89be769f49073719e67acd3e03833ec243d576c0ad36030365ac43e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:26:27.921576+05:30	2026-08-09 17:30:08.061597+05:30	2026-08-09 11:56:27.922241+05:30
d582df78-c49a-470b-bd0c-57286c832970	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	958bf8d1fc9afb705a658d2a7d10817f71e5d8d63f45e692d252fe8117804cfa	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:11:39.80042+05:30	2026-08-09 18:11:45.346801+05:30	2026-08-09 12:41:39.806281+05:30
b36b7315-e733-439e-975b-b9cc5df3eba7	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	9155cb53e6904cd46de5017124141331293222d63036a4a5404321e6a415dc95	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:11:45.356714+05:30	2026-08-09 18:11:54.380134+05:30	2026-08-09 12:41:45.358637+05:30
e2a93c59-d729-440b-87f5-682d1402066f	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	edfef604c8096a14bdca9d098f3f7c2d5de8e8c83d203389ef6c2400e521d072	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:13:27.592211+05:30	2026-08-09 18:13:48.047117+05:30	2026-08-09 12:43:27.594472+05:30
789fac19-9f6f-4955-97d4-1ef2a5431128	c263b889-de06-4136-a960-7c0976f99f17	e0bf3293b87998b9b4393d3bccdaf805d3cc452a3592ea4c939b63c5e990a9c6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:18:36.740673+05:30	2026-08-09 18:22:02.590248+05:30	2026-08-09 12:48:36.741474+05:30
7f87bd3f-a6b8-457f-9ee5-4efe8784fd00	c263b889-de06-4136-a960-7c0976f99f17	eb17186cd0b11d9d81965a39c79a9dced4c8426186328e2e28cfa5738674f0af	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:19:58.468604+05:30	2026-08-09 17:20:26.607383+05:30	2026-08-09 11:49:58.469315+05:30
74902f96-8cc6-4174-b56a-7dae9c2de862	c263b889-de06-4136-a960-7c0976f99f17	71fafd13b41d15f89b0bf30fac0efd9f217bb50ffa3a387e346d27d74d4e33fb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:24:18.850458+05:30	2026-08-09 17:25:19.07094+05:30	2026-08-09 11:54:18.85126+05:30
5f299f11-0017-4e80-a010-d78896de14f1	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	9c31dbcca1a543d224682ffb27449e5f1bdf75d535e41aa4cdecdce5e8765983	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:30:08.071726+05:30	2026-08-09 18:11:39.760529+05:30	2026-08-09 12:00:08.072379+05:30
ec9f8ac9-2093-45c8-b330-0737ff0702aa	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	668a72b11f1396db12eaa58ca41c06801f4e93d22472dae844ac7b8839de2431	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:11:54.408924+05:30	2026-08-09 18:13:27.553913+05:30	2026-08-09 12:41:54.410166+05:30
507ad83f-154c-443a-9956-55d0c0687267	c263b889-de06-4136-a960-7c0976f99f17	6e328a9cec52ae97103e9e90d57bac255378b364d759b692aff38a4c68f56b97	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:28:56.285063+05:30	2026-08-09 18:36:49.424577+05:30	2026-08-09 12:58:56.296443+05:30
9ca1ace1-6169-4e19-b286-30d935cfd128	c263b889-de06-4136-a960-7c0976f99f17	2e96492b9aadf9a02dc724c3dbd637b2b502db84922c04f3b8c7a1e8468c800c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:20:26.635104+05:30	2026-08-09 17:22:29.276754+05:30	2026-08-09 11:50:26.636264+05:30
56194465-8ceb-4692-b72d-4eba015b01e5	c263b889-de06-4136-a960-7c0976f99f17	5151def20086878f312518e0078f7375ca0781459a444645703b5017fa272b6e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:22:29.321604+05:30	2026-08-09 17:24:18.835649+05:30	2026-08-09 11:52:29.323841+05:30
2c756905-3e46-4c4b-9a14-e8e76fc4732e	c263b889-de06-4136-a960-7c0976f99f17	23404983488b43591714446c0f3061b711d415bd06ff780b88d84c3577348625	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 17:25:19.085245+05:30	2026-08-09 17:25:53.120738+05:30	2026-08-09 11:55:19.086659+05:30
1b000381-3b7d-4aca-b0ca-5a5caf9c6e28	c263b889-de06-4136-a960-7c0976f99f17	99b22247f41fb8f426413f6b049d806bbc6f8f08aae351c8275edd25da9a97bc	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:15:29.850767+05:30	2026-08-09 18:18:36.676881+05:30	2026-08-09 12:45:29.851128+05:30
df9dbd1e-e5be-47d9-86d6-616f9687e975	c263b889-de06-4136-a960-7c0976f99f17	fc8f4ad22cd01e1972538e6b0cbe52f7b335938b5c3d4429bd476db4de58afc4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:22:02.690545+05:30	2026-08-09 18:24:12.789593+05:30	2026-08-09 12:52:02.694273+05:30
48fe07ee-e019-4ebb-a076-af3896d34c1d	c263b889-de06-4136-a960-7c0976f99f17	830d96aa9d1faf94a733a99fde353b7c5af4c31fd058458bf60bfb52cc31ef86	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:24:12.810501+05:30	2026-08-09 18:28:56.025447+05:30	2026-08-09 12:54:12.817305+05:30
4fc9a333-1fef-4424-aff9-bc99f6e810db	c263b889-de06-4136-a960-7c0976f99f17	51a7c2cd5ee6a9d3afb1fbcf7e893d2adfda4807fbb11a3004550db9bb2408be	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 18:36:49.774566+05:30	2026-08-09 21:53:06.89399+05:30	2026-08-09 13:06:49.778879+05:30
971a50fc-a141-49be-8250-5e2d4bde8ccd	c263b889-de06-4136-a960-7c0976f99f17	1d8f87d65b90be578c3da5dd040e2d09b7cf248a9db0739f8ec784cad3ad5c27	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 21:53:07.475335+05:30	2026-08-09 21:53:56.806591+05:30	2026-08-09 16:23:07.563091+05:30
20351aeb-711a-4ed3-aee0-cabcabb410fc	c263b889-de06-4136-a960-7c0976f99f17	b8bbcc7422df63552ace18cd28ba7aa939d4c15c7844ba3a5a55cc6ec1ba9482	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:02:40.991785+05:30	2026-08-09 23:27:01.985678+05:30	2026-08-09 17:32:40.992689+05:30
2062c4b9-05da-435b-946c-0251ac33b748	c263b889-de06-4136-a960-7c0976f99f17	106594d42e6daaf68dbb668c8a6e4fa358cf4aa5258b37f2bd151ab95d786497	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 21:53:56.813352+05:30	2026-08-09 22:58:46.773903+05:30	2026-08-09 16:23:56.814287+05:30
8b5f9bf4-6ec2-4f6b-ae5c-9783bdb8f6da	c263b889-de06-4136-a960-7c0976f99f17	dee316972efd8443c443f74881dfa18d8c7b93bdb6a76002bda633943a10321c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 22:58:46.879494+05:30	\N	2026-08-09 17:28:46.882348+05:30
c95e1b62-541d-4a2d-86c3-c78dde741d7f	c263b889-de06-4136-a960-7c0976f99f17	2f9ec815a6da9770848403a57b46d2ac2a13fb28ea07bb3f0d014adde1d89ca4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 22:58:46.887908+05:30	\N	2026-08-09 17:28:46.888771+05:30
160f9346-ca07-4638-b0b2-f35ed3b5d301	c263b889-de06-4136-a960-7c0976f99f17	c38749d21afc42113712ccd84f3c2362262141efb21c84847457695242563fed	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 22:58:49.092758+05:30	2026-08-09 23:02:40.973913+05:30	2026-08-09 17:28:49.093666+05:30
5cf1101f-a9be-4653-a8fb-8a8481a6a260	c263b889-de06-4136-a960-7c0976f99f17	8243f0cc5583e1aa27ac44fe5460deb80734bbf06820c6de576db5b696c2b11a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:27:02.030483+05:30	2026-08-09 23:29:14.435945+05:30	2026-08-09 17:57:02.033278+05:30
1e5f8161-5ec9-4937-ad84-d1f6c890885f	c263b889-de06-4136-a960-7c0976f99f17	786690990d5cdec5c2e9e12da4d0246027c71f8fc20e3d06c7c9742d56eebf31	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:29:14.459872+05:30	2026-08-09 23:30:14.009013+05:30	2026-08-09 17:59:14.460902+05:30
82d04af4-1c59-4406-8d93-9ccf3dbbdebb	c263b889-de06-4136-a960-7c0976f99f17	731c2896170870cef1d9da4b53adc9339164f508a913db69cf7914f6545144fb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:30:14.028215+05:30	2026-08-09 23:33:07.761639+05:30	2026-08-09 18:00:14.029902+05:30
486a9da7-2ae9-4b3d-bf82-1d77c22e04ea	c263b889-de06-4136-a960-7c0976f99f17	11832f2bb2b701ed245eb096267b87ae97c9f69a5def70c0c68dcaa6521052ca	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:33:07.779368+05:30	2026-08-09 23:38:02.027352+05:30	2026-08-09 18:03:07.780584+05:30
19f5ad84-b605-4ee9-9596-681eac0260c7	c263b889-de06-4136-a960-7c0976f99f17	b0e1187d2b9f666110a73528245315270233b7811b231f53e9cb300abb42d93a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:38:02.060374+05:30	2026-08-09 23:38:42.819965+05:30	2026-08-09 18:08:02.061109+05:30
a0409c2b-c79b-4d2e-8530-99715d7fea68	c263b889-de06-4136-a960-7c0976f99f17	5618c6d9b89105c3b96e6d21bd9eee91b073fbf60ca0ae8436bcb8ca88927971	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:38:42.83484+05:30	2026-08-09 23:39:28.972606+05:30	2026-08-09 18:08:42.843888+05:30
66e5d5fb-9115-4d34-8559-448b94274a3a	c263b889-de06-4136-a960-7c0976f99f17	8eda45de59de8330195bd3490999312d488945292bc3728d6ec1f33c647b3954	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:39:28.989681+05:30	2026-08-09 23:40:43.082828+05:30	2026-08-09 18:09:28.991184+05:30
a524c056-afa8-4c22-86a1-1f5773a8f8f6	c263b889-de06-4136-a960-7c0976f99f17	195244367e3feb9992656f06939711b9e057c90e024820cae5f179b2ba578297	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:40:43.092968+05:30	2026-08-09 23:40:52.832702+05:30	2026-08-09 18:10:43.093699+05:30
439964a3-b144-476b-89f5-788939c062ff	c263b889-de06-4136-a960-7c0976f99f17	0a2a125d60ac7a42a7c23e7e3c61b2316a56c51f8d120d0cf8e32ef54361c33d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:40:52.849434+05:30	2026-08-09 23:41:20.226142+05:30	2026-08-09 18:10:52.849943+05:30
9f864552-08cf-4feb-a4cc-58290944a77d	c263b889-de06-4136-a960-7c0976f99f17	8edfbefb12bea81bc7ee4c1a5321ac3fe763c81029a348a458c37f74aad5a9af	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:41:20.232986+05:30	2026-08-09 23:41:23.143476+05:30	2026-08-09 18:11:20.23403+05:30
d7d2d3ea-a2ce-4078-a867-8d8ed060843d	c263b889-de06-4136-a960-7c0976f99f17	c668947e73e923c4cb04ceea7f461e582630811a3a341340ae754b85e100a4d2	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:41:23.177197+05:30	2026-08-09 23:41:53.495767+05:30	2026-08-09 18:11:23.178316+05:30
48a3331b-bf53-441a-82bb-0fac77eb9268	c263b889-de06-4136-a960-7c0976f99f17	1521d07a442dd30fb1a731b51fa49e9c08f7a51810c8d7f2de5a74c5446035c6	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:41:53.503778+05:30	2026-08-09 23:42:15.297885+05:30	2026-08-09 18:11:53.504725+05:30
2f251db2-3827-48e0-9bce-8d1c79df5f3b	c263b889-de06-4136-a960-7c0976f99f17	1eef02691446e1a19b258a474f27930513ee527bf56d3a1387ac5e7265afc4da	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:42:15.318047+05:30	2026-08-09 23:44:41.107+05:30	2026-08-09 18:12:15.337791+05:30
53d890a2-b006-4b06-847d-e606afc1409f	c263b889-de06-4136-a960-7c0976f99f17	9a203f1926ad234fe2b17994e81fb6b80f128b755c7b582d8aec4cbc9572960d	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:44:41.112596+05:30	2026-08-09 23:56:24.43235+05:30	2026-08-09 18:14:41.113562+05:30
fad32c46-3607-4812-858e-5994e01ca55a	c263b889-de06-4136-a960-7c0976f99f17	7af9bce5ef04257f5519028fafeacdee31aad53b55620db825eb982777564052	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-08 23:56:24.452746+05:30	2026-08-10 00:12:05.517218+05:30	2026-08-09 18:26:24.454433+05:30
4df60d48-514c-4883-bf4a-25a3b69217e3	c263b889-de06-4136-a960-7c0976f99f17	6142e77fdd624d1c2be2e0d69bd730d2df2d7816e29203957cd80838e189e59a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:12:05.559213+05:30	2026-08-10 00:12:33.778393+05:30	2026-08-09 18:42:05.564537+05:30
8a0230f4-1960-4704-abc8-1d505ef95385	c263b889-de06-4136-a960-7c0976f99f17	c90be1c65c41bba9912b00cc551b17638dacede14415a90a764daef67f811a57	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:12:33.787056+05:30	2026-08-10 00:12:46.722317+05:30	2026-08-09 18:42:33.787984+05:30
05a3fcaa-27b2-4f7c-a203-c9341b0a8ec1	c263b889-de06-4136-a960-7c0976f99f17	7fc7dd2aa4983a34a31936886123f15d3ac0b61d17c1cb788caa772dca9712f5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:12:46.730462+05:30	2026-08-10 00:12:59.712061+05:30	2026-08-09 18:42:46.732114+05:30
5c142bbb-f406-41e2-aa1c-abd55eda5e29	c263b889-de06-4136-a960-7c0976f99f17	a34f2b0a8a282fe17f77ed8e4cf4cba40247d5d5b4cfca9eb1856c12abad38fb	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:12:59.721452+05:30	2026-08-10 00:15:46.683771+05:30	2026-08-09 18:42:59.722132+05:30
83908d14-8435-4355-8f8d-550783c24056	c263b889-de06-4136-a960-7c0976f99f17	bd895d82511571c532ecede6b69e354b58c53f82985a067840df028dc638d6ac	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:15:46.700143+05:30	2026-08-10 00:16:51.7832+05:30	2026-08-09 18:45:46.701166+05:30
88bc4641-d3ee-4354-8a7b-07b7e5130e07	c263b889-de06-4136-a960-7c0976f99f17	d8434e68eb3d5f4e8b6cf45f972b0c9514ce1c527813088e6a8f738bb2e66e0b	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:16:51.792105+05:30	2026-08-10 00:18:22.354397+05:30	2026-08-09 18:46:51.79309+05:30
b28f4975-939d-4c83-855e-e607e14390d7	c263b889-de06-4136-a960-7c0976f99f17	70e9651902885e062241bb9432cf7dd1f9bffeda5f01e20713d7aa744f3758b5	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:18:22.372788+05:30	2026-08-10 00:19:50.306307+05:30	2026-08-09 18:48:22.374074+05:30
dca312fc-792b-48e1-8c8d-15f9347a134c	c263b889-de06-4136-a960-7c0976f99f17	b52859554c527fea16cab005e40173c59d82c2dea8a1632a636814c4805ddd8c	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 00:19:50.35815+05:30	2026-08-10 11:01:27.469217+05:30	2026-08-09 18:49:50.359238+05:30
9a38c55f-f3e3-4665-b83e-0c0b1725d29e	c263b889-de06-4136-a960-7c0976f99f17	bf0473532cd7ed9eda8c2ce9acdee3e5e643e22d4836789ca55c79d517995260	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:01:27.519991+05:30	2026-08-10 11:01:29.441169+05:30	2026-08-10 05:31:27.52326+05:30
5362fdf2-5513-4599-b8d2-9867dad22528	c263b889-de06-4136-a960-7c0976f99f17	f3ce27e0b22d1998362e3cf7a37ba3f1f5b5386a23c92ba4921e3e12fed70343	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:01:29.452717+05:30	2026-08-10 11:01:32.750051+05:30	2026-08-10 05:31:29.454288+05:30
23827b60-dad6-41b5-806c-6f660d52e571	c263b889-de06-4136-a960-7c0976f99f17	6e8b7d03713c920e034d1bf4c72fe12db05f7e78c767742cd256cf49def9726e	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:01:32.757563+05:30	2026-08-10 11:02:16.599466+05:30	2026-08-10 05:31:32.75896+05:30
d07ef203-fca0-443f-b628-27a700eef714	c263b889-de06-4136-a960-7c0976f99f17	fd4cf924ebece173c66304a3091bd151dfa842a01b1113c7ae9bdebb54644436	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:02:50.078113+05:30	2026-08-10 11:04:03.762743+05:30	2026-08-10 05:32:50.079797+05:30
c2a0a37b-fbc1-4fa4-8d30-b34d1586c4bd	c263b889-de06-4136-a960-7c0976f99f17	1420ba812f31ece70c0e5dda5fb26a1ac5e9f202a7dce83fe685186c742c1cac	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:04:03.816021+05:30	2026-08-10 11:04:23.717677+05:30	2026-08-10 05:34:03.818677+05:30
fe398fbc-3298-423d-acd4-6443706bc850	c263b889-de06-4136-a960-7c0976f99f17	7942ed90e0fabbe37c11e4a4c4cb5bcac15750313bdc6c3f92d40c37e8adb106	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 11:04:23.75228+05:30	2026-08-10 21:51:49.592156+05:30	2026-08-10 05:34:23.754233+05:30
45c23a13-bf2e-4c8a-b479-02db1b841291	c263b889-de06-4136-a960-7c0976f99f17	3b3ef7b172cf255c8aab7bdc954375dbe691d900bb22ed2a451d796a9685ae04	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 21:51:49.655208+05:30	\N	2026-08-10 16:21:49.658588+05:30
f38e5669-5b16-4872-bb3b-c9de69c8b81f	c263b889-de06-4136-a960-7c0976f99f17	e4ec45f6ba2428fbf2b98ce1291fa74b5eac93973877bb41fc871c6af5bbd56a	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 21:51:49.666337+05:30	2026-08-10 21:51:54.656924+05:30	2026-08-10 16:21:49.667719+05:30
c7ec5203-9232-4552-8cbc-86a6a6bf405f	c263b889-de06-4136-a960-7c0976f99f17	2f6b1aec7f2fd8bd0565562283bec28825c501e6b782b8b91001a45fd38d96f8	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 21:51:54.746025+05:30	2026-08-10 22:05:53.579205+05:30	2026-08-10 16:21:54.756011+05:30
09dd52b6-91b7-448a-8469-f24a32b3b854	c263b889-de06-4136-a960-7c0976f99f17	3ebf32b67ea4aa7347f4e59a76a0b8d73daeb02632ba07bcd16f7aa848a91689	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 22:05:53.898399+05:30	2026-08-10 22:06:02.654434+05:30	2026-08-10 16:35:54.020339+05:30
695e456a-c1af-4713-a96e-ab54fa2550c8	c263b889-de06-4136-a960-7c0976f99f17	30447b19b19a1b8b7875359dd29c0f3a7108ee29dbd23fc92d9f1290461b8307	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	127.0.0.1	2026-09-09 22:06:02.686058+05:30	\N	2026-08-10 16:36:02.687447+05:30
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, product_id, user_id, customer_name, rating, comment, seller_reply, created_at) FROM stdin;
\.


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart (id, user_id, session_id, coupon_code, discount_amount, notes, created_at, updated_at, is_deleted) FROM stdin;
372bc7ec-6c58-47c3-bfc9-e3d919eb249c	usr_ven_101	\N	\N	0.00	\N	2026-08-08 21:23:07.636537+05:30	2026-08-08 21:23:07.636548+05:30	f
32292908-a1f3-4ea9-af52-6d605081572d	usr_101	\N	\N	0.00	\N	2026-08-08 20:18:12.705237+05:30	2026-08-09 17:14:08.377417+05:30	f
af0deee0-ee14-4dd9-af90-ed7f9baa8db0	c263b889-de06-4136-a960-7c0976f99f17	\N	\N	0.00	\N	2026-08-09 03:42:58.37568+05:30	2026-08-10 22:07:58.815398+05:30	f
73e48bc0-1715-4be1-902d-970fbefb451e	2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	\N	\N	0.00	\N	2026-08-09 03:35:25.441872+05:30	2026-08-09 18:15:08.257232+05:30	f
\.


--
-- Data for Name: shopping_cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart_items (id, cart_id, product_id, product_name, product_thumbnail, product_category, product_sku, unit_price, original_price, quantity, selected_variant, added_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_verification_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_verification_tokens (id, user_id, token_hash, purpose, expires_at, used_at, created_at) FROM stdin;
9a858e81-2741-49df-90fd-5311f615a829	usr_101	2030afec7085b3f275dac2b2e2cd3248fc71ec1269bc32c1f0c5976e5232787c	PASSWORD_RESET	2026-08-10 02:29:29.521912+05:30	\N	2026-08-08 20:59:29.523922+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, first_name, last_name, phone, role, avatar, is_active, created_at, updated_at, is_deleted, email_verified, phone_verified, last_login_at) FROM stdin;
c263b889-de06-4136-a960-7c0976f99f17	vensun@gmail.com	$2b$12$ac73.JtEwdsHoQrKdIf8geuiDNOl0j585ItZnfijr3pxXoe80ejcS	murali	krishnan	9500984141	VENDOR_OWNER	https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80	t	2026-08-09 03:42:12.224985+05:30	2026-08-10 11:02:48.76246+05:30	f	f	f	2026-08-10 11:02:49.751441+05:30
usr_admin_001	admin@smartshop.com	$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6	Super	Admin	9900011223	SUPER_ADMIN	\N	t	2026-08-08 23:34:11.781852+05:30	2026-08-09 02:27:19.228103+05:30	f	f	f	\N
usr_ven_101	contact@vediccrafts.com	$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6	Aarav	Sharma	9876543210	VENDOR_OWNER	\N	t	2026-08-08 23:34:11.781852+05:30	2026-08-09 02:52:33.722225+05:30	f	f	f	2026-08-09 02:52:34.244242+05:30
usr_ven_102	info@sacredorganics.com	$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6	Priya	Sundaram	9876543211	VENDOR_OWNER	\N	t	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f	f	f	\N
2eaa8aa2-9ff2-4b4a-b24f-13902256b9bf	ssmkrishnan86@gmail.com	$2b$12$1SN3.Xr3MDc4X6iSdKyVeO/o5ijxnRgWudnXSThdFZZkpZlA4bJkm	murali	krishnans		CUSTOMER	\N	t	2026-08-09 03:35:25.356228+05:30	2026-08-09 17:26:22.664649+05:30	f	f	f	2026-08-09 17:26:23.242616+05:30
usr_101	rahul.sharma@example.com	$2b$12$.7Joi8mQAdl/WrRcV8Qm9.5vOl3/vmDeJnBKSAJLDCBqYTsEgTeE6	Rahul	Sharma	9876543210	CUSTOMER	data:image/jpeg;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA	t	2026-08-08 23:34:11.781852+05:30	2026-08-09 17:26:46.020509+05:30	f	f	f	2026-08-09 02:51:29.361047+05:30
\.


--
-- Data for Name: vendor_settlement_ledger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendor_settlement_ledger (id, vendor_id, sub_order_id, gross_amount, commission_amount, fee_amount, net_payable, status, settled_at, payout_id, created_at) FROM stdin;
df766f91-213d-46c0-8f30-a0e5f4a525ec	ven_1	fb476209-2cda-497d-990c-35f4cfd7216d	1599.00	127.92	0.00	1471.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:03:41.918351+05:30
f2d50f39-8a30-46e4-b4c7-23e00d419b35	ven_1	e922d22b-b424-4209-a37c-e48af56c70b8	1499.00	119.92	0.00	1379.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:04:59.807117+05:30
d74a8cfa-fd64-4d1f-8e21-c84a0ca9874a	ven_1	776fb8c6-c779-43d5-976b-fa130f62b376	3198.00	255.84	0.00	2942.16	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:05:29.208279+05:30
8c09dedb-f9ef-4549-8a59-b3bf2c379837	ven_1	03c51076-038a-46c9-bc68-373f31dd48e3	1499.00	119.92	0.00	1379.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:05:59.596062+05:30
20e00394-e8cd-4534-8483-87f4f710fad7	ven_1	1646722f-8be5-425b-a7de-2cd782f12fee	1599.00	127.92	0.00	1471.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:09:19.572001+05:30
02b6a918-e924-4eb3-88b8-bcf5efb05385	ven_1	8c279e3f-d367-492e-8abe-5b51451b7265	299.00	23.92	0.00	275.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:10:28.130638+05:30
651e6676-ecfe-41dd-b0de-82590ae65e7a	ven_1	926740bf-d6a6-4654-90d0-40e6d8af5856	1599.00	127.92	0.00	1471.08	PENDING	\N	payout_rzp_pay_MS	2026-08-09 18:12:28.494805+05:30
2487a17d-46ca-481b-a735-376077c96453	ven_1	55b0336f-c664-44d3-8be7-e0dc8777b8e3	6599.00	527.92	0.00	6071.08	PENDING	\N	payout_rzp_pay_MS	2026-08-10 05:39:42.528211+05:30
6f9af4eb-7634-46bc-8888-cea3afedbb24	ven_1	bd016ae0-55d8-4894-adde-34587b8f33ca	5098.00	407.84	0.00	4690.16	PENDING	\N	payout_rzp_pay_MS	2026-08-10 16:37:58.754419+05:30
\.


--
-- Data for Name: vendor_sub_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendor_sub_orders (id, parent_order_id, sub_order_number, vendor_id, vendor_name, vendor_status, fulfillment_status, shipment_status, subtotal, discount, shipping_fee, tax, total, courier_partner, tracking_number, pickup_date, shipped_date, estimated_delivery_date, delivered_at, cancellation_reason, return_reason, commission_rate, platform_commission, applicable_fees, vendor_payable_amount, settlement_status, return_window_closes_at, created_at, updated_at) FROM stdin;
e94a6279-d77a-4d6d-b5e7-ac75a958b844	8e3bb57d-b0f1-43ad-880e-86f00da46e07	DK2026110CE6-V2	ven_2	Sacred Organics & Incense	NEW	UNFULFILLED	NOT_SHIPPED	2792.00	0.00	0.00	502.56	3294.56	\N	\N	\N	\N	\N	\N	\N	\N	10.00	279.20	0.00	2512.80	PENDING	\N	2026-08-09 11:44:08.355504+05:30	2026-08-09 11:44:08.355507+05:30
55b0336f-c664-44d3-8be7-e0dc8777b8e3	ae27cc6f-ca1a-4aa3-93d2-de9321ec5e10	DK2026C192B0-V1	ven_1	Vedic Crafts Heritage	SHIPPED	FULFILLED	SHIPPED	6599.00	0.00	0.00	1187.82	7786.82	Delhivery Logistics	BD-15345750	\N	2026-08-10 11:13:32.548054+05:30	2026-08-14 11:13:32.548062+05:30	\N	\N	\N	8.00	527.92	0.00	6071.08	PENDING	\N	2026-08-10 05:39:36.412662+05:30	2026-08-10 11:13:32.547997+05:30
2531d318-8934-4a29-a176-c475ad9e0225	8e3bb57d-b0f1-43ad-880e-86f00da46e07	DK2026110CE6-V1	ven_1	Vedic Crafts Heritage	SHIPPED	FULFILLED	SHIPPED	10294.00	0.00	0.00	1852.92	12146.92	BlueDart Express	BD-81390441	\N	2026-08-09 23:03:01.893289+05:30	2026-08-13 23:03:01.893292+05:30	\N	\N	\N	8.00	823.52	0.00	9470.48	PENDING	\N	2026-08-09 11:44:08.340275+05:30	2026-08-09 23:03:01.893263+05:30
6ad3811d-edc8-4ade-b64c-c9fb8c176ba5	32bbcdda-389e-4762-b8a1-2baa47e3a694	DK2026DF1A07-V1	ven_1	Vedic Crafts Heritage	NEW	UNFULFILLED	NOT_SHIPPED	4098.00	0.00	0.00	737.64	4835.64	\N	\N	\N	\N	\N	\N	\N	\N	8.00	327.84	0.00	3770.16	PENDING	\N	2026-08-09 17:59:59.743433+05:30	2026-08-09 17:59:59.74344+05:30
3f9cc94d-71b9-4663-9ab6-aea99a30ecf1	dcf8348d-6d20-4843-ac49-b73da1da5871	DK2026E0A273-V1	ven_1	Vedic Crafts Heritage	NEW	UNFULFILLED	NOT_SHIPPED	2199.00	0.00	0.00	395.82	2594.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	175.92	0.00	2023.08	PENDING	\N	2026-08-09 18:01:36.863566+05:30	2026-08-09 18:01:36.86357+05:30
fb476209-2cda-497d-990c-35f4cfd7216d	ddf6ae80-c38e-4b2b-89bb-165437a20582	DK2026C41C0D-V1	ven_1	Vedic Crafts Heritage	ACCEPTED	PROCESSING	NOT_SHIPPED	1599.00	0.00	0.00	287.82	1886.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	127.92	0.00	1471.08	PENDING	\N	2026-08-09 18:03:40.310172+05:30	2026-08-09 18:03:41.928995+05:30
e922d22b-b424-4209-a37c-e48af56c70b8	f5e170b5-d5f2-4e3d-87d1-293dc55bc67e	DK2026AE0E77-V1	ven_1	Vedic Crafts Heritage	ACCEPTED	PROCESSING	NOT_SHIPPED	1499.00	0.00	0.00	269.82	1768.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	119.92	0.00	1379.08	PENDING	\N	2026-08-09 18:04:58.527038+05:30	2026-08-09 18:04:59.811974+05:30
776fb8c6-c779-43d5-976b-fa130f62b376	e3e15bd0-76c5-42ff-ae31-b08210723a33	DK2026CFCA5E-V1	ven_1	Vedic Crafts Heritage	ACCEPTED	PROCESSING	NOT_SHIPPED	3198.00	0.00	0.00	575.64	3773.64	\N	\N	\N	\N	\N	\N	\N	\N	8.00	255.84	0.00	2942.16	PENDING	\N	2026-08-09 18:05:27.922844+05:30	2026-08-09 18:05:29.235725+05:30
03c51076-038a-46c9-bc68-373f31dd48e3	6fd6d5f6-6e96-46ef-ad66-400c2539e548	DK2026186872-V1	ven_1	Vedic Crafts Heritage	ACCEPTED	PROCESSING	NOT_SHIPPED	1499.00	0.00	0.00	269.82	1768.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	119.92	0.00	1379.08	PENDING	\N	2026-08-09 18:05:58.31251+05:30	2026-08-09 18:05:59.597689+05:30
5d6f0256-bc0f-441f-a1ee-86808a82b7f4	cb6a8c6b-4250-47bc-8041-e1ef11f1a8c3	DK2026BFB9E8-V1	ven_1	Vedic Crafts Heritage	NEW	UNFULFILLED	NOT_SHIPPED	1899.00	0.00	0.00	341.82	2240.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	151.92	0.00	1747.08	PENDING	\N	2026-08-09 18:08:21.588038+05:30	2026-08-09 18:08:21.588045+05:30
1646722f-8be5-425b-a7de-2cd782f12fee	1a79b001-c7f7-4ca2-9725-8c20bf24ff09	DK2026DAB185-V1	ven_1	Vedic Crafts Heritage	ACCEPTED	PROCESSING	NOT_SHIPPED	1599.00	0.00	0.00	287.82	1886.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	127.92	0.00	1471.08	PENDING	\N	2026-08-09 18:08:58.793912+05:30	2026-08-09 18:09:19.574641+05:30
926740bf-d6a6-4654-90d0-40e6d8af5856	b8662f14-67b4-43a2-99f3-54a299858746	DK20264FB25D-V1	ven_1	Vedic Crafts Heritage	CANCELLED	CANCELLED	NOT_SHIPPED	1599.00	0.00	0.00	287.82	1886.82	\N	\N	\N	\N	\N	\N	Ordered by mistake	\N	8.00	127.92	0.00	1471.08	PENDING	\N	2026-08-09 18:12:25.685828+05:30	2026-08-09 18:15:02.961803+05:30
8c279e3f-d367-492e-8abe-5b51451b7265	8d3359b8-afaf-41c5-ba55-32555136d5af	DK2026144D34-V1	ven_1	Vedic Crafts Heritage	PACKED	PACKED	NOT_SHIPPED	299.00	0.00	60.00	53.82	412.82	\N	\N	\N	\N	\N	\N	\N	\N	8.00	23.92	0.00	275.08	PENDING	\N	2026-08-09 18:10:15.578867+05:30	2026-08-09 23:57:31.10553+05:30
bd016ae0-55d8-4894-adde-34587b8f33ca	d70ee801-50f2-40ae-aafb-7ccefb2407c6	DK20266A51D9-V1	ven_1	Vedic Crafts Heritage	SHIPPED	FULFILLED	SHIPPED	5098.00	0.00	0.00	917.64	6015.64	Delhivery Logistics	BD-39062314	\N	2026-08-10 22:08:24.280398+05:30	2026-08-14 22:08:24.280404+05:30	\N	\N	\N	8.00	407.84	0.00	4690.16	PENDING	\N	2026-08-10 16:37:53.260717+05:30	2026-08-10 22:08:24.280305+05:30
\.


--
-- Data for Name: vendors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendors (id, user_id, name, slug, logo, banner, description, category, status, commission_rate, rating, gst_number, pan_number, phone, email, street, city, state, zip_code, created_at, updated_at, is_deleted) FROM stdin;
ven_1	usr_ven_101	Vedic Crafts Heritage	vedic-crafts-heritage	/images/ganesha_idol.jpg	\N	\N	Idols & Puja Samagri	ACTIVE	8.00	4.90	33AAAAA0000A1Z5	\N	9876543210	contact@vediccrafts.com	123, Temple Street, Gandhi Road	Kanchipuram	Tamil Nadu	631502	2026-08-08 23:34:11.787063+05:30	2026-08-08 23:34:11.787063+05:30	f
ven_2	usr_ven_102	Sacred Organics & Incense	sacred-organics-incense	/images/products/panchamrita_kalash.jpg	\N	\N	Puja Samagri	ACTIVE	10.00	4.85	27BBBBB1111B2Z4	\N	9876543211	info@sacredorganics.com	45, Giri Path, Ashram Marg	Varanasi	Uttar Pradesh	221001	2026-08-09 17:13:53.874596+05:30	2026-08-09 17:13:53.874596+05:30	f
\.


--
-- Data for Name: wishlist_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wishlist_items (id, user_id, product_id, added_at) FROM stdin;
wish_1	usr_101	prod_6	2026-08-09 02:25:14.712912+05:30
\.


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: brands brands_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_slug_key UNIQUE (slug);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: inventory_reservations inventory_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_reservations
    ADD CONSTRAINT inventory_reservations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: order_timeline_logs order_timeline_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_timeline_logs
    ADD CONSTRAINT order_timeline_logs_pkey PRIMARY KEY (id);


--
-- Name: orders orders_order_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_number_key UNIQUE (order_number);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: otp_codes otp_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_codes
    ADD CONSTRAINT otp_codes_pkey PRIMARY KEY (id);


--
-- Name: payouts payouts_payout_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payouts
    ADD CONSTRAINT payouts_payout_number_key UNIQUE (payout_number);


--
-- Name: payouts payouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payouts
    ADD CONSTRAINT payouts_pkey PRIMARY KEY (id);


--
-- Name: product_approval_logs product_approval_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_approval_logs
    ADD CONSTRAINT product_approval_logs_pkey PRIMARY KEY (id);


--
-- Name: product_change_requests product_change_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_change_requests
    ADD CONSTRAINT product_change_requests_pkey PRIMARY KEY (id);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: product_variants product_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);


--
-- Name: products products_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_slug_key UNIQUE (slug);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_hash_key UNIQUE (token_hash);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: shopping_cart_items shopping_cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT shopping_cart_items_pkey PRIMARY KEY (id);


--
-- Name: shopping_cart shopping_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (id);


--
-- Name: shopping_cart_items uq_cart_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT uq_cart_product UNIQUE (cart_id, product_id);


--
-- Name: shopping_cart uq_shopping_cart_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT uq_shopping_cart_user UNIQUE (user_id);


--
-- Name: wishlist_items uq_wishlist_user_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT uq_wishlist_user_product UNIQUE (user_id, product_id);


--
-- Name: user_verification_tokens user_verification_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verification_tokens
    ADD CONSTRAINT user_verification_tokens_pkey PRIMARY KEY (id);


--
-- Name: user_verification_tokens user_verification_tokens_token_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verification_tokens
    ADD CONSTRAINT user_verification_tokens_token_hash_key UNIQUE (token_hash);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vendor_settlement_ledger vendor_settlement_ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_settlement_ledger
    ADD CONSTRAINT vendor_settlement_ledger_pkey PRIMARY KEY (id);


--
-- Name: vendor_sub_orders vendor_sub_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_sub_orders
    ADD CONSTRAINT vendor_sub_orders_pkey PRIMARY KEY (id);


--
-- Name: vendor_sub_orders vendor_sub_orders_sub_order_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_sub_orders
    ADD CONSTRAINT vendor_sub_orders_sub_order_number_key UNIQUE (sub_order_number);


--
-- Name: vendors vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- Name: vendors vendors_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_slug_key UNIQUE (slug);


--
-- Name: wishlist_items wishlist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);


--
-- Name: idx_addresses_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_addresses_user_id ON public.addresses USING btree (user_id) WHERE (is_deleted = false);


--
-- Name: idx_audit_logs_action; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_audit_logs_action ON public.audit_logs USING btree (action);


--
-- Name: idx_notifications_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_user_id ON public.notifications USING btree (user_id);


--
-- Name: idx_notifications_user_unread; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notifications_user_unread ON public.notifications USING btree (user_id) WHERE (is_read = false);


--
-- Name: idx_orders_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_status ON public.orders USING btree (status);


--
-- Name: idx_orders_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_user_id ON public.orders USING btree (user_id);


--
-- Name: idx_orders_vendor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_vendor_id ON public.orders USING btree (vendor_id);


--
-- Name: idx_otp_codes_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_otp_codes_user_id ON public.otp_codes USING btree (user_id);


--
-- Name: idx_products_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_category ON public.products USING btree (category);


--
-- Name: idx_products_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_status ON public.products USING btree (status);


--
-- Name: idx_products_vendor_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_vendor_id ON public.products USING btree (vendor_id);


--
-- Name: idx_refresh_tokens_token_hash; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refresh_tokens_token_hash ON public.refresh_tokens USING btree (token_hash);


--
-- Name: idx_refresh_tokens_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_refresh_tokens_user_id ON public.refresh_tokens USING btree (user_id);


--
-- Name: idx_reviews_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_reviews_product_id ON public.reviews USING btree (product_id);


--
-- Name: idx_shopping_cart_items_cart_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_shopping_cart_items_cart_id ON public.shopping_cart_items USING btree (cart_id);


--
-- Name: idx_shopping_cart_items_product_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_shopping_cart_items_product_id ON public.shopping_cart_items USING btree (product_id);


--
-- Name: idx_shopping_cart_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_shopping_cart_user_id ON public.shopping_cart USING btree (user_id) WHERE (is_deleted = false);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_email ON public.users USING btree (email) WHERE (is_deleted = false);


--
-- Name: idx_verification_tokens_hash; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_verification_tokens_hash ON public.user_verification_tokens USING btree (token_hash);


--
-- Name: idx_verification_tokens_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_verification_tokens_user_id ON public.user_verification_tokens USING btree (user_id);


--
-- Name: idx_wishlist_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_wishlist_user_id ON public.wishlist_items USING btree (user_id);


--
-- Name: addresses trg_addresses_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: shopping_cart_items trg_shopping_cart_items_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_shopping_cart_items_updated_at BEFORE UPDATE ON public.shopping_cart_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: shopping_cart trg_shopping_cart_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_shopping_cart_updated_at BEFORE UPDATE ON public.shopping_cart FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: orders update_orders_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: products update_products_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: users update_users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vendors update_vendors_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: addresses addresses_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: inventory_reservations inventory_reservations_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_reservations
    ADD CONSTRAINT inventory_reservations_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: inventory_reservations inventory_reservations_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_reservations
    ADD CONSTRAINT inventory_reservations_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: order_items order_items_sub_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_sub_order_id_fkey FOREIGN KEY (sub_order_id) REFERENCES public.vendor_sub_orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: order_timeline_logs order_timeline_logs_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_timeline_logs
    ADD CONSTRAINT order_timeline_logs_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: orders orders_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: otp_codes otp_codes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_codes
    ADD CONSTRAINT otp_codes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payouts payouts_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payouts
    ADD CONSTRAINT payouts_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: product_approval_logs product_approval_logs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_approval_logs
    ADD CONSTRAINT product_approval_logs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_change_requests product_change_requests_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_change_requests
    ADD CONSTRAINT product_change_requests_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_change_requests product_change_requests_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_change_requests
    ADD CONSTRAINT product_change_requests_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: product_images product_images_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_variants product_variants_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_variants
    ADD CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: products products_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: shopping_cart_items shopping_cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_items
    ADD CONSTRAINT shopping_cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.shopping_cart(id) ON DELETE CASCADE;


--
-- Name: shopping_cart shopping_cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_verification_tokens user_verification_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_verification_tokens
    ADD CONSTRAINT user_verification_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: vendor_settlement_ledger vendor_settlement_ledger_sub_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_settlement_ledger
    ADD CONSTRAINT vendor_settlement_ledger_sub_order_id_fkey FOREIGN KEY (sub_order_id) REFERENCES public.vendor_sub_orders(id) ON DELETE CASCADE;


--
-- Name: vendor_settlement_ledger vendor_settlement_ledger_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_settlement_ledger
    ADD CONSTRAINT vendor_settlement_ledger_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: vendor_sub_orders vendor_sub_orders_parent_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_sub_orders
    ADD CONSTRAINT vendor_sub_orders_parent_order_id_fkey FOREIGN KEY (parent_order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: vendor_sub_orders vendor_sub_orders_vendor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_sub_orders
    ADD CONSTRAINT vendor_sub_orders_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);


--
-- Name: vendors vendors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: wishlist_items wishlist_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wishlist_items
    ADD CONSTRAINT wishlist_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ilSQ4bORCWab5jSvZvvgct238NqOSSVhRl7RfuokQpZVh3YlxEvqonAgVKdQWKz

