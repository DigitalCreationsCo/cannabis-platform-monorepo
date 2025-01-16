## GRAS, RETAIL MARKETING SAAS PLATFORM

A retail marketing SaaS platform built on a distributed microservices architecture, hosted within a Google Cloud container cluster. The platform is designed for scalability, utilizing load balancing, an ingress controller, and a feature-rich edge API Gateway to efficiently manage high traffic volumes and ensure seamless routing between services.  

The project implements **Infrastructure as Code (IaC)** using Terraform modules, enabling automated provisioning and management of cloud resources.  
The codebase follows a monorepo structure, promoting consistency and simplifying dependency management across microservices, while reusable code modules ensure maintainability and reduce duplication.  
**TypeScript** is used throughout the application, providing static typing to improve code quality, reduce runtime errors, and enhance developer productivity through better tooling and IDE support.

SHOP
THE BASE APP SHOPPING MARKETPLACE APP IS @gras/SHOP

DASHBOARD
THE VENDOR DASHBOARD APP IS @gras/DASHBOARD

HELP PAGES APP IS @gras/HELP

ARTICLES APP IS @gras/BLOG
---

PROJECT DEPENDENCIES

- MONOREPO RUNTIME DEPENDENCIES FOR EACH MODULE MUST ALSO BE INCLUDED IN THE ROOT PACKAGE.JSON UNDER DEV DEPEDENCIES, THIS COMPILES ALL DEPENDENCIES IN THE ROOT NODE-MODULES DIRECTORY

---

SERVER

MAIN
MAIN SERVER IS RESPONSIBLE FOR AUTHENTICATION SESSIONS, AND QUERY FOR ENTITY DATA ( USER , DRIVER, ORGANIZATION ,VENDOR, ECOMMERCE ). IT USES SUPERTOKENS LIBRARY FOR AUTHENTICATION AND SESSIONING. JWT TOKEN PERMISSIONS ARE NOT CURRENTLY BUILT.
ALSO RESPONSIBLE FOR GEOSPATIAL QUERIES. IT USES MONGODB SERVER TO QUERY GEOJSON DATA.

Dev Environment
You'll need arm64 machine with apple M1 CPU, ideally.

You need these command line tools
gcloud
Google Cloud SDK 437.0.1
bq 2.0.93
core 2023.06.30
gcloud-crc32c 1.0.0
gke-gcloud-auth-plugin 0.5.3
gsutil 5.24
kubectl
Client Version: v1.28.2
Kustomize Version: v5.0.4-0.20230601165947-6ce0bf390ce3
Server Version: v1.27.3-gke.100
terraform
Terraform v1.5.7
on darwin_arm64
docker
Version 23.0.5
API version 1.42
python
Version 3.8.15
