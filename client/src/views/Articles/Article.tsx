import { useParams } from 'react-router-dom'

export default function Article() {
    //获取当前路由的信息
    const { id } = useParams()
    //获取当前路由的信息
    return (
        <div>
            <p>Article --{id}</p>
        </div>
    )
}