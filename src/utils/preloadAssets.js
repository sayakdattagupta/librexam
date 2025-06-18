export function extractUrls(obj, urls = new Set()) {
  if (typeof obj === "string" && obj.startsWith("http")) {
    urls.add(obj);
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => extractUrls(item, urls));
  } else if (typeof obj === "object" && obj !== null) {
    Object.values(obj).forEach((val) => extractUrls(val, urls));
  }
  return [...urls];
}

export async function preloadAssets(testJson) {
  const urls = extractUrls(testJson);

  const preloadPromises = urls.map((url) =>
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Bad status: ${r.status}`);
        return r.blob();
      })
      .catch((e) => {
        console.warn(`Failed to preload: ${url}`, e);
        return null;
      }),
  );

  await Promise.all(preloadPromises);
}
