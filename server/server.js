const app = require("./app.js");

const PORT = process.env.PORT || 4000;

// console.log = function () {};

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
