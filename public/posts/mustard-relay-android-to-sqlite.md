---
title: "Mustard: Piping My Phone Into My Knowledge Store"
date: 2026-04-05 00:00:00
tags:
- Mustard
- MCP
- SQLite
- AWS
- SQS
- Android
- TypeScript
- Terraform
featured: true
---

## The Problem

AI agents that help me code and plan have no memory. Every new session starts blank. I wanted a persistent store they could read and write to. Somewhere todos, ideas, people notes, daily logs, and learnings accumulate over time and stay connected to each other.

That's mustard. A SQLite database. A Model Context Protocol (MCP) server on top so any AI tool can query it like a function call. A CLI for the terminal. A TUI for browsing.

This post is about the most recent addition: a pipeline that lets me push content from my Android phone directly into that database.

## What Mustard Is

One SQLite table. Six record types. A full-text search index. A links table that acts as a knowledge graph. A todo can be linked to a person, a learning to an idea.

The MCP server exposes 11 tools over STDIO. Tools like `get_context` (a record plus its graph neighbours), `search_records` (full-text across everything), `daily_summary` (what happened today). Any AI tool that speaks MCP can use them.

A CLI (`mustard create`, `mustard search`, `mustard list`) gives the same access from the terminal. A terminal UI (`mtui`) lets you browse with arrow keys.

## How It Got Here

Three structural changes before the relay.

**Monorepo.** The code started across three separate repos: `mustard-data`, `mustard-mcp`, `mustard-tui`. I consolidated into one. Changes to the data layer now propagate to everything automatically.

**Core package.** The MCP server had data-access code baked in. I extracted it into a shared `core/` TypeScript library. One place to fix a query bug, one place to add a record type. The MCP server, CLI, and TUI all import from it.

**CLI.** Once core existed, the CLI became a thin dispatcher over it. Thirty-odd commands, all typed, all hitting the same layer.

## The Relay

Mustard lived on my Mac. Ideas that came to me on my phone stayed on my phone. I wanted to close that gap.

The relay is a pipeline: Android share sheet → AWS API Gateway → SQS → a sync daemon → mustard core → SQLite.

Think of SQS as a post box on the street. I drop a message in from my phone. It sits in the box. Every 60 seconds a daemon comes by, collects whatever's in there, and delivers it. If the daemon is offline for a few hours, the messages just wait in the box. Nothing is lost.

That's the key design choice. The daemon polls rather than receiving webhooks. That means it works behind a home network with no inbound ports open. Reliability for free, at the cost of a 60-second delay.

**Typed envelopes.** Before writing any transport code, I defined the message contracts: a JSON Schema envelope with a `type` field. Like putting a label on a package before it enters the pipe. The daemon reads the label and dispatches to the right handler without opening the package. New message types don't change the transport; they just add a handler.

**Android app.** A minimal Kotlin app that registers as a share target. Select text anywhere on Android, tap Share, pick Mustard. Built using Docker with the `thyrlian/android-sdk` image. No Android Studio needed. Installed via ADB. Fiddly once, easy after.

**Cloud infrastructure.** API Gateway, SQS queue, dead-letter queue, IAM role, API key. All in Terraform. One `terraform apply` to deploy. Free tier at my usage level.

## How It Was Built

I use an autonomous build loop: a Claude Code agent that takes a phase spec (user stories with done-when criteria), iterates through tasks, runs tests, and marks them complete. I write the spec and review the PR. The loop does the implementation work.

Each phase produces a retrospective. Lessons feed into a `LEARNINGS.md` file the loop reads before proposing solutions the next time around. It compounds.

A longer post on this is worth writing separately.

## CI and Branch Protection

The last piece: GitHub Actions with conditional per-domain triggering. Changes to `relay/` only run the relay test suite. Changes to `core/` run core tests. Branch protection on `main` requires checks to pass.

Small, but it closes the loop on confidence.

## What's Next

One handler exists today: `research_request`. The next one is simpler. Share any text from Android and it lands as a mustard record. That's the daily-use loop I'm working toward: phone as input device, mustard as the store, AI agents as the readers.

---

*The repo is at [github.com/Jaxsbr/mustard](https://github.com/Jaxsbr/mustard)*
