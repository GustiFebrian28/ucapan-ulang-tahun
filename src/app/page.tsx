"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ucapanCards } from "@/data/ucapan";

type Screen = "opening" | "card" | "collage" | "final";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("opening");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [hugged, setHugged] = useState(false);
  const [musicReady, setMusicReady] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (screen !== "collage") return;

    const timer = window.setTimeout(() => setScreen("final"), 2200);
    return () => window.clearTimeout(timer);
  }, [screen]);

  const currentCard = ucapanCards[currentCardIndex];

  const handleContinue = () => {
    if (screen === "opening") {
      setScreen("card");
      setCurrentCardIndex(0);
      setHugged(false);
      return;
    }

    if (screen !== "card") {
      return;
    }

    if (currentCardIndex === ucapanCards.length - 1) {
      setScreen("collage");
      setHugged(false);
      return;
    }

    setCurrentCardIndex((prev) => prev + 1);
    setHugged(false);
  };

  const handleReset = () => {
    setScreen("opening");
    setCurrentCardIndex(0);
    setHugged(false);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-transparent px-3 py-6 text-[var(--ink)] sm:px-5">
      {musicReady && (
        <audio
          ref={audioRef}
          src="/musik.mp3"
          loop
          preload="auto"
          onLoadedData={() => setMusicReady(true)}
          onError={() => setMusicReady(false)}
        />
      )}

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/40 bg-[rgba(255,250,242,0.82)] p-3 shadow-[0_20px_50px_rgba(89,72,48,0.12)] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-8 top-12 text-3xl text-[#d7b08c] opacity-60">
            ✿
          </div>
          <div className="absolute right-8 top-24 text-2xl text-[#c8d3b1] opacity-60">
            ♡
          </div>
          <div className="absolute bottom-20 left-10 text-2xl text-[#d9c1a1] opacity-50">
            ❀
          </div>
        </div>

        <AnimatePresence mode="wait">
          {screen === "opening" && (
            <Pembuka
              key="opening"
              onContinue={handleContinue}
              musicReady={musicReady}
              isPlaying={isPlaying}
              onToggleMusic={toggleMusic}
            />
          )}

          {screen === "card" && (
            <KartuUcapan
              key={`card-${currentCard.id}`}
              card={currentCard}
              index={currentCardIndex}
              total={ucapanCards.length}
              onContinue={handleContinue}
              hugged={hugged}
              onHug={() => setHugged(true)}
            />
          )}

          {screen === "collage" && <KolasePenutup key="collage" />}

          {screen === "final" && (
            <LayarAkhir key="final" onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

type PembukaProps = {
  onContinue: () => void;
  musicReady: boolean;
  isPlaying: boolean;
  onToggleMusic: () => void;
};

function Pembuka({
  onContinue,
  musicReady,
  isPlaying,
  onToggleMusic,
}: PembukaProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="relative flex min-h-[76vh] flex-col items-center justify-center gap-8 rounded-[28px] bg-[rgba(255,250,242,0.6)] px-6 py-8 text-center"
    >
      <div className="absolute inset-x-0 top-6 flex justify-center gap-2 text-2xl opacity-70">
        <span>❀</span>
        <span>♡</span>
        <span>✿</span>
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-sm uppercase tracking-[0.28em] text-[#7c6d57]">
          Untuk Ebok
        </p>
        <h1 className="text-4xl leading-tight text-[#2d2926]">
          Ada kejutan kecil untuk Ebok
        </h1>
      </div>

      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-[#d7c2a0] bg-[radial-gradient(circle,_rgba(255,255,255,0.85),_rgba(224,206,172,0.7))] shadow-inner">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f8efe2] text-5xl text-[#d9987f]">
          ♡
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-full bg-[#8fa67d] px-5 py-4 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(143,166,125,0.35)] transition hover:brightness-105"
      >
        Buka
      </button>

      {musicReady && (
        <button
          type="button"
          onClick={onToggleMusic}
          className="rounded-full border border-[#b39d70] bg-[#f5ebd8] px-4 py-2 text-sm font-medium text-[#4d463f]"
        >
          {isPlaying ? "Jeda musik" : "Putar musik"}
        </button>
      )}
    </motion.section>
  );
}

type KartuUcapanProps = {
  card: (typeof ucapanCards)[number];
  index: number;
  total: number;
  onContinue: () => void;
  hugged: boolean;
  onHug: () => void;
};

function KartuUcapan({
  card,
  index,
  total,
  onContinue,
  hugged,
  onHug,
}: KartuUcapanProps) {
  const isPelukCard = card.jenis === "peluk";
  const showContinue = !isPelukCard || hugged;

  return (
    <motion.section
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -22 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-[76vh] flex-col gap-4 rounded-[28px] bg-[rgba(255,250,242,0.75)] p-4"
    >
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: total }).map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`h-2.5 w-2.5 rounded-full ${dotIndex === index ? "bg-[#7e6a4f]" : "bg-[#e5d7be]"}`}
          />
        ))}
      </div>

      <p className="text-center text-xs uppercase tracking-[0.22em] text-[#7a6857]">
        {index + 1} dari {total}
      </p>

      <div className="flex-1 rounded-[24px] bg-[#f9f2e9] p-3">
        <div className="flex flex-col gap-4">
          <Polaroid
            src={card.foto ? `/foto/${card.foto}` : undefined}
            alt={`Foto kenangan ${card.id}`}
            tilt={index % 2 === 0 ? -2 : 2}
          />

          <div className="rounded-[20px] bg-[#fffaf3] p-4">
            <p className="text-[1.12rem] leading-[1.9] text-[#2e2a28] whitespace-pre-line">
              {card.teks}
            </p>
          </div>
        </div>
      </div>

      {isPelukCard && !hugged && <KirimPelukan onHug={onHug} />}

      {showContinue && (
        <button
          type="button"
          onClick={onContinue}
          className="mt-auto w-full rounded-full bg-[#8fa67d] px-5 py-4 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(143,166,125,0.35)] transition hover:brightness-105"
        >
          {index === total - 1 ? "Aamiin" : "Lanjut"}
        </button>
      )}
    </motion.section>
  );
}

type PolaroidProps = {
  src?: string;
  alt: string;
  tilt: number;
};

function Polaroid({ src, alt, tilt }: PolaroidProps) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className="relative mx-auto w-full max-w-[260px] rounded-[18px] border border-[#e7dcc5] bg-[#fefcf8] p-2.5 shadow-[0_15px_28px_rgba(82,65,44,0.08)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {src && !missing ? (
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#f4ead7]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 260px"
            className="object-cover"
            onError={() => setMissing(true)}
          />
        </div>
      ) : (
        <div className="flex aspect-[4/5] items-center justify-center rounded-[14px] border border-dashed border-[#c7b38d] bg-[#f7efe6] text-center text-sm text-[#7d6857]">
          Foto belum tersedia
        </div>
      )}
    </div>
  );
}

function KirimPelukan({ onHug }: { onHug: () => void }) {
  return (
    <div className="relative flex items-center justify-center pt-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onHug}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d2a6a4] bg-[#fff3f1] text-3xl text-[#d77d7d] shadow-[0_10px_20px_rgba(205,120,120,0.18)]"
        aria-label="Kirim pelukan"
      >
        ♡
      </motion.button>
      <HatiMelayang />
    </div>
  );
}

function HatiMelayang() {
  const hearts = Array.from({ length: 7 }, (_, index) => index);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={heart}
          className="heart-floating text-[#d77d7d]"
          style={{
            left: `${25 + index * 10}%`,
            animationDelay: `${index * 0.18}s`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["--dx" as any]: `${(index % 2 === 0 ? -1 : 1) * (18 + index * 6)}px`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

function KolasePenutup() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[76vh] items-center justify-center rounded-[28px] bg-[rgba(255,250,242,0.8)] p-4"
    >
      <div className="grid w-full grid-cols-2 gap-3">
        {ucapanCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.45 }}
            className="overflow-hidden rounded-[16px] border border-[#eadfc3] bg-[#f8f2e7] p-2 shadow-[0_10px_20px_rgba(81,64,44,0.08)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-[#eddcc1]">
              {card.foto ? (
                <Image
                  src={`/foto/${card.foto}`}
                  alt={`Foto kenangan ${card.id}`}
                  fill
                  sizes="(max-width: 768px) 40vw, 220px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-xs text-[#7d6857]">
                  Foto belum tersedia
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function LayarAkhir({ onReset }: { onReset: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="flex min-h-[76vh] flex-col items-center justify-center gap-8 rounded-[28px] bg-[rgba(255,250,242,0.8)] px-6 py-10 text-center"
    >
      <div className="flex gap-4 text-5xl text-[#d7a86b]">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-full bg-[#8fa67d] px-5 py-4 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(143,166,125,0.35)] transition hover:brightness-105"
      >
        Ulangi dari awal
      </button>
    </motion.section>
  );
}
