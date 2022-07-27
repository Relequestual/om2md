# Organization Members 2 Markdown - om2md
[![Project Type: Toy Badge](https://img.shields.io/badge/project%20type-toy-blue)](https://project-types.github.io/#toy)
[![Project Status: Concept - Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](https://www.repostatus.org/badges/latest/concept.svg)](https://www.repostatus.org/#concept)
![GitHub](https://img.shields.io/github/license/relequestual/om2md)
![GitHub last commit](https://img.shields.io/github/last-commit/relequestual/om2md)

## What is this?
A small CLI tool to create a Markdown version of the organizational members of a GitHub project.

Requires the JSON export file from your orgs `/people` page.
(https://github.com/orgs/<ORG NAME>/people)

## Why?

This was requested for JSON Schema... twice.
https://github.com/json-schema-org/community/issues/188
https://github.com/json-schema-org/community/issues/193

## Useage

Node.js and Yarn requirements are located in package.json.

Once git cloned locally, run `yarn` to install dependencies.

Run `node om2md.js <file.json>` where the JSON file is your previously exported JSON of organizational members.

Check the output folder for your markdown table.

## What about...

Could this use the GitHub API to get collaborators as well as org members?

It could, but it doesn't. Maybe if time allows at some point later.
The GitHub API also provides more data that could be reported such as repo access and avatar.

Could
