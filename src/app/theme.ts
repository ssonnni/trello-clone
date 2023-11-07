import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    cardListBgColor: string;
    cardBgColor: string;
  }
}

export const DefaultTheme = {
  bgColor: "#339FFF",
  cardListBgColor: "#EAEAEA",
  cardBgColor: "#F7F7F7",
};
// 마크업 요소가 있으면 .tsx
// 마크업 요소가 없다면 .ts
