import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

// should i name the file PostsProvider??? john didn't do so
function PostsProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery: searchQuery,
        setSearchQuery: setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside its Provider");
  return context;
}
export { PostsProvider, usePosts };

// I have a small correction to add on this lecture. At 01:02 minute you mentioned that by moving all the content related to context and the provider to a separate file is just a refactoring and that the functionality will be exactly the same, which is not entirely true. In the initial example state lives in the app component, this means that if the state is changed, the app component (and its children) will re-render. After the refactoring, state is tight to the provider, this means that only the components that are trying to use this context will be re-rendered. In case you are mentioning this aspect in a further lesson, just ignore it. I just wanted to point this out, in order to clarify any confusion that might arise to some of the students.
// me note: this happens because you are using component composition so state changing in the app will not the child to re-render wow:)
