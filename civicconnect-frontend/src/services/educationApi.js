import { EDUCATION_RECORDS, wait } from "./dummyData";

let records = [...EDUCATION_RECORDS];

export async function listEducationRecords() {
  await wait();
  return [...records];
}

export async function getEducationByCitizen(citizenId) {
  await wait(250);
  return records.find((r) => r.citizenId === citizenId) || null;
}

export async function createEducationRecord(payload) {
  await wait(400);
  const record = { id: `edu-${Date.now()}`, status: "pending", updatedAt: new Date().toISOString().slice(0, 10), ...payload };
  records = [record, ...records];
  return record;
}

export async function updateEducationRecord(id, payload) {
  await wait(400);
  records = records.map((r) => (r.id === id ? { ...r, ...payload, updatedAt: new Date().toISOString().slice(0, 10) } : r));
  return records.find((r) => r.id === id);
}

export async function verifyEducationRecord(id) {
  return updateEducationRecord(id, { status: "verified" });
}

export async function deleteEducationRecord(id) {
  await wait(300);
  records = records.filter((r) => r.id !== id);
  return { success: true };
}
