import { Component } from '@angular/core';

import { ToastService } from './toast.service';
import { ToastType } from './toast.models';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(public readonly toastService: ToastService) {}

  classes(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'border-emerald-300/60 bg-emerald-500/20 text-emerald-100';
      case 'error':
        return 'border-rose-300/60 bg-rose-500/20 text-rose-100';
      default:
        return 'border-sky-300/60 bg-sky-500/20 text-sky-100';
    }
  }
}
