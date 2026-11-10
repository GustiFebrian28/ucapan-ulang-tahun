export type UcapanCard = {
  id: number;
  teks: string;
  foto?: string;
  jenis: "biasa" | "peluk";
};

export const ucapanCards: UcapanCard[] = [
  {
    id: 1,
    teks: "Ebokkkkk, Selamat bertambah usiaa😇",
    foto: "1.jpg",
    jenis: "biasa",
  },
  {
    id: 2,
    teks: "Terima kasih atas pelukan hangat, masakan terenak, nasihat bijak dan segala pengorbanan serta kasih sayang yang takkan pernah terbalas oleh apapun🫶",
    foto: "2.jpg",
    jenis: "peluk",
  },
  {
    id: 3,
    teks: "Wajah senyuman tulus ebok adalah rumah paling nyaman buat adekk,",
    foto: "3.jpg",
    jenis: "biasa",
  },
  {
    id: 4,
    teks: "doa adekk selalu menyertai setiap langkahh ebokk agar senantiasa diberikan kesehatan, ketenangan hati, kebahagiaan dan selalu berada dalam lindungan-Nyaa,",
    foto: "4.jpg",
    jenis: "biasa",
  },
  {
    id: 5,
    teks: "Panjang umurr ebokk cantikkk, berkah barokahhh🫶😇🥰✨️",
    foto: "5.jpg",
    jenis: "biasa",
  },
  {
    id: 6,
    teks: "Aamiinn ya Allah💫",
    foto: "6.jpg",
    jenis: "biasa",
  },
];
