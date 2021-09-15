import type { CreateUserInput } from "../src/schema/user";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

export const testUser: CreateUserInput = {
  name: "test",
  userName: "test",
  email: "zorofight94@gmail.com",
  phoneNumber: "09391981195",
  image: "https://test.com/test.png",
  code: "test",
  description: "test",
  identifierCode: "test",
};

export const getClient = (token: string) => {
  return new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:8080/graphql", fetch }),
    cache: new InMemoryCache(),
    //     request: (operation) => {
    //   if (token) {
    //     operation.setContext({
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //   }
    // },
    // onError: (e) => {
    //   console.log(e);
    // },
  });
};
