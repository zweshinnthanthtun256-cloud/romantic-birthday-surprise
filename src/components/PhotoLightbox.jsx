import {forwardRef,useEffect,useImperativeHandle,useRef,useState} from 'react';
import {X,ChevronLeft,ChevronRight} from 'lucide-react';
import {Photo} from './Shared';
const PhotoLightbox=forwardRef(function PhotoLightbox({photos,label='Photo memories'},ref){
 const [index,setIndex]=useState(null);const dialog=useRef(null),trigger=useRef(null),touch=useRef(null);
 useImperativeHandle(ref,()=>({open(i,element){if(i<0||i>=photos.length)return;trigger.current=element;setIndex(i);}}),[photos.length]);
 useEffect(()=>{if(index===null)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';if(!dialog.current.open)dialog.current.showModal();return()=>{document.body.style.overflow=previous;};},[index]);
 function close(){dialog.current?.close();setIndex(null);trigger.current?.focus({preventScroll:true});}
 function move(step){setIndex(i=>i===null?null:(i+step+photos.length)%photos.length);}
 function endTouch(e){if(!touch.current)return;const end=e.changedTouches[0];const dx=end.clientX-touch.current.x,dy=end.clientY-touch.current.y;if(Math.abs(dx)>55&&Math.abs(dy)<75)move(dx<0?1:-1);touch.current=null;}
 const photo=index===null?null:photos[index];
 return <dialog ref={dialog} className="lightbox beach-lightbox" aria-label={label} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===dialog.current)close();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}}}>
 {photo&&<div className="lightbox-inner"><button className="icon-button lightbox-close" onClick={close} aria-label="Close photo"><X/></button><div className="lightbox-photo-frame" onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}} onTouchEnd={endTouch}><Photo src={photo.image} alt={photo.alt||photo.caption}/></div><div className="lightbox-bottom"><button className="icon-button" onClick={()=>move(-1)} aria-label="Previous photo"><ChevronLeft/></button><div aria-live="polite"><h3>{photo.caption}</h3><p>{index+1} / {photos.length} · Ngwe Saung, with you</p></div><button className="icon-button" onClick={()=>move(1)} aria-label="Next photo"><ChevronRight/></button></div><p className="lightbox-hint">Swipe or use the arrows to stay a little longer.</p></div>}
 </dialog>;
});
export default PhotoLightbox;
