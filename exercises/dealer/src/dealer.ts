function shuffleArray(a: any[]) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

export enum Suit {
  Clubs,
  Diamonds,
  Hearts,
  Spades
}

export enum CardNumber {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

type Card = [Suit, CardNumber];

const createDeck = (): Card[] => {
  let cards: Card[] = [];
  for (let suit = 0; suit < Object.keys(Suit).length; suit += 2) {
    for (let num = 0; num < Object.keys(CardNumber).length; num += 2) {
      cards.push([suit / 2, num / 2]);
    }
  }
  shuffleArray(cards);
  return cards;
};

export class Dealer {
  constructor() {
    this.cards = createDeck();
  }

  cards: Card[] = [];

  dealHand(numCards: number): Card[] {
    if (numCards > this.getLength()) throw new Error('Not enough cards left');
    if (numCards < 0) throw new Error('Please give me YOUR cards');
    return this.cards.splice(this.getLength() - numCards, numCards);
  }

  getLength(): number {
    return this.cards.length;
  }

  readCard(card: Card): string {
    let [suit, cardNumber] = card;
    return `${CardNumber[cardNumber]} of ${Suit[suit]}`;
  }
}
