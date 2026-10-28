# Kubernetes GitOps Platform

A cloud-native platform built with Kubernetes, GitOps, and observability tools.

## Objectives

- Deploy a local Kubernetes cluster with Kind.
- Configure Cilium networking and Hubble network observability.
- Manage deployments with Argo CD and GitOps.
- Develop a Taskboard application.
- Add monitoring with Prometheus and Grafana.
- Apply Kubernetes network policies.

## Technology Stack

- Kubernetes and Kind
- Cilium and Hubble
- Argo CD
- Docker
- FastAPI
- Nginx
- PostgreSQL
- Prometheus and Grafana
- Git and GitHub

## Repository Structure

- `app/` — Application source code
- `docs/` — Project documentation
- `k8s/` — Kubernetes manifests
- `kind/` — Kind cluster configuration

## Current Progress

- [x] Kind cluster created
- [x] Cilium and Hubble installed
- [x] Argo CD installed
- [ ] Taskboard application developed
- [ ] Application deployed through GitOps
- [ ] Prometheus and Grafana configured
- [ ] Network policies implemented and tested

## Environment

Kali Linux running in VirtualBox.

This is a learning project. Review security settings before any production use.
