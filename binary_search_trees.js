import {mergeSort, merge} from "./mergeSort.js";


class Node {

    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}



class Tree {

    constructor (array){
       this.root;
       this.array = array;
       this.noDuplicates = [...new Set(this.array)];
       this.sortedArray = mergeSort(this.noDuplicates);
    }

    buildTree(start, end){
       
        let sorted = this.sortedArray;

        const mid = Math.floor((start + end) / 2);

        if(start > end ){
         return null;
        }

    //    creates a node.
        const node = new Node(sorted[mid]);

        node.left = this.buildTree(start, mid-1);
        node.right = this.buildTree(mid+1, end);
       
        return node;
    }

    insert(root, value){

        if (root === null){
            root = new Node(value);
            return root;
        }

        if (root.data > value){
            root.left = this.insert(root.left, value);
        }

        else if(root.data < value){
            root.right = this.insert(root.right, value);
        }

        return root;
    }

    delete(value){

    }
    
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  









// const mergeSortResult = mergeSort(arrUNsorted);

// console.log(mergeSortResult);

const arrNotSorted = [4, 100, 1, 7, 0, 3, 3, 3];

const tree1 = new Tree(arrNotSorted);

const bst1 = tree1.buildTree(0, (tree1.sortedArray.length - 1));

const insert1 = tree1.insert(bst1, 6);

prettyPrint(insert1);

console.log(tree1.sortedArray);



