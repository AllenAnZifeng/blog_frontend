import { configureStore } from '@reduxjs/toolkit'
import allArticleReducer from '../features/articles/allArticleSlice'

export const store = configureStore({
    reducer: {
        allArticles: allArticleReducer,
        // comments: commentsReducer,
        // users: usersReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch