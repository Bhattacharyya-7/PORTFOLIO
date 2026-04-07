// typing animation

const roles = [
"Aspiring Web Developer",
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


// dark mode

function toggleTheme(){

document.body.classList.toggle("dark-mode")

}


// scroll reveal

const reveals=document.querySelectorAll(".reveal")

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active")

}

})

})

reveals.forEach(el=>observer.observe(el))