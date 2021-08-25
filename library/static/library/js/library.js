function loading_cover(url, id) {
  console.log("debug");
  var url = "/media/" + url;

  // var pdfjsLib = window["pdfjs-dist/build/pdf"];

  // pdfjsLib.GlobalWorkerOptions.workerSrc =
  //   "//mozilla.github.io/pdf.js/build/pdf.worker.js";

  pdfjsLib.getDocument(url).promise.then(function (pdf) {
    pdf.getPage(1).then(function (page) {
      var scale = 0.4;
      var viewport = page.getViewport({ scale: scale });

      var canvas = document.getElementById("canvas-cover-" + id);
      var context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  });
}
