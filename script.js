function charts() {
    var tempResult = {}; //declare a new object.
    $.ajax({
        url: "http://twin.iab.berlin:8086/query?pretty=true&db=twin",
        type: "get",
        data: {
            q:
        "select pressure from V2 where hash='virtual/SingleStage' order by time desc limit 10"
        },
        success: function(data) {
            tempResult = data.results[0].series[0].values;
            draw(tempResult);
        },
        error: function() {
            console.log("AjaxError");
        }
    });
    function draw(tempResult) {
        var timeAxe = [];
        var pressureAxe = [];
        var getTime = function(tempResult) {
            for (var i = 0; i < tempResult.length; i++) {
                timeAxe.push(tempResult[i][0]);
            }
            return timeAxe;
        };
        getTime(tempResult);
        var getPressure = function(tempResult) {
            for (var i = 0; i < tempResult.length; i++) {
                pressureAxe.push(tempResult[i][1]);
            }
            return pressureAxe;
        };
        getPressure(tempResult);
        var trace1 = {
            x: timeAxe,
            y: pressureAxe,
            mode: "lines+markers",
            name: "Scatter + Lines"
        };
        var data = [trace1];
        var layout = {
            title: "V2",
            xaxis: {
                title: "time"
            },
            yaxis: {
                title: "pressure"
            }
        };
        Plotly.newPlot("myDiv", data, layout, { showSendToCloud: true });
    }
}
setInterval(function() {
    charts();
}, 1000);
