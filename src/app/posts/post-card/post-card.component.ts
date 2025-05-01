import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Post } from '../post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [
    DatePipe
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  post = input.required<Post>();
  onRemove = output<string>();
  onLike = output<string>();
}
