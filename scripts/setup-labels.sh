#!/usr/bin/env bash
# Creates the labels the pipeline uses. Run once, from the repo folder, after `gh auth login`.
set -euo pipefail

create() { gh label create "$1" --color "$2" --description "$3" --force; }

create story                "C5DEF5" "A user story"
create ready                "0E8A16" "Story is ready — starts the build agent"
create building             "FBCA04" "Build agent is working on it"
create in-review            "1D76DB" "PR open and being reviewed"
create ai-approved          "0E8A16" "AI reviewer found no blocking issues"
create ai-changes-requested "D93F0B" "AI reviewer found blocking issues"
create needs-human          "B60205" "The agents stopped — needs you"

echo "Labels ready."
