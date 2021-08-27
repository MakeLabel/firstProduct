var url =
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
var url =
  "/media/documents/2021/08/04/맑스주의경제학입문복습문제9_15강부록2_aStjHte.pdf";

var pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

var pdfDoc = null,
  pageNum = 1,
  pageRendering = false,
  pageNumPending = null,
  scale = 1,
  canvas = document.getElementById("pdf-example"),
  ctx = canvas.getContext("2d");

function renderPage(num) {
  pageRendering = true;

  pdfDoc.getPage(num).then(function (page) {
    var viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    var renderTask = page.render(renderContext);

    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  document.getElementById("page_num").textContent = num;
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * show previous page
 */
function onPrevPage() {
  if (pageNum > 1) {
    pageNum--;
    queueRenderPage(pageNum);
  }
  re;
}

document.getElementById("prev").addEventListener("click", onPrevPage);

/**
 * show next page
 */
function onNextPage() {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    queueRenderPage(pageNum);
  }
}

document.getElementById("next").addEventListener("click", onNextPage);

/**
 * PDF async "download".pdfDoc_
 */
pdfjsLib.getDocument(url).promise.then(function (pdf) {
  //Set loaded PDF to main pdfDoc variable
  pdfDoc = pdf;

  //Show number of pages in document
  document.getElementById("page_count").textContent = pdfDoc.numPages;

  renderPage(pageNum);
});

var pdfjsLib = window["pdfjs-dist/build/pdf"];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

pdfjsLib.getDocument(url).promise.then(function (pdf) {
  // Get div#container and cache it for later use
  var container = document.getElementById("container");

  // Loop from 1 to total_number_of_pages in PDF document
  for (var i = 1; i <= pdf.numPages; i++) {
    // Get desired page
    pdf.getPage(i).then(function (page) {
      var scale = 1.5;
      var viewport = page.getViewport(scale);
      var div = document.createElement("div");

      // Set id attribute with page-#{pdf_page_number} format
      div.setAttribute("id", "page-" + (page.pageIndex + 1));

      // This will keep positions of child elements as per our needs
      div.setAttribute("style", "position: relative");

      // Append div within div#container
      container.appendChild(div);

      // Create a new Canvas element
      var canvas = document.createElement("canvas");

      // Append Canvas within div#page-#{pdf_page_number}
      div.appendChild(canvas);

      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Render PDF page
      page
        .render(renderContext)
        .promise.then(function () {
          // Get text-fragments
          return page.getTextContent();
        })
        .then(function (textContent) {
          // Create div which will hold text-fragments
          var textLayerDiv = document.createElement("div");

          // Set it's class to textLayer which have required CSS styles
          textLayerDiv.setAttribute("class", "textLayer");

          // Append newly created div in `div#page-#{pdf_page_number}`
          div.appendChild(textLayerDiv);

          // Create new instance of TextLayerBuilder class
          var textLayer = new TextLayerBuilder({
            textLayerDiv: textLayerDiv,
            pageIndex: page.pageIndex,
            viewport: viewport,
          });

          // Set text-fragments
          textLayer.setTextContent(textContent);

          // Render text-fragments
          textLayer.render();
        });
    });
  }
});
