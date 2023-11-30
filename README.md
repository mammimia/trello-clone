# Trello Clone App

This is a Trello Clone App project. It was developed for learning purposes.

## Tech Stack

- Next.js 14
- Server Actions
- Clerk for Authentication
- Prisma
- Tailwind
- Stripe
- MySQL

## Project Initialization Steps

Create an clark account and application in it.
Create .env file in project directory. You need to fill variables below in that file.

```bash
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${PUBLISHABLE_KEY}
  CLERK_SECRET_KEY=${SECRET_KEY}
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=${SIGN_IN_URL}
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=${SIGN_UP_URL}
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=${AFTER_SIGN_IN_URL}
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=${AFTER_SIGN_UP_URL}
  DATABASE_URL=${DATABASE_URL}
  NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=${NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}
  STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
  STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET} -> This will generated after forwarding event to webhook.
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
```

## Installation

To install this project follow the steps after cloning.

```bash
  npm install
```

Need to forward event to webhook.

```bash
  stripe listen --forward-to localhost:3000/api/webhooks
```

Then to start app

```bash
  npm run dev
```

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://mammimia.github.io/portfolio/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muhammed-ali-aydin/)
