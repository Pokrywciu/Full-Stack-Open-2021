import React from 'react'

const BlogForm = ({addBlog, short}) => {
    return(
        <form onSubmit={addBlog}>
            <div>
                <h2>create new blog</h2>
                <p>title: <input id="title" value={short.title} onChange={short.handleTitleChange} /></p>
                <p>author: <input id="author" value={short.author} onChange={short.handleAuthorChange}/></p>
                <p>url: <input id="url" value={short.url} onChange={short.handleUrlChange}/></p>
            </div>
            <div>
                <button type="submit">save</button>
            </div>
        </form>
    )
}

export default BlogForm