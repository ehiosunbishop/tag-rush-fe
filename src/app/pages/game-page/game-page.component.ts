import { Component, OnDestroy, OnInit } from '@angular/core';
import { Speaker, eventSpeakers } from '../../data/speakers.data';
import { Word } from '../../models/game.models';

interface AgendaItem {
  time: string;
  title: string;
  detail: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface BonusIcon {
  id: string;
  symbol: string;
  label: string;
}

@Component({
  selector: 'app-game-page',
  standalone: false,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit, OnDestroy {
  readonly speakers: Speaker[] = eventSpeakers;

  readonly appHighlights = [
    'Unified dashboard for incoming payments, settlement status, and activity history.',
    'Fast merchant onboarding with straightforward verification and compliance flow.',
    'Operational visibility for teams handling payment reconciliation daily.',
    'Built for businesses that need speed without sacrificing payment confidence.',
  ];

  readonly eventAgenda: AgendaItem[] = [
    {
      time: '10:00 AM',
      title: 'Opening Note: Why Payinto, Why Now',
      detail: 'Launch framing, product direction, and the payment pain points this platform addresses.',
    },
    {
      time: '10:30 AM',
      title: 'Product Walkthrough',
      detail: 'Live demo of account setup, payment flow, dashboard controls, and reporting insights.',
    },
    {
      time: '11:15 AM',
      title: 'Panel: Scaling Payment Operations',
      detail: 'Leaders discuss reliability, support workflows, and team operations after go-live.',
    },
    {
      time: '12:00 PM',
      title: 'Speaker Sessions',
      detail: 'Deep dives into strategy, infrastructure, and market readiness for modern payment teams.',
    },
    {
      time: '1:00 PM',
      title: 'Q&A + Networking',
      detail: 'Direct questions with speakers and practical implementation conversations.',
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'Who should attend?',
      answer: 'Founders, product teams, operations leads, and finance teams exploring better payment workflows.',
    },
    {
      question: 'Is this event technical or business-focused?',
      answer: 'Both. Sessions cover product strategy, platform architecture, and real operating practices.',
    },
    {
      question: 'Can I access materials after the event?',
      answer: 'Yes. Session summaries and selected resources will be shared with registered attendees.',
    },
    {
      question: 'How do I learn more before launch day?',
      answer: 'Visit payinto.co and review product information before attending the live sessions.',
    },
  ];

  readonly hiddenWords: Word[] = [
    { wordId: 'w1', label: '#launch' },
    { wordId: 'w2', label: '@payinto' },
    { wordId: 'w3', label: '#agenda' },
    { wordId: 'w4', label: '@speaker' },
    { wordId: 'w5', label: '#network' },
    { wordId: 'w6', label: '@eventday' },
    { wordId: 'w7', label: '#questions' },
    { wordId: 'w8', label: '@checkout' },
    { wordId: 'w9', label: '#fintech' },
    { wordId: 'w10', label: '@payments' },
    { wordId: 'w11', label: '#merchant' },
    { wordId: 'w12', label: '@settlement' },
    { wordId: 'w13', label: '#reconcile' },
    { wordId: 'w14', label: '@velocity' },
    { wordId: 'w15', label: '#dashboard' },
    { wordId: 'w16', label: '@insights' },
    { wordId: 'w17', label: '#compliance' },
    { wordId: 'w18', label: '@onboarding' },
    { wordId: 'w19', label: '$boost' },
    { wordId: 'w20', label: '$margin' },
    { wordId: 'w21', label: '.pulse' },
    { wordId: 'w22', label: '.latency' },
    { wordId: 'w23', label: ',delta' },
    { wordId: 'w24', label: ',quiet' },
    { wordId: 'w25', label: ':ledger' },
    { wordId: 'w26', label: ':vault' },
    { wordId: 'w27', label: ':route' },
    { wordId: 'w28', label: ':signal' },
  ];

  readonly bonusIcons: BonusIcon[] = [
    { id: 'trace', symbol: '[*]', label: 'Trace' },
    { id: 'ping', symbol: '[+]', label: 'Ping' },
    { id: 'node', symbol: '[#]', label: 'Node' },
  ];
  readonly bonusTitles = ['Hidden Cache', 'Signal Drop', 'Side Quest', 'Pattern Alert'];

  selectedWord: Word | null = null;
  foundWords = new Set<string>();
  toastMessage = '';
  showBonusModal = false;
  bonusWord: Word | null = null;
  bonusTitle = 'Hidden Cache';
  revealedBonusWord: string | null = null;

  private bonusTimeout?: ReturnType<typeof setTimeout>;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.scheduleNextBonusPopup();
  }

  ngOnDestroy(): void {
    if (this.bonusTimeout) {
      clearTimeout(this.bonusTimeout);
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  openClaimModal(wordLabel: string): void {
    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word || this.foundWords.has(word.label)) {
      return;
    }

    this.showBonusModal = false;
    this.revealedBonusWord = null;
    this.selectedWord = word;
  }

  closeClaimModal(): void {
    this.selectedWord = null;
  }

  handleClaimed(message: string): void {
    if (this.selectedWord) {
      this.foundWords.add(this.selectedWord.label);
    }

    this.selectedWord = null;
    this.toastMessage = `${message} (${this.foundWords.size}/${this.hiddenWords.length})`;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 1800);

    this.scheduleNextBonusPopup();
  }

  isFound(word: string): boolean {
    return this.foundWords.has(word);
  }

  revealBonusWord(): void {
    if (!this.bonusWord || this.foundWords.has(this.bonusWord.label)) {
      return;
    }
    this.revealedBonusWord = this.bonusWord.label;
  }

  claimBonusWord(): void {
    if (!this.revealedBonusWord) {
      return;
    }
    this.openClaimModal(this.revealedBonusWord);
  }

  closeBonusModal(): void {
    this.showBonusModal = false;
    this.revealedBonusWord = null;
    this.scheduleNextBonusPopup();
  }

  private scheduleNextBonusPopup(): void {
    if (this.bonusTimeout) {
      clearTimeout(this.bonusTimeout);
    }

    const remainingWords = this.hiddenWords.filter((word) => !this.foundWords.has(word.label));
    if (!remainingWords.length) {
      return;
    }

    const delayMs = 18000 + Math.floor(Math.random() * 18000);
    this.bonusTimeout = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      this.bonusWord = remainingWords[randomIndex];
      this.bonusTitle = this.bonusTitles[Math.floor(Math.random() * this.bonusTitles.length)];
      this.revealedBonusWord = null;
      this.showBonusModal = true;
    }, delayMs);
  }
}
