
let backgroundGlitch = true;
let ready = true;
let levelCounter = 0;
let skip = false;
let enfolded = false;

//visited places

/* idea for later: onlz animate if false, and set to true 
after first animation, so the player spends less time on
already visited levels */

let lvl3 = false;


//Bag




//possible moves

let inspectdesk = false;

//Audio Files

const alarmSound = new Audio("alarm.wav");
const clickSound = new Audio("click.wav");
const darkVoiceSound = new Audio("darkvoicewhatrudoinghere.wav");
const errorSound = new Audio("error.wav");
const titleSound = new Audio("title.wav");

//Characters

class Person {
    
    health = 200;
    movement = 1;
    attack = 20;
}

class Main extends Person {   
    name = 'Steve';
    gender = 'male';
};

class Crawler {
    
    name = 'Crawler';
    health = 500;
    movement = 0.5;
    attack = 200; 
    
};

class Creeper {
    
    name = 'Creeper';
    health = 300;
    movement = 1.5;
    attack = 100;
   
}

class Miniboss {
   
    name = 'Miniboss';
    health = 2000;
    movement = 0.2;
    attack = 500;
   
}

//Default Level texts

const lvl3Default = 'You are standing in the middle of your sleeping room. What is next?'




//Command Lines

const checkButton = document.getElementById("answer");
const command = document.querySelector('#input')
checkButton.addEventListener("submit", e => {
    e.preventDefault();
    if(levelCounter===2){
        if(command.value=="inspect room"){
            document.getElementById("title").style.display = "none";
            document.getElementById("quest-text").innerHTML = "You look around in your room. During the last couple of years, you have not changed a lot of your interior. On the wall over your bed behind you hangs a poster. Infront of you is an open door. To your right is a messy desk and to your left is your plugged in ATARI 2600, laying on the carpet."
            let text = document.getElementById("quest-text");
            animate(text);
        };
        if(command.value=="inspect poster"){
            document.getElementById("title").style.display = "none";
            document.getElementById("quest-text").innerHTML = "You have a look at the poster hanging over your bed. It is a movie poster from your favourite film by John Carpenter, The Thing. Luckily, your mother does not know the movie you and your friends were definetely not allowed to watch."
            let text = document.getElementById("quest-text");
            animate(text);
        };
        if(command.value=="inspect desk" && inspectdesk == false){
            document.getElementById("title").style.display = "none";
            document.getElementById("quest-text").innerHTML = "From here, you can clearly see the mess on your desk. Maybe you would find something usefull if it would be cleaned up (definetely NOT an option) or if you were closer by...";
            let text = document.getElementById("quest-text");
            animate(text);
        };
        if(command.value=="go to desk"){
            document.getElementById("title").style.display = "none";
            document.getElementById("quest-text").innerHTML = "You are standing infront of your messy desk. Pen and papers, even the scissor you borrowed from your sister, are all over the place. A dusty lamp emits a dim light. You must have kept it on over night. ";
            let text = document.getElementById("quest-text");
            animate(text);
            inspectdesk = true;
        };
        if(command.value=="inspect desk" && inspectdesk == true){
            document.getElementById("title").style.display = "none";
            document.getElementById("quest-text").innerHTML = "You take a closer look at the mess. You found the 10$ bill you were seeking the entire last week! It was hidden under a bunch of books and magazines";
            let text = document.getElementById("quest-text");
            animate(text);
        };
        if(command.value == "use door"){
            increaseLVL(1);
            checkLevel();
        }
        


    }
});



//Animationen

const titleAnimation = () =>{
    document.getElementById("title").style.display ="block";
    document.getElementById("author").style.display ="block";
    const tl = new TimelineMax({delay: 2});
    tl.fromTo(document.getElementById("title"),3, {opacity: 0}, {opacity: 1}).fromTo(document.getElementById("author"),3, {opacity: 0}, {opacity: 1})
}

const manualAnimation = () =>{
    const tl = new TimelineMax({delay: 0.2});
    if(enfolded == false){
        tl.fromTo(document.getElementById("manual"),1, {opacity: 0, width:'0vw'}, {opacity: 1, width:'10vw'}).fromTo(document.getElementById("commands"),3,{display:"none"},{display:'block'});
        enfolded = true;
    }else{
        tl.fromTo(document.getElementById("manual"),1, {opacity: 1, width:'10vw'}, {opacity: 0, width:'0vw'}).fromTo(document.getElementById("commands"),3,{display:"block"},{display:'display'});
        enfolded = false;
    }
}

const burger = document.getElementById('burger');
burger.addEventListener('click', e =>{
    manualAnimation();
    
});

const animate = function(text){
    const input = text.innerHTML;
    text.innerHTML = " ";
    
    for(let i = 0;i < input.length; i++){
        setTimeout(()=>{
            text.innerHTML += input.charAt(i); 
           
            if(i + 1 == input.length && ready == true){
                document.getElementById("skip").style.display = "block";
                skipSwitch();
            }; 

        },i*50); 
        
    };
      
};

const increaseLVL = (amount)=>{
    levelCounter += amount;
};

/* const bgGlitch = () => {
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
}; */

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
        document.getElementById("skip").style.display = "none";
        skipSwitch();
        document.getElementById("title").style.display = "none";
        document.getElementById('author').style.display = 'none';
        document.getElementById("quest-text").innerHTML = "The alarm is ringing. You slam way too hard on the clock. You sit up straight in bed and wonder why the sun did not wake you up already. You smell the pleasant scent of pancakes your mother has prepared downstairs. You grab the nearest shirt and pair of jeans to your bed and put them on. A last stretch and yawn until you finally stand up. You are now standing in the middle of the room..."
        let text = document.getElementById("quest-text");
        ready = false;
        animate(text);
        
    };
    if(levelCounter===3){
        
        
    }

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

const hero = new Main();
console.log(hero.attack);





























