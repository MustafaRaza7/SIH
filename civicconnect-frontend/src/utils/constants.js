export const APP_NAME = "CivicConnect";

export const GATEWAY_BASE_URL =
  import.meta.env.VITE_GATEWAY_URL || "http://localhost:8000";

export const SERVICE_PORTS = {
  gateway: 8000,
  income: 8001,
  education: 8002,
  identity: 8003,
  scholarship: 8004,
};

export const APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const STATUS_LABEL = {
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
  verified: "Verified",
  unverified: "Not verified",
};
