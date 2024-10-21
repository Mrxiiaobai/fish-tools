export const analyze = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const boxElements = doc.querySelectorAll(".woo-box-flex")[0];
  // 遍历获取到的元素列表，并逐个输出它们的 HTML 内容

  const divElements = boxElements.querySelectorAll(
    '[action-type="feed_list_item"]'
  );
  let arr: any = [];

  for (let i = 0; i < divElements.length; i++) {
    const divElement = divElements[i];
    const aElement = divElement.querySelector("a.name");
    const nickName = aElement?.textContent?.trim();
    let times = "";
    let content = "";

    const formElements = divElement.querySelectorAll("div.from a");

    const feedPElements = divElement.querySelector(
      'p[node-type="feed_list_content"]'
    );

    const forwardElement = divElement.querySelector(
      'a[action-type="feed_list_forward"]'
    );
    console.log(forwardElement);

    const commentElement = divElement.querySelector(
      'a[action-type="feed_list_comment"]'
    );
    const likeElement = divElement.querySelector(
      'a[action-type="feed_list_like"]'
    );

    const feeedElements = feedPElements?.querySelectorAll("a") || [];

    for (let j = 0; j < formElements.length; j++) {
      const element = formElements[j];
      times += element?.textContent?.trim() + " ";
    }

    for (let j = 0; j < feeedElements.length; j++) {
      const element = feeedElements[j];
      content += element?.textContent?.trim() + " ";
    }

    content += feedPElements?.textContent?.trim();

    const forward = forwardElement?.textContent?.trim();
    const comment = commentElement?.textContent?.trim();
    const like = likeElement?.textContent?.trim();

    arr.push({
      nickName,
      times,
      content,
      forward,
      comment,
      like,
    });
  }

  // 输出结果
  console.log(arr);
  return arr;
};
