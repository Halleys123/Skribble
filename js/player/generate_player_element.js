import { extractAccentColor } from "./extractAccentColor.js";
import { toHSL } from "../chats/color_handle/toHSL.js";
import { toHEX } from "../chats/color_handle/toHEX.js";

function generate_player_element(name, avatar, rank, score) {
  const player_div = document.createElement("div");
  player_div.classList.add("player");

  const left = document.createElement("div");
  left.classList.add("left");

  const rank_div = document.createElement("span");
  rank_div.classList.add("rank");
  rank_div.textContent = "#" + rank;

  const avatar_div = document.createElement("div");
  avatar_div.classList.add("avatar");
  avatar_div.innerHTML = avatar;

  // const dummy_div = document.createElement("div");
  // dummy_div.querySelector("svg").insertAdjacentHTML(
  //   "afterstart",
  //   `<filter id="blurMe">
  //     <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
  //   </filter>`
  // );
  // dummy_div.querySelector("svg").setAttribute("filter", "url(#blurMe)");

  const details = document.createElement("div");
  details.classList.add("details");

  const name_div = document.createElement("span");
  name_div.classList.add("name");
  name_div.textContent = name;

  const score_span = document.createElement("span");
  score_span.classList.add("score");
  score_span.textContent = score;

  // let accentColor = extractAccentColor(avatar);

  // accentColor = toHSL(accentColor);
  // accentColor.l = 80;
  // accentColor = toHEX(accentColor);

  // player_div.style.backgroundColor = accentColor;

  left.insertAdjacentElement("afterbegin", avatar_div);
  left.insertAdjacentElement("beforeend", details);
  details.insertAdjacentElement("afterbegin", name_div);
  details.insertAdjacentElement("beforeend", score_span);

  player_div.insertAdjacentElement("afterbegin", left);
  player_div.insertAdjacentElement("beforeend", rank_div);

  return player_div;
}

export { generate_player_element };
