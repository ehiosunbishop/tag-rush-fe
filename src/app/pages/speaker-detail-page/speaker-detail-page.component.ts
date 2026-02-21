import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Speaker, eventSpeakers } from '../../data/speakers.data';
import { ClaimWordResponse, Word } from '../../models/game.models';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-speaker-detail-page',
  standalone: false,
  templateUrl: './speaker-detail-page.component.html',
  styleUrl: './speaker-detail-page.component.css',
})
export class SpeakerDetailPageComponent implements OnInit, OnDestroy {
  speaker: Speaker | undefined;
  selectedWord: Word | null = null;
  foundWords = new Set<string>();
  showHintModal = false;
  revealedHintWord: string | null = null;

  readonly hiddenWords: Word[] = [
    { wordId: 's1', label: '!brief' },
    { wordId: 's2', label: '$depth' },
    { wordId: 's3', label: '%focus' },
    { wordId: 's4', label: '!insight' },
    { wordId: 's5', label: '%speaker' },
  ];

  private hintTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const speakerId = this.route.snapshot.paramMap.get('id');
    this.speaker = eventSpeakers.find((item) => item.id === speakerId);
    this.scheduleHintModal();
  }

  ngOnDestroy(): void {
    if (this.hintTimeout) {
      clearTimeout(this.hintTimeout);
    }
  }

  openClaimModal(wordLabel: string): void {
    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word || this.foundWords.has(word.label)) {
      return;
    }
    this.showHintModal = false;
    this.revealedHintWord = null;
    this.selectedWord = word;
  }

  closeClaimModal(): void {
    this.selectedWord = null;
  }

  handleClaimed(response: ClaimWordResponse): void {
    if (this.selectedWord) {
      this.foundWords.add(this.selectedWord.label);
    }
    this.selectedWord = null;
    this.toastService.success(`${response.word} claimed (+${response.pointsAwarded}).`);
  }

  isFound(word: string): boolean {
    return this.foundWords.has(word);
  }

  revealHintWord(): void {
    const remainingWords = this.hiddenWords.filter((word) => !this.foundWords.has(word.label));
    if (!remainingWords.length) {
      return;
    }
    const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
    this.revealedHintWord = randomWord.label;
  }

  claimHintWord(): void {
    if (!this.revealedHintWord) {
      return;
    }
    this.openClaimModal(this.revealedHintWord);
  }

  closeHintModal(): void {
    this.showHintModal = false;
    this.revealedHintWord = null;
    this.scheduleHintModal();
  }

  private scheduleHintModal(): void {
    if (this.hintTimeout) {
      clearTimeout(this.hintTimeout);
    }

    const remainingWords = this.hiddenWords.filter((word) => !this.foundWords.has(word.label));
    if (!remainingWords.length) {
      return;
    }

    const delayMs = 12000 + Math.floor(Math.random() * 12000);
    this.hintTimeout = setTimeout(() => {
      this.showHintModal = true;
      this.revealedHintWord = null;
    }, delayMs);
  }
}
