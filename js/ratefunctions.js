/**
 * Created by jot on 05-10-14.
 */

var rateFunction = function (min, max, jumpProbability, jumpMax, statusContainer) {

    return function () {

        var series = this.series[0];
        var point = {'y': (min+max)/2};
        var range = 100;
        var roundTrips = 0;

        // set up the updating of the chart each second
        setInterval(function () {

            roundTrips++;
            if (roundTrips > jumpProbability) {
                range = jumpMax;
                roundTrips = 0;
            } else {
                range = 100;
            }

            var oldY = point.y;
            var newY = point.y;

            do {
                newY = (Math.random() * (max-min)) + min;
            } while (Math.abs(newY - oldY) > range);

            var x = (new Date()).getTime(), // current time
                y = newY;

            if (point['dataLabels'] !== undefined)
                delete point['dataLabels'];

            var oY = point.y;
            var trendDisplay = 'inline';
            var trendColor = 'green';
            var trend = '+';
            if (oY == y) {
                trendDisplay = 'none';
            } else if (oY > y) {
                trendColor = 'red';
                trend = '-';
            }

            trend += (((Math.abs(oY - y)) / oY) * 100).toFixed(2);
            var trendLabel = '<span style="color: ' + trendColor + '; display: ' + trendDisplay + ';">' + trend + ' %</span>';

            statusContainer.html(parseInt(y) + '<br>' + trendLabel);

            point = {'x': x, 'y': parseInt(y), dataLabels: globalDataLabels};
            series.addPoint(point, true, true);
        }, 5000);

    }

};
