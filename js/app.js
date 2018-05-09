"use strict";

// import $ from 'jquery'
// import {} from 'googlemaps'

(function() {
  let instance;

  class Meetup {
    constructor(args) {
      if (instance) {
        return instance;
      }
      this.key = args.key;
      this.ᕯDisplayQuery = $.proxy(this.displayQuery, this);
      this.ᕯDisplayFailure = $.proxy(this.displayFailure, this);
      this.map = new Map({ mapID: "map" });
      instance = this;
    }
    init() {
      this.findElements();
      this.bindEvents();
      this.getCountryCodes();
    }
    getCountryCodes() {
      $.getJSON("/js/countries.json", $.proxy(this.buildSelect, this));
    }
    buildSelect(results) {
      let options = results.map(
        v => jQuery.parseHTML(`<option value="${v.Code}">${v.Name}</option>`)[0]
      );
      this.$country.append(options);
    }
    findElements() {
      this.$queryForm = $("form");
      this.$country = $("#country");
      this.$state = $("#state");
      this.$count = $("#count");
      this.$topRow = this.$queryForm.parent();
      this.$resultCard = $("#resultsCard");
      this.$noResultsCard = $("#noResultsCard");
      this.$errorCard = $("#errorCard");
    }
    updateMap(data) {
      this.map.clearMarkers();
      this.map.setMarkers(data);
      this.map.setCenter();
    }
    bindEvents() {
      this.$queryForm.submit($.proxy(this.callAPI, this));
    }
    displayQuery(response) {
      if (response.meta.total_count !== 0) {

        response.results = response.results.slice(0,this.count);
        let spans = $("span");

        spans[0].innerText =
          response.results[0].state && this.$state.val()
            ? `${response.results[0].state} - ${response.results[0].localized_country_name}`
            : `${response.results[0].localized_country_name}`;

        spans[1].innerText = "1";
        spans[2].innerText =
          this.$count.val() > response.meta.count ? response.meta.count : this.$count.val();
        spans[3].innerText = response.meta.total_count;

        this.$resultCard.toggleClass("d-none", false);
        this.$resultCard.toggleClass("invisible", false);
        this.$errorCard.toggleClass("d-none", true);
        this.$noResultsCard.toggleClass("d-none", true);

        this.updateMap(response.results);
      } else {
        this.$noResultsCard.toggleClass("d-none", false);
        this.$errorCard.toggleClass("d-none", true);
        this.$resultCard.toggleClass("d-none", true);
      }
    }
    displayFailure() {
      this.$errorCard.toggleClass("d-none", false);
      this.$noResultsCard.toggleClass("d-none", true);
      this.$resultCard.toggleClass("d-none", true);
    }
    buildMap(cities) {}
    /**
     * @param {Event} event
     * @memberof Meetup
     */
    callAPI(event) {
      event.preventDefault();
      this.count = this.$count.val()

      let request = new MeetupQuery({
        key: this.key,
        country: this.$country.val(),
        state: this.$state.val(),
        sCallback: this.ᕯDisplayQuery,
        fCallback: this.ᕯDisplayFailure
      });
      request.init();
    }
  }

  class Map {
    /**
     * Creates an instance of Map.
     * @param {MapArgs} args
     * @memberof Map
     */
    constructor(args) {
      this.markers = [];
      this.infoWindows = [];

      this._map = this.map = new google.maps.Map(document.getElementById(args.mapID), {
        zoom: 4,
        center: { lat: 38.850033, lng: -87.6500523 },
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      });
    }
    setMarkers(data) {
      for (const item of data) {
        let marker = new google.maps.Marker({
          position: { lat: item.lat, lng: item.lon },
          map: this.map,
          title: item.city
        });

        {
          let infoContent = `<div class=" light"><div class="card-header mt-1">
                              <h6 class="m-0">${item.city} - ${item.localized_country_name}</h6>
                              </div>
                                <ul class="list-group list-group-flush">
                                <li class="list-group-item">Member Count: ${item.member_count}</li>
                                 <li class="list-group-item">State: ${item.state || "N/A"}</li>
                                 <li class="list-group-item">Rank: ${item.ranking}</li>
                                <li class="list-group-item">Zip: ${item.zip}</li>
                                </ul>
                             </div>`;
          let infoWindows = new google.maps.InfoWindow({ content: infoContent });

          marker.addListener("click", function() {
            infoWindows.open(this.map, marker);
          });
        }

        this.markers.push(marker);
      }
    }
    clearMarkers() {
      for (let marker of this.markers) {
        google.maps.event.clearInstanceListeners(marker);
        marker.setMap(null);
      }
      this.markers = [];
    }
    setCenter() {
      if (this.markers.length > 0) {
        let bounds = new google.maps.LatLngBounds();
        for (const marker of this.markers) {
          bounds.extend(marker.getPosition());
        }
        this.map.fitBounds(bounds);
      }
    }
  }

  /**
   *
   * Handles Meetup API Queries
   * @class MeetupQuery
   */
  class MeetupQuery {
    /**
     * Creates an instance of API.
     * @param {API_SETTINGS} settings
     * @memberof API
     */
    constructor(settings) {
      this.key = settings.key;
      this.country = settings.country;
      this.state = settings.state;
      this.sCallback = settings.sCallback;
      this.done = $.proxy(this.sRequest, this);
      this.fail = $.proxy(this.fRequest, this);
    }

    init() {
      if (this.isLocal()) {
        this.getLocal();
      } else {
        this.getRequest();
      }
    }
    isLocal() {
      this.local = localStorage.getItem(`${this.country}:${this.state}`);
      return this.local !== null;
    }
    getLocal() {
      this.sCallback(JSON.parse(this.local));
    }
    saveLocal(data) {
      localStorage.setItem(`${this.country}:${this.state}`, JSON.stringify(data));
    }
    getRequest() {
      $.get(
        "https://api.meetup.com/2/cities",
        {
          key: this.key,
          sign: true,
          state: this.state,
          country: this.country
        },
        this.done,
        "jsonp"
      ).fail(this.fail);
    }
    sRequest(response) {
      this.next = response.meta.next;
      this.saveLocal(response);
      this.sCallback(response);
    }
    fRequest() {
      this.fCallback(response);
    }
  }

  $(function() {
    let app = new Meetup({ key: "714b4c398126f73c7942b184a2a40" });
    app.init();
  });
})();
/**
 * @typedef API_SETTINGS
 * @property {String} key
 * @property {String} country
 * @property {String} state
 * @property {Number} count
 * @property {function} callback
 */

/**
 * @typedef MapArgs
 * @property {String} mapID
 * @property {google.maps.MapOptions} options
 */
