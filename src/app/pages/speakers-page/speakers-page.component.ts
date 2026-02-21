import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClaimWordResponse, Word } from '../../models/game.models';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../shared/toast/toast.service';

interface SpeakerShowcase {
  id: string;
  title: string;
  image: string;
  summary: string;
  word: string;
  isInteractive: boolean;
  notes?: Array<{ label: string; word: string }>;
}

@Component({
  selector: 'app-speakers-page',
  standalone: false,
  templateUrl: './speakers-page.component.html',
  styleUrl: './speakers-page.component.css',
})
export class SpeakersPageComponent implements OnInit, OnDestroy {
  readonly speakerShowcases: SpeakerShowcase[] = [
    {
      id: 'gift-bishop',
      title: 'Gift Ojeanelo and Bishop Ehiosun',
      image: '/speakers_gift_and_bishop.jpeg',
      summary: 'Creating systems that empower people and drive measurable outcomes.',
      word: '#speakercraft',
      isInteractive: true,
      notes: [
        { label: 'Execution systems for teams', word: '@executionmaps' },
        { label: 'People-centered operations', word: '!peoplefirstops' },
        { label: 'Growth-ready structures', word: '$growthsystems' },
      ],
    },
    {
      id: 'john-zamai',
      title: 'John Iyoha and Zamai Banje',
      image: '/speakers_john_and_zamai.jpeg',
      summary: 'Structured business legitimacy and practical finance management.',
      word: '%financeforum',
      isInteractive: false,
    },
    {
      id: 'mcomoba-sally',
      title: 'MC Omoba and Sally Suleiman',
      image: '/speakers_mcomoba_and_sally.jpeg',
      summary: 'Sustainable growth through innovation and market communication.',
      word: '@innovationdialogue',
      isInteractive: true,
      notes: [
        { label: 'Narratives that scale trust', word: '#trustnarratives' },
        { label: 'Community and market fit', word: '%communityfit' },
        { label: 'Host-driven momentum', word: '!hostenergy' },
      ],
    },
    {
      id: 'zaviano-micheal',
      title: 'Victor Zaviano and Micheal Imatitikua',
      image: '/speakers_zaviano_and_micheal.jpeg',
      summary: 'Business visibility, branding, and stronger customer relationships.',
      word: '$brandvisibility',
      isInteractive: false,
    },
  ];

  readonly hiddenWords: Word[] = [
    { wordId: 'sp1', label: '#speakercraft' },
    { wordId: 'sp2', label: '@executionmaps' },
    { wordId: 'sp3', label: '!peoplefirstops' },
    { wordId: 'sp4', label: '$growthsystems' },
    { wordId: 'sp5', label: '%financeforum' },
    { wordId: 'sp6', label: '@innovationdialogue' },
    { wordId: 'sp7', label: '#trustnarratives' },
    { wordId: 'sp8', label: '%communityfit' },
    { wordId: 'sp9', label: '!hostenergy' },
    { wordId: 'sp10', label: '$brandvisibility' },
    { wordId: 'sp11', label: '@speakerlane' },
    { wordId: 'sp12', label: '#stageinsights' },
  ];

  selectedWord: Word | null = null;
  activeShowcase: SpeakerShowcase | null = null;
  foundWords = new Set<string>();
  canClaimWords = false;

  private authSubscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentPlayer$.subscribe((player) => {
      this.canClaimWords = !!player?.token;
      if (!this.canClaimWords) {
        this.selectedWord = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  displayWord(wordLabel: string): string {
    if (this.canClaimWords || wordLabel.length < 2) {
      return wordLabel;
    }

    return wordLabel.slice(1);
  }

  openShowcase(showcase: SpeakerShowcase): void {
    if (!showcase.isInteractive) {
      return;
    }

    this.activeShowcase = showcase;
  }

  closeShowcase(): void {
    this.activeShowcase = null;
  }

  handleWordClick(wordLabel: string): void {
    if (!this.canClaimWords) {
      return;
    }

    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word) {
      return;
    }

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

}
