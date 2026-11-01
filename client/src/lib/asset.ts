/**
 * URL of an image in client/public/images/, respecting the site's base path
 * (the site may be served from a sub-path such as /menichu-vesmich/).
 */
export function img(name: string): string {
  return `${import.meta.env.BASE_URL}images/${name}`;
}
