import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import { CreatePostCredentials } from './post.model';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsService } from './posts.service';
import { PostCardComponent } from './post-card/post-card.component';
import { FilterByNamePipe } from '../shared/pipes/filter-by-name.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [
    PostFormComponent,
    PostCardComponent,
    FilterByNamePipe,
    FormsModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
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
