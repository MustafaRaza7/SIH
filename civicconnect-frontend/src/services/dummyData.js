// Central dummy dataset. Every services/*Api.js file reads from here and
// returns Promises (with a small artificial delay) so components already
// call everything the way they will once axios hits the real Gateway.

import { ROLES } from "../theme/themeConstants";

export const wait = (ms = 350) => new Promise((res) => setTimeout(res, ms));

export const USERS = [
  {
    id: "u-001",
    name: "Aditi Sharma",
    email: "aditi.sharma@example.com",
    password: "citizen123",
    role: ROLES.CITIZEN,
    citizenId: "c-1001",
  },
  {
    id: "u-002",
    name: "Ramesh Verma",
    email: "income.officer@example.com",
    password: "officer123",
    role: ROLES.INCOME_OFFICER,
  },
  {
    id: "u-003",
    name: "Sunita Rao",
    email: "education.officer@example.com",
    password: "officer123",
    role: ROLES.EDUCATION_OFFICER,
  },
  {
    id: "u-004",
    name: "Vikram Singh",
    email: "identity.officer@example.com",
    password: "officer123",
    role: ROLES.IDENTITY_OFFICER,
  },
  {
    id: "u-005",
    name: "Priya Nair",
    email: "scholarship.officer@example.com",
    password: "officer123",
    role: ROLES.SCHOLARSHIP_OFFICER,
  },
  {
    id: "u-006",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: ROLES.ADMIN,
  },
];

export const INCOME_RECORDS = [
  {
    id: "inc-1001",
    citizenId: "c-1001",
    citizenName: "Aditi Sharma",
    annualIncome: 218000,
    source: "Salaried",
    financialYear: "2025-26",
    status: "verified",
    updatedAt: "2026-08-14",
  },
  {
    id: "inc-1002",
    citizenId: "c-1002",
    citizenName: "Manoj Tiwari",
    annualIncome: 640000,
    source: "Self-employed",
    financialYear: "2025-26",
    status: "pending",
    updatedAt: "2026-09-02",
  },
  {
    id: "inc-1003",
    citizenId: "c-1003",
    citizenName: "Kavita Joshi",
    annualIncome: 95000,
    source: "Agriculture",
    financialYear: "2025-26",
    status: "verified",
    updatedAt: "2026-07-29",
  },
  {
    id: "inc-1004",
    citizenId: "c-1004",
    citizenName: "Farhan Ali",
    annualIncome: 310000,
    source: "Salaried",
    financialYear: "2025-26",
    status: "pending",
    updatedAt: "2026-09-10",
  },
];

export const EDUCATION_RECORDS = [
  {
    id: "edu-2001",
    citizenId: "c-1001",
    citizenName: "Aditi Sharma",
    institution: "Govt. Polytechnic, Bhopal",
    course: "Diploma in Computer Science",
    year: "2nd Year",
    percentage: 82,
    status: "verified",
    updatedAt: "2026-08-01",
  },
  {
    id: "edu-2002",
    citizenId: "c-1002",
    citizenName: "Manoj Tiwari",
    institution: "Barkatullah University",
    course: "B.Com",
    year: "Final Year",
    percentage: 71,
    status: "pending",
    updatedAt: "2026-09-05",
  },
  {
    id: "edu-2003",
    citizenId: "c-1003",
    citizenName: "Kavita Joshi",
    institution: "Govt. Higher Secondary School",
    course: "Class 12",
    year: "Completed",
    percentage: 88,
    status: "verified",
    updatedAt: "2026-06-20",
  },
];

export const IDENTITY_RECORDS = [
  {
    id: "idn-3001",
    citizenId: "c-1001",
    citizenName: "Aditi Sharma",
    idNumber: "458219004417",
    dob: "2005-03-12",
    address: "Shahpura, Bhopal, MP",
    status: "verified",
    updatedAt: "2026-05-11",
  },
  {
    id: "idn-3002",
    citizenId: "c-1002",
    citizenName: "Manoj Tiwari",
    idNumber: "778102994412",
    dob: "2002-11-02",
    address: "Indore, MP",
    status: "verified",
    updatedAt: "2026-04-22",
  },
  {
    id: "idn-3003",
    citizenId: "c-1004",
    citizenName: "Farhan Ali",
    idNumber: "220198774456",
    dob: "2004-01-19",
    address: "Jabalpur, MP",
    status: "unverified",
    updatedAt: "2026-09-01",
  },
];

export const SCHOLARSHIP_APPLICATIONS = [
  {
    id: "sch-4001",
    citizenId: "c-1001",
    citizenName: "Aditi Sharma",
    scheme: "Post-Matric Scholarship",
    amount: 24000,
    appliedOn: "2026-08-20",
    status: "approved",
    eligibility: { income: true, education: true, identity: true },
  },
  {
    id: "sch-4002",
    citizenId: "c-1002",
    citizenName: "Manoj Tiwari",
    scheme: "Merit-cum-Means Scholarship",
    amount: 18000,
    appliedOn: "2026-09-06",
    status: "pending",
    eligibility: { income: false, education: true, identity: true },
  },
  {
    id: "sch-4003",
    citizenId: "c-1003",
    citizenName: "Kavita Joshi",
    scheme: "Pre-Matric Scholarship",
    amount: 12000,
    appliedOn: "2026-07-02",
    status: "approved",
    eligibility: { income: true, education: true, identity: true },
  },
  {
    id: "sch-4004",
    citizenId: "c-1004",
    citizenName: "Farhan Ali",
    scheme: "Post-Matric Scholarship",
    amount: 24000,
    appliedOn: "2026-09-11",
    status: "rejected",
    eligibility: { income: true, education: false, identity: false },
  },
];

export const ACTIVITY_LOGS = [
  { id: "log-1", actor: "Ramesh Verma", action: "Verified income record inc-1001", time: "2026-09-27 09:14" },
  { id: "log-2", actor: "Scholarship Service", action: "Auto-rejected sch-4004 (identity unverified)", time: "2026-09-27 08:52" },
  { id: "log-3", actor: "Vikram Singh", action: "Flagged identity idn-3003 for review", time: "2026-09-26 17:31" },
  { id: "log-4", actor: "Priya Nair", action: "Approved sch-4001", time: "2026-09-26 15:02" },
  { id: "log-5", actor: "Sunita Rao", action: "Verified education record edu-2003", time: "2026-09-25 11:45" },
];

export const SYSTEM_HEALTH = [
  { name: "Gateway", port: 8000, status: "healthy", latencyMs: 42, uptime: 99.98 },
  { name: "Income Service", port: 8001, status: "healthy", latencyMs: 58, uptime: 99.95 },
  { name: "Education Service", port: 8002, status: "healthy", latencyMs: 51, uptime: 99.97 },
  { name: "Identity Service", port: 8003, status: "degraded", latencyMs: 210, uptime: 98.4 },
  { name: "Scholarship Service", port: 8004, status: "healthy", latencyMs: 65, uptime: 99.9 },
];
