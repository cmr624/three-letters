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
                })
        });
    }

    generatePuzzle(){
        console.log(this.wordGraph.getListAtVertex("eat"));
    }
}