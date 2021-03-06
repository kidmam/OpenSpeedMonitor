"use strict";

var OpenSpeedMonitor = OpenSpeedMonitor || {};
OpenSpeedMonitor.MeasurementSetupWizard = OpenSpeedMonitor.MeasurementSetupWizard || {};

OpenSpeedMonitor.MeasurementSetupWizard.SelectLocationAndConnectivity = (function () {
    var selectLocationAndConnectivityTab = $("#selectLocationAndConnectivity");
    var locationSelect = $("#inputLocation");
    var connectivitySelect = $("#inputConnectivity");
    var connectivityDefaultOption = connectivitySelect.data("default-option");

    var init = function () {
        locationSelect.on("change", triggerChanged);
        connectivitySelect.on("change", triggerChanged);
        if (connectivityDefaultOption) {
            var defaultValue = connectivitySelect.find("option").filter(function () {
                return $(this).text().trim() === connectivityDefaultOption;
            }).val();
            if (defaultValue) {
                connectivitySelect.val(defaultValue);
                connectivitySelect.trigger("chosen:updated")
            }
        }

    };

    var triggerChanged = function () {
        var event = new Event("changed");
        selectLocationAndConnectivityTab[0].dispatchEvent(event);
    };

    var getConnectivity = function () {
        return connectivitySelect.find("option:selected").text().trim();
    };

    var getBrowserOrLocationName = function () {
        var location = locationSelect.find("option:selected").text().trim();
        var parts = location.split(":");
        return parts[parts.length - 1];
    };

    init();
    return {
        getConnectivity: getConnectivity,
        getBrowserOrLocationName: getBrowserOrLocationName
    }
})();
