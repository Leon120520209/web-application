-- Index Your Tables Here --
CREATE INDEX category_idx ON Category(name);

CREATE INDEX user_idx ON User(name, email);

CREATE INDEX listing_idx ON Listing(id);