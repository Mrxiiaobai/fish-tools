export enum CATEGORIESENUM {
  HOT = "hot",
  ENTERTAINMENT = "entertainment",
  NEWS = "news",
  ZHHOT = "zhhot",
  ZHTJ = "zhtj",
  // https://i.news.qq.com/web_feed/getHotModuleList
  TCNEWS = "tcnews",
}
export const categoryMap = {
  [CATEGORIESENUM.HOT]: "微博热搜",
  [CATEGORIESENUM.ENTERTAINMENT]: "微博文娱",
  [CATEGORIESENUM.NEWS]: "微博要闻",
};
