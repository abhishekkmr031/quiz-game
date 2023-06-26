import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Howl } from 'howler';

declare const Winwheel: any;

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel!: NgxWheelComponent;
  @ViewChild('container') container!: ElementRef;


  calcHeight: number = 500;
  names = [
    'Ro Sieben',
    'Nathan',
    'Danny',
    'Bert',
    'Kaushik',
    'Bharatgouda',
    'Akshay',
    'Eduard',
    'Eric',
    'Palvi',
    'Eldin',
    'Lex',
    'Kenneth',
  ];
  colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'brown',
    'maroon',
    'navy',
    'teal',
    'olive',
    'gold',
    'silver',
    'bronze',
    'plum',
    'peach',
    'magenta',
    'violet',
    'indigo',
    'turquoise',
    'coral',
    'lavender',
    'sky blue',
    'rose',
    'beige',
    'mustard',
    'cream',
    'khaki',
    'wine',
    'lavender',
    'sky blue',
    'rose',
    'beige',
    'mustard',
    'cream',
    'khaki',
    'wine',
  ];

  wheelsegments = [
    { 'fillStyle': '#eae56f', 'text': 'Ro Sieben' },
    { 'fillStyle': '#89f26e', 'text': 'Nathan' },
    { 'fillStyle': '#7de6ef', 'text': 'Danny' },
    { 'fillStyle': '#e7706f', 'text': 'Bert' },
    { 'fillStyle': '#ffd700', 'text': 'Kaushik' },
    { 'fillStyle': '#ffa500', 'text': 'Bharatgouda' },
    { 'fillStyle': '#857100', 'text': 'Akshay' },
    { 'fillStyle': '#c54dda', 'text': 'Palvi' },
    { 'fillStyle': '#adff2f', 'text': 'Eldin' }
  ];

  
  idToLandOn: any;

  @Input() wheelItems: any[] = [];
  sound = new Howl({
    src: [
      'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    ],
  });

  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.INNER;
  randomQuestion!: string;
  selectedName = 'Player';
  selectedNames: string[] = [];
  isCollapsibleOpen = false;
  newName!: string;
  color!:string;
  nameIndex = -1;
  winner:number = -1;

  segments: number = this.wheelsegments.length;

  constructor() { }

  theWheel: any;
  ngOnInit(): void {

    this.theWheel = new Winwheel({

      'canvasId': 'myCanvas',
      'numSegments': this.segments,
      'fillStyle': '#e7706f',
      'lineWidth': 1,
      'textAlignment': 'outer',
      'textMargin': 15, // Specify text margin as a number.
      'textOrientation': 'curved',    // Set orientation. horizontal, vertical, curved.
      'textFontFamily': 'Courier',     // Monospace font best for vertical and curved.
      'textFontSize': 15,
      'segments':this.wheelsegments,

      'animation':                   // Note animation properties passed in constructor parameters.
      {
        'type': 'spinToStop',  // Type of animation.
        'duration': 5,             // How long the animation is to take in seconds.
        'spins': 5                // The number of complete 360 degree rotations the wheel is to do.
      }
    });

   // this.assignNames(this.names);
  }

  AddWheelSegment(){
    if(this.nameIndex > -1){
      console.log(this.nameIndex);
      this.deleteSegment(this.nameIndex+1);

      this.wheelsegments[this.nameIndex] = {'fillStyle':this.color, 'text':this.newName};
      this.addSegment(this.newName, this.color);

      this.nameIndex = -1; 
    }
    else{
      this.wheelsegments.push({'fillStyle':this.color, 'text':this.newName});
      this.addSegment(this.newName, this.color);
    }    
  }

  addSegment(name:string, color:string) {
    // The Second parameter in the call to addSegment specifies the position,
    // in this case 1 meaning the new segment goes at the start of the wheel.
    this.theWheel.addSegment({
      'text': name,
      'fillStyle': color
    }, 1);

    // The draw method of the wheel object must be called in order for the changes
    // to be rendered.
    this.theWheel.draw();
  }

  deleteSegment(num:number) {
    // Call function to remove a segment from the wheel, by default the last one will be
    // removed; you can pass in the number of the segment to delete if desired.
    this.theWheel.deleteSegment(num);

    // The draw method of the wheel object must be called to render the changes.
    this.theWheel.draw();
  }

  editName(id: any) {
    this.newName = this.theWheel.segments[id+1].text;
    this.color = this.theWheel.segments[id+1].fillStyle;
    this.nameIndex = id;
  }

  deleteName(id: any) {
    this.deleteSegment(id);
    this.wheelsegments.splice(id, 1);
  }

  spin() {

    this.resetWheel();
    if(this.winner>-1) this.unhighlight(this.winner+1)
    this.theWheel.startAnimation();

    this.winner = Math.floor(Math.random() * this.wheelsegments.length);
    setTimeout(()=>{this.highlight(this.winner+1)},3500);
    
  }

  highlight(n: number) {
    this.selectedName = this.wheelsegments[n-1].text;
    console.log("highlight "+ n);
    this.theWheel.segments[n].text=this.wheelsegments[n-1].text + "\n**";
     this.theWheel.segments[n].textFillStyle="white";
    // this.theWheel.segments[n].textStrokeStyle = "red";
    // this.theWheel.segments[n].strokeStyle = "red";
    this.theWheel.segments[n].fillStyle = "black";
    //this.theWheel.segments[n].textFontSize = 25;
    this.theWheel.segments[n].lineWidth = 1;
    // this.addSegment(this.theWheel.segments[n-1].text, this.theWheel.segments[n-1].fillStyle)    
  }

  unhighlight(n:number){
    console.log("unhighlight "+ n);
    console.log(this.wheelsegments[n-1].text);
    this.theWheel.segments[n].text=this.wheelsegments[n-1].text;
    this.theWheel.segments[n].textFillStyle="black";
    // this.theWheel.segments[n].textStrokeStyle = "";
    // this.theWheel.segments[n].strokeStyle = "";
    this.theWheel.segments[n].fillStyle = this.wheelsegments[n-1].fillStyle;
    //this.theWheel.segments[n].textFontSize = 15;
    this.theWheel.segments[n].lineWidth = 1;    
  }

  resetWheel()
        {
            this.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
            this.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
            this.theWheel.draw();                // Call draw to render changes to the wheel.

            //this.theWheel.ctx.clearRect(0, 0, this.theWheel.canvas.width, this.theWheel.ctx.canvas.height);

            //this.theWheel.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
        }

  removeName(idToLandOn: any) {
    const removedName = this.names.splice(idToLandOn, 1)[0];
    this.wheelItems = this.names.map((value, index) => ({
      fillStyle: this.colors[index % this.colors.length],
      text: value,
      id: index,
      textFillStyle: 'black',
      textFontSize: '22',
    }));
    this.selectedNames.push(removedName);
    this.selectedName = removedName;
  }

  toggleCollapsible() {
    this.isCollapsibleOpen = !this.isCollapsibleOpen;
  }

  getRandomQuestion() {
    const questions = [
      'How would you like to work often? - Bed, Chair-table, Couch',
      'How many cups of coffee, tea, or beverage-of-choice do you have each morning?',
      'What`s your favorite way to spend a day off?',
      'What`s one thing you can`t say at work that you wish you could?',
      'How would you spend your days if you had unlimited time and resources?',
      'What was your dream profession growing up?',
      'Sell any one of the following: ',
      'What`s the craziest thing you have ever done?',
      'If you were forced to sing karaoke, what song would you choose and why?',
      'You`re going to sail around the world. What`s the name of your boat?',
      'If I handed you a plane ticket right now to anywhere in the world, where would you go?',
      'If you could choose your age forever, what age would you choose and why?',
      'If you had 25 hours each day, how would you use your extra hour?',
      'If you could be the world`s best athlete in any sport, which one would it be any why?',
      'If you could go back in time and pay more attention in one class, what would it be?',
      'Are you team Android or team Apple and Why?',
      'Would you rather be in a zombie apocalypse or a robot apocalypse?',
      'If you could instantly learn a new talent, what would it be?',
      'Why do people say “slept like a baby” when babies wake up all the time in the middle of the night?',
      'Does the person flying in the middle seat get both armrests?',
      'Match the following images to their names food names and images',
      'What are u better at Writing a buggy code Or Crashing a prod env',
      'sell any one of the following',
      'What will you steel from the following and why? unwashed spoon, used jean, half eaten banana, used toothbrush',
    ];

    const randomIndex = Math.floor(Math.random() * questions.length);
    this.randomQuestion = questions[randomIndex];
  }

  before() {
    this.sound.play();
  }
  after() {
    this.sound.unload();
    this.getRandomQuestion();
  }
  
  ngOnChanges() {
    this.assignNames(this.names);
  }

  assignNames(array1: string[]) {
    this.idToLandOn = Math.floor(Math.random() * this.names.length);
    this.wheelItems = array1.map((value, index) => ({
      fillStyle: this.colors[index % this.colors.length],
      text: value,
      id: index,
      textFillStyle: 'black',
      textFontSize: '22',
    }));
  }

  reset() {
    this.wheel.reset();
  }
  
  addName(name: any) {
    //this.names.push(name);
    let name1: string[] = [...this.names]
    console.log(typeof (name1));
    name1.push(name);
    this.names = name1;
    let name2: string[] = [...name1];
    //name2 = name2.concat(this.names);
    this.reset();
    this.assignNames(name1);
    this.assignNames(name2);
    this.idToLandOn = Math.floor(Math.random() * this.names.length);
  }
}
