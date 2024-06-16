This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started /CLIENT

### set up client env.local at /client/.env.local

1. API_URL - local host ip address of that of another api
2. NEXT_PUBLIC_DRIFT_KEY - key for drift chat to enable dialog box
3. NEXT_PUBLIC_FIREBASE_CONFIG - strinfied version of the config object from firebase
4. AUTH_SECRET - used by next auth can be random string

```
API_URL=http://localhost:8000/api
NEXT_PUBLIC_DRIFT_KEY=""
#stringify the config and place here
NEXT_PUBLIC_FIREBASE_CONFIG="{"dfads":"fdsaf"}"
AUTH_SECRET="secret for next auth"
```

First, run the development server:

```bash
npm install

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
