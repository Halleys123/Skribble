import { generate_chat } from "./generate_chat_element.js";

const chat_box = document.querySelector(".chats");
const input = document.querySelector(".input_chat input");

function get_input() {
  let text = input.value;
  if (text.length > 0) {
    input.value = "";
    return text;
  }
  return null;
}

function parent_click_handler() {
  input.focus();
}
function enter_key_handler(e) {
  if (e.key === "Enter") {
    submit_handler();
  }
}

function submit_handler() {
  let text = get_input();
  if (text) {
    chat_box.appendChild(
      generate_chat({ name: "You", color: "#F0FFFF" }, text, new Date())
    );
  }
}

export { submit_handler, enter_key_handler, parent_click_handler, input };
