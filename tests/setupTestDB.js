const request = require('supertest');
const app = require('../src/app');
const bcrypt = require("bcryptjs");
const User = require("../src/models/User");

async function createTestUser() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: hashedPassword,  // 🔹 Aseguramos que la contraseña coincide
  });
}

module.exports = { createTestUser };
