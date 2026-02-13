import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-word-token',
  standalone: false,
  templateUrl: './word-token.component.html',
  styleUrl: './word-token.component.css',
})
export class WordTokenComponent {
  @Input({ required: true }) wordId!: string;
  @Input({ required: true }) label!: string;
  @Output() tokenClick = new EventEmitter<{ wordId: string; label: string }>();

  onClick(): void {
    this.tokenClick.emit({ wordId: this.wordId, label: this.label });
  }
}
