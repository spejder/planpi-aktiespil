/**
 * Created by jot on 05-10-14.
 */

var stockChart = function (stockName, stockColor, rateFunction) {

    return {
        chart: {
            type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                load: rateFunction
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
                tickPixelInterval: 150,
                labels: {
                style: {
                    fontSize: '12pt'
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                style: {
                    fontWeight: 'bold',
                        fontSize: '14pt'
                }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
                max: 1000,
                min: 50
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: true,
                itemStyle: {
                fontWeight: 'bold',
                    fontSize: '14pt'
            }
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: stockName,
            color: stockColor,
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: parseInt(Math.random() * 1000)//,
                        //dataLabels: globalDataLabels
                    });
                }
                return data;
            })()
        }]
    };

};