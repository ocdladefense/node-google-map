const UrlMarker = (function () {

    // Currently being used for testing
    function UrlMarker(data) {
        this.data = !!data.position ? data : null;
        this.url = !!data.markerUrl ? data.markerUrl : data;
        this.position = !!data.position ? data.position : { lat: null, lng: null };

        if (this.url === null) {
            console.log(data);
        }
    }

    function setPosition(position) {
        this.position = position;
    }


    function setIconSize(size) {
        this.size = { height: size.height, width: size.width };
    }


    function createMarker() {
        // Check to see if the marker has a default size property
        let defaultMarkerSize = !!this.size ? this.size : null;

        let marker = new google.maps.Marker({
            map: null,
            animation: google.maps.Animation.DROP, // Animation options - BOUNCE & DROP
            position: this.position,
            icon: {
                url: this.url || null,
                scaledSize: !!defaultMarkerSize ? new google.maps.Size(defaultMarkerSize.height, defaultMarkerSize.width) : new google.maps.Size(30, 33)
            },
            title: !!defaultMarkerSize ? "OCDLA" : null,
            data: this.data
        });

        // Add a click event listener for the info window
        marker.addListener("click", function () {

            // Close any open info windows before creating a new one
            if (window.infoWindow !== undefined) {
                window.infoWindow.close();
            }

            /**
             * If the marker doesn't have data to show the user, do not open an info window
             *  Currently the only marker without data is the OCDLA icon 
             */
            if(marker.data != null) {
                // Set up the info window when clicked
                window.infoWindow = initInfoWindow(marker.data);
                window.infoWindow.open(map, marker);
            }
        });

        return marker;
    }

    function initInfoWindow(marker) {

        console.log(marker);
        // Check the marker type (contact or court)
        if (marker.type == "Member") {
            // Info window for contact marker, showing marker details
            return new google.maps.InfoWindow({
                content:
                    `<div id="infoWindow">
                        <div>
                            <label style="font-size:16px;font-weight:bold;">
                                <a target="_new" href="/directory/member/${marker.Id}">${marker.Name || ""}</a>
                            </label>
                        </div>
                        <div>
                            <label>${marker.primary || ""}</label>
                        </div>
                        <div>
                            <label>${marker.Phone || ""}</label>
                            <label>${marker.Email || ""} </label>
                        </div>
                        <address>
                            <label>${marker.MailingAddress.street}</label>
                            <label>
                                ${marker.MailingAddress.city || ""}, ${marker.MailingAddress.state || marker.MailingAddress.country || ""} ${marker.MailingAddress.postalCode || ""}
                            </label>
                        </address>
                    </div>`
            });
        }

        return new google.maps.InfoWindow({
            // Info window for circuit court locations
            content:
                `<div id="infoWindow" style="text-align:center;">
                    <div>
                        <strong><label style="text-align:center;">${marker.Name}</label><br /></strong>
                    </div>
                    <div>
                     Court info not yet implemented
                    </div>
                    <!--
                    <div>
                        <label>${marker.MailingAddress.street}</label><br>
                        <label>${marker.MailingAddress.city}, ${marker.MailingAddress.state} ${marker.MailingAddress.postalCode}</label><br>
                    </div>
                    <div>
                        <label>${marker.district}<br>
                            <a target="_new" href="https://${marker.website}">${marker.website}</a>   
                        </label>
                    </div> 
                    -->
                </div>`
        });


    }

    UrlMarker.prototype = {
        createMarker: createMarker,
        initInfoWindow: initInfoWindow,
        setPosition: setPosition,
        setIconSize: setIconSize
    };

    return UrlMarker;
})();

export default UrlMarker; 