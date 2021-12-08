const cells = document.querySelectorAll(".notes");
const map = {
    2000 : cells[0],
    500  : cells[1],
    100  : cells[2],
    20   : cells[3],
    10   : cells[4],
    5    : cells[5],
    1    : cells[6]
}

const billAmt   = document.querySelector("#amount");
const cashGiven = document.querySelector("#cash");
const checkBtn  = document.querySelector(".btn");
const error     = document.querySelector(".error-message")
// Housekeeping
billAmt.value   = ""
cashGiven.value = ""


const fillCell  = (denomination, num) =>{
    map[denomination].innerText = num
}

const getChange = (denominations, diff) =>{
    let leftAmt  = diff;
    let result = {};
    denominations.forEach((d)=>{
        let numNotes = Math.floor(leftAmt/d);
        result[d] = numNotes;
        leftAmt = leftAmt%d;
    })
    return result;
}


checkBtn.addEventListener("click",()=>{
    let amount = billAmt.value;
    let cash   = cashGiven.value;
    if(amount==="" || cash === ""){
        error.innerText = "Please enter valid numerical amounts"
        error.style.color = "red"
        return;
    }
    amount = Number(amount);
    cash   = Number(cash);
    let diff = cash-amount;
    if(diff<0){
        error.innerText = "Insufficient cash"
        error.style.color = "red"
        error.style.fontWeight = 600;
        return;
    }
    if(diff==0){
        error.innerText = "No change needed to be given! Thanks for giving us the exact amount!"
        error.style.color = "green";
        return;
    }
    let denominations = Object.keys(map);
    let changeNotes = getChange(denominations.reverse(), diff);
    denominations.forEach((d)=>{
        fillCell(d, changeNotes[d])
    })
})

