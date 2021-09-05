const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if (blogs.length === 1){
        const like = blogs[0].likes
        return like}

    else 
        return blogs.reduce((total, blog) => total + blog.likes,0)   
}

const favoriteBlog = (blogs) => {
    
    return blogs.reduce((blog1, blog2) =>
        blog2.likes > blog1.likes ? blog2 : blog1)
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }