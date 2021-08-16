"use strict";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

if (!pdfjsLib.getDocument || !pdfjsViewer.PDFPageView) {
  // eslint-disable-next-line no-alert
  alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
}

// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/Users/kyungwon/Desktop/SNU_Hackathon/Make-Label/firstProduct/library/static/library/node_modules/pdfjs-dist/build/pdf.worker.js";

// pdfjsLib.GlobalWorkerOptions.workerSrc =
//   "//mozilla.github.io/pdf.js/build/pdf.worker.js";

// Some PDFs need external cmaps.
//
const CMAP_URL = "../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

// const DEFAULT_URL = "../../web/compressed.tracemonkey-pldi-09.pdf";
const DEFAULT_URL =
  "/media/documents/2021/08/04/맑스주의경제학입문복습문제9_15강부록2_aStjHte.pdf";
const PAGE_TO_VIEW = 1;
const SCALE = 1.0;

const container = document.getElementById("pageContainer");

const eventBus = new pdfjsViewer.EventBus();

// Loading document.
const loadingTask = pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
});
loadingTask.promise.then(function (pdfDocument) {
  // Document loaded, retrieving the page.
  return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
    // Creating the page view with default parameters.
    const pdfPageView = new pdfjsViewer.PDFPageView({
      container,
      id: PAGE_TO_VIEW,
      scale: SCALE,
      defaultViewport: pdfPage.getViewport({ scale: SCALE }),
      eventBus,
      // We can enable text/annotations layers, if needed
      textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
      annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
    });
    // Associates the actual page with the view, and drawing it
    pdfPageView.setPdfPage(pdfPage);
    return pdfPageView.draw();
  });
});
