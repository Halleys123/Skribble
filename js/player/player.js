import { generate_player_element } from "./generate_player_element.js";

const player_box = document.querySelector(".players");

const list = [
  {
    name: "arnav",
    score: 100,
    rank: 1,
    avatar_type: "bottts",
    version: "9.x",
  },
  {
    name: "saksham",
    score: 90,
    rank: 2,
    version: "9.x",
    avatar_type: "lorelei",
  },
  {
    name: "prathamesh",
    score: 80,
    rank: 3,
    avatar_type: "pixel-art",
    version: "9.x",
  },
  {
    name: "siddhant",
    score: 70,
    rank: 4,
    avatar_type: "bottts",
    version: "9.x",
  },
  {
    name: "sahil",
    score: 60,
    rank: 5,
    avatar_type: "lorelei",
    version: "9.x",
  },
];
function get_avatar(type, version, seed) {
  const valid_list = {
    versions: ["5.x", "6.x", "7.x", "8.x", "9.x"],
    type: ["bottts", "lorelei", "pixel-art"],
  };

  if (
    !valid_list.versions.includes(version) ||
    !valid_list.type.includes(type)
  ) {
    throw new Error("Version or Type is invalid");
  }

  return fetch(
    `http://localhost:3000/${version}/${type}/svg?seed=${seed}`
  ).then((response) => response.text()); // Convert to text (SVG is a string)
}

// get_avatar("bottts", "9.x", "arnavchhabra").then((value) => {
//   avatar.innerHTML = value;
// });

// loop through list and generate player element
list.forEach((player) => {
  get_avatar(player.avatar_type, player.version, player.name).then((value) => {
    const player_element = generate_player_element(
      player.name,
      value,
      player.rank,
      player.score
    );
    player_box.insertAdjacentElement("afterbegin", player_element);
  });
});
