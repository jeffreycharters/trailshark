# Trailshark

## Introduction
I want to throw together a decent web application to show that I'm only somewhat a hack and not a total hack.

The purpose here is to crowdsource mountain bike trail status updates. Well, that's the initial purpose, then I hope to expand from there (see [longer-term expectations](#longer-term-expectations)). No active iterations of the site yet but I'll be sure to update this document with a URL when one becomes available.

## Tech Stack
- Database: [Prisma ORM](https://prisma.io) (with SQLite as database).
- Backend: [Sveltekit](https://kit.svelte.dev).
- Frontend: [Sveltekit](https://kit.svelte.dev).
- Other frameworks: [Tailwind](https://trailwindcss.com), [DaisyUI](https://daisyui.com).

## Longer-term expectations
- [ ] Trail status updates.
- [ ] Ride-calling + attendance.
- [ ] Open-source trail API.
- [ ] Organization hour tracking (volunteers, etc).
- [ ] Organization member tracking, memberships.

## Hold myself accountable
- [ ] writing unit/e2e tests?
- [ ] error handling?

For what it's worth, I actually went through the hassle of figuring out how to write unit tests using [Vitest](https://vitest.dev). The official Prisma docs really want you to mock the db calls, but I found it much easier to simply update the `package.json` scripts and some `.env` files to create a separate testing database.