/**
 * Helper to convert Google Drive public sharing links to direct media links
 */
export function getGoogleDriveDirectLink(url: string, type: "image" | "video" | "audio" = "image"): string {
  if (!url) return "";

  // Regular expression to match Google Drive sharing URLs and extract the FILE_ID
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/file\/d\/)([a-zA-Z0-9_-]{25,})/;
  const match = url.match(driveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    if (type === "video" || type === "audio") {
      // Direct stream/download link for video or audio
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else {
      // Direct high-speed CDN view link for Google Drive images
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // If it's not a Google Drive link, return it as-is
  return url;
}
