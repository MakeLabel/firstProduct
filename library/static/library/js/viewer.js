// 아래는 버튼을 클릭했을 때 Modal을 띄워주도록 하는 코드들입니다.

/*selectableTextAreas tag가 담긴 부분만, 설렉션 기능이 가능하도록 만듦. 테그 바꾸어주면 다른 영역에서도 이용가능 */
const selectableTextAreas = document.querySelectorAll('#selectableTextArea');

console.log(selectableTextAreas[0]);
const shareBtn = document.querySelector("#share-btn");
const highlightBtn = document.querySelector("#highlight-btn");
const memoBtn = document.querySelector("#memo-btn");
const selectionMemo = document.querySelector("#selection-memo");
let flagForSelectionMemo = 0;
var allTextList = new Array();


function createHighlight () {
    var highlight = document.createElement('mark');
    highlight.setAttribute('id', 'add-highlight');
    return highlight;
  }

  function getTextNodeFrom(element) {
    // replace with more sophisticated method.
    // The first node does not have to be a text
    // selectableTextAreaAllChlidren = window.getSelection().selectAllChildren('#selectableTextArea');
    // console.log(selectableTextAreaAllChlidren)
    return element.childNodes[0];// 워래 이거였음
    //return selectableTextAreaAllChlidren;
  }

  var range = document.createRange();
  function createRange(node, start, end) {
    range.setStart(node, start);
    range.setEnd(node, end);
    return range;
  }

  function createRangeByCharacterOffset(element, start, end) {
    var textNode = getTextNodeFrom(element);
    var range = createRange(textNode, start, end);
    console.log("textNode :", textNode)
    console.log("element :", element)
    return range;
    }


  var selectableTextArea = document.querySelectorAll('#selectableTextArea')[0]; /////////////// 이거는 나중에 테그에 따라서 바꾸어 주어야 함. 


//createRangeByCharacterOffset(selectableTextArea,{{highlight.highlight_location_ancher}}, {{highlight.highlight_location_focus}}).surroundContents(highlight);

// window.onload = function(highlight){
//     // console.log(highlights); 
//     selectableTextAreas.forEach(elem => {
//         for (var highlight_each in highlight) {
//             const range = document.createRange();
//             console.log(elem.toString());
//             range.setStart(elem, 0);
//             range.setEnd(elem, 1);
//             const mark = document.createElement('mark');
//             range.surroundContents(mark);
//         }
//     });    
// };

// function highlight_onload (highlights){
//     for (var highlight in highlights) {
//         const range = document.createRange();
//         console.log(selectableTextAreas);
//         range.setStart(selectableTextAreas, highlight.high);
//         range.setEnd(selectableTextAreas, highlight.highlight_location_focus);
//         const mark = document.createElement('mark');
//         range.surroundContents(mark)};
//     console.log("end Load");
// };






selectableTextAreas.forEach(elem => {
    elem.addEventListener("mouseup", selectableTextAreasMouseup);
// selectableTextArea.forEach((elem) => {
//   elem.addEventListener("mouseup", selectableTextAreaMouseup);
});


/*문서 상에서 설렉션을 했을 때, 저장을 해두고 팝업을 띄어주는 함수. 
이후에, 설렉션을 할 때 형광팬을 칠하고 칠한 내용을 따로 저장하는 내용으로 변경할 에정 */ 
function selectableTextAreasMouseup(event) {
    // var selectedText = window.getSelection().toString().trim();
    setTimeout(() => {
        var selectedText = window.getSelection();
        console.log("debug");
        if (selectedText.toString().length){
            // console.log(selectedText);
            // console.log(selectedText.toString()); 
            // allTextList.push(selectedText);
            // console.log(allTextList);
            const x = event.pageX;
            // console.log(x);
            const y = event.pageY;
            // console.log(y);
            const highlightBtnWidth = Number(getComputedStyle(highlightBtn).width.slice(0,-2));
            const highlightBtnHeight = Number(getComputedStyle(highlightBtn).height.slice(0,-2));
            highlightBtn.style.left = x-highlightBtnWidth*1 + 'px';
            highlightBtn.style.top = y-highlightBtnHeight*1 + 'px';
            highlightBtn.style.display = "block";
            // highlightBtn.style.left = x-shareBtnWidth*2.5 + 'px';
            // highlightBtn.style.top = y-shareBtnHeight*1 + 'px';
            // highlightBtn.style.display = "block";
            // memoBtn.style.left = x+shareBtnWidth*0.2 + 'px';
            // memoBtn.style.top = y-shareBtnHeight*1 + 'px';
            // memoBtn.style.display = "block";
            // shareBtn.classList.add("btnEnterance")
        };
    },0);
}

window.addEventListener("mousedown", documentMouseDown);

/*문서 상에서 클릭을 했을 때, 설렉션 한 부분이 사라지도록 만든 함수*/
function documentMouseDown(event) {
    var target = event.target;
    if(getComputedStyle(highlightBtn).display==="block" && event.target.id!=="highlight-btn" && event.target.id!=="share-btn" && event.target.id!=="memo-btn"){
        shareBtn.style.display = "none";
        highlightBtn.style.display = "none";
        memoBtn.style.display = "none";
        selectionMemo.style.display = "none";
        shareBtn.classList.remove("btnEnterence");
        window.getSelection().empty();    
    } else if(getComputedStyle(highlightBtn).display==="block" && event.target.id!=="highlight-btn"){
        shareBtn.style.display = "none";
        highlightBtn.style.display = "none";
        memoBtn.style.display = "none";
        selectionMemo.style.display = "none";
        shareBtn.classList.remove("btnEnterence");
        window.getSelection().empty(); 
    } else if(getComputedStyle(selectionMemo).display==="block" && flagForSelectionMemo == 1){
        // shareBtn.style.display = "none"; 
        // highlightBtn.style.display = "none";
        // memoBtn.style.display = "none";
        flagForSelectionMemo = 2;  
    } 
    else if(getComputedStyle(selectionMemo).display==="block" && flagForSelectionMemo == 2 && (event.target.id != "selection-memo") ){
        // shareBtn.style.display = "none"; 
        // highlightBtn.style.display = "none";
        // memoBtn.style.display = "none";
        flagForSelectionMemo = 0;
        selectionMemo.style.display = "none";   
    }
};

// shareBtn.addEventListener("click", shareBtnClick);

/* share 버튼을 눌렀을 때, 클립보드에 해당 내용을 복사하고, 기존에 보여지고 있었던 설렉션과 팝업을 지워주는 함수*/
async function shareBtnClick(){
    console.log("share btn click");
    // document.getElementById("request_viewer").setAttribute("method", "GET");
    const text = window.getSelection().toString().trim();
    document.execCommand("copy");
    shareBtn.style.display = "none";
    highlightBtn.style.display = "none";
    memoBtn.style.display = "none";
    // shareBtn.classList.remove("btnEnterence");
    window.getSelection().empty();    
};


/* share 버튼을 눌렀을 때, 클립봅드에 잘 복사 되었음을 보여주는 코드*/
$( "#share-btn" ).click(function() {
    $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
});




// highlightBtn.addEventListener("click", highlightBtnClick);

function countNodeInSelectableTextArea(){
    
}




async function highlightBtnClick(){
               // 비동기로 highlight를 해주는 기능
    console.log("highlight btn click");
    var selectedText_first_node = window.getSelection();
    var selectedText = window.getSelection();
    var selectedTextString = selectedText.toString();
    if (selectedTextString.length){
        let data = new FormData();
        console.log(selectedTextString);
        console.log(selectedText);
        data.append('highlight_text', selectedTextString);
        data.append('highlight_location_ancher', selectedText.anchorOffset); // 여기다가 전 node 들 text 수 더해야 함.
        console.log(selectedText.anchorOffset);
        data.append('highlight_location_focus', selectedText.focusOffset);
        console.log(selectedText.focusOffset);
        for (var pair of data.entries()){
            console.log(pair[0]+ ', ' + pair[1]);
        } 
        
        const highlight_data = await axios.post(`/library/viewer/`, data);
        // const { highlight_text, highlight_location_ancher, highlight_location_focus } = highlight_data.data;
        // console.log(highligt_data.data);

        shareBtn.style.display = "none";
        highlightBtn.style.display = "none";
        memoBtn.style.display = "none";
        // shareBtn.classList.remove("btnEnterence");
        window.getSelection().empty();  
    }
}


memoBtn.addEventListener("mousedown", memoBtnClick);

function memoBtnClick(event){
    flagForSelectionMemo = 1;
    console.log("memo btn click");
    const text = window.getSelection().toString().trim();
    selectionMemo.style.display = "block";
    shareBtn.style.display = "none";
    highlightBtn.style.display = "none";
    memoBtn.style.display = "none";
    window.getSelection().empty();
    const x = event.pageX;
    const y = event.pageY;
    const memoPopUpWidth = Number(getComputedStyle(memoBtn).width.slice(0,-2));
    const memoPopUpHeight = Number(getComputedStyle(memoBtn).height.slice(0,-2));
    selectionMemo.style.left = x-memoPopUpWidth*1 + `px`;
    selectionMemo.style.top = y-memoPopUpHeight*1 + `px`;

    

};

window.onload = function(){


const clickableHighlightedTextAreas = document.querySelectorAll('#add-highlight');
console.log(clickableHighlightedTextAreas)

clickableHighlightedTextAreas.forEach(elem => {
    elem.addEventListener("click", showBtnForHighlights);
});

function showBtnForHighlights(event){
    console.log("debug-add-highlight")
    const x = event.pageX;
    // console.log(x);
    const y = event.pageY;
    // console.log(y);
    const shareBtnWidth = Number(getComputedStyle(shareBtn).width.slice(0,-2));
    const shareBtnHeight = Number(getComputedStyle(shareBtn).height.slice(0,-2));
    shareBtn.style.left = x-shareBtnWidth*1 + 'px';
    shareBtn.style.top = y-shareBtnHeight*1 + 'px';
    shareBtn.style.display = "block";
    highlightBtn.style.left = x-shareBtnWidth*2.5 + 'px';
    highlightBtn.style.top = y-shareBtnHeight*1 + 'px';
    highlightBtn.style.display = "block";
    memoBtn.style.left = x+shareBtnWidth*0.2 + 'px';
    memoBtn.style.top = y-shareBtnHeight*1 + 'px';
    memoBtn.style.display = "block";
};
};







//// 이따 지워줘야 함. 
// function selectableTextAreasMouseup(event) {
//     // var selectedText = window.getSelection().toString().trim();
//     setTimeout(() => {
//         var selectedText = window.getSelection();
//         if (selectedText.toString().length){
//             // console.log(selectedText);
//             // console.log(selectedText.toString()); 
//             // allTextList.push(selectedText);
//             // console.log(allTextList);
//             const x = event.pageX;
//             // console.log(x);
//             const y = event.pageY;
//             // console.log(y);
//             const shareBtnWidth = Number(getComputedStyle(shareBtn).width.slice(0,-2));
//             const shareBtnHeight = Number(getComputedStyle(shareBtn).height.slice(0,-2));
//             shareBtn.style.left = x-shareBtnWidth*1 + 'px';
//             shareBtn.style.top = y-shareBtnHeight*1 + 'px';
//             shareBtn.style.display = "block";
//             highlightBtn.style.left = x-shareBtnWidth*2.5 + 'px';
//             highlightBtn.style.top = y-shareBtnHeight*1 + 'px';
//             highlightBtn.style.display = "block";
//             memoBtn.style.left = x+shareBtnWidth*0.2 + 'px';
//             memoBtn.style.top = y-shareBtnHeight*1 + 'px';
//             memoBtn.style.display = "block";
//             // shareBtn.classList.add("btnEnterance")
//         };
//     },0);
// }
// /////















// function highlightBtnClick(event){
//     console.log("highlight btn click");
//     var selectedText = window.getSelection();
//     var selectedTextString = selectedText.toString();
//     console.log(selectedText);
//     console.log(selectedTextString); 
//     if (selectedTextString.length){
//         allTextList.push(selectedText);
//         console.log(allTextList);
//         console.log(allTextList.length);


//         // console.log(selectedText.);

//         for (var i = 0; i < allTextList.length; i++){
//             var eachTextList = allTextList[i];
//             console.log(eachTextList.toString());
//             var eachTextListString = eachTextList.toString();
//             var mark = document.createElement('MARK');
//             mark.textContent = eachTextListString;
//             var range = selectedText.getRangeAt(0);
//             range.deleteContents();
//             range.insertNode(mark);
//         }

        

//         // selectedText.anchorOffset
        
//         shareBtn.style.display = "none";
//         highlightBtn.style.display = "none";
//         memoBtn.style.display = "none";
//         // shareBtn.classList.remove("btnEnterence");
//         window.getSelection().empty();   
//     };
// };











