function navbar() {
    const container = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
    container.setAttribute('id', 'navbar');
    const title = container.appendChild(document.createElement('div'));
    title.innerText = 'CookieTouch';
    title.setAttribute('style', 'position:absolute;width:17.5%;text-align:center;font-size:150%;margin-top:1.375%;height:2%;');
    const icon = container.appendChild(document.createElement('img'));
    icon.setAttribute('src', 'img/cookie.png');
    icon.setAttribute('style', 'cursor:pointer;position:absolute;left:47.5%;width:4%;margin:0.25%;');
    icon.setAttribute('onclick', 'location.href="index.html"');
}
