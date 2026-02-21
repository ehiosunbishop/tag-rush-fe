import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClaimWordResponse, Word } from '../../models/game.models';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../shared/toast/toast.service';

interface FeatureCard {
  title: string;
  detail: string;
  word: string;
}

interface IntegrationCard {
  title: string;
  detail: string;
  word: string;
}

interface SupportItem {
  question: string;
  answer: string;
  word: string;
}

type InsightIcon = 'flows' | 'ops' | 'shield';

interface InsightPopup {
  id: string;
  icon: InsightIcon;
  title: string;
  detail: string;
  points: Array<{ label: string; word: string }>;
}

@Component({
  selector: 'app-game-page',
  standalone: false,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit, OnDestroy {
  readonly featureCards: FeatureCard[] = [
    {
      title: 'Payment Links',
      detail: 'Create and share payment links instantly. Get paid from anyone, anywhere.',
      word: '#paylinks',
    },
    {
      title: 'Smart Invoicing',
      detail: 'Professional invoices with automated reminders and payment tracking.',
      word: '@invoicing',
    },
    {
      title: 'Real-Time Analytics',
      detail: 'Monitor financial flow with clear, actionable dashboards.',
      word: '#analytics',
    },
    {
      title: 'Scheduled Payments',
      detail: 'Automate recurring payments and collections with flexible timing.',
      word: '!scheduled',
    },
    {
      title: 'Escrow Services',
      detail: 'Secure transactions with escrow protection for peace of mind.',
      word: '$escrow',
    },
    {
      title: 'Group Contributions',
      detail: 'Manage savings groups and team contributions with Olidara tools.',
      word: '%olidara',
    },
  ];

  readonly integrationCards: IntegrationCard[] = [
    {
      title: 'Payment Links',
      detail: 'Fast link-based collections for online and offline business payments.',
      word: '#collections',
    },
    {
      title: 'Olidara',
      detail: 'Group contribution management for cooperative and team finance flows.',
      word: '@olidara',
    },
    {
      title: 'Escrow Services',
      detail: 'Protected transaction rails for high-trust payment execution.',
      word: '$protection',
    },
  ];

  readonly supportItems: SupportItem[] = [
    {
      question: 'How do I create a Payinto account?',
      answer:
        "Visit business.payinto.co and click 'Get Started'. Provide your business information, verify email, and complete KYC.",
      word: '!kyc',
    },
    {
      question: 'What payment methods do you support?',
      answer: 'Bank transfers, card payments (Visa, Mastercard, Verve), USSD, and mobile money are supported.',
      word: '$methods',
    },
    {
      question: 'How long do transfers take?',
      answer: 'Transfers to Nigerian banks are typically instant. International transfers can take 1 to 3 business days.',
      word: '#transfers',
    },
    {
      question: 'Are there transaction limits?',
      answer: 'Limits vary by account tier and verification level for security and compliance.',
      word: '%limits',
    },
    {
      question: 'What are your transaction fees?',
      answer: 'Fees are transparent with different rates across local transfer and card rails.',
      word: '$fees',
    },
    {
      question: 'Is there a monthly fee?',
      answer: 'No monthly fee. You only pay when you transact.',
      word: '!nomonthly',
    },
  ];

  readonly insightPopups: InsightPopup[] = [
    {
      id: 'payment-flows',
      icon: 'flows',
      title: 'Payment Flow Insights',
      detail: 'Track the full payment lifecycle from link generation through settlement and receipts.',
      points: [
        { label: 'Orchestrate payment routing', word: '#orchestration' },
        { label: 'Automate invoice reminders', word: '@reminders' },
        { label: 'Speed up collection windows', word: '!collectionops' },
      ],
    },
    {
      id: 'ops-desk',
      icon: 'ops',
      title: 'Operations Desk',
      detail: 'Finance teams can monitor status changes and resolve exceptions from one workspace.',
      points: [
        { label: 'Export operational reports', word: '$exports' },
        { label: 'Improve dashboard visibility', word: '%visibility' },
        { label: 'Coordinate with team roles', word: '@roles' },
      ],
    },
    {
      id: 'risk-compliance',
      icon: 'shield',
      title: 'Risk and Compliance',
      detail: 'Apply policy checks and compliance controls without slowing core transaction speed.',
      points: [
        { label: 'Run risk checks', word: '!riskchecks' },
        { label: 'Maintain policy coverage', word: '#policy' },
        { label: 'Keep secure release controls', word: '$controls' },
      ],
    },
  ];

  readonly hiddenWords: Word[] = [
    { wordId: 'w1', label: '#payinto' },
    { wordId: 'w2', label: '@business' },
    { wordId: 'w3', label: '#payments' },
    { wordId: 'w4', label: '@invoicing' },
    { wordId: 'w5', label: '#analytics' },
    { wordId: 'w6', label: '$escrow' },
    { wordId: 'w7', label: '%olidara' },
    { wordId: 'w8', label: '!kyc' },
    { wordId: 'w9', label: '@verification' },
    { wordId: 'w10', label: '#transfers' },
    { wordId: 'w11', label: '$fees' },
    { wordId: 'w12', label: '%limits' },
    { wordId: 'w13', label: '!support' },
    { wordId: 'w14', label: '@dashboard' },
    { wordId: 'w15', label: '#compliance' },
    { wordId: 'w16', label: '%ndic' },
    { wordId: 'w17', label: '!cbn' },
    { wordId: 'w18', label: '@methods' },
    { wordId: 'w19', label: '#paylinks' },
    { wordId: 'w20', label: '!scheduled' },
    { wordId: 'w21', label: '#realtime' },
    { wordId: 'w22', label: '@invoiceflow' },
    { wordId: 'w23', label: '$pricing' },
    { wordId: 'w24', label: '%discounts' },
    { wordId: 'w25', label: '!receipts' },
    { wordId: 'w26', label: '@statements' },
    { wordId: 'w27', label: '#launch' },
    { wordId: 'w28', label: '@growth' },
    { wordId: 'w29', label: '#collections' },
    { wordId: 'w30', label: '@olidara' },
    { wordId: 'w31', label: '$protection' },
    { wordId: 'w32', label: '!nomonthly' },
    { wordId: 'w33', label: '@invoices' },
    { wordId: 'w34', label: '#onboarding' },
    { wordId: 'w35', label: '$methods' },
    { wordId: 'w36', label: '%tiering' },
    { wordId: 'w37', label: '!instant' },
    { wordId: 'w38', label: '@secure' },
    { wordId: 'w39', label: '#settlement' },
    { wordId: 'w40', label: '$workflow' },
    { wordId: 'w41', label: '%visibility' },
    { wordId: 'w42', label: '!signals' },
    { wordId: 'w43', label: '@finance' },
    { wordId: 'w44', label: '#cards' },
    { wordId: 'w45', label: '$ussd' },
    { wordId: 'w46', label: '%mobilemoney' },
    { wordId: 'w47', label: '!trust' },
    { wordId: 'w48', label: '@retenvo' },
    { wordId: 'w49', label: '#orchestration' },
    { wordId: 'w50', label: '@reminders' },
    { wordId: 'w51', label: '!collectionops' },
    { wordId: 'w52', label: '$exports' },
    { wordId: 'w53', label: '@roles' },
    { wordId: 'w54', label: '!riskchecks' },
    { wordId: 'w55', label: '#policy' },
    { wordId: 'w56', label: '$controls' },
    { wordId: 'w57', label: '%reports' },
    { wordId: 'w58', label: '#workflows' },
    { wordId: 'w59', label: '@automation' },
    { wordId: 'w60', label: '!download' },
    { wordId: 'w61', label: '#settlefast' },
    { wordId: 'w62', label: '@riskdesk' },
    { wordId: 'w63', label: '$ledgerflow' },
    { wordId: 'w64', label: '%monitoring' },
    { wordId: 'w65', label: '!handoffs' },
    { wordId: 'w66', label: '@exceptions' },
    { wordId: 'w67', label: '#throughput' },
    { wordId: 'w68', label: '$audittrail' },
    { wordId: 'w69', label: '%healthscore' },
    { wordId: 'w70', label: '!approvals' },
    { wordId: 'w71', label: '@opsintel' },
    { wordId: 'w72', label: '#collector' },
    { wordId: 'w73', label: '$chargeflow' },
    { wordId: 'w74', label: '%cashview' },
    { wordId: 'w75', label: '!fallback' },
    { wordId: 'w76', label: '@recovery' },
    { wordId: 'w77', label: '#sla' },
    { wordId: 'w78', label: '$safehold' },
    { wordId: 'w79', label: '%proof' },
    { wordId: 'w80', label: '!matchings' },
    { wordId: 'w81', label: '@autopayout' },
    { wordId: 'w82', label: '#retrylogic' },
    { wordId: 'w83', label: '$netting' },
    { wordId: 'w84', label: '%stability' },
    { wordId: 'w85', label: '!guardrails' },
    { wordId: 'w86', label: '@queueing' },
    { wordId: 'w87', label: '#signalmesh' },
    { wordId: 'w88', label: '$variance' },
    { wordId: 'w89', label: '%benchmark' },
    { wordId: 'w90', label: '!finops' },
    { wordId: 'w91', label: '@playbooks' },
    { wordId: 'w92', label: '#speakergrid' },
    { wordId: 'w93', label: '@thoughtleadership' },
    { wordId: 'w94', label: '$brandstory' },
    { wordId: 'w95', label: '%growthforum' },
    { wordId: 'w96', label: ':logoecho' },
    { wordId: 'w97', label: ':shadowrail' },
    { wordId: 'w98', label: ':deeptrace' },
    { wordId: 'w99', label: ':lowpulse' },
    { wordId: 'w100', label: ':silentnode' },
  ];

  readonly bonusIcons = [
    { id: 'trace', symbol: '[*]', label: 'Trace' },
    { id: 'ping', symbol: '[+]', label: 'Ping' },
    { id: 'node', symbol: '[#]', label: 'Node' },
  ];
  readonly bonusTitles = ['Hidden Cache', 'Signal Drop', 'Side Quest', 'Pattern Alert'];

  selectedWord: Word | null = null;
  foundWords = new Set<string>();
  canClaimWords = false;
  showBonusModal = false;
  bonusWord: Word | null = null;
  bonusTitle = 'Hidden Cache';
  revealedBonusWord: string | null = null;

  activeInsight: InsightPopup | null = null;

  private authSubscription?: Subscription;
  private bonusTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.currentPlayer$.subscribe((player) => {
      const nextCanClaim = !!player?.token;
      if (nextCanClaim === this.canClaimWords) {
        return;
      }

      this.canClaimWords = nextCanClaim;
      if (this.canClaimWords) {
        this.scheduleNextBonusPopup();
        return;
      }

      this.clearClaimingState();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    if (this.bonusTimeout) {
      clearTimeout(this.bonusTimeout);
    }
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

    this.openClaimModal(wordLabel);
  }

  openClaimModal(wordLabel: string): void {
    if (!this.canClaimWords) {
      return;
    }

    const word = this.hiddenWords.find((item) => item.label === wordLabel);
    if (!word || this.foundWords.has(word.label)) {
      return;
    }

    this.showBonusModal = false;
    this.revealedBonusWord = null;
    this.selectedWord = word;
  }

  openInsight(insight: InsightPopup): void {
    this.activeInsight = insight;
  }

  closeInsight(): void {
    this.activeInsight = null;
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
    if (!this.canClaimWords || !this.revealedBonusWord) {
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
    if (!this.canClaimWords) {
      return;
    }

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

  private clearClaimingState(): void {
    if (this.bonusTimeout) {
      clearTimeout(this.bonusTimeout);
    }

    this.selectedWord = null;
    this.showBonusModal = false;
    this.bonusWord = null;
    this.revealedBonusWord = null;
    this.activeInsight = null;
  }
}
