var text = "yuna orsini. individu f�minin et singulier.";
text.split('').forEach(function(element, index) {

    console.log("<span>"+ (element === " " ? "&nbsp;" : element) +"</span>")
})