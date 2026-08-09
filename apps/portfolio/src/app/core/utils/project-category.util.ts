export type ProjectCategory = 'ai' | 'mobile' | 'web';

/**
 * Rough category from a project's stack, used only for the decorative
 * diffused-color treatment on cards that have no screenshot — not shown
 * as a label anywhere.
 */
export function getProjectCategory(stack: string[]): ProjectCategory {
  const s = stack.map(t => t.toLowerCase());
  if (s.some(t => ['flutter', 'react native', 'dart'].includes(t))) {
    return 'mobile';
  }
  if (s.some(t => ['bedrock', 'langgraph', 'langchain', 'rag', 'bm25', 'embeddings', 'eval', 'lambda', 'terraform'].includes(t))) {
    return 'ai';
  }
  return 'web';
}
