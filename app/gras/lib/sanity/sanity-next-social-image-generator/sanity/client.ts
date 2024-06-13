import { createClient } from 'next-sanity';

export const getClient = (
  dataset: string,
  projectId: string,
  apiVersion: string,
  token: string,
  useCdn = false
) =>
  createClient({
    dataset,
    projectId,
    apiVersion,
    token,
    useCdn,
  });
