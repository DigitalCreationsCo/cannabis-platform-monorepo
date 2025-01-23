
type ArticleTag = any;
type ArticleWithDetails = any;

interface BlogStateProps {
	articles: Record<ArticleTag, ArticleWithDetails[]>;
	dispensaryGuides: ArticleWithDetails[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	errorMessage: string;
}

export type { BlogStateProps }