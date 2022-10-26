
(() => {
    const openNavMenu = document.querySelector(".open-nav-menu");
    const closeNavMenu = document.querySelector(".close-nav-menu");
    const navMenu = document.querySelector(".nav-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const mediaSize = 991;

    openNavMenu.addEventListener("click", toggleNav);
    closeNavMenu.addEventListener("click", toggleNav);
    menuOverlay.addEventListener("click", toggleNav);

    function toggleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("hidden-scrolling");
    }

    navMenu.addEventListener("click", (event) => {
        if(event.target.hasAttribute("data-toggle") &&
        window.innerWidth <= mediaSize) {
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;
            if(menuItemHasChildren.classList.contains("active")) {
                collapseSubMenu();
            }else{
                if(navMenu.querySelector(".menu-item-has-children.active")) {
                    collapseSubMenu();
                }
                menuItemHasChildren.classList.add("active");
                const subMenu = menuItemHasChildren.querySelector(".sub-menu");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    });
    function collapseSubMenu(){
        navMenu.querySelector(".menu-item-has-children.active .sub-menu")
        .removeAttribute('style');
        navMenu.querySelector(".menu-item-has-children.active")
        .classList.remove("active");
    }
    function resizeFix() {
        if(navMenu.classList.contains("open")) {
            toggleNav();
        }
        if(navMenu.classList.contains("menu-item-has-children.active")) {
            collapseSubMenu();
        }
    }
    window.addEventListener('resize', () => {
        if(this.innerWidth > mediaSize) {
            resizeFix();
        }
    })
})();

// scroll animation

let progress = document.getElementById("progressBar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function(){
    let progressHeight = (window.pageYOffset / totalHeight)* 100;
    progress.style.height = progressHeight + "%";
}

// Sticky Header animation
window.addEventListener("scroll", function (){
    let header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 0)
});

// Wethher Background
let input = document.querySelector('.input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let clouds = document.querySelector('.clouds');
let button= document.querySelector('.submit');
let weatherSection = document.querySelector(".seventh-section");


// button.addEventListener('click', function(name){
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&1a0ef026fbb7dd0e816b4ce59bf73628')
// .then(response => response.json())
// .then(data => console.log(data))

// .catch(err => alert("Wrong city name!"));
// });

fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=33.589886&lon=-7.603869&appid=" +
      "1a0ef026fbb7dd0e816b4ce59bf73628"
  )
    .then((response) => response.json())
    .then(function(data)  {
        appendData(data)
        

    }).catch(err => alert("Wrong city name!"));
    function appendData(data) {
        if(data.weather[0].description = "overcast clouds"){
            let video = document.createElement('video');
            let source = document.createElement('source');
            let desc = document.querySelector('.desc');
            let descFrensh = 'nuages ​​​​couverts';
            video.setAttribute("id","videoBg");
            video.setAttribute("autoplay","autoplay");
            video.muted = true;
            video.loop = true;
            source.setAttribute("type","video/mp4");
            video.setAttribute("src","../imgs/3_19_08_19.mp4");
            video.appendChild(source);
            weatherSection.appendChild(video);
            desc.innerHTML = "La Meteo à "+ data.name + " est "+ descFrensh+ ` <i class="bi bi-brightness-high-fill"></i>`;
            weatherSection.style.position = "relative";
            desc.style.position = "absolute";
            desc.style.top = "40px";
            desc.style.backgroundColor = "#ffffff";
            desc.style.padding = "10px";
            desc.style.borderRadius = "5px";
            console.log(data);
        }else{
            let video = document.createElement('video');
            let source = document.createElement('source');
            video.setAttribute("id","videoBg");
            video.setAttribute("autoplay","autoplay");
            video.muted = true;
            video.loop = true;
            source.setAttribute("type","video/mp4");
            video.setAttribute("src","../imgs/Calming Rain");
            video.appendChild(source);
            weatherSection.appendChild(video);
            console.log("yes");
        }
    }


