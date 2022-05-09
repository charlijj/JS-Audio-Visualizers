// Jasper Charlinski

let canvas = document.getElementById(`mainCanvas`);
let ctx = canvas.getContext(`2d`);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --------------------------------------------------------------


let recordButton = document.getElementById('startRecording');

if (recordButton != null)
{
    recordButton.addEventListener(`click`, playVisualizer);
}

let visualizer = document.getElementById(`visualizerSelect`);

if (visualizer != null)
{
    visualizer.value = window.localStorage.getItem(`visualizerOption`);
    window.localStorage.setItem(`visualizerOption`, visualizer.value);
    visualizer.addEventListener(`change`, function () {
        
        window.localStorage.setItem(`visualizerOption`, visualizer.value);

        

    });
}

function playVisualizer() {

    const audioCtx = new AudioContext();

    let analyser = audioCtx.createAnalyser();

    const audio = new Audio(`song.mp3`);
    let audioSource = audioCtx.createMediaElementSource(audio);
    audioSource.connect(analyser);

    //An unsigned integer, representing the window size of the FFT, given in number of samples. 
    //A higher value will result in more details in the frequency domain but fewer details in the time domain.
    // Must be a power of 2 (up to 2^15)
    analyser.fftSize = 1024;

    //Bin count is always half of the fft size and is the number of canvas elements that are to be drawn.
    let bufferLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLen);

    let stop;

    if (navigator.mediaDevices) {

        navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {

            const microphone = audioCtx.createMediaStreamSource(stream);
    
            if (recordButton.value == "Start Listening")
            {
                recordButton.value = "Stop Listening";
                recordButton.style.backgroundColor = `red`;
                recordButton.style.borderRadius = 0;
                microphone.connect(analyser);
            }
            else
            {
                recordButton.value = "Start Listening";
                recordButton.style.backgroundColor = `white`;
                microphone.disconnect();
                delete dataArray;
                delete audioCtx;
                window.location.reload();
                stop = true;
            }
        }).catch((err) => {
            
            alert(`Could not access microphone\nMake sure it is connected properly`);
            audio.play();
          });

    }
    else
    {
        alert(`Could not access microphone\nMake sure it is connected properly`);
        audio.play();

    }

    if (stop)
    {
        return;
    }

    switch (window.localStorage.getItem(`visualizerOption`))
    {
        case `bar`:
            animateBar();
            break;
        case `rainbowBar`:
            animateRainbowBar();
            break;
        case `fullRainbowBar`:
            animateFullRainbowBar();
            break;
        case `iceBlueMirror`:
            animateIceBlueMirror();
            break;
        case `fireRedMirror`:
            animateFireRedMirror();
            break;
        case `hollowMirror`:
            animateHollowMirror();
            break;
        case `pulsingCircle`:
            animatePulsingCircle();
            break;
        case `pulsingRainbowCircle`:
            animatePulsingRainbowCircle();
            break;
        case `rainbowSpiral`:
            animateRainbowSpiral();
            break;
        case `sensoryOverload`:
            animateSensoryOverload();
            break;
        case `wormHole`:
            animateWormHole();
            break;
        case `space`:
            animateSpace();
            break;
        case `movingVortex`:
            animateMovingVortex();
            break;
        case `spiralingSquares`:
            animateSpiralingSquares();
            break;
        case `overlappingSquares`:
            animateOverlappingSquares();
            break;
        case `line`:
            animateLine();
            break;
        default:
            animateBar();
    }

    function animateBar() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;
            ctx.fillStyle = `red`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 5;

        }
        
        requestAnimationFrame(animateBar);
    }

    function animateRainbowBar() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        colorHeight = 100;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;
            ctx.fillStyle = `red`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, colorHeight);

            ctx.fillStyle = `yellow`;
            ctx.fillRect(x, canvas.height - barHeight + colorHeight, barWidth, colorHeight);

            ctx.fillStyle = `green`;
            ctx.fillRect(x, canvas.height - barHeight + colorHeight*2, barWidth, colorHeight);

            ctx.fillStyle = `blue`;
            ctx.fillRect(x, canvas.height - barHeight + colorHeight*3, barWidth, colorHeight);

            ctx.fillStyle = `purple`;
            ctx.fillRect(x, canvas.height - barHeight + colorHeight*4, barWidth, colorHeight);

            x += barWidth + 5;

        }
        
        requestAnimationFrame(animateRainbowBar);
    }

    function animateFullRainbowBar() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const hue = i * 3;
            ctx.fillStyle = `hsl(` + hue + `,100%, 50%)`;

            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 5;

        }
        
        requestAnimationFrame(animateFullRainbowBar);
    }

    function animateIceBlueMirror() {

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);


        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight / i;
            const green = barHeight/3;
            const blue = barHeight/2;

            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;

            ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

        x = 0;

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight / i;
            const green = barHeight/3;
            const blue = barHeight/2;

            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;

            ctx.fillRect(canvas.width/2 + x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

            
        requestAnimationFrame(animateIceBlueMirror);
    }

    function animateFireRedMirror() {

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);


        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight;
            const green = barHeight/3;
            const blue = barHeight/i;

            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;

            ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

        x = 0;

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight;
            const green = barHeight/3;
            const blue = barHeight/i;

            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;

            ctx.fillRect(canvas.width/2 + x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

            
        requestAnimationFrame(animateFireRedMirror);
    }

    function animateHollowMirror() {

        const barWidth = canvas.width / bufferLen + 20;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight;
            const green = barHeight/3;
            const blue = barHeight/i;

            ctx.strokeStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.strokeRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

        x = 0;

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;

            const red = barHeight/3;
            const green = barHeight;
            const blue = barHeight/i;

            ctx.strokeStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.strokeRect(canvas.width/2 + x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }

            
        requestAnimationFrame(animateHollowMirror);
    }

    function animatePulsingCircle() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i + Math.PI/2);

            const red = barHeight / 3;
            const green = barHeight / 4;
            const blue = barHeight/2;

            barHeight = dataArray[i]*3;
            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.restore();
        }
        
        requestAnimationFrame(animatePulsingCircle);
    }

    function animatePulsingRainbowCircle() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let colorHeight = 100;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i + Math.PI/2);
            barHeight = dataArray[i]*2;
            ctx.fillStyle = `red`;
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.fillStyle = `yellow`;
            ctx.fillRect(0, colorHeight, barWidth, barHeight);
            ctx.fillStyle = `green`;
            ctx.fillRect(0, colorHeight*2, barWidth, barHeight);
            ctx.fillStyle = `blue`;
            ctx.fillRect(0, colorHeight*3, barWidth, barHeight);
            ctx.fillStyle = `purple`;
            ctx.fillRect(0, colorHeight*4, barWidth, barHeight);
            ctx.restore();
        }
        
        requestAnimationFrame(animatePulsingRainbowCircle);
    }

    function animateRainbowSpiral() {

        analyser.fftSize = 256;
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI * 50 / bufferLen);
            const hue = i * 10;
            ctx.fillStyle = `hsl(` + hue + `,100%, 50%)`;
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.restore();
        }
        
        requestAnimationFrame(animateRainbowSpiral);
    }

    function animateSensoryOverload() {

        analyser.fftSize = 256;
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i + Math.PI/2);
            ctx.fillStyle = `red`;
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.fillStyle = `blue`;
            ctx.fillRect(20, 20, barWidth, barHeight);
            ctx.fillStyle = `green`;
            ctx.fillRect(40, 40, barWidth, barHeight);
            ctx.fillStyle = `#eeff00`;
            ctx.fillRect(60, 60, barWidth, barHeight);
            ctx.fillStyle = `#ff3399`;
            ctx.fillRect(80, 80, barWidth, barHeight);
            ctx.fillStyle = `#00FF00`;
            ctx.fillRect(105, 105, barWidth/2, barHeight/2);
            ctx.fillStyle = `##00FF7F`;
            ctx.fillRect(115, 115, barWidth/3, barHeight/3);
            ctx.fillStyle = `#8A2BE2`;
            ctx.fillRect(125, 125, barWidth/2, barHeight/2);
            ctx.restore();
        }
        
        requestAnimationFrame(animateSensoryOverload);
    }

    function animateWormHole() {

        analyser.fftSize = 256;
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            const hue = i * 10;
            ctx.fillStyle = `hsl(` + hue + `,100%, 50%)`;
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.arc(0, 0, barHeight, 0, Math.PI *2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            x += barWidth;
            ctx.restore();
        }     
        requestAnimationFrame(animateWormHole);
    }

    function animateSpace() {

        analyser.fftSize = 256;
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            const red = barHeight;
            const green = barHeight/3;
            const blue = barHeight/i;
            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.lineWidth = 12;
            ctx.rotate(i * Math.PI * 100 / barHeight);
            ctx.fillStyle = `white`;
            ctx.fillRect(barHeight,barHeight, barWidth/2, barHeight/8);
            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.beginPath();
            ctx.arc(0, 0, barHeight/3, 0, Math.PI *2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }  

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI * 50 / bufferLen);
            const red = barHeight;
            const green = barHeight/3;
            const blue = barHeight/i;
            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.fillRect(0, 0, barWidth, barHeight);
            ctx.restore();
        }  

        requestAnimationFrame(animateSpace);
    }

    function animateMovingVortex() {

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);


        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*2;
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI * 50 / bufferLen);
            const red = 100;
            const green = barHeight/2;
            const blue = i;
            ctx.fillStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.fillRect(barHeight, barHeight, barWidth, barHeight);
            ctx.fillRect(barHeight - i,barHeight - i, barWidth, barHeight/8);

            ctx.rotate(barHeight/100);
            ctx.fillRect(0,0, barWidth, barHeight/4);
            ctx.restore();
        }
        
        requestAnimationFrame(animateMovingVortex);
    }

    function animateSpiralingSquares() {

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);


        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i];
            ctx.save();
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(i * Math.PI * 50 / bufferLen);
            const red = 100;
            const green = barHeight/2;
            const blue = i;

            ctx.strokeStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.strokeRect(i, i, barHeight, barHeight);
            ctx.restore();
        }
        
        requestAnimationFrame(animateSpiralingSquares);
    }

    function animateOverlappingSquares() {

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);


        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;
            ctx.save();
            ctx.translate(canvas.width/2 - barHeight/2, canvas.height/2 - barHeight/2);
            
            const red = 100;
            const green = barHeight/2;
            const blue = i;

            ctx.strokeStyle = `rgb(`+ red + `,` + green + `,` + blue + `)`;
            ctx.strokeRect(0, 0, barHeight, barHeight);
            ctx.restore();
        }
        
        requestAnimationFrame(animateOverlappingSquares);
    }


    function animateLine() {
        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i]*3;
            ctx.fillStyle = `white`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, 5);
            x += barWidth;

        }
        
        requestAnimationFrame(animateLine);
    }

}