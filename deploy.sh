#!/bin/bash
set -e

REMOTE="pradeep-oracle"
REMOTE_DIR="~/vsds"
LOCAL_BACKEND="$(dirname "$0")/apps/backend"
LOCAL_ENV="$LOCAL_BACKEND/.env"

echo "▶ Reading local .env..."

# Helper: extract value from local .env
get_env() {
  grep "^$1=" "$LOCAL_ENV" | cut -d'=' -f2-
}

LMS_BASE_URL=$(get_env LMS_BASE_URL)
LMS_API_KEY=$(get_env LMS_API_KEY)
WATI_BASE_URL=$(get_env WATI_BASE_URL)
WATI_API_KEY=$(get_env WATI_API_KEY)
WATI_TEMPLATE_NAME=$(get_env WATI_TEMPLATE_NAME)
RESEND_API_KEY=$(get_env RESEND_API_KEY)
RESEND_FROM_EMAIL=$(get_env RESEND_FROM_EMAIL)
RESEND_FROM_NAME=$(get_env RESEND_FROM_NAME)
ALGOLIA_APP_ID=$(get_env ALGOLIA_APP_ID)
ALGOLIA_API_KEY=$(get_env ALGOLIA_API_KEY)
ALGOLIA_INDEX_NAME=$(get_env ALGOLIA_INDEX_NAME)

echo "▶ Writing .env.docker on server from local .env..."
ssh "$REMOTE" "cat > $REMOTE_DIR/apps/backend/.env.docker << 'ENVEOF'
# Auto-generated from local .env on deploy — do not edit manually

LMS_BASE_URL=$LMS_BASE_URL
LMS_API_KEY=$LMS_API_KEY

WATI_BASE_URL=$WATI_BASE_URL
WATI_API_KEY=$WATI_API_KEY
WATI_TEMPLATE_NAME=$WATI_TEMPLATE_NAME

RESEND_API_KEY=$RESEND_API_KEY
RESEND_FROM_EMAIL=$RESEND_FROM_EMAIL
RESEND_FROM_NAME=$RESEND_FROM_NAME

ALGOLIA_APP_ID=$ALGOLIA_APP_ID
ALGOLIA_API_KEY=$ALGOLIA_API_KEY
ALGOLIA_INDEX_NAME=$ALGOLIA_INDEX_NAME
ENVEOF"

echo "▶ Syncing backend source (excluding .env files)..."
rsync -avz \
  --exclude='node_modules' \
  --exclude='.env' \
  --exclude='.env.docker' \
  "$LOCAL_BACKEND/" "$REMOTE:$REMOTE_DIR/apps/backend/"

echo "▶ Building Docker images..."
ssh "$REMOTE" "cd $REMOTE_DIR && docker compose build backend worker_batch_advance worker_messaging worker_ordering 2>&1 | tail -6"

echo "▶ Restarting containers..."
ssh "$REMOTE" "cd $REMOTE_DIR && docker compose up -d --no-deps backend worker_batch_advance worker_messaging worker_ordering 2>&1"

echo "▶ Verifying backend..."
sleep 4
ssh "$REMOTE" "docker logs vsds_backend --tail 4 2>&1"

echo "✅ Deploy complete."
