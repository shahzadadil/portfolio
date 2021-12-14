let home = {} || home;

home.responsibility = function() {

    const self = this;

    self.load = () => {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(loadResponsibility);

        function loadResponsibility() {

            const data = google.visualization.arrayToDataTable([
                ['Activity', 'Approximate Percentage'],
                ['Interviewing', 2],
                ['PreSales Consulting', 2],
                ['Training', 6],
                ['Mentoring', 10],
                ['Architecture', 20],
                ['Hands-On Development', 60]
            ]);            

            const chart = new google.visualization.PieChart(document.getElementById('ResponsibilityChartContainer'));

            const options = {
                pieHole: 0.3,
                slices: {
                    0: {offset: 0.4},
                    1: {offset: 0.2},
                },
                legend: {
                    alignment: 'center'
                },
                animation: {
                    startup: true,
                    duration: 10000,
                    easing: 'out'
                }
            };

            chart.draw(data, options);
        }
    }
};

const responsibility = new home.responsibility();
responsibility.load();