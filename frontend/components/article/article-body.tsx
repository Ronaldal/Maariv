type ArticleBodyProps = {
  body: string;
};

/**
 * Renders article HTML-ish body as paragraphs (source uses CRLF breaks).
 */
export function ArticleBody({ body }: ArticleBodyProps) {
  const paragraphs = body
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-4 text-base leading-relaxed sm:text-lg">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-pretty">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
