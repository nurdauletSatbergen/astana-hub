import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatePostCredentials } from '../post.model';

@Component({
  selector: 'app-post-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFormComponent {
  private readonly fb = inject(FormBuilder);
  onAdd = output<CreatePostCredentials>();

  form = this.fb.nonNullable.group({
    title: ['London is the capitol of GB', [Validators.required, Validators.minLength(5)]],
    description: ['Placeholder text for post description', Validators.required],
    author_name: ['Harry Potter', Validators.required]
  })

  onSubmit(): void {
    if (this.form.invalid) return;
    this.onAdd.emit(this.form.getRawValue());
  }
}
