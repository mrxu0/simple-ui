import { describe, it, test, expect } from "vitest";
import { nextTick } from "vue";
import { Toast } from "../index";

// in order to test transitions, we need to use
// await rAF() after firing transition events.
export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};
const message = "你好";
const myDiv = "my-div";
const totalClass = "simple-toast";

describe("Toast - 接受参数为对象", async () => {
  test("message 值是否正确应用", async () => {
    const t1 = Toast(message);
    const result = document
      .querySelector(`.${totalClass}`)
      ?.innerHTML.includes(message);
    expect(result).toBeTruthy();
    t1.close();
  });

  test("多次调用是否生成对应数量的 dom", async () => {
    const t1 = Toast(message);
    const t2 = Toast(message);
    expect(
      document.querySelectorAll(`.${totalClass}`).length === 2
    ).toBeTruthy();
    t1.close();
    t2.close();
  });

  test("appendTo 接收 HTMLElemnt 是否在正确位置", async () => {
    const div = document.createElement("div");
    const t1 = Toast(message, {
      appendTo: div,
    });
    expect(!!div.querySelector(`.${totalClass}`)).toBeTruthy;
    t1.close();
  });

  test("appendTo 接收 string 是否在正确位置", async () => {
    const div = document.createElement("div");
    div.classList.add(myDiv);
    document.body.appendChild(div);
    const t1 = Toast(message, {
      appendTo: myDiv,
    });
    expect(
      !!document.body.querySelector(myDiv)?.querySelector(`.${totalClass}`)
    ).toBeTruthy;
    t1.close();
  });

  test("dangerouslyUseHTMLString 为 true, 内容是否变为了 html 片段", async () => {
    const div = document.createElement("div");
    const t1 = Toast(`<h1>你好</h1>`, {
      appendTo: div,
      dangerouslyUseHTMLString: true,
    });
    expect(!!div.querySelector("h1")).toBeTruthy;
    t1.close();
  });
});
