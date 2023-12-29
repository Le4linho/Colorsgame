document.addEventListener("DOMContentLoaded", function() {
    

      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var canvas = document.getElementById('marcador');
    var ctx = canvas.getContext('2d');
    
    // Dibujar un rectángulo rojo
    var colors = [
        "#FF0000",   // Rojo
        "#FF7F00",   // Naranja
        "#FFD700",   // Amarillo
        "#7FFF00",   // Verde claro
        "#00FF00",   // Verde
        "#40E0D0",   // Turquesa
        "#0000FF",   // Azul
        "#800080",   // Púrpura
        "#FF1493",   // Rosa
        "#A52A2A",   // Marrón
        "#000000"    // Negro
      ];
    var contador = 25;
    var contadorFlecha = 30;

    colors.forEach(element => {
        ctx.fillStyle = element;
        ctx.beginPath();
        ctx.arc(contador, 70, 10, 0, 2 * Math.PI);
        ctx.fill();
        //dibujarFlecha(contadorFlecha, 70);
        contador += 25;
        contadorFlecha += 40;
    });

    function dibujarFlecha(x, y) {
        const ctx = canvas.getContext("2d");

        var length = 10;
        var width = 5;
        var arrowHeadSize = 5;
        ctx.strokeStyle = 'white';
    
        // Dibujar el cuerpo de la flecha
        ctx.beginPath();
        ctx.moveTo(x - length / 2, y);
        ctx.lineTo(x + length / 2, y);
        ctx.lineWidth = width;
        ctx.stroke();
    
        // Dibujar la cabeza de la flecha
        ctx.beginPath();
        ctx.moveTo(x + length / 2 - arrowHeadSize, y - width / 2);
        ctx.lineTo(x + length / 2, y);
        ctx.lineTo(x + length / 2 - arrowHeadSize, y + width / 2);
        ctx.stroke();
        

    }
    

})