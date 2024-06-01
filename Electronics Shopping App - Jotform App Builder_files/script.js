'use strict';

JFCustomWidget.subscribe("ready", function () {

    var parseZoom = function(input) { // map 1 to 21 between -2 to 4
        var zoom;

        if(input && input != '<empty>') {
            zoom = parseInt(input || 10);
        }

        if(!zoom || zoom < 1 || zoom > 21) {
            zoom = 10;
        }

        zoom = -2 + (0.3 * zoom);

        return zoom;
    };

    var isMobile = function() {
        var ua = navigator.userAgent.toLowerCase();
        return (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(ua)) ||
            (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(ua)) ||
            (ua.indexOf('macintosh') > -1 && navigator.maxTouchPoints > 1);
    }();

    var isIOS = function() {
        var ua = navigator.userAgent.toLowerCase();
        return (/iphone|ipod|ipad/i.test(ua) ||
                ((ua === 'macintel') && navigator.maxTouchPoints > 1)) &&
                !window.MSStream;
    }();

    var settings = JFCustomWidget.getWidgetSettings();
    var baseURL = 'https://www.openstreetmap.org/export/embed.html?bbox={lngStart},{latStart},{lngEnd},{latEnd}&marker={lat},{lng}';
    var linkBaseUrl = "https://www.openstreetmap.org/#map=19/{lat}/{lng}";
    if (isMobile || JFCustomWidgetUtils.isMobile()) {
        /** 
         * geo URI does not work on iOS devices.
         * Can not open native map application selection modal from links.
         * Apple Maps is the default now for iOS.
        */
        linkBaseUrl = isIOS ? "https://maps.apple.com/?ll={lat},{lng}" : "geo:{lat},{lng}?q={lat},{lng}&z=19";
    }
    var lat = Number(settings.lat) || 0;
    var lng = Number(settings.lng) || 0;
    var zoom = parseZoom(settings.zoom)
    var zoomDiff = Math.pow(10, -zoom);
    var latStart = lat - zoomDiff;
    var latEnd = lat + zoomDiff;
    var lngStart = lng - zoomDiff;
    var lngEnd = lng + zoomDiff;
    var url = baseURL
        .replace(/\{lat\}/g, lat)
        .replace(/\{lng\}/g, lng)
        .replace(/\{lngStart\}/g, lngStart)
        .replace(/\{lngEnd\}/g, lngEnd)
        .replace(/\{latStart\}/g, latStart)
        .replace(/\{latEnd\}/g, latEnd);
    var linkUrl = linkBaseUrl
        .replace(/\{lat\}/g, lat)
        .replace(/\{lng\}/g, lng)
        .replace(/\{zoom\}/g, zoom);
    var container = document.getElementById("addressContainer");
    var iframe = document.createElement("IFRAME");
    iframe.src = url;
    var link = document.createElement("A");
    link.href = linkUrl;
    link.target = "_blank";
    link.innerHTML = '<div><svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 368.553 368.553"><path d="M184.277 0c-71.683 0-130 58.317-130 130 0 87.26 119.188 229.855 124.263 235.883a7.498 7.498 0 0 0 5.705 2.67h.032a7.5 7.5 0 0 0 5.696-2.621c5.075-5.926 124.304-146.165 124.304-235.932-.001-71.683-58.317-130-130-130zm.045 349.251C160.385 319.48 69.277 201.453 69.277 130c0-63.411 51.589-115 115-115s115 51.589 115 115c-.001 73.49-90.95 189.829-114.955 219.251z"/><path d="M184.277 72.293c-30.476 0-55.269 24.793-55.269 55.269s24.793 55.269 55.269 55.269 55.269-24.793 55.269-55.269-24.793-55.269-55.269-55.269zm0 95.537c-22.204 0-40.269-18.064-40.269-40.269s18.064-40.269 40.269-40.269 40.269 18.064 40.269 40.269-18.066 40.269-40.269 40.269z"/></svg></div>';
    container.appendChild(iframe);
    container.appendChild(link);
});
