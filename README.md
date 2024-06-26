# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

1. Make sure you have node installed. I used node v20.12.2
2. Open up the source code and create a .env file in the root directory
3. Make sure to have the following variables setup in the .env
   API_URL="https://sa.api.fastway.org"
   API_KEY="9f57d11554c24fb8f03a4875f513ce9f"
   API_COUNTRY_CODE="24"
   API_FRANCHISE_CODE="JNB"
   LOCATION_API_URL ="https://www.fastway.co.za/Umbraco/Api/Address/Locator/?RFCode=GRJ"
4. Next open a terminal and navigate to the projects source code directory
5. Run the following command in the terminal "npm run install"
6. Now in the same terminal you can run "npm run dev"
7. Now you should be able to access the running app at "http://localhost:3000"
