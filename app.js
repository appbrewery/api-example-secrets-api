import express from "express";
import { rateLimit } from "express-rate-limit";
import bodyParser from "body-parser";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = {
  secrets: [
    {
      secret:
        "I secretly eat ice cream straight from the tub when no one's looking.",
      emScore: 3,
      username: "user123",
      timestamp: "2023-06-25 12:01:23 utc",
    },
    {
      secret:
        "I pretend to be on important conference calls just so I can have some alone time in my home office and nap.",
      emScore: 6,
      username: "secretsnacker",
      timestamp: "2023-06-25 13:45:17 utc",
    },
    {
      secret:
        "I have a secret stash of chocolate hidden in my sock drawer to satisfy my sweet tooth.",
      emScore: 2,
      username: "chocoHoarder",
      timestamp: "2023-06-25 14:30:51 utc",
    },
    {
      secret:
        "I secretly dance in front of the mirror pretending to be a backup dancer for famous singers.",
      emScore: 7,
      username: "dancingqueen",
      timestamp: "2023-06-25 15:12:36 utc",
    },
    {
      secret:
        "I wear mismatched socks on purpose, just to see if anyone notices.",
      emScore: 2,
      username: "sockrebel",
      timestamp: "2023-06-25 16:05:09 utc",
    },
    {
      secret:
        "I pretend to know how to cook fancy dishes, but I'm really just following YouTube tutorials.",
      emScore: 5,
      username: "culinaryimposter",
      timestamp: "2023-06-25 17:20:42 utc",
    },
    {
      secret:
        "I've named all the plants in my house, and sometimes I have conversations with them.",
      emScore: 4,
      username: "plantwhisperer",
      timestamp: "2023-06-25 18:15:28 utc",
    },
    {
      secret:
        "I secretly binge-watch reality TV shows while pretending to be productive.",
      emScore: 4,
      username: "realitytvjunkie",
      timestamp: "2023-06-25 19:03:57 utc",
    },
    {
      secret:
        "I talk to my pet fish and imagine they're responding to me with witty comebacks.",
      emScore: 3,
      username: "fishwhisperer",
      timestamp: "2023-06-25 20:10:22 utc",
    },
    {
      secret:
        "I've been known to wear my pajamas under my work clothes for extra comfort during the day.",
      emScore: 2,
      username: "comfortcrawler",
      timestamp: "2023-06-25 21:07:14 utc",
    },
    {
      secret:
        "I've perfected the art of taking selfies in the bathroom to hide the fact that I'm really just sitting on the toilet.",
      emScore: 7,
      username: "masteroftoiletselfies",
      timestamp: "2023-06-25 22:15:39 utc",
    },
    {
      secret:
        "I have a secret alter ego on social media where I post silly memes and jokes anonymously.",
      emScore: 3,
      username: "mememaster123",
      timestamp: "2023-06-25 23:08:02 utc",
    },
    {
      secret:
        "I put on my headphones without playing any music, just to avoid small talk with strangers.",
      emScore: 3,
      username: "headphonehider",
      timestamp: "2023-06-26 00:01:54 utc",
    },
    {
      secret:
        "I've convinced my friends that I'm a great cook, but I actually order takeout and put it on fancy plates.",
      emScore: 6,
      username: "fakechefextraordinaire",
      timestamp: "2023-06-26 01:20:37 utc",
    },
    {
      secret:
        "I created a fake email address to sign up for all the free trials and discounts without getting spammed.",
      emScore: 4,
      username: "discounthunter",
      timestamp: "2023-06-26 02:18:09 utc",
    },
    {
      secret:
        "I pretend to be talking on the phone when I'm really just rehearsing conversations in my head.",
      emScore: 3,
      username: "phonetalkmaster",
      timestamp: "2023-06-26 03:25:43 utc",
    },
    {
      secret:
        "I secretly watch cute animal videos to brighten my day, even though I'm a tough-looking person.",
      emScore: 3,
      username: "toughandsoft",
      timestamp: "2023-06-26 04:15:26 utc",
    },
    {
      secret:
        "I've hidden a secret stash of snacks in the glove compartment of my car for emergency munchies.",
      emScore: 2,
      username: "snackstasher",
      timestamp: "2023-06-26 05:03:59 utc",
    },
    {
      secret:
        "I have an ongoing competition with myself to see how long I can go without doing laundry.",
      emScore: 4,
      username: "laundryslacker",
      timestamp: "2023-06-26 06:10:31 utc",
    },
    {
      secret:
        "I make up ridiculous excuses to avoid going to the gym, but really, I'm just lazy.",
      emScore: 4,
      username: "gymexcusemaster",
      timestamp: "2023-06-26 07:08:17 utc",
    },
    {
      secret:
        "I have a secret collection of embarrassing childhood photos that I use to blackmail my siblings.",
      emScore: 8,
      username: "siblingblackmailer",
      timestamp: "2023-06-26 08:12:44 utc",
    },
    {
      secret:
        "I change the language settings on people's phones when they're not looking, just to confuse them.",
      emScore: 6,
      username: "phoneprankster",
      timestamp: "2023-06-26 09:05:29 utc",
    },
    {
      secret:
        "I have a secret obsession with collecting random hotel toiletries from my travels.",
      emScore: 3,
      username: "toiletrycollector",
      timestamp: "2023-06-26 10:14:53 utc",
    },
    {
      secret:
        "I pretend to be a detective when I'm doing everyday chores, solving imaginary mysteries in my head.",
      emScore: 3,
      username: "imaginarydetective",
      timestamp: "2023-06-26 11:09:38 utc",
    },
    {
      secret:
        "I've perfected the art of eating snacks silently to avoid sharing them with others.",
      emScore: 4,
      username: "stealthsnacker",
      timestamp: "2023-06-26 12:25:11 utc",
    },
    {
      secret:
        "I have a secret Pinterest board dedicated to my future life as a millionaire, complete with mansion and exotic pets.",
      emScore: 6,
      username: "futuremillionaire",
      timestamp: "2023-06-26 13:15:53 utc",
    },
    {
      secret:
        "I use funny usernames when ordering takeout, just to see if the delivery drivers crack a smile.",
      emScore: 3,
      username: "hilariousfoodie",
      timestamp: "2023-06-26 14:07:47 utc",
    },
    {
      secret:
        "I've created a secret language with my best friend, and we use it to have silly conversations in public.",
      emScore: 3,
      username: "languagemasters",
      timestamp: "2023-06-26 15:10:55 utc",
    },
    {
      secret:
        "I've memorized cheesy pickup lines, just in case I need to lighten the mood in awkward situations.",
      emScore: 5,
      username: "pickuplinepro",
      timestamp: "2023-06-26 16:01:42 utc",
    },
    {
      secret:
        "I secretly hide my favorite snacks at the back of the pantry, hoping no one will find them.",
      emScore: 3,
      username: "snackninja",
      timestamp: "2023-06-26 17:09:15 utc",
    },
    {
      secret:
        "I've mastered the art of pretending to laugh at jokes I don't understand, just to fit in.",
      emScore: 3,
      username: "laughingpretender",
      timestamp: "2023-06-26 18:06:29 utc",
    },
    {
      secret:
        "I have a secret stash of cat videos that I watch whenever I need an instant mood boost.",
      emScore: 3,
      username: "catvideoenthusiast",
      timestamp: "2023-06-26 19:10:12 utc",
    },
    {
      secret:
        "I purposely mispronounce words to sound fancy, even though I have no idea how they're actually pronounced.",
      emScore: 5,
      username: "pronunciationmaster",
      timestamp: "2023-06-26 20:15:43 utc",
    },
    {
      secret:
        "I have a secret obsession with collecting funny-looking socks, and my drawer is full of them.",
      emScore: 3,
      username: "funkysockcollector",
      timestamp: "2023-06-26 21:08:57 utc",
    },
    {
      secret:
        "I talk to inanimate objects when no one's around, just to feel like I have an audience.",
      emScore: 3,
      username: "inanimateconversationalist",
      timestamp: "2023-06-26 22:02:04 utc",
    },
    {
      secret:
        "I've perfected the art of making silly faces in the mirror, just to make myself laugh.",
      emScore: 4,
      username: "sillyfaceartist",
      timestamp: "2023-06-26 23:09:36 utc",
    },
    {
      secret:
        "I secretly sing in the shower, imagining I'm performing at a sold-out concert.",
      emScore: 3,
      username: "showersongbird",
      timestamp: "2023-06-27 00:04:25 utc",
    },
    {
      secret:
        "I have a secret stash of candy hidden in my office desk drawer for those mid-afternoon cravings.",
      emScore: 3,
      username: "candycraver",
      timestamp: "2023-06-27 01:08:19 utc",
    },
    {
      secret:
        "I pretend to be a food critic when I go out to eat, just to see the staff's reaction.",
      emScore: 4,
      username: "foodiereviewer",
      timestamp: "2023-06-27 02:10:37 utc",
    },
    {
      secret:
        "I've created a secret language with my pet, and we have conversations that only we understand.",
      emScore: 5,
      username: "animallinguist",
      timestamp: "2023-06-27 03:05:29 utc",
    },
    {
      secret:
        "I've convinced my friends that I have a secret talent for juggling, but I can only juggle two balls.",
      emScore: 5,
      username: "jugglingenthusiast",
      timestamp: "2023-06-27 04:07:51 utc",
    },
    {
      secret:
        "I pretend to be a food blogger, taking pictures of my meals at restaurants even though I have no intention of posting them.",
      emScore: 6,
      username: "foodiepretender",
      timestamp: "2023-06-27 05:09:44 utc",
    },
    {
      secret:
        "I've convinced my friends that I'm a great singer, but in reality, I can't hold a tune.",
      emScore: 5,
      username: "singingimpostor",
      timestamp: "2023-06-27 06:15:22 utc",
    },
    {
      secret:
        "I've convinced my friends that I have a secret talent for beatboxing, but I can only make strange noises.",
      emScore: 4,
      username: "beatboxcharlatan",
      timestamp: "2023-06-27 07:07:11 utc",
    },
    {
      secret:
        "I secretly wear a superhero cape under my clothes, just in case the world needs saving.",
      emScore: 6,
      username: "secrethero",
      timestamp: "2023-06-27 08:12:55 utc",
    },
    {
      secret:
        "I pretend to be a food critic when I go out to eat, but I always end up ordering the same dish.",
      emScore: 4,
      username: "repeatreviewer",
      timestamp: "2023-06-27 09:06:38 utc",
    },
    {
      secret:
        "I've been known to come up with punny jokes on the spot, even though they're not always funny.",
      emScore: 4,
      username: "punmaster",
      timestamp: "2023-06-27 10:09:47 utc",
    },
    {
      secret:
        "I've been practicing the kazoo, hoping to become a famous kazoo player one day.",
      emScore: 5,
      username: "kazoomaestro",
      timestamp: "2023-06-27 11:08:13 utc",
    },
    {
      secret:
        "I secretly pretend to be a famous food blogger, taking photos of my meals before I eat them.",
      emScore: 4,
      username: "fauxfoodinfluencer",
      timestamp: "2023-06-27 12:01:02 utc",
    },
    {
      secret:
        "I have a secret collection of cat videos that I watch whenever I need a pick-me-up.",
      emScore: 3,
      username: "catvideoaficionado",
      timestamp: "2023-06-27 13:08:39 utc",
    },
    {
      secret:
        "I intentionally mispronounce words to make them sound funnier, even if it makes me look foolish.",
      emScore: 4,
      username: "wordplayenthusiast",
      timestamp: "2023-06-27 14:15:17 utc",
    },
    {
      secret:
        "I have a drawer full of socks with cheesy and funny designs that I wear to brighten my day.",
      emScore: 3,
      username: "quirkysocklover",
      timestamp: "2023-06-27 15:04:22 utc",
    },
    {
      secret:
        "I secretly play air guitar in the car, pretending to be a rock star while stuck in traffic.",
      emScore: 4,
      username: "carrockstar",
      timestamp: "2023-06-27 16:09:51 utc",
    },
    {
      secret:
        "I've worn my pajamas inside out on purpose, just because I thought it might bring me good luck.",
      emScore: 4,
      username: "insideoutpjs",
      timestamp: "2023-06-27 17:07:18 utc",
    },
    {
      secret:
        "I've taken countless bathroom selfies and spent way too much time perfecting the right pose.",
      emScore: 5,
      username: "bathroomselfiepro",
      timestamp: "2023-06-27 18:05:34 utc",
    },
    {
      secret:
        "I've pretended to be a spy, using everyday objects as hidden gadgets, but it always ends up looking ridiculous.",
      emScore: 6,
      username: "spywannabe",
      timestamp: "2023-06-27 19:03:47 utc",
    },
    {
      secret:
        "I've attempted to do magic tricks at parties, but they often fail and leave everyone confused.",
      emScore: 4,
      username: "failedmagician",
      timestamp: "2023-06-27 20:10:16 utc",
    },
    {
      secret:
        "I've pretended to be a ventriloquist and had conversations with myself using silly voices.",
      emScore: 5,
      username: "ventriloquistintraining",
      timestamp: "2023-06-27 21:09:23 utc",
    },
    {
      secret:
        "I've accidentally walked into a glass door, thinking it was open, in front of a crowd of people.",
      emScore: 7,
      username: "glassdoorbumper",
      timestamp: "2023-06-27 22:07:22 utc",
    },
    {
      secret:
        "I've had my pants rip in a public place, leaving me exposed and embarrassed.",
      emScore: 9,
      username: "rippedpants",
      timestamp: "2023-06-28 00:06:19 utc",
    },
    {
      secret:
        "I've been caught talking to myself in public, having a full-blown conversation as if there was someone with me.",
      emScore: 6,
      username: "talkingtomyself",
      timestamp: "2023-06-28 01:05:29 utc",
    },
    {
      secret:
        "I've mistakenly walked into the wrong restroom and only realized when I saw the confused faces of others.",
      emScore: 7,
      username: "restroomconfusion",
      timestamp: "2023-06-28 02:09:18 utc",
    },
    {
      secret:
        "I've tripped and fell while trying to impress someone I liked, making a complete fool of myself.",
      emScore: 8,
      username: "lovestruckclumsy",
      timestamp: "2023-06-28 03:08:26 utc",
    },
    {
      secret:
        "I've accidentally called my teacher 'mom' in front of the entire class, causing everyone to burst into laughter.",
      emScore: 8,
      username: "momteachermixup",
      timestamp: "2023-06-28 04:07:14 utc",
    },
    {
      secret:
        "I've had my skirt tucked into my underwear without realizing it, walking around like that for a while.",
      emScore: 9,
      username: "skirttuckdisaster",
      timestamp: "2023-06-28 05:06:21 utc",
    },
    {
      secret:
        "I've laughed so hard at a joke that I snorted loudly, attracting everyone's attention and causing embarrassment.",
      emScore: 7,
      username: "loudsnorter",
      timestamp: "2023-06-28 06:05:19 utc",
    },
    {
      secret:
        "I've accidentally called my boss 'mom' during a work meeting, leaving everyone confused and amused.",
      emScore: 8,
      username: "mombossmishap",
      timestamp: "2023-06-28 07:04:17 utc",
    },
  ],
};
//Index page
app.get("/", (req, res) => {
  res.send(
    "Welcome to the secrets API. Check the documentation to see how to interact with this API."
  );
});

//Get a random secret
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * data.secrets.length);
  res.json(data.secrets[randomIndex]);
});

//Get a random secret with a particular embarrassment score or higher
app.get("/filter", (req, res) => {
  let filteredSecrets = data.secrets;

  if (req.query.score) {
    filteredSecrets = filteredSecrets.filter(
      (secret) => secret.emScore >= parseInt(req.query.score)
    );
  }

  if (filteredSecrets.length > 0) {
    res.json(filteredSecrets);
  } else {
    res.status(404).json({ error: "Secrets not found for the given filter." });
  }
});

// Route to retrieve a specific secret by username
app.get("/user/:username", (req, res) => {
  const user = req.params.username;
  console.log(user);
  const filteredSecrets = data.secrets.filter(
    (secret) => secret.username === user
  );
  if (filteredSecrets.length > 0) {
    res.json(filteredSecrets);
  } else {
    res
      .status(404)
      .json({ error: "Secrets not found for the given username." });
  }
});

//POST

// app.post("/submit", (req, res) => {
//   console.log(new Date().toDateString());
//   const data = {
//     secret: req.body.secret,
//     emScore: req.body.score,
//     username: req.body.username,
//     timestamp: `${new Date().toISOString("en-US")} utc`,
//   };
//   let secrets = localStorage.getItem("UserSecrets");
//   secrets.push(data);
//   localStorage.setItem("UserSecrets");
// });

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
