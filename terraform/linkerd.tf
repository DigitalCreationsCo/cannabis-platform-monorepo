# note: terraform may fail to install linkerd with helm if namespace is not create in advance

# note: if there is an issue with service account or secrets relating to linkerd, check this issue: https://www.reddit.com/r/devops/comments/gbo3pc/how_to_use_linkerd_with_terraform/
resource "helm_release" "linkerd_cni" {
    name        = "linkerd-cni"

    namespace   = "linkerd-cni"
    repository  = "linkerd/linkerd2-cni"
    chart       = "linkerd2-cni"
    version     = "30.9.3-edge"
    
    atomic      = true
    create_namespace = true
}

resource "helm_release" "linkerd_crds" {
    name        = "linkerd-crds"

    namespace   = "linkerd"
    repository  = "linkerd/linkerdcrds"

    atomic      = true
    create_namespace = true
}

resource "helm_release" "linkerd_control_plane" {
    name        = "linkerd-control-plane"

    namespace   = "linkerd"
    repository  = "linkerd/linkerd-control-plane"
    chart       = "linkerd-control-plane"

    set {
        name    = "identityTrustAnchorsPEM"
        value   = file("${local.root_dir}/ca.crt")
    }

    set {
        name    = "identity.issuer.tls.crtPEM"
        value   = file("${local.root_dir}/issuer.crt")
    }

    set {
        name    = "identity.issuer.tls.keyPEM"
        value   = file("${local.root_dir}/issuer.key")
    }

    version     = "2.10.2"
    atomic      = true
}

resource "helm_release" "linkerd_viz" {
    name        = "linkerd-viz"

    namespace   = "linkerd"
    repository  = "linkerd/linkerd-viz"
    chart       = "linkerd-viz"

    version     = "30.8.5"
    atomic      = true
}