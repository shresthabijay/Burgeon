import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/main.scss";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import TickSvg from "../public/static/svgs/tick.svg";
import WebSvg from "../public/static/svgs/web.svg";
import AppSvg from "../public/static/svgs/app.svg";
import MarketingSvg from "../public/static/svgs/marketing.svg";
import DiscussionSvg from "../public/static/svgs/discussion.svg";
import ResearchSvg from "../public/static/svgs/research.svg";
import RoadMapSvg from "../public/static/svgs/roadmap.svg";
import ConceptualizeSvg from "../public/static/svgs/conceptualize.svg";

const AnimatedText = ({ text, darker, className}) => {
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
      animate={{
        backgroundColor: `rgba(75, 83, 98, 0.3)`,
      }}
      transition={{
        duration: 1,
      }}
    >
      <motion.div
        style={{ display: "flex", justifyContent: "center" }}
        variants={containerVariants}
        className={className}
        initial="before"
        animate="after"
        exit="before"
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

const HeightAnimationText = ({ text, direction, className}) => {
  const isDirUp = direction === "up";
  return (
    <motion.div style={{ overflow: "hidden" }} className={className}>
      <motion.h2
      className="slider-header"
        transition={{ duration: 0.7, ease: "easeInOut" }}
        initial={{ y: isDirUp ? "-5rem" : "5rem" }}
        animate={{ y: 0 }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

const Slide = ({ svg, topText, bottomText, description }) => {
  return (
    <motion.div
      className="slide-wrapper"
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 200,
      }}
    >
      <div id="left">
        <HeightAnimationText text={topText} direction="down" />
        <HeightAnimationText text={bottomText} direction="up" />
        <div className="h-gap x2"></div>
        <div className="h-gap x2"></div>
        <AnimatedText text={description} className="animated-text"/>
      </div>
      <div id="right">
        <motion.div
          transition={{ duration: 0.7, ease: "easeInOut" }}
          initial={{ opacity: 0, x: "3rem" }}
          animate={{ opacity: 1, x: 0 }}
          className="svg-wrapper"
        >
          {svg}
        </motion.div>
      </div>
    </motion.div>
  );
};
const IdentifySection = () => {
  const [index, setIndex] = React.useState(0);
  const slides = [
    {
      topText: "Gather",
      bottomText: "client requirements.",
      description: "Communicating and understanding client needs is the must.",
      svg: <DiscussionSvg className="identify-svg" />,
    },
    {
      topText: "Perform",
      bottomText: "background research.",
      description: "Carrying on research for the relevant market is important.",
      svg: <ResearchSvg className="identify-svg" />,
    },
    {
      topText: "Create",
      bottomText: "the road map.",
      description: "Properly paving the right path is the key to success.",
      svg: <RoadMapSvg className="identify-svg" />,
    },
    {
      topText: "Start",
      bottomText: "product conceptualization.",
      description: "Visualize the end product that meets the the hype.",
      svg: <ConceptualizeSvg className="identify-svg" />,
    },
  ];

  React.useEffect(() => {
    setInterval(() => {
      setIndex((index) => {
        console.log((index + 1) % slides.length);
        return (index + 1) % slides.length;
      });
    }, 5000);
  }, []);

  return (
    <section id="identify-section">
      <h2>Tailored to fit your business needs</h2>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <AnimatePresence>
          <Slide key={index} {...slides[index]} />
        </AnimatePresence>
      </div>
    </section>
  );
};

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
        <section id="service-section">
          <h2 className="section-heading">Our Amazing Features</h2>
          <div style={{ height: "5rem" }}></div>
          <div id="service-container">
            <ServiceCard
              title="Web Development"
              description="We create beautiful responsive web applications and landing pages with latest technology. We specialize with every type of web development proces. We will create an awesome application for your incredible business ideas."
              icon={<WebSvg style={{ fill: "rgb(71, 71, 195)" }} />}
            />
            <ServiceCard
              title="Mobile App Development"
              description="We ensure you to build a highly performant and robust mobile applications for your need. Our developers can craft your ideas into a beautiful and responsive application. Also hybrid application to ensure application we deploy is available across platforms."
              icon={<AppSvg style={{ fill: "red" }} />}
            />
            <ServiceCard
              title="Digital"
              description="Getting ahead of your competitors is the #1 way to be successful in business. Proper digital marketing and SEO can help you achieve this. We provide all these services to esnure your business is see out there in the real world."
              icon={<MarketingSvg />}
            />
          </div>
        </section>
        <IdentifySection />
        <section id="response-section">
          <div className="less-div-first"></div>
          <div className="less-div-second"></div>
          <h2>Elevating our</h2>
          <h2>customer experience.</h2>
          <div style={{ height: "2rem" }}></div>
          <p>
            We are master of our crafts. We will enable your business graviate
            more customers with less hassle on your side. Not to brag of the{" "}
            <span className="important-text">
              robust support and great communication
            </span>{" "}
            from our side to make your experience here mesmerizing.
          </p>
          <div style={{ height: "2rem" }}></div>
          <section id="response-list">
            <ul>
              <li>
                <TickSvg className="list-icon" />
                <span>80% faster turn around time.</span>
              </li>
            </ul>
            <ul>
              <li>
                <TickSvg className="list-icon" />
                <span>{"< 30"} mins average chat response time.</span>
              </li>
            </ul>
            <ul>
              <li>
                <TickSvg className="list-icon" />
                <span>{"< 10"} mins average support time.</span>
              </li>
            </ul>
          </section>
        </section>
        <section id="contact-section">
          <h2>Bring your ideas to life today.</h2>
          <div className="h-gap x2"></div>
          <div className="h-gap x2"></div>
          <p>
            Contact us to get started with incredible business and tech
            experience.
          </p>
          <div className="h-gap x2"></div>
          <div className="h-gap x2"></div>
          <div id="signup-container">
            <input className="signup-input"></input>
            <div className="signup-button">Get started</div>
          </div>
        </section>
      </main>
    </div>
  );
}
