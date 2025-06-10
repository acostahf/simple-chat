# Simple Chat

A modern AI chat application featuring multiple AI models including GPT-4, Claude, Gemini, and more in one beautiful interface.

## 🚀 Features

### Core Requirements ✅

- **Chat with Various LLMs**: Support for multiple AI models via OpenRouter (GPT-4, Claude, Gemini, etc.)
- **Authentication & Sync**: Clerk authentication with chat history sync across devices
- **Browser Friendly**: Fully responsive web app that works on all modern browsers
- **Easy to Try**: Simple onboarding flow with intuitive UI/UX

### Key Features

- 🤖 **Multiple AI Models**: Access GPT-4, Claude 3.5, Gemini Pro, Llama 3.1, and more
- 🔄 **Real-time Streaming**: Live streaming responses for better user experience
- 💾 **Persistent Chat History**: All conversations saved and synced across devices
- 🎨 **Modern UI/UX**: Beautiful, responsive design with dark/light mode support
- 🔍 **Search & Organization**: Search through chat history and organize conversations
- 📱 **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🔒 **Secure & Private**: End-to-end encryption with Clerk authentication
- ⚡ **Fast Performance**: Built with Next.js 14+ and optimized for speed

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Convex (database/backend), OpenRouter API
- **Authentication**: Clerk Auth
- **State Management**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with class-variance-authority

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── chat/[id]/page.tsx
│   │   ├── history/page.tsx
│   │   └── settings/page.tsx
│   ├── api/chat/route.ts         # Chat API endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── features/                     # Feature-focused architecture
│   ├── auth/                     # Authentication features
│   ├── chat/                     # Chat functionality
│   ├── conversations/            # Conversation management
│   ├── models/                   # AI model configuration
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility libraries
│   ├── convex.ts
│   ├── clerk.ts
│   ├── utils.ts
│   └── constants.ts
├── convex/                       # Convex backend
│   ├── schema.ts
│   ├── auth.ts
│   ├── conversations.ts
│   ├── messages.ts
│   └── users.ts
└── middleware.ts                 # Clerk middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Clerk account
- Convex account
- OpenRouter API key

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd simple-chat
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up Convex**

    ```bash
    npx convex dev
    ```

    This will prompt you to create a Convex account and give you your `NEXT_PUBLIC_CONVEX_URL`.

4. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    # Convex Database
    NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Clerk Frontend API URL (required for Convex auth integration)
    # Get this from Clerk Dashboard > API Keys > Frontend API URL
    # Development: https://verb-noun-00.clerk.accounts.dev
    # Production: https://clerk.<your-domain>.com
    CLERK_FRONTEND_API_URL=https://verb-noun-00.clerk.accounts.dev

    # OpenRouter API (for AI models)
    OPENROUTER_API_KEY=sk-or-v1-...
    ```

5. **Configure Clerk for Convex**

    In your Clerk Dashboard:

    - Go to **JWT Templates**
    - Click **New template**
    - Select **Convex** template
    - **Important**: Do NOT rename the token - it must be called `convex`
    - Copy the **Issuer URL** and use it as `CLERK_FRONTEND_API_URL`

6. **Run the development server**

    ```bash
    npm run dev
    ```

7. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000)

### Getting API Keys

#### Convex Database

1. Run `npx convex dev` in your project
2. Follow the prompts to create a Convex account
3. Your `NEXT_PUBLIC_CONVEX_URL` will be displayed in the terminal
4. Copy it to your `.env.local` file

#### Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Go to **API Keys** in the dashboard
4. Copy your **Publishable Key** (`pk_test_...`) and **Secret Key** (`sk_test_...`)
5. Go to **JWT Templates** > **New template** > **Convex**
6. **Do NOT rename the token** - keep it as `convex`
7. Copy the **Issuer URL** for `CLERK_FRONTEND_API_URL`

#### OpenRouter API

1. Go to [openrouter.ai](https://openrouter.ai)
2. Create an account and generate an API key
3. Add credits to your account for API usage

## 🎯 Usage

### Starting a Conversation

1. Sign up or sign in to your account
2. Click "New Chat" to start a conversation
3. Select your preferred AI model from the dropdown
4. Type your message and press Enter or click Send
5. Watch as the AI responds in real-time with streaming

### Managing Conversations

- **Rename**: Click the three dots menu next to any conversation
- **Delete**: Remove conversations you no longer need
- **Search**: Use the search bar to find specific conversations
- **Switch Models**: Change AI models mid-conversation

### Supported AI Models

- **GPT-4 Omni** (OpenAI) - Fast and capable
- **Claude 3.5 Sonnet** (Anthropic) - Excellent reasoning and coding
- **Gemini Pro 1.5** (Google) - Large context window
- **Llama 3.1 70B** (Meta) - Open-source alternative
- **Claude 3 Haiku** (Anthropic) - Fast and cost-effective

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**

    ```bash
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```

2. **Deploy to Vercel**

    - Go to [vercel.com](https://vercel.com)
    - Import your GitHub repository
    - Add your environment variables
    - Deploy!

3. **Set up Convex for production**
    ```bash
    npx convex deploy
    ```

### Environment Variables for Production

Make sure to add all environment variables in your Vercel dashboard:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOY_KEY`
- `NEXT_PUBLIC_OPENROUTER_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏗️ Architecture

This project showcases modern web development practices with:

- **Type Safety**: Full TypeScript implementation
- **Modern Architecture**: Feature-focused structure with proper separation of concerns
- **Performance**: Optimized for speed with Next.js 14+ and React Query
- **User Experience**: Beautiful, responsive design with real-time features
- **Scalability**: Built to handle multiple users and conversations efficiently

## 🙏 Acknowledgments

- [T3 Stack](https://create.t3.gg/) for inspiration
- [OpenRouter](https://openrouter.ai) for AI model access
- [Clerk](https://clerk.com) for authentication
- [Convex](https://convex.dev) for the backend
- [Vercel](https://vercel.com) for hosting

---

Built with ❤️ for modern AI chat experiences
