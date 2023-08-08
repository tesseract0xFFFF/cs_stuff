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

    delete(root, value){

        if(root === null){
            return root;
        }

        if(root.data > value){
            root.left = this.delete(root.left, value);
            return root;
        }

        if(root.data < value){
            root.right = this.delete(root.right, value);
            return root;
        }

        // deletion of node if one child exists.
        // it will delete the node and return the value of its child, that value will be assigned 
        // after the return, recursively.
        if(root.left === null){
            let temp = root.right;
            root = null;
            return temp;
        }
        else if(root.right === null){
            let temp = root.left;
            root = null;
            return temp;
        }
        // in case the root has two children:
        else {
            // stores current root and its right child.
            // then, it breaks left, and continues breaking left as long as succesorParent's
            // left child is not null.
            let nodeToDelete = root;

            // these values will change until the while condition is fullfiled.
            let successorParent = root;
            let successor = successorParent.right;

            while(successor.left != null){
                successorParent = successor;
                successor = successorParent.left;       
            }
            // if succesorParent's left child is null:
            // takes its right child and assigns it as its parent's left child.
            // copies successor's data to the node we want to 'delete'
            // deletes the successor and returns the root.

            if(successorParent != root){
                successorParent.left = successor.right;
            }
            // if the succesor's parent is root 
            // (in case there was no left branch after going first right), the right child is the succesor.
            // int that case, i will have to copy its value into the root and then replace it with its right branch.
            else{
                successorParent.right = successor.right;
            }
            
            nodeToDelete.data = successor.data;
            successor = null;
            return root;
        }




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

const arrNotSorted = [4, 100, 1, 7, 0, 3, 15, 13, 8, 22];

const tree1 = new Tree(arrNotSorted);

const bst1 = tree1.buildTree(0, (tree1.sortedArray.length - 1));

// const insert1 = tree1.insert(bst1, 6);

// not sure if working yet.
const delete1 = tree1.delete(bst1, 1);

prettyPrint(delete1);

console.log(tree1.sortedArray);



