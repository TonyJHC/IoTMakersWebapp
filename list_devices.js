

    setTimeout(invokeDeviceAPI, 500);

 
    function invokeDeviceAPI() {

        // 디바이스 조회 URI
        var API_URI = '/api/v1.1/devices?offset=0&limit=10';
        
        $.ajax('https://iotmakers.kt.com' + API_URI, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token},
            contentType: "application/json",
            dataType:"json",
            success: function (data, status, xhr) {
               printDeviceList(data.data);  // 성공시, 데이터 출력을 위한 함수 호출
            },
            error: function(xhr,status,e){
                alert("error");
            }
        });
    };

    // 데이터 출력을 위한 함수
    function printDeviceList(data){
        if (data.length > 0) {
            var tr = document.createElement("tr");
            tr.setAttribute("style","background-color:lightgrey");
            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerText = "Device Name";
            th2.innerText = "Device ID";
            tr.append(th1);
            tr.append(th2);
            $('#devices').append(tr);   // id가 devices인 태그에 테이블 제목 행을 추가
        
            data.forEach(function(v){  

                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                td1.innerText = v.name;

                var a = document.createElement('a');    // <a> 태그 생성
       
                // 해당 링크 클릭시에 device id를 기반으로 태그스트림 목록 조회
                a.setAttribute('href',`javascript:listTags( '${v.id}' )`);
                a.innerHTML = v.id;

                td2.append(a);


                tr.appendChild(td1);
                tr.appendChild(td2);
                $('#devices').append(tr); // id가 devices인 태그에 테이블 행을 추가
            })


            // 디바이스 목록 조회결과가 있는 경우 데이터가 없습니다 메시지 삭제
            document.getElementsByTagName("div")[0].remove();
        }
    }
