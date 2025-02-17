import {useQuill} from "react-quilljs";
import React, {useEffect} from "react";

interface RichTextProps {
    value: string;
    setPosts: (value: string) => void;
}

const RichText: React.FC<RichTextProps> = ({setPosts}) => {

    const {quill, quillRef} = useQuill({
        modules: {
            toolbar: '#toolbar'
        },
        formats: ["size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"],

    });

    useEffect(() => {
        if (quill) {
            // 当编辑器内容变化时，更新外部传递的setPosts
            quill.on('text-change', () => {
                const editorContent: string = quill.root.innerHTML;  // 获取编辑器的HTML内容
                setPosts(editorContent); // 传递编辑器内容
            });
        }
    }, [quill, setPosts]); // 确保quill和setPosts变化时执行

    return (
        <div className='mt-4 w-full rounded-xl bg-white '>
            <div id="toolbar">
                <select className="ql-size">
                    <option value="small"/>
                    <option selected/>
                    <option value="large"/>
                    <option value="huge"/>
                </select>
                <div>
                    <button className="ql-bold"/>
                    <button className="ql-italic"/>
                    <button className="ql-underline"/>
                    <button className="ql-strike"/>
                    <button className="ql-blockquote"/>
                    <button className="ql-list" value="ordered"/>
                    <button className="ql-list" value="bullet"/>
                    <button className="ql-indent" value="-1"/>
                    <button className="ql-indent" value="+1"/>
                    <button className="ql-link"/>
                    <button className="ql-image"/>
                </div>
            </div>
            <div ref={quillRef}/>
        </div>
    )
};

export default RichText;