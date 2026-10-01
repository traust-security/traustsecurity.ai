# Deterministic and inferential tooling — how the harness mixes them

The harness applies deterministic tooling in the places where it belongs:
schema gates (`python3 -m traust.cli reporting validate`), state
management (`checkpoint`), deterministic dedup, Go-native fuzz targets, and the
triage accelerators — the citation gate
(`python3 -m traust.cli check citations`) and the symbol index
(`python3 -m traust.cli build symbol-index`,
`python3 -m traust.cli admin query-index`). The pre-scanners every audit
profile runs before the model reads a line, the candidate generators inside the
audit skills, and the routers and worklist builders described in
[routers.md](routers.md) all follow the same discipline. One organizing
principle governs where each kind of tool goes:

> **Spend CPU on enumeration and fact-retrieval; spend inference on judgment and
> novelty.**

The token sinks in the pipeline are not the clever parts. They are agents
re-deriving mechanical facts — call sites, file existence, path resolution —
through repeated grep. Judgment (adversarial verification verdicts, novel
cross-file logic-flaw discovery, threat modeling) is where the model earns its
cost and must not be displaced.

## The safety rule

For every integration: **a deterministic tool may route, gate, tag, or index —
never conclude.** Conclusions stay with the model; the model's conclusions stay
subject to deterministic consistency checks.

| A deterministic tool may… | Meaning | Examples in the harness |
|---|---|---|
| **route** | decide which lane, queue, or reviewer a unit of work goes to | the rescan router, the feed router, the findings routers, worklist builders |
| **gate** | refuse an artifact that fails a mechanical check, and say why | schema validation, the citation gate, the docs and skill gates, `install_traust --doctor` |
| **tag** | attach a mechanically derived fact to a unit of work | deterministic pre-scan hits recorded as `scanner_correlation`, coverage-diff stamps, model-routing stamps |
| **index** | precompute facts the model would otherwise re-derive by search | the symbol index, the portfolio graph, the findings database projection |

What a deterministic tool may **not** do: set a finding's validity, severity, or
disposition; suppress a finding; or write a baseline. A scanner hit is a
candidate with evidence attached. It becomes a finding only after an agent lane
verifies and files it, and a false-positive disposition is recorded only through
the ledger's adjudication path. The reverse holds too: a model's verdict is not
final until it passes the deterministic checks that guard its shape —
schema, citation resolution, identity stamping, soundness lint.

## How to place a new capability

Ask which side of the line the work sits on.

- **Enumeration or fact-retrieval** (list the call sites, resolve the path,
  confirm the file exists, count the changed lines, fetch the advisory): build
  it deterministically, run it before the model, and hand the model the result
  as data. Every such tool that replaces a round of agent grep repays itself on
  the first run.
- **Judgment or novelty** (is this reachable in practice, is this pattern a
  vulnerability in this codebase, what does an attacker do next, does this
  refutation hold): leave it to the model, and give the model the deterministic
  facts it needs rather than asking it to find them.
- **Both**: split it. The deterministic half produces candidates, contexts, or
  packets; the inferential half adjudicates. The diff lane is the model — a
  deterministic resolver and packet builder feed a bounded review.

## Worked example: patch verification

`/patch` is a clean instance of the "both — split it" case, and a useful one
because the split also marks the limit of what the deterministic half can
conclude.

- **Deterministic half — the fact differential.** Apply the candidate diff to a
  scratch worktree, re-run the scanner that produced the backing fact, record
  `fact_differential: cleared | persists | not-applicable: <reason>`. This
  *gates*: a persisting fact rejects the patch unless the reviewer articulates
  why the scanner is wrong. It is allowed to gate precisely because it
  concludes nothing about the fix — only about whether its own evidence still
  fires.
- **Inferential half — the blinded reviewer.** One reviewer subagent per diff,
  given only `{file, line, category}` plus the raw diff bytes. It never sees
  the finding's `description`, `recommendation`, or the patch author's
  `rationale`, so instructions embedded in finding prose cannot reach both the
  author and the gate. Whether the diff is a minimal, in-scope fix at the right
  layer is a judgment, and it stays with the model.

The safety rule holds in both directions here. The scanner may not declare the
patch good; the reviewer's verdict is not final until the diff passes the
deterministic checks that guard its shape. And the honest limit is recorded in
the skill itself: a cleared fact says the pattern is gone, not that the fix is
correct or minimal.

What is **missing** from this split, rather than mis-assigned: a deterministic
half that observes the target's *behaviour* before and after the patch, rather
than its scanner output. That exists only on the `vuln-pipeline` path (build →
reproduce → regress → re-attack). See
[disposition-ledger.md](disposition-ledger.md) §8a for what each patch path can
and cannot prove.

When the split is unclear, the safety rule decides: if the tool's output would
be read as a verdict, it is on the wrong side of the line.
