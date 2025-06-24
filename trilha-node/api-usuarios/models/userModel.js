// models/userModel.js
const db = require('../config/db');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// models/userModel.js
exports.create = ({ name, email }) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
      if (err) reject(err);
      else resolve({ id: result.insertId, name, email });
    });
  });
};

// models/userModel.js
exports.getAllWithPagination = (limit, offset) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users LIMIT ? OFFSET ?", [parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// models/userModel.js
exports.update = (id, { name, email }) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// models/userModel.js
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// models/userModel.js
exports.searchByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE name LIKE ?", [`%${name}%`], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};