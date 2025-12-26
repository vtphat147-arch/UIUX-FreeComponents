-- Script tạo database cho E-Education
-- Chạy script này trong psql hoặc pgAdmin

-- Tạo database
CREATE DATABASE "EEducationDb"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Comment
COMMENT ON DATABASE "EEducationDb"
    IS 'Database for E-Education API';

