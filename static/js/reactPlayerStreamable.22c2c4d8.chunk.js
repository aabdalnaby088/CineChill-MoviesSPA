(self.webpackChunkentertainment_web_proj=self.webpackChunkentertainment_web_proj||[]).push([[627],{5912:(e,t,r)=>{var s,a=Object.create,o=Object.defineProperty,l=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,i=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,u=(e,t,r,s)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let a of n(t))p.call(e,a)||a===r||o(e,a,{get:()=>t[a],enumerable:!(s=l(t,a))||s.enumerable});return e},h=(e,t,r)=>(((e,t,r)=>{t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!==typeof t?t+"":t,r),r),c={};((e,t)=>{for(var r in t)o(e,r,{get:t[r],enumerable:!0})})(c,{default:()=>f}),e.exports=(s=c,u(o({},"__esModule",{value:!0}),s));var d=((e,t,r)=>(r=null!=e?a(i(e)):{},u(!t&&e&&e.__esModule?r:o(r,"default",{value:e,enumerable:!0}),e)))(r(5043)),y=r(2206),m=r(1520);class f extends d.Component{constructor(){super(...arguments),h(this,"callPlayer",y.callPlayer),h(this,"duration",null),h(this,"currentTime",null),h(this,"secondsLoaded",null),h(this,"mute",(()=>{this.callPlayer("mute")})),h(this,"unmute",(()=>{this.callPlayer("unmute")})),h(this,"ref",(e=>{this.iframe=e}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e){(0,y.getSDK)("https://cdn.embed.ly/player-0.1.0.min.js","playerjs").then((e=>{this.iframe&&(this.player=new e.Player(this.iframe),this.player.setLoop(this.props.loop),this.player.on("ready",this.props.onReady),this.player.on("play",this.props.onPlay),this.player.on("pause",this.props.onPause),this.player.on("seeked",this.props.onSeek),this.player.on("ended",this.props.onEnded),this.player.on("error",this.props.onError),this.player.on("timeupdate",(e=>{let{duration:t,seconds:r}=e;this.duration=t,this.currentTime=r})),this.player.on("buffered",(e=>{let{percent:t}=e;this.duration&&(this.secondsLoaded=this.duration*t)})),this.props.muted&&this.player.mute())}),this.props.onError)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){}seekTo(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.callPlayer("setCurrentTime",e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",100*e)}setLoop(e){this.callPlayer("setLoop",e)}getDuration(){return this.duration}getCurrentTime(){return this.currentTime}getSecondsLoaded(){return this.secondsLoaded}render(){const e=this.props.url.match(m.MATCH_URL_STREAMABLE)[1];return d.default.createElement("iframe",{ref:this.ref,src:"https://streamable.com/o/".concat(e),frameBorder:"0",scrolling:"no",style:{width:"100%",height:"100%"},allow:"encrypted-media; autoplay; fullscreen;"})}}h(f,"displayName","Streamable"),h(f,"canPlay",m.canPlay.streamable)}}]);
//# sourceMappingURL=reactPlayerStreamable.22c2c4d8.chunk.js.map