var dynamo = require("dynamodb");
const Joi = require("joi");
// dynamo.AWS.config.update({ region: "127.0.0.1" }); // region must be set
var Account = dynamo.define("Account", {
  hashKey: "email",

  // add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,

  schema: {
    email: Joi.string().email(),
    name: Joi.string(),
    age: Joi.number(),
    roles: dynamo.types.stringSet(),
    settings: {
      nickname: Joi.string(),
      acceptedTerms: Joi.boolean().default(false)
    }
  }
});
var BlogPost = dynamo.define("BlogPost", {
  hashKey: "email",
  rangeKey: "title",
  schema: {
    email: Joi.string().email(),
    title: Joi.string(),
    content: Joi.binary(),
    tags: dynamo.types.stringSet()
  }
});

dynamo.createTables(
  {
    BlogPost: { readCapacity: 5, writeCapacity: 10 },
    Account: { readCapacity: 20, writeCapacity: 4 }
  },
  function(err) {
    if (err) {
      console.log("Error creating tables: ", err);
    } else {
      console.log("Tables has been created");
    }
  }
);
