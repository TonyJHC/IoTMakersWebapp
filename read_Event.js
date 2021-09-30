	
    // eventId와 startTime 값 불러오는 함수
    /*function readEventIdStartTime(eventId, startTime){
        var eventId = document.getElementsByTagName("eventId").values; 
        var startTime = document.getElementsByTagName("startTime").values; 
           
           // 타임스탬프를 계산해주는 함수
           // 참고 : https://webisfree.com/2017-10-18/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%98%84%EC%9E%AC-%EC%8B%9C%EA%B0%84-timestamp-%EC%96%BB%EB%8A%94-%EB%B0%A9%EB%B2%95
        function timeStamp(startTime) { 
            var date = Data.parse(startTime);
            return data/1000; 
        }

        var timestamp = timestamp(startTime); // 앞에서 만든 timeStamp함수 호출하여 timeStamp값 얻기
       alert("eventId : " + eventId + "  startTime : " +timestamp); // 알림 주기
       readEventList(eventId,timestamp); // 앞서만든 이벤트 아이디와 타임스템프 매개변수로 함수 호출
    }
*/

   // var eventId = document.getElementsByTagName("eventId").values; 
   // var timestamp = document.getElementsByTagName("startTime").values; 


    function readEventList(eventId, timestamp) { // 이름 변경
        setTimeout(invokeEventListAPI(eventId, timestamp), 300); // accesstoken을 얻는동안 0.3초 대기
        return false;
    }

       
    function invokeEventListAPI(eventId,timestamp) {

        // 이벤트 로그 조회 URI
        var API_URI2 = '/api/v1/event/logByEventId'+eventId+'/'+timestamp; // iotMaker openAPI와 동일하게 맞춤
        
        $.ajax('https://iotmakers.kt.com' + API_URI2, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token},
            contentType: "application/json",
            dataType:"json",
            success: function (data, status, xhr) {
               printEvent(eventId, timestamp, data.data);  // 성공시, 데이터 출력을 위한 함수 호출
            },
            error: function(xhr,status,e){
                alert("error");
            }
        });
    };

    // 이벤트 아이디 예시 : 001PTL001D10016003
    // 타임스탬프 예시 : 2021-09-07 12:00 -> 1630983600000

    // 데이터 출력을 위한 함수
    function printEvent(eventId, timestamp, data){ // 이름 변경
        
        // "디바이스를 선택하세요" 메시지 삭제
        if (document.getElementsByTagName("div")[0] != null)
            document.getElementsByTagName("div")[0].remove();

        $('#logs').empty();             // id가 tags인 태그 안의 기존 데이터 모두 삭제
        
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var td1 = document.createElement("td");
        th1.setAttribute("style","background-color:lightgrey");
        th1.innerText = "이벤트 ID";
        td1.innerText = eventId;
        tr.append(th1);
        tr.append(td1);
        $('#logs').append(tr);

        //if (data.length >= 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("style","background-color:lightgrey");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            
            th1.innerText = "발생시간";
            th2.innerText = "이벤트명";
            th3.innerText = "timestamp";

            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            
            $('#logs').append(tr);

            data.rows.forEach(function(v){ // 결과 확인시 rows라는 배열안에 있음.

                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");
                
                // openAPI 응답모델 확인
                td1.innerText = v.outbDtm;
                td2.innerText = v.evntNm;
                td3.innerText = v.occDt;
                
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                
                $('#logs').append(tr);

            })
       // } 
    }