export const googleAdsensePublisherId = "ca-pub-5496946968214683";

export const googleAdsenseScriptUrl =
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsensePublisherId}`;

export const googleAdsenseHeadMarkup = (): string => `
    <script async src="${googleAdsenseScriptUrl}" crossorigin="anonymous"></script>`;
