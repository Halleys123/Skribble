import { toHSL } from "./color_handle/toHSL.js";
import { toHEX } from "./color_handle/toHEX.js";
import { is_valid_date } from "./is_valid_date.js";
import { extract_time } from "./extract_time.js";

/**
 * @description Generate chat message with given parameter
 * @param sent_by: object with assigned color and name
 * @param message: string message
 * @param time: string time format
 * @returns element with chat message
 */
function generate_chat(sent_by, message, time) {
  // check if is valid date
  let time_error = is_valid_date(time);
  if (!time_error) {
    throw new Error(
      "Invalid time format, Given time: " + time + " is not a valid date"
    );
  }
  // check if valid format of time
  let time_regex = /^\d{2}:\d{2}$/;
  if (!time_regex.test(time)) {
    time = extract_time(time);
  }
  //   <div class="chat flex row">
  //   <span class="chat_user">User 1</span>
  //   <span class="flex-1">Lorem</span>
  //   <span class="chat_time">12:00</span>
  // </div>
  let main_div = document.createElement("div");
  main_div.classList.add("chat", "flex", "row", "p-0-8", "gap-2");
  main_div.style.backgroundColor = sent_by.color;

  let user_span = document.createElement("span");
  let color_for_text = toHSL(sent_by.color);
  color_for_text.l = 40;
  user_span.style.color = toHEX(
    color_for_text.h,
    color_for_text.s,
    color_for_text.l
  );
  user_span.classList.add("chat_user");
  user_span.textContent = sent_by.name;

  let message_span = document.createElement("span");
  message_span.classList.add("flex-1");
  message_span.textContent = message;

  let time_span = document.createElement("span");
  time_span.classList.add("chat_time");
  time_span.textContent = time;

  main_div.appendChild(user_span);
  main_div.appendChild(message_span);
  main_div.appendChild(time_span);

  return main_div;
}

export { generate_chat };
