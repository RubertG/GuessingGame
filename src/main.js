const additions = document.querySelectorAll(".add")
const subtractions = document.querySelectorAll(".sub")
const messageWin = document.querySelector(".won")
const messageLose = document.querySelector(".lose")
const min = document.querySelector("#min")
const max = document.querySelector("#max")
const attempts = document.querySelector('#attempts')
let randomNumber

function clearMessage() {
   if (!messageLose.classList.contains("hidden")) messageLose.classList.add("hidden");
   if (!messageWin.classList.contains("hidden")) messageWin.classList.add("hidden");
   attempts.textContent = "Ninguno"
}

function limits() {
   additions.forEach(addition => {
      if (addition.id === "minAdd") {
         addition.addEventListener("click", () => add(min))
      } else {
         addition.addEventListener("click", () => add(max))
      }
   })

   subtractions.forEach(subtraction => {
      if (subtraction.id === "minSub") {
         subtraction.addEventListener("click", () => sub(min))
      } else {
         subtraction.addEventListener("click", () => sub(max))
      }
   })

   function sub(subObject) {
      if (subObject.id === "max") {
         const maxValue = parseInt(max.textContent)
         const minValue = parseInt(min.textContent)
         if (maxValue === minValue + 1) return
         subObject.textContent = parseInt(subObject.textContent) - 1
      } else {
         subObject.textContent = parseInt(subObject.textContent) - 1
      }
   }

   function add(addObject) {
      if (addObject.id === "min") {
         const maxValue = parseInt(max.textContent)
         const minValue = parseInt(min.textContent)
         if (maxValue - 1 === minValue) return
         addObject.textContent = parseInt(addObject.textContent) + 1
      } else {
         addObject.textContent = parseInt(addObject.textContent) + 1
      }
   }
}

function updateGame() {
   clearMessage()
   startRandomNumber()
}

function startRandomNumber() {
   const maxValue = parseInt(max.textContent) + 1
   const minValue = parseInt(min.textContent)
   randomNumber = Math.floor(Math.random() * (maxValue - minValue) + minValue)
}

function updateAttempts(newNumber) {
   const attemptsValues = attempts.textContent
   if (attemptsValues === "Ninguno") {
      attempts.textContent = newNumber
   } else {
      attempts.textContent = attemptsValues + ", " + newNumber
   }
}

function startGame() {
   document.addEventListener("submit", (e) => {
      e.preventDefault()
      const numberPlayer = parseInt(e.target.number.value)
      if (randomNumber === numberPlayer) {
         if (!messageLose.classList.contains("hidden")) {
            messageLose.classList.add("hidden")
         }
         messageWin.classList.remove("hidden")
      } else {
         if (!messageWin.classList.contains("hidden")) {
            messageWin.classList.add("hidden")
         }
         messageLose.classList.remove("hidden")
         updateAttempts(numberPlayer)
      }
   })
}

function main() {
   limits()
   startRandomNumber()
   startGame()
}

main()