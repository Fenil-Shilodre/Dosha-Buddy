# 🧘 Dosha Buddy: Discover Your Prakruti

Welcome to Dosha Buddy, an application designed to help you discover your unique Ayurvedic constitution (Prakruti). Using modern technology, this tool analyzes your physical, mental, and emotional traits to determine your primary dosha—whether you're primarily **Vata** (air & space), **Pitta** (fire & water), **Kapha** (earth & water), or a balanced combination.

This application offers two distinct methods for your assessment:
1.  **Conversational Discovery:** Engage in a natural, AI-driven chat. Share your experiences in your own words, and the AI will interpret your responses to identify your traits.
2.  **Structured Questionnaire:** Follow a traditional, guided assessment by answering specific multiple-choice questions about your characteristics.

No matter which path you choose, you'll receive a detailed analysis of your dosha percentages, an explanation of your constitution, and personalized wellness tips to help you find balance.

---

## ## Tech Stack

* **Frontend:** React 18, React Router 6, Vite, TypeScript, TailwindCSS
* **UI Components:** shadcn/ui (built on Radix UI & TailwindCSS)
* **Backend:** Express, integrated with the Vite dev server
* **Core Logic:** Custom Ayurvedic trait and dosha calculation engine
* **Testing:** Vitest
* **Shared Types:** TypeScript aliases (`@/` for client, `@shared/` for shared)

---

## ## Key Features

* **Dual Assessment Modes:** Choose between an AI-powered chat (`ConversationInterface.tsx`) or a structured form (`QuestionnaireInterface.tsx`) to discover your prakruti.
* **AI-Powered Interpretation:** The conversational interface intelligently interprets natural language to identify and suggest Ayurvedic traits.
* **Detailed Prakruti Analysis:** Receive a comprehensive breakdown of your Vata, Pitta, and Kapha percentages, complete with a confidence score.
* **Personalized Results:** View your primary dosha, constitution type (e.g., Vata-Pitta, Tridoshic), and the key traits that contributed to your result.
* **Balancing Recommendations:** Get actionable, personalized tips for diet, lifestyle, and wellness tailored to your unique constitution.
* **Modern Full-Stack:** A complete SPA (Single Page Application) experience with a React frontend and an Express backend.

---

## ## Development Commands

To get the project running locally, use the following commands:

* **Install dependencies:**
    ```bash
    npm install
    ```

* **Start the development server (client + server):**
    ```bash
    npm run dev
    ```

* **Run Vitest tests:**
    ```bash
    npm run test
    ```

* **Check for TypeScript errors:**
    ```bash
    npm run typecheck
    ```

* **Build for production:**
    ```bash
    npm run build
    ```

* **Start the production server:**
    ```bash
    npm run start
    ```
