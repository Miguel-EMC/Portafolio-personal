export interface UpcomingProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
}

/**
 * Personal projects in progress, with no markdown case-study or route yet.
 * Move an entry to the normal portfolio content pipeline (and delete it here)
 * once the project is real.
 */
export const upcomingProjects: UpcomingProject[] = [
  {
    id: 'serverless-rag-agent',
    title: 'Serverless RAG Agent on AWS',
    description: 'A retrieval-augmented generation agent running on serverless AWS infrastructure.',
    stack: ['Bedrock', 'Lambda', 'Terraform']
  },
  {
    id: 'retrieval-engine-from-scratch',
    title: 'Retrieval Engine from Scratch',
    description: 'A retrieval engine built from the ground up: BM25, embeddings, and evaluation.',
    stack: ['BM25', 'Embeddings', 'Eval']
  }
];
