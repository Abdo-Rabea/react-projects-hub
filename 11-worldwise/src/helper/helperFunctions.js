const flagemojiToPNG = (flag) => {
  const tempFlag = flag ? flag : 98443197;
  var countryCode = Array.from(tempFlag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return `https://flagcdn.com/24x18/${countryCode}.png`;
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export { flagemojiToPNG, formatDate };
