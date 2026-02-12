import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { SetContextLink } from "@apollo/client/link/context";
import { getActiveUser } from "./utils/session";
import App from "./App.tsx";
import "./index.css";

const authLink = new SetContextLink((prevContext, operation) => {
  const userId = getActiveUser(); // la tua funzione

  return {
    headers: {
      ...prevContext.headers,
      "x-user-id": userId || "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // URL del tuo Standalone Server backend
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
