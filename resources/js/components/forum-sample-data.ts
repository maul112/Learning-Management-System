import type { Discussion } from '@/types';

export const FORUM_SAMPLE_DISCUSSIONS: Discussion[] = [
  {
    id: 'discussion-1',
    title: 'How to implement authentication in Next.js?',
    content: `# Authentication in Next.js

I'm trying to implement authentication in my Next.js application and I'm not sure which approach to take. I've looked at:

- NextAuth.js
- Auth0
- Firebase Authentication
- Custom JWT solution

Has anyone implemented authentication in their Next.js app? What approach did you use and why?

I'm particularly interested in solutions that work well with the App Router.

\`\`\`javascript
// Example of what I'm trying to do
import { getServerSession } from "next-auth/next"

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return <div>Welcome {session.user.name}!</div>
}
\`\`\`

Any help would be appreciated!`,
    category: 'question',
    user: {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z',
    replies: [
      {
        id: 'reply-1',
        content:
          "I've used NextAuth.js and it works great with App Router. The documentation is excellent and it supports many providers out of the box.",
        userId: 'user-2',
        createdAt: '2023-05-15T11:15:00Z',
        updatedAt: '2023-05-15T11:15:00Z',
        likes: 3,
      },
      {
        id: 'reply-2',
        content: `I recommend NextAuth.js as well. Here's a simple example:

\`\`\`javascript
// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
\`\`\`

This has been working well for me in production.`,
        userId: 'user-3',
        createdAt: '2023-05-15T12:45:00Z',
        updatedAt: '2023-05-15T12:45:00Z',
        likes: 5,
      },
    ],
    likes: 8,
    isSolved: true,
  },
  {
    id: 'discussion-2',
    title: 'Best practices for state management in React',
    content: `I'm working on a medium-sized React application and I'm trying to decide on the best approach for state management. Currently, I'm using a mix of:

- React Context API for global state
- useState for component-level state
- useReducer for more complex state logic

But I'm wondering if I should introduce Redux or another state management library as the application grows.

What are your thoughts on state management in React in 2023? Is Redux still relevant or are there better alternatives?`,
    category: 'general',
    user: {
      id: 'user-2',
      name: 'Sarah Miller',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    createdAt: '2023-05-10T14:20:00Z',
    updatedAt: '2023-05-10T14:20:00Z',
    replies: [
      {
        id: 'reply-3',
        content:
          'I think your current approach is solid. React Context + useState/useReducer is sufficient for many applications. I would only reach for Redux or another library if you start experiencing performance issues or if your state logic becomes too complex.',
        userId: 'user-1',
        createdAt: '2023-05-10T15:30:00Z',
        updatedAt: '2023-05-10T15:30:00Z',
        likes: 2,
      },
    ],
    likes: 5,
    isSolved: false,
  },
  {
    id: 'discussion-3',
    title: 'Useful resources for learning TypeScript',
    content: `# TypeScript Learning Resources

I've been collecting resources for learning TypeScript and thought I'd share them with everyone:

## Official Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## Courses
- TypeScript: The Complete Developer's Guide (Udemy)
- Understanding TypeScript (Udemy)
- Programming TypeScript (O'Reilly book)

## Articles and Tutorials
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)

Hope this helps anyone looking to learn TypeScript!`,
    category: 'resource',
    user: {
      id: 'user-3',
      name: 'David Chen',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    createdAt: '2023-05-05T09:15:00Z',
    updatedAt: '2023-05-05T09:15:00Z',
    replies: [
      {
        id: 'reply-4',
        content:
          "Thanks for sharing! I'd also recommend Matt Pocock's TypeScript tutorials on YouTube. They're excellent for beginners.",
        userId: 'user-1',
        createdAt: '2023-05-05T10:20:00Z',
        updatedAt: '2023-05-05T10:20:00Z',
        likes: 1,
      },
      {
        id: 'reply-5',
        content:
          "The TypeScript documentation is really good, but I found Josh Goldberg's 'Learning TypeScript' book to be the most helpful resource when I was starting out.",
        userId: 'user-2',
        createdAt: '2023-05-05T11:45:00Z',
        updatedAt: '2023-05-05T11:45:00Z',
        likes: 3,
      },
    ],
    likes: 12,
    isSolved: false,
  },
  {
    id: 'discussion-4',
    title: 'How to optimize React component rendering?',
    content: `I'm noticing some performance issues in my React application, especially with components that render large lists or complex UI elements.

What are some strategies to optimize React component rendering? I've heard about:

- React.memo
- useMemo and useCallback
- Virtualization for long lists

But I'm not sure when and how to apply these techniques effectively. Any advice or examples would be helpful!`,
    category: 'question',
    user: {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    createdAt: '2023-04-28T16:40:00Z',
    updatedAt: '2023-04-28T16:40:00Z',
    replies: [],
    likes: 3,
    isSolved: false,
  },
  {
    id: 'discussion-5',
    title: 'Introducing myself to the community',
    content: `# Hello everyone!

I'm new to this community and wanted to introduce myself. I'm a frontend developer with 2 years of experience, primarily working with React and TypeScript.

I'm currently learning Next.js and exploring server components and the App Router. I'm excited to be part of this community and looking forward to learning from all of you!

What are you all working on currently?`,
    category: 'general',
    user: {
      id: 'user-2',
      name: 'Sarah Miller',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    createdAt: '2023-04-20T11:10:00Z',
    updatedAt: '2023-04-20T11:10:00Z',
    replies: [
      {
        id: 'reply-6',
        content:
          "Welcome to the community, Sarah! I'm also working with Next.js and the App Router. It's been a learning curve but I'm enjoying it so far.",
        userId: 'user-3',
        createdAt: '2023-04-20T12:05:00Z',
        updatedAt: '2023-04-20T12:05:00Z',
        likes: 1,
      },
    ],
    likes: 7,
    isSolved: false,
  },
];
