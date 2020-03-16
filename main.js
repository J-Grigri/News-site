//Call API
let newsList = []
let page = 1;
let apiKey = '1926992439474b208803471849ccf35d';

let callAPI = async() => {
    let url = `https://newsapi.org/v2/everything?q=NBA&page=${page}apiKey=${apiKey}`;

    let data = await fetch(url);//await is needed otherwise the function will go on to execute following code without data
    let result = await data.json();//get the JSON file from data - changes the file to object already
    newsList = newsList.concat(result.articles);

    searchBySource();
    render(newsList);

}
//Call the API when search for category
let searchByCategory = async() => {
    let category = document.getElementById('category').value;
    let url = `http://newsapi.org/v2/top-headlines?category=#{category}apiKey=1926992439474b208803471849ccf35d`;
    let data = await fetch(url);
    let result = await data.json();
    newslist = result.articles;
    render(newsList);
};

let searchBySource = () => {
    let sourceNames = newslist.map((item)=>item.source.name);
    
    let sourceObject = sourceNames.reduce((total, name)=> {
        if (name in total){
            total[name]++;
        } else {
            total[name]=1;
        }
        return total;
    },{});

    let sourceArray = Object.keys(sourceObject);// get the Key from object to the array 
    let htmlForSource = sourceArray.map(
        item =>
            `<input onchange='sourceClicked("${item}")' type="checkbox" id="${item}"/> ${item} (${sourceObject[item]})`
    );
    document.getElementById('sourceArea').innerHTML = htmlForSource;
}

let sourceClicked = index => {
    if (document.getElementById(index).checked == true){
        let filteredNews = newsList.filter(item)=> item.source.name === index);
        render (filteredNews);
    }   else {
        render (newsList);
        }
};



let date;
let render = (array) => {
    // console.log(Date.parse(array[0].publishedAt), typeof Date.parse(array[0].publishedAt))
    let htmlForNews = array.map(item =>{
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
    page ++;

    newsList = newsList.concat(result.articles)
    render(newsList)
};

callAPI()
