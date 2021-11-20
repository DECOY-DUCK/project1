export default class Map {
  constructor() {
    this.geocoder = new kakao.maps.services.Geocoder();
    this.bounds = new kakao.maps.LatLngBounds();
  }
  /**
   * 지도 초기 세팅해서 화면에 보여주기
   *
   * @param {String} address : 지도 중심 주소
   * @returns 지도 객체
   */
  initMap(address = null) {
    const mapContainer = document.querySelector("#map");
    const center = new kakao.maps.LatLng(37.57305262781906, 126.97082874999028);
    const options = {
      center,
      level: 5,
    };

    if (address) {
      this.geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          options.center = new kakao.maps.LatLng(result[0].y, result[0].x);
        }
        this.map = new kakao.maps.Map(mapContainer, options);
      });
    } else {
      this.map = new kakao.maps.Map(mapContainer, options);
    }
  }

  /**
   * 지도의 중심을 이동시킨다.
   *
   * @param {String} address : 옮겨갈 지도 중심 주소
   */
  setCenter(address) {
    let moveLatLng;
    this.geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        moveLatLng = new kakao.maps.LatLng(result[0].y, result[0].x);
      }
      this.map.panTo(moveLatLng);
    });
  }

  /**
   * 위치 정보가 담긴 배열로 화면에 보여줄 마커 세팅
   *
   * @param {Array} list      : 마커를 만들 배열
   * @param {Object} imageOpt : 마커 이미지 옵션
   * @param {Array} markers   : 마커를 담을 배열
   */
  setMarkers(list, imageOpt, markers) {
    for (let item of list) {
      let position;
      this.geocoder.addressSearch(item.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          position = new kakao.maps.LatLng(result[0].y, result[0].x);
          this._displayMarker(item, imageOpt, position, markers);
        }
      });
    }
  }

  /**
   * 기존에 있는 마커 제거
   *
   * @param {Array} markers : 마커 배열
   */
  hideMarkers(markers) {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  /**
   * 각 마커 기본 설정 및 이벤트 등록 후 화면에 표시
   *
   * @param {Object} marker   : 마커로 만들 아이템
   * @param {Object} imageOpt : 마커 이미지 주소
   * @param {Object} position : LatLng
   * @param {Array} markers   : 마커 담을 배열
   */
  _displayMarker(marker, imageOpt, position, markers) {
    const { imageSrc, imageSize, imageOption } = imageOpt;
    const { content, title } = marker;

    let image = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    marker = new kakao.maps.Marker({
      position,
      image,
    });

    let iwContent = `
      <div class="infowindow-container">
      ${content}
      </div>`;
    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });

    kakao.maps.event.addListener(
      marker,
      "click",
      onClickListener(this.map, marker)
    );

    kakao.maps.event.addListener(
      marker,
      "mouseover",
      onOverListener(this.map, marker, infowindow)
    );
    kakao.maps.event.addListener(marker, "mouseout", onOutListener(infowindow));

    marker.setMap(this.map);
    marker.setTitle(title);
    markers.push(marker);
    this.bounds.extend(position);
  }

  /**
   *마커의 정보를 활용해서 인포윈도우에 사용할 html 세팅
   *
   * @param {String} title
   * @param {Object} infos
   * @returns infowindow에 들어갈 html
   */
  infoToHtml(title, infos) {
    let content = `
    <div id="roadview"></div>
    <h4>${title}</h4>
    <div class = "infowindow-infos">
	`;

    for (let [key, value] of Object.entries(infos)) {
      if (!value) continue;
      content += `<p class = "infowindow-info">${key}: ${value}</p>`;
    }

    content += "</div>";
    return content;
  }

  /**
   * 지도 축척 변경하기
   *
   * @param {*} level : 변경할 축척
   */
  setLevel(level) {
    this.map.setLevel(level);
  }
}

/**
 * 마커를 클릭하면 지도 축척과 중심을 변경하는 이벤트 리스너
 *
 * @param {Map} map       : 지도 객체
 * @param {marker} marker : 마커 객체
 * @returns 지도 축척과 중심을 변경하는 콜백 함수
 */
function onClickListener(map, marker) {
  return () => {
    marker.getTitle();
    map.setLevel(3);
    map.panTo(marker.getPosition());
  };
}

/**
 * 마커에 마우스를 올리면 인포윈도우를 보여주는 이벤트 리스너
 *
 * @param {Map} map               : 지도 객체
 * @param {marker} marker         : 마커 객체
 * @param {infowindow} infowindow : 인포윈도우 객체
 * @returns 인포윈도우를 여는 콜백 함수
 */
function onOverListener(map, marker, infowindow) {
  return () => {
    infowindow.open(map, marker);
  };
}

/**
 * 마커에서 마우스가 떠나면 인포윈도우를 닫는 이벤트 리스너
 *
 * @param {infowindow} infowindow : 인포윈도우 객체
 * @returns 인포윈도우를 닫는 콜백 함수
 */
function onOutListener(infowindow) {
  return () => {
    infowindow.close();
  };
}
