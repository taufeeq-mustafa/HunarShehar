# Error handling
$ErrorActionPreference = "Stop"

# Check if .env file exists
if (-not (Test-Path .env)) {
    Write-Error ".env file not found. Please create it with the required environment variables."
    exit 1
}

# Load environment variables
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $name = $matches[1]
        $value = $matches[2]
        Set-Item -Path "env:\$name" -Value $value
    }
}

# Verify required environment variables
$requiredVars = @("GOOGLE_CLOUD_PROJECT", "GOOGLE_CLOUD_LOCATION")
foreach ($var in $requiredVars) {
    if (-not (Get-Item "env:\$var" -ErrorAction SilentlyContinue)) {
        Write-Error "Required environment variable $var is not set"
        exit 1
    }
}

Write-Host "Building Docker image..."
try {
    docker build -t gcr.io/$env:GOOGLE_CLOUD_PROJECT/hunar-sheher-backend ./backend
} catch {
    Write-Error "Failed to build Docker image: $_"
    exit 1
}

Write-Host "Pushing Docker image..."
try {
    docker push gcr.io/$env:GOOGLE_CLOUD_PROJECT/hunar-sheher-backend
} catch {
    Write-Error "Failed to push Docker image: $_"
    exit 1
}

Write-Host "Deploying to Cloud Run..."
try {
    gcloud run deploy hunar-sheher-backend `
        --image gcr.io/$env:GOOGLE_CLOUD_PROJECT/hunar-sheher-backend `
        --platform managed `
        --region $env:GOOGLE_CLOUD_LOCATION `
        --allow-unauthenticated `
        --set-env-vars="GOOGLE_CLOUD_PROJECT=$env:GOOGLE_CLOUD_PROJECT,GOOGLE_CLOUD_LOCATION=$env:GOOGLE_CLOUD_LOCATION,VERTEX_AI_ENDPOINT=$env:VERTEX_AI_ENDPOINT"
} catch {
    Write-Error "Failed to deploy to Cloud Run: $_"
    exit 1
}

Write-Host "Deploying agents to Vertex AI..."
try {
    python deploy_vertex.py
} catch {
    Write-Error "Failed to deploy agents to Vertex AI: $_"
    exit 1
}

Write-Host "Deployment completed successfully!" 