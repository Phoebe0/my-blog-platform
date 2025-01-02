import { useParams } from 'react-router-dom'
import ArticleList from "./ArticleList.tsx";
export default function Article() {
    //获取当前路由的信息
    const { id } = useParams()
    //获取当前路由的信息
    return (
        <div>
            <p>Article --{id}</p>
            <ArticleList />
        </div>
    )
}