export interface Post {
  id: string;
  title: string;
  description: string;
  likes_count: number;
  created_at: string;
  author_name: string;
}

export type CreatePostCredentials = Pick<Post, "title" | "description" | "author_name">;
