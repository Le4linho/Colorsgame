document.addEventListener("DOMContentLoaded", function() {

  var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
  
  var engine = Engine.create();
  var render = Render.create({

    element: document.body,
    engine: engine,
    options: {

      width: 400,
      height: 600,
      wireframes: false,
      //background: '#e0e0e0'

    }

  });

  render.canvas.id = 'canvas';
  
  
  var leftWall = Bodies.rectangle(0, 400, 5, 800, { isStatic: true });
  var rightWall = Bodies.rectangle(400, 400, 5, 800, { isStatic: true });
  var ground = Bodies.rectangle(200, 610, 400, 20, { isStatic: true });
  
  World.add(engine.world, [leftWall, rightWall, ground]);
  Engine.run(engine);
  Render.run(render);
  
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

  var tamaños = [10 ,20 ,30 ,40, 50, 60, 70, 80, 90, 100, 110];

  balls = [];
  
  bola = getRandomInt(0, 4);
  tamaño = tamaños[bola];
  color = colors[bola];
  
  document.body.style.backgroundColor = color;
  

  function miFuncion(event) {

    const canvasRect = render.canvas.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;
    
    ball = Bodies.circle(mouseX, 50, tamaño, {
    restitution: 0.5,
      render: {

        fillStyle: color

      }
    });
  
    balls.push(ball);
    World.add(engine.world, [ball]);
  
    bola = getRandomInt(0, 4);
    tamaño = tamaños[bola];
    color = colors[bola];
  
    document.body.style.backgroundColor = color;
    
  }
  
  Matter.Events.on(engine, 'beforeUpdate', function() {
  
    for (var i = 0; i < balls.length; i++) {
  
      for (var j = i + 1; j < balls.length; j++) {
  
        if (colors.includes(balls[i].render.fillStyle) &&
          colors.includes(balls[j].render.fillStyle) &&
          balls[i].render.fillStyle === balls[j].render.fillStyle &&
          checkCollision(balls[i], balls[j])) {
  
            var color = colors[colors.indexOf(balls[i].render.fillStyle)+1];
  
            var combinedRadius = tamaños[colors.indexOf(balls[i].render.fillStyle)+1];
  
            // var newPositionX = (balls[i].position.x);
            // var newPositionY = (balls[i].position.y);

            var newPositionX = (balls[i].position.x + balls[j].position.x) / 2;
            var newPositionY = (balls[i].position.y + balls[j].position.y) / 2;
  
            World.remove(engine.world, balls[i]);
            World.remove(engine.world, balls[j]);
  
            
  
            var newBall = Bodies.circle(newPositionX, newPositionY, combinedRadius, {

              restitution: 0.5,
              render: {

                fillStyle: color
                
              }

            });
  
            balls.splice(i, 1);
            balls.splice(j - 1, 1);
            balls.push(newBall);
            World.add(engine.world, [newBall]);
        }

      }

    }

  });
  
  render.canvas.addEventListener('click', function(event) {
    
      miFuncion(event);
    
  });
  
  function checkCollision(bodyA, bodyB) {
    if (Matter.Collision.collides(bodyA, bodyB) != null) {

      return true

    }else{

      return false

    }
  
  }
  
  function getRandomInt(min, max) {
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  
  }

  // var currentIndex = 0;

  // function animarDegradado() {
  //   var fondo = document.getElementById('canvas');
  //   fondo.style.backgroundColor = colors[currentIndex];

  //   currentIndex = (currentIndex + 1) % colors.length;
  // }

  // // Intervalo de tiempo entre cambios de color (en milisegundos)
  // var intervalo = 1000; 

  // // Iniciar la animación
  // setInterval(animarDegradado, intervalo);

});
