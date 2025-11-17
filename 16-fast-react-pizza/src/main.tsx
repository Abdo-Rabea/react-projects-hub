import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

/**
 * what i have learned
 * 1. introducing ts for the first time in a project
 * 2. how to make profissional file structure (based on features)
 * 3. learn how to make AppLayout (don't have routes): this is the fixed part that is always visible and its children are rendered based in Outlet when its path match the url -> paths can really be anything
 * 3. react-router for fetching data
 * in previous project you have used:
 *    fetch on render : means that the request is fired off after the component render
 *    but now you are using: fetch as render: the request and component render are fired together
 * step:
 *    1. define the loader function -> it is convension to put the definition inside the component page
 *    2. provide the loader function to the react-router so that it can fire the request with the page start to render
 *    3. consume the retuned data in the component using (useLoaderData: Returns the data from the closest route loader or clientLoader.)
 * 4. now react router is not responsible for matching url with the correct page only but also for providing data to that page (wow)
 * 5. use useNavigation hook to get the global state (: idle , loading, submitting)
 * 6. use handle error using react-router : just assign errorElement that will be rendered when a certain loader or action faild (error bubbles up the tree)
 *    useRouteError to get access to the error message.
 * 7. use react-router form to make actions post , update the server states
 * what is happening there
 *    <Form> submit   →  React Router intercepts
                      →  creates Request
                      →  calls action(request)
                      →  you process formData and make real API call
                      →  return data or redirect
                      →  UI updates automatically
 * from validation using const errors = useActionData(); to get the returned errors object that is validated in the action
 * 8. uisng tailwindcss to style the entire app
 *    the main advantages: is that you don't have to   switch between files
      faster development: you don't have to come up with these class names
      there are many predefined usefull styles 
      - responsive design with tailwindcss : mobile first design => start with mobile design then with eary breakpoint you decide change the styles you want
      - the long story short of tailwindcss : This is what we mean when we say a utility class can be applied conditionally — by using variants you can control exactly how your design behaves in different states, without ever leaving your HTML.
      - layout using flex and grid
      - Element state: sudo-classes in css (ex. hover)
      - rusing styles using @apply with class name (not prefered as it get you back to the way css is written - so don't use it as you can) BUT IT GIVES YOU REALLY POWERFULL FEATURE OF ADDING MORE CUSTOME STYLES FOR EACH ELEMENT THAT HAS GIVEN THE GLOBAL STYLE
      - better way of using styles of tailwind is by reusing components 
      - adding custome styles using theme variables
 * 9. using redux toolkit for handling global ui state
  10. using redux thunk to handle global remote state
  11: use react-router fetcher to fetch data without navigation fetch on render not as render
  12: using react-router fetcher to sumbit an action without navigation (causes a revalidation)

reusing styles 
 */

/**
 * Tech stack
 * 1. react with typescript (  // note: you specify the props when you define a function or an object or vars (correct me gpt if i am wrong))
 * 2. React Router: the standard for react spa
 * 3. tailwindcss: for styling
 * 4. React Router: for Remote State management
 * 5. Redux: for UI State management
 */
