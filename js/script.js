import { canvas, aspect_ratio } from "./canvas/canvas.js";
import {
  input,
  parent_click_handler,
  submit_handler,
  enter_key_handler,
} from "./chats/message_handler.js";

const send_message_btn = document.querySelector(".input_chat .send_btn");
const input_parent = document.querySelector(".input_chat");

setTimeout(() => {
  canvas.width = canvas.clientHeight * aspect_ratio;
}, 1000);

input_parent.addEventListener("click", parent_click_handler);
input_parent.addEventListener("submit", (e) => {
  e.preventDefault();
  submit_handler();
});
send_message_btn.addEventListener("click", submit_handler);
input.addEventListener("keydown", enter_key_handler);
