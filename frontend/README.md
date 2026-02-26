
# VetPath Academy - Local Setup Guide

Welcome to the VetPath Academy LMS project. Follow these steps to get the app running on your machine.

## Prerequisites
- Node.js installed on your system.
- A Google Gemini API Key (get one at [ai.google.dev](https://ai.google.dev/)).

## Option 1: Quick Run (Using Vite)
1. **Create Project**:
   ```bash
   npm create vite@latest vetpath-academy -- --template react-ts
   cd vetpath-academy
   ```
2. **Install Dependencies**:
   ```bash
   npm install lucide-react recharts @google/genai
   ```
3. **Add Environment Variable**:
   Create a `.env` file in the root:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```
4. **Copy Files**:
   Replace the `src` folder content with the `.tsx` and `.ts` files provided in this output.
5. **Start Dev Server**:
   ```bash
   npm run dev
   ```

## Option 2: Static Server
If you use a simple static server like `serve`:
- You must manually replace `process.env.API_KEY` in `services/geminiService.ts` with your actual string key (not recommended for production).
- Run `npx serve` in the project root.

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Lucide Icons.
- **Charts**: Recharts for learning progress visualization.
- **AI Core**: Google Gemini API for skill translation, resume polishing, and interview coaching.
