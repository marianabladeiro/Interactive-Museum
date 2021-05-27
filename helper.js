"use strict";

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();
        sceneElements.sceneGraph.translateX(3).translateY(-0.09).translateZ(-2.5);

        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        sceneElements.camera = camera;
        camera.position.set(-0.1, 1, 6);
        camera.lookAt(0, 0, 0);

        // ************************** //
        // NEW --- Control for the camera
        // ************************** //
        sceneElements.control = new THREE.OrbitControls(camera);
        sceneElements.control.screenSpacePanning = true;
        sceneElements.control.target.set(0,1,0);
        camera.lookAt(sceneElements.control.target);

        // ************************** //
        // Illumination
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0x606060, 0x2a2a35);
        hemiLight.position.set(0, 1,0);
        sceneElements.sceneGraph.add(hemiLight);


        // ************************** //
        // Sculpture Lights
        // ************************** //
        //for spaceship
        const light1 = new THREE.SpotLight(0xab20fd, 2.3, 2.5);
        light1.translateX(3).translateY(1.8).translateZ(-4);
        sceneElements.sceneGraph.add(light1);
        light1.castShadow = true;
        light1.name = "light1";

        const light12 = new THREE.PointLight(0xab20fd, 2.3, 2);
        light12.translateX(4).translateY(1.5).translateZ(-4);
        sceneElements.sceneGraph.add(light12);
        light12.castShadow = true;
        light12.name = "light12";

        const light2 = new THREE.PointLight(0x005eff, 2.3, 2.5);
        light2.translateX(2.5).translateY(1.8).translateZ(-1.5);
        sceneElements.sceneGraph.add(light2);
        light2.castShadow = true;

        light2.name = "light2";

        const light13 = new THREE.PointLight(0x005eff, 2.3, 2.5);
        light13.translateX(4).translateY(1.8).translateZ(-0.8);
        sceneElements.sceneGraph.add(light13);
        light13.castShadow = true;

        const light3 = new THREE.PointLight(0xe0aa3e, 2, 2.5);
        light3.translateX(0.5).translateY(0.8).translateZ(-2.5);
        sceneElements.sceneGraph.add(light3);
        light3.castShadow = true;
        light3.name = "light3";

        const light4 = new THREE.PointLight(0xe0aa3e, 2, 2);
        light4.translateX(2.5).translateY(0.5).translateZ(-1.5);
        sceneElements.sceneGraph.add(light4);
        light4.castShadow = true;
        light4.name = "light4";

        //for dome
         const light7 = new THREE.PointLight(0xffffff, 1.5, 2);
         light7.translateX(1.8).translateY(1.5).translateZ(4.5);
         sceneElements.sceneGraph.add(light7);
         light7.castShadow = true;
         light7.name = "light7";

         const light8 = new THREE.PointLight(0xffffff, 1.5, 2);
         light8.translateX(-1).translateY(1.5).translateZ(4.5);
         sceneElements.sceneGraph.add(light8);
         light8.castShadow = true;
         light8.name = "light8";

         const light9 = new THREE.PointLight(0xffffff, 1.5, 2);
         light9.translateX(-2).translateY(1.5).translateZ(3);
         sceneElements.sceneGraph.add(light9);
         light9.castShadow = true;
         light9.name = "light9";

         const light10 = new THREE.PointLight(0xffffff, 1.5, 2);
         light10.translateX(0.4).translateY(0.5).translateZ(3.4);
         sceneElements.sceneGraph.add(light10);
         light10.castShadow = true;
         light10.name = "light10";

        //for greek pillar
         const light11 = new THREE.PointLight(0xffffff, 1, 5);
         light11.translateX(-3).translateY(2.5).translateZ(-3.7);
         sceneElements.sceneGraph.add(light11);
         light11.castShadow = true;
         light11.name = "light11";

        //for red cube
         const light14 = new THREE.PointLight(0xffffff, 1, 4);
         light14.translateX(3.2).translateY(2).translateZ(1.3);
         sceneElements.sceneGraph.add(light14);
         light14.castShadow = true;
         light14.name = "light14";

        //for pyramid
         const light15 = new THREE.PointLight(0xffffff, 1, 4);
         light15.translateX(0.5).translateY(2.5).translateZ(-3.5);
         sceneElements.sceneGraph.add(light15);
         light15.castShadow = true;
         light15.name = "light15";

         //corridor lights
         const light16 = new THREE.PointLight(0xffffff, 1, 5);
         light16.translateX(-3).translateY(1.5).translateZ(0.5);
         sceneElements.sceneGraph.add(light16);
         light16.castShadow = true;
         light16.name = "light16";

         //entrance light
         const light17 = new THREE.PointLight(0xffffff, 1, 2);
         light17.translateX(-4).translateY(0.5).translateZ(4);
         sceneElements.sceneGraph.add(light17);
         light17.castShadow = true;
         light17.name = "light17";


        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.name = "renderer";
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 219, 222)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};