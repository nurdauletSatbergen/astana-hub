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
  host: {
    class: 'bg-white rounded-sm border border-gray-300 p-4 flex flex-col gap-3'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  post = input.required<Post>();
  onRemove = output<string>();
  onLike = output<string>();
}
