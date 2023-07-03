### Terraform module used to create and configure Gras Cannabis Web Services

# main
Provisions providers:
- linode/linode         v2.5.1
- hashicorp/helm        v2.21.1
- hashicorp/kubernetes  v2.21.1
- hashicorp/google      v4.71.0

# certificate
Provisions:
- cert-manager          v1.11.0
    * uses dns recursive ns uses google cloud dns
    * if cert-manager namespace is existing, cert-manager release may fail. Delete the namespace and try again

