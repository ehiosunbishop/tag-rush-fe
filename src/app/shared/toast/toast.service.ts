import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToastItem, ToastType } from './toast.models';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSubject = new BehaviorSubject<ToastItem[]>([]);
  private nextId = 1;

  readonly toasts$ = this.toastsSubject.asObservable();

  success(message: string): void {
    this.show('success', message);
  }

  error(message: string): void {
    this.show('error', message);
  }

  info(message: string): void {
    this.show('info', message);
  }

  dismiss(id: number): void {
    const next = this.toastsSubject.value.filter((toast) => toast.id !== id);
    this.toastsSubject.next(next);
  }

  private show(type: ToastType, message: string): void {
    const toast: ToastItem = {
      id: this.nextId++,
      type,
      message,
    };

    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    setTimeout(() => this.dismiss(toast.id), 2800);
  }
}
