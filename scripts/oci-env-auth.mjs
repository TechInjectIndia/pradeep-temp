/**
 * Shared API-key auth from env (same rules as upload-content-images-to-oci.mjs).
 * Accepts OCI_* names or ORACLE_* aliases (e.g. ORACLE_TENANCY_ID, ORACLE_BUCKET_NAME).
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const common = require("oci-common");

export function getOciBucketName() {
  return (
    process.env.OCI_BUCKET?.trim() ||
    process.env.ORACLE_BUCKET_NAME?.trim() ||
    ""
  );
}

export function getOciNamespaceOptional() {
  return (
    process.env.OCI_NAMESPACE?.trim() ||
    process.env.ORACLE_NAMESPACE?.trim() ||
    ""
  );
}

/** Region id for public object URLs, e.g. ap-mumbai-1 */
export function getOciRegionIdOptional() {
  return (
    process.env.OCI_REGION?.trim() || process.env.ORACLE_REGION?.trim() || ""
  );
}

export function loadPrivateKeyPem(projectRoot) {
  const fromEnv =
    process.env.OCI_PRIVATE_KEY?.trim() ||
    process.env.ORACLE_PRIVATE_KEY?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\\n/g, "\n").trim();
  }
  const b64 =
    process.env.OCI_PRIVATE_KEY_BASE64?.trim() ||
    process.env.ORACLE_PRIVATE_KEY_BASE64?.trim();
  if (b64) {
    return Buffer.from(b64, "base64").toString("utf8").trim();
  }
  const keyPath =
    process.env.OCI_PRIVATE_KEY_PATH?.trim() ||
    process.env.ORACLE_PRIVATE_KEY_PATH?.trim();
  if (keyPath) {
    const abs = path.isAbsolute(keyPath)
      ? keyPath
      : path.join(projectRoot, keyPath);
    return fs.readFileSync(abs, "utf8").trim();
  }
  return null;
}

export function createOciAuthenticationProvider(projectRoot) {
  const tenancy =
    process.env.OCI_TENANCY_OCID?.trim() ||
    process.env.ORACLE_TENANCY_ID?.trim();
  const user =
    process.env.OCI_USER_OCID?.trim() || process.env.ORACLE_USER_ID?.trim();
  const fingerprint =
    process.env.OCI_FINGERPRINT?.trim() ||
    process.env.ORACLE_FINGERPRINT?.trim();
  const regionId =
    process.env.OCI_REGION?.trim() || process.env.ORACLE_REGION?.trim();
  const privateKey = loadPrivateKeyPem(projectRoot);
  const passphrase =
    process.env.OCI_PRIVATE_KEY_PASSPHRASE?.trim() ||
    process.env.ORACLE_PRIVATE_KEY_PASSPHRASE?.trim() ||
    null;

  const missing = [];
  if (!tenancy) {
    missing.push("OCI_TENANCY_OCID (or ORACLE_TENANCY_ID)");
  }
  if (!user) missing.push("OCI_USER_OCID (or ORACLE_USER_ID)");
  if (!fingerprint) {
    missing.push("OCI_FINGERPRINT (or ORACLE_FINGERPRINT)");
  }
  if (!regionId) missing.push("OCI_REGION (or ORACLE_REGION)");
  if (!privateKey) {
    missing.push(
      "OCI_PRIVATE_KEY / OCI_PRIVATE_KEY_BASE64 / OCI_PRIVATE_KEY_PATH (or ORACLE_* equivalents)"
    );
  }
  if (missing.length) {
    console.error(
      "OCI API key auth (env only; no ~/.oci/config). Set:\n  " +
        missing.join("\n  ")
    );
    process.exit(1);
  }

  const region = common.Region.fromRegionId(regionId);
  return new common.SimpleAuthenticationDetailsProvider(
    tenancy,
    user,
    fingerprint,
    privateKey,
    passphrase,
    region
  );
}
