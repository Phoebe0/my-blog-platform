import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// 获取所有帖子
export const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/post`);
    return res.data;
};
