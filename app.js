let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let count=0;

let turnO= true; //playerX , playerO

const winPatterns=[
    // row-wise
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // column-wise
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // diagonals
    [0,4,8],
    [2,4,6]
];

const resetGame = () =>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count =0;
}

boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(turnO){ 
            //playerO
            box.innerText="O";
            turnO=false;
            count ++;
        }
        else{
            //playerX
            box.innerText="X"; 
            turnO=true;
            count ++;
        }
        box.disabled=true;

        checkWinner();
    });
});


const disableBoxes = () => {
    for (let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner = (winner) => {
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDrawMsg = () =>{
    msg.innerText=`Oops! It's a Draw.`;
    msgContainer.classList.remove("hide");
}


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;      

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }
    }
    if(count == 9){
        showDrawMsg();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);