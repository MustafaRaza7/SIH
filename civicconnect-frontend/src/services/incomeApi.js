import { INCOME_RECORDS, wait } from "./dummyData";

let records = [...INCOME_RECORDS];

export async function listIncomeRecords() {
  await wait();
  return [...records];
}

export async function getIncomeByCitizen(citizenId) {
  await wait(250);
  return records.find((r) => r.citizenId === citizenId) || null;
}

export async function createIncomeRecord(payload) {
  await wait(400);
  const record = { id: `inc-${Date.now()}`, status: "pending", updatedAt: new Date().toISOString().slice(0, 10), ...payload };
  records = [record, ...records];
  return record;
}

export async function updateIncomeRecord(id, payload) {
  await wait(400);
  records = records.map((r) => (r.id === id ? { ...r, ...payload, updatedAt: new Date().toISOString().slice(0, 10) } : r));
  return records.find((r) => r.id === id);
}

export async function verifyIncomeRecord(id) {
  return updateIncomeRecord(id, { status: "verified" });
}

export async function deleteIncomeRecord(id) {
  await wait(300);
  records = records.filter((r) => r.id !== id);
  return { success: true };
}
