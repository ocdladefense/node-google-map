const Marker = (function () {
	//standard marker, pass in an image
    //url field is for linking to other pages
     function Marker(data) {
        this.data = !!data.name ? data : null;
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

	function setIcon(icon) {
		this.icon = icon;
	}

	function setLabel(label) {
		this.label = label;
	}

	function setRelated(obj) {
		this.relatedTo = obj;
	}

	function setColor(color) {
		this.color = color;
	}

	function setPosition(pos) {
		this.position = pos;
	}

	// Not sure what the significance of the vendor parameter is here
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
            title: !!defaultMarkerSize ? "Example" : null,
            data: this.data
        });

        marker.addListener("click", function () {

            // Close any open info windows before creating a new one
            if (window.infoWindow !== undefined) {
                window.infoWindow.close();
            }

            /**
             * If the marker doesn't have data to show the user, do not open an info window
             * 
             */
            if (marker.data != null) {
                // Set up the info window when clicked
                window.infoWindow = initInfoWindow(marker);
                window.infoWindow.open(map, marker);
            }
        });

        return marker;
    }

    function initInfoWindow(marker) {

            return new google.maps.InfoWindow({
                content:
                    `<div id="infoWindow">
                        <div>
                            <h1 style="text-align:center;">${marker.data.name}</h1>
                        </div>
                    </div>`
            });
        }



	Marker.prototype = {
		setPosition: setPosition,
		createMarker: createMarker,
        initInfoWindow: initInfoWindow,
        setPosition: setPosition,
        setIconSize: setIconSize
	};


	return Marker;
})();

export default Marker;