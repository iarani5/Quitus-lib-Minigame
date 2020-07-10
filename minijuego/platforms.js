
window.addEventListener("load",function() {
	
var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        .setup({ maximize: true })
		.touch()

//botones 

	Q.input.touchControls({
	  controls: [
		['left', '<'],
		['right', '>'],
		['action', '^'],  
		[],
		[],
		[],
		[],
		[],
	  ]
	});
	Q.controls();

//jugador

var estado=0;
Q.Sprite.extend("Player",{

  init: function(p) {

    this._super(p, {
      sheet: "player", 
      x: 0,         
      y: -100         
    });

    this.add('2d, platformerControls');
    this.on("hit.sprite",function(collision) {

      if(collision.obj.isA("Tower")) {
        Q.stageScene("nextGame",1); 
        this.destroy();
      }
    });
  },

  step: function(dt) {
	
    if(this.p.y > 200) {
		if(estado==0){
			Q.stageScene("endGame",1);
			estado=1;
		}
    }

    if(this.p.vy > 600) { this.p.vy = 600; }
    
  }

});

//meta 

Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
});

//constructor figuras

Q.Sprite.extend("Block", {
	  
  init: function(p) {
    this._super(p);
  },

  draw: function(ctx) {
		if(!this.p.points) {
		  Q._generatePoints(this);
		}

		ctx.beginPath();
		ctx.fillStyle = this.p.hit ? "blue" : "red";
		ctx.strokeStyle = "#000000";
		ctx.fillStyle = "rgba(123,12,110,1)";
		
		ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.stroke();
  }
});

// modal
Q.Sprite.extend("UI.Container", {
    init: function(p,defaults) {
      var adjustedP = Q._clone(p||{}),
          match;

      if(p && Q._isString(p.w) && (match = p.w.match(/^[0-9]+%$/))) {
        adjustedP.w = parseInt(p.w,10) * Q.width / 100;         
        adjustedP.x = Q.width/2 - adjustedP.w/2;
      }

      if(p && Q._isString(p.h) && (match = p.h.match(/^[0-9]+%$/))) {
        adjustedP.h = parseInt(p.h,10) * Q.height / 100;         
        adjustedP.y = Q.height /2 - adjustedP.h/2;
      }

      this._super(adjustedP,{
        opacity: 1,
        hidden: false,
        fill:   "#fff",
        highlight:   "#fff", 
        radius: 5,
        stroke: "#000", 
        border: 2, 
        shadow: false,
        shadowColor: false,
        type: Q.SPRITE_NONE
      });
	}
});




// **** N I V E L  1 **** //

Q.scene("level1",function(stage) {

  stage.insert(new Q.Repeater({ asset: "background-wall.png", speedX: 0.5, speedY: 0.5, type: 0 }));

  var player = stage.insert(new Q.Player());

  var bloque2 = stage.insert(new Q.Block({ x: 0, y: 0, h: 50, w: 100 }));
	bloque2.draw = function(ctx) {
      ctx.fillStyle = 'rgba(88, 214, 141, 0.7)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 
	
  var bloque1 = stage.insert(new Q.Block({ x: 50, y: -30, h: 30, w: 50 }));
  bloque1.draw = function(ctx) {
      ctx.fillStyle = 'rgba(91, 160, 11, 0.7)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 


  var diamante1 = stage.insert(new Q.Block({ 
    x: 140, y: 0, h: 50, w: 100,
    points: [ [ 0, -15], [ 50, 0 ], [ 0, 15 ], [ -50, 0 ] ]
  }));   
	
    diamante1.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(116, 149, 77, 0.7)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(116, 149, 77, 0.7)";
		ctx.stroke();
		ctx.closePath(); // Cierra la figura
		ctx.fill(); // Y la rellena
    };
	
	
  var diamante2 = stage.insert(new Q.Block({ 
    x: 340, y: 0, h: 100, w: 150, 
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
      diamante2.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(91, 160, 11, 0.7)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(91, 160, 11, 0.7)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
	

  var bloque3 = stage.insert(new Q.Block({ x: 460, y: 40, h: 50, w: 50 }));
  	bloque3.draw = function(ctx) {
      ctx.fillStyle = 'rgba(88, 214, 141, 0.7)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 
	
	
  var bloque4 = stage.insert(new Q.Block({ x: 540, y: 10, h: 50, w: 50 }));
	bloque4.draw = function(ctx) {
      ctx.fillStyle = 'rgba(34, 153, 84, 0.7)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 
  
  var diamante3 = stage.insert(new Q.Block({ 
    x: 760, y: 40, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
  
   diamante3.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(25, 111, 61, 0.7)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(25, 111, 61, 0.7)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
    
  var diamante4 = stage.insert(new Q.Block({ 
    x: 900, y: 0, h: 50, w: 100,
    points: [ [ 0, -15], [ 50, 0 ], [ 0, 15 ], [ -50, 0 ] ],

  }));
  
   diamante4.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(88, 214, 141, 0.7)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(88, 214, 141, 0.7)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
  
  var bloque5 = stage.insert(new Q.Block({ x: 1050, y: 0, h: 70, w: 70 }));
  	bloque5.draw = function(ctx) {
      ctx.fillStyle = 'rgba(91, 160, 11, 0.7)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 
  

  stage.add("viewport").follow(player);

  stage.insert(new Q.Tower({ x: 1050, y: -50 }));
});



// **** N I V E L  2 **** //

Q.scene("level2",function(stage) {

  stage.insert(new Q.Repeater({ asset: "background-wall3.png", speedX: 0.5, speedY: 0.5, type: 0 }));

  var player = stage.insert(new Q.Player());

  var bloque1 = stage.insert(new Q.Block({ x: 70, y: 30, h: 30, w: 50 }));
    bloque1.draw = function(ctx) {
      ctx.fillStyle = 'rgba(255, 153, 153, 0.6)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 

  var bloque2 = stage.insert(new Q.Block({ x: 0, y: 0, h: 50, w: 100 }));
   bloque2.draw = function(ctx) {
      ctx.fillStyle = 'rgba(191, 0, 255, 0.5)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 

  var diamante1 = stage.insert(new Q.Block({ 
    x: 190, y: 0, h: 50, w: 100,
    points: [ [ 0, -30], [ 30, 0 ], [ 0, 30 ], [ -30, 0 ] ]
  }));
  diamante1.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(153, 0, 204, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(153, 0, 204, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
  

  var diamante2 = stage.insert(new Q.Block({ 
    x: 270, y: 20, h: 50, w: 100,
    points: [ [ 0, -30], [ 30, 0 ], [ 0, 30 ], [ -30, 0 ] ]
  }));
	diamante2.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(115, 0, 153, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(115, 0, 153, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
  
  var diamante3 = stage.insert(new Q.Block({ 
    x: 450, y: -30, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]

  }));
  	diamante3.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(223, 128, 255, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(223, 128, 255, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
	
  var bloque3 = stage.insert(new Q.Block({ x: 560, y: 10, h: 60, w: 60 }));
	bloque3.draw = function(ctx) {
      ctx.fillStyle = 'rgba(115, 0, 153, 0.5)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 

  var diamante4 = stage.insert(new Q.Block({ 
    x: 760, y: 40, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
   diamante4.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 153, 153, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(255, 153, 153, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
    
  var diamante5 = stage.insert(new Q.Block({ 
    x: 900, y: 0, h: 50, w: 100,
    points: [ [ 0, -15], [ 30, 0 ], [ 0, 15 ], [ -50, 0 ] ]
  }));
     diamante5.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(223, 128, 255, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(223, 128, 255, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };//223, 128, 255, 0.6

  var diamante6 = stage.insert(new Q.Block({ 
    x: 1000, y: 80, h: 50, w: 100,
    points: [ [ 0, -15], [ 50, 0 ], [ 0, 15 ], [ -50, 0 ] ]
  }));
     diamante6.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(255, 153, 153, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(255, 153, 153, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };

  var bloque4 = stage.insert(new Q.Block({ x: 1150, y: 100, h: 30, w: 50 }));
  bloque4.draw = function(ctx) {
      ctx.fillStyle = 'rgba(115, 0, 153, 0.5)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 

  var bloque5 = stage.insert(new Q.Block({ x: 1270, y: 100, h: 30, w: 50 }));
     bloque5.draw = function(ctx) {
      ctx.fillStyle = 'rgba(191, 0, 255, 0.5)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 

	var diamante7 = stage.insert(new Q.Block({ 
		x: 1500, y: 150, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
	}));
     diamante7.draw = function(ctx) {
	  ctx.beginPath();
      ctx.fillStyle = 'rgba(153, 0, 204, 0.5)';
	   ctx.moveTo(this.p.points[0][0],this.p.points[0][1]);
		for(var i=0;i<this.p.points.length;i++) {
		  ctx.lineTo(this.p.points[i][0],this.p.points[i][1]);
		}
		ctx.lineTo(this.p.points[0][0],this.p.points[0][1]);
		ctx.strokeStyle = "rgba(153, 0, 204, 0.5)";
		ctx.stroke();
		ctx.closePath(); 
		ctx.fill();
    };
	
  var bloque6 = stage.insert(new Q.Block({ x: 1700, y: 170, h: 70, w: 70 }));
	bloque6.draw = function(ctx) {
      ctx.fillStyle = 'rgba(255, 153, 153, 0.4)';
      ctx.fillRect(-this.p.cx,-this.p.cy,this.p.w,this.p.h);
    }; 
  stage.add("viewport").follow(player);

  stage.insert(new Q.Tower({ x: 1700, y: 120 }));
});



// **** N I V E L  3 ****//

Q.scene("level3",function(stage) {

  stage.insert(new Q.Repeater({ asset: "background-wall2.png", speedX: 0.5, speedY: 0.5, type: 0 }));
  
  var player = stage.insert(new Q.Player());

  stage.insert(new Q.Block({ x: 0, y: 0, h: 50, w: 100 }));
  
  stage.insert(new Q.Block({ 
    x: 250, y: 100, h: 50, w: 100,
    points: [ [ 0, -30], [ 30, 0 ], [ 0, 30 ], [ -30, 0 ] ]
  }));

  stage.insert(new Q.Block({ 
    x: 190, y: 0, h: 50, w: 100,
    points: [ [ 0, -30], [ 30, 0 ], [ 0, 30 ], [ -30, 0 ] ]
  }));

  stage.insert(new Q.Block({ 
    x: 270, y: 20, h: 50, w: 100,
    points: [ [ 0, -30], [ 30, 0 ], [ 0, 30 ], [ -30, 0 ] ]
  }));

  stage.insert(new Q.Block({ 
    x: 450, y: -30, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
  
  stage.insert(new Q.Block({ x: 640, y: 10, h: 60, w: 60 }));

  stage.insert(new Q.Block({ 
    x: 900, y: 150, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
    
  stage.insert(new Q.Block({ 
    x: 1050, y: 100, h: 50, w: 100,
    points: [ [ 0, -15], [ 30, 0 ], [ 0, 15 ], [ -50, 0 ] ]
  }));

  stage.insert(new Q.Block({ x: 1200, y: 90, h: 60, w: 50 }));

  stage.insert(new Q.Block({ x: 1340, y: 40, h: 30, w: 50 }));
  
    stage.insert(new Q.Block({ 
    x: 1530, y: 40, h: 50, w: 100,
    points: [ [ 0, -15], [ 30, 0 ], [ 0, 15 ], [ -50, 0 ] ]
  }));
  
  stage.insert(new Q.Block({ 
    x: 1770, y: 150, h: 100, w: 150,
    points: [ [ 0, -50], [25, -40] ,[ 50, 0 ], [ 0, 50 ], [ -100, 0 ] ]
  }));
  
  stage.insert(new Q.Block({ x: 1970, y: 150, h: 70, w: 70 }));

  stage.add("viewport").follow(player);

  stage.insert(new Q.Tower({ x: 1970, y: 100 }));
  
  
});


// vista nivel ganado
	var nivel=1;
	Q.scene('nextGame',function(stage) {
		
		 var container = stage.insert(new Q.UI.Container({
				x: Q.width/3, y: Q.height/3, 
				highlight:   "#fff", 
				radius: 5,
				stroke: "#000", 
				shadow: true,
				shadowColor: "rgba(125,125,125,0.7)", 
		  }));
		  
		if(nivel==3){
			estado=1;
			container.insert(new Q.UI.Button({
			  asset: 'modal_fin.png',
			  x: Q.width/7,
			  y:  Q.height/30
			}, function() {
				Q.clearStages();
				nivel=1;
				estado=0;
				Q.stageScene('level1');
			}));
		}
		else{
			  container.insert(new Q.UI.Button({
			  asset: 'modal_ganaste.png',
			  x: Q.width/7,
			  y:  Q.height/30
			}, function() {
				Q.clearStages();
				if(nivel==1){	
					nivel=2;
					Q.stageScene('level2');
				}
				else if(nivel=2){
					nivel=3;
					Q.stageScene('level3');
				}
			}));
		}
		
		
	});


//vista game over

	Q.scene('endGame',function(stage) {
		nivel=1;
	 var container = stage.insert(new Q.UI.Container({
		x: Q.width/3, y: Q.height/3, 
		highlight:   "#fff", 
        radius: 5,
        stroke: "#000", 
        shadow: true,
        shadowColor: "rgba(125,125,125,0.7)", 
	  }));

	 container.insert(new Q.UI.Button({
		  asset: 'modal_perdiste.png',
		  x: Q.width/7,
		  y:  Q.height/30
		}, function() {
			  estado=0;
			Q.clearStages();
			Q.stageScene('level1');
		}));

	  container.fit(20);
	});

//cargar contenido

	Q.load("sprites.png, sprites.json, background-wall3.png, background-wall2.png, background-wall.png, modal_perdiste.png, modal_ganaste.png, modal_fin.png, intro.gif", function() {

	  Q.compileSheets("sprites.png","sprites.json");
	  Q.stageScene("level1");

	});


// intro 

	setTimeout(function(){ 
		var ventana= document.getElementById("modal_intro");
		ventana.parentNode.removeChild(ventana);

	}, 5000);
 


});

