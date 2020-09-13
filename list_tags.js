    function listTags(deviceId) {
        setTimeout(invokeTagStreamAPI(deviceId), 300);
        return false;
    }

    function invokeTagStreamAPI(deviceId) {

        // 태그스트림 목록 조회 URI
        var API_URI2 = '/api/v1/streams/'+deviceId;
        
        $.ajax('https://iotmakers.kt.com' + API_URI2, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token},
            contentType: "application/json",
            dataType:"json",
            success: function (data, status, xhr) {
               printTagStreamList(deviceId, data.data);  // 성공시, 태그스트림 목록 출력을 위한 함수 호출
            },
            error: function(xhr,status,e){
                alert("error");
            }
        });
    };

    // deviceId와 관련있는 모든 태그스트림 목록 출력을 위한 함수
    function printTagStreamList(deviceId, data){
        
        // "디바이스를 선택하세요" 메시지 삭제
        if (document.getElementsByTagName("div")[0] != null)
            document.getElementsByTagName("div")[0].remove();

        $('#tags').empty();             // id가 tags인 태그 안의 기존 데이터 모두 삭제
        
        var tr = document.createElement("tr");
        var th1 = document.createElement("th");
        var td1 = document.createElement("td");
        th1.setAttribute("style","background-color:lightgrey");
        th1.innerText = "Device ID";
        td1.innerText = deviceId;
        tr.append(th1);
        tr.append(td1);
        $('#tags').append(tr);		// id가 tags인 (table) 태그에 device id를 위한 테이블 행을 추가 

        if (data.rows.length > 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("style","background-color:lightgrey");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            var th3 = document.createElement("th");
            th1.innerText = "Tag Stream ID";
            th2.innerText = "Tag Stream Type";
            th3.innerText = "Value Type";
            tr.append(th1);
            tr.append(th2);
            tr.append(th3);
            $('#tags').append(tr);

            data.rows.forEach(function(v){

                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");

                var a = document.createElement('a');    // <a> 태그 생성
       
                a.setAttribute('href',`javascript:readLastLog('${deviceId}', '${v.tagStrmId}' )`);
                a.innerHTML = v.tagStrmId;

                td1.append(a);

                td2.innerText = v.tagStrmPrpsTypeCdNm;
                td3.innerText = v.tagStrmValTypeCdNm;
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                $('#tags').append(tr);

            })
        }
    }