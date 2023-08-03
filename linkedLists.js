class linkedList {

    
    constructor (data){
        this.listSize = 1;
        this.trackingArray = [];
        this.firstNode = new node(data, null, 0);
        this.lastNode = this.firstNode;
        this.trackingArray.push(this.firstNode);
    }

    append(data){
        // creates a new node, sets current last node's 'next' property to new node 
        // and then sets new node itself as the last node.
        const newNode = new node(data, null);
        this.lastNode.next = newNode;
        this.lastNode = newNode;
        this.listSize += 1;
        this.trackingArray.push(newNode);
    }

    prepend(data){
        const newNode = new node(data, null);
        const tempArray = [];
        tempArray.push(newNode);
        newNode.next = this.firstNode;
        this.firstNode = newNode;
        //replacing the tracking array with a new, updated one. 
        const newUpdatedArray = tempArray.concat(this.trackingArray);
        this.trackingArray = newUpdatedArray;
        this.listSize += 1;
    }


    printList(node){
        if(node.next === null){
            console.log(node.data);
            return;
        }
        console.log(node.data);
        this.printList(node.next);
    }

    size(){
        return console.log(`There are ${this.trackingArray.length} items in the list`);
    }

    head(){
        return console.log(this.firstNode);
    }

    tail(){
        return console.log(this.lastNode);
    }

    atIndex(index){
        if (this.trackingArray[index] === undefined){
            return console.log('index does not exist');
        }
        console.log(this.trackingArray[index]);
    }

    pop(){
        // remove pointer to last node in list, 
        // pop last node and set the one before it as last node.
        const nodeBeforeLast = this.trackingArray[this.trackingArray.length - 2];
        nodeBeforeLast.next = null;
        this.lastNode = nodeBeforeLast;
        this.trackingArray.pop();
    }

    contains(data){
       const result = this.trackingArray.filter(node => node.data === data);
        if(result.length === 0){
            return console.log(false);
        }
       return console.log(true);
    }

    find(value){
      const valueIndex = this.trackingArray.findIndex(node => node.data === value);
      if(valueIndex === -1){
        return console.log(null);
      }
      return console.log(valueIndex);
    }

    toString(){
        const tempArr = [];

        for(let i = 0; i < this.trackingArray.length; i++){
            tempArr.push(this.trackingArray[i].data);
        }
        tempArr.push(' null');
        return console.log(tempArr.join(' --> '));
    }

    insertAt(value, index){
        const newNode = new node(value, null);
        this.trackingArray.splice(index, 0, newNode);
        // setting up new pointer values. obviously did not take care of a few edge cases here lol
        if(index === 0){
            this.trackingArray[index].next = this.trackingArray[index + 1];
            return console.log(this.trackingArray); 
        }
        if(index > this.trackingArray.length){
            return console.log('index out of bounds'); 
        }
        this.trackingArray[index].next = this.trackingArray[index + 1]; 
        this.trackingArray[index - 1].next = this.trackingArray[index];
        return console.log(this.trackingArray);
    }

    removeAt(index){
        // setting pointers.
        this.trackingArray[index - 1].next = this.trackingArray[index + 1];
        // remove from tracking array.
        this.trackingArray.splice(index, 1);
    }

    printArray(){
        return console.log(this.trackingArray);
    }


}


class node {

    constructor(data, next){
        this.data = data;
        this.next = next;
    }

}


const testList = new linkedList ('first item!');

// testList.append('second element!');
// testList.append('third element!');
// testList.append('fourth element!');
// testList.append('fifth element!');
// testList.prepend('new first element!');
// testList.prepend('new new first element!');

// testList.printList(testList.firstNode);


// testList.find('second element!');

// testList.contains('fourth element!');

// testList.toString();

// // testList.insertAt('hi there!', 1);
// testList.toString();

// testList.removeAt(4);

// testList.size();
// // testList.pop();

// testList.printList(testList.firstNode);
// testList.printArray();
// testList.size();
// testList.head();
// testList.tail();

// testList.atIndex(0);
// testList.atIndex(5);