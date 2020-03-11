//Call API
let newsList = []
let page = 1;
let callAPI = async() => {
    let apiKey = '1926992439474b208803471849ccf35d';
    let url = `https://newsapi.org/v2/everything?q=NBA&apiKey=${apiKey}`;

    let data = await fetch(url);//await is needed otherwise the function will go on to execute following code without data
    let result = await data.json();//get the JSON file from data - changes the file to object already
    newsList = newsList.concat(result.articles)

    console.log('data', data)
    console.log('json', result)
    console.log('article list', newsList)
    render(newsList)

}
let date;
let render = (array) => {
    // console.log(Date.parse(array[0].publishedAt), typeof Date.parse(array[0].publishedAt))
    let htmlForNews = array.map((item)=>{
        return `<p id="noa"></p>
        <div id="news" style="display:flex; border: 1px solid grey">
            <img style="max-width:300px" src="${item.urlToImage}">
        <div>
            <h2>${item.title}</h2>
            <a href="${item.url}">Read more</a>
            <div>${item.source.name}</div>
            <div>${moment(item.publishedAt, "YYYYMMDD").fromNow()}</div>
        </div>
        </div>`
    }).join('')
    document.getElementById('newsArea').innerHTML = htmlForNews
    document.getElementById('noa').innerHTML = `Showing ${array.length} out of ${htmlForNews.length.value} results`  
}

let loadMore = async() => {
    page +=1;
    let apiKey = '1926992439474b208803471849ccf35d';
    let url = `https://newsapi.org/v2/everything?q=NBA&apiKey=${apiKey}&page=${page}`;

    let data = await fetch(url);//await is needed otherwise the function will go on to execute following code without data
    let result = await data.json();//get the JSON file from data - changes the file to object already
    newsList = newsList.concat(result.articles)
    render(newsList)
}
callAPI()
