export const tarotCards = Array.from({ length: 78 }, (_, i) => ({
  id: i + 1,
  name: `Card ${i + 1}`,
  image: `/images/cards/card${i + 1}.jpg`, // Bu görseller public klasöründe olacak
}));
