DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Listing;
DROP TABLE IF EXISTS Person;
create table Listing (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    img_url VARCHAR(50),
    create_user VARCHAR(50),
    create_time DATE,
    replies TEXT,
    price VARCHAR(50),
    longitude VARCHAR(50),
    latitude VARCHAR(50),
    category VARCHAR(13)
);
create table Category (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(13) UNIQUE,
    filters jsonb,
    subcategories jsonb
);
create table Person (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(72),
    role VARCHAR(20)
);