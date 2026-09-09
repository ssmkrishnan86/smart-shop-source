-- ============================================================================
-- 01_create_database.sql
-- Database creation script for SmartShop Enterprise Multi-Vendor Platform
-- ============================================================================

CREATE DATABASE smartshop_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8';

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
