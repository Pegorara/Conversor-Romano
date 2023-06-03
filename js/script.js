const romanoInput = document.querySelector('#roman > input');
const arabicoInput = document.querySelector('#arabic > input');


// romanoInput.addEventListener('input', function() {
//   const numeroRomano = romanoInput.value;
//   const numeroArabico = romanoParaArabico(numeroRomano);
//   arabicoInput.value = numeroArabico;
// });

// arabicoInput.addEventListener('input', function() {
//   const numeroArabico = parseInt(arabicoInput.value);
//   const numeroRomano = arabicoParaRomano(numeroArabico);
//   romanoInput.value = numeroRomano;
// });

romanoInput.addEventListener('input', function () {
  const numeroRomano = romanoInput.value.toUpperCase();
  const numeroArabico = romanoParaArabico(numeroRomano);
  arabicoInput.value = numeroArabico;
});

arabicoInput.addEventListener('input', function () {
  if (arabicoInput.value > 3999 || arabicoInput.value < 1) {
    if (arabicoInput.value < 1) {
      arabicoInput.value = null;
    } else {
      arabicoInput.value = 3999;
    }
  }
  const numeroArabico = arabicoInput.value;
  const numeroRomano = arabicoParaRomano(numeroArabico);
  romanoInput.value = numeroRomano;
});


function romanoParaArabico(numeroRomano) {
  const valoresRomano = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  if (!/^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(numeroRomano)) {
    throw new Error('O número precisa estar entre I e MMMCMXCIX.');
  }

  let numeroArabico = 0;
  let valorAnterior = 0;

  for (let i = numeroRomano.length - 1; i >= 0; i--) {
    const char = numeroRomano[i];
    const valor = valoresRomano[char];

    if (valor >= valorAnterior) {
      numeroArabico += valor;
    } else {
      numeroArabico -= valor;
    }

    valorAnterior = valor;
  }

  return numeroArabico;
}

function arabicoParaRomano(numeroArabico) {
  const valoresRomano = [
    { numero: 1000, letra: 'M' },
    { numero: 900, letra: 'CM' },
    { numero: 500, letra: 'D' },
    { numero: 400, letra: 'CD' },
    { numero: 100, letra: 'C' },
    { numero: 90, letra: 'XC' },
    { numero: 50, letra: 'L' },
    { numero: 40, letra: 'XL' },
    { numero: 10, letra: 'X' },
    { numero: 9, letra: 'IX' },
    { numero: 5, letra: 'V' },
    { numero: 4, letra: 'IV' },
    { numero: 1, letra: 'I' },
  ];

  let numeroRomano = '';

  for (let i = 0; i < valoresRomano.length; i++) {
    const { numero, letra } = valoresRomano[i];

    while (numeroArabico >= numero) {
      numeroRomano += letra;
      numeroArabico -= numero;
    };
  };

  return numeroRomano;
};

function limpar() {
  arabicoInput.value = '';
  romanoInput.value = '';
}