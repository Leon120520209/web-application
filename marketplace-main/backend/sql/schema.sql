DROP TABLE IF EXISTS Category;

DROP TABLE IF EXISTS Listing;

DROP TABLE IF EXISTS User;

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
    name VARCHAR(13),
    filters VARCHAR(50),
    subcategories VARCHAR(50)
);

create table User (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50)
);