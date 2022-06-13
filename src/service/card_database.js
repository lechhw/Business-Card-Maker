import { firebaseDatabase } from './firebase';

class CardDatabase {
  saveCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }

  syncCard(userId, onUpdate) {
    const ref = firebaseDatabase.ref(`${userId}/cards`);

    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
}

export default CardDatabase;
