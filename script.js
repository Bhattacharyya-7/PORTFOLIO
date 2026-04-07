const roles=[
"Web Developer",
"Programmer",
"Tech Enthusiast"
]

let i=0
let j=0

const typing=document.getElementById("typing")

function type(){

if(j<roles[i].length){

typing.innerHTML+=roles[i].charAt(j)
j++

setTimeout(type,100)

}

else{

setTimeout(()=>{

typing.innerHTML=""
j=0
i=(i+1)%roles.length

type()

},2000)

}

}

type()


const form=document.getElementById("contactForm")

form.addEventListener("submit",function(e){

const name=document.getElementById("name").value.trim()
const email=document.getElementById("email").value.trim()

if(name==="" || email===""){

e.preventDefault()

alert("Please enter your name and email before sending message.")

}

})
function hitBall(){

const ball=document.getElementById("ball")

ball.classList.remove("fly")

void ball.offsetWidth

ball.classList.add("fly")

setTimeout(()=>{
ball.classList.remove("fly")
},1000)

}function hitBall(){

const ball=document.getElementById("ball")

const randomY = Math.floor(Math.random()*200)-100
const randomRotate = Math.floor(Math.random()*720)+360

ball.style.transform = `translateX(120vw) translateY(${randomY}px) rotate(${randomRotate}deg)`

setTimeout(()=>{
ball.style.transform="translateX(0)"
},2000)

}