console.log("연결완료!");


const selectableTextArea = document.querySelectorAll('div');
console.log(selectableTextArea);
const shareBtn = document.querySelector("#share-btn");

var allTextList = new Array();


selectableTextArea.forEach(elem => {
    elem.addEventListener("mouseup",selectableTextAreaMouseup);
});


function selectableTextAreaMouseup(event) {
    // var selectedText = window.getSelection().toString().trim();
    setTimeout(() => {
        var selectedText = window.getSelection();
        if (selectedText.toString().length){
        console.log(selectedText);
        console.log(selectedText.toString()); 
        allTextList.push(selectedText);
        console.log(allTextList);
        const x = event.pageX;
        // console.log(x);
        const y = event.pageY;
        // console.log(y);
        const shareBtnWidth = Number(getComputedStyle(shareBtn).width.slice(0,-2));
        const shareBtnHeight = Number(getComputedStyle(shareBtn).height.slice(0,-2));
        shareBtn.style.left = x-shareBtnWidth*1 + 'px';
        shareBtn.style.top = y-shareBtnHeight*1 + 'px';
        shareBtn.style.display = "block";
        shareBtn.classList.add("btnEnterance")
        };
    },0);
}

document.addEventListener("mousedown", documentMouseDown);

function documentMouseDown(event) {
    if(getComputedStyle(shareBtn).display==="block" && event.target.id!=="share-btn"){
    shareBtn.style.display = "none";
    shareBtn.classList.remove("btnEnterence");
    window.getSelection().empty();    
    }
}


shareBtn.addEventListener("click", shareBtnClick);

function shareBtnClick(event){
    const text = window.getSelection().toString().trim();
    document.execCommand("copy");
    shareBtn.style.display = "none";
    shareBtn.classList.remove("btnEnterence");
    window.getSelection().empty();    
    
    

};


$( "#share-btn" ).click(function() {
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
  });