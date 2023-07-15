import { Article, ImageArticle } from "@prisma/client";

export type ArticleWithDetails = Article & { image: ImageArticle }