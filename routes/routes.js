let userNames = require("../names .json");

let MAX_RESULTS = 5000;

exports.index = function (req, res) {
  res.send("Random User API");
};
exports.api = function (req, res) {
  this.results = req.query.results;
  this.seed = req.query.seed;
  res.send(generatedUsers(this.results, this.seed));
};

function generatedUsers(results = 5, seed) {
  this.results = results;

  if (this.results > MAX_RESULTS) {
    this.results = MAX_RESULTS;
  }

  this.seed = seed;

  let rand = require("random-seed").create(this.seed);

  let gender;
  let picRand;
  let picNum;
  let genRand;
  let firstName, lastName, address, city, state, zip;
  let username;

  let names = {
    results: [],
  };

  for (let i = 0; i < this.results; i++) {
    genRand = rand(2);
    picRand = rand(40) + 1;

    if (picRand < 10) {
      picNum = `00${picRand}`;
    } else {
      picNum = `0${picRand}`;
    }

    if (genRand == 0) {
      gender = "male";
      picLarge = "http://localhost:3000/images/men/m" + picNum + ".jpg";
      picMedium = "http://localhost:3000/images/men/medium/m" + picNum + ".jpg";
      firstName = userNames.male_names[rand(userNames.male_names.length)];
    } else {
      gender = "female";
      picLarge = "http://localhost:3000/images/women/f" + picNum + ".jpg";
      picMedium =
        "http://localhost:3000/images/women/medium/f" + picNum + ".jpg";
      firstName = userNames.female_names[rand(userNames.female_names.length)];
    }

    lastName = userNames.last_names[rand(userNames.last_names.length)];

    address =
      rand(10000) +
      " " +
      userNames.last_names[rand(userNames.last_names.length)] +
      " " +
      userNames.street_types[rand(userNames.street_types.length)];

    city =
      userNames.last_names[rand(userNames.last_names.length)] +
      userNames.city_endings[rand(userNames.city_endings.length)];

    state = userNames.states[rand(userNames.states.length)];

    zip = rand.intBetween(10000, 99999);

    username =
      userNames.username_a[rand(userNames.username_a.length)] +
      "_" +
      userNames.username_b[rand(userNames.username_b.length)] +
      (rand(100) + 1);

    email =
      firstName[0].toLowerCase() +
      lastName.toLowerCase() +
      rand(100) +
      "@" +
      userNames.emails[rand(userNames.emails.length)];

    phoneNumber = "" + rand.intBetween(1000000000, 9000000000);
    let matched = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    phoneNumber = `(${matched[1]}) ${matched[2]}-${matched[3]}`;

    let person = {
      gender: gender,
      name: {
        first: firstName,
        last: lastName,
      },
      location: {
        street: address,
        city: city,
        state: state,
        postcode: zip,
      },
      email: email,
      login: {
        username: username,
      },
      phone: phoneNumber,
      picture: {
        large: picLarge,
        medium: picMedium,
      },
    };
    names.results.push(person);
  }
  return names;
}
