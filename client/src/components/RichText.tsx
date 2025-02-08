import {useQuill} from "react-quilljs";

const RichText = () => {
    const { quillRef } = useQuill({
        modules: {
            toolbar: '#toolbar'
        },
        formats: ["size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image"],

    });
    return (

        <div className='mt-4 w-full rounded-xl bg-white h-96'>
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
            <button className='bg-rose-800 text-white font-medium rounded-3xl mt-1 p-2 w-36 mb-4'>发布</button>
        </div>
    );
};

export default RichText;