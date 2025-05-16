#!/bin/bash

# Load environment variables
source .env

# Build and push the Docker image
docker build -t gcr.io/$GOOGLE_CLOUD_PROJECT/hunar-sheher-backend ./backend
docker push gcr.io/$GOOGLE_CLOUD_PROJECT/hunar-sheher-backend

# Deploy to Cloud Run
gcloud run deploy hunar-sheher-backend \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/hunar-sheher-backend \
  --platform managed \
  --region $GOOGLE_CLOUD_LOCATION \
  --allow-unauthenticated \
  --set-env-vars="GOOGLE_CLOUD_PROJECT=$GOOGLE_CLOUD_PROJECT,GOOGLE_CLOUD_LOCATION=$GOOGLE_CLOUD_LOCATION,VERTEX_AI_ENDPOINT=$VERTEX_AI_ENDPOINT"

# Deploy the agents to Vertex AI
python deploy_vertex.py

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable aiplatform.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable storage.googleapis.com

# Update the .env file with the new project ID
echo "GOOGLE_CLOUD_PROJECT=hunarsheher-pwa" > HunarShehar/.env
echo "GOOGLE_CLOUD_LOCATION=us-central1" >> HunarShehar/.env 