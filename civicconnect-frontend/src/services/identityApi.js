import { IDENTITY_RECORDS, wait } from "./dummyData";

let records = [...IDENTITY_RECORDS];

export async function listIdentityRecords() {
  await wait();
  return [...records];
}

export async function getIdentityByCitizen(citizenId) {
  await wait(250);
  return records.find((r) => r.citizenId === citizenId) || null;
}

export async function createIdentityRecord(payload) {
  await wait(400);
  const record = { id: `idn-${Date.now()}`, status: "unverified", updatedAt: new Date().toISOString().slice(0, 10), ...payload };
  records = [record, ...records];
  return record;
}

export async function verifyIdentityRecord(id) {
  await wait(400);
  records = records.map((r) => (r.id === id ? { ...r, status: "verified", updatedAt: new Date().toISOString().slice(0, 10) } : r));
  return records.find((r) => r.id === id);
}

export async function deleteIdentityRecord(id) {
  await wait(300);
  records = records.filter((r) => r.id !== id);
  return { success: true };
}
