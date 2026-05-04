import { env } from "@/utils/env";
import { getPlaiceholder } from "plaiceholder";

async function getBase64(src: string): Promise<string> {
  try {
    const resolvedSrc = new URL(src, env.SITE_URL).toString();
    const res = await fetch(resolvedSrc);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch image: ${error.stack}`);
    } else {
      console.error(`Failed to fetch image: ${error}`);
    }
    return "";
  }
}

export async function getBlurredDataUrls(
  images: Array<{ url: string; alt: string; blurredDataUrl: string }>
) {
  const base64Promices = images.map((image) => getBase64(image.url));
  const base64Results = await Promise.all(base64Promices);

  const photosWithBlur = images.map((image, index) => {
    image.blurredDataUrl = base64Results[index];
    return image;
  });

  return photosWithBlur;
}
