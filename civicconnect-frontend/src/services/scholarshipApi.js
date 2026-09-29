import { SCHOLARSHIP_APPLICATIONS, INCOME_RECORDS, EDUCATION_RECORDS, IDENTITY_RECORDS, wait } from "./dummyData";

let applications = [...SCHOLARSHIP_APPLICATIONS];

export async function listApplications() {
  await wait();
  return [...applications];
}

export async function getApplicationsByCitizen(citizenId) {
  await wait(250);
  return applications.filter((a) => a.citizenId === citizenId);
}

// Mirrors the real flow: Scholarship service calls Income + Education +
// Identity directly (peer-to-peer) before approving.
export async function checkEligibility(citizenId) {
  await wait(500);
  const income = INCOME_RECORDS.find((r) => r.citizenId === citizenId);
  const education = EDUCATION_RECORDS.find((r) => r.citizenId === citizenId);
  const identity = IDENTITY_RECORDS.find((r) => r.citizenId === citizenId);

  const result = {
    income: { ok: income?.status === "verified", detail: income ? `₹${income.annualIncome.toLocaleString("en-IN")} · ${income.source}` : "No record found" },
    education: { ok: education?.status === "verified", detail: education ? `${education.course} · ${education.percentage}%` : "No record found" },
    identity: { ok: identity?.status === "verified", detail: identity ? `Verified ID on file` : "No record found" },
  };
  result.eligible = result.income.ok && result.education.ok && result.identity.ok;
  return result;
}

export async function applyForScholarship(payload) {
  await wait(450);
  const eligibility = await checkEligibility(payload.citizenId);
  const application = {
    id: `sch-${Date.now()}`,
    appliedOn: new Date().toISOString().slice(0, 10),
    status: eligibility.eligible ? "pending" : "rejected",
    eligibility: { income: eligibility.income.ok, education: eligibility.education.ok, identity: eligibility.identity.ok },
    ...payload,
  };
  applications = [application, ...applications];
  return application;
}

export async function approveApplication(id) {
  await wait(400);
  applications = applications.map((a) => (a.id === id ? { ...a, status: "approved" } : a));
  return applications.find((a) => a.id === id);
}

export async function rejectApplication(id) {
  await wait(400);
  applications = applications.map((a) => (a.id === id ? { ...a, status: "rejected" } : a));
  return applications.find((a) => a.id === id);
}
