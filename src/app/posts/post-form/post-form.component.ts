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
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', Validators.required],
    author_name: ['', Validators.required]
  })

  onSubmit(): void {
    if (this.form.invalid) return;
    this.onAdd.emit(this.form.getRawValue());
  }
}
