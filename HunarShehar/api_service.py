from google.cloud import aiplatform
from google.cloud.aiplatform import Endpoint
import os
import json
from datetime import datetime

class HunarSheherAPIService:
    def __init__(self):
        self.endpoint = Endpoint(
            endpoint_name=os.getenv('VERTEX_AI_ENDPOINT'),
            project=os.getenv('GOOGLE_CLOUD_PROJECT'),
            location=os.getenv('GOOGLE_CLOUD_LOCATION', 'us-central1')
        )

    async def process_learning_request(self, user_input, user_profile=None):
        """
        Process a learning request through the Vertex AI endpoint
        """
        try:
            # Prepare the request payload
            payload = {
                "user_input": user_input,
                "user_profile": user_profile or {},
                "timestamp": str(datetime.now())
            }

            # Make prediction request to the endpoint
            response = self.endpoint.predict([payload])
            
            # Process and return the response
            return {
                "status": "success",
                "data": response.predictions[0]
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }

    async def get_learning_progress(self, user_id):
        """
        Get the user's learning progress
        """
        try:
            payload = {
                "action": "get_progress",
                "user_id": user_id
            }
            
            response = self.endpoint.predict([payload])
            return {
                "status": "success",
                "data": response.predictions[0]
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            } 