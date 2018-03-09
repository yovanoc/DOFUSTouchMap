function navbar() {
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'navbar');
    const title = container.appendChild(document.createElement('div'));
    title.innerText = 'CookieTouch';
    title.setAttribute('style', 'position:absolute;width:17.5%;text-align:center;font-size:150%;margin-top:1.375%;height:2%;');
    createImg(container, 'img/cookie.png', '', 'location.href="index.html"', 'cursor:pointer;position:absolute;left:47.5%;width:4%;margin:0.25%;');
}
