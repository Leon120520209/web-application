const db = require('./db');

exports.getListingsByCategory = async (req, res) => {
  const listings = await db.selectListingByCategory(req.params.category,
    req.query.filterValues);
  if (listings.length === 0) {
    res.status(404).send();
  }
  res.status(200).json(listings);
};

exports.getListingBySubcategory = async (req, res) => {
  const listings = await db.selectListingBySubcategory(req.params.subcategory,
    req.query.filterValues);
  if (listings.length === 0) {
    res.status(404).send();
  }
  res.status(200).json(listings);
};

exports.getListingsBySearch = async (req, res) => {
  let listings;
  if (Object.keys(req.query).length === 0) {
    listings = await db.selectListingBySearch();
  } else {
    listings = await db.selectListingBySearch(req.query.search,
      req.query.filterValues);
  }
  if (listings.length === 0) {
    res.status(404).send();
  }
  res.status(200).json(listings);
};

exports.postListings = async (req, res) => {
  const listings = req.body;
  const returnListings = [];
  for (const listing of listings) {
    const returnListing = await db.insertListing(listing);
    returnListings.push(returnListing);
  }
  res.status(200).json(returnListings);
};
