const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes = likes + element.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    let likes = -1
    let index = -1
    let i = 0
    blogs.forEach(element => {
        if (element.likes > likes) {
            likes = element.likes
            index = i
        }
        i++
    });
    return blogs[index].title + "\n" + blogs[index].author + "\n" + blogs[index].likes + " likes"
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}