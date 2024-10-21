import * as vscode from "vscode";
import ajax from "./request";

export const getHotSearch = async () => {
  const url = "https://weibo.com/ajax/side/hotSearch";
  const res = await ajax("GET", url);
  const topHot = res?.data?.realtime || [];
  const isFail = typeof res == "string";
  return {
    code: isFail ? -1 : 0,
    data: isFail
      ? res
      : topHot.map((item: any) => {
          return { label: item?.note, id: item?.mid };
        }),
  };
};

export const getWyHot = async () => {
  const url = "https://weibo.com/ajax/side/entertainment";
  try {
    const res = await ajax("GET", url);
    console.log("🚀 ~ getWyHot ~ res:", res);
    const topHot = res?.data?.band_list || [];
    const isFail = typeof res == "string";
    return {
      code: isFail ? -1 : 0,
      data: isFail
        ? res
        : topHot.map((item: any) => {
            return { label: item?.note, id: item?.note };
          }),
    };
  } catch (err) {
    return {
      code: -1,
    };
  }
};

export const getZh = async () => {};

export const getNews = async () => {
  const url = "https://weibo.com/ajax/side/news";
  try {
    const res = await ajax("GET", url);
    const topHot = res?.data?.band_list || [];
    return {
      code: typeof res == "string" ? -1 : 0,
      data: topHot.map((item: any) => {
        return { label: item?.topic, id: item?.topic };
      }),
    };
  } catch (err) {
    return {
      code: -1,
    };
  }
};

export const getHotDetail = async ({
  title,
  page,
}: {
  title: string;
  page?: number;
}) => {
  const config = vscode.workspace.getConfiguration("fishTools");
  if (!config.cookie) {
    vscode.window.showErrorMessage("未设置cookie");
    return;
  }

  const url = `https://s.weibo.com/weibo?q=%23${encodeURIComponent(
    title
  )}%23&topic_ad=&page=${page || 1}`;

  return ajax(
    "GET",
    url,
    {},
    { Cookie: config.cookie, "Content-Type": "text/html; charset=utf-8" }
  );
};
