const run = document.getElementById("run")
const over = document.getElementById("over")
const wicket = document.getElementById("wicket")

let runs = Number(run.innerHTML);
let wickets = 0
let ball = 0
let ov = 0;
let overLimit = prompt("Enter Over Limit")
let common = document.querySelectorAll('.common');
let wdnb = document.querySelectorAll(".wdnb")
let lbb = document.querySelectorAll(".lbb")
let wick = document.querySelector(".wick")
let thisover= document.querySelector(".thisovers")
let undo= document.querySelector(".undo")
let un=document.querySelectorAll(".un")
let thisOver=[];
let UndoTrack=[];

function ovreCounter() {
    if (ball == 6) {
        ov++;
        let a = ov + "." + "0"
        over.textContent = a;
        ball = 0
        thisOver=[]
        if (ov == overLimit) {
            alert("One Inning is Complete")
            restart()
            return;
        }
    }
    if (ball < 6) {
        let o = ov + "." + ball
        over.textContent = o;
    }
}

function restart()
{
    ov = 0;
    ball = 0;
    runs = 0;
    wickets=0
    run.textContent = 0;
    wicket.textContent = 0
    over.textContent = 0.0;
}
common.forEach((e) => {
    e.addEventListener('click', () => {
        runs = runs + Number(e.value)
        thisOver.push(e.value)
        thisover.textContent=thisOver;
        run.textContent = runs;
        ball++
        UndoTrack.push(e.value)
        ovreCounter()
    })
})

wdnb.forEach((e) => {
    e.addEventListener('click', () => {
        runs++;
        let extra = Number(prompt("Any Extra Run?? if No, enter 0"))
        runs += extra
        thisOver.push(e.value)
        thisover.textContent=thisOver;
        UndoTrack.push(e.value)
        run.textContent = runs;
    })
})

lbb.forEach((e) => {
    e.addEventListener('click', () => {
        let extra = Number(prompt("Enter Extra Run??"))
        runs += extra
        thisOver.push(e.value)
        thisover.textContent=thisOver;
        run.textContent = runs;
        UndoTrack.push(e.value)
        ball++
        ovreCounter()
    })
})

wick.addEventListener('click', () => {
    thisOver.push("OUT")
    thisover.textContent=thisOver;
    ball++
    ovreCounter()
    wickets++
    if (wickets == 10) {
        alert("Your Team Is AllOut !!")
        restart()
        return;
    }
    UndoTrack.push("OUT")
   
    wicket.textContent = wickets  
})

undo.addEventListener('click',()=>
{
    let last=UndoTrack.pop();
    if(last==0 || last==1 || last==2 || last==3 || last==4 || last==6)
    {
        runs-=last;
        if(ball>0)
        {ball--;}
        else{
            ov--
            ball=5
        }
        thisOver.pop();
        thisover.textContent=thisOver;
        run.textContent = runs;
        ovreCounter()
    }

    if(last=="LB" || last=="BYE")
    {
        runs-=Number(last.extra);
        console.log(last)
        if(ball>0)
        {ball--;}
        else{
            ov--
            ball=5
        }
        thisOver.pop();
        thisover.textContent=thisOver;
        run.textContent = runs;
        ovreCounter()
    }
})










// un.forEach((e)=>
// {
//     undo.addEventListener('click',()=>
//     {
//         if(e==common)
//         {

//         }
//     })
// })
