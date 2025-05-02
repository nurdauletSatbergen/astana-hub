import { computed, Injectable, signal } from '@angular/core';
import { CreatePostCredentials, Post } from './post.model';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly _posts = signal<Post[]>([]);
  posts = computed(() => this._posts());

  readonly add$ = new Subject<CreatePostCredentials>();
  readonly remove$ = new Subject<string>();
  readonly like$ = new Subject<string>();

  constructor() {
    this.add$
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this._posts.update(posts => [...posts, this.creatPost(value)]);
      });

    this.remove$
      .pipe(takeUntilDestroyed())
      .subscribe(id => {
        this._posts.update(posts => posts.filter(post => post.id!==id));
      })

    this.like$
      .pipe(takeUntilDestroyed())
      .subscribe(id => {
        this._posts.update(posts =>
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
