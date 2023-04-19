let today = new Date().toISOString().split('T')[0];
document.getElementById("data_spotify").setAttribute("max", today);

window.addEventListener("scroll", function() {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const progress = scrollTop / (fullHeight - windowHeight) * 100;
    document.getElementById("progress_bar").style.width = `${progress}%`;
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("go_top_button").style.display = "block";
    } else {
        document.getElementById("go_top_button").style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}