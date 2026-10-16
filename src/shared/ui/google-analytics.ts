export const googleAnalyticsMeasurementId = "G-XWQ8E2PCST";

export const googleAnalyticsHeadMarkup = (): string => `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsMeasurementId}');
    </script>`;
