#!/usr/bin/env node
/**
 * Smoke test: Object Storage GetNamespace (+ optional HeadBucket if OCI_BUCKET is set).
 * Loads `.env` then `.env.local` from project root (same as upload script).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import {
  createOciAuthenticationProvider,
  getOciBucketName,
  getOciNamespaceOptional,
} from "./oci-env-auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });
dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

const require = createRequire(import.meta.url);
const os = require("oci-objectstorage");

async function main() {
  const client = new os.ObjectStorageClient({
    authenticationDetailsProvider: createOciAuthenticationProvider(ROOT),
  });

  try {
    let namespace = getOciNamespaceOptional();
    if (namespace) {
      console.log("Using namespace from env (OCI_NAMESPACE or ORACLE_NAMESPACE):", namespace);
    } else {
      const nsRes = await client.getNamespace({});
      namespace = nsRes.value;
      console.log("GetNamespace OK. Namespace:", namespace);
    }

    const bucket = getOciBucketName();
    if (bucket) {
      await client.headBucket({
        namespaceName: namespace,
        bucketName: bucket,
      });
      console.log("HeadBucket OK. Bucket:", bucket);
    } else {
      console.log(
        "(Set OCI_BUCKET or ORACLE_BUCKET_NAME to also verify bucket access.)"
      );
    }

    console.log("\nOCI connection test passed.");
  } finally {
    client.close();
  }
}

main().catch((e) => {
  console.error("\nOCI connection test failed:", e.message || e);
  if (e?.statusCode != null) console.error("HTTP status:", e.statusCode);
  process.exit(1);
});
