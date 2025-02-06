// Function to extract OS and Device type from user-agent
export const getOsAndDevice = (userAgent) => {
  userAgent = userAgent || "";
  
  if (/Windows/i.test(userAgent)) return { os: "Windows", device: "desktop" };
  if (/Macintosh|MacOS/i.test(userAgent)) return { os: "macOS", device: "desktop" };
  if (/Linux/i.test(userAgent)) return { os: "Linux", device: "desktop" };
  if (/iPhone|iPad/i.test(userAgent)) return { os: "iOS", device: "mobile" };
  if (/Android/i.test(userAgent)) return { os: "Android", device: "mobile" };
  if (/PostmanRuntime/i.test(userAgent)) return { os: "Postman", device: "desktop" };

  return { os: "Other", device: "Other" };
};