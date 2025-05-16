from google.cloud import aiplatform
from google.cloud.aiplatform import Endpoint
import os
import json

def deploy_agents_to_vertex():
    # Initialize Vertex AI
    aiplatform.init(
        project=os.getenv('GOOGLE_CLOUD_PROJECT'),
        location=os.getenv('GOOGLE_CLOUD_LOCATION', 'us-central1')
    )

    # Create endpoint for the root agent
    endpoint = Endpoint.create(
        display_name="hunar-sheher-learning-coordinator",
        project=os.getenv('GOOGLE_CLOUD_PROJECT'),
        location=os.getenv('GOOGLE_CLOUD_LOCATION', 'us-central1')
    )

    # Deploy the model
    model = aiplatform.Model.upload(
        display_name="hunar-sheher-model",
        artifact_uri="gs://your-bucket-name/model",  # Replace with your GCS bucket
        serving_container_image_uri="us-docker.pkg.dev/cloud-aiplatform/prediction/custom-container:latest"
    )

    # Deploy the model to the endpoint
    deployed_model = model.deploy(
        endpoint=endpoint,
        machine_type="n1-standard-4",
        accelerator_type="NVIDIA_TESLA_T4",
        accelerator_count=1
    )

    return endpoint.resource_name

if __name__ == "__main__":
    endpoint_name = deploy_agents_to_vertex()
    print(f"Deployed endpoint: {endpoint_name}") 