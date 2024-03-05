document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('captcha');
  var ctx = canvas.getContext('2d');
  var captchaText = generateCaptchaText(6);
  const captchaStatus = document.getElementById('captcha-status');
  drawCaptcha(captchaText);

  // Functia care se ocupa de verificarea CAPTCHA
  function verifyCaptcha() {
    var inputText = document
      .getElementById('captcha-input')
      .value.toLowerCase();

    if (inputText === captchaText.toLowerCase()) {
      captchaStatus.textContent = 'Captcha Correct!';
      captchaStatus.style.color = 'green';
    } else if (inputText.lenght < 6) {
      captchaStatus.textContent = 'Enter all characters!';
      captchaStatus.style.color = 'red';
    } else {
      captchaStatus.textContent = 'Captcha incorrect. Please try again!';
      captchaStatus.style.color = 'red';
    }
    setTimeout(() => {
      captchaStatus.textContent = '';
      captchaStatus.style.color = 'black';
    }, 3000);
    document.getElementById('captcha-input').value = '';
    captchaText = generateCaptchaText(6);
    drawCaptcha(captchaText);
  }

  // Se adauga event listener pentru butonul de "Check"
  document
    .getElementById('check-captcha')
    .addEventListener('click', verifyCaptcha);

  // Se adauga event listener pentru butonul de "Reload"
  document
    .getElementById('reload-captcha')
    .addEventListener('click', function () {
      captchaText = generateCaptchaText(6);
      drawCaptcha(captchaText);
      document.getElementById('captcha-input').value = '';
      captchaStatus.textContent = '';
    });

  function generateCaptchaText(length) {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  }

  function drawCaptcha(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f3f3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addNoise(ctx);
    ctx.fillStyle = '#06108c';
    ctx.font = '24px Arial';

    // Se calculeaza latimea textului si pozitia de start
    const textWidth = ctx.measureText(text).width;
    const startX = (canvas.width - textWidth) / 3;

    // Se ajusteaza rotatia si distorsiunea caracterelor CAPTCHA
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      // Pentru fiecare caracter se ajusteaza startX
      ctx.translate(startX + i * 20, 30);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }

  function addNoise(ctx) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    // Fundal random pentru CAPTCHA
    for (let i = 0; i < pixels.length; i += 2) {
      let color = Math.random() > 0.5 ? 255 : 0;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = color;
    }
    ctx.putImageData(imageData, 0, 0);
  }
});
