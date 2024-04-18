import * as PIXI from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import jsonData from './choice.json';
import { Link } from 'react-router-dom';

function ShapeMatching() {
  const appRef = useRef(null);
  const [questionIndex , setQuestionIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const app = new PIXI.Application();
      appRef.current = app;
      await app.init({ background: "#393e46", width: 1400, height: 800})
      const imgs = jsonData['shapes'];
      const textures =  await Promise.all(imgs.map((img) => PIXI.Assets.load(img)));
      

      const text = new PIXI.Text('Choose One of the below to match the shape!', {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xFFFFFF, // Text color: white 
        align: 'center', // Text alignment: center
      });
      text.x = 400;
      text.y = 100;
      app.stage.addChild(text);

      // useEffect(()=>{
        const wrong_right = new PIXI.Text('', {
        fontFamily: 'Arial',
        fontSize: 30,
        fill:"#D2042D", // Text color: white 
        align: 'center', // Text alignment: center
      });
      wrong_right.x = 400;
      wrong_right.y = 60;
      // Add the text to the stage
      app.stage.addChild(wrong_right);

      // const randomindex = Math.floor(Math.random() * textures.length);
      const random = new PIXI.Sprite(textures[questionIndex]);
      random.width = 220;
      random.height = 170;
      random.x = app.screen.width / 2.5;
      random.y = app.screen.height / 4;
      app.stage.addChild(random);
      var x = 2;
      for (let index = 0; index < textures.length; index++) {
        const sprite = new PIXI.Sprite(textures[index]);
        sprite.width = 220;
        sprite.height = 170;
        sprite.x = x * (app.screen.width / 10);
        sprite.y = app.screen.height / 1.5;
        sprite.interactive = true;
        sprite.buttonMode = true;
        sprite.on('pointerdown', touched, sprite);
        app.stage.addChild(sprite);
        x += 2;
      }
      
    // },[questionIndex]);
    

      document.body.appendChild(app.canvas);
      function touched(event) {
        // console.log(event.target);
        if (event.target.texture === random.texture) {
          // console.log("Correct");
          wrong_right.style.fill = "#00FF00";
          wrong_right.text = "Correct !!";
          setTimeout(() => {
            setQuestionIndex((prev) => ((prev + 1) % textures.length)? prev + 1 : window.confirm('gameOver'));
          }, 1000);
          // function gohome(){
          //   // Replace confirm with a custom modal or dialog component
          //   if(window.confirm('gameOver'))
          //   navigate('/')
          // }

        } else {
          // console.log("Wrong");
          
          wrong_right.style.fill = "#FF0000";
          wrong_right.text = "choose the correct shape!";
          setTimeout(() => {
            wrong_right.text = "";
          }, 1000);

        }
      }


      document.getElementById('pixi-container').appendChild(app.canvas);

    })();
    return () => {
      if (appRef.current && document.getElementById('pixi-container')) {
        appRef.current.destroy();
        const canvasParent = document.getElementById('pixi-container');
        const canvas = canvasParent.querySelector('canvas');
        if (canvas) {
          canvasParent.removeChild(canvas);
        }
      }
    };
}, [questionIndex]);
  return (
    <>
      <div>
        <Link to='/' className='btn btn-primary m-2'>Go Back</Link>
        <h1 style={{color:'white'}}>Match the shapes</h1>
        <div className="text">

        </div>

      </div>
      <div id="pixi-container" />
    </>);



}

export default ShapeMatching;
