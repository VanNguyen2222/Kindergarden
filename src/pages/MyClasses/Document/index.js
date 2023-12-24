import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useData } from './hook';
import ReactHtmlParser from "react-html-parser"

function Document(props) {
    const { states, handles, user } = useData()
    const { value, docName } = states
    const { handleChange, setDocName, handleSubmit } = handles

    return (
        <div className='container' style={{ width: "1200px", maxWidth: "80vw" }}>
            <div className='title-big' style={{ paddingTop: "20px" }}>
                <h2 className='btn-font'>
                    {user?.role === "student" ?
                        docName : "Document"}
                </h2>
            </div>
            {user && (user.role === "teacher" ?
                <>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='Document name' type="text" required
                            value={docName}
                            onChange={e => setDocName(e.target.value)} />
                        <button type="submit">SUBMIT</button>
                    </form>
                    <CKEditor editor={ClassicEditor} data={value} onChange={handleChange} />
                </> :
                <div>

                    {ReactHtmlParser(value)}
                </div>)}
        </div>
    );
}

export default Document;