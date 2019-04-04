var data = [];
var country = []
var lifeExpectancyAtBirthBothSexes = [];
let newCountry = [];
var currentCountry = 'Afghanistan';
var countries = [];

var lifeExpectancies = {};
var options = {};
var years = [2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000];

var select = document.getElementById("front-page-actual-select");
var selectYear = document.getElementById("select-year");
var selectText = document.getElementById("insert-here").innerHTML;

functionCalledBefore = false;

function propogateLifeExpectanciesObject() {
    for(let i = 0; i < lifeExpectancyAtBirthBothSexes.length; i++) {
        if(lifeExpectancyAtBirthBothSexes[i].dims.COUNTRY == currentCountry) {
            let year = lifeExpectancyAtBirthBothSexes[i].dims.YEAR;
            lifeExpectancies[year] = lifeExpectancyAtBirthBothSexes[i].Value;
        }
    }
    // console.log(lifeExpectancies)
}

for(let i = 0; i < rawdata.length; i++) {
    if(i % 12 == 0) {
        lifeExpectancyAtBirthBothSexes.push(rawdata[i])
    }
}

propogateLifeExpectanciesObject();


for(let i = 0; i < rawdata.length; i++) {
    if(i % 132 == 0) {
        data.push(country);
        country = [];
    } else {
        country.push(rawdata[i])
    }
}


for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
        if(j % 131 == 0) {
            countries.push(data[i][j].dims.COUNTRY);
        }
    }
}

for(let i = 0; i < countries.length; i++) {
    options[i] = countries[i];
}

for(i in options) {
    select.options[select.options.length] = new Option(options[i], i);
};


propogateYearsSelect();
// for(let i = 0; i < years.length; i++) {
//     var opt = years[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.value = opt;
//     selectYear.appendChild(el);
// }


if(select.value != null) {
    updateText();
};



var canvas1 = document.getElementById("canvas1");
canvas1.width = 300;
canvas1.height = 300;
var can1Ctx = canvas1.getContext("2d");
var canvas2 = document.getElementById("canvas2");
canvas2.width = 300;
canvas2.height = 300;

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

function propogateYearsSelect() {
    years = [];
    for(let i = 0; i < lifeExpectancyAtBirthBothSexes.length; i++) {
        if(lifeExpectancyAtBirthBothSexes[i].dims.COUNTRY == currentCountry) {
            years.push(lifeExpectancyAtBirthBothSexes[i].dims.YEAR);
        }
    }

    var node = document.getElementById("select-year");
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }

    for(let i = 0; i < years.length; i++) {
        var opt = years[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectYear.appendChild(el);
    }
}

function updateText() {
    // document.getElementById("insert-here").innerHTML;

    currentCountry = select[select.selectedIndex].innerHTML; 
    currentYear = document.getElementById("select-year").value;
    document.getElementById("myRange").value = currentYear;
    document.getElementById("demo").innerHTML = "Current year: " + currentYear;
    // document.getElementById("select-year").selectedIndex = 1;
    // console.log(currentYear.slice(-1))
    document.getElementById("select-year").value = currentYear;
    for(let i = 0; i < rawdata.length; i++) {
        if(rawdata[i].dims.COUNTRY == select[select.selectedIndex].innerHTML && rawdata[i].dims.YEAR == currentYear && rawdata[i].dims.GHO == 'Life expectancy at birth (years)' && rawdata[i].dims.SEX == 'Both sexes') {
            document.getElementById("insert-here").innerHTML = "is: " + rawdata[i].Value;
        }
    }

    // console.log(select.value);

    if(functionCalledBefore) {
        propogateLifeExpectanciesObject();
        propogateYearsSelect();
        myBarchart.clear();
        myBarchart.draw();
        myLineGraph.clear();
        myLineGraph.draw();
    }

    functionCalledBefore = true;
};

var LineGraph = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.clear = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.drawPoint = function(x, y) {
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, this.options.r, this.options.r, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    this.draw = function() {

        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }

        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = this.canvas.height * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                "#eeeee0"
            );
             
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
            gridValue+=this.options.gridScale;
        }

        var pointIndex = 0;
        var numberOfPoints = Object.keys(this.options.data).length;
        var spaceBetweenPoints = (canvasActualWidth)/numberOfPoints;
        var pointLocations = [];
 
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var pointHeight = Math.round( canvasActualHeight * val/maxValue) ;
            this.drawPoint(
                this.options.padding + pointIndex * spaceBetweenPoints + 20,
                this.canvas.height - pointHeight - this.options.padding,
            );
            pointLocations.push([this.options.padding + pointIndex * spaceBetweenPoints + 20, this.canvas.height - pointHeight - this.options.padding])
 
            this.ctx.font = "bold 9px Arial";
            this.ctx.fillText(categ, spaceBetweenPoints * pointIndex + this.options.padding + 10, this.canvas.height)

            pointIndex++;
        }
        for(let i = 0; i < pointLocations.length; i++) {
            if(i != pointLocations.length - 1) {
                drawLine(this.ctx, pointLocations[i][0], pointLocations[i][1], pointLocations[i+1][0], pointLocations[i+1][1], "black");
            }

        }


    }
}

var Barchart = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.clear = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.draw = function() {
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );
             
            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillStyle = "#000000";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();
 
            gridValue+=this.options.gridScale;
        }
  
        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;
 
        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
            this.ctx.font = "bold 8px Arial";
            this.ctx.fillText(categ, barSize * barIndex + this.options.padding, this.canvas.height - 20)
            barIndex++;
        }
  
    }
}


var myBarchart = new Barchart(
    {
        canvas:canvas1,
        padding:40,
        gridScale:10,
        gridColor:"#eeeeee",
        data:lifeExpectancies,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
);
myBarchart.draw();

myLineGraph = new LineGraph(
    {
        canvas:canvas2,
        data:lifeExpectancies,
        padding:20,
        r:2,
        gridScale:4
    }
);

myLineGraph.draw();

// console.log(document.getElementById("test"));


