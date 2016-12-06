"use strict";

var OpenSpeedMonitor = OpenSpeedMonitor || {};
OpenSpeedMonitor.ChartModules = OpenSpeedMonitor.ChartModules || {};
OpenSpeedMonitor.ChartModules.UrlHandling = OpenSpeedMonitor.ChartModules.UrlHandling || {};

OpenSpeedMonitor.ChartModules.UrlHandling.PageAggregation = (function () {

    var getUrlParameter = function()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            var currentValue = vars[hash[0]];
            if(currentValue == null){
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            } else if (currentValue.constructor === Array ){
                vars[hash[0]].push(hash[1]);
            } else{
                vars[hash[0]] = [vars[hash[0]],hash[1]]
            }
        }
        return vars;
    };

    var addHandler = function () {
        $('#selectedBrowsersHtmlId').on('change', updateSelectionConstraintBrowser);
    };

    var updateUrl = function() {
        var url = window.location.href;
        //get url after/
        var value = url.substring(url.lastIndexOf('/') + 1);
        //get the part after before ?
        value  = value.split("?")[0];
        return value;
    };

    var setSelections = function (){
        var params = getUrlParameter();
        setJobGroups(params);
        setPages(params);
        setBrowser(params);
        setConnectivity(params);
        setMeasurands(params);
        setStacked(params);
        setTrim(params);
        // if(params != null){
        //     clickShowButton();
        // }

    };
    var setMultiSelect = function(id, values){
        $("#"+id).val(values);
    };
    var setJobGroups = function(params){
        setMultiSelect("folderSelectHtmlId", params['jobGroups']);
    };
    var setPages = function (params) {
        setMultiSelect("pageSelectHtmlId", params['pages']);
    };
    var setBrowser = function (params) {
        setMultiSelect("selectedBrowsersHtmlId", params['browser']);
    };
    var setConnectivity = function (params) {
        setMultiSelect("selectedConnectivityProfilesHtmlId", params['connectivities']);
    };

    var clickShowButton = function(){
        $("#graphButtonHtmlId").click()
    };
    
    var setMeasurands = function (params) {
        var measurands = params['measurand'];
        if(measurands )
        if(measurands.constructor === Array){
            addMeasurands(measurands);
        } else{
            setMultiSelect("firstMeasurandSelect", measurands);
        }
    };
    
    var setStacked = function (params) {
        setMultiSelect("stackedSelect", params['stacked']);
    };

    var setTrim = function (params) {
        $("#appendedInputBelowLoadTimes").val(params["trimAboveLoadTimes"]);
        $("#appendedInputAboveLoadTimes").val(params["trimAboveLoadTimes"]);
        $("#appendedInputBelowRequestCounts").val(params["trimBelowRequestCounts"]);
        $("#appendedInputAboveRequestCounts").val(params["trimAboveRequestCounts"]);
        $("#appendedInputBelowRequestSizes").val(params["trimBelowRequestSizes"]);
        $("#appendedInputAboveRequestSizes").val(params["trimAboveRequestSizes"]);
    };

    var addMeasurands = function (measurands) {
        var currentMeasurand = measurands.shift();
        setMultiSelect("firstMeasurandSelect", currentMeasurand);
        var i;
        var length = measurands.length;
        var currentAddButton =   $("#firstMeasurandAdd");
        for(i=0;i<length;i++){
            currentAddButton.click();
            var clone = $("#additionalMeasurand-clone-"+(i+1));
            clone.find(".additionalMeasurand").val(measurands.shift());
            currentAddButton = clone.find(".addMeasurandButton");
        }
    };


    var timecardResolved =  false;
    var barChartResolved = false;
    var markTimeCardAsResolved = function(){
        timecardResolved = true;
        if(allLoaded()){
               setSelections();
        }
    };
    var markBarChartAsResolved = function(){
        barChartResolved = true;
        if(allLoaded()){
            setSelections();
        }
    };
    var allLoaded = function () {
      return timecardResolved && barChartResolved;
};

    var init = function () {
        $(window).on("selectIntervalTimeframeCardLoaded", function() {
            markTimeCardAsResolved();
        });
        $(window).on("barchartLoaded", function() {
            markBarChartAsResolved();
        });
    };

    return {
        setSelections: setSelections,
        clickShowButton: clickShowButton,
        init: init
    };
});