// Convert from HTML entities to JS UTF string
export const decodeToUTF = str => {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
}

// Convert unix time to readable time
export const createReadableDate = str => {
  return new Date(str * 1000).toDateString();
} 
