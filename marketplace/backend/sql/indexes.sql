-- Index Your Tables Here --
CREATE INDEX category_idx ON Category(name);
CREATE INDEX person_idx ON Person(name, email);
CREATE INDEX listing_idx ON Listing(id);