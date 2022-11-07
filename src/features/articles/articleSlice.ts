import { createAsyncThunk, createSlice, PayloadAction,nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type article = {
    filename: string;
    title: string;
    time: string;
    description: string;
    category: string;
    tags: string[];
    data: string;
}
type articleState = {
    articles: article[];
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string|null|undefined;
}

const initialState:articleState = {
    articles: [],
    status: 'idle',
    error:""
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {

                state.articles = action.payload.articles
                state.status = 'success'
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    let result:string = await fetch('https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/fileInfo.txt').then(res => res.text())
    let filenames: string[] = result.trim().split('\n')
    let fetchedArticles: articleState = { articles: [], status: 'success',error:"" }
    for (let i = 0; i <filenames.length ; i++) {
        const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + filenames[i]
        let res:string = await fetch(URL).then(res => res.text())
        let splitted:string[] = res.split("\n",6)
        let title:string = splitted[0].slice(2).trim()
        let time:string = splitted[2].split(":")[1].slice(0,-1).trim()
        let description:string = splitted[3].split(":")[1].slice(0,-1).trim()
        let category:string = splitted[4].split(":")[1].slice(0,-1).trim()
        let tags:string[] = splitted[5].split(":")[1].split(',')
        let fetchedArticle:article = {
            filename:filenames[i],
            title:title,
            time: time,
            description: description,
            category: category,
            tags: tags,
            data: res
        }
        fetchedArticles.articles.push(fetchedArticle)
    }
    return fetchedArticles
})

export const selectAllArticles = (state: RootState) => state.articles.articles
export default articleSlice.reducer