window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    document.getElementById("navbar").style.backgroundColor = "#fff";
    document.getElementById("navbar").classList.add('sticky-top')
    document.getElementById("titre1").style.color = "black";


  } else {
  
    document.getElementById("navbar").style.backgroundColor = "#220e42";
   
    document.getElementById("navbar").classList.remove('sticky-top')
    document.getElementById("titre1").style.color = "#fff";
  }
}
