const $now   = document.querySelector("#now");
const $end   = document.querySelector("#end");
const $timer = document.querySelector("#timer");
const $btn   = document.querySelector("#ok");
const $reset = document.querySelector("#clear");
const $box_h = document.getElementById("hours");
const $box_m = document.getElementById("minuts");
const screen = document.getElementById("timer");

// 現在時刻
function now_time(){
    const date     = new Date();
    const hours    = date.getHours();
    const minuts   = date.getMinutes();
    const seconds  = date.getSeconds();
    $now.innerHTML = "現在時刻：" + timestiring(hours,minuts,seconds);
}

// 時刻の表記
function noon(hours){
    if(hours > 12){
        hours = hours - 12;
        return "午後" + gettwo(hours);
    }
    return "午前" + gettwo(hours);
}

function timestiring(h,m,s){
    return  noon(h)+ "時" + gettwo(m) + "分" + gettwo(s) + "秒";
}

function gettwo(number){
    if(number < 10){
        return " " + number;
    }
    return number;
}

// 文字の取得
const getText = (selector) =>{
    return document.querySelector(selector).value;
};

$btn.addEventListener('click',(e)=>{
    const hours = getText('[name="hours"]');
    const minuts = getText('[name="minuts"]');

    if(hours == "" || minuts == ""){
        $box_h.value = "";
        $box_m.value = "";
        return;
    }
    if(minuts > 59){
        $box_h.value = "";
        $box_m.value = "";
        return;
    }
    if(hours > 24){
        $box_h.value = "";
        $box_m.value = "";
        return;
    }

    localStorage.setItem('hours',hours);
    localStorage.setItem('minuts',minuts);

    $box_h.value = "";
    $box_m.value = "";

    if(comparing(hours,minuts)){
        screen.classList.remove("not")
        $end.innerHTML = endtime(hours,minuts);
        timer();
    }else{
        alert("正しい時刻を入力してください");
    }
    
});

//タイマーの関数
function timer(){
    const rest = setInterval(function(){
        const date    = new Date();                                 //現在時刻
        let   hours   = date.getHours();                            //現在時刻(時)
        const minuts  = date.getMinutes();                          //現在時刻(分)
        const seconds = date.getSeconds();                          //現在時刻(秒)        
        let   end_h   = Number(localStorage.getItem('hours'));      //終了時刻(時)
        const end_m   = Number(localStorage.getItem('minuts'));     //終了時刻(分)

        if(hours < 6){
            hours = hours + 24;
        }
        if(end_h < 6){
            end_h = end_h + 24;
        }

        const rest_h = rest_hours(hours,minuts,end_h,end_m);
        const rest_m = rest_minuts(hours,minuts,end_h,end_m);
        const rest_s = 60 - seconds;

        if(end_h != null){
            $timer.innerHTML = reststring(rest_h,rest_m);
        }else{
            clearInterval(rest);
        }

        if(end_1(hours,minuts,end_h,end_m)){
            if(rest_s == 60){
                $timer.innerHTML = "終了まで：" + gettwo(1) + "分";
            }else{
                $timer.innerHTML = "終了まで：" + gettwo(rest_s) + "秒";
                if(rest_s == 60){
                    clearInterval(rest);
                    reset();
                    window.alert("終了");
                }
            }
        } 

        if(end_2(hours,minuts,end_h,end_m)){
            clearInterval(rest);
            reset();
            window.alert("終了");
        }
          
        
    },10);
}

function rest_hours(hours,minuts,end_h,end_m){
    const rest_h = end_h - hours;
    const rest_m = end_m - minuts;
    if(rest_m >= 0){
        return rest_h;
    }
    if(rest_m < 0){
        return rest_h - 1;
    }
    return 0;
}

function rest_minuts(hours,minuts,end_h,end_m){
    const rest_h = end_h - hours;
    const rest_m = end_m - minuts;
    if(rest_m > 0){
        return rest_m;
    }
    if(rest_m < 0){
        return rest_m + 60;
    }
    return 0;
}

function end_1(hours,minuts,end_h,end_m){
    if(hours == end_h && minuts + 1 == end_m){
        return true;
    }
    return false;
}

function end_2(hours,minuts,end_h,end_m){
    if(hours >= end_h && minuts >= end_m){
        return true;
    }
    return false;
}

function reststring(h,m){
    if(h != 0){
        return "終了まで：" + gettwo(h) + "時間" + gettwo(m) + "分";
    }else{
        return "終了まで：" + gettwo(m) + "分";
    }
}

// 終了時刻
function endtime(h,m){
    return "終了時刻：" + noon(h) + "時" + gettwo(m) + "分"
}

function comparing(h,m){
    const date   = new Date();
    let hours    = date.getHours();   //現在時刻(時)
    const minuts = date.getMinutes(); //現在時刻(分)

    if(h<6){
        h = h + 24;
    }

    if(hours < 6){
        hours = hours + 24;
    }

    if(hours < h){
        return true;
    }else if(hours > h){
        return false;
    }

    if(minuts < m){
        return true;
    }else if(minuts > m){
        return false;
    }
}

//リセット関数
function reset(){
    $box_h.value = "";
    $box_m.value = "";
    localStorage.removeItem("hours");
    localStorage.removeItem("minuts");
    screen.classList.add("not");
    $end.innerHTML   = "終了時刻：";
    location.reload();
}

//クリアボタン
$reset.addEventListener('click',(e)=>{
    reset();
});

//サイトを開いたら実行
window.onload = function(){
    setInterval(now_time,10);
    const date   = new Date();
    let   hours   = date.getHours();
    const minuts  = date.getMinutes();                                                     
    let   end_h   = Number(localStorage.getItem('hours'));   
    const end_m   = Number(localStorage.getItem('minuts'));
    const end     = localStorage.getItem('minuts');
    
    if(hours < 6){
        hours = hours + 24;
    }
    if(end_h < 6){
        end_h = end_h + 24;
    }
   
    if(end !=null && !end_2(hours,minuts,end_h,end_m)){
        screen.classList.remove("not");
        $end.innerHTML = endtime(end_h,end_m);
        timer();   
    }
}
