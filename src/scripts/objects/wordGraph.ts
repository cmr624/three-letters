import { getFirstCharacter, getLastCharacter } from "../utils/stringUtils";

export class Graph {
    adjacencyList : Map<string, Array<string>>;
    constructor(){
        this.adjacencyList = new Map();
    }

    addVertex(v : string){
        this.adjacencyList.set(v, []);
    }
    addEdge(v, w) {
        this.adjacencyList.get(v)?.push(w);
        //this.adjacencyList.get(w).push(v) if graph is un directed 
    }

    deleteVertex(v){
        this.adjacencyList.delete(v);
    }
    getListAtVertex(vertex){
        return this.adjacencyList.get(vertex);
    }
}
const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

export class ThreeLetterWordBank extends Phaser.GameObjects.GameObject {
    letterGraph : Graph;
    array : [string];
    wordGraph : Graph;
    constructor(public scene : Phaser.Scene){
        super(scene, 'word-bank');
        // console.log(this.scene.registry.get('word-list'));
        this.array = this.scene.registry.get('word-list');
        this.letterGraph = new Graph();
        this.wordGraph = new Graph();
        lettersArray.forEach(letter => this.letterGraph.addVertex(letter));

        this.loadGraph();
    }

    loadGraph(){
        this.array.forEach((word) => {
            this.letterGraph.addEdge(getFirstCharacter(word), word);
        });
        this.array.forEach((word) => {
            this.wordGraph.addVertex(word);
            this.letterGraph.getListAtVertex(getLastCharacter(word))
                ?.forEach((wordInAdjacencyList) => {
                    this.wordGraph.addEdge(word, wordInAdjacencyList);
                });
        });
    }

    pickFirstWord() : string {
        let arr = this.letterGraph.getListAtVertex(getRandomItemFromArray(lettersArray));
        return getRandomItemFromArray(arr);
    }
    generatePuzzle() : PuzzleData{
        let firstWord = this.pickFirstWord();
        let firstWordList = this.wordGraph.getListAtVertex(firstWord);
        while (firstWordList === undefined || firstWordList.length === 0) {
            firstWord = this.pickFirstWord();
            firstWordList = this.wordGraph.getListAtVertex(firstWord);
        }

        let secondWord = getRandomItemFromArray(firstWordList);
        let secondWordList = this.wordGraph.getListAtVertex(secondWord);
        while (secondWordList === undefined || secondWordList.length === 0) {
            secondWord = getRandomItemFromArray(firstWordList);
            secondWordList = this.wordGraph.getListAtVertex(secondWord);
        }

        let thirdWord = getRandomItemFromArray(secondWordList);

        let lettersBank : Array<string> = new Array<string>();
        let firstWordArr = firstWord.split('');
        firstWordArr.forEach((letter) => {
            lettersBank.push(letter);
        })
        lettersBank.push(secondWord.split('')[1]);
        lettersBank.push(secondWord.split('')[2]);

        lettersBank.push(thirdWord.split('')[1]);
        lettersBank.push(thirdWord.split('')[2]);

        
        return {firstWord : firstWord, secondWord : secondWord, thirdWord : thirdWord, lettersBank:shuffle(lettersBank)}

    }
}

export interface PuzzleData {
    firstWord : string;
    secondWord : string;
    thirdWord : string;
    lettersBank : Array<string>;
}

export function shuffle(array) {
    let ctr = array.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

export function getRandomItemFromArray(array){
    return array[rand(0, array.length - 1)];

}

/**
 * random integer generator between two values inclusive
 * @param min minimum integer (inclusive)
 * @param max maximum integer (inclusive)
 */
export function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}