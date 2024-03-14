$(function () {
  var includes = $('[data-include]')
  $.each(includes, function () {
    var file = 'includes/' + $(this).data('include') + '.svg'
    $(this).load(file)
  })
})

$('.first-option').hide();

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

/* -------------------------------------------- */
/*            js for plot information           */
/* -------------------------------------------- */

function bhInit() {
  $("svg").attr("id", "panzoom");

  $("g[id^='BH_']").addClass("plotWrapper");
  var plots = $('.plotWrapper');
  var plotAmount = plots.length;
  var plotArray = [];

  for (var i = 0; i < plotAmount; i++) {
    var singlePlotIdNoHash = plots[i].id;
    var plotId = singlePlotIdNoHash.split("_");
    plotArray.push({ "Block": plotId[1], "Sector": plotId[2], "Road": plotId[3], "Plot": plotId[4], "Size": "", "Facing": "", "FileNumber": "", "Status": "", "SellDate": "", "ClientPhone": "", "ClientName": "", "ClientAddress": "" });
  }

  $.each(plotArray, function (i, d) {
    if (d.Status == "Sold") {
      $("#BH_" + d.Block + "_" + d.Sector + "_" + d.Road + "_" + d.Plot).addClass("sold");
    }
  })

  $('.plotWrapper').click(function () {
    var splitted = this.id.split("_");
    var plot;

    var j = plotArray.map(function (item) {
      if (item.Block == splitted[1] && item.Sector == splitted[2] && item.Road == splitted[3] && item.Plot == splitted[4]) {
        plot = item;
      }
    });
    $(".block .pop-value").html(plot.Block);
    $(".sector .pop-value").html(plot.Sector);
    $(".road .pop-value").html(plot.Road);
    $(".plot-number .pop-value").html(plot.Plot);
    $(".size .pop-value").html(plot.Size);
    $(".facing .pop-value").html(plot.Facing);
    $(".file-number .pop-value").html(plot.FileNumber);
    $(".plot-status .pop-value").html(plot.Status);
    $(".sell-date .pop-value").html(plot.SellDate);
    $(".client-phone .pop-value").html(plot.ClientPhone);
    $(".client-name .pop-value").html(plot.ClientName);
    $(".client-address .pop-value").html(plot.ClientAddress);

    $('#plotInfo').modal();
  });

  $('.plotWrapper').hover(function () {
    var plotHovered = this.id;
    $("#" + plotHovered).addClass("hovered");
  }, function () {
    var plotHovered = this.id;
    $("#" + plotHovered).removeClass("hovered");
  });

  const element = document.getElementById('panzoom')
  const panzoom = Panzoom(element, {
    animate: false,
    pinchAndPan: true,
    panOnlyWhenZoomed: true,
    exclude: [".modal"],
    maxScale: 30,
    contain: "outside",
    step: 1
  });

  // enable mouse wheel
  const parent = element.parentElement
  parent.addEventListener('wheel', panzoom.zoomWithWheel);
}

$(document).ajaxComplete(function () {
  bhInit();
});