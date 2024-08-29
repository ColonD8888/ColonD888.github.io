$(document).ready(function() {
    document.getElementById("answer").onkeydown = function(e){
        if(e.keyCode == 13){
            submit();
        }
    };
});

function submit() {
    var answer = document.getElementById("answer").value;
    let upperletter = /[A-Z]/
    for (var i = 0; i <answer.length; i++){
        if (upperletter.test(answer[i])) {
            answer = answer.replace(answer[i], answer[i].toLowerCase()); 
        }
    }
    
    $("#result").css("background-image", "none");
    $("#result-page1").css("background-image", "none")
    $("#result-page2").css("background-image", "none")
    $("#image-slider").css("visibility", "hidden")

    switch (answer){
        case "救救我啊我救我": 
            $("#image-slider").css("visibility", "visible");
            $("#result-page1").css("background-image", "url('img/hint1.png?ver="+time.getTime()+"')")
            $("#result-page2").css("background-image", "url('img/hint2.png?ver="+time.getTime()+"')")
            moveimageslider();
            break;
        case "笑口常開": 
            $("#result").css("background-image", "url('img/pass.png?ver="+time.getTime()+"')")
            break;
        case "plug":
            $("#result").css("background-image", "url('img/PLUG.png?ver="+time.getTime()+"')")
            break; 
        default: 
            $("#result").css("background-image", "url('img/404.png?ver="+time.getTime()+"')")
            break;
    }
}

function moveimageslider(){
    const gallery = document.querySelector(".gallery");
    const indicators = document.querySelectorAll(".indicator");
    const images = document.querySelectorAll(".resultpage");

    indicators.forEach((element, index) => {
        element.addEventListener("click", () => {
            images[index].scrollIntoView({
            block: "center",
            behavior: "smooth",
            });
        });
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const targetIndex = entry.target.dataset.index;
            if (entry.isIntersecting) {
                indicators[targetIndex].classList.add("active");
            } else {
                indicators[targetIndex].classList.remove("active");
            }
        });
    },
    {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.5,
    }
    );

    images.forEach((element) => {
        observer.observe(element);
    });
}