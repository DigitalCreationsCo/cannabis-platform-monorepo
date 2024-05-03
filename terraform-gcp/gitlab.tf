# Install Gitlab Kubernetes Agent for Gitlab Managed CICD
resource "null_resource" "gitlab_kuberenetes_agent" {
  depends_on = [null_resource.local_k8s_context]
  provisioner "local-exec" {
    command = "./scripts/gitlab/install-gitlab-agent.sh"

    environment = {
      TOKEN = var.gitlab_token
    }
  }
}