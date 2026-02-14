import { useState, useEffect, useMemo, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  display: "swap",
  subsets: ["latin"],
});

// 36 images
const images = [
  "/game-photos/1.avif",
  "/game-photos/2.avif",
  "/game-photos/3.avif",
  "/game-photos/4.avif",
  "/game-photos/5.avif",
  "/game-photos/6.avif",
  "/game-photos/7.avif",
  "/game-photos/8.avif",
  "/game-photos/9.avif",
  "/game-photos/10.avif",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
  "/game-photos/13.avif",
  "/game-photos/14.avif",
  "/game-photos/15.avif",
  "/game-photos/16.avif",
  "/game-photos/17.avif",
  "/game-photos/18.avif",
  "/game-photos/19.avif",
  "/game-photos/20.avif",
  "/game-photos/21.avif",
  "/game-photos/22.avif",
  "/game-photos/23.avif",
  "/game-photos/24.avif",
  "/game-photos/25.avif",
  "/game-photos/26.avif",
  "/game-photos/27.avif",
  "/game-photos/28.avif",
  "/game-photos/29.avif",
  "/game-photos/30.avif",
  "/game-photos/31.avif",
  "/game-photos/32.avif",
  "/game-photos/33.avif",
  "/game-photos/34.avif",
  "/game-photos/35.avif",
  "/game-photos/36.avif",
];

// ✅ Your Google Drive file id
const DRIVE_FILE_ID = "1wEIYVtOKzzg8PlySjUkSJD33g3M3lVBd";

// Google Drive “direct-ish” stream URL
function driveVideoSrc(fileId: string) {
  // This works for many public/shared Drive files in <video>.
  // If Drive ever blocks streaming, easiest fix is: YouTube (unlisted) or Cloudinary.
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export default function ValentinesProposal() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(
    null
  );
  const [showFireworks, setShowFireworks] = useState(false);

  // video controls
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsUserSoundClick, setNeedsUserSoundClick] = useState(true);

  const videoUrl = useMemo(() => driveVideoSrc(DRIVE_FILE_ID), []);

  const getRandomPosition = () => {
    const randomTop = Math.random() * 80;
    const randomLeft = Math.random() * 80;
    return { top: `${randomTop}%`, left: `${randomLeft}%` };
  };

  useEffect(() => {
    if (step < 2) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleYesClick = () => {
    setShowFireworks(true);
    setStep(3);
  };

  // When step becomes 3: try autoplay muted
  useEffect(() => {
    if (step !== 3) return;

    setNeedsUserSoundClick(true);

    const v = videoRef.current;
    if (!v) return;

    v.muted = true; // required for autoplay
    v.playsInline = true;

    const tryPlay = async () => {
      try {
        await v.play();
        // playing muted is fine; user click later for sound
      } catch {
        // If autoplay fails, user will click play anyway
      }
    };

    tryPlay();
  }, [step]);

  const enableSoundAndPlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      v.muted = false;
      v.volume = 1;
      await v.play();
      setNeedsUserSoundClick(false);
    } catch {
      // If play still blocked, user can press native controls play
      setNeedsUserSoundClick(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.h2
            key="step-0"
            className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Congratulations! makkha (not so makkha due to GT).
          </motion.h2>
        )}

        {step === 1 && (
          <motion.h2
            key="step-1"
            className={`text-4xl font-semibold mb-4 ${playfairDisplay.className}`}
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Are you Makkha?
          </motion.h2>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            transition={{ duration: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-6 opacity-10">
              {images.slice(0, 36).map((src, index) => (
                <div key={index} className="relative h-full">
                  <Image
                    src={src}
                    alt={`Memory ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <h2
              className={`text-5xl font-semibold mb-8 ${playfairDisplay.className}`}
            >
              Will you be my Valentine?
            </h2>

            <Image
              src="/sad_hamster.png"
              alt="Sad Hamster"
              width={200}
              height={200}
            />

            <div className="flex space-x-4 mt-10">
              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={handleYesClick}
              >
                Yes, I will! 🥰
              </button>

              <button
                className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-95 transition-all duration-300 shadow-lg"
                style={
                  position
                    ? { position: "absolute", top: position.top, left: position.left }
                    : {}
                }
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No, I won&apos;t 😢..Ghanta no bolshil,
              </button>
            </div>
          </motion.div>
        )}

        {/* ✅ STEP 3 with BIG Drive video + sound button */}
        {step === 3 && (
          <motion.div
            key="step-3"
            className={`flex flex-col justify-center items-center text-center px-4 ${playfairDisplay.className}`}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-5xl font-semibold mb-6">
              HEHEHE, I love you Ishudi! Happy Valentines Day!!!!! 💕..gey
            </h2>

            {/* Big centered video */}
            <div className="w-full flex justify-center">
              <div className="relative w-[92vw] max-w-5xl">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => {
                      // if user pressed play, they likely want sound too
                    }}
                  />
                </div>

                {/* Tap for sound overlay (only shows until user clicks) */}
                {needsUserSoundClick && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <button
                      className="pointer-events-auto px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-xl"
                      onClick={enableSoundAndPlay}
                    >
                      Tap for sound 🔊
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm opacity-70">
              If sound doesn&apos;t start automatically, click the “Tap for sound” button once 🙂
            </p>

            <div className="mt-6">
              <Image
                src="/hamster_jumping.gif"
                alt="Hamster Feliz"
                width={200}
                height={200}
                unoptimized
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showFireworks && (
        <div className="absolute w-full h-full">
          <Fireworks
            options={{ autoresize: true }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
