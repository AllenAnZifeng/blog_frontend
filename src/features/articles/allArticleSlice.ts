import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from "react";
import {forEach} from "react-bootstrap/ElementChildren";

export type article = {
    filename: string;
    title: string;
    time: string;
    description: string;
    category: string;
    tags: string[];
    data: string;
}
type allArticleState = {
    articles: article[];
    status: 'idle' | 'loading' | 'failed' | 'success_all' | 'success_one_page';
    error: string;
}

const allArticle_initialState:allArticleState = {
    articles: [],
    status: 'idle',
    error:""
}

const allArticleSlice = createSlice({
    name: 'allArticleSlice',
    initialState: allArticle_initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllArticles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllArticles.fulfilled, (state, action) => {

                state.articles = action.payload
                state.status = 'success_all'
            })
            .addCase(fetchAllArticles.rejected, (state, action) => { 
                state.status = 'failed'
                state.error = action.error.message || "Unknown Error"
            })
            .addCase(fetchArticleByFilename.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchArticleByFilename.fulfilled, (state, action) => {

                state.articles = action.payload
                state.status = 'success_one_page'
            })
            .addCase(fetchArticleByFilename.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || "Unknown Error"

            })
    }
})

export function useAllArticles(articlesStatus: string, dispatcher: AppDispatch) {

    useEffect(() => {
            if (articlesStatus !== 'success_all') {
                dispatcher(fetchAllArticles())
            }
        }
        , [articlesStatus,dispatcher])
}

export function useOneArticle(filename:string,existing_articles: article[], dispatcher: AppDispatch) {

    useEffect(() => {
            let articleFound = false;
            for (let i = 0; i < existing_articles.length; i++) {
                if (existing_articles[i].filename === filename) {
                    articleFound = true;
                    return
                }
            }
            if (!articleFound) {
                dispatcher(fetchArticleByFilename(filename))
            }


        }
        , [filename,existing_articles,dispatcher])
}

export const fetchAllArticles = createAsyncThunk('articles/fetchArticles', async () => {
    let result:string = await fetch('https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/fileInfo.txt').then(res => res.text())
    let filenames: string[] = result.trim().split('\n')
    let fetchedArticles: article[] = []
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
        fetchedArticles.push(fetchedArticle)
    }
    return fetchedArticles
})


export const fetchArticleByFilename = createAsyncThunk('articles/fetchArticleByFilename', async (filename:string) => {
    const URL = "https://raw.githubusercontent.com/AllenAnZifeng/blog_content/master/contents/" + filename
    let res:string = await fetch(URL).then(res => res.text())
    let splitted:string[] = res.split("\n",6)
    let title:string = splitted[0].slice(2).trim()
    let time:string = splitted[2].split(":")[1].slice(0,-1).trim()
    let description:string = splitted[3].split(":")[1].slice(0,-1).trim()
    let category:string = splitted[4].split(":")[1].slice(0,-1).trim()
    let tags:string[] = splitted[5].split(":")[1].split(',')
    let fetchedArticle:article = {
        filename:filename,
        title:title,
        time: time,
        description: description,
        category: category,
        tags: tags,
        data: res
    }
    return [fetchedArticle]
})


export const selectAllArticles = (state: RootState) => state.allArticles.articles
export const selectArticleStatus = (state: RootState) => state.allArticles.status
export const selectArticleError = (state: RootState) => state.allArticles.error
export default allArticleSlice.reducer