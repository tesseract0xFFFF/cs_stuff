import {mergeSort, merge} from "./mergeSort.js";

function printSomething(a){
    console.log(a);
}


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
        // the levelOrder queue.    
       this.queue = [];
        // levelOrder will return an array in case a 2nd argument is not provided.
       this.levelOrderNoFunction = [];
       this.array = array;
       this.noDuplicates = [...new Set(this.array)];
       this.sortedArray = mergeSort(this.noDuplicates);
       this.inorderArray = [];
       this.preOrderArray = [];
       this.postOrderrArray = [];
       this.heightValue = -1;
       this.depthValue = -1;
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
            // (treats it as a single child case).
            // copies successor's data to the node we want to 'delete'
            // deletes the successor and returns the root.

            if(successorParent != root){
                successorParent.left = successor.right;
            }
            // if the succesor's parent is root 
            // (in case there was no left branch after going first right), the right child is the succesor.
            // in that case, i will have to copy its value into the root and then replace it with its right branch.
            else{
                successorParent.right = successor.right;
            }
            
            nodeToDelete.data = successor.data;
            successor = null;
            return root;
        }




    }

    find(root, value){

        if(root === null){
            console.log(`value "${value}" not found!`);
            return root; 
        }

        if(root.data > value){
            root.left = this.find(root.left, value);
            return root;
        }

        if(root.data < value){
            root.right = this.find(root.right, value);
            return root;
        }

        if (root.data === value){
            console.log(root);
            return root;
        }
    }

    levelOrder(node, f){
        if(node === null){
            return;
        }

        if (arguments[1] === undefined){
            this.levelOrderNoFunction.push(node.data); 
        }

        else{
        f(node.data);
        }

        if(node.left !== null){
            this.queue.push(node.left);
        }

        if(node.right !== null){
            this.queue.push(node.right);
        }

        if(this.queue.length !== 0){
            this.levelOrder(this.queue.shift(), f);
        }

        return this.levelOrderNoFunction;
    }

    inOrder(node){

        if (node === null){
            return;
        }
        this.inOrder(node.left);
        this.inorderArray.push(node.data);
        this.inOrder(node.right);
    }

    preOrder(node){

        if (node === null){
            return;
        }
        this.preOrderArray.push(node.data);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    
    postOrder(node){

        if (node === null){
            return;
        }
        this.postOrder(node.left);
        this.postOrder(node.right);
        this.postOrderrArray.push(node.data);
    }


    height(node, value){

        if(node === null){
            return -1;
        }

        const heightL = this.height(node.left, value); 
        const heightR = this.height(node.right, value);

        // current subtree height.
        const largerValue = Math.max(heightL, heightR) + 1;
        
        if(node.data === value){
            this.heightValue = largerValue;
            console.log(`Node height:${this.heightValue}`);
            return largerValue; 
        }

        return largerValue
    }
    
    depth(node, value){

        if (node === null){
            return;
        }

        if (node.data > value){
            this.depthValue += 1;
            this.depth(node.left, value);
        }

        if(node.data < value){
            this.depthValue += 1;
            this.depth(node.right, value);
        }

        if(node.data === value){
            this.depthValue += 1;
            console.log(`Node depth: ${this.depthValue}`);
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
  

  const arrNotSorted = [4, 100, 1, 7, 0, 3, 15, 13, 8, 22];

  const tree1 = new Tree(arrNotSorted);
  
  const bst1 = tree1.buildTree(0, (tree1.sortedArray.length - 1));

//   tree1.postOrder(bst1);

tree1.depth(bst1, 3);
tree1.height(bst1, 7);
console.log()
//   console.log(tree1.postOrderrArray);
  prettyPrint(bst1);
  
//   const lvl1 = tree1.levelOrder(bst1);

//   console.log(lvl1);
  
//   tree1.find(bst1, 15);

//   const insert1 = tree1.insert(bst1, 16);
  
//   const delete1 = tree1.delete(bst1, 1);
  

  
//   console.log(tree1.sortedArray);

















// const mergeSortResult = mergeSort(arrUNsorted);

// console.log(mergeSortResult);

// const arrNotSorted = [4, 100, 1, 7, 0, 3, 15, 13, 8, 22];

// const tree1 = new Tree(arrNotSorted);

// const bst1 = tree1.buildTree(0, (tree1.sortedArray.length - 1));

// tree1.find(bst1, 22);

// console.log(bst1);
// // const insert1 = tree1.insert(bst1, 6);

// // not sure if working yet.
// // const delete1 = tree1.delete(bst1, 1);

// prettyPrint(bst1);

// // console.log(tree1.sortedArray);



