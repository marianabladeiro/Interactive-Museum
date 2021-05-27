"use strict";

// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    control: null,  // NEW
    renderer: null,
};


helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);

let keyMap = {};

//for camera movements
let moveWS = 20 * 0.008;
let moveAD = (Math.PI/2) * 0.003;

// HANDLING EVENTS

// Event Listeners

window.addEventListener('resize', resizeWindow);

//To keep track of the keyboard 
var keyD = false, keyA = false, keyS = false, keyW = false, keyC = false, keyV = false, keyU = false, keyM = false, keyI = false, keyK = false, keyL = false;
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);

// Update render image size and camera aspect when the window is resized
function resizeWindow(eventParam) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    sceneElements.camera.aspect = width / height;
    sceneElements.camera.updateProjectionMatrix();
    sceneElements.renderer.setSize(width, height);
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = true;
            break;
        case 83: //s
            keyS = true;
            break;
        case 65: //a
            keyA = true;
            break;
        case 87: //w
            keyW = true;
            break;
        case 67: //c
            keyC = true;
            break;
        case 86: //v
            keyV = true;
            break;
        case 85: //u
            keyU = true;
            break;
        case 77: //m
            keyM = true;
            break;
        case 73: //i
            keyI = true;
            break;
        case 75: //k
            keyK = true;
            break;
        case 76: //l
            keyL = true;
            break;              
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 68: //d
            keyD = false;
            break;
        case 83: //s
            keyS = false;
            break;
        case 65: //a
            keyA = false;
            break;
        case 87: //w
            keyW = false;
            break;
        case 67: //c
            keyC = false;
            break;
        case 86: //v
            keyV = false;
            break;
        case 85: //u
            keyU = false;
            break;
        case 77: //m
            keyM = false;
            break;
        case 73: //i
            keyI = false;
            break;
        case 75: //k
            keyK = false;
            break;
        case 76: //l
            keyL = false;
            break;
               
    }
}

var update;
var openDoor;
var closeDoor;
var clock;

//////////////////////////////////////////////////////////////////

// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {
    //sceneGraph.fog = new THREE.Fog(0xa0a0a0, 50, 70);

    var geometry = new THREE.PlaneGeometry( 10, 10, 20, 20);
    var material = new THREE.MeshBasicMaterial( { color: 0x808080, side: THREE.DoubleSide } );
    var material2 = new THREE.MeshLambertMaterial( { color: 0xD3D3D3, side: THREE.DoubleSide } );

    var room = new THREE.Group();

    //FLOOR
    const texture = new THREE.TextureLoader().load( 'images/floor.jpg' );
    const materialfloor = new THREE.MeshPhongMaterial( { map: texture } );
    var floor = new THREE.Mesh( geometry, materialfloor );
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = -Math.PI/2;
    floor.receiveShadow = true;
    room.add(floor);

    //CEILING
    const ceiling = new THREE.Mesh(geometry, material2);
    room.add(ceiling);
    ceiling.translateX(-0.5).translateY(3.65).translateZ(0);
    ceiling.rotation.x = -Math.PI/2;

    //OUTER WALLS
    //left wall
    const cubeGeometry = new THREE.BoxGeometry(3.6, 1, 10);
    const leftWall = new THREE.Mesh(cubeGeometry, material2);
    room.add(leftWall);

    //position
    leftWall.translateX(-5.4).translateY(1.83).translateZ(0.0);
    leftWall.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);

    //back wall
    const cubeGeometry2 = new THREE.BoxGeometry(3.6, 1, 10);
    const backWall = new THREE.Mesh(cubeGeometry2, material2);
    room.add(backWall);

    //position
    backWall.translateX(0.0).translateY(1.83).translateZ(-4.5);
    backWall.rotation.x = Math.PI / 2;
    backWall.rotation.y = Math.PI / 2;
    
    //right wall
    const cubeGeometry3 = new THREE.BoxGeometry(3.6, 1, 10);
    const rightWall = new THREE.Mesh(cubeGeometry3, material2);
    room.add(rightWall);

    //position
    rightWall.translateX(4.5).translateY(1.83).translateZ(0.0);
    rightWall.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);

    //front wall
    var material3 = new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 0.5,
    transparent: true, } );
    const cubeGeometry7 = new THREE.BoxGeometry(3.6, 0.1, 5);
    const wallFront = new THREE.Mesh(cubeGeometry7, material3);
    room.add(wallFront);

    //position
    wallFront.translateX(1.5).translateY(1.83).translateZ(4.97);
    wallFront.rotation.x = Math.PI / 2;
    wallFront.rotation.y = Math.PI / 2;

    //DOOR
    var materialDoor = new THREE.MeshPhongMaterial( { color: 0x663300});
    const cubeGeometryDoor = new THREE.BoxGeometry(3.6, 0.1, 3.3);
    const door = new THREE.Mesh(cubeGeometryDoor, materialDoor);
    sceneGraph.add(door);
    door.name = "door";

    room.add(door);
    sceneGraph.add(room);
    door.translateX(-3.5).translateY(1.83).translateZ(5);
    door.rotation.x = Math.PI / 2;
    door.rotation.y = Math.PI / 2;


    //INNER WALLS
    //Wall 1
    const cubeGeometry4 = new THREE.BoxGeometry(3.6, 1, 2.2);
    const Wall1 = new THREE.Mesh(cubeGeometry4, material2);
    room.add(Wall1);

    //position
    Wall1.translateX(-1.5).translateY(1.83).translateZ(3.9);
    Wall1.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);

    //Wall 2
    const cubeGeometry5 = new THREE.BoxGeometry(3.6, 0.7, 2.8);
    const Wall2 = new THREE.Mesh(cubeGeometry5, material3);
    room.add(Wall2);

    //position
    Wall2.translateX(2.6).translateY(1.83).translateZ(-0.2);
    Wall2.rotation.x = Math.PI / 2;
    Wall2.rotation.y = Math.PI / 2;

    //Wall 3
    const cubeGeometry6 = new THREE.BoxGeometry(3.6, 1, 3.2);
    const Wall3 = new THREE.Mesh(cubeGeometry6, material2);
    room.add(Wall3);

    //position
    Wall3.translateX(-1.5).translateY(1.83).translateZ(-2.8);
    Wall3.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI/2);

    //SCULPTERES

    //Egypt Pyramid
    const sculptureMaterial = new THREE.MeshBasicMaterial({ color:0xC2985E});
    const sculptureGeometry = new THREE.CylinderGeometry(0, 1.5, 1.5, 4, 1);
    const textureS1 = new THREE.TextureLoader().load( 'images/pyramidTexture.jpg' );
    const materialS1 = new THREE.MeshPhongMaterial( { map: textureS1 } );
    const sculpture1 = new THREE.Mesh(sculptureGeometry, materialS1);
    sceneGraph.add(sculpture1);

    sculpture1.translateX(0.2).translateY(0.77).translateZ(-2.8);
    sculpture1.rotation.y = Math.PI/4;

    const texture1 = 'images/egypt.png';
    const materialP1 = createPosterTexture(texture1);
    const poster1 = createPoster(materialP1);
    sceneGraph.add(poster1);
    poster1.translateX(-0.99).translateY(1.8).translateZ(-2.9);
    poster1.rotation.y = Math.PI/2;

    
    //Red cube
    const sculpture2Geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const sculpture2Material = new THREE.MeshPhongMaterial( {color: 0xFF0000} );
    const sculpture2 = new THREE.Mesh(sculpture2Geometry, sculpture2Material);
    sceneGraph.add(sculpture2);
    sculpture2.translateX(3.2).translateY(0.88).translateZ(1.2);
    sculpture2.rotation.y = Math.PI/4;
    sculpture2.rotation.x = Math.PI/4;

    const texture4 = 'images/redcube.png';
    const materialP4 = createPosterTexture(texture4);
    const poster2 = createPoster(materialP4);
    sceneGraph.add(poster2);
    poster2.translateX(3.99).translateY(2.2).translateZ(1.3);
    poster2.rotation.y = -Math.PI/2;


    //Greek Pillar
    var sculpture3 = new THREE.Group();

    const sculpture3Geometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    const sculpture3Material = new THREE.MeshBasicMaterial( {color: 0xE8E4C9} );
    const textureS3 = new THREE.TextureLoader().load( 'images/greekTexture.png' );
    const materialS3 = new THREE.MeshPhongMaterial( { map: textureS3 } );
    const cylinder = new THREE.Mesh(sculpture3Geometry, materialS3);
    const sculpture3_DownGeometry = new THREE.BoxGeometry(0.75, 0.25, 0.75);
    const sculpture3_DownMaterial = new THREE.MeshPhongMaterial({color: 0xE8E4C9});
    const sculpture3_Down = new THREE.Mesh(sculpture3_DownGeometry, sculpture3_DownMaterial);

    sculpture3.add(cylinder);
    sculpture3.add(sculpture3_Down);
    sceneGraph.add(sculpture3);
    sculpture3.castShadow = true;
    sculpture3.receiveShadow = true;
    cylinder.translateY(1.2);
    sculpture3_Down.translateY(0.13);
    sculpture3.translateX(-2.8).translateZ(-3.2);

    const texture2 = 'images/greek.png';
    const materialP2 = createPosterTexture(texture2);
    const poster3 = createPoster(materialP2);
    sceneGraph.add(poster3);
    poster3.translateX(-4).translateY(1.9).translateZ(-3.95);


    //Dome of the Rock
    const points = [];
    for ( let i = 0; i < 10; i ++ ) {
        points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    const sculpture4Geometry = new THREE.LatheGeometry( points );

    const sculpture4Material = new THREE.MeshBasicMaterial( { color: 0xffd700 } );
    const textureS4 = new THREE.TextureLoader().load( 'images/domeTexture.jpg' );
    const materialS4 = new THREE.MeshPhongMaterial( { map: textureS4, side: THREE.DoubleSide } );
    const sculpture4 = new THREE.Mesh(sculpture4Geometry, materialS4);
    sceneGraph.add(sculpture4);
    sculpture4.scale.set(0.06,0.06,0.06);
    sculpture4.rotation.x = Math.PI;
    sculpture4.translateX(0.4).translateY(-1.65).translateZ(-3.6);
    sculpture4.name = "sculpture4";

    const texture3 = 'images/dome.png';
    const materialP3 = createPosterTexture(texture3);
    const poster4 = createPoster(materialP3);
    sceneGraph.add(poster4);
    poster4.translateX(-0.999).translateY(2).translateZ(4);
    poster4.rotation.y = Math.PI/2;

   
    //TWIN TOWERS
    const sculpture5Geometry = new THREE.BoxGeometry(0.8, 3.5, 0.8);
    const textureS5 = new THREE.TextureLoader().load( 'images/twintowers.jpg' );
    const materialS5 = new THREE.MeshPhongMaterial( { map: textureS5 } );
    const sculpture5_first = new THREE.Mesh(sculpture5Geometry, materialS5);
    const sculpture5_second = new THREE.Mesh(sculpture5Geometry, materialS5);
    sceneGraph.add(sculpture5_second);
    sceneGraph.add(sculpture5_first);

    sculpture5_second.translateX(3.5).translateY(1.78).translateZ(4.5);
    sculpture5_first.translateX(3.5).translateY(1.78).translateZ(3.3);
    sculpture5_first.castShadow = true;
    sculpture5_second.castShadow = true;

    const texture5 = 'images/twintowers.png';
    const materialP5 = createPosterTexture(texture5);

    const poster5 = createPoster(materialP5);
    sceneGraph.add(poster5);
    poster5.translateX(2.2).translateY(1.8).translateZ(4.9);
    poster5.rotation.y = Math.PI;


    //SPACESHIP DISNEYLAND
    const sculpture6Material = new THREE.MeshPhongMaterial( {color: 0xD3D3D3} );
    const sculpture6Geometry = new THREE.IcosahedronGeometry( 0.8, 1 );

    const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
    let mesh = new THREE.Mesh( sculpture6Geometry, sculpture6Material );
    let wireframe = new THREE.Mesh( sculpture6Geometry, wireframeMaterial );
    mesh.add( wireframe );
    sceneGraph.add( mesh );

    const sculpture6 = new THREE.Mesh(sculpture6Geometry, sculpture6Material);
    mesh.translateX(3).translateY(0.8).translateZ(-2.8);

    const texture6 =  'images/spaceship.png';
    const materialP6 = createPosterTexture(texture6);
   
    const poster6 = createPoster(materialP6);
    sceneGraph.add(poster6);
    poster6.translateX(3.97).translateY(2).translateZ(-2.9);
    poster6.rotation.y = -Math.PI/2;


    //POSTER MUSEUM ENTRANCE
    var entrance = new THREE.Group();
    const entrance_downGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 32 );
    const entrance_downMaterial = new THREE.MeshPhongMaterial( {color: 'rgb(245,222,179)'} );
    const entrance_down = new THREE.Mesh(entrance_downGeometry, entrance_downMaterial );

    const length = 12, width = 8;
    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
        steps: 1,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const entrance_upGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const entrance_upMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, opacity: 0.5,
    transparent: true, } );
    const entrance_up = new THREE.Mesh(entrance_upGeometry, entrance_upMaterial) ;
    entrance_up.scale.set(0.09,0.09,0.09);
    entrance.add(entrance_down);
    entrance.add(entrance_up);
    entrance_down.translateY(0.51);
    entrance_up.rotation.x = -0.15;
    entrance_up.translateX(-0.5).translateY(1);
    entrance.translateX(-4.2).translateZ(3);
    entrance.rotation.y = 0.2;
    sceneGraph.add(entrance);
    entrance.castShadow = true;
    entrance.receiveShadow = true;
    entrance_up.name = "entrance_up";

    const loader = new THREE.FontLoader();
    let textLine = "Welcome to the \n      Museum !";
    var text;

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        const geometryText = new THREE.TextGeometry( textLine, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 5,
        bevelOffset: 0,
        bevelSegments: 5
        } );
        var textMaterial = new THREE.MeshPhongMaterial( 
        { color: 0x000000 }
      );

      text = new THREE.Mesh( geometryText, textMaterial );

      sceneGraph.add(text);
      text.scale.set(0.001, 0.001, 0.001);
      text.translateX(-4.6).translateY(1.4).translateZ(3);
      text.rotation.y = 0.2;

    } );

    clock = new THREE.Clock(); //start clock for entrance color
}

// Displacement values and other variables needed

var delta = 0.08;
var delta2 = 0.08;
var dispD = 0.1, dispC = 0.1;

let vector = new THREE.Vector3(0,1,0);
let vector2 = new THREE.Vector3(1,0,0);

let toggleLight = 0;
const light16 = sceneElements.sceneGraph.getObjectByName("light16");
light16.visible = false;
let change = 1;
const entrance_up = sceneElements.sceneGraph.getObjectByName("entrance_up");

//values needed for door opening and closing
var dispDoor = -0.1;
var dispDoorClose = 0.05;
const door = sceneElements.sceneGraph.getObjectByName("door");


function computeFrame(time) {

    //get lights and objects needed
    const light1 = sceneElements.sceneGraph.getObjectByName("light1");
    const light2 = sceneElements.sceneGraph.getObjectByName("light2");
    const light14 = sceneElements.sceneGraph.getObjectByName("light14");
    const sculpture4 = sceneElements.sceneGraph.getObjectByName("sculpture4");
    
 
    if (keyM) { //makes dome of rock rotate
        sculpture4.rotateY(dispD);
    }
    if (keyC) { //opens door
        openDoor();
    }
    if (keyV) { //closes door
        closeDoor();
    }
    if (keyK) { //moves spaceship lights
        moveLights();
    }
    if (keyL) { //toggles corridor light
        toggleCorridorLight();
    }

    //camera movements
    if (keyW) {
        sceneElements.camera.translateZ(-moveWS);
    }
    if (keyS) {
        sceneElements.camera.translateZ(moveWS);
    }
    if (keyA) {
        sceneElements.camera.rotateOnAxis(vector, moveAD*25); 
    }
    if (keyD) {
        sceneElements.camera.rotateOnAxis(vector, -moveAD*25); 
    }
    if (keyU) {
        sceneElements.camera.rotateOnAxis(vector2, moveAD); 
    }
    if (keyI) {
        sceneElements.camera.rotateOnAxis(vector2, -moveAD); 
    }


    update();
    // Rendering
    helper.render(sceneElements);
    // Call for the next frame
    requestAnimationFrame(computeFrame);
}


//functions to create a info poster
function createPoster(material) {
    const planeGeometry = new THREE.PlaneGeometry(1.5, 0.9);
    const poster = new THREE.Mesh(planeGeometry, material);
    return poster;
}

function createPosterTexture(textureName) {
    const texture = new THREE.TextureLoader().load(textureName);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    return material;
}


// update entrance colors
function update(){
      var time = clock.getElapsedTime(); // elapsed time since last reset
      if ( time > 20 ) {
        changeEntranceColor();
        clock.start(); // resets clock
      }
}

//function that changes the entrance monitor color according to the actual value of change
function changeEntranceColor() {
    if(change == 1)
    {
        entrance_up.material.color.setHex(0x00007f);
        entrance_up.material.opacity = 0.7;
        change = 0;
    }
    else if(change == 0)
    {
        entrance_up.material.color.setHex(0xffffff);
        entrance_up.material.opacity = 0.5;
        change = 1;
    }
}

//function that makes door move to left
function openDoor() {
    if (door.position.x <= -3.5 && door.position.x >= -6) {
        door.translateZ(dispDoor);
    }
}

//function that makes door move to right
function closeDoor() {
    if (door.position.x <= -3.7) {
        door.translateZ(dispDoorClose);
    }
}

//function that moves spaceship lights as long as user clicks 
function moveLights(time) {
    const light1 = sceneElements.sceneGraph.getObjectByName("light1");
    const light2 = sceneElements.sceneGraph.getObjectByName("light2");
    if (light1.position.z >= -2.2 && light2.position.z >= -4) {        
            delta *= -1;
            delta2 *= -1;
    } else if (light1.position.z <= -5 && light2.position.z <= 0){
        delta *= -1;
        delta2 *= -1;
    }
    light1.translateZ(delta);
    light2.translateZ(delta2);
}

//function that lights up or switches off corridor light
function toggleCorridorLight() {
    if (toggleLight === 0) {
        light16.visible = true;
        toggleLight = 1;
    }
    else if (toggleLight === 1) {
        light16.visible = false;
        toggleLight = 0;
    }
}
