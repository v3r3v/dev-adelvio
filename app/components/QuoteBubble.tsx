"use client";
import {useEffect,useId,useRef} from "react";
import {Icon} from "./Icon";
import {useLanguage} from "../i18n/LanguageProvider";
import {useSiteLinks} from "./siteLinks";

const rest="M50 9C67 4 85 16 89 34C94 52 87 68 74 77C62 88 43 98 26 83C10 70 5 51 12 33C18 17 34 14 50 9Z";
export function QuoteBubble({assetBase}:{assetBase:string}) {
  const {t}=useLanguage(),links=useSiteLinks(assetBase);
  const ref=useRef<HTMLAnchorElement>(null),target=useRef<HTMLSpanElement>(null),skin=useRef<SVGPathElement>(null);
  const gradient=useId();
  useEffect(()=>{
    const link=ref.current,node=target.current,path=skin.current;if(!link||!node||!path)return;
    const media=matchMedia("(prefers-reduced-motion: reduce)"),fine=matchMedia("(hover: hover) and (pointer: fine)");
    let x=0,y=0,tx=0,ty=0,flow=0,frame=0,previousTime=0,lastScroll=scrollY,lastScrollTime=performance.now();
    let bounds:DOMRect|null=null;
    const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
    const disabled=()=>media.matches||document.hidden;
    function contour(px:number,py:number,travel:number){
      const points=[39,36,40,43,38,42,37,41].map((radius,i)=>{const a=i*Math.PI/4-Math.PI/2,pull=(Math.cos(a)*px+Math.sin(a)*py)*3;return[50+Math.cos(a)*(radius+pull),50+Math.sin(a)*(radius+pull)+Math.cos(a*2)*travel*2];});
      let d=`M${points[0].join(" ")}`;
      for(let i=0;i<8;i++){const p0=points[(i+7)%8],p1=points[i],p2=points[(i+1)%8],p3=points[(i+2)%8];d+=`C${p1.map((v,j)=>v+(p2[j]-p0[j])/6).join(" ")} ${p2.map((v,j)=>v-(p3[j]-p1[j])/6).join(" ")} ${p2.join(" ")}`;}
      return d+"Z";
    }
    function draw(){
      node!.style.setProperty("--pull-x",`${x*3}px`);node!.style.setProperty("--pull-y",`${y*3+flow*2}px`);
      node!.style.setProperty("--icon-x",`${x*1.5}px`);node!.style.setProperty("--icon-y",`${y*1.5}px`);
      node!.style.setProperty("--tilt",`${x*7+flow*5}deg`);node!.style.setProperty("--stretch-x",String(1-Math.abs(flow)*.075));node!.style.setProperty("--stretch-y",String(1+Math.abs(flow)*.11));path!.setAttribute("d",contour(x,y,flow));
    }
    function reset(){cancelAnimationFrame(frame);frame=0;previousTime=0;x=y=tx=ty=flow=0;bounds=null;node!.removeAttribute("style");path!.setAttribute("d",disabled()?rest:contour(0,0,0));lastScroll=scrollY;lastScrollTime=performance.now();}
    function tick(time:number){frame=0;if(disabled())return reset();const dt=Math.min(previousTime?time-previousTime:16.7,40);previousTime=time;const ease=1-Math.exp(-dt/85);x+=(tx-x)*ease;y+=(ty-y)*ease;flow*=Math.exp(-dt/160);draw();if(Math.abs(x-tx)+Math.abs(y-ty)+Math.abs(flow)>.002)frame=requestAnimationFrame(tick);else{x=tx;y=ty;flow=0;draw();previousTime=0;}}
    const wake=()=>{if(!disabled()&&!frame)frame=requestAnimationFrame(tick);};
    const move=(event:PointerEvent)=>{if(!bounds||disabled()||event.pointerType==="touch")return;tx=clamp((event.clientX-bounds.left-bounds.width/2)/(bounds.width/2),-1,1);ty=clamp((event.clientY-bounds.top-bounds.height/2)/(bounds.height/2),-1,1);wake();};
    const enter=(event:PointerEvent)=>{if(!fine.matches||event.pointerType==="touch"||disabled())return;bounds=node.getBoundingClientRect();move(event);};
    const leave=()=>{tx=ty=0;bounds=null;wake();};
    const scroll=()=>{const now=performance.now(),delta=scrollY-lastScroll,elapsed=Math.max(16,now-lastScrollTime);lastScroll=scrollY;lastScrollTime=now;if(disabled())return;flow=clamp(flow+delta/elapsed*.18,-1,1);wake();};
    link.addEventListener("pointerenter",enter);link.addEventListener("pointermove",move);link.addEventListener("pointerleave",leave);link.addEventListener("pointercancel",leave);
    window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",reset);document.addEventListener("visibilitychange",reset);media.addEventListener("change",reset);fine.addEventListener("change",reset);reset();
    return()=>{cancelAnimationFrame(frame);link.removeEventListener("pointerenter",enter);link.removeEventListener("pointermove",move);link.removeEventListener("pointerleave",leave);link.removeEventListener("pointercancel",leave);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",reset);document.removeEventListener("visibilitychange",reset);media.removeEventListener("change",reset);fine.removeEventListener("change",reset);};
  },[]);
  return <a ref={ref} className="quote-bubble" data-design="gota" href={links.project} aria-label={t("Get a quote")}><span className="gota-label">{t("Quote")}</span><span className="gota-target" ref={target} aria-hidden="true"><svg className="gota-art" viewBox="0 0 100 100" width="64" height="64" fill="currentColor" aria-hidden="true" focusable="false"><defs><radialGradient id={gradient} cx="28%" cy="18%" r="86%"><stop offset="0" stopColor="#5c7eff"/><stop offset=".45" stopColor="#174bfa"/><stop offset="1" stopColor="#1239cd"/></radialGradient></defs><path ref={skin} fill={`url(#${gradient})`} d={rest}/><path d="M26 29Q34 19 46 19" fill="none" stroke="white" strokeOpacity=".48" strokeWidth="2" strokeLinecap="round"/></svg><Icon name="message" className="gota-message"/></span></a>;
}
