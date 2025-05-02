import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { CreatePostCredentials } from './post.model';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsService } from './posts.service';
import { PostCardComponent } from './post-card/post-card.component';
import { FilterByTitlePipe } from '../shared/pipes/filter-by-title.pipe';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-posts',
  imports: [
    PostFormComponent,
    PostCardComponent,
    FilterByTitlePipe,
    FormsModule
  ],
  templateUrl: './posts.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)'  }),
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-10%)'  }))
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  private postsService = inject(PostsService);
  posts = this.postsService.posts;
  searchText = model('');

  addPost(credentials: CreatePostCredentials): void {
      this.postsService.add$.next(credentials);
  }

  like(id: string): void {
    this.postsService.like$.next(id);
  }

  remove(id: string) {
    this.postsService.remove$.next(id);
  }
}
