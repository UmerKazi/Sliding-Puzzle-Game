const EMPTY = 0; 
Array.prototype.swap = function(i,j){
  [this[i],this[j]] = [this[j],this[i]];
  return this;
}

export default class BoardLogic{
    constructor(data){
        const DEFAULT_SIZE=3;
        if(Array.isArray(data)){
          this.size=Math.ceil(Math.sqrt(data.length));
          this.board = [...data];
        }else{
          this.size=isNaN(data)?DEFAULT_SIZE:data;
          this.board= this.initBord(data);
        }
    }

    initBord(size){
     return Array.from({length:size*size},(_,b)=>b);
    }
    
    get matrix() {
      return this.board.reduce(
        (rows, key, index) => (index % this.size === 0 ? 
        rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);
    }
     
    move(i,j){
      let legalFriends = this.getLegalFriends(i,j);
      let b2c = ({i,j}) => this.size*j+i;
      let empty = null;
      if(legalFriends.some(box=>(this.board[b2c(empty=box)] === EMPTY))){
         this.board.swap(b2c(empty),b2c({i,j}));
         return true;
      }
      return false;
    }

    checkWin(){
      let last = this.board.length-1;
      return !!this.board.reduce((res,cur,i)=>res && (cur===(i+1) || i===last));
    }

    scramble(){
       const SCRAMBLE_FACTOR = this.board.length*10;
       let rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
       let emptyIdx = this.board.indexOf(EMPTY);
       let [i,j] = [emptyIdx%this.size,Math.floor(emptyIdx/this.size)];
       let b2c = ({i,j}) => this.size*j+i;

       for(let ind=0;ind<SCRAMBLE_FACTOR;++ind){
         let legalFriends = this.getLegalFriends(i,j);
         let friend = legalFriends[rand(0,legalFriends.length)];
         this.board.swap(b2c(friend),b2c({i,j}));
         ({i,j} = friend);
       }
       return this.matrix;
    }

    getLegalFriends(i,j){
      let friends = [{ i: i + 1, j }, { i: i - 1, j }, 
                     { i, j: j + 1 }, { i, j: j - 1 }];
      let isLegal = ({ i, j }) => (i < this.size && i >= 0 && 
                                   j < this.size && j >= 0);
      return friends.filter(isLegal);
    }

}
  
