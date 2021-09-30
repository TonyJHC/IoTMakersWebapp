    function listEvents(deviceId) { // 함수명 이벤트관련으로 변경
        setTimeout(invokeEventsAPI(deviceId), 300); // access token을 얻기위해 대기 
        return false;
    }

    function invokeEventsAPI(deviceId) { // 함수명 이벤트 관련으로 변경

        // 태그스트림 목록 조회 URI
        var API_URI2 = '/api/v1/device/'+deviceId+'/deviceEvents'; // iotMakers에 Event 조회 api uri로 변경
        
        $.ajax('https://iotmakers.kt.com' + API_URI2, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token},
            contentType: "application/json",
            dataType:"json",
            success: function (data, status, xhr) {
               printEventList(deviceId, data.data);  // 성공시, 태그스트림 목록 출력을 위한 함수 호출
            },
            error: function(xhr,status,e){
                alert("error");
            }
        });
    };

    // deviceId와 관련있는 모든 태그스트림 목록 출력을 위한 함수
    function printEventList(deviceId, data){
        
        // "디바이스를 선택하세요" 메시지 삭제
        if (document.getElementsByTagName("div")[0] != null)
            document.getElementsByTagName("div")[0].remove();

        $('#events').empty();             // html에서 id가 events인 태그 안의 기존 데이터 모두 삭제
        
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var td1 = document.createElement("td");
        th1.setAttribute("style","background-color:lightgrey");
        th1.innerText = "Device ID";
        td1.innerText = deviceId;
        tr.append(th1);
        tr.append(td1);
        $('#events').append(tr);		// id가 events인 (table) 태그에 device id를 위한 테이블 행을 추가 

        if (data.rows.length >= 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("style","background-color:lightgrey");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            th1.innerText = "Event ID"; 
            th2.innerText = "상황이벤트"; // 수정
            th3.innerText = "수정일시"; // 수정
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            $('#events').append(tr);

            data.rows.forEach(function(v){ // data.rows --> 태그스트림에대한 정보를 담고 있음.

                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");

                // 각각 텍스트 넣기 : iotMaker OpenApi의 응답모델을 참고
                td1.innerText = v.eventId;
                td2.innerText = v.statEvetNm;
                td3.innerText = v.amdDt;

                // 테이블 <tr> 에 집어넣기
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                
                $('#events').append(tr);

            })
        }
    }