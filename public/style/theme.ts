import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    cardListBgColor: string;
    cardBgColor: string;
  }
}

export const DefaultTheme = {
  bgColor: "#F8F6F4",
  cardListBgColor: "#EAEAEA",
  cardBgColor: "#F4F2DE",
};
// 마크업 요소가 있으면 .tsx
// 마크업 요소가 없다면 .ts
