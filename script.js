//your JS code here. If required.
const player1Input = document.getElementById("player-1");
      const player2Input = document.getElementById("player-2");
      const change = document.getElementById("change");

      let Player1, Player2;
      let currentSymbol = "x";
      let currentPlayer;
      let win = 0;
      let count = 0;
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function checkWinner(boxes) {
        count++;
        winConditions.forEach((condition) => {
          const [a, b, c] = condition;
          if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
          ) {
            win = 1;
            const username = boxes[a].innerText === "x" ? Player1 : Player2;
            document.getElementsByClassName(
              "message"
            )[0].innerText = `${username}, congratulations you won!`;
			  boxes[a].style.backgroundColor="#800080";
			  boxes[b].style.backgroundColor="#800080";
			  boxes[c].style.backgroundColor="#800080";
          }
        });
      }

      function startGame(e) {
        e.preventDefault();
        Player1 = player1Input.value.trim();
        Player2 = player2Input.value.trim();
        currentPlayer = Player1;
        currentSymbol = "x";
        // win = 0;

        if (Player1 !== "" && Player2 !== "") {
          change.innerHTML = `
            <div id="center">
              <div class="message" style="text-align: center;">${currentPlayer}, you're up</div>
              <div class="grid">
                ${Array.from({ length: 9 }, (_, i) => `<div class="box" id="${i + 1}"></div>`).join("")}
              </div>
             
            </div>
          `;

          const boxes = document.querySelectorAll(".box");
          boxes.forEach((box) => {
            box.addEventListener("click", () => {
              if (box.innerText === "" && win === 0) {
                box.innerText = currentSymbol;
                checkWinner(boxes);
                if (win === 0) {
                  currentSymbol = currentSymbol === "x" ? "o" : "x";
                  currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
                  document.getElementsByClassName(
                    "message"
                  )[0].innerText = `${currentPlayer}, you're up`;
                  if (count == 9) {
                      document.getElementsByClassName("message")[0].innerText=`Draw Game`
                  }
                }
              }
            });
          });
        } else {
          alert("Enter name of both the players!");
        }
      }