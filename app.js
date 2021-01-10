function getRandomValue(min, max) {
    let value = Math.floor(Math.random() * (max - min)) + min;
    return value;
}

let myApp = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            result: "",
            surrender: false,
            logs: [],
        }
    },

    methods: {
        attackMonster() {
            let attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.pushLogData('player', 'attacks', attackValue)
            this.attackPlayer();
            this.currentRound++;

        },

        attackPlayer() {
            let attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.pushLogData('monster', 'attacks', attackValue)
        },

        specialAttackMonster() {
            let attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.pushLogData('player', 'attacks', attackValue)
            this.attackPlayer();
            this.currentRound++;
        },

        healPlayer() {
            this.currentRound++;
            let value = getRandomValue(8, 20);
            if (value + this.playerHealth > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += value;
            }
            this.pushLogData('player', 'heals', value);
            this.attackPlayer();
        },

        newGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.result = "";
            this.surrender = false;
            this.logs = [];
        },

        surrenderFromMatch() {
            this.surrender = !this.surrender;
        },

        pushLogData(who, what, value) {
            this.logs.push({
                whoID: who,
                whatID: what,
                valueAmount: value,
            });
        }
    },

    computed: {
        monsterBarStyles() {
            if (this.monsterHealth <= 0) {
                return { 
                    width: '0%' };
            } else {
                return { width: `${this.monsterHealth}%` };
            }

        },

        playerBarStyles() {
            if (this.playerHealth <= 0) {
                return { width: '0%' };
            } else {
                return { width: `${this.playerHealth}%` };
            }

        },

        specialAttackDisable() {
            return this.currentRound % 3 !== 0
        },

        gameIsOver() {
            return this.monsterHealth <= 0 || this.playerHealth <= 0 || this.surrender;
        },

        gameResult() {
            if (this.monsterHealth > this.playerHealth || this.surrender) {
                return "Monster beat you to pieces... You lost!";
            } else if (this.playerHealth > this.monsterHealth) {
                return "Monster has been defeated... You Win!!";
            } else if (this.monsterHealth == this.playerHealth) {
                return "It is a Draw!";
            }
        }
    }

});

myApp.mount('#game');