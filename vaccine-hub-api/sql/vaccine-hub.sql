\echo 'Delete and recreate vaccine_hub db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub

\i ./sql/vaccine-hub-schema.sql