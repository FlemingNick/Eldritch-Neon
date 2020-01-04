let backgroundGlitch = true;

let levelCounter = 0;

let skip = false;


//Audio Files

const alarmSound = new Audio("sound/alarm.wav");
const clickSound = new Audio("sound/click.wav");
const darkVoiceSound = new Audio("sound/darkvoicewhatrudoinghere.wav");
const errorSound = new Audio("sound/error.wav");
const titleSound = new Audio("sound/title.wav");


const titleAnimation = () =>{
    document.getElementById("title").style.display ="block";
    const tl = new TimelineMax({delay: 2});
    tl.fromTo(document.getElementById("title"),3, {opacity: 0}, {opacity: 1});
}

const checkButton = document.getElementById("submit");
checkButton.addEventListener("click", e => {
    let content = document.getElementById("input").textContent;
    alert(`"${content}" submitted`);
});


const animate = function(text){
    const input = text.innerHTML;
    text.innerHTML = " ";
    
    for(let i = 0;i < input.length; i++){
        setTimeout(()=>{
            text.innerHTML += input.charAt(i); 
            
            if(i + 1 == input.length && levelCounter == 0){
                document.getElementById("skip").style.display = "block";
                skipSwitch();
            }; 
            if(i + 1 == input.length && levelCounter == 1){
                document.getElementById("skip").style.display = "block";
            }; 
        },i*50); 
        
    };
      
};

const increaseLVL = (amount)=>{
    levelCounter += amount;
};

const bgGlitch = () => {
    if(backgroundGlitch){
        let background = document.getElementById("container");
        let count = 20;
        for (let i = 0; i < count; i++){
            let glitchBox = document.createElement("div")
                glitchBox.className = "box";
                background.appendChild(glitchBox);
        }
        setInterval(function(){
            let glitch = document.getElementsByClassName("box");
            for (let i = 0; i < glitch.length; i++){
                glitch[i].style.left = Math.floor(Math.random()*100)+"vw";
                glitch[i].style.top = Math.floor(Math.random()*100)+"vh";
                glitch[i].style.width = Math.floor(Math.random()*400)+"px";
                glitch[i].style.height = Math.floor(Math.random()*100)+"px";
                glitch[i].style.backgroundPosition = Math.floor(Math.random()*50)+"px"
            };
        }, 200);
    };
};

const skipSwitch = () => {
    if(skip){
        skip = false;
    }else{
        skip = true;
    };
};



const checkLevel = () => {
    if(levelCounter === 0){
        document.getElementById("skip").style.display ="none";
        document.getElementById("quest-text").innerHTML = "Welcome! Thank you for playing Eldritch Neon. I highly recommend listening to your favourite Synthwave artist while playing to get yourself in the right mood. Click on the menu for the preinstalled command lines that will guide you through the adventure. Everything you need, is your own imagination...Press the arrow to start!";
        var text = document.getElementById("quest-text");
        animate(text);
    };
    if(levelCounter === 1){
        titleAnimation();
        titleSound.play();
        
    };
    if(levelCounter === 2){
        document.getElementById("title").style.display = "none";
        document.getElementById("quest-text").innerHTML = "The alarm is ringing. You slam way too hard on the clock. You sit up straight in bed and wonder why the sun did not wake you up already. You smell the pleasant scent of pancakes your mother has prepared downstairs."
        var text2 = document.getElementById("quest-text");
        backgroundGlitch = false;
        bgGlitch();
        animate(text2);
        skipSwitch();
        document.getElementById("skip").style.display = "none";
        
    
        
    };

};



const skipButton = document.getElementById("skip").addEventListener("click", (e)=>{
    if(skip){
    document.getElementById("quest-text").innerHTML = " ";
    increaseLVL(1);
    checkLevel();
    clickSound.play();
    };
    
}); 


if(levelCounter===0){
    checkLevel();
};















