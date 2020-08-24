import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/main.scss";

const AnimatedText = ({ text, darker }) => {
  const { letterArr } = Array.from(text).reduce(
    (acc, character) => {
      const letter = character === " " ? "\u00A0" : character;
      const count = { ...acc.count, [letter]: (acc.count[letter] ?? 0) + 1 };
      const letterArr = [
        ...acc.letterArr,
        { value: letter, key: `${letter}${count[letter]}` },
      ];
      return { count, letterArr };
    },
    { count: {}, letterArr: [] }
  );

  const containerVariants = {
    before: {
      transition: {
        staggerChildren: 0.04,
      },
    },
    after: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letterVariants = {
    before: {
      opacity: 0,
      y: 20,
      transition: {
        loop: Infinity,
        type: "spring",
        damping: 16,
        stiffness: 200,
      },
    },
    after: {
      opacity: 1,
      y: 0,
      transition: {
        loop: Infinity,
        type: "spring",
        damping: 16,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      layout
      animate={{
        backgroundColor: `rgba(75, 83, 98, 0.3)`
      }}
      transition={{
        duration: 1
      }}
    >
      <motion.div
        style={{ display: "flex", justifyContent: "center" }}
        variants={containerVariants}
        initial="before"
        animate="after"
        exit="before"
        layout
      >
        {letterArr.map(({ value, key }, i) => {
          return (
            <motion.div
              layout
              key={key}
              className="subtitle"
              variants={letterVariants}
              transition={{
                duration: 0.7,
              }}
            >
              {value}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const subtitles = [
  {
    text: "Uncovering the possibilities for your business.",
    duration: 5000,
  },
  {
    text: "Devising a proper solution to cater your needs.",
    duration: 6000,
  },
  {
    text: "Creating and crafting to bring products to life.",
    duration: 6000,
    darker: true,
  },
  {
    text: "Testing and deploying sustainable services.",
    duration: 8000,
  },
  {
    text: "Relaxing and enjoying is just as important.",
    duration: 12000,
  },
  {
    text: "Rejuvinating with passion of life.",
    duration: 4000,
  },
];

export default function Home() {
  const [subtitleIndex, setSubtitleIndex] = React.useState(0);
  const subtitleRef = React.useRef(null);
  const [darker, setDarker] = React.useState(false);

  const manageSubtitle = () => {
    setSubtitleIndex((subtitleIndex) => {
      const nextSubtitleIndex = (subtitleIndex + 1) % subtitles.length;
      const { duration, darker } = subtitles[nextSubtitleIndex];
      subtitleRef.current = setTimeout(() => {
        manageSubtitle();
      }, duration);
      return nextSubtitleIndex;
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      manageSubtitle();
    }, subtitles[subtitleIndex].duration);
  }, []);

  React.useEffect(() => {
    const { darker } = subtitles[subtitleIndex];
    setDarker(darker !== undefined);
  }, [subtitleIndex]);

  return (
    <div id="home">
      <Head>
        <title>Burgeon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="first-section">
          <div id="video-background">
            <video autoPlay muted loop id="banner-video">
              <source src="/static/videos/burgeon.mp4" type="video/mp4" />
            </video>
            <div id="overlay"></div>
          </div>
          <header>
            <div id="logo">Burgeon</div>
            <nav>
              <div className={"nav-item"}>Home</div>
              <div className={"nav-item"}>Technology</div>
              <div className={"nav-item"}>Service</div>
              <div className={"nav-item"}>About us</div>
            </nav>
          </header>
          <div id="centered-section">
            <div id="horizontal-bar"></div>
            <div id="title">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "linear", duration: 1.5 }}
              >
                From ideas
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "linear", duration: 1.5 }}
              >
                to reality.
              </motion.h1>
              <br />
              <AnimatedText
                text={subtitles[subtitleIndex].text}
                darker={darker}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
