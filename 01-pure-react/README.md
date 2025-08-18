# Pure React

A minimal React project that demonstrates how to use **React** without any build tools (like Babel, Webpack, or Vite).  
This project directly imports React and ReactDOM from a CDN and renders a live updating clock to the browser.

---
##  Project Overview

- Shows how to use React in its **pure form** (without JSX, bundlers, or transpilers).
- Demonstrates key React concepts:
    - **Components** (`App` function component).
    - **State Management** (`useState` to store and update the current time).
    - **Side Effects** (`useEffect` with `setInterval` to update the clock every second).
    - **Element Creation** using `React.createElement` instead of JSX.
---

## 🛠️ How It Works

1. **React and ReactDOM** are imported directly via CDN.
2. The `App` component:
    - Initializes `time` with the current local time.
    - Uses `useEffect` to start an interval that updates the time every second.
    - Renders a `<header>` element with a greeting and the live time.
3. The component is mounted using:
    
    ```js
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(React.createElement(App));
    ```

---

## Key Learning

- How to use React **without JSX**.
- Understanding what JSX really is: syntactic sugar for `React.createElement`.
- Seeing how React can run in its **simplest form** with just an HTML file.

---

## 📸 Demo Output

```
hello there 8/18/2025, 12:31:11 PM
```

(The time updates every second.)

---
## Run It

Simply open the `index.html` file in your browser—no build step required!
