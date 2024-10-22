# React + Vite Project

This project provides a minimal setup to get React working with Vite, including Hot Module Replacement (HMR) and ESLint rules.

## Table of Contents
- [React + Vite Project](#react--vite-project)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Available Scripts](#available-scripts)
  - [Using Vite Plugins](#using-vite-plugins)
  - [Project Structure](#project-structure)
  - [Learn More](#learn-more)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v20.14 or above)
- [pnpm](https://pnpm.io/)

## Getting Started

1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies**
   ```sh
   pnpm install
   ```

3. **Run the Development Server**
   ```sh
   pnpm run dev
   ```
   This will start the development server and you can access the application at [http://localhost:3000](http://localhost:3000).

4. **Build for Production**
   ```sh
   pnpm run build
   ```
   This command bundles the project for production, generating optimized output in the `dist` folder.

5. **Preview Production Build**
   ```sh
   pnpm run preview
   ```
   You can use this command to locally preview the production build.

## Available Scripts

- **`dev`**: Starts the development server with HMR.
- **`build`**: Builds the project for production.
- **`preview`**: Previews the production build locally.

## Using Vite Plugins

This project includes two official plugins to get the most out of your React setup:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Uses Babel for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Uses SWC for Fast Refresh, offering faster builds compared to Babel.

To switch between these plugins, update the `vite.config.js` file accordingly.

## Project Structure

- **`src/`**: Contains the main application code.
  - **`main.jsx`**: The entry point of the React application.
  - **`components/`**: Common React components.
  - **`App.jsx`**: The root component.

- **`public/`**: Contains static assets like icons, images, and other public files.

- **`vite.config.js`**: Vite configuration file.

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vite Plugin React](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
- [SWC](https://swc.rs/)

Feel free to explore the above resources to deepen your understanding of the technologies used in this project.

