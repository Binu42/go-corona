axios.get('https://corona.lmao.ninja/all')
  .then(cases => {
    data = cases.data
    document.getElementById('cases').innerHTML = `Cases:- <b>${data.cases}</b>`
    document.getElementById('death').innerHTML = `Death:- <b>${data.deaths}</b>`
    document.getElementById('recovered').innerHTML = `Recovery:- <b>${data.recovered}</b>`
  })


axios.get('https://corona.lmao.ninja/v2/jhucsse')
  .then(properties => {
    // console.log(properties.data)
    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('#page').style.display = 'block';
    L.mapbox.accessToken = 'pk.eyJ1Ijoia2JpbnU0MiIsImEiOiJjanlpN2F1NTAwN2Q2M2NueHIwejdlMDFmIn0.fswJto5sPhUkQjxQAC-FRw';
    var map = L.mapbox.map('map')
      .setView([24.046499911647572, 83.4514499707725], 5)
      .addLayer(L.mapbox.styleLayer('mapbox://styles/kbinu42/ck4scwiks8qkz1cms8b2suq5d'))
      .addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true,
        types: 'country'
      }));

    // to get current location
    L.control.locate().addTo(map);

    // for marker adding to map and popup adding to each marker.
    var markers = new L.MarkerClusterGroup();
    const cases = properties.data;
    for (var i = 1; i < cases.length; i++) {
      var marker = L.marker(new L.LatLng(cases[i].coordinates.latitude, cases[i].coordinates.longitude), {
        icon: L.mapbox.marker.icon({ 'marker-symbol': 'city', 'marker-color': '333' }),
        title: cases[i].address_line_1
      });
      marker.setIcon(L.divIcon({
        className: 'my-icon',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="10 10 14 14"><path d="M12 2c1.403 0 2.171 1.603 1.353 2.698-.435.58-.668 1.278-.668 2.002 0 1.341 1.63 2.017 2.579 1.068.51-.51.841-1.173.944-1.888.194-1.351 1.87-1.945 2.864-.951.994.994.399 2.669-.951 2.864-.717.103-1.377.432-1.889.944-.944.943-.271 2.579 1.068 2.579.722 0 1.425-.235 2.003-.668 1.088-.818 2.697-.055 2.697 1.352s-1.607 2.169-2.697 1.352c-.58-.434-1.278-.668-2.003-.668-1.343 0-2.014 1.634-1.062 2.585.507.508 1.167.837 1.879.938 1.357.193 1.946 1.873.955 2.864-.994.994-2.669.399-2.864-.951-.103-.717-.432-1.377-.944-1.889-.951-.951-2.579-.264-2.579 1.078 0 .718.234 1.417.666 1.991.825 1.1.047 2.7-1.351 2.7-1.406 0-2.17-1.605-1.352-2.697.434-.58.667-1.279.667-2.003 0-1.342-1.63-2.017-2.579-1.068-.511.51-.842 1.173-.944 1.888-.195 1.351-1.87 1.945-2.864.951s-.398-2.669.952-2.864c.717-.103 1.376-.432 1.888-.944.949-.949.274-2.579-1.068-2.579-.722 0-1.425.235-2.002.668-1.094.819-2.698.05-2.698-1.352 0-1.403 1.603-2.172 2.698-1.353.58.435 1.278.668 2.002.668 1.343 0 2.017-1.63 1.068-2.579-.51-.51-1.173-.841-1.888-.944-1.35-.194-1.945-1.869-.951-2.863s2.669-.4 2.864.951c.103.717.432 1.377.944 1.888.948.95 2.578.274 2.578-1.068 0-.722-.235-1.425-.667-2.002-.819-1.095-.05-2.698 1.352-2.698zm0-2c-1.896 0-3.406 1.405-3.653 3.19-1.451-1.101-3.499-1.009-4.832.325-1.319 1.319-1.433 3.37-.333 4.833-1.739.241-3.182 1.714-3.182 3.652 0 1.859 1.387 3.401 3.183 3.652-1.097 1.458-.993 3.508.332 4.833 1.324 1.325 3.374 1.432 4.831.325.25 1.785 1.756 3.19 3.654 3.19 1.88 0 3.404-1.389 3.654-3.19 1.454 1.104 3.503 1.004 4.831-.325 1.33-1.33 1.423-3.384.333-4.833 1.796-.251 3.182-1.793 3.182-3.652s-1.386-3.401-3.182-3.652c1.1-1.46.988-3.512-.333-4.833-1.325-1.326-3.374-1.431-4.832-.325-.247-1.787-1.758-3.19-3.653-3.19zm-1.637 14.228c-.456 0-.825-.369-.825-.825s.369-.825.825-.825c.456 0 .825.369.825.825s-.37.825-.825.825zm1.052-2.62c-.715 0-1.294-.579-1.294-1.294s.579-1.294 1.294-1.294c.714 0 1.294.58 1.294 1.294s-.58 1.294-1.294 1.294zm2.439 2.474c-.605 0-1.096-.491-1.096-1.096s.491-1.096 1.096-1.096 1.096.491 1.096 1.096-.491 1.096-1.096 1.096z"/></svg><span class="price">${cases[i].stats.confirmed}</span > `,
        iconSize: null
      }));

      marker.bindPopup(`<div id="popup" data-toggle="modal" data-target=".bd-example-modal-lg">
            <h3 style="text-align: center; font-size: '22px'">${cases[i].country}</h3> 
            
            <h5 style="text-align: center; font-size: '18px'">${cases[i].province}</h5>
            <h5>Last updatedAt:- ${moment(cases[i].updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</h4 >
      <table>
        <thead>
          <th>status</th>
          <th>cases</th>
        </thead>
        <tbody>
          <tr>
            <td style="color: yellow">Confirmed</td>
            <td>${cases[i].stats.confirmed}</td>
          </tr>
          <tr>
            <td style="color: #ee1212">Death</td>
            <td>${cases[i].stats.deaths}</td>
          </tr>
          <tr>
            <td style="color: green">Recovered</td>
            <td>${cases[i].stats.recovered}</td>
          </tr>
        </tbody>
      </table>
          </div > `);
      marker.on('mouseover', function (e) {
        e.target.openPopup();
      });
      marker.on('mouseout', function (e) {
        e.target.closePopup();
      });
      markers.addLayer(marker);
    }

    map.addLayer(markers);
  });
