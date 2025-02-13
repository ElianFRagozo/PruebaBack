const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const Line = require("../src/models/Line");
const Movement = require("../src/models/Movement");
const Project = require("../src/models/Project");
const { createTestUser } = require("./setupTestDB");

let authToken;

beforeAll(async () => {
  await connectDB();

  authToken = await createTestUser();

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({ email: "test@example.com", password: "password123" });

  authToken = loginResponse.body.token;
});

beforeEach(async () => {
  await Project.deleteMany();
  await Movement.deleteMany();
  await Line.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

jest.setTimeout(10000);

describe("Actualizar valores en una línea", () => {
  let project, movement, line;

  beforeEach(async () => {
    project = await Project.create({
      name: "Proyecto de prueba",
      creator: new mongoose.Types.ObjectId(),
      numbers: {
        sumPrice: { number: 1000 },
        sumBudget: { number: 5000 },
      },
    });

    movement = await Movement.create({
      name: "Movimiento Test",
      project: project._id,
      numbers: {
        sumPrice: { number: 0 },
        sumBudget: { number: 0 },
        budgetUtility: { number: 0 },
        budgetMargin: { number: 0 },
      },
    });

    line = await Line.create({
      name: "Línea Test",
      movement: movement._id,
      numbers: {
        sumPrice: { number: 1000 },
        sumBudget: { number: 800 },
        budgetUtility: { number: 200 },
        budgetMargin: { number: 20 },
      },
    });
  });

  it("Debe actualizar sumPrice y sumBudget en una línea y propagar cambios a movimientos y proyectos", async () => {
    const response = await request(app)
      .put(`/api/lines/${line._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ sumPrice: 1500, sumBudget: 1200 });

    expect(response.status).toBe(200);
    expect(response.body.line.numbers.sumPrice.number).toBe(1500);
    expect(response.body.line.numbers.sumBudget.number).toBe(1200);
    expect(response.body.line.numbers.budgetUtility.number).toBe(300);
    expect(response.body.line.numbers.budgetMargin.number).toBeCloseTo(20, 1);

    const updatedMovement = await Movement.findById(movement._id);
    expect(updatedMovement.numbers.sumPrice.number).toBe(1500);
    expect(updatedMovement.numbers.sumBudget.number).toBe(1200);

    const updatedProject = await Project.findById(project._id);
    expect(updatedProject.numbers.sumPrice.number).toBe(1500);
    expect(updatedProject.numbers.sumBudget.number).toBe(1200);
  });

  it("Debe rechazar la actualización si el usuario no está autenticado", async () => {
    const response = await request(app)
      .put(`/api/lines/${line._id}`)
      .send({ sumPrice: 1500 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No autorizado, token no presente");
  });

  it("Debe retornar error si la línea no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId(); // Genera un ID válido pero inexistente
    const response = await request(app)
      .put(`/api/lines/${fakeId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ sumPrice: 1500, sumBudget: 1200 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Línea no encontrada");
  });
});
