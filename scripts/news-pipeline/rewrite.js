// Calls Claude to rewrite a vendor announcement into a third-person news brief.
// Returns { headline, body }. An empty headline signals the rewriter refused —
// the caller should skip the item rather than publish it.

const Anthropic = require('@anthropic-ai/sdk');
const config = require('./config');

const client = config.anthropic.apiKey
  ? new Anthropic({ apiKey: config.anthropic.apiKey })
  : null;

const SYSTEM_PROMPT = `You are a CRM industry news writer for WeekCRM, a site in the style of TechCrunch.

Rewrite vendor announcements into third-person news briefs. Rules:

1. Start the body with "[Vendor name]" as the grammatical subject. Never use "we", "our", "us", or first person.
2. Factual and neutral. Strip marketing language ("powerful", "game-changing", "revolutionary", "seamlessly").
3. 80–150 words. Tight, declarative sentences.
4. Lead with what changed (the feature / price / launch) and who benefits.
5. If the source includes a price, date, or specific capability, keep it.
6. Produce a headline under 80 characters: "[Vendor] [verb] [what]" — e.g. "Attio adds AI-powered meeting actions".
7. End the body with a new paragraph: "Source: <Source URL>" — use the exact URL provided in the user message, no markdown, no rewording.

REFUSAL RULE:
If the source content is too thin, too promotional, or lacks any concrete facts
(feature details, numbers, prices, dates, capabilities) to produce a factual brief,
respond with exactly: {"headline": "", "body": ""}
Do NOT pad, infer, or invent details. It is better to return empty than to fabricate.

Output strictly as JSON:
{"headline": "...", "body": "..."}`;

async function rewriteItem({ vendorName, title, summary, content, url }) {
  if (!client) {
    // Dry-run fallback: produce a plausible rewrite locally so devs can see the format.
    const body = (content || summary || title || '').slice(0, 600);
    return {
      headline: `${vendorName} ${title.toLowerCase().replace(/^(we('re| are)|introducing)\s*/i, '')}`.slice(0, 80),
      body: `${vendorName} ${body} [DRY RUN — no API call made]`
    };
  }

  // Prefer the richer article body; fall back to meta summary, then title.
  const sourceBody = (content && content.trim())
    || (summary && summary.trim())
    || title
    || '';

  const userContent = `Vendor: ${vendorName}
Source URL: ${url}
Source title: ${title}
Source content:
${sourceBody}`;

  const res = await client.messages.create({
    model: config.anthropic.model,
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userContent }]
  });

  const text = res.content.map(b => b.type === 'text' ? b.text : '').join('').trim();
  return parseRewriteJson(text, vendorName, title);
}

function parseRewriteJson(text, vendorName, fallbackTitle) {
  // Be forgiving: find the first {...} block.
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    console.warn('  ⚠ rewriter returned non-JSON, treating as refusal');
    return { headline: '', body: '' };
  }
  try {
    const parsed = JSON.parse(match[0]);
    return {
      headline: (parsed.headline || '').trim(),
      body: (parsed.body || '').trim()
    };
  } catch {
    console.warn('  ⚠ rewriter JSON parse failed, treating as refusal');
    return { headline: '', body: '' };
  }
}

module.exports = { rewriteItem };
