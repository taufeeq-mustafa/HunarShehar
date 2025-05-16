import os
import subprocess
from google.cloud import aiplatform

def enable_apis():
    """Enable required Google Cloud APIs"""
    apis = [
        'cloudresourcemanager.googleapis.com',
        'aiplatform.googleapis.com',
        'cloudbuild.googleapis.com',
        'run.googleapis.com'
    ]
    
    for api in apis:
        try:
            subprocess.run([
                'gcloud', 'services', 'enable', api,
                '--project', os.getenv('GOOGLE_CLOUD_PROJECT', 'hunarsheher-pwa')
            ], check=True)
            print(f"Enabled {api}")
        except subprocess.CalledProcessError as e:
            print(f"Error enabling {api}: {e}")

if __name__ == "__main__":
    enable_apis() 