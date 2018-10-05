import * as D from '../src/dealer';

const { Dealer, Suit, CardNumber } = D as any;

if (Dealer) {
  test('Dealer is available as a named export from ./src/dealer.ts', () => {
    expect(Dealer).toBeDefined();
  });

  test('CardNumber is available as a named export from ./src/dealer.ts', () => {
    expect(CardNumber).toBeDefined();
  });

  test('Suit is available as a named export from ./src/dealer.ts', () => {
    expect(Suit).toBeDefined();
  });

  test('13 members in the CardNumber enum', () => {
    expect(Object.keys(CardNumber).length / 2).toBe(13);
  });

  test('4 members in the Suit enum', () => {
    expect(Object.keys(Suit).length / 2).toBe(4);
  });

  test('dealer.readCard([0, 6]) -> "Seven of Clubs" ', () => {
    let dealer = new Dealer();
    expect(dealer.readCard([0, 6])).toBe('Seven of Clubs');
  });

  test('A new dealer has 52 cards - via dealer.getLength() ', () => {
    let dealer = new Dealer();
    expect(dealer.getLength()).toBe(52);
  });

  test('dealer.dealHand(numCards) returns a hand of cards (array of size-2 tuples)', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(1);
    expect(typeof cards).toBe('object');
    expect(typeof cards.map).toBe('function');
    expect(typeof cards[0]).toBe('object');
    expect(typeof cards[0].map).toBe('function');
    expect(cards[0].length).toBe(2);
  });

  test('dealer.dealHand(numCards) returns the correct number of cards', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(5);
    expect(cards.length).toBe(5);
  });

  test('dealer.dealHand(numCards) throws an error if you ask for too many cards', () => {
    let dealer = new Dealer();
    expect(() => {
      dealer.dealHand(10);
      dealer.dealHand(10);
      dealer.dealHand(10);
      dealer.dealHand(10);
      dealer.dealHand(10);
      dealer.dealHand(10);
    }).toThrow();
  });

  test('dealer.dealHand(numCards) throws an error if you ask for a negative number of cards', () => {
    let dealer = new Dealer();
    expect(() => {
      dealer.dealHand(-1);
    }).toThrow();
  });

  test('deck contains 13 cards per suit, and 4 per number', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(52);
    let numberCounts = new Array(13).fill(0, 0);
    let suitCounts = new Array(4).fill(0, 0);
    cards.forEach(([suit, number]) => {
      numberCounts[number]++;
      suitCounts[suit]++;
    });

    numberCounts.forEach((count, num) => {
      expect(`${count} cards in the deck for number ${CardNumber[num]}`).toBe(
        `4 cards in the deck for number ${CardNumber[num]}`
      );
    });
    suitCounts.forEach((count, suit) => {
      expect(
        `${suitCounts[suit]} cards in the deck for suit ${Suit[suit]}`
      ).toBe(`13 cards in the deck for suit ${Suit[suit]}`);
    });
  });

  test('Cards are represented as [Suit(0-3), CardNumber(0-12)]', () => {
    let dealer = new Dealer();
    let cards = dealer.dealHand(52);
    cards.forEach(([suit, num]) => {
      expect(suit).toBeLessThan(4);
      expect(suit).toBeGreaterThan(-1);
      expect(num).toBeLessThan(13);
      expect(num).toBeGreaterThan(-1);
    });
  });
} else {
  describe('Instructions', () => {
    test('Please uncomment the Dealer class in dealer/src/dealer.ts', () => {
      expect(true).toBeTruthy();
    });
  });
}
