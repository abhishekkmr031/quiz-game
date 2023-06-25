import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Howl } from 'howler';

declare const Winwheel: any;

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    { 'fillStyle': '#eae56f', 'text': 'Prize One' },
    { 'fillStyle': '#89f26e', 'text': 'Prize Two' },
    { 'fillStyle': '#7de6ef', 'text': 'Prize Three' },
    { 'fillStyle': '#e7706f', 'text': 'Prize Four' }
  ];

  AddWheelSegment(){
    console.log(this.color);
    this.wheelsegments.push({'fillStyle':this.color, 'text':this.newName});
    this.addSegment(this.newName, this.color);
  }
  idToLandOn: any;

  //@Input() item
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

  segments: number = 4;

  constructor(private cdr: ChangeDetectorRef) { }

  theWheel: any;
  ngOnInit(): void {

    this.theWheel = new Winwheel({

      'canvasId': 'myCanvas',
      'numSegments': this.segments,
      'fillStyle': '#e7706f',
      'lineWidth': 3,
      'textAlignment': 'outer',
      'textMargin': 15, // Specify text margin as a number.
      'textOrientation': 'horizontal',    // Set orientation. horizontal, vertical, curved.
      'textFontFamily': 'Courier',     // Monospace font best for vertical and curved.
      'textFontSize': 15,
      'segments':
        [
          { 'fillStyle': '#eae56f', 'text': 'Prize One' },
          { 'fillStyle': '#89f26e', 'text': 'Prize Two' },
          { 'fillStyle': '#7de6ef', 'text': 'Prize Three' },
          { 'fillStyle': '#e7706f', 'text': 'Prize Four' }
        ],

      'animation':                   // Note animation properties passed in constructor parameters.
      {
        'type': 'spinToStop',  // Type of animation.
        'duration': 5,             // How long the animation is to take in seconds.
        'spins': 8              // The number of complete 360 degree rotations the wheel is to do.
      }
    });

    this.assignNames(this.names);
  }


  highlight(n: number) {
    this.theWheel.segments[3].textFillStyle="blue";
    this.theWheel.segments[3].textStrokeStyle = "blue";
    this.theWheel.segments[3].strokeStyle = "blue";
    //this.deleteSegment(3);
    // this.addSegment(this.theWheel.segments[3]);
  }


  addSegment(name:string, color:string) {
    // Use a date object to set the text of each added segment to the current minutes:seconds
    // (just to give each new segment a different label).
    let date = new Date();

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
    this.cdr.detectChanges();
  }

  reset() {
    this.wheel.reset();
  }

  spin() {

    this.theWheel.startAnimation();

    this.highlight(4);

    // this.removeName(this.idToLandOn);
    // this.reset();
    // this.idToLandOn = Math.floor(Math.random() * this.names.length);
    // this.wheel.spin();
    // this.randomQuestion = '';
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
  editName(id: any) {
    this.newName = this.names[id];
    this.names.splice(id, 1)[0];
    this.assignNames(this.names);
  }

  deleteName(id: any) {
    this.names.splice(id++, 1)[0];
    this.assignNames(this.names);
    this.reset();
    this.idToLandOn = Math.floor(Math.random() * this.names.length);
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
