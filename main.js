const tablero = document.querySelector('#tablero');
const result = document.querySelector('#result');
const cpuResult = document.querySelector('#cpu_picked');
const userResult = document.querySelector('#user_picked');
const rock = document.querySelector('#rock')
const paper = document.querySelector('#paper')
const scissors = document.querySelector('#scissors');

const modal = document.querySelector('#modal');

let showWinnerList = {
    rock: {
        image: rock.children[0].outerHTML,
        clase: 'btn red',
    },
    paper: {
        image: paper.children[0].outerHTML,
        clase: 'btn blue',
    },
    scissors: {
        image: scissors.children[0].outerHTML,
        clase: 'btn yellow',
    },
}

//Abre Modal
const buttonRules = document.querySelector('#rules').addEventListener('click', () => {
    modal.classList.toggle('hidden');
})

//Cierra Modal
modal.addEventListener('click', () => {
    modal.classList.toggle('hidden');
})
const contentModal = document.querySelector('#contentModal').addEventListener('click', (event) => {
    event.stopPropagation();
})

const buttonClose = document.querySelector('#close').addEventListener('click', () => {
    modal.classList.toggle('hidden');
})

const buttonPlay = document.querySelector('#play').addEventListener('click', () => {
    tablero.classList.toggle('hidden');
    result.classList.toggle('hidden');
})

function computerChoise()
{
  const options = ['rock', 'paper', 'scissors']                  
  const randomOption = Math.floor(Math.random() * 3)  
  return options[randomOption]
}

function winner(user, cpu)
{
    let resultado = 'Empate'

    if(user === 'rock' && cpu === 'scissors')
    {
        resultado = 'Ganaste';
    }
    else if(user === 'paper' && cpu === 'rock')
    {
        resultado = 'Ganaste';
    }
    else if(user === 'scissors' && cpu === 'paper')
    {
        resultado = 'Ganaste';
    }
    else if(user === cpu)
    {
        resultado = 'Empate';
    }
    else
    {
        resultado = 'Perdiste';
    }

    
    return resultado;
} 

function constructResult(blockHTML, owner, title)
{
    blockHTML.children[0].innerHTML = `<strong>${title}</strong>`+showWinnerList[owner].image;
    blockHTML.children[0].removeAttribute('class');
    blockHTML.children[0].setAttribute('class', showWinnerList[owner].clase);

    return blockHTML
}

function titleResult(title)
{
    document.querySelector('#titleResult').innerText = `${title}!`;
}

let score = 0;

const userOptions = [rock, paper, scissors]
userOptions.forEach(option => {
    option.addEventListener('click', function(){
        // opcion del usuario
        const user = option.id
        const cpu = computerChoise()
        //  generar la logica para saber quien gano
        const resultado = winner(user, cpu)

        // ocultar el tablero de juego
        tablero.classList.toggle('hidden');
        // mostar el tabler de resultados
        result.classList.toggle('hidden');

        // mostrar el ganador y perdedor
        
        titleResult(resultado);

        if(resultado === 'Ganaste')
        {   
            constructResult(userResult, user, 'YOUR WINNER');
            constructResult(cpuResult, cpu, 'YOUR LOSER');
            score++;
        }
        else if(resultado === 'Perdiste')
        {
            constructResult(userResult, user, 'YOUR LOSER');
            constructResult(cpuResult, cpu, 'YOUR WINNER');
            score--;
        }
        else
        {
            constructResult(userResult, user, 'TIE');
            constructResult(cpuResult, cpu, 'TIE');
        }  

        document.querySelector('#score_number').innerText = score; 

    })
})