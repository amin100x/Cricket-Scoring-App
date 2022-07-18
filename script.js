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
let ByeExtra=[];
let WideExtra=[];
let LBExtra=[];
let NbExtra=[];
let WickExtra=[];

function restart()
{
    ov = 0;
    ball = 0;
    runs = 0;
    wickets=0
    run.textContent = 0;
    wicket.textContent = 0
    over.textContent = 0.0;
    thisOver=[];
    thisover.textContent=thisOver;
}

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
        if(e.value=="NB")
        {
            NbExtra.push(extra)
        }
        else
        {
            WideExtra.push(extra)
        }
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
        if(e.value=="LB")
        {
            LBExtra.push(extra)
        }
        else if(e.value=="BYE")
        {
            ByeExtra.push(extra)
        }
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
    let runout=prompt("Is it a Runout ? Any Extra Run on Out?")
    WickExtra.push(runout)
    runs += Number(runout)
    run.textContent = runs;
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
        if(last=="LB")
        {
            let extra=LBExtra.pop();
            runs-=Number(extra);
        }
        else if(last=="BYE")
        {
            let extra=ByeExtra.pop();
            runs-=Number(extra);
        }
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
    if(last=="NB" || last=="WD")
    {
        if(last=="NB")
        {
            let extra=NbExtra.pop();
            runs=runs - (Number(extra))-1;
        }
        else if(last=="WD")
        {
            let extra=WideExtra.pop();
            runs=runs - (Number(extra))-1;
        }
        thisOver.pop();
        thisover.textContent=thisOver;
        run.textContent = runs;
    }
    if(last=="OUT")
    {
        wickets--;
        wicket.textContent = wickets
        if(ball>0)
        {ball--;}
        else{
            ov--
            ball=5
        }
        let runExtra=WickExtra.pop()
        runs-=Number(runExtra);
        run.textContent = runs;
        thisOver.pop();
        thisover.textContent=thisOver;
        ovreCounter();
    }
})
