import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClaimWordResponse, Word } from '../../models/game.models';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../shared/toast/toast.service';

interface DetailBlock {
  title: string;
  detail: string;
  word: string;
}

@Component({
  selector: 'app-product-details-page',
  standalone: false,
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css',
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  readonly detailBlocks: DetailBlock[] = [
    {
      title: 'Collection Workflows',
      detail: 'Create payment links by campaign, by team, or by customer segment with clean tracking and reconciliation.',
      word: '#workflows',
    },
    {
      title: 'Invoice Automation',
      detail: 'Set reminders and due dates, then monitor paid, pending, and overdue invoices from one dashboard.',
      word: '@automation',
    },
    {
      title: 'Escrow Control',
      detail: 'Define release conditions with clear transaction visibility for both parties.',
      word: '$controls',
    },
    {
      title: 'Business Visibility',
      detail: 'Track transaction activity and financial movement with real-time analytics and exportable reports.',
      word: '%reports',
    },
    {
      title: 'Settlement Operations',
      detail: 'Manage local and international transfer timing with structured payout views.',
      word: '!settlementops',
    },
    {
      title: 'Team Access',
      detail: 'Assign roles across finance and operations so every team member sees the right controls.',
      word: '@roles',
    },
  ];

  readonly hiddenWords: Word[] = [
    { wordId: 'pd1', label: '#workflows' },
    { wordId: 'pd2', label: '@automation' },
    { wordId: 'pd3', label: '$controls' },
    { wordId: 'pd4', label: '%reports' },
    { wordId: 'pd5', label: '!settlementops' },
    { wordId: 'pd6', label: '@roles' },
    { wordId: 'pd7', label: '#collectionsplus' },
    { wordId: 'pd8', label: '@invoiceops' },
    { wordId: 'pd9', label: '$escrowflow' },
    { wordId: 'pd10', label: '%opsdesk' },
    { wordId: 'pd11', label: '!timelines' },
    { wordId: 'pd12', label: '#accounting' },
    { wordId: 'pd13', label: '@alerts' },
    { wordId: 'pd14', label: '$complianceops' },
    { wordId: 'pd15', label: '%bankrails' },
    { wordId: 'pd16', label: '!collectionops' },
    { wordId: 'pd17', label: '#coverage' },
    { wordId: 'pd18', label: '@growthops' },
    { wordId: 'pd19', label: '$exports' },
    { wordId: 'pd20', label: '%securityops' },
    { wordId: 'pd21', label: '!riskchecks' },
    { wordId: 'pd22', label: '#policy' },
    { wordId: 'pd23', label: '@mobileops' },
    { wordId: 'pd24', label: '$retention' },
    { wordId: 'pd25', label: '%insightloop' },
    { wordId: 'pd26', label: '!handoffmap' },
    { wordId: 'pd27', label: '@opsrouting' },
    { wordId: 'pd28', label: '#cashtrail' },
    { wordId: 'pd29', label: '$riskbuffer' },
    { wordId: 'pd30', label: '%followthrough' },
    { wordId: 'pd31', label: '!priorities' },
    { wordId: 'pd32', label: '@execview' },
    { wordId: 'pd33', label: '#queuehealth' },
    { wordId: 'pd34', label: '$opscadence' },
    { wordId: 'pd35', label: '%reportline' },
    { wordId: 'pd36', label: '!checkpoint' },
  ];

  selectedWord: Word | null = null;
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

  handleWordClick(wordLabel: string): void {
    if (!this.canClaimWords) {
      return;
    }

    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word || this.foundWords.has(word.label)) {
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

  isFound(word: string): boolean {
    return this.foundWords.has(word);
  }
}
