const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const addFilters = (filterValues) => {
  let select = '';
  for (const filter of filterValues) {
    if (filter.filter_name === 'price') {
      if (filter.max) {
        select +=` WHERE price < ${filter.max}`;
      }
      if (filter.min) {
        select +=` WHERE price > ${filter.min}`;
      }
    }
    if (filter.filter_name === 'create_time') {
      if (filter.max === 'first') {
        select +=' ORDER BY create_time DESC';
      } else if (filter.min === 'first') {
        select +=' ORDER BY create_time ASC';
      }
    }
  }
  return select;
};

exports.selectPerson = async (email) => {
  if (!email) {
    return null;
  }
  const select = `SELECT * FROM Person WHERE email = $1`;
  const query = {
    text: select,
    values: [`${email}`],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.selectCategory = async (category) => {
  let select = `SELECT * FROM Category`;
  if (category) {
    select += `WHERE name = $1`;
  }
  const query = {
    text: select,
    values: category ? [`${category}`] : [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.selectListingBySearch = async (search, filterValues) => {
  let select = `SELECT * FROM Listing `;
  if (search) {
    select += `WHERE name ~* $1`;
  }
  select += addFilters(filterValues);
  const query = {
    text: select,
    values: search ? [`${search}`] : [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.selectListingByCategory = async (category, filtersName) => {
  let select = `SELECT * FROM listing `;
  if (category) {
    select += `WHERE category = $1`;
  }
  select += addFilters(filterValues);
  const query = {
    text: select,
    values: category ? [`${category}`] : [],
  };
  const {rows} = await pool.query(query);
  return rows;
};
exports.selectListingBySubcategory = async (category, filtersName) => {
  let select = `SELECT * FROM listing `;
  if (category) {
    select += `WHERE subcategory = $1`;
  }
  select += addFilters(filterValues);
  const query = {
    text: select,
    values: category ? [`${category}`] : [],
  };
  const {rows} = await pool.query(query);
  return rows;
};

exports.insertListing = async (listing) => {
  const insert = `INSERT INTO listing (name, price, longitude, 
  latitude, img_url, category, create_user, create_time, replies) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
  if (!listing) {
    return null;
  }
  const query = {
    text: insert,
    values: [`${listing.name}`, `${listing.price}`, `${listing.longitude}`,
      `${listing.latitude}`, `${listing.img_url}`, `${listing.category}`,
      `${listing.create_user}`, `${listing.create_time}`,
      `${listing.replies}`],
  };
  const {rows: ids} = await pool.query(query);
  listing.id = ids[0].id;
  return listing;
};

exports.insertPerson = async (person) => {
  if (!person) {
    return null;
  }
  const ifPerson = await exports.selectPerson(person.email);
  if (ifPerson.length >= 1) {
    return null;
  }
  const insert = `INSERT INTO Person (email, password) VALUES ($1, $2) 
  RETURNING id`;
  const query = {
    text: insert,
    values: [`${person.email}`, `${person.password}`],
  };
  const {rows: ids} = await pool.query(query);
  person.id = ids[0].id;
  return person;
};

// exports.insertCategory = async (Category) => {
//   const insert = `INSERT INTO c`;
//   if (Category) {
//     insert += `WHERE name = $1`;
//     const query = {
//       text: insert,
//       values: [`${Category}`],
//     };
//   }
//   const {rows} = await pool.query(query);
//   if (rows.length === 0) {
//     return 404;
//   }
//   return rows;
// };

// exports.updatePerson = async (mailID, newMailbox) => {
//   const selectClause = 'SELECT mail FROM mail WHERE id = $1';
//   const queryEmail = {
//     text: selectClause,
//     values: [mailID],
//   };
//   const {rows} = await pool.query(queryEmail);
//   if (rows.length === 0) {
//     return 404;
//   }
//   const selectMail = rows[0].mail;
//   selectMail.id = mailID;
//   if (newMailbox === 'sent' && selectMail.mailbox !== 'sent') {
//     return 409;
//   }
//   const select = `UPDATE mail SET mailbox=$1 WHERE id = $2`;
//   const query = {
//     text: select,
//     values: [newMailbox, mailID],
//   };
//   await pool.query(query);
//   return 204;
// };

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
