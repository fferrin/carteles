terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.50.0"
    }
  }
}

provider "google" {
  project     = "dev-carteles"
  region      = "us-central1"
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = "dev-carteles"
}
