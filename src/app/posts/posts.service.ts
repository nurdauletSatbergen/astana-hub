import { Injectable, signal } from '@angular/core';
import { CreatePostCredentials, Post } from './post.model';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts = signal<Post[]>([]);

  add$ = new Subject<CreatePostCredentials>();
  remove$ = new Subject<string>();
  like$ = new Subject<string>();

  constructor() {
    this.add$
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.posts.update(posts => [...posts, this.creatPost(value)]);
      });

    this.remove$
      .pipe(takeUntilDestroyed())
      .subscribe(id => {
        this.posts.update(posts => posts.filter(post => post.id!==id));
      })

    this.like$
      .pipe(takeUntilDestroyed())
      .subscribe(id => {
        this.posts.update(posts =>
          posts.map(post =>
              post.id === id
                ? { ...post, likes_count: post.likes_count + 1 }
                : post
            )
        );
      })
  }

  private creatPost({ title, description, author_name }: CreatePostCredentials): Post {
    return {
      id: Date.now().toString(),
      title,
      description,
      likes_count: 0,
      created_at: new Date().toISOString(),
      author_name,
    }
  }
}
