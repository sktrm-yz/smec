export type BodyPart =
  | { type: "markdown"; content: string }
  | { type: "widget"; name: string };

/** 本文中の {{widget:name}} マーカーで分割し、Markdown とウィジェットの列にする */
export function splitBody(body: string): BodyPart[] {
  const parts: BodyPart[] = [];
  const pieces = body.split(/\{\{widget:([a-z0-9-]+)\}\}/g);
  pieces.forEach((piece, i) => {
    if (i % 2 === 1) {
      parts.push({ type: "widget", name: piece });
    } else if (piece.trim() !== "") {
      parts.push({ type: "markdown", content: piece });
    }
  });
  return parts;
}
