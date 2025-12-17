import { describe, expect, it } from "vitest";
import { auditSeo } from "./audit";

describe("auditSeo", () => {
  it("segnala meta description fuori range e keyword mancante", () => {
    const res = auditSeo({
      title: "Titolo senza keyword",
      metaDesc: "troppo corta",
      keywordPrimary: "AI per marketing",
      contentHtml: "<h1>Titolo</h1><h2>Sezione</h2><p>test</p>",
    });
    expect(res.score).toBeLessThan(100);
    expect(res.issues.some((i) => i.code === "META_DESC_LENGTH")).toBe(true);
    expect(res.issues.some((i) => i.code === "KEYWORD_MISSING")).toBe(true);
  });
});


