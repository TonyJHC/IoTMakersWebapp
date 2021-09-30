

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
            tr.setAttribute("style","background-color:lightgrey"); // Device Name , Device ID 부분 배경색 회색으로
            var th1 = document.createElement("th"); // Device Name
            var th2 = document.createElement("th"); // Device ID
            th1.innerText = "Device Name";
            th2.innerText = "Device ID";
            tr.append(th1); // 테이블을 둘러싸고 있는 tr에 추가함.
            tr.append(th2);
            $('#devices').append(tr);   // id가 devices인 태그에 테이블 제목 행을 추가
            
            ////////////////////////////////// 여기까지가 Device Name Device ID 부분을 표시한 것 //////////////////////////////////////

            data.forEach(function(v){  // data는 배열, v는 배열의 원소(디바이스 객체)

                var tr = document.createElement("tr"); // 테이블 tr하나 만들고
                var td1 = document.createElement("td"); 
                var td2 = document.createElement("td");
                td1.innerText = v.name; // 디바이스 이름 ( ex) "name" : "my sample device" )

                var a = document.createElement('a');    // <a> 태그 생성.  디바이스 아이디에 링크를 거는 코드
       
                // 해당 링크 클릭시에 device id를 기반으로 태그스트림 목록 조회
                a.setAttribute('href',`javascript:listEvents( '${v.id}' )`);   // 디바이스 아이디에 링크를 거는 코드 --> 눌렸을 때 listTags 함수 호출
                a.innerHTML = v.id;  // 디바이스 아이디 이름에 링크 걸렸지만 표시는 링크가 아닌 디바이스 네임으로 해야되니까

                td2.append(a);


                tr.appendChild(td1);
                tr.appendChild(td2);
                $('#devices').append(tr); // id가 devices인 태그에 테이블 행을 추가
            })


            // 디바이스 목록 조회결과가 있는 경우 데이터가 없습니다 메시지 삭제
            document.getElementsByTagName("div")[0].remove();
        }
    }
