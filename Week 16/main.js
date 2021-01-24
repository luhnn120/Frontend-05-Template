import { createElement} from './framework.js';
import { Carousel } from './Carousel.js';
import { Button } from './Button.js';
import { List } from './List.js';

let d = [
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    title: '蓝猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    titile: '橘猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    titile: '狸花猫'
  },
  {
    url: 'https://time.geekbang.org/',
    img: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    titile: '橘猫加白'
  },
]
let dom = <Carousel src={d} 
  onChange={evnet => { console.log(evnet.detail.position)}} 
  onClick={ event => { window.open(event.detail.url)}}
/>

let btn = <Button >
  content
</Button>

let list = <List data = {d}>
{ (record) => <div>
    <img src={record.img}></img>
    <a href={record.url}>{record.titile}</a>
  </div>
}
</List>

dom.mountTo(document.body)
btn.mountTo(document.body)