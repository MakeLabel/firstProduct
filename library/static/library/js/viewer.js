console.log("연결완료!");

/*div tag가 담긴 부분만, 설렉션 기능이 가능하도록 만듦. 테그 바꾸어주면 다른 영역에서도 이용가능 */
const selectableTextArea = document.querySelectorAll('div');

console.log(selectableTextArea);
const shareBtn = document.querySelector("#share-btn");
var allTextList = new Array();

selectableTextArea.forEach(elem => {
    elem.addEventListener("mouseup",selectableTextAreaMouseup);
});

/*문서 상에서 설렉션을 했을 때, 저장을 해두고 팝업을 띄어주는 함수. 
이후에, 설렉션을 할 때 형광팬을 칠하고 칠한 내용을 따로 저장하는 내용으로 변경할 에정 */ 
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

/*문서 상에서 클릭을 했을 때, 설렉션 한 부분이 사라지도록 만든 함수*/ 
function documentMouseDown(event) {
    if(getComputedStyle(shareBtn).display==="block" && event.target.id!=="share-btn"){
    shareBtn.style.display = "none";
    shareBtn.classList.remove("btnEnterence");
    window.getSelection().empty();    
    }
}


shareBtn.addEventListener("click", shareBtnClick);

/* share 버튼을 눌렀을 때, 클립보드에 해당 내용을 복사하고, 기존에 보여지고 있었던 설렉션과 팝업을 지워주는 함수*/
function shareBtnClick(event){
    const text = window.getSelection().toString().trim();
    document.execCommand("copy");
    shareBtn.style.display = "none";
    shareBtn.classList.remove("btnEnterence");
    window.getSelection().empty();    
};


/* share 버튼을 눌렀을 때, 클립봅드에 잘 복사 되었음을 보여주는 코드*/
$( "#share-btn" ).click(function() {
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
  });