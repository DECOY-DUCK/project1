import router from "@/router";

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
  async initMap(address = null) {
    const mapContainer = document.querySelector("#map");
    const center = new kakao.maps.LatLng(37.57305262781906, 126.97082874999028);
    const options = {
      center,
      level: 5,
    };

    if (address) {
      try {
        const result = await this.addressSearh(address);
        options.center = new kakao.maps.LatLng(result[0].y, result[0].x);
        this.map = new kakao.maps.Map(mapContainer, options);
      } catch (e) {
        console.error(e);
      }
    } else {
      this.map = new kakao.maps.Map(mapContainer, options);
    }
  }

  /**
   * 지도의 중심을 이동시킨다.
   *
   * @param {String} address : 옮겨갈 지도 중심 주소
   */
  async setCenter(address) {
    try {
      const result = await this.addressSearh(address);
      const moveLatLng = new kakao.maps.LatLng(result[0].y, result[0].x);

      this.map.panTo(moveLatLng);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 위치 정보가 담긴 배열로 화면에 보여줄 마커 세팅
   *
   * @param {Array} list      : 마커를 만들 배열
   * @param {Object} imageOpt : 마커 이미지 옵션
   * @param {Array} markers   : 마커를 담을 배열
   */
  async setMarkers(list, imageOpt, markers) {
    for (let item of list) {
      try {
        const result = await this.addressSearh(item.address);
        const position = new kakao.maps.LatLng(result[0].y, result[0].x);

        this._displayMarker(item, imageOpt, position, markers);
      } catch (e) {
        return;
      }
    }
  }

  /**
   * 상세 화면에 보여줄 마커 1개 세팅
   *
   * @param {String} address   : 주소
   * @param {Object} imageOpt : 마커 이미지 옵션
   */
  async setMarker(address, imageOpt) {
    let image;
    if (imageOpt) {
      image = new kakao.maps.MarkerImage(
        imageOpt.imageSrc,
        imageOpt.imageSize,
        imageOpt.imageOption
      );
    }
    try {
      const result = await this.addressSearh(address);
      const position = new kakao.maps.LatLng(result[0].y, result[0].x);

      return new kakao.maps.Marker({
        position,
        map: this.map,
        image,
      });
    } catch (e) {
      console.error(e);
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
    const { content, title, type } = marker;

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

    if (type.includes("house")) {
      kakao.maps.event.addListener(
        marker,
        "click",
        onClickToLinkListener(marker)
      );
    } else {
      kakao.maps.event.addListener(
        marker,
        "click",
        onClickListener(this.map, marker)
      );
    }

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

  /**
   * 주소를 받아와 로드뷰 생성
   *
   * @param {String} address : 주소
   */
  async setRoadView(address) {
    const roadviewContainer = document.querySelector("#roadview");
    const roadview = new kakao.maps.Roadview(roadviewContainer);
    const roadviewClient = new kakao.maps.RoadviewClient();
    try {
      const result = await this.addressSearh(address);
      const position = new kakao.maps.LatLng(result[0].y, result[0].x);

      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position);
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 마커와 주소 간의 거리 계산
   *
   * @param {String} address1
   * @param {String} address2
   */
  async getDistanceFromMarker(address1, address2) {
    try {
      const r1 = await this.addressSearh(address1);
      const r2 = await this.addressSearh(address2);
      const p1 = new kakao.maps.LatLng(r1[0].y, r1[0].x);
      const p2 = new kakao.maps.LatLng(r2[0].y, r2[0].x);
      const poly = new kakao.maps.Polyline({
        path: [p1, p2],
      });

      return poly.getLength();
    } catch (e) {
      return null;
    }
  }

  /**
   * 주소를 이용해서 위도, 경도를 얻는다
   *
   * @param {String} address : 주소
   * @returns 위도, 경도를 담은프로미스 객체
   */
  addressSearh(address) {
    return new Promise((resolve, reject) => {
      this.geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  }
}

/**
 * 마커를 클릭하면 상세페이지로 이동하는 이벤트 리스너
 *
 * @param {Map} map       : 지도 객체
 * @param {marker} marker : 마커 객체
 * @returns 상세페이지로 이동하는 콜백 함수
 */
function onClickToLinkListener(marker) {
  return () => {
    router.push({
      name: "HouseDealView",
      params: { aptName: marker.getTitle() },
    });
  };
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
