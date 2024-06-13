
//get toggle of testing options
let toggleSettings = document.querySelector(".toggle-settings");
let settings = document.querySelector(".settings-box");
toggleSettings.addEventListener("click", (eo) => {
    settings.classList.toggle("open");
    document.querySelector(".fa-gear").classList.toggle("fa-spin");
});

//Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
const iconFeat=document.querySelectorAll(".feat-box img");
let arrayIconNames=[];

//function to remove active
function removeActive(items){
    items.forEach((item) => {
        item.classList.remove("active");
    });
}
//function to add active
function addActive(item) {item.classList.add("active");}
//function to add new color to variable --main-color
function newMainColor(color) {
    document.documentElement.style.setProperty(
        "--main-color",
        color
    );
}
//check if there's local storage color
if (window.localStorage.color) {
    //new main color
    newMainColor(window.localStorage.color);
    //remove elements active
    removeActive(colorsLi);

    document
        .querySelector(`[data-color="${window.localStorage.color}"]`)
        .classList.add("active");
}

if(window.localStorage.iconFeat){
    arrayIconNames=window.localStorage.iconFeat.split(",");
    let i=0;
    iconFeat.forEach(icon=>{
        let folderIcon=icon.getAttribute("src").split("/");
        icon.src=`img/img-core/icons/${folderIcon[folderIcon.length-2]}/${arrayIconNames[i++]}`;
    });
}

colorsLi.forEach((Items) => {
    Items.addEventListener("click", (eo) => {
        //remove elements active
        removeActive(colorsLi);
        //add active in element
        addActive(eo.target);
        //new main color
        newMainColor(eo.target.dataset.color);

        arrayIconNames=[];
        iconFeat.forEach(icon=>{
            let folderIcon=icon.getAttribute("src").split("/");
            let iconName=`${folderIcon[folderIcon.length-2]+eo.target.dataset.icon}`;
            icon.src=`img/img-core/icons/${folderIcon[folderIcon.length-2]}/${iconName}`;
            arrayIconNames.push(iconName);
        });

        window.localStorage.setItem("color", eo.target.dataset.color);
        window.localStorage.setItem("iconFeat",arrayIconNames);
    });
});

let backgroundInterval;
let randomBack;

//check random in localStorage
if (window.localStorage.getItem("randomBackground")) {
    randomBack = window.localStorage.getItem("randomBackground");
    if (randomBack === 'true') {
        randomizeImages(true);
    } else {
        randomizeImages(false);
    }
}

//randomize images background
function randomizeImages(prop = true) {
    //Select Landing Page Element
    let landingPage = document.querySelector(".landing-page");
    //Get Array Of Imgs
    let imgsArray = ["bg_2.jpg", "bg_3.jpg", "bg_4.jpg"];
    if (prop === true) {
        backgroundInterval = setInterval((eo) => {
            //Get Random Number
            let rand = Math.floor(Math.random() * imgsArray.length);
            //Change Background Image Url
            landingPage.style.backgroundImage = `url("img/img-bg/${imgsArray[rand]}")`;
        }, 1000);
    } else {
        clearInterval(backgroundInterval);
    }
    window.localStorage.setItem("randomBackground", prop);
}

//Switch Random Background
let spanRand = document.querySelectorAll(".random-bg");
spanRand.forEach((Items) => {
    Items.addEventListener('click', (eo) => {
        removeActive(spanRand);
        addActive(eo.target);
        if (eo.target.dataset.background === "yes") {
            randomizeImages(true);
            document.getElementById("optionBack").classList.add("disable")
        } else {
            randomizeImages(false);
            document.getElementById("optionBack").classList.remove("disable");
        }
    });
});

removeActive(spanRand);

//get active button in random background  when load 
if (randomBack === 'true') {
    addActive(document.querySelector(".option-box .yes"));
    document.getElementById("optionBack").classList.add("disable")
} else {
    addActive(document.querySelector(".option-box .no"));
    document.getElementById("optionBack").classList.remove("disable");
}

//check background image in localstorage
let srcImg = document.querySelectorAll(".choose-img li");
if (window.localStorage.getItem("srcBackgroundImage") !== null) {
    removeActive(srcImg);
    document.querySelector(".landing-page").style.backgroundImage = `url(img/img-bg/${window.localStorage.getItem("srcBackgroundImage")})`;
    addActive(document.querySelector(`[data-src="${window.localStorage.getItem("srcBackgroundImage")}"]`));
}

//switch image background
srcImg.forEach((Item) => {
    Item.addEventListener('click', (eo) => {
        removeActive(srcImg);
        addActive(Item);
        let srcImage = Item.children[0].getAttribute("src").split("/");
        document.querySelector(".landing-page").style.backgroundImage = `url('img/img-bg/${srcImage[srcImage.length - 1]}')`;
        window.localStorage.setItem("srcBackgroundImage", srcImage[srcImage.length - 1]);
    });
});

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    //Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;//900px
    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;//370
    //Select view Height 
    let viewHeight = window.innerHeight;//615
    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;//672
    // console.log("distance between top window and bottom section : " + skillsOffsetTop);
    // console.log("this is a height for section : " + skillsOuterHeight);
    // console.log("this is a height view height : " + viewHeight);
    // console.log("this is a distance move scroll : " + windowScrollTop);
    // console.log("this is section skills : " + skillsOffsetTop + skillsOuterHeight - viewHeight);
    let allSkills = document.querySelectorAll(".skill-progress span");
    if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - viewHeight) {
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }else if(windowScrollTop==0){
        allSkills.forEach(skill => {
            skill.style.width = 0;
        });
    }
}

//Create Popup With The Image 
let ourGallery = document.querySelectorAll(".gallery img");
//create new element 
let overlay=document.createElement("div");
//add class for div
overlay.className="popup-overlay";
ourGallery.forEach(Img=>{
    Img.addEventListener('click',()=>{
        //add popUp div in body
        document.body.append(overlay);
        let popupOverlay=document.querySelector(".popup-overlay");
        //create the popup box
        let popupBox=document.createElement("div");
        popupBox.className="popup-box";
        //create img 
        let popupImage=document.createElement("img");
        popupImage.src=Img.src;
        //Add Image To Popup Box
        popupBox.append(popupImage);

        if(Img.alt!==null){
            //Create Heading
            let imgHeading =document.createElement("h3");
            //create text for heading
            let imgText=document.createTextNode(Img.alt);
            
            //append The Text To Heading
            imgHeading.appendChild(imgText);
            //append The Heading To The popup box
            popupBox.appendChild(imgHeading);
            imgHeading.style.textAlign="center";
            imgHeading.classList.add("main-color");
        }
        //Append The Popup Box To  
        popupOverlay.appendChild(popupBox);
        //hidden overlay popup
        popupOverlay.addEventListener('click',(eo)=>{
            eo.target.remove();
            popupBox.remove();
            popupImage.remove();
        });

    })
});

//function scroll to some where.
function scrollToSection(items) {
    items.forEach(item=>{
        item.addEventListener('click',(eo)=>{
            eo.preventDefault();
            document.querySelector(eo.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
}

//Select All Bullets.
const allBullets=document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(allBullets);

//Select All Links.
const links=document.querySelectorAll(".links li");
scrollToSection(links);

//Show hide Testimonials
const btnTs=document.querySelectorAll(".d-testimonials");
const testimonials=document.querySelector(".testimonials");
const testimonialsLocalItem=localStorage.getItem("testimonials_option");
if(testimonialsLocalItem!==null){
    removeActive(btnTs);
    if(testimonialsLocalItem==='block'){
        testimonials.classList.remove("disable");
        addActive(document.querySelector("[data-display='show']"));
    }else{
        testimonials.classList.add("disable");
        addActive(document.querySelector("[data-display='hide']"));
    }

}
btnTs.forEach(bullet=>{
    bullet.addEventListener('click',(eo)=>{
        removeActive(btnTs);
        addActive(eo.target);
        if(eo.target.dataset.display==="show"){
            testimonials.classList.remove("disable");
            localStorage.setItem("testimonials_option","block");
        }else{
            testimonials.classList.add("disable");
            localStorage.setItem("testimonials_option","none");
        }
    });
})

//Show Hide Bullets
const btnBullets=document.querySelectorAll(".d-bullet");
const navBullets=document.querySelector(".nav-bullets");
const bulletsLocalItem=localStorage.getItem("bullets_option");
if(bulletsLocalItem!==null){
    removeActive(btnBullets);
    if(bulletsLocalItem==='block'){
        navBullets.classList.remove("disable");
        addActive(document.querySelector("[data-display='showBullet']"));
    }else{
        navBullets.classList.add("disable");
        addActive(document.querySelector("[data-display='hideBullet']"));
    }

}
btnBullets.forEach(bullet=>{
    bullet.addEventListener('click',(eo)=>{
        removeActive(btnBullets);
        addActive(eo.target);
        if(eo.target.dataset.display==="showBullet"){
            navBullets.classList.remove("disable");
            localStorage.setItem("bullets_option","block");
        }else{
            navBullets.classList.add("disable");
            localStorage.setItem("bullets_option","none");
        }
    });
})

//reset all setting options
document.querySelector(".reset-options").addEventListener('click',(eo)=>{
    let arraySettingOptions=["color","iconFeat","srcBackgroundImage","testimonials_option","randomBackground","bullets_option"];
    for (let i = 0; i < arraySettingOptions.length; i++) {
        localStorage.removeItem(arraySettingOptions[i]);
    }
    window.location.reload();
});

// //calcul number links
// const numLinks=document.querySelectorAll(".links li");
// const navBullets=document.querySelector(".nav-bullets");
// numLinks.forEach(link=>{
//     const newBullet=`
//     <div class="bullet" data-section=".${link.innerText.toLowerCase()}">
//         <div class="tooltip">${link.innerText}</div>
//     </div>`;
//     navBullets.innerHTML+=(newBullet);
// });

//toggle menu
const parentLinks=document.querySelector(".links");
const toggle=document.querySelector(".toggle-menu");
const spanToggle=document.querySelectorAll(".toggle-menu span");
toggle.onclick=function (e) {
    //Stop Propagation
    e.stopPropagation();
    parentLinks.classList.toggle("open");
}
document.addEventListener('click',(eo)=>{
    // parentLinks.classList.toggle("open");
    if(eo.target!==toggle && eo.target!==parentLinks){
        //check open 
        if(parentLinks.classList.contains("open")){
            parentLinks.classList.toggle("open");
        }
    }
});

parentLinks.onclick=function (e){
    e.stopPropagation();
}