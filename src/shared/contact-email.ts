const contactKey = 73;
const contactCode = [
    42, 38, 39, 61, 40, 42, 61, 9, 58, 61, 44, 40,
    36, 100, 44, 39, 46, 32, 39, 44, 103, 38, 59, 46,
];

export const contactAddress = (): string => contactCode
    .map((value) => String.fromCharCode(value ^ contactKey))
    .join("");

export const contactEmailHref = (subject?: string, body?: string): string => {
    const query = new URLSearchParams();
    if (subject) query.set("subject", subject);
    if (body) query.set("body", body);
    const suffix = query.size > 0 ? `?${query.toString()}` : "";
    return `mailto:${contactAddress()}${suffix}`;
};
