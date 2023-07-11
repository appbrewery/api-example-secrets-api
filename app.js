const express = require("express");
const limit = require("express-rate-limit");
const bodyParser = require("body-parser");
const store = require("node-localstorage");
const expressBasicAuth = require("express-basic-auth");
const crypto = require("crypto");
const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;
const db = require("./db");

const localStorage = new store.LocalStorage("./scratch");
const app = express();

//Auth methods
const basicAuth = expressBasicAuth({
  authorizer: authenticate,
  unauthorizedResponse: "Error: Incorrect username or password.",
});

function authenticate(username, password) {
  const pass = localStorage.getItem(username);
  if (pass) {
    const passwordMatches = expressBasicAuth.safeCompare(
      password,
      localStorage.getItem(username)
    );
    if (passwordMatches) {
      const userSecrets = db.users.getSecrets(username) || [];
      console.log(userSecrets);
      data.secrets = data.secrets.concat(userSecrets);
    }
    return passwordMatches;
  } else {
    return false;
  }
}

function apiAuth(req, res, next) {
  const key = req.query.apiKey;
  if (localStorage.getItem("apiKeys").includes(key)) {
    next();
  }
  res.status(401).json({ error: "API Key does not exist." });
}

passport.use(
  new Strategy(function (token, cb) {
    db.users.findByToken(token, function (err, user) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

const limiter = limit.rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);

let data = {
  secrets: [
    {
      id: 1,
      secret:
        "I secretly eat ice cream straight from the tub when no one's looking.",
      emScore: 3,
      username: "user123",
      timestamp: "2023-06-25 12:01:23 utc",
    },
    {
      id: 2,
      secret:
        "I pretend to be on important conference calls just so I can have some alone time in my home office and nap.",
      emScore: 6,
      username: "secretsnacker",
      timestamp: "2023-06-25 13:45:17 utc",
    },
    {
      id: 3,
      secret:
        "I have a secret stash of chocolate hidden in my sock drawer to satisfy my sweet tooth.",
      emScore: 2,
      username: "chocoHoarder",
      timestamp: "2023-06-25 14:30:51 utc",
    },
    {
      id: 4,
      secret:
        "I secretly dance in front of the mirror pretending to be a backup dancer for famous singers.",
      emScore: 7,
      username: "dancingqueen",
      timestamp: "2023-06-25 15:12:36 utc",
    },
    {
      id: 5,
      secret:
        "I wear mismatched socks on purpose, just to see if anyone notices.",
      emScore: 2,
      username: "sockrebel",
      timestamp: "2023-06-25 16:05:09 utc",
    },
    {
      id: 6,
      secret:
        "I pretend to know how to cook fancy dishes, but I'm really just following YouTube tutorials.",
      emScore: 5,
      username: "culinaryimposter",
      timestamp: "2023-06-25 17:20:42 utc",
    },
    {
      id: 7,
      secret:
        "I've named all the plants in my house, and sometimes I have conversations with them.",
      emScore: 4,
      username: "plantwhisperer",
      timestamp: "2023-06-25 18:15:28 utc",
    },
    {
      id: 8,
      secret:
        "I secretly binge-watch reality TV shows while pretending to be productive.",
      emScore: 4,
      username: "realitytvjunkie",
      timestamp: "2023-06-25 19:03:57 utc",
    },
    {
      id: 9,
      secret:
        "I talk to my pet fish and imagine they're responding to me with witty comebacks.",
      emScore: 3,
      username: "fishwhisperer",
      timestamp: "2023-06-25 20:10:22 utc",
    },
    {
      id: 10,
      secret:
        "I've been known to wear my pajamas under my work clothes for extra comfort during the day.",
      emScore: 2,
      username: "comfortcrawler",
      timestamp: "2023-06-25 21:07:14 utc",
    },
    {
      id: 11,
      secret:
        "I've perfected the art of taking selfies in the bathroom to hide the fact that I'm really just sitting on the toilet.",
      emScore: 7,
      username: "masteroftoiletselfies",
      timestamp: "2023-06-25 22:15:39 utc",
    },
    {
      id: 12,
      secret:
        "I have a secret alter ego on social media where I post silly memes and jokes anonymously.",
      emScore: 3,
      username: "mememaster123",
      timestamp: "2023-06-25 23:08:02 utc",
    },
    {
      id: 13,
      secret:
        "I put on my headphones without playing any music, just to avoid small talk with strangers.",
      emScore: 3,
      username: "headphonehider",
      timestamp: "2023-06-26 00:01:54 utc",
    },
    {
      id: 14,
      secret:
        "I've convinced my friends that I'm a great cook, but I actually order takeout and put it on fancy plates.",
      emScore: 6,
      username: "fakechefextraordinaire",
      timestamp: "2023-06-26 01:20:37 utc",
    },
    {
      id: 15,
      secret:
        "I created a fake email address to sign up for all the free trials and discounts without getting spammed.",
      emScore: 4,
      username: "discounthunter",
      timestamp: "2023-06-26 02:18:09 utc",
    },
    {
      id: 16,
      secret:
        "I pretend to be talking on the phone when I'm really just rehearsing conversations in my head.",
      emScore: 3,
      username: "phonetalkmaster",
      timestamp: "2023-06-26 03:25:43 utc",
    },
    {
      id: 17,
      secret:
        "I secretly watch cute animal videos to brighten my day, even though I'm a tough-looking person.",
      emScore: 3,
      username: "toughandsoft",
      timestamp: "2023-06-26 04:15:26 utc",
    },
    {
      id: 18,
      secret:
        "I've hidden a secret stash of snacks in the glove compartment of my car for emergency munchies.",
      emScore: 2,
      username: "snackstasher",
      timestamp: "2023-06-26 05:03:59 utc",
    },
    {
      id: 19,
      secret:
        "I have an ongoing competition with myself to see how long I can go without doing laundry.",
      emScore: 4,
      username: "laundryslacker",
      timestamp: "2023-06-26 06:10:31 utc",
    },
    {
      id: 20,
      secret:
        "I make up ridiculous excuses to avoid going to the gym, but really, I'm just lazy.",
      emScore: 4,
      username: "gymexcusemaster",
      timestamp: "2023-06-26 07:08:17 utc",
    },
    {
      id: 21,
      secret:
        "I have a secret collection of embarrassing childhood photos that I use to blackmail my siblings.",
      emScore: 8,
      username: "siblingblackmailer",
      timestamp: "2023-06-26 08:12:44 utc",
    },
    {
      id: 22,
      secret:
        "I change the language settings on people's phones when they're not looking, just to confuse them.",
      emScore: 6,
      username: "phoneprankster",
      timestamp: "2023-06-26 09:05:29 utc",
    },
    {
      id: 23,
      secret:
        "I have a secret obsession with collecting random hotel toiletries from my travels.",
      emScore: 3,
      username: "toiletrycollector",
      timestamp: "2023-06-26 10:14:53 utc",
    },
    {
      id: 24,
      secret:
        "I pretend to be a detective when I'm doing everyday chores, solving imaginary mysteries in my head.",
      emScore: 3,
      username: "imaginarydetective",
      timestamp: "2023-06-26 11:09:38 utc",
    },
    {
      id: 25,
      secret:
        "I've perfected the art of eating snacks silently to avoid sharing them with others.",
      emScore: 4,
      username: "stealthsnacker",
      timestamp: "2023-06-26 12:25:11 utc",
    },
    {
      id: 26,
      secret:
        "I have a secret Pinterest board dedicated to my future life as a millionaire, complete with mansion and exotic pets.",
      emScore: 6,
      username: "futuremillionaire",
      timestamp: "2023-06-26 13:15:53 utc",
    },
    {
      id: 27,
      secret:
        "I use funny usernames when ordering takeout, just to see if the delivery drivers crack a smile.",
      emScore: 3,
      username: "hilariousfoodie",
      timestamp: "2023-06-26 14:07:47 utc",
    },
    {
      id: 28,
      secret:
        "I've created a secret language with my best friend, and we use it to have silly conversations in public.",
      emScore: 3,
      username: "languagemasters",
      timestamp: "2023-06-26 15:10:55 utc",
    },
    {
      id: 29,
      secret:
        "I've memorized cheesy pickup lines, just in case I need to lighten the mood in awkward situations.",
      emScore: 5,
      username: "pickuplinepro",
      timestamp: "2023-06-26 16:01:42 utc",
    },
    {
      id: 30,
      secret:
        "I secretly hide my favorite snacks at the back of the pantry, hoping no one will find them.",
      emScore: 3,
      username: "snackninja",
      timestamp: "2023-06-26 17:09:15 utc",
    },
    {
      id: 31,
      secret:
        "I've mastered the art of pretending to laugh at jokes I don't understand, just to fit in.",
      emScore: 3,
      username: "laughingpretender",
      timestamp: "2023-06-26 18:06:29 utc",
    },
    {
      id: 32,
      secret:
        "I have a secret stash of cat videos that I watch whenever I need an instant mood boost.",
      emScore: 3,
      username: "catvideoenthusiast",
      timestamp: "2023-06-26 19:10:12 utc",
    },
    {
      id: 33,
      secret:
        "I purposely mispronounce words to sound fancy, even though I have no idea how they're actually pronounced.",
      emScore: 5,
      username: "pronunciationmaster",
      timestamp: "2023-06-26 20:15:43 utc",
    },
    {
      id: 34,
      secret:
        "I have a secret obsession with collecting funny-looking socks, and my drawer is full of them.",
      emScore: 3,
      username: "funkysockcollector",
      timestamp: "2023-06-26 21:08:57 utc",
    },
    {
      id: 35,
      secret:
        "I talk to inanimate objects when no one's around, just to feel like I have an audience.",
      emScore: 3,
      username: "inanimateconversationalist",
      timestamp: "2023-06-26 22:02:04 utc",
    },
    {
      id: 36,
      secret:
        "I've perfected the art of making silly faces in the mirror, just to make myself laugh.",
      emScore: 4,
      username: "sillyfaceartist",
      timestamp: "2023-06-26 23:09:36 utc",
    },
    {
      id: 37,
      secret:
        "I secretly sing in the shower, imagining I'm performing at a sold-out concert.",
      emScore: 3,
      username: "showersongbird",
      timestamp: "2023-06-27 00:04:25 utc",
    },
    {
      id: 38,
      secret:
        "I have a secret stash of candy hidden in my office desk drawer for those mid-afternoon cravings.",
      emScore: 3,
      username: "candycraver",
      timestamp: "2023-06-27 01:08:19 utc",
    },
    {
      id: 39,
      secret:
        "I pretend to be a food critic when I go out to eat, just to see the staff's reaction.",
      emScore: 4,
      username: "foodiereviewer",
      timestamp: "2023-06-27 02:10:37 utc",
    },
    {
      id: 40,
      secret:
        "I've created a secret language with my pet, and we have conversations that only we understand.",
      emScore: 5,
      username: "animallinguist",
      timestamp: "2023-06-27 03:05:29 utc",
    },
    {
      id: 41,
      secret:
        "I've convinced my friends that I have a secret talent for juggling, but I can only juggle two balls.",
      emScore: 5,
      username: "jugglingenthusiast",
      timestamp: "2023-06-27 04:07:51 utc",
    },
    {
      id: 42,
      secret:
        "I pretend to be a food blogger, taking pictures of my meals at restaurants even though I have no intention of posting them.",
      emScore: 6,
      username: "foodiepretender",
      timestamp: "2023-06-27 05:09:44 utc",
    },
    {
      id: 43,
      secret:
        "I've convinced my friends that I'm a great singer, but in reality, I can't hold a tune.",
      emScore: 5,
      username: "singingimpostor",
      timestamp: "2023-06-27 06:15:22 utc",
    },
    {
      id: 44,
      secret:
        "I've convinced my friends that I have a secret talent for beatboxing, but I can only make strange noises.",
      emScore: 4,
      username: "beatboxcharlatan",
      timestamp: "2023-06-27 07:07:11 utc",
    },
    {
      id: 45,
      secret:
        "I secretly wear a superhero cape under my clothes, just in case the world needs saving.",
      emScore: 6,
      username: "secrethero",
      timestamp: "2023-06-27 08:12:55 utc",
    },
    {
      id: 46,
      secret:
        "I've created a secret handshake with my best friend, and we use it whenever we meet, just to confuse others.",
      emScore: 3,
      username: "handshaketrickster",
      timestamp: "2023-06-27 09:08:39 utc",
    },
    {
      id: 47,
      secret:
        "I have a secret collection of cheesy romance novels hidden in the attic, and I read them when I need a guilty pleasure.",
      emScore: 4,
      username: "romancenoveladdict",
      timestamp: "2023-06-27 10:09:46 utc",
    },
    {
      id: 48,
      secret:
        "I've convinced my friends that I have a secret talent for magic tricks, but it's all sleight of hand.",
      emScore: 5,
      username: "magicianimpostor",
      timestamp: "2023-06-27 11:05:32 utc",
    },
    {
      id: 49,
      secret:
        "I have a secret collection of funny cat videos on my phone that I watch whenever I need a pick-me-up.",
      emScore: 3,
      username: "catvideocollector",
      timestamp: "2023-06-27 12:04:29 utc",
    },
    {
      id: 50,
      secret:
        "I pretend to be an art critic when visiting galleries, analyzing paintings even though I have no knowledge of art.",
      emScore: 4,
      username: "artcritiquefaker",
      timestamp: "2023-06-27 13:09:14 utc",
    },
  ],
};

//Index page
app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (localStorage.getItem(username)) {
    res.status(401).json({ error: "Username is already taken." });
  }
  localStorage.setItem(username, password);
  res.status(200).json({ success: "Successfully registered." });
});

//Get API Key
app.get("/generate-api-key", async (req, res) => {
  const token = crypto.randomUUID();
  // localStorage.clear();
  let keys = JSON.parse(localStorage.getItem("apiKeys")) || [];
  keys.push(token);
  localStorage.setItem("apiKeys", JSON.stringify(keys));
  res.json({ apiKey: token });
  console.log(keys);
});

app.post("/get-auth-token", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!localStorage.getItem(username)) {
    res.status(404).json({ error: "User does not exist." });
  }
  const token = db.users.checkAlreadyHasToken(username);
  if (token) {
    res
      .status(404)
      .json({ error: "User has already issued token", token: token });
  }

  if (localStorage.getItem(username) === password) {
    const token = crypto.randomUUID();
    db.users.addRecord(username, token);
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ error: "Incorrect password." });
  }
});

//Get a random secret 0. NO AUTH
app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * data.secrets.length);
  res.json(data.secrets[randomIndex]);
});

//Get all secrets paginated 1. BASIC AUTH
app.get("/all", basicAuth, (req, res) => {
  const page = req.query.page;
  if (page) {
    res.json(data.secrets.slice((page - 1) * 10, page * 10 - 1));
  } else {
    res.json(data.secrets.slice(0, 9));
  }
});

//Get a random secret with a particular embarrassment score or higher
app.get("/filter", apiAuth, (req, res) => {
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
app.get(
  "/user-secrets",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const user = req.user.username;
    const filteredSecrets = db.users.getSecrets(user);
    console.log(filteredSecrets);
    if (filteredSecrets.length > 0) {
      res.json(filteredSecrets);
    } else {
      res
        .status(404)
        .json({ error: "Secrets not found for the given username." });
    }
  }
);

// Route to retrieve a specific secret by id
app.get(
  "/secrets/:id",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const id = req.params.id;
    const secret = data.secrets.find((secret) => secret.id === parseInt(id));
    secret
      ? res.json(secret)
      : res.status(404).json({ error: "Secret not found for the given id." });
  }
);

//POST
app.post(
  "/secrets",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const username = req.user.username;
    const secrets = db.users.getSecrets(username);
    const newId =
      secrets.length > 0 ? parseInt(secrets.slice(-1)[0].id) + 1 : 51;

    const newData = {
      id: newId,
      secret: req.body.secret,
      emScore: parseInt(req.body.score),
      username: username,
      timestamp: `${new Date()
        .toISOString()
        .replace(/.\d+Z$/g, " utc")
        .replace("T", " ")}`,
    };

    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const oldestEntryDate =
      secrets.length > 0 ? new Date(secrets[0].timestamp) : new Date();

    //If oldest entry date is more than a week old, clear cache.
    if (
      oldestEntryDate.setDate(oldestEntryDate.getDate()) <
      weekAgo.setDate(weekAgo.getDate())
    ) {
      localStorage.clear();
      db.users.deleteRecords();
    }
    db.users.addSecret(username, newData);

    res.status(200).json(newData);
  }
);

//PUT

app.put(
  "/secrets/:id",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const searchId = parseInt(req.params.id);
    const user = req.user.username;

    const newData = {
      id: searchId,
      secret: req.body.secret,
      emScore: parseInt(req.body.score),
      username: user,
      timestamp: `${new Date()
        .toISOString()
        .replace(/.\d+Z$/g, " utc")
        .replace("T", " ")}`,
    };
    if (db.users.updateRecord(user, searchId, newData)) {
      res.status(200).json(newData);
    } else {
      res.status(404).json({
        error: `Cannot update resource, given secret with id ${searchId} not found.`,
      });
    }
  }
);

//PATCH

app.patch(
  "/secrets/:id",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const searchId = parseInt(req.params.id);
    const user = req.user.username;

    const match = db.users.getSecretById(user, searchId);
    if (!match) {
      res.status(404).json({
        error: `Cannot update resource, given secret with id ${searchId} not found.`,
      });
    }

    const newData = {
      id: match.id,
      secret: req.body.secret || match.secret,
      emScore: parseInt(req.body.score) || match.emScore,
      username: user,
      timestamp: `${new Date()
        .toISOString()
        .replace(/.\d+Z$/g, " utc")
        .replace("T", " ")}`,
    };

    if (db.users.updateRecord(user, searchId, newData)) {
      res.status(200).json({ newData });
    } else {
      res.status(404).json({ error: "Cannot update record." });
    }
  }
);

//DELETE
app.delete(
  "/secrets/:id",
  passport.authenticate("bearer", { session: false }),
  (req, res) => {
    const searchId = parseInt(req.params.id);
    const user = req.user.username;
    if (!db.users.getSecretById(user, searchId)) {
      res.status(404).json({
        error: `Cannot delete resource, given secret with id ${searchId} not found.`,
      });
    }
    const result = db.users.deleteSecretWithId(user, searchId);
    console.log("result", result);
    if (result) {
      res.status(200).json({
        message: `Secret with ID ${searchId} has been deleted successfully.`,
      });
    } else {
      res.status(404).json({
        error: `There was an issue deleting this resource.`,
      });
    }
  }
);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
