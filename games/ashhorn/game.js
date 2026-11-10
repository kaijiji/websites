(()=>{var um=Object.create;var Ol=Object.defineProperty;var dm=Object.getOwnPropertyDescriptor;var fm=Object.getOwnPropertyNames;var pm=Object.getPrototypeOf,mm=Object.prototype.hasOwnProperty;var gm=n=>{throw TypeError(n)};var _m=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Va=(n,t)=>{for(var e in t)Ol(n,e,{get:t[e],enumerable:!0})},xm=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of fm(t))!mm.call(n,s)&&s!==e&&Ol(n,s,{get:()=>t[s],enumerable:!(i=dm(t,s))||i.enumerable});return n};var bd=(n,t,e)=>(e=n!=null?um(pm(n)):{},xm(t||!n||!n.__esModule?Ol(e,"default",{value:n,enumerable:!0}):e,n));var fr=(n,t,e)=>t.has(n)?gm("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e);var Yu=_m((z1,qu)=>{"use strict";var st={};st.generateIdentifier=function(){return Math.random().toString(36).substring(2,12)};st.localCName=st.generateIdentifier();st.splitLines=function(n){return n.trim().split(`
`).map(t=>t.trim())};st.splitSections=function(n){return n.split(`
m=`).map((e,i)=>(i>0?"m="+e:e).trim()+`\r
`)};st.getDescription=function(n){let t=st.splitSections(n);return t&&t[0]};st.getMediaSections=function(n){let t=st.splitSections(n);return t.shift(),t};st.matchPrefix=function(n,t){return st.splitLines(n).filter(e=>e.indexOf(t)===0)};st.parseCandidate=function(n){let t;n.indexOf("a=candidate:")===0?t=n.substring(12).split(" "):t=n.substring(10).split(" ");let e={foundation:t[0],component:{1:"rtp",2:"rtcp"}[t[1]]||t[1],protocol:t[2].toLowerCase(),priority:parseInt(t[3],10),ip:t[4],address:t[4],port:parseInt(t[5],10),type:t[7]};for(let i=8;i<t.length;i+=2)switch(t[i]){case"raddr":e.relatedAddress=t[i+1];break;case"rport":e.relatedPort=parseInt(t[i+1],10);break;case"tcptype":e.tcpType=t[i+1];break;case"ufrag":e.ufrag=t[i+1],e.usernameFragment=t[i+1];break;default:e[t[i]]===void 0&&(e[t[i]]=t[i+1]);break}return e};st.writeCandidate=function(n){let t=[];t.push(n.foundation);let e=n.component;e==="rtp"?t.push(1):e==="rtcp"?t.push(2):t.push(e),t.push(n.protocol.toUpperCase()),t.push(n.priority),t.push(n.address||n.ip),t.push(n.port);let i=n.type;return t.push("typ"),t.push(i),i!=="host"&&n.relatedAddress&&n.relatedPort!==void 0&&(t.push("raddr"),t.push(n.relatedAddress),t.push("rport"),t.push(n.relatedPort)),n.tcpType&&n.protocol.toLowerCase()==="tcp"&&(t.push("tcptype"),t.push(n.tcpType)),(n.usernameFragment||n.ufrag)&&(t.push("ufrag"),t.push(n.usernameFragment||n.ufrag)),"candidate:"+t.join(" ")};st.parseIceOptions=function(n){return n.substring(14).split(" ")};st.parseRtpMap=function(n){let t=n.substring(9).split(" "),e={payloadType:parseInt(t.shift(),10)};return t=t[0].split("/"),e.name=t[0],e.clockRate=parseInt(t[1],10),e.channels=t.length===3?parseInt(t[2],10):1,e.numChannels=e.channels,e};st.writeRtpMap=function(n){let t=n.payloadType;n.preferredPayloadType!==void 0&&(t=n.preferredPayloadType);let e=n.channels||n.numChannels||1;return"a=rtpmap:"+t+" "+n.name+"/"+n.clockRate+(e!==1?"/"+e:"")+`\r
`};st.parseExtmap=function(n){let t=n.substring(9).split(" ");return{id:parseInt(t[0],10),direction:t[0].indexOf("/")>0?t[0].split("/")[1]:"sendrecv",uri:t[1],attributes:t.slice(2).join(" ")}};st.writeExtmap=function(n){return"a=extmap:"+(n.id||n.preferredId)+(n.direction&&n.direction!=="sendrecv"?"/"+n.direction:"")+" "+n.uri+(n.attributes?" "+n.attributes:"")+`\r
`};st.parseFmtp=function(n){let t={},e=n.substring(n.indexOf(" ")+1).split(";");for(let i=0;i<e.length;i++){let[s,...r]=e[i].trim().split("=");t[s.trim()]=r.length?r.join("="):void 0}return t};st.writeFmtp=function(n){let t="",e=n.payloadType;if(n.preferredPayloadType!==void 0&&(e=n.preferredPayloadType),n.parameters&&Object.keys(n.parameters).length){let i=[];Object.keys(n.parameters).forEach(s=>{n.parameters[s]!==void 0?i.push(s+"="+n.parameters[s]):i.push(s)}),t+="a=fmtp:"+e+" "+i.join(";")+`\r
`}return t};st.parseRtcpFb=function(n){let t=n.substring(n.indexOf(" ")+1).split(" ");return{type:t.shift(),parameter:t.join(" ")}};st.writeRtcpFb=function(n){let t="",e=n.payloadType;return n.preferredPayloadType!==void 0&&(e=n.preferredPayloadType),n.rtcpFeedback&&n.rtcpFeedback.length&&n.rtcpFeedback.forEach(i=>{t+="a=rtcp-fb:"+e+" "+i.type+(i.parameter&&i.parameter.length?" "+i.parameter:"")+`\r
`}),t};st.parseSsrcMedia=function(n){let t=n.indexOf(" "),e={ssrc:parseInt(n.substring(7,t),10)},i=n.indexOf(":",t);return i>-1?(e.attribute=n.substring(t+1,i),e.value=n.substring(i+1)):e.attribute=n.substring(t+1),e};st.parseSsrcGroup=function(n){let t=n.substring(13).split(" ");return{semantics:t.shift(),ssrcs:t.map(e=>parseInt(e,10))}};st.getMid=function(n){let t=st.matchPrefix(n,"a=mid:")[0];if(t)return t.substring(6)};st.parseFingerprint=function(n){let t=n.substring(14).split(" ");return{algorithm:t[0].toLowerCase(),value:t[1].toUpperCase()}};st.getDtlsParameters=function(n,t){return{role:"auto",fingerprints:st.matchPrefix(n+t,"a=fingerprint:").map(st.parseFingerprint)}};st.writeDtlsParameters=function(n,t){let e="a=setup:"+t+`\r
`;return n.fingerprints.forEach(i=>{e+="a=fingerprint:"+i.algorithm+" "+i.value+`\r
`}),e};st.parseCryptoLine=function(n){let t=n.substring(9).split(" ");return{tag:parseInt(t[0],10),cryptoSuite:t[1],keyParams:t[2],sessionParams:t.slice(3)}};st.writeCryptoLine=function(n){return"a=crypto:"+n.tag+" "+n.cryptoSuite+" "+(typeof n.keyParams=="object"?st.writeCryptoKeyParams(n.keyParams):n.keyParams)+(n.sessionParams?" "+n.sessionParams.join(" "):"")+`\r
`};st.parseCryptoKeyParams=function(n){if(n.indexOf("inline:")!==0)return null;let t=n.substring(7).split("|");return{keyMethod:"inline",keySalt:t[0],lifeTime:t[1],mkiValue:t[2]?t[2].split(":")[0]:void 0,mkiLength:t[2]?t[2].split(":")[1]:void 0}};st.writeCryptoKeyParams=function(n){return n.keyMethod+":"+n.keySalt+(n.lifeTime?"|"+n.lifeTime:"")+(n.mkiValue&&n.mkiLength?"|"+n.mkiValue+":"+n.mkiLength:"")};st.getCryptoParameters=function(n,t){return st.matchPrefix(n+t,"a=crypto:").map(st.parseCryptoLine)};st.getIceParameters=function(n,t){let e=st.matchPrefix(n+t,"a=ice-ufrag:")[0],i=st.matchPrefix(n+t,"a=ice-pwd:")[0];return e&&i?{usernameFragment:e.substring(12),password:i.substring(10)}:null};st.writeIceParameters=function(n){let t="a=ice-ufrag:"+n.usernameFragment+`\r
a=ice-pwd:`+n.password+`\r
`;return n.iceLite&&(t+=`a=ice-lite\r
`),t};st.parseRtpParameters=function(n){let t={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},i=st.splitLines(n)[0].split(" ");t.profile=i[2];for(let r=3;r<i.length;r++){let a=i[r],o=st.matchPrefix(n,"a=rtpmap:"+a+" ")[0];if(o){let c=st.parseRtpMap(o),l=st.matchPrefix(n,"a=fmtp:"+a+" ");switch(c.parameters=l.length?st.parseFmtp(l[0]):{},c.rtcpFeedback=st.matchPrefix(n,"a=rtcp-fb:"+a+" ").map(st.parseRtcpFb),t.codecs.push(c),c.name.toUpperCase()){case"RED":case"ULPFEC":t.fecMechanisms.push(c.name.toUpperCase());break;default:break}}}st.matchPrefix(n,"a=extmap:").forEach(r=>{t.headerExtensions.push(st.parseExtmap(r))});let s=st.matchPrefix(n,"a=rtcp-fb:* ").map(st.parseRtcpFb);return t.codecs.forEach(r=>{s.forEach(a=>{r.rtcpFeedback.find(c=>c.type===a.type&&c.parameter===a.parameter)||r.rtcpFeedback.push(a)})}),t};st.writeRtpDescription=function(n,t){let e="";e+="m="+n+" ",e+=t.codecs.length>0?"9":"0",e+=" "+(t.profile||"UDP/TLS/RTP/SAVPF")+" ",e+=t.codecs.map(s=>s.preferredPayloadType!==void 0?s.preferredPayloadType:s.payloadType).join(" ")+`\r
`,e+=`c=IN IP4 0.0.0.0\r
`,e+=`a=rtcp:9 IN IP4 0.0.0.0\r
`,t.codecs.forEach(s=>{e+=st.writeRtpMap(s),e+=st.writeFmtp(s),e+=st.writeRtcpFb(s)});let i=0;return t.codecs.forEach(s=>{s.maxptime>i&&(i=s.maxptime)}),i>0&&(e+="a=maxptime:"+i+`\r
`),t.headerExtensions&&t.headerExtensions.forEach(s=>{e+=st.writeExtmap(s)}),e};st.parseRtpEncodingParameters=function(n){let t=[],e=st.parseRtpParameters(n),i=e.fecMechanisms.indexOf("RED")!==-1,s=e.fecMechanisms.indexOf("ULPFEC")!==-1,r=st.matchPrefix(n,"a=ssrc:").map(h=>st.parseSsrcMedia(h)).filter(h=>h.attribute==="cname"),a=r.length>0&&r[0].ssrc,o,c=st.matchPrefix(n,"a=ssrc-group:FID").map(h=>h.substring(17).split(" ").map(f=>parseInt(f,10)));c.length>0&&c[0].length>1&&c[0][0]===a&&(o=c[0][1]),e.codecs.forEach(h=>{if(h.name.toUpperCase()==="RTX"&&h.parameters.apt){let d={ssrc:a,codecPayloadType:parseInt(h.parameters.apt,10)};a&&o&&(d.rtx={ssrc:o}),t.push(d),i&&(d=JSON.parse(JSON.stringify(d)),d.fec={ssrc:a,mechanism:s?"red+ulpfec":"red"},t.push(d))}}),t.length===0&&a&&t.push({ssrc:a});let l=st.matchPrefix(n,"b=");return l.length&&(l[0].indexOf("b=TIAS:")===0?l=parseInt(l[0].substring(7),10):l[0].indexOf("b=AS:")===0?l=parseInt(l[0].substring(5),10)*1e3*.95-2e3*8:l=void 0,t.forEach(h=>{h.maxBitrate=l})),t};st.parseRtcpParameters=function(n){let t={},e=st.matchPrefix(n,"a=ssrc:").map(r=>st.parseSsrcMedia(r)).filter(r=>r.attribute==="cname")[0];e&&(t.cname=e.value,t.ssrc=e.ssrc);let i=st.matchPrefix(n,"a=rtcp-rsize");t.reducedSize=i.length>0,t.compound=i.length===0;let s=st.matchPrefix(n,"a=rtcp-mux");return t.mux=s.length>0,t};st.writeRtcpParameters=function(n){let t="";return n.reducedSize&&(t+=`a=rtcp-rsize\r
`),n.mux&&(t+=`a=rtcp-mux\r
`),n.ssrc!==void 0&&n.cname&&(t+="a=ssrc:"+n.ssrc+" cname:"+n.cname+`\r
`),t};st.parseMsid=function(n){let t,e=st.matchPrefix(n,"a=msid:");if(e.length===1)return t=e[0].substring(7).split(" "),{stream:t[0],track:t[1]};let i=st.matchPrefix(n,"a=ssrc:").map(s=>st.parseSsrcMedia(s)).filter(s=>s.attribute==="msid");if(i.length>0)return t=i[0].value.split(" "),{stream:t[0],track:t[1]}};st.parseSctpDescription=function(n){let t=st.parseMLine(n),e=st.matchPrefix(n,"a=max-message-size:"),i;e.length>0&&(i=parseInt(e[0].substring(19),10)),isNaN(i)&&(i=65536);let s=st.matchPrefix(n,"a=sctp-port:");if(s.length>0)return{port:parseInt(s[0].substring(12),10),protocol:t.fmt,maxMessageSize:i};let r=st.matchPrefix(n,"a=sctpmap:");if(r.length>0){let a=r[0].substring(10).split(" ");return{port:parseInt(a[0],10),protocol:a[1],maxMessageSize:i}}};st.writeSctpDescription=function(n,t){let e=[];return n.protocol!=="DTLS/SCTP"?e=["m="+n.kind+" 9 "+n.protocol+" "+t.protocol+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctp-port:"+t.port+`\r
`]:e=["m="+n.kind+" 9 "+n.protocol+" "+t.port+`\r
`,`c=IN IP4 0.0.0.0\r
`,"a=sctpmap:"+t.port+" "+t.protocol+` 65535\r
`],t.maxMessageSize!==void 0&&e.push("a=max-message-size:"+t.maxMessageSize+`\r
`),e.join("")};st.generateSessionId=function(){return Math.random().toString().substr(2,22)};st.writeSessionBoilerplate=function(n,t,e){let i,s=t!==void 0?t:2;return n?i=n:i=st.generateSessionId(),`v=0\r
o=`+(e||"thisisadapterortc")+" "+i+" "+s+` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`};st.getDirection=function(n,t){let e=st.splitLines(n);for(let i=0;i<e.length;i++)switch(e[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return e[i].substring(2);default:}return t?st.getDirection(t):"sendrecv"};st.getKind=function(n){return st.splitLines(n)[0].split(" ")[0].substring(2)};st.isRejected=function(n){return n.split(" ",2)[1]==="0"};st.parseMLine=function(n){let e=st.splitLines(n)[0].substring(2).split(" ");return{kind:e[0],port:parseInt(e[1],10),protocol:e[2],fmt:e.slice(3).join(" ")}};st.parseOLine=function(n){let e=st.matchPrefix(n,"o=")[0].substring(2).split(" ");return{username:e[0],sessionId:e[1],sessionVersion:parseInt(e[2],10),netType:e[3],addressType:e[4],address:e[5]}};st.isValidSDP=function(n){if(typeof n!="string"||n.length===0)return!1;let t=st.splitLines(n);for(let e=0;e<t.length;e++)if(t[e].length<2||t[e].charAt(1)!=="=")return!1;return!0};typeof qu=="object"&&(qu.exports=st)});var rf=0,bh=1,af=2;var os=1,of=2,Ks=3,kn=0,ai=1,qe=2,pn=0,js=1,ei=2,Th=3,Eh=4,cf=5;var cs=100,lf=101,hf=102,uf=103,df=104,ff=200,pf=201,mf=202,gf=203,wh=204,Ah=205,_f=206,xf=207,vf=208,yf=209,Sf=210,Mf=211,bf=212,Tf=213,Ef=214,yo=0,So=1,Mo=2,Fs=3,bo=4,To=5,Eo=6,wo=7,Ch=0,wf=1,Af=2,Zi=0,ta=1,ea=2,ia=3,ls=4,na=5,sa=6,ra=7;var Rh=300,hs=301,Qs=302,nc=303,sc=304,ks=1e3,Vi=1001,Ao=1002,Qe=1003,Cf=1004;var aa=1005;var xi=1006,rc=1007;var mn=1008;var bi=1009,Ph=1010,Ih=1011,tr=1012,ac=1013,Bi=1014,zi=1015,oi=1016,oc=1017,cc=1018,us=1020,Lh=35902,Dh=35899,Nh=1021,Uh=1022,Hi=1023,ln=1026,gn=1027,Fh=1028,lc=1029,On=1030,hc=1031;var uc=1033,oa=33776,ca=33777,la=33778,ha=33779,dc=35840,fc=35841,pc=35842,mc=35843,gc=36196,_c=37492,xc=37496,vc=37488,yc=37489,ua=37490,Sc=37491,Mc=37808,bc=37809,Tc=37810,Ec=37811,wc=37812,Ac=37813,Cc=37814,Rc=37815,Pc=37816,Ic=37817,Lc=37818,Dc=37819,Nc=37820,Uc=37821,Fc=36492,kc=36494,Oc=36495,Bc=36283,zc=36284,da=36285,Hc=36286;var Er=2300,Co=2301,xo=2302,uh=2303,dh=2400,fh=2401,ph=2402;var Rf=3200;var Gc=0,Pf=1,_n="",Ve="srgb",wr="srgb-linear",Ar="linear",me="srgb";var vo=7680;var If=519,Lf=512,Df=513,Nf=514,kh=515,Uf=516,Ff=517,Oh=518,Bh=519,zh=35044;var Hh="300 es",Ii=2e3,Os=2001;function vm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ym(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Cr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kf(){let n=Cr("canvas");return n.style.display="block",n}var Td={},Bs=null;function Rr(...n){let t="THREE."+n.shift();Bs?Bs("log",t,...n):console.log(t,...n)}function Of(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Gt(...n){n=Of(n);let t="THREE."+n.shift();if(Bs)Bs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Vt(...n){n=Of(n);let t="THREE."+n.shift();if(Bs)Bs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Mr(...n){let t=n.join(" ");t in Td||(Td[t]=!0,Gt(...n))}function Bf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var zf={[yo]:yo,[Mo]:Eo,[bo]:bo,[Fs]:To,[So]:So,[Eo]:Mo,[wo]:wo,[To]:Fs},Wi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},hi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Bl=Math.PI/180,Ro=180/Math.PI;function Bn(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(hi[n&255]+hi[n>>8&255]+hi[n>>16&255]+hi[n>>24&255]+"-"+hi[t&255]+hi[t>>8&255]+"-"+hi[t>>16&15|64]+hi[t>>24&255]+"-"+hi[e&63|128]+hi[e>>8&255]+"-"+hi[e>>16&255]+hi[e>>24&255]+hi[i&255]+hi[i>>8&255]+hi[i>>16&255]+hi[i>>24&255]).toLowerCase()}function ae(n,t,e){return Math.max(t,Math.min(e,n))}function Sm(n,t){return(n%t+t)%t}function zl(n,t,e){return(1-e)*n+e*t}function Hf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Vc(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Gf(n,t){if(t.constructor===Float32Array)return n;let e=Vc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function Vf(n,t){if(t.constructor===Float32Array)return n;let e=Vc(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var Yh=class Yh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Yh.prototype.isVector2=!0;var et=Yh,Xi=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],f=r[a+0],u=r[a+1],p=r[a+2],x=r[a+3];if(d!==x||c!==f||l!==u||h!==p){let m=c*f+l*u+h*p+d*x;m<0&&(f=-f,u=-u,p=-p,x=-x,m=-m);let g=1-o;if(m<.9995){let v=Math.acos(m),M=Math.sin(v);g=Math.sin(g*v)/M,o=Math.sin(o*v)/M,c=c*g+f*o,l=l*g+u*o,h=h*g+p*o,d=d*g+x*o}else{c=c*g+f*o,l=l*g+u*o,h=h*g+p*o,d=d*g+x*o;let v=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=v,l*=v,h*=v,d*=v}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[a],f=r[a+1],u=r[a+2],p=r[a+3];return t[e]=o*p+h*d+c*u-l*f,t[e+1]=c*p+h*f+l*d-o*u,t[e+2]=l*p+h*u+o*f-c*d,t[e+3]=h*p-o*d-c*f-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(r/2),f=c(i/2),u=c(s/2),p=c(r/2);switch(a){case"XYZ":this._x=f*h*d+l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d-f*u*p;break;case"YXZ":this._x=f*h*d+l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d+f*u*p;break;case"ZXY":this._x=f*h*d-l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d-f*u*p;break;case"ZYX":this._x=f*h*d-l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d+f*u*p;break;case"YZX":this._x=f*h*d+l*u*p,this._y=l*u*d+f*h*p,this._z=l*h*p-f*u*d,this._w=l*h*d-f*u*p;break;case"XZY":this._x=f*h*d-l*u*p,this._y=l*u*d-f*h*p,this._z=l*h*p+f*u*d,this._w=l*h*d+f*u*p;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],f=i+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-c)*u,this._y=(r-l)*u,this._z=(a-s)*u}else if(i>o&&i>d){let u=2*Math.sqrt(1+i-o-d);this._w=(h-c)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+l)/u}else if(o>d){let u=2*Math.sqrt(1+o-i-d);this._w=(r-l)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(c+h)/u}else{let u=2*Math.sqrt(1+d-i-o);this._w=(a-s)/u,this._x=(r+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$h=class $h{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ed.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Hl.copy(this).projectOnVector(t),this.sub(Hl)}reflect(t){return this.sub(Hl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$h.prototype.isVector3=!0;var P=$h,Hl=new P,Ed=new Xi,Zh=class Zh{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],f=i[2],u=i[5],p=i[8],x=s[0],m=s[3],g=s[6],v=s[1],M=s[4],y=s[7],w=s[2],E=s[5],_=s[8];return r[0]=a*x+o*v+c*w,r[3]=a*m+o*M+c*E,r[6]=a*g+o*y+c*_,r[1]=l*x+h*v+d*w,r[4]=l*m+h*M+d*E,r[7]=l*g+h*y+d*_,r[2]=f*x+u*v+p*w,r[5]=f*m+u*M+p*E,r[8]=f*g+u*y+p*_,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,f=o*c-h*r,u=l*r-a*c,p=e*d+i*f+s*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/p;return t[0]=d*x,t[1]=(s*l-h*i)*x,t[2]=(o*i-s*a)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=u*x,t[7]=(i*c-l*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Mr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Gl.makeScale(t,e)),this}rotate(t){return Mr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Gl.makeRotation(-t)),this}translate(t,e){return Mr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Zh.prototype.isMatrix3=!0;var Yt=Zh,Gl=new Yt,wd=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ad=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mm(){let n={enabled:!0,workingColorSpace:wr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===me&&(s.r=cn(s.r),s.g=cn(s.g),s.b=cn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===me&&(s.r=Us(s.r),s.g=Us(s.g),s.b=Us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_n?Ar:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[wr]:{primaries:t,whitePoint:i,transfer:Ar,toXYZ:wd,fromXYZ:Ad,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:i,transfer:me,toXYZ:wd,fromXYZ:Ad,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),n}var ne=Mm();function cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Us(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var xs,Po=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{xs===void 0&&(xs=Cr("canvas")),xs.width=t.width,xs.height=t.height;let s=xs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=xs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Cr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=cn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(cn(e[i]/255)*255):e[i]=cn(e[i]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},bm=0,zs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Bn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Vl(s[a].image)):r.push(Vl(s[a]))}else r=Vl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Vl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Po.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var Tm=0,Wl=new P,vi=class n extends Wi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Vi,s=Vi,r=xi,a=mn,o=Hi,c=bi,l=n.DEFAULT_ANISOTROPY,h=_n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Bn(),this.name="",this.source=new zs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Wl).x}get height(){return this.source.getSize(Wl).y}get depth(){return this.source.getSize(Wl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ks:t.x=t.x-Math.floor(t.x);break;case Vi:t.x=t.x<0?0:1;break;case Ao:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ks:t.y=t.y-Math.floor(t.y);break;case Vi:t.y=t.y<0?0:1;break;case Ao:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};vi.DEFAULT_IMAGE=null;vi.DEFAULT_MAPPING=Rh;vi.DEFAULT_ANISOTROPY=1;var Jh=class Jh{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],f=c[1],u=c[5],p=c[9],x=c[2],m=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(p+m)<.1&&Math.abs(l+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(l+1)/2,y=(u+1)/2,w=(g+1)/2,E=(h+f)/4,_=(d+x)/4,S=(p+m)/4;return M>y&&M>w?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=E/i,r=_/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=E/s,r=S/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=_/r,s=S/r),this.set(i,s,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(d-x)/v,this.z=(f-h)/v,this.w=Math.acos((l+u+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Jh.prototype.isVector4=!0;var Re=Jh,Io=class extends Wi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new vi({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new zs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xe=class extends Io{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Pr=class extends vi{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Lo=class extends vi{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ic=class ic{constructor(t,e,i,s,r,a,o,c,l,h,d,f,u,p,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,h,d,f,u,p,x,m)}set(t,e,i,s,r,a,o,c,l,h,d,f,u,p,x,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=h,g[10]=d,g[14]=f,g[3]=u,g[7]=p,g[11]=x,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ic().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/vs.setFromMatrixColumn(t,0).length(),r=1/vs.setFromMatrixColumn(t,1).length(),a=1/vs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*h,u=a*d,p=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=u+p*l,e[5]=f-x*l,e[9]=-o*c,e[2]=x-f*l,e[6]=p+u*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,u=c*d,p=l*h,x=l*d;e[0]=f+x*o,e[4]=p*o-u,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=u*o-p,e[6]=x+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,u=c*d,p=l*h,x=l*d;e[0]=f-x*o,e[4]=-a*d,e[8]=p+u*o,e[1]=u+p*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,u=a*d,p=o*h,x=o*d;e[0]=c*h,e[4]=p*l-u,e[8]=f*l+x,e[1]=c*d,e[5]=x*l+f,e[9]=u*l-p,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,u=a*l,p=o*c,x=o*l;e[0]=c*h,e[4]=x-f*d,e[8]=p*d+u,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=u*d+p,e[10]=f-x*d}else if(t.order==="XZY"){let f=a*c,u=a*l,p=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=f*d+x,e[5]=a*h,e[9]=u*d-p,e[2]=p*d-u,e[6]=o*h,e[10]=x*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Em,t,wm)}lookAt(t,e,i){let s=this.elements;return Ei.subVectors(t,e),Ei.lengthSq()===0&&(Ei.z=1),Ei.normalize(),En.crossVectors(i,Ei),En.lengthSq()===0&&(Math.abs(i.z)===1?Ei.x+=1e-4:Ei.z+=1e-4,Ei.normalize(),En.crossVectors(i,Ei)),En.normalize(),Wa.crossVectors(Ei,En),s[0]=En.x,s[4]=Wa.x,s[8]=Ei.x,s[1]=En.y,s[5]=Wa.y,s[9]=Ei.y,s[2]=En.z,s[6]=Wa.z,s[10]=Ei.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],f=i[9],u=i[13],p=i[2],x=i[6],m=i[10],g=i[14],v=i[3],M=i[7],y=i[11],w=i[15],E=s[0],_=s[4],S=s[8],R=s[12],C=s[1],D=s[5],F=s[9],G=s[13],L=s[2],z=s[6],X=s[10],H=s[14],it=s[3],W=s[7],j=s[11],tt=s[15];return r[0]=a*E+o*C+c*L+l*it,r[4]=a*_+o*D+c*z+l*W,r[8]=a*S+o*F+c*X+l*j,r[12]=a*R+o*G+c*H+l*tt,r[1]=h*E+d*C+f*L+u*it,r[5]=h*_+d*D+f*z+u*W,r[9]=h*S+d*F+f*X+u*j,r[13]=h*R+d*G+f*H+u*tt,r[2]=p*E+x*C+m*L+g*it,r[6]=p*_+x*D+m*z+g*W,r[10]=p*S+x*F+m*X+g*j,r[14]=p*R+x*G+m*H+g*tt,r[3]=v*E+M*C+y*L+w*it,r[7]=v*_+M*D+y*z+w*W,r[11]=v*S+M*F+y*X+w*j,r[15]=v*R+M*G+y*H+w*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],f=t[10],u=t[14],p=t[3],x=t[7],m=t[11],g=t[15],v=c*u-l*f,M=o*u-l*d,y=o*f-c*d,w=a*u-l*h,E=a*f-c*h,_=a*d-o*h;return e*(x*v-m*M+g*y)-i*(p*v-m*w+g*E)+s*(p*M-x*w+g*_)-r*(p*y-x*E+m*_)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],f=t[10],u=t[11],p=t[12],x=t[13],m=t[14],g=t[15],v=e*o-i*a,M=e*c-s*a,y=e*l-r*a,w=i*c-s*o,E=i*l-r*o,_=s*l-r*c,S=h*x-d*p,R=h*m-f*p,C=h*g-u*p,D=d*m-f*x,F=d*g-u*x,G=f*g-u*m,L=v*G-M*F+y*D+w*C-E*R+_*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/L;return t[0]=(o*G-c*F+l*D)*z,t[1]=(s*F-i*G-r*D)*z,t[2]=(x*_-m*E+g*w)*z,t[3]=(f*E-d*_-u*w)*z,t[4]=(c*C-a*G-l*R)*z,t[5]=(e*G-s*C+r*R)*z,t[6]=(m*y-p*_-g*M)*z,t[7]=(h*_-f*y+u*M)*z,t[8]=(a*F-o*C+l*S)*z,t[9]=(i*C-e*F-r*S)*z,t[10]=(p*E-x*y+g*v)*z,t[11]=(d*y-h*E-u*v)*z,t[12]=(o*R-a*D-c*S)*z,t[13]=(e*D-i*R+s*S)*z,t[14]=(x*M-p*w-m*v)*z,t[15]=(h*w-d*M+f*v)*z,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,f=r*l,u=r*h,p=r*d,x=a*h,m=a*d,g=o*d,v=c*l,M=c*h,y=c*d,w=i.x,E=i.y,_=i.z;return s[0]=(1-(x+g))*w,s[1]=(u+y)*w,s[2]=(p-M)*w,s[3]=0,s[4]=(u-y)*E,s[5]=(1-(f+g))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(p+M)*_,s[9]=(m-v)*_,s[10]=(1-(f+x))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=vs.set(s[0],s[1],s[2]).length(),o=vs.set(s[4],s[5],s[6]).length(),c=vs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ui.copy(this);let l=1/a,h=1/o,d=1/c;return Ui.elements[0]*=l,Ui.elements[1]*=l,Ui.elements[2]*=l,Ui.elements[4]*=h,Ui.elements[5]*=h,Ui.elements[6]*=h,Ui.elements[8]*=d,Ui.elements[9]*=d,Ui.elements[10]*=d,e.setFromRotationMatrix(Ui),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=Ii,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(i-s),f=(e+t)/(e-t),u=(i+s)/(i-s),p,x;if(c)p=r/(a-r),x=a*r/(a-r);else if(o===Ii)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Os)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Ii,c=!1){let l=this.elements,h=2/(e-t),d=2/(i-s),f=-(e+t)/(e-t),u=-(i+s)/(i-s),p,x;if(c)p=1/(a-r),x=a/(a-r);else if(o===Ii)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===Os)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};ic.prototype.isMatrix4=!0;var ye=ic,vs=new P,Ui=new ye,Em=new P(0,0,0),wm=new P(1,1,1),En=new P,Wa=new P,Ei=new P,Cd=new ye,Rd=new Xi,hn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],f=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ae(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Cd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Cd,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rd.setFromEuler(this),this.setFromQuaternion(Rd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hn.DEFAULT_ORDER="XYZ";var Ir=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Am=0,Pd=new P,ys=new Xi,en=new ye,Xa=new P,pr=new P,Cm=new P,Rm=new Xi,Id=new P(1,0,0),Ld=new P(0,1,0),Dd=new P(0,0,1),Nd={type:"added"},Pm={type:"removed"},Ss={type:"childadded",child:null},Xl={type:"childremoved",child:null},ti=class n extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new P,e=new hn,i=new Xi,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ye},normalMatrix:{value:new Yt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.multiply(ys),this}rotateOnWorldAxis(t,e){return ys.setFromAxisAngle(t,e),this.quaternion.premultiply(ys),this}rotateX(t){return this.rotateOnAxis(Id,t)}rotateY(t){return this.rotateOnAxis(Ld,t)}rotateZ(t){return this.rotateOnAxis(Dd,t)}translateOnAxis(t,e){return Pd.copy(t).applyQuaternion(this.quaternion),this.position.add(Pd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Id,t)}translateY(t){return this.translateOnAxis(Ld,t)}translateZ(t){return this.translateOnAxis(Dd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(en.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xa.copy(t):Xa.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?en.lookAt(pr,Xa,this.up):en.lookAt(Xa,pr,this.up),this.quaternion.setFromRotationMatrix(en),s&&(en.extractRotation(s.matrixWorld),ys.setFromRotationMatrix(en),this.quaternion.premultiply(ys.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nd),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Pm),Xl.child=t,this.dispatchEvent(Xl),Xl.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),en.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),en.multiply(t.parent.matrixWorld)),t.applyMatrix4(en),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nd),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,t,Cm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,Rm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),u=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),u.length>0&&(i.animations=u),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};ti.DEFAULT_UP=new P(0,1,0);ti.DEFAULT_MATRIX_AUTO_UPDATE=!0;ti.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var be=class extends ti{constructor(){super(),this.isGroup=!0,this.type="Group"}},Im={type:"move"},Hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),g=this._getHandJoint(l,x);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,p=.005;l.inputState.pinching&&f>u+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=u-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new be;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},qa={h:0,s:0,l:0};function ql(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ne.workingColorSpace){if(t=Sm(t,1),e=ae(e,0,1),i=ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=ql(a,r,t+1/3),this.g=ql(a,r,t),this.b=ql(a,r,t-1/3)}return ne.colorSpaceToWorking(this,s),this}setStyle(t,e=Ve){function i(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){let i=Wf[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=cn(t.r),this.g=cn(t.g),this.b=cn(t.b),this}copyLinearToSRGB(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return ne.workingToColorSpace(ui.copy(this),t),Math.round(ae(ui.r*255,0,255))*65536+Math.round(ae(ui.g*255,0,255))*256+Math.round(ae(ui.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(ui.copy(this),e);let i=ui.r,s=ui.g,r=ui.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(ui.copy(this),e),t.r=ui.r,t.g=ui.g,t.b=ui.b,t}getStyle(t=Ve){ne.workingToColorSpace(ui.copy(this),t);let e=ui.r,i=ui.g,s=ui.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(qa);let i=zl(wn.h,qa.h,e),s=zl(wn.s,qa.s,e),r=zl(wn.l,qa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ui=new qt;qt.NAMES=Wf;var Lr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Gs=class extends ti{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Fi=new P,nn=new P,Yl=new P,sn=new P,Ms=new P,bs=new P,Ud=new P,$l=new P,Zl=new P,Jl=new P,Kl=new Re,jl=new Re,Ql=new Re,on=class n{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Fi.subVectors(t,e),s.cross(Fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Fi.subVectors(s,e),nn.subVectors(i,e),Yl.subVectors(t,e);let a=Fi.dot(Fi),o=Fi.dot(nn),c=Fi.dot(Yl),l=nn.dot(nn),h=nn.dot(Yl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,u=(l*c-o*h)*f,p=(a*h-o*c)*f;return r.set(1-u-p,p,u)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,sn.x),c.addScaledVector(a,sn.y),c.addScaledVector(o,sn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return Kl.setScalar(0),jl.setScalar(0),Ql.setScalar(0),Kl.fromBufferAttribute(t,e),jl.fromBufferAttribute(t,i),Ql.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Kl,r.x),a.addScaledVector(jl,r.y),a.addScaledVector(Ql,r.z),a}static isFrontFacing(t,e,i,s){return Fi.subVectors(i,e),nn.subVectors(t,e),Fi.cross(nn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fi.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Fi.cross(nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;Ms.subVectors(s,i),bs.subVectors(r,i),$l.subVectors(t,i);let c=Ms.dot($l),l=bs.dot($l);if(c<=0&&l<=0)return e.copy(i);Zl.subVectors(t,s);let h=Ms.dot(Zl),d=bs.dot(Zl);if(h>=0&&d<=h)return e.copy(s);let f=c*d-h*l;if(f<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),e.copy(i).addScaledVector(Ms,a);Jl.subVectors(t,r);let u=Ms.dot(Jl),p=bs.dot(Jl);if(p>=0&&u<=p)return e.copy(r);let x=u*l-c*p;if(x<=0&&l>=0&&p<=0)return o=l/(l-p),e.copy(i).addScaledVector(bs,o);let m=h*p-u*d;if(m<=0&&d-h>=0&&u-p>=0)return Ud.subVectors(r,s),o=(d-h)/(d-h+(u-p)),e.copy(s).addScaledVector(Ud,o);let g=1/(m+x+f);return a=x*g,o=f*g,e.copy(i).addScaledVector(Ms,a).addScaledVector(bs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Pn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ki.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ki.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ki.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ki):ki.fromBufferAttribute(r,a),ki.applyMatrix4(t.matrixWorld),this.expandByPoint(ki);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ya.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ya.copy(i.boundingBox)),Ya.applyMatrix4(t.matrixWorld),this.union(Ya)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ki),ki.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(mr),$a.subVectors(this.max,mr),Ts.subVectors(t.a,mr),Es.subVectors(t.b,mr),ws.subVectors(t.c,mr),An.subVectors(Es,Ts),Cn.subVectors(ws,Es),qn.subVectors(Ts,ws);let e=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-qn.z,qn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,qn.z,0,-qn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-qn.y,qn.x,0];return!th(e,Ts,Es,ws,$a)||(e=[1,0,0,0,1,0,0,0,1],!th(e,Ts,Es,ws,$a))?!1:(Za.crossVectors(An,Cn),e=[Za.x,Za.y,Za.z],th(e,Ts,Es,ws,$a))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ki).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ki).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},rn=[new P,new P,new P,new P,new P,new P,new P,new P],ki=new P,Ya=new Pn,Ts=new P,Es=new P,ws=new P,An=new P,Cn=new P,qn=new P,mr=new P,$a=new P,Za=new P,Yn=new P;function th(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Yn.fromArray(n,r);let o=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),c=t.dot(Yn),l=e.dot(Yn),h=i.dot(Yn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Ge=new P,Ja=new et,Lm=0,Fe=class extends Wi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=zh,this.updateRanges=[],this.gpuType=zi,this.version=0,this._normalizationScale=t!==void 0?Vc(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ja.fromBufferAttribute(this,e),Ja.applyMatrix3(t),this.setXY(e,Ja.x,Ja.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix3(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Gf(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Vf(t,this.array)}};var Dr=class extends Fe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Nr=class extends Fe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var oe=class extends Fe{constructor(t,e,i){super(new Float32Array(t),e,i)}},Dm=new Pn,gr=new P,eh=new P,Kn=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Dm.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gr.subVectors(t,this.center);let e=gr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(gr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(eh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gr.copy(t.center).add(eh)),this.expandByPoint(gr.copy(t.center).sub(eh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Nm=0,Pi=new ye,ih=new ti,As=new P,wi=new Pn,_r=new Pn,je=new P,Te=class n extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vm(t)?Nr:Dr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Yt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Pi.makeRotationFromQuaternion(t),this.applyMatrix4(Pi),this}rotateX(t){return Pi.makeRotationX(t),this.applyMatrix4(Pi),this}rotateY(t){return Pi.makeRotationY(t),this.applyMatrix4(Pi),this}rotateZ(t){return Pi.makeRotationZ(t),this.applyMatrix4(Pi),this}translate(t,e,i){return Pi.makeTranslation(t,e,i),this.applyMatrix4(Pi),this}scale(t,e,i){return Pi.makeScale(t,e,i),this.applyMatrix4(Pi),this}lookAt(t){return ih.lookAt(t),ih.updateMatrix(),this.applyMatrix4(ih.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];wi.setFromBufferAttribute(r),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,wi.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,wi.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(wi.min),this.boundingBox.expandByPoint(wi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(wi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(je.addVectors(wi.min,_r.min),wi.expandByPoint(je),je.addVectors(wi.max,_r.max),wi.expandByPoint(je)):(wi.expandByPoint(_r.min),wi.expandByPoint(_r.max))}wi.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)je.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(je));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)je.fromBufferAttribute(o,l),c&&(As.fromBufferAttribute(t,l),je.add(As)),s=Math.max(s,i.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Fe(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(i.count);for(let R=0;R<i.count;R++)o[R]=new P,c[R]=new P;let h=new P,d=new P,f=new P,u=new et,p=new et,x=new et,m=new P,g=new P;function v(R,C,D){l[R]=l[C]=l[D]=1,h.fromBufferAttribute(i,R),d.fromBufferAttribute(i,C),f.fromBufferAttribute(i,D),u.fromBufferAttribute(r,R),p.fromBufferAttribute(r,C),x.fromBufferAttribute(r,D),d.sub(h),f.sub(h),p.sub(u),x.sub(u);let F=1/(p.x*x.y-x.x*p.y);isFinite(F)&&(m.copy(d).multiplyScalar(x.y).addScaledVector(f,-p.y).multiplyScalar(F),g.copy(f).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(F),o[R].add(m),o[C].add(m),o[D].add(m),c[R].add(g),c[C].add(g),c[D].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,C=M.length;R<C;++R){let D=M[R],F=D.start,G=D.count;for(let L=F,z=F+G;L<z;L+=3)v(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let y=new P,w=new P,E=new P,_=new P;function S(R){E.fromBufferAttribute(s,R),_.copy(E);let C=o[R];y.copy(C),y.sub(E.multiplyScalar(E.dot(C))).normalize(),w.crossVectors(_,C);let F=w.dot(c[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,F)}for(let R=0,C=i.count;R<C;++R)l[R]&&S(R);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Fe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,u=i.count;f<u;f++)i.setXYZ(f,0,0,0);let s=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,d=new P;if(t)for(let f=0,u=t.count;f<u;f+=3){let p=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,p),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,u=e.count;f<u;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,d=o.normalized,f=new l.constructor(c.length*h),u=0,p=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?u=c[x]*o.data.stride+o.offset:u=c[x]*h;for(let g=0;g<h;g++)f[p++]=l[u++]}return new Fe(f,h,d)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,i);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){let f=l[h],u=t(f,i);c.push(u)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){let u=l[d];h.push(u.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Do=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=zh,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=Fd(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);let i=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(i,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});let e=Fd(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let i={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return i.usage=this.usage,i}};function Fd(n){return n.buffer._uuid===void 0&&(n.buffer._uuid=Bn()),n.byteOffset===0&&n.byteLength===n.buffer.byteLength?n.buffer._uuid:n.buffer._uuid+":"+n.byteOffset+":"+n.byteLength}var _i=new P,Ur=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s,this._normalizationScale=t!==void 0?Vc(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)_i.fromBufferAttribute(this,e),_i.applyMatrix4(t),this.setXYZ(e,_i.x,_i.y,_i.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)_i.fromBufferAttribute(this,e),_i.applyNormalMatrix(t),this.setXYZ(e,_i.x,_i.y,_i.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)_i.fromBufferAttribute(this,e),_i.transformDirection(t),this.setXYZ(e,_i.x,_i.y,_i.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Rr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Rr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Gf(t,this.data.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Vf(t,this.data.array)}},nh=new P,Um=new P,Fm=new Yt,Oi=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=nh.subVectors(i,e).cross(Um.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(nh),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Fm.getNormalMatrix(t),s=this.coplanarPoint(nh).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},km=0,qi=class extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=js,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wh,this.blendDst=Ah,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=If,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vo,this.stencilZFail=vo,this.stencilZPass=vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new qt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Oi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new et().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new et().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},In=class extends qi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Cs,xr=new P,Rs=new P,Ps=new P,Is=new et,vr=new et,Xf=new ye,Ka=new P,yr=new P,ja=new P,kd=new et,sh=new et,Od=new et,jn=class extends ti{constructor(t=new In){if(super(),this.isSprite=!0,this.type="Sprite",Cs===void 0){Cs=new Te;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Do(e,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new Ur(i,3,0,!1)),Cs.setAttribute("uv",new Ur(i,2,3,!1))}this.geometry=Cs,this.material=t,this.center=new et(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&Vt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Rs.setFromMatrixScale(this.matrixWorld),Xf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Rs.multiplyScalar(-Ps.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;Qa(Ka.set(-.5,-.5,0),Ps,a,Rs,s,r),Qa(yr.set(.5,-.5,0),Ps,a,Rs,s,r),Qa(ja.set(.5,.5,0),Ps,a,Rs,s,r),kd.set(0,0),sh.set(1,0),Od.set(1,1);let o=t.ray.intersectTriangle(Ka,yr,ja,!1,xr);if(o===null&&(Qa(yr.set(-.5,.5,0),Ps,a,Rs,s,r),sh.set(0,1),o=t.ray.intersectTriangle(Ka,ja,yr,!1,xr),o===null))return;let c=t.ray.origin.distanceTo(xr);c<t.near||c>t.far||e.push({distance:c,point:xr.clone(),uv:on.getInterpolation(xr,Ka,yr,ja,kd,sh,Od,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){let e=super.toJSON(t);return e.object.center=this.center.toArray(),e}};function Qa(n,t,e,i,s,r){Is.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(vr.x=r*Is.x-s*Is.y,vr.y=s*Is.x+r*Is.y):vr.copy(Is),n.copy(t),n.x+=vr.x,n.y+=vr.y,n.applyMatrix4(Xf)}var an=new P,rh=new P,to=new P,eo=new P,Fr=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){rh.copy(t).add(e).multiplyScalar(.5),to.copy(e).sub(t).normalize(),eo.copy(this.origin).sub(rh);let r=t.distanceTo(e)*.5,a=-this.direction.dot(to),o=eo.dot(this.direction),c=-eo.dot(to),l=eo.lengthSq(),h=Math.abs(1-a*a),d,f,u,p;if(h>0)if(d=a*c-o,f=a*o-c,p=r*h,d>=0)if(f>=-p)if(f<=p){let x=1/h;d*=x,f*=x,u=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;else f<=-p?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),u=-d*d+f*(f+2*c)+l):f<=p?(d=0,f=Math.min(Math.max(-r,-c),r),u=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),u=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(rh).addScaledVector(to,f),u}intersectSphere(t,e){if(t.radius<0)return null;an.subVectors(t.center,this.origin);let i=an.dot(this.direction),s=an.dot(an)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,c=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,c=(t.min.z-f.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=t.x-a.x,f=t.y-a.y,u=t.z-a.z,p=e.x-a.x,x=e.y-a.y,m=e.z-a.z,g=i.x-a.x,v=i.y-a.y,M=i.z-a.z,y=Math.abs(c),w=Math.abs(l),E=Math.abs(h),_,S,R,C,D,F,G,L,z,X,H,it;if(y>=w&&y>=E?(R=c,F=d,z=p,it=g,c>=0?(_=l,S=h,C=f,D=u,G=x,L=m,X=v,H=M):(_=h,S=l,C=u,D=f,G=m,L=x,X=M,H=v)):w>=E?(R=l,F=f,z=x,it=v,l>=0?(_=h,S=c,C=u,D=d,G=m,L=p,X=M,H=g):(_=c,S=h,C=d,D=u,G=p,L=m,X=g,H=M)):(R=h,F=u,z=m,it=M,h>=0?(_=c,S=l,C=d,D=f,G=p,L=x,X=g,H=v):(_=l,S=c,C=f,D=d,G=x,L=p,X=v,H=g)),R===0)return null;let W=_/R,j=S/R,tt=1/R,Et=C-W*F,Bt=D-j*F,Y=G-W*z,vt=L-j*z,wt=X-W*it,Ft=H-j*it,yt=wt*vt-Ft*Y,kt=Et*Ft-Bt*wt,we=Y*Bt-vt*Et;if(s){if(yt<0||kt<0||we<0)return null}else if((yt<0||kt<0||we<0)&&(yt>0||kt>0||we>0))return null;let zt=yt+kt+we;if(zt===0)return null;let ee=tt*(yt*F+kt*z+we*it);return(zt>0?ee<0:ee>0)?null:this.at(ee/zt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ke=class extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Bd=new ye,$n=new Fr,io=new Kn,zd=new P,no=new P,so=new P,ro=new P,ah=new P,ao=new P,Hd=new P,oo=new P,Jt=class extends ti{constructor(t=new Te,e=new ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ao.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],d=r[c];h!==0&&(ah.fromBufferAttribute(d,t),a?ao.addScaledVector(ah,h):ao.addScaledVector(ah.sub(e),h))}e.add(ao)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),io.copy(i.boundingSphere),io.applyMatrix4(r),$n.copy(t.ray).recast(t.near),!(io.containsPoint($n.origin)===!1&&($n.intersectSphere(io,zd)===null||$n.origin.distanceToSquared(zd)>(t.far-t.near)**2))&&(Bd.copy(r).invert(),$n.copy(t.ray).applyMatrix4(Bd),!(i.boundingBox!==null&&$n.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,$n)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=a[m.materialIndex],v=Math.max(m.start,u.start),M=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));for(let y=v,w=M;y<w;y+=3){let E=o.getX(y),_=o.getX(y+1),S=o.getX(y+2);s=co(this,g,t,i,l,h,d,E,_,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,u.start),x=Math.min(o.count,u.start+u.count);for(let m=p,g=x;m<g;m+=3){let v=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);s=co(this,a,t,i,l,h,d,v,M,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let p=0,x=f.length;p<x;p++){let m=f[p],g=a[m.materialIndex],v=Math.max(m.start,u.start),M=Math.min(c.count,Math.min(m.start+m.count,u.start+u.count));for(let y=v,w=M;y<w;y+=3){let E=y,_=y+1,S=y+2;s=co(this,g,t,i,l,h,d,E,_,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let p=Math.max(0,u.start),x=Math.min(c.count,u.start+u.count);for(let m=p,g=x;m<g;m+=3){let v=m,M=m+1,y=m+2;s=co(this,a,t,i,l,h,d,v,M,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Om(n,t,e,i,s,r,a,o){let c;if(t.side===ai?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===kn,o),c===null)return null;oo.copy(o),oo.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(oo);return l<e.near||l>e.far?null:{distance:l,point:oo.clone(),object:n}}function co(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,no),n.getVertexPosition(c,so),n.getVertexPosition(l,ro);let h=Om(n,t,e,i,no,so,ro,Hd);if(h){let d=new P;on.getBarycoord(Hd,no,so,ro,d),s&&(h.uv=on.getInterpolatedAttribute(s,o,c,l,d,new et)),r&&(h.uv1=on.getInterpolatedAttribute(r,o,c,l,d,new et)),a&&(h.normal=on.getInterpolatedAttribute(a,o,c,l,d,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new P,materialIndex:0};on.getNormal(no,so,ro,f.normal),h.face=f,h.barycoord=d}return h}var No=class extends vi{constructor(t=null,e=1,i=1,s,r,a,o,c,l=Qe,h=Qe,d,f){super(null,a,o,c,l,h,s,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zn=new Kn,Bm=new et(.5,.5),lo=new P,Ln=class{constructor(t=new Oi,e=new Oi,i=new Oi,s=new Oi,r=new Oi,a=new Oi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ii,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],f=r[6],u=r[7],p=r[8],x=r[9],m=r[10],g=r[11],v=r[12],M=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,u-h,g-p,w-v).normalize(),s[1].setComponents(l+a,u+h,g+p,w+v).normalize(),s[2].setComponents(l+o,u+d,g+x,w+M).normalize(),s[3].setComponents(l-o,u-d,g-x,w-M).normalize(),i)s[4].setComponents(c,f,m,y).normalize(),s[5].setComponents(l-c,u-f,g-m,w-y).normalize();else if(s[4].setComponents(l-c,u-f,g-m,w-y).normalize(),e===Ii)s[5].setComponents(l+c,u+f,g+m,w+y).normalize();else if(e===Os)s[5].setComponents(c,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(t){Zn.center.set(0,0,0);let e=Bm.distanceTo(t.center);return Zn.radius=.7071067811865476+e,Zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(lo.x=s.normal.x>0?t.max.x:t.min.x,lo.y=s.normal.y>0?t.max.y:t.min.y,lo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(lo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Gd=new ye,Uo=class n{constructor(){this.coordinateSystem=Ii,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Gd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new Ln),i[s].setFromProjectionMatrix(Gd,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Ln),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};var Fo=class extends qi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vd=new ye,mh=new Fr,ho=new Kn,uo=new P,Qn=class extends ti{constructor(t=new Te,e=new Fo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ho.copy(i.boundingSphere),ho.applyMatrix4(s),ho.radius+=r,t.ray.intersectsSphere(ho)===!1)return;Vd.copy(s).invert(),mh.copy(t.ray).applyMatrix4(Vd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){let f=Math.max(0,a.start),u=Math.min(l.count,a.start+a.count);for(let p=f,x=u;p<x;p++){let m=l.getX(p);uo.fromBufferAttribute(d,m),Wd(uo,m,c,s,t,e,this)}}else{let f=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let p=f,x=u;p<x;p++)uo.fromBufferAttribute(d,p),Wd(uo,p,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Wd(n,t,e,i,s,r,a){let o=mh.distanceSqToPoint(n);if(o<e){let c=new P;mh.closestPointToPoint(n,c),c.applyMatrix4(i);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var kr=class extends vi{constructor(t=[],e=hs,i,s,r,a,o,c,l,h){super(t,e,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},un=class extends vi{constructor(t,e,i,s,r,a,o,c,l){super(t,e,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var dn=class extends vi{constructor(t,e,i=Bi,s,r,a,o=Qe,c=Qe,l,h=ln,d=1){if(h!==ln&&h!==gn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:d};super(f,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new zs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Or=class extends dn{constructor(t,e=Bi,i=hs,s,r,a=Qe,o=Qe,c,l=ln){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Br=class extends vi{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},si=class n extends Te{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],d=[],f=0,u=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,s,a,2),p("x","z","y",1,-1,t,i,-e,s,a,3),p("x","y","z",1,-1,t,e,i,s,r,4),p("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(d,2));function p(x,m,g,v,M,y,w,E,_,S,R){let C=y/_,D=w/S,F=y/2,G=w/2,L=E/2,z=_+1,X=S+1,H=0,it=0,W=new P;for(let j=0;j<X;j++){let tt=j*D-G;for(let Et=0;Et<z;Et++){let Bt=Et*C-F;W[x]=Bt*v,W[m]=tt*M,W[g]=L,l.push(W.x,W.y,W.z),W[x]=0,W[m]=0,W[g]=E>0?1:-1,h.push(W.x,W.y,W.z),d.push(Et/_),d.push(1-j/S),H+=1}}for(let j=0;j<S;j++)for(let tt=0;tt<_;tt++){let Et=f+tt+z*j,Bt=f+tt+z*(j+1),Y=f+(tt+1)+z*(j+1),vt=f+(tt+1)+z*j;c.push(Et,Bt,vt),c.push(Bt,Y,vt),it+=6}o.addGroup(u,it,R),u+=it,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var ts=class n extends Te{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new P,h=new et;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){let u=i+d/e*s;l.x=t*Math.cos(u),l.y=t*Math.sin(u),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(o,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ri=class n extends Te{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],f=[],u=[],p=0,x=[],m=i/2,g=0;v(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new oe(d,3)),this.setAttribute("normal",new oe(f,3)),this.setAttribute("uv",new oe(u,2));function v(){let y=new P,w=new P,E=0,_=(e-t)/i;for(let S=0;S<=r;S++){let R=[],C=S/r,D=C*(e-t)+t;for(let F=0;F<=s;F++){let G=F/s,L=G*c+o,z=Math.sin(L),X=Math.cos(L);w.x=D*z,w.y=-C*i+m,w.z=D*X,d.push(w.x,w.y,w.z),y.set(z,_,X).normalize(),f.push(y.x,y.y,y.z),u.push(G,1-C),R.push(p++)}x.push(R)}for(let S=0;S<s;S++)for(let R=0;R<r;R++){let C=x[R][S],D=x[R+1][S],F=x[R+1][S+1],G=x[R][S+1];(t>0||R!==0)&&(h.push(C,D,G),E+=3),(e>0||R!==r-1)&&(h.push(D,F,G),E+=3)}l.addGroup(g,E,0),g+=E}function M(y){let w=p,E=new et,_=new P,S=0,R=y===!0?t:e,C=y===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*C,0),f.push(0,C,0),u.push(.5,.5),p++;let D=p;for(let F=0;F<=s;F++){let L=F/s*c+o,z=Math.cos(L),X=Math.sin(L);_.x=R*X,_.y=m*C,_.z=R*z,d.push(_.x,_.y,_.z),f.push(0,C,0),E.x=z*.5+.5,E.y=X*.5*C+.5,u.push(E.x,E.y),p++}for(let F=0;F<s;F++){let G=w+F,L=D+F;y===!0?h.push(L,L+1,G):h.push(L+1,L,G),S+=3}l.addGroup(g,S,y===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},es=class n extends ri{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ko=class n extends Te{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),l(i),h(),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(r.slice(),3)),this.setAttribute("uv",new oe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let M=new P,y=new P,w=new P;for(let E=0;E<e.length;E+=3)u(e[E+0],M),u(e[E+1],y),u(e[E+2],w),c(M,y,w,v)}function c(v,M,y,w){let E=w+1,_=[];for(let S=0;S<=E;S++){_[S]=[];let R=v.clone().lerp(y,S/E),C=M.clone().lerp(y,S/E),D=E-S;for(let F=0;F<=D;F++)F===0&&S===E?_[S][F]=R:_[S][F]=R.clone().lerp(C,F/D)}for(let S=0;S<E;S++)for(let R=0;R<2*(E-S)-1;R++){let C=Math.floor(R/2);R%2===0?(f(_[S][C+1]),f(_[S+1][C]),f(_[S][C])):(f(_[S][C+1]),f(_[S+1][C+1]),f(_[S+1][C]))}}function l(v){let M=new P;for(let y=0;y<r.length;y+=3)M.x=r[y+0],M.y=r[y+1],M.z=r[y+2],M.normalize().multiplyScalar(v),r[y+0]=M.x,r[y+1]=M.y,r[y+2]=M.z}function h(){let v=new P;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let y=m(v)/2/Math.PI+.5,w=g(v)/Math.PI+.5;a.push(y,1-w)}p(),d()}function d(){for(let v=0;v<a.length;v+=6){let M=a[v+0],y=a[v+2],w=a[v+4],E=Math.max(M,y,w),_=Math.min(M,y,w);E>.9&&_<.1&&(M<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),w<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function u(v,M){let y=v*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function p(){let v=new P,M=new P,y=new P,w=new P,E=new et,_=new et,S=new et;for(let R=0,C=0;R<r.length;R+=9,C+=6){v.set(r[R+0],r[R+1],r[R+2]),M.set(r[R+3],r[R+4],r[R+5]),y.set(r[R+6],r[R+7],r[R+8]),E.set(a[C+0],a[C+1]),_.set(a[C+2],a[C+3]),S.set(a[C+4],a[C+5]),w.copy(v).add(M).add(y).divideScalar(3);let D=m(w);x(E,C+0,v,D),x(_,C+2,M,D),x(S,C+4,y,D)}}function x(v,M,y,w){w<0&&v.x===1&&(a[M]=v.x-1),y.x===0&&y.z===0&&(a[M]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}};var Ai=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Gt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,u=(a-h)/f;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new et:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new P,s=[],r=[],a=[],o=new P,c=new ye;for(let u=0;u<=t;u++){let p=u/t;s[u]=this.getTangentAt(p,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),f<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ae(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(c.makeRotationAxis(o,p))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(ae(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],u*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Vs=class extends Ai{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new et){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,u=l-this.aY;c=f*h-u*d+this.aX,l=f*d+u*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Oo=class extends Vs{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Gh(){let n=0,t=0,e=0,i=0;function s(r,a,o,c){n=r,t=o,e=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,u=(o-a)/h-(c-a)/(h+d)+(c-o)/d;f*=h,u*=h,s(a,o,f,u)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Xd=new P,qd=new P,oh=new Gh,ch=new Gh,lh=new Gh,Ws=class extends Ai{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(qd.subVectors(s[0],s[1]).add(s[0]),l=qd);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Xd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xd),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?.5:.25,p=Math.pow(l.distanceToSquared(d),u),x=Math.pow(d.distanceToSquared(f),u),m=Math.pow(f.distanceToSquared(h),u);x<1e-4&&(x=1),p<1e-4&&(p=x),m<1e-4&&(m=x),oh.initNonuniformCatmullRom(l.x,d.x,f.x,h.x,p,x,m),ch.initNonuniformCatmullRom(l.y,d.y,f.y,h.y,p,x,m),lh.initNonuniformCatmullRom(l.z,d.z,f.z,h.z,p,x,m)}else this.curveType==="catmullrom"&&(oh.initCatmullRom(l.x,d.x,f.x,h.x,this.tension),ch.initCatmullRom(l.y,d.y,f.y,h.y,this.tension),lh.initCatmullRom(l.z,d.z,f.z,h.z,this.tension));return i.set(oh.calc(c),ch.calc(c),lh.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Yd(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,c=n*o;return(2*e-2*i+r+a)*c+(-3*e+3*i-2*r-a)*o+r*n+e}function zm(n,t){let e=1-n;return e*e*t}function Hm(n,t){return 2*(1-n)*n*t}function Gm(n,t){return n*n*t}function br(n,t,e,i){return zm(n,t)+Hm(n,e)+Gm(n,i)}function Vm(n,t){let e=1-n;return e*e*e*t}function Wm(n,t){let e=1-n;return 3*e*e*n*t}function Xm(n,t){return 3*(1-n)*n*n*t}function qm(n,t){return n*n*n*t}function Tr(n,t,e,i,s){return Vm(n,t)+Wm(n,e)+Xm(n,i)+qm(n,s)}var zr=class extends Ai{constructor(t=new et,e=new et,i=new et,s=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new et){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Tr(t,s.x,r.x,a.x,o.x),Tr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Bo=class extends Ai{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Tr(t,s.x,r.x,a.x,o.x),Tr(t,s.y,r.y,a.y,o.y),Tr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hr=class extends Ai{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zo=class extends Ai{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends Ai{constructor(t=new et,e=new et,i=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new et){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(br(t,s.x,r.x,a.x),br(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vr=class extends Ai{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(br(t,s.x,r.x,a.x),br(t,s.y,r.y,a.y),br(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wr=class extends Ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(Yd(o,c.x,l.x,h.x,d.x),Yd(o,c.y,l.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new et().fromArray(s))}return this}},Ho=Object.freeze({__proto__:null,ArcCurve:Oo,CatmullRomCurve3:Ws,CubicBezierCurve:zr,CubicBezierCurve3:Bo,EllipseCurve:Vs,LineCurve:Hr,LineCurve3:zo,QuadraticBezierCurve:Gr,QuadraticBezierCurve3:Vr,SplineCurve:Wr}),Go=class extends Ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ho[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Ho[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Xr=class extends Go{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Hr(this.currentPoint.clone(),new et(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Gr(this.currentPoint.clone(),new et(t,e),new et(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new zr(this.currentPoint.clone(),new et(t,e),new et(i,s),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Wr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,a,o,c),this}absellipse(t,e,i,s,r,a,o,c){let l=new Vs(t,e,i,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},is=class extends Xr{constructor(t){super(t),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Xr().fromJSON(s))}return this}};function Ym(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=qf(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=jm(n,t,r,e)),n.length>80*e){o=n[0],c=n[1];let h=o,d=c;for(let f=e;f<s;f+=e){let u=n[f],p=n[f+1];u<o&&(o=u),p<c&&(c=p),u>h&&(h=u),p>d&&(d=p)}l=Math.max(h-o,d-c),l=l!==0?32767/l:0}return qr(r,a,e,o,c,l,0),a}function qf(n,t,e,i,s){let r;if(s===l0(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=$d(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=$d(a/i|0,n[a],n[a+1],r);return r&&Xs(r,r.next)&&($r(r),r=r.next),r}function ns(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Xs(e,e.next)||De(e.prev,e,e.next)===0)){if($r(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function qr(n,t,e,i,s,r,a){if(!n)return;!a&&r&&n0(n,i,s,r);let o=n;for(;n.prev!==n.next;){let c=n.prev,l=n.next;if(r?Zm(n,i,s,r):$m(n)){t.push(c.i,n.i,l.i),$r(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=Jm(ns(n),t),qr(n,t,e,i,s,r,2)):a===2&&Km(n,t,e,i,s,r):qr(ns(n),t,e,i,s,r,1);break}}}function $m(n){let t=n.prev,e=n,i=n.next;if(De(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,c=e.y,l=i.y,h=Math.min(s,r,a),d=Math.min(o,c,l),f=Math.max(s,r,a),u=Math.max(o,c,l),p=i.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=d&&p.y<=u&&Sr(s,o,r,c,a,l,p.x,p.y)&&De(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Zm(n,t,e,i){let s=n.prev,r=n,a=n.next;if(De(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,d=r.y,f=a.y,u=Math.min(o,c,l),p=Math.min(h,d,f),x=Math.max(o,c,l),m=Math.max(h,d,f),g=gh(u,p,t,e,i),v=gh(x,m,t,e,i),M=n.prevZ,y=n.nextZ;for(;M&&M.z>=g&&y&&y.z<=v;){if(M.x>=u&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Sr(o,h,c,d,l,f,M.x,M.y)&&De(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=u&&y.x<=x&&y.y>=p&&y.y<=m&&y!==s&&y!==a&&Sr(o,h,c,d,l,f,y.x,y.y)&&De(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=g;){if(M.x>=u&&M.x<=x&&M.y>=p&&M.y<=m&&M!==s&&M!==a&&Sr(o,h,c,d,l,f,M.x,M.y)&&De(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=v;){if(y.x>=u&&y.x<=x&&y.y>=p&&y.y<=m&&y!==s&&y!==a&&Sr(o,h,c,d,l,f,y.x,y.y)&&De(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Jm(n,t){let e=n;do{let i=e.prev,s=e.next.next;!Xs(i,s)&&$f(i,e,e.next,s)&&Yr(i,s)&&Yr(s,i)&&(t.push(i.i,e.i,s.i),$r(e),$r(e.next),e=n=s),e=e.next}while(e!==n);return ns(e)}function Km(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&a0(a,o)){let c=Zf(a,o);a=ns(a,a.next),c=ns(c,c.next),qr(a,t,e,i,s,r,0),qr(c,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function jm(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,c=r<a-1?t[r+1]*i:n.length,l=qf(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(r0(l))}s.sort(Qm);for(let r=0;r<s.length;r++)e=t0(s[r],e);return e}function Qm(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function t0(n,t){let e=e0(n,t);if(!e)return t;let i=Zf(e,n);return ns(i,i.next),ns(e,e.next)}function e0(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(Xs(n,e))return e;do{if(Xs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=i&&d>r&&(r=d,a=e.x<e.next.x?e:e.next,d===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=c&&i!==e.x&&Yf(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){let d=Math.abs(s-e.y)/(i-e.x);Yr(e,n)&&(d<h||d===h&&(e.x>a.x||e.x===a.x&&i0(a,e)))&&(a=e,h=d)}e=e.next}while(e!==o);return a}function i0(n,t){return De(n.prev,n,t.prev)<0&&De(t.next,n,n.next)<0}function n0(n,t,e,i){let s=n;do s.z===0&&(s.z=gh(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,s0(s)}function s0(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let l=0;l<e&&(o++,a=a.nextZ,!!a);l++);let c=e;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function gh(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function r0(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Yf(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Sr(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&Yf(n,t,e,i,s,r,a,o)}function a0(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!o0(n,t)&&(Yr(n,t)&&Yr(t,n)&&c0(n,t)&&(De(n.prev,n,t.prev)||De(n,t.prev,t))||Xs(n,t)&&De(n.prev,n,n.next)>0&&De(t.prev,t,t.next)>0)}function De(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Xs(n,t){return n.x===t.x&&n.y===t.y}function $f(n,t,e,i){let s=po(De(n,t,e)),r=po(De(n,t,i)),a=po(De(e,i,n)),o=po(De(e,i,t));return!!(s!==r&&a!==o||s===0&&fo(n,e,t)||r===0&&fo(n,i,t)||a===0&&fo(e,n,i)||o===0&&fo(e,t,i))}function fo(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function po(n){return n>0?1:n<0?-1:0}function o0(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&$f(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Yr(n,t){return De(n.prev,n,n.next)<0?De(n,t,n.next)>=0&&De(n,n.prev,t)>=0:De(n,t,n.prev)<0||De(n,n.next,t)<0}function c0(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Zf(n,t){let e=_h(n.i,n.x,n.y),i=_h(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function $d(n,t,e,i){let s=_h(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function $r(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function _h(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function l0(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var xh=class{static triangulate(t,e,i=2){return Ym(t,e,i)}},Jn=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Zd(t),Jd(i,t);let a=t.length;e.forEach(Zd);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,Jd(i,e[c]);let o=xh.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Zd(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Jd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var qs=class n extends Te{constructor(t=new is([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:u-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:h0,M,y=!1,w,E,_,S;if(g){M=g.getSpacedPoints(h),y=!0,f=!1;let Q=g.isCatmullRomCurve3?g.closed:!1;w=g.computeFrenetFrames(h,Q),E=new P,_=new P,S=new P}f||(m=0,u=0,p=0,x=0);let R=o.extractPoints(l),C=R.shape,D=R.holes;if(!Jn.isClockWise(C)){C=C.reverse();for(let Q=0,ut=D.length;Q<ut;Q++){let ct=D[Q];Jn.isClockWise(ct)&&(D[Q]=ct.reverse())}}function G(Q){let ct=10000000000000001e-36,Tt=Q[0];for(let xt=1;xt<=Q.length;xt++){let Kt=xt%Q.length,Lt=Q[Kt],re=Lt.x-Tt.x,le=Lt.y-Tt.y,pe=re*re+le*le,U=Math.max(Math.abs(Lt.x),Math.abs(Lt.y),Math.abs(Tt.x),Math.abs(Tt.y)),ze=ct*U*U;if(pe<=ze){Q.splice(Kt,1),xt--;continue}Tt=Lt}}G(C),D.forEach(G);let L=D.length,z=C;for(let Q=0;Q<L;Q++){let ut=D[Q];C=C.concat(ut)}function X(Q,ut,ct){return ut||Vt("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ut,ct)}let H=C.length;function it(Q,ut,ct){let Tt,xt,Kt,Lt=Q.x-ut.x,re=Q.y-ut.y,le=ct.x-Q.x,pe=ct.y-Q.y,U=Lt*Lt+re*re,ze=Lt*pe-re*le;if(Math.abs(ze)>Number.EPSILON){let ie=Math.sqrt(U),xe=Math.sqrt(le*le+pe*pe),mt=ut.x-re/ie,Ue=ut.y+Lt/ie,Ot=ct.x-pe/xe,Xt=ct.y+le/xe,A=((Ot-mt)*pe-(Xt-Ue)*le)/(Lt*pe-re*le);Tt=mt+Lt*A-Q.x,xt=Ue+re*A-Q.y;let b=Tt*Tt+xt*xt;if(b<=2)return new et(Tt,xt);Kt=Math.sqrt(b/2)}else{let ie=!1;Lt>Number.EPSILON?le>Number.EPSILON&&(ie=!0):Lt<-Number.EPSILON?le<-Number.EPSILON&&(ie=!0):Math.sign(re)===Math.sign(pe)&&(ie=!0),ie?(Tt=-re,xt=Lt,Kt=Math.sqrt(U)):(Tt=Lt,xt=re,Kt=Math.sqrt(U/2))}return new et(Tt/Kt,xt/Kt)}let W=[];for(let Q=0,ut=z.length,ct=ut-1,Tt=Q+1;Q<ut;Q++,ct++,Tt++)ct===ut&&(ct=0),Tt===ut&&(Tt=0),W[Q]=it(z[Q],z[ct],z[Tt]);let j=[],tt,Et=W.concat();for(let Q=0,ut=L;Q<ut;Q++){let ct=D[Q];tt=[];for(let Tt=0,xt=ct.length,Kt=xt-1,Lt=Tt+1;Tt<xt;Tt++,Kt++,Lt++)Kt===xt&&(Kt=0),Lt===xt&&(Lt=0),tt[Tt]=it(ct[Tt],ct[Kt],ct[Lt]);j.push(tt),Et=Et.concat(tt)}let Bt;if(m===0)Bt=Jn.triangulateShape(z,D);else{let Q=[],ut=[];for(let ct=0;ct<m;ct++){let Tt=ct/m,xt=u*Math.cos(Tt*Math.PI/2),Kt=p*Math.sin(Tt*Math.PI/2)+x;for(let Lt=0,re=z.length;Lt<re;Lt++){let le=X(z[Lt],W[Lt],Kt);kt(le.x,le.y,-xt),Tt===0&&Q.push(le)}for(let Lt=0,re=L;Lt<re;Lt++){let le=D[Lt];tt=j[Lt];let pe=[];for(let U=0,ze=le.length;U<ze;U++){let ie=X(le[U],tt[U],Kt);kt(ie.x,ie.y,-xt),Tt===0&&pe.push(ie)}Tt===0&&ut.push(pe)}}Bt=Jn.triangulateShape(Q,ut)}let Y=Bt.length,vt=p+x;for(let Q=0;Q<H;Q++){let ut=f?X(C[Q],Et[Q],vt):C[Q];y?(_.copy(w.normals[0]).multiplyScalar(ut.x),E.copy(w.binormals[0]).multiplyScalar(ut.y),S.copy(M[0]).add(_).add(E),kt(S.x,S.y,S.z)):kt(ut.x,ut.y,0)}for(let Q=1;Q<=h;Q++)for(let ut=0;ut<H;ut++){let ct=f?X(C[ut],Et[ut],vt):C[ut];y?(_.copy(w.normals[Q]).multiplyScalar(ct.x),E.copy(w.binormals[Q]).multiplyScalar(ct.y),S.copy(M[Q]).add(_).add(E),kt(S.x,S.y,S.z)):kt(ct.x,ct.y,d/h*Q)}for(let Q=m-1;Q>=0;Q--){let ut=Q/m,ct=u*Math.cos(ut*Math.PI/2),Tt=p*Math.sin(ut*Math.PI/2)+x;for(let xt=0,Kt=z.length;xt<Kt;xt++){let Lt=X(z[xt],W[xt],Tt);kt(Lt.x,Lt.y,d+ct)}for(let xt=0,Kt=D.length;xt<Kt;xt++){let Lt=D[xt];tt=j[xt];for(let re=0,le=Lt.length;re<le;re++){let pe=X(Lt[re],tt[re],Tt);y?kt(pe.x,pe.y+M[h-1].y,M[h-1].x+ct):kt(pe.x,pe.y,d+ct)}}}wt(),Ft();function wt(){let Q=s.length/3;if(f){let ut=0,ct=H*ut;for(let Tt=0;Tt<Y;Tt++){let xt=Bt[Tt];we(xt[2]+ct,xt[1]+ct,xt[0]+ct)}ut=h+m*2,ct=H*ut;for(let Tt=0;Tt<Y;Tt++){let xt=Bt[Tt];we(xt[0]+ct,xt[1]+ct,xt[2]+ct)}}else{for(let ut=0;ut<Y;ut++){let ct=Bt[ut];we(ct[2],ct[1],ct[0])}for(let ut=0;ut<Y;ut++){let ct=Bt[ut];we(ct[0]+H*h,ct[1]+H*h,ct[2]+H*h)}}i.addGroup(Q,s.length/3-Q,0)}function Ft(){let Q=s.length/3,ut=0;yt(z,ut),ut+=z.length;for(let ct=0,Tt=D.length;ct<Tt;ct++){let xt=D[ct];yt(xt,ut),ut+=xt.length}i.addGroup(Q,s.length/3-Q,1)}function yt(Q,ut){let ct=Q.length;for(;--ct>=0;){let Tt=ct,xt=ct-1;xt<0&&(xt=Q.length-1);for(let Kt=0,Lt=h+m*2;Kt<Lt;Kt++){let re=H*Kt,le=H*(Kt+1),pe=ut+Tt+re,U=ut+xt+re,ze=ut+xt+le,ie=ut+Tt+le;zt(pe,U,ze,ie)}}}function kt(Q,ut,ct){c.push(Q),c.push(ut),c.push(ct)}function we(Q,ut,ct){ee(Q),ee(ut),ee(ct);let Tt=s.length/3,xt=v.generateTopUV(i,s,Tt-3,Tt-2,Tt-1);se(xt[0]),se(xt[1]),se(xt[2])}function zt(Q,ut,ct,Tt){ee(Q),ee(ut),ee(Tt),ee(ut),ee(ct),ee(Tt);let xt=s.length/3,Kt=v.generateSideWallUV(i,s,xt-6,xt-3,xt-2,xt-1);se(Kt[0]),se(Kt[1]),se(Kt[3]),se(Kt[1]),se(Kt[2]),se(Kt[3])}function ee(Q){s.push(c[Q*3+0]),s.push(c[Q*3+1]),s.push(c[Q*3+2])}function se(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return u0(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ho[s.type]().fromJSON(s)),new n(i,t.options)}},h0={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new et(r,a),new et(o,c),new et(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],d=t[i*3+2],f=t[s*3],u=t[s*3+1],p=t[s*3+2],x=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new et(a,1-c),new et(l,1-d),new et(f,1-p),new et(x,1-g)]:[new et(o,1-c),new et(h,1-d),new et(u,1-p),new et(m,1-g)]}};function u0(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var fn=class n extends ko{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Yi=class n extends Te{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=t/o,f=e/c,u=[],p=[],x=[],m=[];for(let g=0;g<h;g++){let v=g*f-a;for(let M=0;M<l;M++){let y=M*d-r;p.push(y,-v,0),x.push(0,0,1),m.push(M/o),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<o;v++){let M=v+l*g,y=v+l*(g+1),w=v+1+l*(g+1),E=v+1+l*g;u.push(M,y,E),u.push(y,w,E)}this.setIndex(u),this.setAttribute("position",new oe(p,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},ss=class n extends Te{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],c=[],l=[],h=[],d=t,f=(e-t)/s,u=new P,p=new et;for(let x=0;x<=s;x++){for(let m=0;m<=i;m++){let g=r+m/i*a;u.x=d*Math.cos(g),u.y=d*Math.sin(g),c.push(u.x,u.y,u.z),l.push(0,0,1),p.x=(u.x/e+1)/2,p.y=(u.y/e+1)/2,h.push(p.x,p.y)}d+=f}for(let x=0;x<s;x++){let m=x*(i+1);for(let g=0;g<i;g++){let v=g+m,M=v,y=v+i+1,w=v+i+2,E=v+1;o.push(M,y,E),o.push(y,w,E)}}this.setIndex(o),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var rs=class n extends Te{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],d=new P,f=new P,u=[],p=[],x=[],m=[];for(let g=0;g<=i;g++){let v=[],M=g/i,y=a+M*o,w=t*Math.cos(y),E=Math.sqrt(t*t-w*w),_=0;g===0&&a===0?_=.5/e:g===i&&c===Math.PI&&(_=-.5/e);for(let S=0;S<=e;S++){let R=S/e,C=s+R*r;d.x=-E*Math.cos(C),d.y=w,d.z=E*Math.sin(C),p.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),m.push(R+_,1-M),v.push(l++)}h.push(v)}for(let g=0;g<i;g++)for(let v=0;v<e;v++){let M=h[g][v+1],y=h[g][v],w=h[g+1][v],E=h[g+1][v+1];(g!==0||a>0)&&u.push(M,y,E),(g!==i-1||c<Math.PI)&&u.push(y,w,E)}this.setIndex(u),this.setAttribute("position",new oe(p,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Zr=class n extends Te{constructor(t=new Vr(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,c=new P,l=new et,h=new P,d=[],f=[],u=[],p=[];x(),this.setIndex(p),this.setAttribute("position",new oe(d,3)),this.setAttribute("normal",new oe(f,3)),this.setAttribute("uv",new oe(u,2));function x(){for(let M=0;M<e;M++)m(M);m(r===!1?e:0),v(),g()}function m(M){h=t.getPointAt(M/e,h);let y=a.normals[M],w=a.binormals[M];for(let E=0;E<=s;E++){let _=E/s*Math.PI*2,S=Math.sin(_),R=-Math.cos(_);c.x=R*y.x+S*w.x,c.y=R*y.y+S*w.y,c.z=R*y.z+S*w.z,c.normalize(),f.push(c.x,c.y,c.z),o.x=h.x+i*c.x,o.y=h.y+i*c.y,o.z=h.z+i*c.z,d.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=e;M++)for(let y=1;y<=s;y++){let w=(s+1)*(M-1)+(y-1),E=(s+1)*M+(y-1),_=(s+1)*M+y,S=(s+1)*(M-1)+y;p.push(w,E,S),p.push(E,_,S)}}function v(){for(let M=0;M<=e;M++)for(let y=0;y<=s;y++)l.x=M/e,l.y=y/s,u.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new Ho[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ds(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Kd(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Kd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function di(n){let t={};for(let e=0;e<n.length;e++){let i=ds(n[e]);for(let s in i)t[s]=i[s]}return t}function Kd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function d0(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Vh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}var xn={clone:ds,merge:di},f0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Pe=class extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=f0,this.fragmentShader=p0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ds(t.uniforms),this.uniformsGroups=d0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new qt().setHex(s.value);break;case"v2":this.uniforms[i].value=new et().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Re().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Yt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new ye().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ys=class extends Pe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},de=class extends qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gc,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Vo=class extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Wo=class extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Ls(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function mo(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Dn=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Xo=class extends Dn{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:dh,endingEnd:dh}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case fh:r=t,o=2*e-i;break;case ph:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case fh:a=t,c=2*i-e;break;case ph:a=1,c=i+s[1]-s[0];break;default:a=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,p=(i-e)/(s-e),x=p*p,m=x*p,g=-f*m+2*f*x-f*p,v=(1+f)*m+(-1.5-2*f)*x+(-.5+f)*p+1,M=(-1-u)*m+(1.5+u)*x+.5*p,y=u*m-u*x;for(let w=0;w!==o;++w)r[w]=g*a[h+w]+v*a[l+w]+M*a[c+w]+y*a[d+w];return r}},qo=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(i-e)/(s-e),d=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*h;return r}},Yo=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$o=class extends Dn{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(i-e)/(s-e),x=1-p;for(let m=0;m!==o;++m)r[m]=a[l+m]*x+a[c+m]*p;return r}let f=o*2,u=t-1;for(let p=0;p!==o;++p){let x=a[l+p],m=a[c+p],g=u*f+p*2,v=d[g],M=d[g+1],y=t*f+p*2,w=h[y],E=h[y+1],_=g0(i,e,v,w,s);r[p]=Jf(_,x,M,E,m)}return r}};function Jf(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function m0(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function g0(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Jf(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let c=m0(r,t,e,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Ci=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ls(e,this.TimeBufferType),this.values=Ls(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Ls(t.times,Array),values:Ls(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),mo(t.settings)&&(i.settings={inTangents:Ls(t.settings.inTangents,Array),outTangents:Ls(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Yo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new qo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new $o(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Er:e=this.InterpolantFactoryMethodDiscrete;break;case Co:e=this.InterpolantFactoryMethodLinear;break;case xo:e=this.InterpolantFactoryMethodSmooth;break;case uh:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Gt("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Er;case this.InterpolantFactoryMethodLinear:return Co;case this.InterpolantFactoryMethodSmooth:return xo;case this.InterpolantFactoryMethodBezier:return uh}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t;mo(this.settings)&&(jd(this.settings.inTangents,t),jd(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;mo(this.settings)&&(Qd(this.settings.inTangents,t),Qd(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Vt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Vt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&ym(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Vt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===xo,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let d=o*i,f=d-i,u=d+i;for(let p=0;p!==i;++p){let x=e[d+p];if(x!==e[f+p]||x!==e[u+p]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let d=o*i,f=a*i;for(let u=0;u!==i;++u)e[f+u]=e[d+u]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,mo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function jd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function Qd(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Ci.prototype.ValueTypeName="";Ci.prototype.TimeBufferType=Float32Array;Ci.prototype.ValueBufferType=Float32Array;Ci.prototype.DefaultInterpolation=Co;var Nn=class extends Ci{constructor(t,e,i){super(t,e,i)}};Nn.prototype.ValueTypeName="bool";Nn.prototype.ValueBufferType=Array;Nn.prototype.DefaultInterpolation=Er;Nn.prototype.InterpolantFactoryMethodLinear=void 0;Nn.prototype.InterpolantFactoryMethodSmooth=void 0;var Zo=class extends Ci{constructor(t,e,i,s){super(t,e,i,s)}};Zo.prototype.ValueTypeName="color";var Jo=class extends Ci{constructor(t,e,i,s){super(t,e,i,s)}};Jo.prototype.ValueTypeName="number";var Ko=class extends Dn{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)Xi.slerpFlat(r,0,a,l-o,a,l,c);return r}},Jr=class extends Ci{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new Ko(this.times,this.values,this.getValueSize(),t)}};Jr.prototype.ValueTypeName="quaternion";Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Un=class extends Ci{constructor(t,e,i){super(t,e,i)}};Un.prototype.ValueTypeName="string";Un.prototype.ValueBufferType=Array;Un.prototype.DefaultInterpolation=Er;Un.prototype.InterpolantFactoryMethodLinear=void 0;Un.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends Ci{constructor(t,e,i,s){super(t,e,i,s)}};jo.prototype.ValueTypeName="vector";var Qo=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=l.length;d<f;d+=2){let u=l[d],p=l[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Kf=new Qo,tc=class{constructor(t){this.manager=t!==void 0?t:Kf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};tc.DEFAULT_MATERIAL_NAME="__DEFAULT";var $s=class extends ti{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Zs=class extends $s{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ti.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},hh=new ye,tf=new P,ef=new P,Kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.mapType=bi,this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ln,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;tf.setFromMatrixPosition(t.matrixWorld),e.position.copy(tf),ef.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ef),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){hh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(hh,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Os||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(hh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},go=new P,_o=new Xi,Gi=new P,jr=class extends ti{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=Ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(go,_o,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,_o,Gi.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(go,_o,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,_o,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Rn=new P,nf=new et,sf=new et,ni=class extends jr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ro*2*Math.atan(Math.tan(Bl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,nf,sf),e.subVectors(sf,nf)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var vh=class extends Kr{constructor(){super(new ni(90,1,.5,500)),this.isPointLightShadow=!0}},$i=class extends $s{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new vh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},as=class extends jr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yh=class extends Kr{constructor(){super(new as(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fn=class extends $s{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ti.DEFAULT_UP),this.updateMatrix(),this.target=new ti,this.shadow=new yh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Ds=-90,Ns=1,Js=class extends ti{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ni(Ds,Ns,t,e);s.layers=this.layers,this.add(s);let r=new ni(Ds,Ns,t,e);r.layers=this.layers,this.add(r);let a=new ni(Ds,Ns,t,e);a.layers=this.layers,this.add(a);let o=new ni(Ds,Ns,t,e);o.layers=this.layers,this.add(o);let c=new ni(Ds,Ns,t,e);c.layers=this.layers,this.add(c);let l=new ni(Ds,Ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Ii)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Os)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.mipmapsAutoUpdate=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,f,u),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}},ec=class extends ni{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}},Qr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=_0.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function _0(){this._document.hidden===!1&&this.reset()}var Wh="\\[\\]\\.:\\/",x0=new RegExp("["+Wh+"]","g"),Xh="[^"+Wh+"]",v0="[^"+Wh.replace("\\.","")+"]",y0=/((?:WC+[\/:])*)/.source.replace("WC",Xh),S0=/(WCOD+)?/.source.replace("WCOD",v0),M0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xh),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xh),T0=new RegExp("^"+y0+S0+M0+b0+"$"),E0=["material","materials","bones","map"],Sh=class{constructor(t,e,i){let s=i||Ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ae=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(t){let e=T0.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);E0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=i(o.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Vt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ae.Composite=Sh;Ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ae.prototype.GetterByBindingType=[Ae.prototype._getValue_direct,Ae.prototype._getValue_array,Ae.prototype._getValue_arrayElement,Ae.prototype._getValue_toArray];Ae.prototype.SetterByBindingTypeAndVersioning=[[Ae.prototype._setValue_direct,Ae.prototype._setValue_direct_setNeedsUpdate,Ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_array,Ae.prototype._setValue_array_setNeedsUpdate,Ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_arrayElement,Ae.prototype._setValue_arrayElement_setNeedsUpdate,Ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ae.prototype._setValue_fromArray,Ae.prototype._setValue_fromArray_setNeedsUpdate,Ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ly=new Float32Array(1);var Kh=class Kh{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};Kh.prototype.isMatrix2=!0;var Mh=Kh;function qh(n,t,e,i){let s=w0(i);switch(e){case Nh:return n*t;case Fh:return n*t/s.components*s.byteLength;case lc:return n*t/s.components*s.byteLength;case On:return n*t*2/s.components*s.byteLength;case hc:return n*t*2/s.components*s.byteLength;case Uh:return n*t*3/s.components*s.byteLength;case Hi:return n*t*4/s.components*s.byteLength;case uc:return n*t*4/s.components*s.byteLength;case oa:case ca:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case la:case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fc:case mc:return Math.max(n,16)*Math.max(t,8)/4;case dc:case pc:return Math.max(n,8)*Math.max(t,8)/2;case gc:case _c:case vc:case yc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case xc:case ua:case Sc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case bc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case wc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Pc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ic:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Lc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Nc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Fc:case kc:case Oc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Bc:case zc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case da:case Hc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function w0(n){switch(n){case bi:case Ph:return{byteLength:1,components:1};case tr:case Ih:case oi:return{byteLength:2,components:1};case oc:case cc:return{byteLength:2,components:4};case Bi:case ac:case zi:return{byteLength:4,components:1};case Lh:case Dh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function vp(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function C0(n){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),o.onUploadCallback();let u;if(l instanceof Float32Array)u=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?u=n.HALF_FLOAT:u=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=n.SHORT;else if(l instanceof Uint32Array)u=n.UNSIGNED_INT;else if(l instanceof Int32Array)u=n.INT;else if(l instanceof Int8Array)u=n.BYTE;else if(l instanceof Uint8Array)u=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){let h=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,h);else{d.sort((u,p)=>u.start-p.start);let f=0;for(let u=1;u<d.length;u++){let p=d[f],x=d[u];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++f,d[f]=x)}d.length=f+1;for(let u=0,p=d.length;u<p;u++){let x=d[u];n.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var R0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,P0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,I0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,L0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,D0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,U0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,F0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,k0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,O0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,B0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,H0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,G0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,V0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,W0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,X0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Y0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,J0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,K0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,j0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Q0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",rg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ag=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ug=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_g=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,yg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Eg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pg=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ug=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Og=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gg=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,t_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,e_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,n_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,s_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,o_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,l_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,u_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,d_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,f_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,p_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,g_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,__=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,x_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,M_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,b_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,A_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,C_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,R_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I_=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,U_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,F_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,k_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,B_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,G_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,V_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Y_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Z_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,J_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,K_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ex=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,nx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:R0,alphahash_pars_fragment:P0,alphamap_fragment:I0,alphamap_pars_fragment:L0,alphatest_fragment:D0,alphatest_pars_fragment:N0,aomap_fragment:U0,aomap_pars_fragment:F0,batching_pars_vertex:k0,batching_vertex:O0,begin_vertex:B0,beginnormal_vertex:z0,bsdfs:H0,iridescence_fragment:G0,bumpmap_pars_fragment:V0,clipping_planes_fragment:W0,clipping_planes_pars_fragment:X0,clipping_planes_pars_vertex:q0,clipping_planes_vertex:Y0,color_fragment:$0,color_pars_fragment:Z0,color_pars_vertex:J0,color_vertex:K0,common:j0,defaultnormal_vertex:Q0,displacementmap_pars_vertex:tg,displacementmap_vertex:eg,emissivemap_fragment:ig,emissivemap_pars_fragment:ng,colorspace_fragment:sg,colorspace_pars_fragment:rg,envmap_fragment:ag,envmap_common_pars_fragment:og,envmap_pars_fragment:cg,envmap_pars_vertex:lg,envmap_physical_pars_fragment:yg,envmap_vertex:hg,fog_vertex:ug,fog_pars_vertex:dg,fog_fragment:fg,fog_pars_fragment:pg,gradientmap_pars_fragment:mg,lightmap_pars_fragment:gg,lights_lambert_fragment:_g,lights_lambert_pars_fragment:xg,lights_pars_begin:vg,lights_toon_fragment:Sg,lights_toon_pars_fragment:Mg,lights_phong_fragment:bg,lights_phong_pars_fragment:Tg,lights_physical_fragment:Eg,lights_physical_pars_fragment:wg,lights_fragment_begin:Ag,lights_fragment_maps:Cg,lights_fragment_end:Rg,lightprobes_pars_fragment:Pg,logdepthbuf_fragment:Ig,logdepthbuf_pars_fragment:Lg,logdepthbuf_pars_vertex:Dg,logdepthbuf_vertex:Ng,map_fragment:Ug,map_pars_fragment:Fg,map_particle_fragment:kg,map_particle_pars_fragment:Og,metalnessmap_fragment:Bg,metalnessmap_pars_fragment:zg,morphinstance_vertex:Hg,morphcolor_vertex:Gg,morphnormal_vertex:Vg,morphtarget_pars_vertex:Wg,morphtarget_vertex:Xg,normal_fragment_begin:qg,normal_fragment_maps:Yg,normal_pars_fragment:$g,normal_pars_vertex:Zg,normal_vertex:Jg,normalmap_pars_fragment:Kg,clearcoat_normal_fragment_begin:jg,clearcoat_normal_fragment_maps:Qg,clearcoat_pars_fragment:t_,iridescence_pars_fragment:e_,opaque_fragment:i_,packing:n_,premultiplied_alpha_fragment:s_,project_vertex:r_,dithering_fragment:a_,dithering_pars_fragment:o_,roughnessmap_fragment:c_,roughnessmap_pars_fragment:l_,shadowmap_pars_fragment:h_,shadowmap_pars_vertex:u_,shadowmap_vertex:d_,shadowmask_pars_fragment:f_,skinbase_vertex:p_,skinning_pars_vertex:m_,skinning_vertex:g_,skinnormal_vertex:__,specularmap_fragment:x_,specularmap_pars_fragment:v_,tonemapping_fragment:y_,tonemapping_pars_fragment:S_,transmission_fragment:M_,transmission_pars_fragment:b_,uv_pars_fragment:T_,uv_pars_vertex:E_,uv_vertex:w_,worldpos_vertex:A_,background_vert:C_,background_frag:R_,backgroundCube_vert:P_,backgroundCube_frag:I_,cube_vert:L_,cube_frag:D_,depth_vert:N_,depth_frag:U_,distance_vert:F_,distance_frag:k_,equirect_vert:O_,equirect_frag:B_,linedashed_vert:z_,linedashed_frag:H_,meshbasic_vert:G_,meshbasic_frag:V_,meshlambert_vert:W_,meshlambert_frag:X_,meshmatcap_vert:q_,meshmatcap_frag:Y_,meshnormal_vert:$_,meshnormal_frag:Z_,meshphong_vert:J_,meshphong_frag:K_,meshphysical_vert:j_,meshphysical_frag:Q_,meshtoon_vert:tx,meshtoon_frag:ex,points_vert:ix,points_frag:nx,shadow_vert:sx,shadow_frag:rx,sprite_vert:ax,sprite_frag:ox},Mt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Ki={basic:{uniforms:di([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:di([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:di([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:di([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:di([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:di([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:di([Mt.points,Mt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:di([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:di([Mt.common,Mt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:di([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:di([Mt.sprite,Mt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:di([Mt.common,Mt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:di([Mt.lights,Mt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Ki.physical={uniforms:di([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Yt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var Wc={r:0,b:0,g:0},cx=new ye,yp=new Yt;yp.set(-1,0,0,0,1,0,0,0,1);function lx(n,t,e,i,s,r){let a=new qt(0),o=s===!0?0:1,c,l,h=null,d=0,f=null;function u(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){let y=v.backgroundBlurriness>0;M=t.get(M,y)}return M}function p(v){let M=!1,y=u(v);y===null?m(a,o):y&&y.isColor&&(m(y,1),M=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,M){let y=u(M);y&&y.isCubeTexture?(l===void 0&&(l=new Jt(new si(1,1,1),new Pe({name:"BackgroundCubeMaterial",uniforms:ds(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yp),l.material.toneMapped=ne.getTransfer(y.colorSpace)!==me,(h!==y||d!==y.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,f=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Jt(new Yi(2,2),new Pe({name:"BackgroundMaterial",uniforms:ds(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ne.getTransfer(y.colorSpace)!==me,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,f=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,M){v.getRGB(Wc,Vh(n)),e.buffers.color.setClear(Wc.r,Wc.g,Wc.b,M,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:p,addToRenderList:x,dispose:g}}function hx(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(D,F,G,L,z){let X=!1,H=d(D,L,G,F);r!==H&&(r=H,l(r.object)),X=u(D,L,G,z),X&&p(D,L,G,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,y(D,F,G,L),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return n.createVertexArray()}function l(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function d(D,F,G,L){let z=L.wireframe===!0,X=i[F.id];X===void 0&&(X={},i[F.id]=X);let H=D.isInstancedMesh===!0?D.id:0,it=X[H];it===void 0&&(it={},X[H]=it);let W=it[G.id];W===void 0&&(W={},it[G.id]=W);let j=W[z];return j===void 0&&(j=f(c()),W[z]=j),j}function f(D){let F=[],G=[],L=[];for(let z=0;z<e;z++)F[z]=0,G[z]=0,L[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:L,object:D,attributes:{},index:null}}function u(D,F,G,L){let z=r.attributes,X=F.attributes,H=0,it=G.getAttributes();for(let W in it)if(it[W].location>=0){let tt=z[W],Et=X[W];if(Et===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(Et=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(Et=D.instanceColor)),tt===void 0||tt.attribute!==Et||Et&&tt.data!==Et.data)return!0;H++}return r.attributesNum!==H||r.index!==L}function p(D,F,G,L){let z={},X=F.attributes,H=0,it=G.getAttributes();for(let W in it)if(it[W].location>=0){let tt=X[W];tt===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(tt=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(tt=D.instanceColor));let Et={};Et.attribute=tt,tt&&tt.data&&(Et.data=tt.data),z[W]=Et,H++}r.attributes=z,r.attributesNum=H,r.index=L}function x(){let D=r.newAttributes;for(let F=0,G=D.length;F<G;F++)D[F]=0}function m(D){g(D,0)}function g(D,F){let G=r.newAttributes,L=r.enabledAttributes,z=r.attributeDivisors;G[D]=1,L[D]===0&&(n.enableVertexAttribArray(D),L[D]=1),z[D]!==F&&(n.vertexAttribDivisor(D,F),z[D]=F)}function v(){let D=r.newAttributes,F=r.enabledAttributes;for(let G=0,L=F.length;G<L;G++)F[G]!==D[G]&&(n.disableVertexAttribArray(G),F[G]=0)}function M(D,F,G,L,z,X,H){H===!0?n.vertexAttribIPointer(D,F,G,z,X):n.vertexAttribPointer(D,F,G,L,z,X)}function y(D,F,G,L){x();let z=L.attributes,X=G.getAttributes(),H=F.defaultAttributeValues;for(let it in X){let W=X[it];if(W.location>=0){let j=z[it];if(j===void 0&&(it==="instanceMatrix"&&D.instanceMatrix&&(j=D.instanceMatrix),it==="instanceColor"&&D.instanceColor&&(j=D.instanceColor)),j!==void 0){let tt=j.normalized,Et=j.itemSize,Bt=t.get(j);if(Bt===void 0)continue;let Y=Bt.buffer,vt=Bt.type,wt=Bt.bytesPerElement,Ft=vt===n.INT||vt===n.UNSIGNED_INT||j.gpuType===ac;if(j.isInterleavedBufferAttribute){let yt=j.data,kt=yt.isInterleavedBuffer===!0?yt.stride:yt.itemSize,we=j.offset;if(yt.isInstancedInterleavedBuffer||yt.isInstancedBufferAttribute){for(let zt=0;zt<W.locationSize;zt++)g(W.location+zt,yt.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let zt=0;zt<W.locationSize;zt++)m(W.location+zt);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let zt=0;zt<W.locationSize;zt++)M(W.location+zt,Et/W.locationSize,vt,tt,kt*wt,(we+Et/W.locationSize*zt)*wt,Ft)}else{if(j.isInstancedBufferAttribute){for(let yt=0;yt<W.locationSize;yt++)g(W.location+yt,j.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let yt=0;yt<W.locationSize;yt++)m(W.location+yt);n.bindBuffer(n.ARRAY_BUFFER,Y);for(let yt=0;yt<W.locationSize;yt++)M(W.location+yt,Et/W.locationSize,vt,tt,Et*wt,Et/W.locationSize*yt*wt,Ft)}}else if(H!==void 0){let tt=H[it];if(tt!==void 0)switch(tt.length){case 2:n.vertexAttrib2fv(W.location,tt);break;case 3:n.vertexAttrib3fv(W.location,tt);break;case 4:n.vertexAttrib4fv(W.location,tt);break;default:n.vertexAttrib1fv(W.location,tt)}}}}v()}function w(){R();for(let D in i){let F=i[D];for(let G in F){let L=F[G];for(let z in L){let X=L[z];for(let H in X)h(X[H].object),delete X[H];delete L[z]}}delete i[D]}}function E(D){if(i[D.id]===void 0)return;let F=i[D.id];for(let G in F){let L=F[G];for(let z in L){let X=L[z];for(let H in X)h(X[H].object),delete X[H];delete L[z]}}delete i[D.id]}function _(D){for(let F in i){let G=i[F];for(let L in G){let z=G[L];if(z[D.id]===void 0)continue;let X=z[D.id];for(let H in X)h(X[H].object),delete X[H];delete z[D.id]}}}function S(D){for(let F in i){let G=i[F],L=D.isInstancedMesh===!0?D.id:0,z=G[L];if(z!==void 0){for(let X in z){let H=z[X];for(let it in H)h(H[it].object),delete H[it];delete z[X]}delete G[L],Object.keys(G).length===0&&delete i[F]}}}function R(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:_,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function ux(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),e.update(l,i,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let f=0;for(let u=0;u<h;u++)f+=l[u];e.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function dx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let _=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==Hi&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){let S=_===oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==bi&&_!==zi&&!S&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Gt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Gt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,maxSamples:w,samples:E}}function fx(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Oi,o=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||i!==0||s;return s=f,i=d.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,u){let p=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,g=n.get(d);if(!s||p===null||p.length===0||r&&!m)r?h(null):l();else{let v=r?0:i,M=v*4,y=g.clippingState||null;c.value=y,y=h(p,f,M,u);for(let w=0;w!==M;++w)y[w]=e[w];g.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,f,u,p){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,p!==!0||m===null){let g=u+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,y=u;M!==x;++M,y+=4)a.copy(d[M]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var ma=class extends Xe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new si(5,5,5),r=new Pe({name:"CubemapFromEquirect",uniforms:ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ai,blending:pn});r.uniforms.tEquirect.value=e;let a=new Jt(s,r),o=e.minFilter;return e.minFilter===mn&&(e.minFilter=xi),new Js(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},jf=256,px=3,mx=20,Sp=256,Mp=16,gx=3,_x=new P,xx=new qt,qc=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Js(1,10,null),this._boxMesh=new Jt(new si(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=_x}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=c.autoClear,f=c.autoClearColor,u=c.autoClearDepth,p=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(xx));let m=new Js(i,s,h);return m.position.copy(o),m.update(c,t),c.autoClear=d,c.autoClearColor=f,c.autoClearDepth=u,c.autoClearStencil=p,t.background=x,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ep(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(jf,Hf(t))}_fromTexture(t,e){t.mapping===hs||t.mapping===Qs?this._setSize(t.image.length===0?jf:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Qf(t,!1,!1),i=Math.log2(t)-px;for(let s=0;s<=i;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Qf(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===hs||t.mapping===Qs?(this._cubemapMaterial===null&&(this._cubemapMaterial=ep()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=tp()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=vx(),this._integrationMaterial=yx());let e=this._cubeSize,i=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Mp);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-gx)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let c=o>0?Math.log2(e)+.5*Math.log2(6/(Sp*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Sx());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,i),s.envMap.value=t.texture,this._renderCube(r,0,i)}};function Qf(n,t,e){return new ma(n,{minFilter:mn,generateMipmaps:t,type:oi,colorSpace:wr,depthBuffer:e})}function ga(n,t,e){return new Pe({name:n,uniforms:t,vertexShader:te.cube_vert,fragmentShader:e,side:ai,blending:pn,depthTest:!1,depthWrite:!1})}function vx(){return ga("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Sp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function yx(){return ga("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Mp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Sx(){return ga("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${mx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function tp(){return ga("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ep(){return ga("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Mx(n){let t=new WeakMap,e=new WeakMap,i=null;function s(f,u=!1){return f==null?null:u?a(f):r(f)}function r(f){if(f&&f.isTexture){let u=f.mapping;if(u===nc||u===sc)if(t.has(f)){let p=t.get(f).texture;return o(p,f.mapping)}else{let p=f.image;if(p&&p.height>0){let x=new ma(p.height);return x.fromEquirectangularTexture(n,f),t.set(f,x),f.addEventListener("dispose",l),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let u=f.mapping,p=u===nc||u===sc,x=u===hs||u===Qs;if(p||x){let m=e.get(f),g=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new qc(n)),m=p?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{let v=f.image;return p&&v&&v.height>0||x&&v&&c(v)?(i===null&&(i=new qc(n)),m=p?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",h),m.texture):null}}}return f}function o(f,u){return u===nc?f.mapping=hs:u===sc&&(f.mapping=Qs),f}function c(f){let u=0,p=6;for(let x=0;x<p;x++)f[x]!==void 0&&u++;return u===p}function l(f){let u=f.target;u.removeEventListener("dispose",l);let p=t.get(u);p!==void 0&&(t.delete(u),p.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let p=e.get(u);p!==void 0&&(e.delete(u),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function bx(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Mr("WebGLRenderer: "+i+" extension not supported."),s}}}function Tx(n,t,e,i){let s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){c(p.target)}function c(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);let x=r.get(p);x&&(t.remove(x),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function l(p,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),e.memory.geometries++),x}function h(p){let x=p.attributes;for(let m in x)t.update(x[m],n.ARRAY_BUFFER)}function d(p){let x=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let v=x!==null?x.array.length:m.array.length/3-1,M=m.count>=65535?Nr:Dr,y=new M(Math.ceil(v/3)*6,1),w=y.array;if(x!==null){let _=x.array;g=x.version;for(let S=0,R=0;S<v;S+=3){let C=_[S+0],D=_[S+1],F=_[S+2];w[R++]=C,w[R++]=D,w[R++]=D,w[R++]=F,w[R++]=F,w[R++]=C}}else{g=m.version;for(let _=0,S=0;_<v;_+=3){let R=_+0,C=_+1,D=_+2;w[S++]=R,w[S++]=C,w[S++]=C,w[S++]=D,w[S++]=D,w[S++]=R}}y.version=g;let E=r.get(p);E&&t.remove(E),r.set(p,y)}function f(p){let x=r.get(p);if(x){let m=p.index;m!==null&&x.version<m.version&&d(p)}else d(p);return r.get(p)}function u(){for(let p in s){let x=s[p].deref();x!==void 0&&c(x)}}return{get:l,update:h,getWireframeAttribute:f,dispose:u}}function Ex(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){n.drawElements(i,f,r,d*a),e.update(f,i,1)}function l(d,f,u){u!==0&&(n.drawElementsInstanced(i,f,r,d*a,u),e.update(f,i,u))}function h(d,f,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,u);let x=0;for(let m=0;m<u;m++)x+=f[m];e.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function wx(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Vt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Ax(n,t,e){let i=new WeakMap,s=new Re;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=i.get(o);if(f===void 0||f.count!==d){let R=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",R)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],M=0;u===!0&&(M=1),p===!0&&(M=2),x===!0&&(M=3);let y=o.attributes.position.count*M,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let E=new Float32Array(y*w*4*d),_=new Pr(E,y,w,d);_.type=zi,_.needsUpdate=!0;let S=M*4;for(let C=0;C<d;C++){let D=m[C],F=g[C],G=v[C],L=y*w*4*C;for(let z=0;z<D.count;z++){let X=z*S;u===!0&&(s.fromBufferAttribute(D,z),E[L+X+0]=s.x,E[L+X+1]=s.y,E[L+X+2]=s.z,E[L+X+3]=0),p===!0&&(s.fromBufferAttribute(F,z),E[L+X+4]=s.x,E[L+X+5]=s.y,E[L+X+6]=s.z,E[L+X+7]=0),x===!0&&(s.fromBufferAttribute(G,z),E[L+X+8]=s.x,E[L+X+9]=s.y,E[L+X+10]=s.z,E[L+X+11]=G.itemSize===4?s.w:1)}}f={count:d,texture:_,size:new et(y,w)},i.set(o,f),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let u=0;for(let x=0;x<l.length;x++)u+=l[x];let p=o.morphTargetsRelative?1:1-u;c.getUniforms().setValue(n,"morphTargetBaseInfluence",p),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Cx(n,t,e,i,s){let r=new WeakMap;function a(l){let h=s.render.frame,d=l.geometry,f=t.get(l,d);if(r.get(f)!==h&&(t.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let u=l.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return f}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Rx={[ta]:"LINEAR_TONE_MAPPING",[ea]:"REINHARD_TONE_MAPPING",[ia]:"CINEON_TONE_MAPPING",[ls]:"ACES_FILMIC_TONE_MAPPING",[sa]:"AGX_TONE_MAPPING",[ra]:"NEUTRAL_TONE_MAPPING",[na]:"CUSTOM_TONE_MAPPING"};function Px(n,t,e,i,s,r){let a=new Xe(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new Te;h.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new oe([0,2,0,0,2,0],2));let d=new Ys({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Jt(h,d),u=new as(-1,1,1,-1,0,1),p=null,x=null,m=!1,g,v=null,M=[],y=!1;this.setSize=function(w,E){a.setSize(w,E),o!==null&&o.setSize(w,E),c!==null&&c.setSize(w,E);for(let _=0;_<M.length;_++){let S=M[_];S.setSize&&S.setSize(w,E)}},this.setEffects=function(w){M=w,y=M.length>0&&M[0].isRenderPass===!0;let E=a.width,_=a.height;M.length>0&&o===null&&(o=new Xe(E,_,{type:oi,depthBuffer:!1,stencilBuffer:!1}),c=new Xe(E,_,{type:oi,depthBuffer:!1,stencilBuffer:!1}));let S=s===!0&&M.some(R=>R.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&l===null&&(l=new dn(E,_),r===!0&&(l.format=gn,l.type=us)),a.dispose(),a.depthTexture=S?l:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let R=0;R<M.length;R++){let C=M[R];C.setSize&&C.setSize(E,_),S&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(l)}},this.begin=function(w,E){if(m||w.toneMapping===Zi&&M.length===0)return!1;if(v=E,E!==null){let _=E.width,S=E.height;(a.width!==_||a.height!==S)&&this.setSize(_,S)}return y===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=Zi,!0},this.hasRenderPass=function(){return y},this.end=function(w,E){w.toneMapping=g,m=!0;let _=a,S=o;for(let R=0;R<M.length;R++){let C=M[R];C.enabled!==!1&&(C.render(w,S,_,E),C.needsSwap!==!1&&(_=S,S=S===o?c:o))}if(p!==w.outputColorSpace||x!==w.toneMapping){p=w.outputColorSpace,x=w.toneMapping,d.defines={},ne.getTransfer(p)===me&&(d.defines.SRGB_TRANSFER="");let R=Rx[x];R&&(d.defines[R]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=_.texture,w.setRenderTarget(v),w.render(f,u),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),d.dispose()}}var bp=new vi,Tp=new dn(1,1),Ep=new Or(1),wp=new Pr,Ap=new Lo,Cp=new kr,ip=[],np=[],sp=new Float32Array(16),rp=new Float32Array(9),ap=new Float32Array(4);function ir(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=ip[s];if(r===void 0&&(r=new Float32Array(s),ip[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ye(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function $e(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function $c(n,t){let e=np[t];e===void 0&&(e=new Int32Array(t),np[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ix(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Lx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;n.uniform2fv(this.addr,t),$e(e,t)}}function Dx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ye(e,t))return;n.uniform3fv(this.addr,t),$e(e,t)}}function Nx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;n.uniform4fv(this.addr,t),$e(e,t)}}function Ux(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ye(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,i))return;ap.set(i),n.uniformMatrix2fv(this.addr,!1,ap),$e(e,i)}}function Fx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ye(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,i))return;rp.set(i),n.uniformMatrix3fv(this.addr,!1,rp),$e(e,i)}}function kx(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ye(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(Ye(e,i))return;sp.set(i),n.uniformMatrix4fv(this.addr,!1,sp),$e(e,i)}}function Ox(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Bx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;n.uniform2iv(this.addr,t),$e(e,t)}}function zx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;n.uniform3iv(this.addr,t),$e(e,t)}}function Hx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;n.uniform4iv(this.addr,t),$e(e,t)}}function Gx(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Vx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ye(e,t))return;n.uniform2uiv(this.addr,t),$e(e,t)}}function Wx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ye(e,t))return;n.uniform3uiv(this.addr,t),$e(e,t)}}function Xx(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ye(e,t))return;n.uniform4uiv(this.addr,t),$e(e,t)}}function Zc(n){return n.version===0&&(n.compareFunction=Bh,n.needsUpdate=!0),n}function qx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=Zc(Tp):r=bp,e.setTexture2D(t||r,s)}function Yx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Ap,s)}function $x(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=Zc(Ep):r=Cp,e.setTextureCube(t||r,s)}function Zx(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||wp,s)}function Jx(n){switch(n){case 5126:return Ix;case 35664:return Lx;case 35665:return Dx;case 35666:return Nx;case 35674:return Ux;case 35675:return Fx;case 35676:return kx;case 5124:case 35670:return Ox;case 35667:case 35671:return Bx;case 35668:case 35672:return zx;case 35669:case 35673:return Hx;case 5125:return Gx;case 36294:return Vx;case 36295:return Wx;case 36296:return Xx;case 35678:case 36198:case 36298:case 36306:case 35682:return qx;case 35679:case 36299:case 36307:return Yx;case 35680:case 36300:case 36308:case 36293:return $x;case 36289:case 36303:case 36311:case 36292:return Zx}}function Kx(n,t){n.uniform1fv(this.addr,t)}function jx(n,t){let e=ir(t,this.size,2);n.uniform2fv(this.addr,e)}function Qx(n,t){let e=ir(t,this.size,3);n.uniform3fv(this.addr,e)}function tv(n,t){let e=ir(t,this.size,4);n.uniform4fv(this.addr,e)}function ev(n,t){let e=ir(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function iv(n,t){let e=ir(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function nv(n,t){let e=ir(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function sv(n,t){n.uniform1iv(this.addr,t)}function rv(n,t){n.uniform2iv(this.addr,t)}function av(n,t){n.uniform3iv(this.addr,t)}function ov(n,t){n.uniform4iv(this.addr,t)}function cv(n,t){n.uniform1uiv(this.addr,t)}function lv(n,t){n.uniform2uiv(this.addr,t)}function hv(n,t){n.uniform3uiv(this.addr,t)}function uv(n,t){n.uniform4uiv(this.addr,t)}function dv(n,t,e){let i=this.cache,s=t.length,r=$c(e,s);Ye(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Zc(Tp):a=bp;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function fv(n,t,e){let i=this.cache,s=t.length,r=$c(e,s);Ye(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Ap,r[a])}function pv(n,t,e){let i=this.cache,s=t.length,r=$c(e,s);Ye(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=Zc(Ep):a=Cp;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function mv(n,t,e){let i=this.cache,s=t.length,r=$c(e,s);Ye(i,r)||(n.uniform1iv(this.addr,r),$e(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||wp,r[a])}function gv(n){switch(n){case 5126:return Kx;case 35664:return jx;case 35665:return Qx;case 35666:return tv;case 35674:return ev;case 35675:return iv;case 35676:return nv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return av;case 35669:case 35673:return ov;case 5125:return cv;case 36294:return lv;case 36295:return hv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return dv;case 35679:case 36299:case 36307:return fv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}var tu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Jx(e.type)}},eu=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=gv(e.type)}},iu=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},jh=/(\w+)(\])?(\[|\.)?/g;function op(n,t){n.seq.push(t),n.map[t.id]=t}function _v(n,t,e){let i=n.name,s=i.length;for(jh.lastIndex=0;;){let r=jh.exec(i),a=jh.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){op(e,l===void 0?new tu(o,n,t):new eu(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new iu(o),op(e,d)),e=d}}}var er=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);_v(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function cp(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var xv=37297,vv=0;function yv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var lp=new Yt;function Sv(n){ne._getMatrix(lp,ne.workingColorSpace,n);let t=`mat3( ${lp.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(n)){case Ar:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function hp(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+yv(n.getShaderSource(t),o)}else return r}function Mv(n,t){let e=Sv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var bv={[ta]:"Linear",[ea]:"Reinhard",[ia]:"Cineon",[ls]:"ACESFilmic",[sa]:"AgX",[ra]:"Neutral",[na]:"Custom"};function Tv(n,t){let e=bv[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Xc=new P;function Ev(){ne.getLuminanceCoefficients(Xc);let n=Xc.x.toFixed(4),t=Xc.y.toFixed(4),e=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function Av(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Cv(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function pa(n){return n!==""}function up(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function dp(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rv=/^[ \t]*#include +<([\w\d./]+)>/gm;function nu(n){return n.replace(Rv,Pv)}function Pv(n,t){let e=te[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return nu(e)}var Iv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fp(n){return n.replace(Iv,Lv)}function Lv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pp(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Dv={[os]:"SHADOWMAP_TYPE_PCF",[Ks]:"SHADOWMAP_TYPE_VSM"};function Nv(n){return Dv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Uv={[Qs]:"ENVMAP_MODE_REFRACTION"};function Fv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Uv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var kv={[Ch]:"ENVMAP_BLENDING_MULTIPLY",[wf]:"ENVMAP_BLENDING_MIX",[Af]:"ENVMAP_BLENDING_ADD"};function Ov(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":kv[n.combine]||"ENVMAP_BLENDING_NONE"}function Bv(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=Nv(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Fv(e),d=Ov(e),f=wv(e),u=Av(r),p=s.createProgram(),x,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(pa).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(pa).join(`
`),m.length>0&&(m+=`
`)):(x=[pp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),m=[pp(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zi?"#define TONE_MAPPING":"",e.toneMapping!==Zi?te.tonemapping_pars_fragment:"",e.toneMapping!==Zi?Tv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,Mv("linearToOutputTexel",e.outputColorSpace),Ev(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pa).join(`
`)),a=nu(a),a=up(a,e),a=dp(a,e),o=nu(o),o=up(o,e),o=dp(o,e),a=fp(a),o=fp(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===Hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=g+x+a,M=g+m+o,y=cp(s,s.VERTEX_SHADER,v),w=cp(s,s.FRAGMENT_SHADER,M);s.attachShader(p,y),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function E(C){if(n.debug.checkShaderErrors){let D=s.getProgramInfoLog(p)||"",F=s.getShaderInfoLog(y)||"",G=s.getShaderInfoLog(w)||"",L=D.trim(),z=F.trim(),X=G.trim(),H=!0,it=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,y,w);else{let W=hp(s,y,"vertex"),j=hp(s,w,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+L+`
`+W+`
`+j)}else L!==""?Gt("WebGLProgram: Program Info Log:",L):(z===""||X==="")&&(it=!1);it&&(C.diagnostics={runnable:H,programLog:L,vertexShader:{log:z,prefix:x},fragmentShader:{log:X,prefix:m}})}s.deleteShader(y),s.deleteShader(w),_=new er(s,p),S=Cv(s,p)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(p,xv)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vv++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=y,this.fragmentShader=w,this}var zv=0,su=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new ru(t),e.set(t,i)),i}},ru=class{constructor(t){this.id=zv++,this.code=t,this.usedTimes=0}};function Hv(n){return n===On||n===ua||n===da}function Gv(n,t,e,i,s,r){let a=new Ir,o=new su,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(_){return c.add(_),_===0?"uv":`uv${_}`}function p(_,S,R,C,D,F){let G=C.fog,L=D.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,H=t.get(_.envMap||z,X),it=f[_.type],W=i.precision;_.precision!==null&&(W=i.getMaxPrecision(_.precision),W!==_.precision&&Gt("WebGLProgram.getParameters:",_.precision,"not supported, using",W,"instead."));let j=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,tt=j!==void 0?j.length:0,Et=0;L.morphAttributes.position!==void 0&&(Et=1),L.morphAttributes.normal!==void 0&&(Et=2),L.morphAttributes.color!==void 0&&(Et=3);let Bt,Y,vt,wt;if(it){let St=Ki[it];Bt=St.vertexShader,Y=St.fragmentShader}else{Bt=_.vertexShader,Y=_.fragmentShader;let St=o.getVertexShaderStage(_),_e=o.getFragmentShaderStage(_);o.update(_,St,_e),vt=St.id,wt=_e.id}let Ft=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),kt=D.isInstancedMesh===!0,we=D.isBatchedMesh===!0,zt=!!_.map,ee=!!_.matcap,se=!!H,Q=se&&H.isPMREMTexture===!0,ut=!!_.aoMap,ct=!!_.lightMap,Tt=!!_.bumpMap&&_.wireframe===!1,xt=!!_.normalMap,Kt=!!_.displacementMap,Lt=!!_.emissiveMap,re=!!_.metalnessMap,le=!!_.roughnessMap,pe=_.anisotropy>0,U=_.clearcoat>0,ze=_.diffuseRoughness>0,ie=_.dispersion>0,xe=_.retroreflectivity>0,mt=_.iridescence>0,Ue=_.sheen>0,Ot=_.transmission>0,Xt=pe&&!!_.anisotropyMap,A=U&&!!_.clearcoatMap,b=U&&!!_.clearcoatNormalMap,O=U&&!!_.clearcoatRoughnessMap,rt=ze&&!!_.diffuseRoughnessMap,K=mt&&!!_.iridescenceMap,lt=mt&&!!_.iridescenceThicknessMap,gt=Ue&&!!_.sheenColorMap,$=Ue&&!!_.sheenRoughnessMap,Z=!!_.specularMap,dt=!!_.specularColorMap,I=!!_.specularIntensityMap,J=Ot&&!!_.transmissionMap,q=Ot&&!!_.thicknessMap,ft=!!_.gradientMap,ot=!!_.alphaMap,ht=_.alphaTest>0,Nt=!!_.alphaHash,Qt=!!_.extensions,at=Zi;_.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&(at=n.toneMapping);let Ut=Q?H.isCompressedCubeTexture?H.image[0].mipmaps:H.mipmaps:null,jt={shaderID:it,shaderType:_.type,shaderName:_.name,vertexShader:Bt,fragmentShader:Y,defines:_.defines,customVertexShaderID:vt,customFragmentShaderID:wt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:W,batching:we,batchingColor:we&&D._colorsTexture!==null,instancing:kt,instancingColor:kt&&D.instanceColor!==null,instancingMorph:kt&&D.morphTexture!==null,outputColorSpace:Ft===null?n.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:zt,matcap:ee,envMap:se,envMapMode:se&&H.mapping,envMapPMREM:Q,envMapMaxLod:Q?Ut.length-1:null,envMapSize:Q?Ut[0].width:null,aoMap:ut,lightMap:ct,bumpMap:Tt,normalMap:xt,displacementMap:Kt,emissiveMap:Lt,normalMapObjectSpace:xt&&_.normalMapType===Pf,normalMapTangentSpace:xt&&_.normalMapType===Gc,packedNormalMap:xt&&_.normalMapType===Gc&&Hv(_.normalMap.format),metalnessMap:re,roughnessMap:le,anisotropy:pe,anisotropyMap:Xt,clearcoat:U,clearcoatMap:A,clearcoatNormalMap:b,clearcoatRoughnessMap:O,diffuseRoughness:ze,diffuseRoughnessMap:rt,dispersion:ie,retroreflection:xe,iridescence:mt,iridescenceMap:K,iridescenceThicknessMap:lt,sheen:Ue,sheenColorMap:gt,sheenRoughnessMap:$,specularMap:Z,specularColorMap:dt,specularIntensityMap:I,transmission:Ot,transmissionMap:J,thicknessMap:q,gradientMap:ft,opaque:_.transparent===!1&&_.blending===js&&_.alphaToCoverage===!1,alphaMap:ot,alphaTest:ht,alphaHash:Nt,combine:_.combine,mapUv:zt&&u(_.map.channel),aoMapUv:ut&&u(_.aoMap.channel),lightMapUv:ct&&u(_.lightMap.channel),bumpMapUv:Tt&&u(_.bumpMap.channel),normalMapUv:xt&&u(_.normalMap.channel),displacementMapUv:Kt&&u(_.displacementMap.channel),emissiveMapUv:Lt&&u(_.emissiveMap.channel),metalnessMapUv:re&&u(_.metalnessMap.channel),roughnessMapUv:le&&u(_.roughnessMap.channel),anisotropyMapUv:Xt&&u(_.anisotropyMap.channel),clearcoatMapUv:A&&u(_.clearcoatMap.channel),clearcoatNormalMapUv:b&&u(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:O&&u(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:rt&&u(_.diffuseRoughnessMap.channel),iridescenceMapUv:K&&u(_.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&u(_.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&u(_.sheenColorMap.channel),sheenRoughnessMapUv:$&&u(_.sheenRoughnessMap.channel),specularMapUv:Z&&u(_.specularMap.channel),specularColorMapUv:dt&&u(_.specularColorMap.channel),specularIntensityMapUv:I&&u(_.specularIntensityMap.channel),transmissionMapUv:J&&u(_.transmissionMap.channel),thicknessMapUv:q&&u(_.thicknessMap.channel),alphaMapUv:ot&&u(_.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(xt||pe),vertexNormals:!!L.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(zt||ot),fog:!!G,useFog:_.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||L.attributes.normal===void 0&&xt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:yt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:Et,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:F.filter(St=>St.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:at,decodeVideoTexture:zt&&_.map.isVideoTexture===!0&&ne.getTransfer(_.map.colorSpace)===me,decodeVideoTextureEmissive:Lt&&_.emissiveMap.isVideoTexture===!0&&ne.getTransfer(_.emissiveMap.colorSpace)===me,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===qe,flipSided:_.side===ai,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Qt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&_.extensions.multiDraw===!0||we)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return jt.vertexUv1s=c.has(1),jt.vertexUv2s=c.has(2),jt.vertexUv3s=c.has(3),c.clear(),jt}function x(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)S.push(R),S.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(m(S,_),g(S,_),S.push(n.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function m(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapPMREM),_.push(S.envMapMaxLod),_.push(S.envMapSize),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.diffuseRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.numLightProbeGrids),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function g(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function v(_){let S=f[_.type],R;if(S){let C=Ki[S];R=xn.clone(C.uniforms)}else R=_.uniforms;return R}function M(_,S){let R=h.get(S);return R!==void 0?++R.usedTimes:(R=new Bv(n,S,_,s),l.push(R),h.set(S,R)),R}function y(_){if(--_.usedTimes===0){let S=l.indexOf(_);l[S]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function E(){o.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:v,acquireProgram:M,releaseProgram:y,releaseShaderCache:w,programs:l,dispose:E}}function Vv(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Wv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function mp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function gp(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function o(f,u,p,x,m,g){let v=n[t];return v===void 0?(v={id:f.id,object:f,geometry:u,material:p,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:m,group:g},n[t]=v):(v.id=f.id,v.object=f,v.geometry=u,v.material=p,v.materialVariant=a(f),v.groupOrder=x,v.renderOrder=f.renderOrder,v.z=m,v.group=g),t++,v}function c(f,u,p,x,m,g,v){v.reversedDepth===!0&&(m=-m);let M=o(f,u,p,x,m,g);p.transmission>0?i.push(M):p.transparent===!0?s.push(M):e.push(M)}function l(f,u,p,x,m,g){let v=o(f,u,p,x,m,g);p.transmission>0?i.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function h(f,u){e.length>1&&e.sort(f||Wv),i.length>1&&i.sort(u||mp),s.length>1&&s.sort(u||mp)}function d(){for(let f=t,u=n.length;f<u;f++){let p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function Xv(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new gp,n.set(i,[a])):s>=r.length?(a=new gp,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function qv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new qt};break;case"SpotLight":e={position:new P,direction:new P,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function Yv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var $v=0;function Zv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Jv(n){let t=new qv,e=Yv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new P);let s=new P,r=new ye,a=new ye;function o(l){let h=0,d=0,f=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let u=0,p=0,x=0,m=0,g=0,v=0,M=0,y=0,w=0,E=0,_=0,S=0,R=0,C=0;l.sort(Zv);for(let F=0,G=l.length;F<G;F++){let L=l[F],z=L.color,X=L.intensity,H=L.distance,it=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===On?it=L.shadow.map.texture:it=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=z.r*X,d+=z.g*X,f+=z.b*X;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],X);C++}else if(L.isSunLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let j=L.shadow,tt=e.get(L);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[p]=tt,i.sunShadowMap[p]=it;let Et=j.getViewportCount();for(let Bt=0;Bt<Et;Bt++)i.sunShadowMatrix[x+Bt]=j.getMatrix(Bt),i.sunShadowCascade[x+Bt]=j._cascadeData[Bt];x+=Et,p++}i.sun[u]=W,u++}else if(L.isDirectionalLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let j=L.shadow,tt=e.get(L);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,i.directionalShadow[m]=tt,i.directionalShadowMap[m]=it,i.directionalShadowMatrix[m]=L.shadow.matrix,w++}i.directional[m]=W,m++}else if(L.isSpotLight){let W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(z).multiplyScalar(X),W.distance=H,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[v]=W;let j=L.shadow;if(L.map&&(i.spotLightMap[S]=L.map,S++,j.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[v]=j.matrix,L.castShadow){let tt=e.get(L);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,i.spotShadow[v]=tt,i.spotShadowMap[v]=it,_++}v++}else if(L.isRectAreaLight){let W=t.get(L);W.color.copy(z).multiplyScalar(X),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[M]=W,M++}else if(L.isPointLight){let W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){let j=L.shadow,tt=e.get(L);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,tt.shadowCameraNear=j.camera.near,tt.shadowCameraFar=j.camera.far,i.pointShadow[g]=tt,i.pointShadowMap[g]=it,i.pointShadowMatrix[g]=L.shadow.matrix,E++}i.point[g]=W,g++}else if(L.isHemisphereLight){let W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(X),W.groundColor.copy(L.groundColor).multiplyScalar(X),i.hemi[y]=W,y++}}M>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=f;let D=i.hash;(D.sunLength!==u||D.directionalLength!==m||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==M||D.hemiLength!==y||D.numSunShadows!==p||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==_||D.numSpotMaps!==S||D.numLightProbes!==C)&&(i.sun.length=u,i.directional.length=m,i.spot.length=v,i.rectArea.length=M,i.point.length=g,i.hemi.length=y,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+S-R,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=C,D.sunLength=u,D.directionalLength=m,D.pointLength=g,D.spotLength=v,D.rectAreaLength=M,D.hemiLength=y,D.numSunShadows=p,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=_,D.numSpotMaps=S,D.numLightProbes=C,i.version=$v++)}function c(l,h){let d=0,f=0,u=0,p=0,x=0,m=0,g=h.matrixWorldInverse;for(let v=0,M=l.length;v<M;v++){let y=l[v];if(y.isSunLight){let w=i.sun[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),d++}else if(y.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),f++}else if(y.isSpotLight){let w=i.spot[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),p++}else if(y.isRectAreaLight){let w=i.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let w=i.point[u];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),u++}else if(y.isHemisphereLight){let w=i.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),m++}}}return{setup:o,setupView:c,state:i}}function _p(n){let t=new Jv(n),e=[],i=[],s=[];function r(d){h.camera=d,e.length=0,i.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):e.push(d)}function o(d){i.push(d)}function c(){t.setup(e),s.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function l(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Kv(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new _p(n),t.set(s,[o])):r>=a.length?(o=new _p(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var jv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ty=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],ey=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],xp=new ye,fa=new P,Qh=new P;function iy(n,t,e){let i=new Ln,s=new et,r=new et,a=new Re,o=new Vo,c=new Wo,l={},h=e.maxTextureSize,d={[kn]:ai,[ai]:kn,[qe]:qe},f=new Pe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:jv,fragmentShader:Qv}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let p=new Te;p.setAttribute("position",new Fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Jt(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=os;let g=this.type;this.render=function(E,_,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===of&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=os);let R=n.getRenderTarget(),C=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(pn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=g!==this.type;G&&_.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(z=>z.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,z=E.length;L<z;L++){let X=E[L],H=X.shadow;if(H===void 0){Gt("WebGLShadowMap:",X,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let it=H.getFrameExtents();s.multiply(it),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,H.mapSize.y=r.y));let W=n.state.buffers.depth.getReversed();if(H.camera._reversedDepth=W,H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Ks){if(X.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Xe(s.x,s.y,{format:On,type:oi,minFilter:xi,magFilter:xi,generateMipmaps:!1}),H.map.texture.name=X.name+".shadowMap",H.map.depthTexture=new dn(s.x,s.y,zi),H.map.depthTexture.name=X.name+".shadowMapDepth",H.map.depthTexture.format=ln,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Qe,H.map.depthTexture.magFilter=Qe}else X.isPointLight?(H.map=new ma(s.x),H.map.depthTexture=new Or(s.x,Bi)):(H.map=new Xe(s.x,s.y),H.map.depthTexture=new dn(s.x,s.y,Bi)),H.map.depthTexture.name=X.name+".shadowMap",H.map.depthTexture.format=ln,this.type===os?(H.map.depthTexture.compareFunction=W?Oh:kh,H.map.depthTexture.minFilter=xi,H.map.depthTexture.magFilter=xi):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Qe,H.map.depthTexture.magFilter=Qe);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==s.x||H.map.height!==s.y)&&H.map.setSize(s.x,s.y);let j=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();X.isPointLight!==!0&&H.updateMatrices(X,S);let tt=(H.camera.layers.mask&4294967294)!==0?H.camera.layers:S.layers;for(let Et=0;Et<j;Et++){let Bt=H.getCamera(Et);if(X.isPointLight){let Y=H.camera,vt=H.matrix,wt=X.distance||Y.far;wt!==Y.far&&(Y.far=wt,Y.updateProjectionMatrix()),fa.setFromMatrixPosition(X.matrixWorld),Y.position.copy(fa),Qh.copy(Y.position),Qh.add(ty[Et]),Y.up.copy(ey[Et]),Y.lookAt(Qh),Y.updateMatrixWorld(),vt.makeTranslation(-fa.x,-fa.y,-fa.z),xp.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),H._frustum.setFromProjectionMatrix(xp,Y.coordinateSystem,Y.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)n.setRenderTarget(H.map,Et),n.clear();else{Et===0&&(n.setRenderTarget(H.map),n.clear());let Y=H.getViewport(Et);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),F.viewport(a)}i=H.getFrustum(Et),y(_,S,Bt,X,tt,this.type)}H.isPointLightShadow!==!0&&this.type===Ks&&v(H,S),H.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(R,C,D)};function v(E,_){let S=t.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null?E.mapPass=new Xe(s.x,s.y,{format:On,type:oi}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(_,null,S,f,x,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(_,null,S,u,x,null)}function M(E,_,S,R){let C=null,D=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)C=D;else if(C=S.isPointLight===!0?c:o,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let F=C.uuid,G=_.uuid,L=l[F];L===void 0&&(L={},l[F]=L);let z=L[G];z===void 0&&(z=C.clone(),L[G]=z,_.addEventListener("dispose",w)),C=z}if(C.visible=_.visible,C.wireframe=_.wireframe,R===Ks?C.side=_.shadowSide!==null?_.shadowSide:_.side:C.side=_.shadowSide!==null?_.shadowSide:d[_.side],C.alphaMap=_.alphaMap,C.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,C.map=_.map,C.clipShadows=_.clipShadows,C.clippingPlanes=_.clippingPlanes,C.clipIntersection=_.clipIntersection,C.displacementMap=_.displacementMap,C.displacementScale=_.displacementScale,C.displacementBias=_.displacementBias,C.wireframeLinewidth=_.wireframeLinewidth,C.linewidth=_.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let F=n.properties.get(C);F.light=S}return C}function y(E,_,S,R,C,D){if(E.visible===!1)return;if(E.layers.test(C)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Ks)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);let L=t.update(E),z=E.material;if(Array.isArray(z)){let X=L.groups;for(let H=0,it=X.length;H<it;H++){let W=X[H],j=z[W.materialIndex];if(j&&j.visible){let tt=M(E,j,R,D);E.onBeforeShadow(n,E,_,S,L,tt,W),n.renderBufferDirect(S,null,L,tt,E,W),E.onAfterShadow(n,E,_,S,L,tt,W)}}}else if(z.visible){let X=M(E,z,R,D);E.onBeforeShadow(n,E,_,S,L,X,null),n.renderBufferDirect(S,null,L,X,E,null),E.onAfterShadow(n,E,_,S,L,X,null)}}let G=E.children;for(let L=0,z=G.length;L<z;L++)y(G[L],_,S,R,C,D)}function w(E){E.target.removeEventListener("dispose",w);for(let S in l){let R=l[S],C=E.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}function ny(n,t){function e(){let I=!1,J=new Re,q=null,ft=new Re(0,0,0,0);return{setMask:function(ot){q!==ot&&!I&&(n.colorMask(ot,ot,ot,ot),q=ot)},setLocked:function(ot){I=ot},setClear:function(ot,ht,Nt,Qt,at){at===!0&&(ot*=Qt,ht*=Qt,Nt*=Qt),J.set(ot,ht,Nt,Qt),ft.equals(J)===!1&&(n.clearColor(ot,ht,Nt,Qt),ft.copy(J))},reset:function(){I=!1,q=null,ft.set(-1,0,0,0)}}}function i(){let I=!1,J=!1,q=null,ft=null,ot=null;return{setReversed:function(ht){if(J!==ht){let Nt=t.get("EXT_clip_control");ht?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),J=ht;let Qt=ot;ot=null,this.setClear(Qt)}},getReversed:function(){return J},setTest:function(ht){ht?yt(n.DEPTH_TEST):kt(n.DEPTH_TEST)},setMask:function(ht){q!==ht&&!I&&(n.depthMask(ht),q=ht)},setFunc:function(ht){if(J&&(ht=zf[ht]),ft!==ht){switch(ht){case yo:n.depthFunc(n.NEVER);break;case So:n.depthFunc(n.ALWAYS);break;case Mo:n.depthFunc(n.LESS);break;case Fs:n.depthFunc(n.LEQUAL);break;case bo:n.depthFunc(n.EQUAL);break;case To:n.depthFunc(n.GEQUAL);break;case Eo:n.depthFunc(n.GREATER);break;case wo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=ht}},setLocked:function(ht){I=ht},setClear:function(ht){ot!==ht&&(ot=ht,J&&(ht=1-ht),n.clearDepth(ht))},reset:function(){I=!1,q=null,ft=null,ot=null,J=!1}}}function s(){let I=!1,J=null,q=null,ft=null,ot=null,ht=null,Nt=null,Qt=null,at=null;return{setTest:function(Ut){I||(Ut?yt(n.STENCIL_TEST):kt(n.STENCIL_TEST))},setMask:function(Ut){J!==Ut&&!I&&(n.stencilMask(Ut),J=Ut)},setFunc:function(Ut,jt,St){(q!==Ut||ft!==jt||ot!==St)&&(n.stencilFunc(Ut,jt,St),q=Ut,ft=jt,ot=St)},setOp:function(Ut,jt,St){(ht!==Ut||Nt!==jt||Qt!==St)&&(n.stencilOp(Ut,jt,St),ht=Ut,Nt=jt,Qt=St)},setLocked:function(Ut){I=Ut},setClear:function(Ut){at!==Ut&&(n.clearStencil(Ut),at=Ut)},reset:function(){I=!1,J=null,q=null,ft=null,ot=null,ht=null,Nt=null,Qt=null,at=null}}}let r=new e,a=new i,o=new s,c={},l=new WeakMap,h={},d={},f={},u=new WeakMap,p=[],x=null,m=!1,g=null,v=null,M=null,y=null,w=null,E=null,_=null,S=new qt(0,0,0),R=0,C=!1,D=null,F=null,G=null,L=null,z=null,X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,it=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(W)[1]),H=it>=1):W.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),H=it>=2);let j=null,tt={},Et=n.getParameter(n.SCISSOR_BOX),Bt=n.getParameter(n.VIEWPORT),Y=new Re().fromArray(Et),vt=new Re().fromArray(Bt);function wt(I,J,q,ft){let ot=new Uint8Array(4),ht=n.createTexture();n.bindTexture(I,ht),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Nt=0;Nt<q;Nt++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(J,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,ot):n.texImage2D(J+Nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ot);return ht}let Ft={};Ft[n.TEXTURE_2D]=wt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ft[n.TEXTURE_CUBE_MAP]=wt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ft[n.TEXTURE_2D_ARRAY]=wt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ft[n.TEXTURE_3D]=wt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),yt(n.DEPTH_TEST),a.setFunc(Fs),Tt(!1),xt(bh),yt(n.CULL_FACE),ut(pn);function yt(I){h[I]!==!0&&(n.enable(I),h[I]=!0)}function kt(I){h[I]!==!1&&(n.disable(I),h[I]=!1)}function we(I,J){return f[I]!==J?(n.bindFramebuffer(I,J),f[I]=J,I===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=J),I===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=J),!0):!1}function zt(I,J){let q=p,ft=!1;if(I){q=u.get(J),q===void 0&&(q=[],u.set(J,q));let ot=I.textures;if(q.length!==ot.length||q[0]!==n.COLOR_ATTACHMENT0){for(let ht=0,Nt=ot.length;ht<Nt;ht++)q[ht]=n.COLOR_ATTACHMENT0+ht;q.length=ot.length,ft=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,ft=!0);ft&&n.drawBuffers(q)}function ee(I){return x!==I?(n.useProgram(I),x=I,!0):!1}let se={[cs]:n.FUNC_ADD,[lf]:n.FUNC_SUBTRACT,[hf]:n.FUNC_REVERSE_SUBTRACT};se[uf]=n.MIN,se[df]=n.MAX;let Q={[ff]:n.ZERO,[pf]:n.ONE,[mf]:n.SRC_COLOR,[wh]:n.SRC_ALPHA,[Sf]:n.SRC_ALPHA_SATURATE,[vf]:n.DST_COLOR,[_f]:n.DST_ALPHA,[gf]:n.ONE_MINUS_SRC_COLOR,[Ah]:n.ONE_MINUS_SRC_ALPHA,[yf]:n.ONE_MINUS_DST_COLOR,[xf]:n.ONE_MINUS_DST_ALPHA,[Mf]:n.CONSTANT_COLOR,[bf]:n.ONE_MINUS_CONSTANT_COLOR,[Tf]:n.CONSTANT_ALPHA,[Ef]:n.ONE_MINUS_CONSTANT_ALPHA};function ut(I,J,q,ft,ot,ht,Nt,Qt,at,Ut){if(I===pn){m===!0&&(kt(n.BLEND),m=!1);return}if(m===!1&&(yt(n.BLEND),m=!0),I!==cf){if(I!==g||Ut!==C){if((v!==cs||w!==cs)&&(n.blendEquation(n.FUNC_ADD),v=cs,w=cs),Ut)switch(I){case js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ei:n.blendFunc(n.ONE,n.ONE);break;case Th:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Eh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Vt("WebGLState: Invalid blending: ",I);break}else switch(I){case js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ei:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Th:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Eh:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",I);break}M=null,y=null,E=null,_=null,S.set(0,0,0),R=0,g=I,C=Ut}return}ot=ot||J,ht=ht||q,Nt=Nt||ft,(J!==v||ot!==w)&&(n.blendEquationSeparate(se[J],se[ot]),v=J,w=ot),(q!==M||ft!==y||ht!==E||Nt!==_)&&(n.blendFuncSeparate(Q[q],Q[ft],Q[ht],Q[Nt]),M=q,y=ft,E=ht,_=Nt),(Qt.equals(S)===!1||at!==R)&&(n.blendColor(Qt.r,Qt.g,Qt.b,at),S.copy(Qt),R=at),g=I,C=!1}function ct(I,J){I.side===qe?kt(n.CULL_FACE):yt(n.CULL_FACE);let q=I.side===ai;J&&(q=!q),Tt(q),I.blending===js&&I.transparent===!1?ut(pn):ut(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);let ft=I.stencilWrite;o.setTest(ft),ft&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Lt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?yt(n.SAMPLE_ALPHA_TO_COVERAGE):kt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(I){D!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),D=I)}function xt(I){I!==rf?(yt(n.CULL_FACE),I!==F&&(I===bh?n.cullFace(n.BACK):I===af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):kt(n.CULL_FACE),F=I}function Kt(I){I!==G&&(H&&n.lineWidth(I),G=I)}function Lt(I,J,q){I?(yt(n.POLYGON_OFFSET_FILL),(L!==J||z!==q)&&(L=J,z=q,a.getReversed()&&(J=-J,q=-q),n.polygonOffset(J,q))):kt(n.POLYGON_OFFSET_FILL)}function re(I){I?yt(n.SCISSOR_TEST):kt(n.SCISSOR_TEST)}function le(I){I===void 0&&(I=n.TEXTURE0+X-1),j!==I&&(n.activeTexture(I),j=I)}function pe(I,J,q){q===void 0&&(j===null?q=n.TEXTURE0+X-1:q=j);let ft=tt[q];ft===void 0&&(ft={type:void 0,texture:void 0},tt[q]=ft),(ft.type!==I||ft.texture!==J)&&(j!==q&&(n.activeTexture(q),j=q),n.bindTexture(I,J||Ft[I]),ft.type=I,ft.texture=J)}function U(){let I=tt[j];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ze(){try{n.compressedTexImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function ie(){try{n.compressedTexImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function xe(){try{n.texSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function mt(){try{n.texSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Ue(){try{n.compressedTexSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Ot(){try{n.compressedTexSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Xt(){try{n.texStorage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function A(){try{n.texStorage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function b(){try{n.texImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function O(){try{n.texImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function rt(I){return d[I]!==void 0?d[I]:n.getParameter(I)}function K(I,J){d[I]!==J&&(n.pixelStorei(I,J),d[I]=J)}function lt(I){Y.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Y.copy(I))}function gt(I){vt.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),vt.copy(I))}function $(I,J){let q=l.get(J);q===void 0&&(q=new WeakMap,l.set(J,q));let ft=q.get(I);ft===void 0&&(ft=n.getUniformBlockIndex(J,I.name),n.uniformBlockBinding(J,ft,ft),q.set(I,ft))}function Z(I,J,q){let ot=l.get(J).get(I);c[ot]!==q&&(n.bindBufferBase(n.UNIFORM_BUFFER,ot,q),c[ot]=q)}function dt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,tt={},f={},c={},u=new WeakMap,p=[],x=null,m=!1,g=null,v=null,M=null,y=null,w=null,E=null,_=null,S=new qt(0,0,0),R=0,C=!1,D=null,F=null,G=null,L=null,z=null,Y.set(0,0,n.canvas.width,n.canvas.height),vt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:yt,disable:kt,bindFramebuffer:we,drawBuffers:zt,useProgram:ee,setBlending:ut,setMaterial:ct,setFlipSided:Tt,setCullFace:xt,setLineWidth:Kt,setPolygonOffset:Lt,setScissorTest:re,activeTexture:le,bindTexture:pe,unbindTexture:U,compressedTexImage2D:ze,compressedTexImage3D:ie,texImage2D:b,texImage3D:O,pixelStorei:K,getParameter:rt,updateUBOMapping:$,uniformBlockBinding:Z,texStorage2D:Xt,texStorage3D:A,texSubImage2D:xe,texSubImage3D:mt,compressedTexSubImage2D:Ue,compressedTexSubImage3D:Ot,scissor:lt,viewport:gt,reset:dt}}function sy(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new et,h=new WeakMap,d=new Set,f,u=new WeakMap,p=new Set,x=new FinalizationRegistry(A=>p.delete(A)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,b){return m?new OffscreenCanvas(A,b):Cr("canvas")}function v(A,b,O){let rt=1,K=Xt(A);if((K.width>O||K.height>O)&&(rt=O/Math.max(K.width,K.height)),rt<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let lt=Math.floor(rt*K.width),gt=Math.floor(rt*K.height);f===void 0&&(f=g(lt,gt));let $=b?g(lt,gt):f;return $.width=lt,$.height=gt,$.getContext("2d").drawImage(A,0,0,lt,gt),Gt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+lt+"x"+gt+")."),$}else return"data"in A&&Gt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function M(A){return A.generateMipmaps}function y(A){n.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(A,b,O,rt,K,lt=!1){if(A!==null){if(n[A]!==void 0)return n[A];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let gt;rt&&(gt=t.get("EXT_texture_norm16"),gt||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=b;if(b===n.RED&&(O===n.FLOAT&&($=n.R32F),O===n.HALF_FLOAT&&($=n.R16F),O===n.UNSIGNED_BYTE&&($=n.R8),O===n.UNSIGNED_SHORT&&gt&&($=gt.R16_EXT),O===n.SHORT&&gt&&($=gt.R16_SNORM_EXT)),b===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.R8UI),O===n.UNSIGNED_SHORT&&($=n.R16UI),O===n.UNSIGNED_INT&&($=n.R32UI),O===n.BYTE&&($=n.R8I),O===n.SHORT&&($=n.R16I),O===n.INT&&($=n.R32I)),b===n.RG&&(O===n.FLOAT&&($=n.RG32F),O===n.HALF_FLOAT&&($=n.RG16F),O===n.UNSIGNED_BYTE&&($=n.RG8),O===n.UNSIGNED_SHORT&&gt&&($=gt.RG16_EXT),O===n.SHORT&&gt&&($=gt.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RG8UI),O===n.UNSIGNED_SHORT&&($=n.RG16UI),O===n.UNSIGNED_INT&&($=n.RG32UI),O===n.BYTE&&($=n.RG8I),O===n.SHORT&&($=n.RG16I),O===n.INT&&($=n.RG32I)),b===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGB8UI),O===n.UNSIGNED_SHORT&&($=n.RGB16UI),O===n.UNSIGNED_INT&&($=n.RGB32UI),O===n.BYTE&&($=n.RGB8I),O===n.SHORT&&($=n.RGB16I),O===n.INT&&($=n.RGB32I)),b===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGBA8UI),O===n.UNSIGNED_SHORT&&($=n.RGBA16UI),O===n.UNSIGNED_INT&&($=n.RGBA32UI),O===n.BYTE&&($=n.RGBA8I),O===n.SHORT&&($=n.RGBA16I),O===n.INT&&($=n.RGBA32I)),b===n.RGB&&(O===n.UNSIGNED_SHORT&&gt&&($=gt.RGB16_EXT),O===n.SHORT&&gt&&($=gt.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),b===n.RGBA){let Z=lt?Ar:ne.getTransfer(K);O===n.FLOAT&&($=n.RGBA32F),O===n.HALF_FLOAT&&($=n.RGBA16F),O===n.UNSIGNED_BYTE&&($=Z===me?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&gt&&($=gt.RGBA16_EXT),O===n.SHORT&&gt&&($=gt.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(A,b){let O;return A?b===null||b===Bi||b===us?O=n.DEPTH24_STENCIL8:b===zi?O=n.DEPTH32F_STENCIL8:b===tr&&(O=n.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Bi||b===us?O=n.DEPTH_COMPONENT24:b===zi?O=n.DEPTH_COMPONENT32F:b===tr&&(O=n.DEPTH_COMPONENT16),O}function S(A,b){return M(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qe&&A.minFilter!==xi?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function R(A){let b=new WeakRef(A);i.get(A).__ref=b,p.add(b),x.register(A,b,b)}function C(A){let b=i.get(A).__ref;b!==void 0&&(p.delete(b),x.unregister(b))}function D(A){G(A.target)}function F(A){L(A.target)}function G(A){A.removeEventListener("dispose",D),C(A),X(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&d.delete(A)}function L(A){A.removeEventListener("dispose",F),C(A),it(A)}function z(){for(let A of p){let b=A.deref();b!==void 0&&(b.isRenderTarget===!0?L(b):G(b))}p.clear(),d.clear()}function X(A){let b=i.get(A);if(b.__webglInit===void 0)return;let O=A.source,rt=u.get(O);if(rt){let K=rt[b.__cacheKey];K.usedTimes--,K.usedTimes===0&&H(A),Object.keys(rt).length===0&&u.delete(O)}i.remove(A)}function H(A){let b=i.get(A);n.deleteTexture(b.__webglTexture);let O=A.source,rt=u.get(O);delete rt[b.__cacheKey],a.memory.textures--}function it(A){let b=i.get(A);b.__depthDisposeCallback&&b.__depthDisposeCallback();let O=A.depthTexture;if(O&&O.renderTarget===A&&G(O),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let lt=0;lt<b.__webglFramebuffer[K].length;lt++)n.deleteFramebuffer(b.__webglFramebuffer[K][lt]);else n.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)n.deleteFramebuffer(b.__webglFramebuffer[K]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let rt=A.textures;for(let K=0,lt=rt.length;K<lt;K++){let gt=i.get(rt[K]);gt.__webglTexture&&(n.deleteTexture(gt.__webglTexture),a.memory.textures--),i.remove(rt[K])}i.remove(A)}let W=0;function j(){W=0}function tt(){return W}function Et(A){W=A}function Bt(){let A=W;return A>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,A}function Y(A){let b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.mipmapsAutoUpdate),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function vt(A,b){let O=i.get(A);if(A.isVideoTexture&&Ue(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){let rt=A.image;if(rt===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(O,A,b);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+b)}function wt(A,b){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ct(O,A,b);return}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+b)}function Ft(A,b){let O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){ct(O,A,b);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+b)}function yt(A,b){let O=i.get(A);if(A.version>0&&O.__version!==A.version){Tt(O,A,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+b)}let kt={[ks]:n.REPEAT,[Vi]:n.CLAMP_TO_EDGE,[Ao]:n.MIRRORED_REPEAT},we={[Qe]:n.NEAREST,[Cf]:n.NEAREST_MIPMAP_NEAREST,[aa]:n.NEAREST_MIPMAP_LINEAR,[xi]:n.LINEAR,[rc]:n.LINEAR_MIPMAP_NEAREST,[mn]:n.LINEAR_MIPMAP_LINEAR},zt={[Lf]:n.NEVER,[Bh]:n.ALWAYS,[Df]:n.LESS,[kh]:n.LEQUAL,[Nf]:n.EQUAL,[Oh]:n.GEQUAL,[Uf]:n.GREATER,[Ff]:n.NOTEQUAL};function ee(A,b){if(b.type===zi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===xi||b.magFilter===rc||b.magFilter===aa||b.magFilter===mn||b.minFilter===xi||b.minFilter===rc||b.minFilter===aa||b.minFilter===mn)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,kt[b.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,kt[b.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,kt[b.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,we[b.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,we[b.minFilter]),b.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,zt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Qe||b.minFilter!==aa&&b.minFilter!==mn||b.type===zi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function se(A,b){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",D),R(b));let rt=b.source,K=u.get(rt);K===void 0&&(K={},u.set(rt,K));let lt=Y(b);if(lt!==A.__cacheKey){K[lt]===void 0&&(K[lt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[lt].usedTimes++;let gt=K[A.__cacheKey];gt!==void 0&&(K[A.__cacheKey].usedTimes--,gt.usedTimes===0&&H(b)),A.__cacheKey=lt,A.__webglTexture=K[lt].texture}return O}function Q(A,b,O){return Math.floor(Math.floor(A/O)/b)}function ut(A,b,O,rt){let lt=A.updateRanges;if(lt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,O,rt,b.data);else{lt.sort((I,J)=>I.start-J.start);let gt=0;for(let I=1;I<lt.length;I++){let J=lt[gt],q=lt[I],ft=J.start+J.count,ot=Q(q.start,b.width,4),ht=Q(J.start,b.width,4);q.start<=ft+1&&ot===ht&&Q(q.start+q.count-1,b.width,4)===ot?J.count=Math.max(J.count,q.start+q.count-J.start):(++gt,lt[gt]=q)}lt.length=gt+1;let $=e.getParameter(n.UNPACK_ROW_LENGTH),Z=e.getParameter(n.UNPACK_SKIP_PIXELS),dt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let I=0,J=lt.length;I<J;I++){let q=lt[I],ft=Math.floor(q.start/4),ot=Math.ceil(q.count/4),ht=ft%b.width,Nt=Math.floor(ft/b.width),Qt=ot,at=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(n.UNPACK_SKIP_ROWS,Nt),e.texSubImage2D(n.TEXTURE_2D,0,ht,Nt,Qt,at,O,rt,b.data)}A.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,$),e.pixelStorei(n.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(n.UNPACK_SKIP_ROWS,dt)}}function ct(A,b,O){let rt=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(rt=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(rt=n.TEXTURE_3D);let K=se(A,b),lt=b.source;e.bindTexture(rt,A.__webglTexture,n.TEXTURE0+O);let gt=i.get(lt);if(lt.version!==gt.__version||K===!0){if(e.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let at=ne.getPrimaries(ne.workingColorSpace),Ut=b.colorSpace===_n?null:ne.getPrimaries(b.colorSpace),jt=b.colorSpace===_n||at===Ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt)}e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let Z=v(b.image,!1,s.maxTextureSize);Z=Ot(b,Z);let dt=r.convert(b.format,b.colorSpace),I=r.convert(b.type),J=E(b.internalFormat,dt,I,b.normalized,b.colorSpace,b.isVideoTexture);ee(rt,b);let q,ft=b.mipmaps,ot=b.isVideoTexture!==!0,ht=gt.__version===void 0||K===!0,Nt=lt.dataReady,Qt=S(b,Z);if(b.isDepthTexture)J=_(b.format===gn,b.type),ht&&(ot?e.texStorage2D(n.TEXTURE_2D,1,J,Z.width,Z.height):e.texImage2D(n.TEXTURE_2D,0,J,Z.width,Z.height,0,dt,I,null));else if(b.isDataTexture)if(ft.length>0){ot&&ht&&e.texStorage2D(n.TEXTURE_2D,Qt,J,ft[0].width,ft[0].height);for(let at=0,Ut=ft.length;at<Ut;at++)q=ft[at],ot?Nt&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,q.width,q.height,dt,I,q.data):e.texImage2D(n.TEXTURE_2D,at,J,q.width,q.height,0,dt,I,q.data);b.generateMipmaps=!1}else ot?(ht&&e.texStorage2D(n.TEXTURE_2D,Qt,J,Z.width,Z.height),Nt&&ut(b,Z,dt,I)):e.texImage2D(n.TEXTURE_2D,0,J,Z.width,Z.height,0,dt,I,Z.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ot&&ht&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Qt,J,ft[0].width,ft[0].height,Z.depth);for(let at=0,Ut=ft.length;at<Ut;at++)if(q=ft[at],b.format!==Hi)if(dt!==null)if(ot){if(Nt)if(b.layerUpdates.size>0){let jt=qh(q.width,q.height,b.format,b.type);for(let St of b.layerUpdates){let _e=q.data.subarray(St*jt/q.data.BYTES_PER_ELEMENT,(St+1)*jt/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,St,q.width,q.height,1,dt,_e)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,0,q.width,q.height,Z.depth,dt,q.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,at,J,q.width,q.height,Z.depth,0,q.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?Nt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,at,0,0,0,q.width,q.height,Z.depth,dt,I,q.data):e.texImage3D(n.TEXTURE_2D_ARRAY,at,J,q.width,q.height,Z.depth,0,dt,I,q.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ot&&ht&&e.texStorage2D(n.TEXTURE_2D,Qt,J,ft[0].width,ft[0].height);for(let at=0,Ut=ft.length;at<Ut;at++)q=ft[at],b.format!==Hi?dt!==null?ot?Nt&&e.compressedTexSubImage2D(n.TEXTURE_2D,at,0,0,q.width,q.height,dt,q.data):e.compressedTexImage2D(n.TEXTURE_2D,at,J,q.width,q.height,0,q.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?Nt&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,q.width,q.height,dt,I,q.data):e.texImage2D(n.TEXTURE_2D,at,J,q.width,q.height,0,dt,I,q.data)}else if(b.isDataArrayTexture)if(ot){if(ht&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Qt,J,Z.width,Z.height,Z.depth),Nt)if(b.layerUpdates.size>0){let at=qh(Z.width,Z.height,b.format,b.type);for(let Ut of b.layerUpdates){let jt=Z.data.subarray(Ut*at/Z.data.BYTES_PER_ELEMENT,(Ut+1)*at/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ut,Z.width,Z.height,1,dt,I,jt)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,dt,I,Z.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,J,Z.width,Z.height,Z.depth,0,dt,I,Z.data);else if(b.isData3DTexture)ot?(ht&&e.texStorage3D(n.TEXTURE_3D,Qt,J,Z.width,Z.height,Z.depth),Nt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,dt,I,Z.data)):e.texImage3D(n.TEXTURE_3D,0,J,Z.width,Z.height,Z.depth,0,dt,I,Z.data);else if(b.isFramebufferTexture){if(ht)if(ot)e.texStorage2D(n.TEXTURE_2D,Qt,J,Z.width,Z.height);else{let at=Z.width,Ut=Z.height;for(let jt=0;jt<Qt;jt++)e.texImage2D(n.TEXTURE_2D,jt,J,at,Ut,0,dt,I,null),at>>=1,Ut>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){let at=n.canvas;if(at.hasAttribute("layoutsubtree")||at.setAttribute("layoutsubtree","true"),Z.parentNode!==at){at.appendChild(Z),d.add(b),at.onpaint=Ut=>{let jt=Ut.changedElements;for(let St of d)jt.includes(St.image)&&(St.needsUpdate=!0)},at.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,Z);else{let jt=n.RGBA,St=n.RGBA,_e=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,jt,St,_e,Z)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ft.length>0){if(ot&&ht){let at=Xt(ft[0]);e.texStorage2D(n.TEXTURE_2D,Qt,J,at.width,at.height)}for(let at=0,Ut=ft.length;at<Ut;at++)q=ft[at],ot?Nt&&e.texSubImage2D(n.TEXTURE_2D,at,0,0,dt,I,q):e.texImage2D(n.TEXTURE_2D,at,J,dt,I,q);b.generateMipmaps=!1}else if(ot){if(ht){let at=Xt(Z);e.texStorage2D(n.TEXTURE_2D,Qt,J,at.width,at.height)}Nt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,I,Z)}else e.texImage2D(n.TEXTURE_2D,0,J,dt,I,Z);M(b)&&b.mipmapsAutoUpdate===!0&&y(rt),gt.__version=lt.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function Tt(A,b,O){if(b.image.length!==6)return;let rt=se(A,b),K=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);let lt=i.get(K);if(K.version!==lt.__version||rt===!0){e.activeTexture(n.TEXTURE0+O);let gt=ne.getPrimaries(ne.workingColorSpace),$=b.colorSpace===_n?null:ne.getPrimaries(b.colorSpace),Z=b.colorSpace===_n||gt===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let dt=b.isCompressedTexture||b.image[0].isCompressedTexture,I=b.image[0]&&b.image[0].isDataTexture,J=[];for(let St=0;St<6;St++)!dt&&!I?J[St]=v(b.image[St],!0,s.maxCubemapSize):J[St]=I?b.image[St].image:b.image[St],J[St]=Ot(b,J[St]);let q=J[0],ft=r.convert(b.format,b.colorSpace),ot=r.convert(b.type),ht=E(b.internalFormat,ft,ot,b.normalized,b.colorSpace),Nt=b.isVideoTexture!==!0,Qt=lt.__version===void 0||rt===!0,at=K.dataReady,Ut=S(b,q);ee(n.TEXTURE_CUBE_MAP,b);let jt;if(b.isDepthTexture){if(ht=_(b.format===gn,b.type),Qt)if(Nt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,ht,q.width,q.height);else for(let St=0;St<6;St++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,q.width,q.height,0,ft,ot,null)}else if(dt){Nt&&Qt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ut,ht,q.width,q.height);for(let St=0;St<6;St++){jt=J[St].mipmaps;for(let _e=0;_e<jt.length;_e++){let Je=jt[_e];b.format!==Hi?ft!==null?Nt?at&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e,0,0,Je.width,Je.height,ft,Je.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e,ht,Je.width,Je.height,0,Je.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?at&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e,0,0,Je.width,Je.height,ft,ot,Je.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e,ht,Je.width,Je.height,0,ft,ot,Je.data)}}}else{if(jt=b.mipmaps,Nt&&Qt){jt.length>0&&Ut++;let St=Xt(J[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ut,ht,St.width,St.height)}for(let St=0;St<6;St++)if(I){Nt?at&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,J[St].width,J[St].height,ft,ot,J[St].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,J[St].width,J[St].height,0,ft,ot,J[St].data);for(let _e=0;_e<jt.length;_e++){let bn=jt[_e].image[St].image;Nt?at&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e+1,0,0,bn.width,bn.height,ft,ot,bn.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e+1,ht,bn.width,bn.height,0,ft,ot,bn.data)}}else{Nt?at&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,ft,ot,J[St]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ht,ft,ot,J[St]);for(let _e=0;_e<jt.length;_e++){let Je=jt[_e];Nt?at&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e+1,0,0,ft,ot,Je.image[St]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+St,_e+1,ht,ft,ot,Je.image[St])}}}M(b)&&b.mipmapsAutoUpdate===!0&&y(n.TEXTURE_CUBE_MAP),lt.__version=K.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function xt(A,b,O,rt,K,lt){let gt=r.convert(O.format,O.colorSpace),$=r.convert(O.type),Z=E(O.internalFormat,gt,$,O.normalized,O.colorSpace),dt=i.get(b),I=i.get(O);if(I.__renderTarget=b,!dt.__hasExternalTextures){let J=Math.max(1,b.width>>lt),q=Math.max(1,b.height>>lt);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,lt,Z,J,q,b.depth,0,gt,$,null):e.texImage2D(K,lt,Z,J,q,0,gt,$,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,rt,K,I.__webglTexture,0,xe(b)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,rt,K,I.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Kt(A,b,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),b.depthBuffer){let rt=b.depthTexture,K=rt&&rt.isDepthTexture?rt.type:null,lt=_(b.stencilBuffer,K),gt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;mt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe(b),lt,b.width,b.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe(b),lt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,lt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,A)}else{let rt=b.textures;for(let K=0;K<rt.length;K++){let lt=rt[K],gt=r.convert(lt.format,lt.colorSpace),$=r.convert(lt.type),Z=E(lt.internalFormat,gt,$,lt.normalized,lt.colorSpace);mt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe(b),Z,b.width,b.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe(b),Z,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Z,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Lt(A,b,O){let rt=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let K=i.get(b.depthTexture);K.__renderTarget=b;let lt=rt?b.depthTexture.image[0]:b.depthTexture.image;(!K.__webglTexture||lt.width!==b.width||lt.height!==b.height)&&(lt.width=b.width,lt.height=b.height,b.depthTexture.needsUpdate=!0),rt?yt(b.depthTexture,0):vt(b.depthTexture,0);let gt=K.__webglTexture,$=xe(b),Z=rt?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,dt=b.depthTexture.format===gn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===ln)mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,dt,Z,gt,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,dt,Z,gt,0);else if(b.depthTexture.format===gn)mt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,dt,Z,gt,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,dt,Z,gt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(A){let b=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){let rt=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),rt){let K=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,rt.removeEventListener("dispose",K)};rt.addEventListener("dispose",K),b.__depthDisposeCallback=K}b.__boundDepthTexture=rt}if(A.depthTexture&&!b.__autoAllocateDepthBuffer)if(O)for(let rt=0;rt<6;rt++)Lt(b.__webglFramebuffer[rt],A,rt);else A.texture.mipmaps.length>0?Lt(b.__webglFramebuffer[0],A,0):Lt(b.__webglFramebuffer,A,0);else if(O){b.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[rt]),b.__webglDepthbuffer[rt]===void 0)b.__webglDepthbuffer[rt]=n.createRenderbuffer(),Kt(b.__webglDepthbuffer[rt],A,!1);else{let K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=b.__webglDepthbuffer[rt];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,lt)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Kt(b.__webglDepthbuffer,A,!1);else{let K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,lt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function le(A,b,O){let rt=i.get(A);b!==void 0&&xt(rt.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&re(A)}function pe(A){let b=A.texture,O=i.get(A),rt=i.get(b);A.addEventListener("dispose",F),R(A);let K=A.textures,lt=A.isWebGLCubeRenderTarget===!0,gt=K.length>1;if(gt||(rt.__webglTexture===void 0&&(rt.__webglTexture=n.createTexture()),rt.__version=b.version,a.memory.textures++),lt){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(b.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let Z=0;Z<b.mipmaps.length;Z++)O.__webglFramebuffer[$][Z]=n.createFramebuffer()}else O.__webglFramebuffer[$]=n.createFramebuffer()}else{if(b.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<b.mipmaps.length;$++)O.__webglFramebuffer[$]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(gt)for(let $=0,Z=K.length;$<Z;$++){let dt=i.get(K[$]);dt.__webglTexture===void 0&&(dt.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&mt(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<K.length;$++){let Z=K[$];O.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let dt=r.convert(Z.format,Z.colorSpace),I=r.convert(Z.type),J=E(Z.internalFormat,dt,I,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),q=xe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,q,J,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,O.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Kt(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,rt.__webglTexture),ee(n.TEXTURE_CUBE_MAP,b);for(let $=0;$<6;$++)if(b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)xt(O.__webglFramebuffer[$][Z],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Z);else xt(O.__webglFramebuffer[$],A,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);M(b)?y(n.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}else if(gt){for(let $=0,Z=K.length;$<Z;$++){let dt=K[$],I=i.get(dt),J=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(J=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(J,I.__webglTexture),ee(J,dt),xt(O.__webglFramebuffer,A,dt,n.COLOR_ATTACHMENT0+$,J,0),M(dt)&&y(J)}e.unbindTexture()}else{let $=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture($,rt.__webglTexture),ee($,b),b.mipmaps.length>0)for(let Z=0;Z<b.mipmaps.length;Z++)xt(O.__webglFramebuffer[Z],A,b,n.COLOR_ATTACHMENT0,$,Z);else xt(O.__webglFramebuffer,A,b,n.COLOR_ATTACHMENT0,$,0);M(b)?y($):b.mipmaps.length>0&&n.texParameteri($,n.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&re(A)}function U(A){let b=A.textures;for(let O=0,rt=b.length;O<rt;O++){let K=b[O];if(M(K)&&K.mipmapsAutoUpdate===!0){let lt=w(A),gt=i.get(K).__webglTexture;e.bindTexture(lt,gt),y(lt),e.unbindTexture()}}}let ze=[];function ie(A){if(A.samples>0){if(mt(A)===!1){let b=A.textures,O=A.width,rt=A.height,K=n.COLOR_BUFFER_BIT,lt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(A),$=b.length>1;if($)for(let dt=0;dt<b.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let dt=0;dt<b.length;dt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);let I=i.get(b[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,I,0)}n.blitFramebuffer(0,0,O,rt,0,0,O,rt,K,n.NEAREST),c===!0&&(ze.length=0,ze.push(n.COLOR_ATTACHMENT0+dt),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&ze.push(lt),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ze))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let dt=0;dt<b.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);let I=i.get(b[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,I,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let b=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function xe(A){return Math.min(s.maxSamples,A.samples)}function mt(A){let b=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Ue(A){let b=a.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function Ot(A,b){let O=A.colorSpace,rt=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==wr&&O!==_n&&(ne.getTransfer(O)===me?(rt!==Hi||K!==bi)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",O)),b}function Xt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=Bt,this.resetTextureUnits=j,this.getTextureUnits=tt,this.setTextureUnits=Et,this.setTexture2D=vt,this.setTexture2DArray=wt,this.setTexture3D=Ft,this.setTextureCube=yt,this.rebindTextures=le,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=mt,this.dispose=z}function ry(n,t){function e(i,s=_n){let r,a=ne.getTransfer(s);if(i===bi)return n.UNSIGNED_BYTE;if(i===oc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===cc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Lh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Dh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Ph)return n.BYTE;if(i===Ih)return n.SHORT;if(i===tr)return n.UNSIGNED_SHORT;if(i===ac)return n.INT;if(i===Bi)return n.UNSIGNED_INT;if(i===zi)return n.FLOAT;if(i===oi)return n.HALF_FLOAT;if(i===Nh)return n.ALPHA;if(i===Uh)return n.RGB;if(i===Hi)return n.RGBA;if(i===ln)return n.DEPTH_COMPONENT;if(i===gn)return n.DEPTH_STENCIL;if(i===Fh)return n.RED;if(i===lc)return n.RED_INTEGER;if(i===On)return n.RG;if(i===hc)return n.RG_INTEGER;if(i===uc)return n.RGBA_INTEGER;if(i===oa||i===ca||i===la||i===ha)if(a===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===oa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===oa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===la)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===dc||i===fc||i===pc||i===mc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gc||i===_c||i===xc||i===vc||i===yc||i===ua||i===Sc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===gc||i===_c)return a===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===xc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===vc)return r.COMPRESSED_R11_EAC;if(i===yc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ua)return r.COMPRESSED_RG11_EAC;if(i===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Mc||i===bc||i===Tc||i===Ec||i===wc||i===Ac||i===Cc||i===Rc||i===Pc||i===Ic||i===Lc||i===Dc||i===Nc||i===Uc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Mc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ec)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ac)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Cc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Rc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Pc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ic)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Lc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Dc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Nc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uc)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fc||i===kc||i===Oc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Fc)return a===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Oc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bc||i===zc||i===da||i===Hc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Bc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===zc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===us?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,au=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new Br(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Pe({vertexShader:ay,fragmentShader:oy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Yi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ou=class extends Wi{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,f=null,u=null,p=null,x=typeof XRWebGLBinding<"u",m=new au,g={},v=e.getContextAttributes(),M=null,y=null,w=[],E=[],_=new et,S=null,R=null,C=new ni;C.viewport=new Re;let D=new ni;D.viewport=new Re;let F=[C,D],G=new ec,L=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let vt=w[Y];return vt===void 0&&(vt=new Hs,w[Y]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(Y){let vt=w[Y];return vt===void 0&&(vt=new Hs,w[Y]=vt),vt.getGripSpace()},this.getHand=function(Y){let vt=w[Y];return vt===void 0&&(vt=new Hs,w[Y]=vt),vt.getHandSpace()};function X(Y){let vt=E.indexOf(Y.inputSource);if(vt===-1)return;let wt=w[vt];wt!==void 0&&(wt.update(Y.inputSource,Y.frame,l||a),wt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",it);for(let Y=0;Y<w.length;Y++){let vt=E[Y];vt!==null&&(E[Y]=null,w[Y].disconnect(vt))}L=null,z=null,m.reset();for(let Y in g)delete g[Y];if(t.setRenderTarget(M),u=null,f=null,d=null,s=null,y=null,Bt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(_.width,_.height,!1),R!==null){let Y=R.camera;Y.fov=R.fov,Y.zoom=R.zoom,Y.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",H),s.addEventListener("inputsourceschange",it),v.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(_),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Ft=null,yt=null;v.depth&&(yt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=v.stencil?gn:ln,Ft=v.stencil?us:Bi);let kt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};d=this.getBinding(),f=d.createProjectionLayer(kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Xe(f.textureWidth,f.textureHeight,{format:Hi,type:bi,depthTexture:new dn(f.textureWidth,f.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let wt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),y=new Xe(u.framebufferWidth,u.framebufferHeight,{format:Hi,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Bt.setContext(s),Bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(Y){for(let vt=0;vt<Y.removed.length;vt++){let wt=Y.removed[vt],Ft=E.indexOf(wt);Ft>=0&&(E[Ft]=null,w[Ft].disconnect(wt))}for(let vt=0;vt<Y.added.length;vt++){let wt=Y.added[vt],Ft=E.indexOf(wt);if(Ft===-1){for(let kt=0;kt<w.length;kt++)if(kt>=E.length){E.push(wt),Ft=kt;break}else if(E[kt]===null){E[kt]=wt,Ft=kt;break}if(Ft===-1)break}let yt=w[Ft];yt&&yt.connect(wt)}}function W(Y,vt){vt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(vt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let vt=Y.near,wt=Y.far;m.texture!==null&&(m.depthNear>0&&(vt=m.depthNear),m.depthFar>0&&(wt=m.depthFar)),G.near=D.near=C.near=vt,G.far=D.far=C.far=wt,(L!==G.near||z!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),L=G.near,z=G.far),G.layers.mask=Y.layers.mask|6,C.layers.mask=G.layers.mask&-5,D.layers.mask=G.layers.mask&-3;let Ft=Y.parent,yt=G.cameras;W(G,Ft);for(let kt=0;kt<yt.length;kt++)W(yt[kt],Ft);G.projectionMatrix.copy(C.projectionMatrix),G.projectionMatrixInverse.copy(C.projectionMatrixInverse),R===null&&Y.isPerspectiveCamera&&(R={camera:Y,fov:Y.fov,zoom:Y.zoom}),j(Y,G,Ft)};function j(Y,vt,wt){wt===null?Y.matrix.copy(vt.matrixWorld):(Y.matrix.copy(wt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(vt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(vt.projectionMatrix),Y.projectionMatrixInverse.copy(vt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ro*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(f===null&&u===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(Y){return g[Y]};let tt=null;function Et(Y,vt){if(h=vt.getViewerPose(l||a),p=vt,h!==null){let wt=h.views;u!==null&&(t.setRenderTargetFramebuffer(y,u.framebuffer),t.setRenderTarget(y));let Ft=!1;wt.length!==G.cameras.length&&(G.cameras.length=0,Ft=!0);for(let zt=0;zt<wt.length;zt++){let ee=wt[zt],se=null;if(u!==null)se=u.getViewport(ee);else{let ut=d.getViewSubImage(f,ee);se=ut.viewport,zt===0&&(t.setRenderTargetTextures(y,ut.colorTexture,ut.depthStencilTexture),t.setRenderTarget(y))}let Q=F[zt];Q===void 0&&(Q=new ni,Q.layers.enable(zt),Q.viewport=new Re,F[zt]=Q),Q.matrix.fromArray(ee.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(ee.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(se.x,se.y,se.width,se.height),zt===0&&(G.matrix.copy(Q.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ft===!0&&G.cameras.push(Q)}let yt=s.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let zt=d.getDepthInformation(wt[0]);zt&&zt.isValid&&zt.texture&&m.init(zt,s.renderState)}if(yt&&yt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let zt=0;zt<wt.length;zt++){let ee=wt[zt].camera;if(ee){let se=g[ee];se||(se=new Br,g[ee]=se);let Q=d.getCameraImage(ee);se.sourceTexture=Q}}}}for(let wt=0;wt<w.length;wt++){let Ft=E[wt],yt=w[wt];Ft!==null&&yt!==void 0&&yt.update(Ft,vt,l||a)}tt&&tt(Y,vt),vt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:vt}),p=null}let Bt=new vp;Bt.setAnimationLoop(Et),this.setAnimationLoop=function(Y){tt=Y},this.dispose=function(){}}},cy=new ye,Rp=new Yt;Rp.set(-1,0,0,0,1,0,0,0,1);function ly(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Vh(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,M,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),d(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&u(m,g,y)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),x(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?c(m,g,v,M):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===ai&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===ai&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let v=t.get(g),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(cy.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Rp),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,v,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=M*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function u(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===ai&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function x(m,g){let v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function hy(n,t,e,i){let s={},r={};function a(v,M){let y=M.program;i.uniformBlockBinding(v,y,s[v.id])}function o(v,M){let y=s[v.id];y===void 0&&(p(v),y=c(v),s[v.id]=y,v.addEventListener("dispose",m));let w=M.program;i.updateUBOMapping(v,w);let E=t.render.frame;r[v.id]!==E&&(l(v),r[v.id]=E)}function c(v){let M=n.createBuffer(),y=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,y,w),n.bindBuffer(n.UNIFORM_BUFFER,null),M}function l(v){let M=s[v.id],y=v.uniforms,w=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let E=0,_=y.length;E<_;E++){let S=y[E];if(Array.isArray(S))for(let R=0,C=S.length;R<C;R++)h(S[R],E,R,w);else h(S,E,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,M,y,w){if(f(v,M,y,w)===!0){let E=v.__offset,_=v.value;if(Array.isArray(_)){let S=0;for(let R=0;R<_.length;R++){let C=_[R],D=x(C,!0);d(C,v.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else d(_,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,E,v.__data)}}function d(v,M,y){typeof v=="number"||typeof v=="boolean"?M[y]=v:v.isMatrix3?(M[y]=v.elements[0],M[y+1]=v.elements[1],M[y+2]=v.elements[2],M[y+3]=0,M[y+4]=v.elements[3],M[y+5]=v.elements[4],M[y+6]=v.elements[5],M[y+7]=0,M[y+8]=v.elements[6],M[y+9]=v.elements[7],M[y+10]=v.elements[8],M[y+11]=0):ArrayBuffer.isView(v)?M.set(v.subarray(0,M.length-y),y):v.toArray(M,y)}function f(v,M,y,w){let E=v.value,_=M+"_"+y;if(Array.isArray(E)){w[_]===void 0&&(w[_]=[]);let S=w[_],R=!1;for(let C=0;C<E.length;C++)u(E[C],S,C)===!0&&(R=!0);return R}return u(E,w,_)}function u(v,M,y){if(M[y]===void 0)return typeof v=="number"||typeof v=="boolean"?M[y]=v:ArrayBuffer.isView(v)?M[y]=v.slice():M[y]=v.clone(),!0;{let w=M[y];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return M[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function p(v){let M=v.uniforms,y=0,w=16;for(let _=0,S=M.length;_<S;_++){let R=Array.isArray(M[_])?M[_]:[M[_]];for(let C=0,D=R.length;C<D;C++){let F=R[C],G=Array.isArray(F.value)?F.value:[F.value],L=Array.isArray(M[_])||Array.isArray(F.value),z=y;for(let H=0,it=G.length;H<it;H++){let W=G[H],j=x(W,L),tt=y%w,Et=tt%j.boundary,Bt=tt+Et;y+=Et,Bt!==0&&w-Bt<j.storage&&(y+=w-Bt),H===0&&(z=y),y+=j.storage}let X=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new X((y-z)/Float32Array.BYTES_PER_ELEMENT),F.__offset=z}}let E=y%w;return E>0&&(y+=w-E),v.__size=y,v.__cache={},this}function x(v,M){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",v),M===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function m(v){let M=v.target;M.removeEventListener("dispose",m),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(let v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:g}}var uy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function dy(){return Ji===null&&(Ji=new No(uy,16,16,On,oi),Ji.name="DFG_LUT",Ji.minFilter=xi,Ji.magFilter=xi,Ji.wrapS=Vi,Ji.wrapT=Vi,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var Yc=class{constructor(t={}){let{canvas:e=kf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:u=bi}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;let x=u,m=new Set([uc,hc,lc]),g=new Set([bi,Bi,tr,us,oc,cc]),v=new Uint32Array(4),M=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},w=null,E=null,_=[],S=[],R=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,F=null,G=null,L=null,z=null;this._outputColorSpace=Ve;let X=0,H=0,it=null,W=-1,j=null,tt=new Re,Et=new Re,Bt=null,Y=new qt(0),vt=0,wt=e.width,Ft=e.height,yt=1,kt=null,we=null,zt=new Re(0,0,wt,Ft),ee=new Re(0,0,wt,Ft),se=!1,Q=new Ln,ut=new Uo,ct=!1,Tt=!1,xt=new ye,Kt=new P,Lt=new Re,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},le=!1;function pe(){return it===null?yt:1}let U=i;function ze(T,N){return e.getContext(T,N)}let ie,xe,mt,Ue,Ot,Xt,A,b,O,rt,K,lt,gt,$,Z,dt,I,J,q,ft,ot,ht,Nt;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ut,!1),e.addEventListener("webglcontextrestored",jt,!1),e.addEventListener("webglcontextcreationerror",St,!1),U===null){let N="webgl2";if(U=ze(N,T),U===null)throw ze(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qt()}catch(T){throw e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),Vt("WebGLRenderer: "+T.message),T}function Qt(){ie=new bx(U),ie.init(),ot=new ry(U,ie),xe=new dx(U,ie,t,ot),mt=new ny(U,ie),xe.reversedDepthBuffer&&f&&mt.buffers.depth.setReversed(!0),G=U.createFramebuffer(),L=U.createFramebuffer(),z=U.createFramebuffer(),Ue=new wx(U),Ot=new Vv,Xt=new sy(U,ie,mt,Ot,xe,ot,Ue),A=new Mx(C),b=new C0(U),ht=new hx(U,b),O=new Tx(U,b,Ue,ht),rt=new Cx(U,O,b,ht,Ue),J=new Ax(U,xe,Xt),Z=new fx(Ot),K=new Gv(C,A,ie,xe,ht,Z),lt=new ly(C,Ot),gt=new Xv,$=new Kv(ie),I=new lx(C,A,mt,rt,p,c),dt=new iy(C,rt,xe),Nt=new hy(U,Ue,xe,mt),q=new ux(U,ie,Ue),ft=new Ex(U,ie,Ue),Ue.programs=K.programs,C.capabilities=xe,C.extensions=ie,C.properties=Ot,C.renderLists=gt,C.shadowMap=dt,C.state=mt,C.info=Ue}x!==bi&&(R=new Px(x,e.width,e.height,o,s,r));let at=new ou(C,U);this.xr=at,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=ie.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ie.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return yt},this.setPixelRatio=function(T){T!==void 0&&(yt=T,this.setSize(wt,Ft,!1))},this.getSize=function(T){return T.set(wt,Ft)},this.setSize=function(T,N,V=!0){if(at.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}wt=T,Ft=N,e.width=Math.floor(T*yt),e.height=Math.floor(N*yt),V===!0&&(e.style.width=T+"px",e.style.height=N+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(wt*yt,Ft*yt).floor()},this.setDrawingBufferSize=function(T,N,V){wt=T,Ft=N,yt=V,e.width=Math.floor(T*V),e.height=Math.floor(N*V),this.setViewport(0,0,T,N)},this.setEffects=function(T){if(x===bi){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let N=0;N<T.length;N++)if(T[N].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(tt)},this.getViewport=function(T){return T.copy(zt)},this.setViewport=function(T,N,V,k){T.isVector4?zt.set(T.x,T.y,T.z,T.w):zt.set(T,N,V,k),mt.viewport(tt.copy(zt).multiplyScalar(pe()).round())},this.getScissor=function(T){return T.copy(ee)},this.setScissor=function(T,N,V,k){T.isVector4?ee.set(T.x,T.y,T.z,T.w):ee.set(T,N,V,k),mt.scissor(Et.copy(ee).multiplyScalar(pe()).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(T){mt.setScissorTest(se=T)},this.setOpaqueSort=function(T){kt=T},this.setTransparentSort=function(T){we=T},this.getClearColor=function(T){return T.copy(I.getClearColor())},this.setClearColor=function(){I.setClearColor(...arguments)},this.getClearAlpha=function(){return I.getClearAlpha()},this.setClearAlpha=function(){I.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,V=!0){let k=0;if(T){let B=!1;if(it!==null){let _t=it.texture.format;B=m.has(_t)}if(B){let _t=it.texture.type,At=g.has(_t),pt=I.getClearColor(),bt=I.getClearAlpha(),It=pt.r,Zt=pt.g,he=pt.b;At?(v[0]=It,v[1]=Zt,v[2]=he,v[3]=bt,U.clearBufferuiv(U.COLOR,0,v)):(M[0]=It,M[1]=Zt,M[2]=he,M[3]=bt,U.clearBufferiv(U.COLOR,0,M))}else k|=U.COLOR_BUFFER_BIT}N&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){e.removeEventListener("webglcontextlost",Ut,!1),e.removeEventListener("webglcontextrestored",jt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),I.dispose(),gt.dispose(),$.dispose(),Xt.dispose(),Ot.dispose(),A.dispose(),rt.dispose(),O.dispose(),ht.dispose(),Nt.dispose(),K.dispose(),at.dispose(),at.removeEventListener("sessionstart",fd),at.removeEventListener("sessionend",pd),Vn.stop()};function Ut(T){T.preventDefault(),Rr("WebGLRenderer: Context Lost."),D=!0}function jt(){Rr("WebGLRenderer: Context Restored."),D=!1;let T=Ue.autoReset,N=dt.enabled,V=dt.autoUpdate,k=dt.needsUpdate,B=dt.type;Qt(),Ue.autoReset=T,dt.enabled=N,dt.autoUpdate=V,dt.needsUpdate=k,dt.type=B}function St(T){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function _e(T){let N=T.target;N.removeEventListener("dispose",_e),Je(N)}function Je(T){bn(T),Ot.remove(T)}function bn(T){let N=Ot.get(T).programs;N!==void 0&&(N.forEach(function(V){K.releaseProgram(V)}),T.isShaderMaterial&&K.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,V,k,B,_t){N===null&&(N=re);let At=B.isMesh&&B.matrixWorld.determinantAffine()<0,pt=cm(T,N,V,k,B);mt.setMaterial(k,At);let bt=V.index,It=1;if(k.wireframe===!0){if(bt=O.getWireframeAttribute(V),bt===void 0)return;It=2}let Zt=V.drawRange,he=V.attributes.position,Ct=Zt.start*It,ue=(Zt.start+Zt.count)*It;_t!==null&&(Ct=Math.max(Ct,_t.start*It),ue=Math.min(ue,(_t.start+_t.count)*It)),bt!==null?(Ct=Math.max(Ct,0),ue=Math.min(ue,bt.count)):he!=null&&(Ct=Math.max(Ct,0),ue=Math.min(ue,he.count));let He=ue-Ct;if(He<0||He===1/0)return;ht.setup(B,k,pt,V,bt);let Me,ve=q;if(bt!==null&&(Me=b.get(bt),ve=ft,ve.setIndex(Me)),B.isMesh)k.wireframe===!0?(mt.setLineWidth(k.wireframeLinewidth*pe()),ve.setMode(U.LINES)):ve.setMode(U.TRIANGLES);else if(B.isLine){let ci=k.linewidth;ci===void 0&&(ci=1),mt.setLineWidth(ci*pe()),B.isLineSegments?ve.setMode(U.LINES):B.isLineLoop?ve.setMode(U.LINE_LOOP):ve.setMode(U.LINE_STRIP)}else B.isPoints?ve.setMode(U.POINTS):B.isSprite&&ve.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))ve.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let ci=B._multiDrawStarts,Rt=B._multiDrawCounts,gi=B._multiDrawCount,ge=bt?b.get(bt).bytesPerElement:1,Wn=Ot.get(k).currentProgram.getUniforms();for(let li=0;li<gi;li++)Wn.setValue(U,"_gl_DrawID",li),ve.render(ci[li]/ge,Rt[li])}else if(B.isInstancedMesh)ve.renderInstances(Ct,He,B.count);else if(V.isInstancedBufferGeometry){let ci=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Rt=Math.min(V.instanceCount,ci);ve.renderInstances(Ct,He,Rt)}else ve.render(Ct,He)};function dd(T,N,V,k){F!==null&&T.isNodeMaterial&&F.setObject(k,T),ct===!0&&Z.setState(T,V,!1),T.transparent===!0&&T.side===qe&&T.forceSinglePass===!1?(T.side=ai,T.needsUpdate=!0,dr(T,N,k),T.side=kn,T.needsUpdate=!0,dr(T,N,k),T.side=qe):dr(T,N,k)}this.compile=function(T,N,V=null){V===null&&(V=T),F!==null&&F.renderStart(T,N,V),E=$.get(V),E.init(N),S.push(E),V.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(E.pushLight(B),B.castShadow&&E.pushShadow(B))}),T!==V&&T.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(E.pushLight(B),B.castShadow&&E.pushShadow(B))}),E.setupLights(),F!==null&&F.updateLights(E.state.lightsArray),Tt=this.localClippingEnabled,ct=Z.init(this.clippingPlanes,Tt),ct===!0&&Z.setGlobalState(this.clippingPlanes,N),F!==null&&dt.render(E.state.shadowsArray,V,N);let k=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let _t=B.material;if(_t)if(Array.isArray(_t))for(let At=0;At<_t.length;At++){let pt=_t[At];dd(pt,V,N,B),k.add(pt)}else dd(_t,V,N,B),k.add(_t)}),E=S.pop(),F!==null&&F.renderEnd(),k},this.compileAsync=function(T,N,V=null){let k=this.compile(T,N,V);return new Promise(B=>{function _t(){if(k.forEach(function(At){let bt=Ot.get(At).currentProgram;(bt===void 0||bt.isReady())&&k.delete(At)}),k.size===0){B(T);return}setTimeout(_t,10)}ie.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let Fl=null;function am(T){Fl&&Fl(T)}function fd(){Vn.stop()}function pd(){Vn.start()}let Vn=new vp;Vn.setAnimationLoop(am),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(T){Fl=T,at.setAnimationLoop(T),T===null?Vn.stop():Vn.start()},at.addEventListener("sessionstart",fd),at.addEventListener("sessionend",pd),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;F!==null&&F.renderStart(T,N);let V=at.enabled===!0&&at.isPresenting===!0,k=R!==null&&(it===null||V)&&R.begin(C,it);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(N),N=at.getCamera()),T.isScene===!0&&T.onBeforeRender(C,T,N,it),E=$.get(T,S.length),E.init(N),E.state.textureUnits=Xt.getTextureUnits(),S.push(E),xt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?ut.setFromArrayCamera(N):Q.setFromProjectionMatrix(xt,Ii,N.reversedDepth),Tt=this.localClippingEnabled,ct=Z.init(this.clippingPlanes,Tt),w=gt.get(T,_.length),w.init(),_.push(w),this.info.render.frame++,at.enabled===!0&&at.isPresenting===!0){let At=C.xr.getDepthSensingMesh();At!==null&&kl(At,N,-1/0,C.sortObjects)}kl(T,N,0,C.sortObjects),w.finish(),F!==null&&F.updateLights(E.state.lightsArray),C.sortObjects===!0&&w.sort(kt,we),le=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,le&&I.addToRenderList(w,T),this.info.autoReset===!0&&this.info.reset(),ct===!0&&Z.beginShadows();let B=E.state.shadowsArray;if(dt.render(B,T,N),ct===!0&&Z.endShadows(),(k&&R.hasRenderPass())===!1){let At=w.opaque,pt=w.transmissive;if(E.setupLights(),N.isArrayCamera){let bt=N.cameras;if(pt.length>0)for(let It=0,Zt=bt.length;It<Zt;It++){let he=bt[It];gd(At,pt,T,he)}le&&I.render(T);for(let It=0,Zt=bt.length;It<Zt;It++){let he=bt[It];md(w,T,he,he.viewport)}}else pt.length>0&&gd(At,pt,T,N),le&&I.render(T),md(w,T,N)}it!==null&&H===0&&(Xt.updateMultisampleRenderTarget(it),Xt.updateRenderTargetMipmap(it)),k&&R.end(C),T.isScene===!0&&T.onAfterRender(C,T,N),ht.resetDefaultState(),W=-1,j=null,S.pop(),S.length>0?(E=S[S.length-1],Xt.setTextureUnits(E.state.textureUnits),ct===!0&&Z.setGlobalState(C.clippingPlanes,E.state.camera)):E=null,_.pop(),_.length>0?w=_[_.length-1]:w=null,F!==null&&F.renderEnd()};function kl(T,N,V,k){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){let At=N.isArrayCamera?ut:Q;if(!T.frustumCulled||T.intersectsFrustum(At)){k&&Lt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xt);let pt=rt.update(T),bt=T.material;bt.visible&&w.push(T,pt,bt,V,Lt.z,null,N)}}else if(T.isMesh||T.isLine||T.isPoints){let At=N.isArrayCamera?ut:Q;if(!T.frustumCulled||T.intersectsFrustum(At)){let pt=rt.update(T),bt=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Lt.copy(T.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Lt.copy(pt.boundingSphere.center)),Lt.applyMatrix4(T.matrixWorld).applyMatrix4(xt)),Array.isArray(bt)){let It=pt.groups;for(let Zt=0,he=It.length;Zt<he;Zt++){let Ct=It[Zt],ue=bt[Ct.materialIndex];ue&&ue.visible&&w.push(T,pt,ue,V,Lt.z,Ct,N)}}else bt.visible&&w.push(T,pt,bt,V,Lt.z,null,N)}}}let _t=T.children;for(let At=0,pt=_t.length;At<pt;At++)kl(_t[At],N,V,k)}function md(T,N,V,k){let{opaque:B,transmissive:_t,transparent:At}=T;E.setupLightsView(V),ct===!0&&Z.setGlobalState(C.clippingPlanes,V),k&&mt.viewport(tt.copy(k)),B.length>0&&Ha(B,N,V),_t.length>0&&Ha(_t,N,V),At.length>0&&Ha(At,N,V),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function gd(T,N,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[k.id]===void 0){let Ct=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[k.id]=new Xe(1,1,{generateMipmaps:!0,type:Ct?oi:bi,minFilter:mn,samples:Math.max(4,xe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}let _t=E.state.transmissionRenderTarget[k.id],At=k.viewport||tt;_t.setSize(At.z*C.transmissionResolutionScale,At.w*C.transmissionResolutionScale);let pt=C.getRenderTarget(),bt=C.getActiveCubeFace(),It=C.getActiveMipmapLevel();C.setRenderTarget(_t),C.getClearColor(Y),vt=C.getClearAlpha(),vt<1&&C.setClearColor(16777215,.5),C.clear(),le&&I.render(V);let Zt=C.toneMapping;C.toneMapping=Zi;let he=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),E.setupLightsView(k),ct===!0&&Z.setGlobalState(C.clippingPlanes,k),Ha(T,V,k),Xt.updateMultisampleRenderTarget(_t),Xt.updateRenderTargetMipmap(_t),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let ue=0,He=N.length;ue<He;ue++){let Me=N[ue],{object:ve,geometry:ci,material:Rt,group:gi}=Me;if(Rt.side===qe&&ve.layers.test(k.layers)){let ge=Rt.side;Rt.side=ai,Rt.needsUpdate=!0,_d(ve,V,k,ci,Rt,gi),Rt.side=ge,Rt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Xt.updateMultisampleRenderTarget(_t),Xt.updateRenderTargetMipmap(_t))}C.setRenderTarget(pt,bt,It),C.setClearColor(Y,vt),he!==void 0&&(k.viewport=he),C.toneMapping=Zt}function Ha(T,N,V){let k=N.isScene===!0?N.overrideMaterial:null;for(let B=0,_t=T.length;B<_t;B++){let At=T[B],{object:pt,geometry:bt,group:It}=At,Zt=At.material;Zt.allowOverride===!0&&k!==null&&(Zt=k),pt.layers.test(V.layers)&&_d(pt,N,V,bt,Zt,It)}}function _d(T,N,V,k,B,_t){F!==null&&B.isNodeMaterial&&F.setObject(T,B),T.onBeforeRender(C,N,V,k,B,_t),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(C,N,V,k,T,_t),B.transparent===!0&&B.side===qe&&B.forceSinglePass===!1?(B.side=ai,B.needsUpdate=!0,C.renderBufferDirect(V,N,k,B,T,_t),B.side=kn,B.needsUpdate=!0,C.renderBufferDirect(V,N,k,B,T,_t),B.side=qe):C.renderBufferDirect(V,N,k,B,T,_t),T.onAfterRender(C,N,V,k,B,_t)}function xd(T){let N=0;for(let V of T)V.texture!==null&&N++;return N}function dr(T,N,V){N.isScene!==!0&&(N=re);let k=Ot.get(T),B=E.state.lights,_t=E.state.shadowsArray,At=B.state.version,pt=K.getParameters(T,B.state,_t,N,V,E.state.lightProbeGridArray),bt=K.getProgramCacheKey(pt),It=k.programs;k.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?N.environment:null,k.fog=N.fog;let Zt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;k.envMap=A.get(T.envMap||k.environment,Zt),k.envMapRotation=k.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,It===void 0&&(T.addEventListener("dispose",_e),It=new Map,k.programs=It,k.programVariants=new Map);let he=It.get(bt);if(he!==void 0){if(k.currentProgram===he&&k.lightsStateVersion===At)return yd(T,pt),he}else pt.uniforms=K.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,V,pt),T.onBeforeCompile(pt,C),he=K.acquireProgram(pt,bt),It.set(bt,he),k.uniforms=pt.uniforms;let Ct=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ct.clippingPlanes=Z.uniform),yd(T,pt),k.needsLights=hm(T),k.lightsStateVersion=At,k.needsLights&&(Ct.ambientLightColor.value=B.state.ambient,Ct.lightProbe.value=B.state.probe,Ct.sunLights.value=B.state.sun,Ct.sunLightShadows.value=B.state.sunShadow,Ct.directionalLights.value=B.state.directional,Ct.directionalLightShadows.value=B.state.directionalShadow,Ct.spotLights.value=B.state.spot,Ct.spotLightShadows.value=B.state.spotShadow,Ct.rectAreaLights.value=B.state.rectArea,Ct.ltc_1.value=B.state.rectAreaLTC1,Ct.ltc_2.value=B.state.rectAreaLTC2,Ct.pointLights.value=B.state.point,Ct.pointLightShadows.value=B.state.pointShadow,Ct.hemisphereLights.value=B.state.hemi,Ct.sunShadowMatrix.value=B.state.sunShadowMatrix,Ct.sunShadowCascade.value=B.state.sunShadowCascade,Ct.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ct.spotLightMatrix.value=B.state.spotLightMatrix,Ct.spotLightMap.value=B.state.spotLightMap,Ct.pointShadowMatrix.value=B.state.pointShadowMatrix),k.numLightProbeGrids=xd(E.state.lightProbeGridArray),k.currentProgram=he,k.uniformsList=null,he}function om(T,N,V,k,B){let _t=Ot.get(T),At=_t.currentProgram.id+","+k+","+B,pt=_t.programVariants.get(At);return pt===void 0?(pt=dr(T,N,V),_t.programVariants.set(At,pt)):(_t.currentProgram=pt,_t.uniformsList=null,_t.outputColorSpace=k,_t.toneMapping=B),pt}function vd(T){if(T.uniformsList===null){let N=T.currentProgram.getUniforms();T.uniformsList=er.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function yd(T,N){let V=Ot.get(T);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function cm(T,N,V,k,B){N.isScene!==!0&&(N=re),Xt.resetTextureUnits();let _t=N.fog,At=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?N.environment:null,pt=it===null?C.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:ne.workingColorSpace,bt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,It=A.get(k.envMap||At,bt),Zt=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,he=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ct=!!V.morphAttributes.position,ue=!!V.morphAttributes.normal,He=!!V.morphAttributes.color,Me=Zi;k.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Me=C.toneMapping);let ve=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ci=ve!==void 0?ve.length:0,Rt=Ot.get(k),gi=E.state.lights;if(ct===!0&&(Tt===!0||T!==j)){let Le=T===j&&k.id===W;Z.setState(k,T,Le)}let ge=!1,Wn=!1;k.version===Rt.__version?Rt.needsLights&&Rt.lightsStateVersion!==gi.state.version||B.isBatchedMesh&&Rt.batching===!1||!B.isBatchedMesh&&Rt.batching===!0||B.isBatchedMesh&&Rt.batchingColor===!0&&B._colorsTexture===null||B.isBatchedMesh&&Rt.batchingColor===!1&&B._colorsTexture!==null||B.isInstancedMesh&&Rt.instancing===!1||!B.isInstancedMesh&&Rt.instancing===!0||B.isSkinnedMesh&&Rt.skinning===!1||!B.isSkinnedMesh&&Rt.skinning===!0||B.isInstancedMesh&&Rt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Rt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Rt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Rt.instancingMorph===!1&&B.morphTexture!==null||Rt.envMap!==It||k.fog===!0&&Rt.fog!==_t||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==Z.numPlanes||Rt.numIntersection!==Z.numIntersection)||Rt.vertexAlphas!==Zt||Rt.vertexTangents!==he||Rt.morphTargets!==Ct||Rt.morphNormals!==ue||Rt.morphColors!==He||Rt.morphTargetsCount!==ci||Rt.numLightProbeGrids!==xd(E.state.lightProbeGridArray)?ge=!0:(Rt.outputColorSpace!==pt||Rt.toneMapping!==Me)&&(Wn=!0):(ge=!0,Rt.__version=k.version);let li=Rt.currentProgram;(ge===!0||Wn===!0)&&(li=Wn===!0?om(k,N,B,pt,Me):dr(k,N,B),F&&k.isNodeMaterial&&F.onUpdateProgram(k,li,Rt));let Ga=!1,Tn=!1,Xn=!1,fe=li.getUniforms(),ii=Rt.uniforms;if(mt.useProgram(li.program)&&(Ga=!0,Tn=!0,Xn=!0),k.id!==W&&(W=k.id,Tn=!0),Ga||j!==T){mt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),fe.setValue(U,"projectionMatrix",T.projectionMatrix),fe.setValue(U,"viewMatrix",T.matrixWorldInverse);let Ke=fe.map.cameraPosition;Ke!==void 0&&Ke.setValue(U,Kt.setFromMatrixPosition(T.matrixWorld)),xe.logarithmicDepthBuffer&&fe.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&fe.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),j!==T&&(j=T,Tn=!0,Xn=!0)}if(Rt.needsLights&&(gi.state.sunShadowMap.length>0&&fe.setValue(U,"sunShadowMap",gi.state.sunShadowMap,Xt),gi.state.directionalShadowMap.length>0&&fe.setValue(U,"directionalShadowMap",gi.state.directionalShadowMap,Xt),gi.state.spotShadowMap.length>0&&fe.setValue(U,"spotShadowMap",gi.state.spotShadowMap,Xt),gi.state.pointShadowMap.length>0&&fe.setValue(U,"pointShadowMap",gi.state.pointShadowMap,Xt)),B.isSkinnedMesh){fe.setOptional(U,B,"bindMatrix"),fe.setOptional(U,B,"bindMatrixInverse");let Le=B.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),fe.setValue(U,"boneTexture",Le.boneTexture,Xt))}B.isBatchedMesh&&(fe.setOptional(U,B,"batchingTexture"),fe.setValue(U,"batchingTexture",B._matricesTexture,Xt),fe.setOptional(U,B,"batchingIdTexture"),fe.setValue(U,"batchingIdTexture",B._indirectTexture,Xt),fe.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&fe.setValue(U,"batchingColorTexture",B._colorsTexture,Xt));let Ni=V.morphAttributes;if((Ni.position!==void 0||Ni.normal!==void 0||Ni.color!==void 0)&&J.update(B,V,li),(Tn||Rt.receiveShadow!==B.receiveShadow)&&(Rt.receiveShadow=B.receiveShadow,fe.setValue(U,"receiveShadow",B.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&N.environment!==null&&(ii.envMapIntensity.value=N.environmentIntensity),ii.dfgLUT!==void 0&&(ii.dfgLUT.value=dy()),Tn){if(fe.setValue(U,"toneMappingExposure",C.toneMappingExposure),Rt.needsLights&&lm(ii,Xn),_t&&k.fog===!0&&lt.refreshFogUniforms(ii,_t),lt.refreshMaterialUniforms(ii,k,yt,Ft,E.state.transmissionRenderTarget[T.id]),Rt.needsLights&&Rt.numLightProbeGrids>0){let Le=y,Ke=0;for(let tn of E.state.lightProbeGridArray)tn.texture!==null&&(Le.textures[Ke]=tn.texture,Le.min[Ke]=tn.boundingBox.min,Le.max[Ke]=tn.boundingBox.max,Le.resolution[Ke]=tn.resolution,Ke++);for(let tn in Le)Le[tn].length=Ke;ii.probesSH.value=Le.textures,ii.probesMin.value=Le.min,ii.probesMax.value=Le.max,ii.probesResolution.value=Le.resolution}er.upload(U,vd(Rt),ii,Xt)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(er.upload(U,vd(Rt),ii,Xt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&fe.setValue(U,"center",B.center),fe.setValue(U,"modelViewMatrix",B.modelViewMatrix),fe.setValue(U,"normalMatrix",B.normalMatrix),fe.setValue(U,"modelMatrix",B.matrixWorld),k.uniformsGroups!==void 0){let Le=k.uniformsGroups;for(let Ke=0,tn=Le.length;Ke<tn;Ke++){let Md=Le[Ke];Nt.update(Md,li),Nt.bind(Md,li)}}return li}function lm(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.sunLights.needsUpdate=N,T.sunLightShadows.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function hm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(T,N,V){let k=Ot.get(T);k.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Ot.get(T.texture).__webglTexture=N,Ot.get(T.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:V,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){let V=Ot.get(T);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,V=0){it=T,X=N,H=V;let k=null,B=!1,_t=!1;if(T){let pt=Ot.get(T);if(pt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(U.FRAMEBUFFER,pt.__webglFramebuffer),tt.copy(T.viewport),Et.copy(T.scissor),Bt=T.scissorTest,mt.viewport(tt),mt.scissor(Et),mt.setScissorTest(Bt),W=-1;return}else if(pt.__webglFramebuffer===void 0)Xt.setupRenderTarget(T);else if(pt.__hasExternalTextures)Xt.rebindTextures(T,Ot.get(T.texture).__webglTexture,Ot.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Zt=T.depthTexture;if(pt.__boundDepthTexture!==Zt){if(Zt!==null&&Ot.has(Zt)&&(T.width!==Zt.image.width||T.height!==Zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(T)}}let bt=T.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(_t=!0);let It=Ot.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(It[N])?k=It[N][V]:k=It[N],B=!0):T.samples>0&&Xt.useMultisampledRTT(T)===!1?k=Ot.get(T).__webglMultisampledFramebuffer:Array.isArray(It)?k=It[V]:k=It,tt.copy(T.viewport),Et.copy(T.scissor),Bt=T.scissorTest}else tt.copy(zt).multiplyScalar(yt).floor(),Et.copy(ee).multiplyScalar(yt).floor(),Bt=se;if(V!==0&&(k=G),mt.bindFramebuffer(U.FRAMEBUFFER,k)&&mt.drawBuffers(T,k),mt.viewport(tt),mt.scissor(Et),mt.setScissorTest(Bt),B){let pt=Ot.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,V)}else if(_t){let pt=N;for(let bt=0;bt<T.textures.length;bt++){let It=Ot.get(T.textures[bt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+bt,It.__webglTexture,V,pt)}}else if(T!==null&&V!==0){let pt=Ot.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pt.__webglTexture,V)}W=-1};function Sd(T){let N=Ot.get(T);return(N.__readFormat!==T.format||N.__readType!==T.type)&&(N.__readFormat=T.format,N.__readType=T.type,N.__formatReadable=xe.textureFormatReadable(T.format),N.__typeReadable=xe.textureTypeReadable(T.type)),N}this.readRenderTargetPixels=function(T,N,V,k,B,_t,At,pt=0){if(!(T&&T.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&At!==void 0&&(bt=bt[At],Array.isArray(bt)&&(bt=bt[0])),bt){mt.bindFramebuffer(U.FRAMEBUFFER,bt);try{let It=T.textures[pt],Zt=It.format,he=It.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt);let Ct=Sd(It);if(Ct.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-k&&V>=0&&V<=T.height-B&&U.readPixels(N,V,k,B,ot.convert(Zt),ot.convert(he),_t)}finally{let It=it!==null?Ot.get(it).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(T,N,V,k,B,_t,At,pt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=Ot.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&At!==void 0&&(bt=bt[At],Array.isArray(bt)&&(bt=bt[0])),bt)if(N>=0&&N<=T.width-k&&V>=0&&V<=T.height-B){mt.bindFramebuffer(U.FRAMEBUFFER,bt);let It=T.textures[pt],Zt=It.format,he=It.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt);let Ct=Sd(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.bufferData(U.PIXEL_PACK_BUFFER,_t.byteLength,U.STREAM_READ),U.readPixels(N,V,k,B,ot.convert(Zt),ot.convert(he),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let He=it!==null?Ot.get(it).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,He);let Me=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Bf(U,Me,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,_t),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ue),U.deleteSync(Me),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,V=0){let k=Math.pow(2,-V),B=Math.floor(T.image.width*k),_t=Math.floor(T.image.height*k),At=N!==null?N.x:0,pt=N!==null?N.y:0;Xt.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,At,pt,B,_t),mt.unbindTexture()},this.copyTextureToTexture=function(T,N,V=null,k=null,B=0,_t=0){let At,pt,bt,It,Zt,he,Ct,ue,He,Me=T.isCompressedTexture?T.mipmaps[_t]:T.image;if(V!==null)At=V.max.x-V.min.x,pt=V.max.y-V.min.y,bt=V.isBox3?V.max.z-V.min.z:1,It=V.min.x,Zt=V.min.y,he=V.isBox3?V.min.z:0;else{let fe=Math.pow(2,-B);At=Math.floor(Me.width*fe),pt=Math.floor(Me.height*fe),T.isDataArrayTexture?bt=Me.depth:T.isData3DTexture?bt=Math.floor(Me.depth*fe):bt=1,It=0,Zt=0,he=0}k!==null?(Ct=k.x,ue=k.y,He=k.z):(Ct=0,ue=0,He=0);let ve=ot.convert(N.format),ci=ot.convert(N.type),Rt;N.isData3DTexture?(Xt.setTexture3D(N,0),Rt=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Xt.setTexture2DArray(N,0),Rt=U.TEXTURE_2D_ARRAY):(Xt.setTexture2D(N,0),Rt=U.TEXTURE_2D),mt.activeTexture(U.TEXTURE0),mt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),mt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),mt.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);let gi=mt.getParameter(U.UNPACK_ROW_LENGTH),ge=mt.getParameter(U.UNPACK_IMAGE_HEIGHT),Wn=mt.getParameter(U.UNPACK_SKIP_PIXELS),li=mt.getParameter(U.UNPACK_SKIP_ROWS),Ga=mt.getParameter(U.UNPACK_SKIP_IMAGES);mt.pixelStorei(U.UNPACK_ROW_LENGTH,Me.width),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Me.height),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,It),mt.pixelStorei(U.UNPACK_SKIP_ROWS,Zt),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,he);let Tn=T.isDataArrayTexture||T.isData3DTexture,Xn=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){let fe=Ot.get(T),ii=Ot.get(N),Ni=Ot.get(fe.__renderTarget),Le=Ot.get(ii.__renderTarget);mt.bindFramebuffer(U.READ_FRAMEBUFFER,Ni.__webglFramebuffer),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Ke=0;Ke<bt;Ke++)Tn&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.get(T).__webglTexture,B,he+Ke),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ot.get(N).__webglTexture,_t,He+Ke)),U.blitFramebuffer(It,Zt,It+At,Zt+pt,Ct,ue,Ct+At,ue+pt,U.DEPTH_BUFFER_BIT,U.NEAREST);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||T.isRenderTargetTexture||Ot.has(T)){let fe=Ot.get(T),ii=Ot.get(N);mt.bindFramebuffer(U.READ_FRAMEBUFFER,L),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let Ni=0;Ni<bt;Ni++)Tn?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,fe.__webglTexture,B,he+Ni):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fe.__webglTexture,B),Xn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ii.__webglTexture,_t,He+Ni):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ii.__webglTexture,_t),B!==0?U.blitFramebuffer(It,Zt,It+At,Zt+pt,Ct,ue,Ct+At,ue+pt,U.COLOR_BUFFER_BIT,U.NEAREST):Xn?U.copyTexSubImage3D(Rt,_t,Ct,ue,He+Ni,It,Zt,At,pt):U.copyTexSubImage2D(Rt,_t,Ct,ue,It,Zt,At,pt);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Xn?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Rt,_t,Ct,ue,He,At,pt,bt,ve,ci,Me.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(Rt,_t,Ct,ue,He,At,pt,bt,ve,Me.data):U.texSubImage3D(Rt,_t,Ct,ue,He,At,pt,bt,ve,ci,Me):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,_t,Ct,ue,At,pt,ve,ci,Me.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,_t,Ct,ue,Me.width,Me.height,ve,Me.data):U.texSubImage2D(U.TEXTURE_2D,_t,Ct,ue,At,pt,ve,ci,Me);mt.pixelStorei(U.UNPACK_ROW_LENGTH,gi),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ge),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,Wn),mt.pixelStorei(U.UNPACK_SKIP_ROWS,li),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,Ga),_t===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&U.generateMipmap(Rt),mt.unbindTexture()},this.initRenderTarget=function(T){Ot.get(T).__webglFramebuffer===void 0&&Xt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Xt.setTextureCube(T,0):T.isData3DTexture?Xt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Xt.setTexture2DArray(T,0):Xt.setTexture2D(T,0),mt.unbindTexture()},this.resetState=function(){X=0,H=0,it=null,mt.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}};var nr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Ri=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},fy=new as(-1,1,1,-1,0,1),cu=class extends Te{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}},py=new cu,zn=class{constructor(t){this._mesh=new Jt(py,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,fy)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Jc=class extends Ri{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Pe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xn.clone(t.uniforms),this.material=new Pe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new zn(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var xa=class extends Ri{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Kc=class extends Ri{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var jc=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new et);this._width=i.width,this._height=i.height,e=new Xe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:oi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Jc(nr),this.copyPass.material.blending=pn,this.timer=new Qr}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}xa!==void 0&&(a instanceof xa?i=!0:a instanceof Kc&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var va=class extends Ri{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new qt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var Pp={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var sr=class n extends Ri{constructor(t,e=1,i,s){super(),this.strength=e,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new et(t.x,t.y):new et(256,256),this.clearColor=new qt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Xe(r,a,{type:oi,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let d=new Xe(r,a,{type:oi,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);let f=new Xe(r,a,{type:oi,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}let o=Pp;this.highPassUniforms=xn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new et(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xn.clone(nr.uniforms),this.blendMaterial=new Pe({uniforms:this.copyUniforms,vertexShader:nr.vertexShader,fragmentShader:nr.fragmentShader,premultipliedAlpha:!0,blending:ei,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new qt,this._oldClearAlpha=1,this._basic=new ke,this._fsQuad=new zn(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new et(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],i=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(i*i))/i);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],c=a+1<t?e[a+1]:0,l=o+c;s.push((a*o+(a+1)*c)/l),r.push(l)}return new Pe({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new et(.5,.5)},direction:{value:new et(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Pe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};sr.BlurDirectionX=new et(1,0);sr.BlurDirectionY=new et(0,1);var ya={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Qc=class extends Ri{constructor(){super(),this.isOutputPass=!0,this.uniforms=xn.clone(ya.uniforms),this.material=new Ys({name:ya.name,uniforms:this.uniforms,vertexShader:ya.vertexShader,fragmentShader:ya.fragmentShader}),this._fsQuad=new zn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ta?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ia?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ls?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===sa?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===na&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var Oe={hp:100,stamina:100,walk:5.4,sprint:8.4,guardMove:2.2,chargeMove:2.4,staminaRegen:26,staminaDelay:.7,sprintDrain:9,dodgeCost:22,dodgeDur:.52,dodgeDist:7.2,iFrom:.03,iTo:.34,parryWindow:.2,guardRate:.3,potions:4,potionHeal:50,potionTime:1.5,eye:1.66,radius:.45},lu={light1:{dur:.56,hit:.2,mv:16,reach:3.7,next:.3,step:1.1},light2:{dur:.56,hit:.19,mv:19,reach:3.7,next:.3,step:1},light3:{dur:.86,hit:.33,mv:34,reach:3.9,next:.62,step:1.3},heavy1:{dur:.82,hit:.2,mv:40,reach:4.2,next:.6,step:1.2},heavy2:{dur:.9,hit:.22,mv:80,reach:4.3,next:.68,step:1.4},heavy3:{dur:1,hit:.24,mv:135,reach:4.4,next:.78,step:1.6},counter:{dur:.66,hit:.14,mv:85,reach:4.4,next:.42,step:1.8}},fi={great:{name:"\u5927\u5263",sub:"\u7070\u65AD\u3061",desc:"\u6E9C\u3081\u65AC\u308A\u306E\u4E00\u6483\u304C\u91CD\u3044\u3002\u653B\u5B88\u306E\u30D0\u30E9\u30F3\u30B9\u304C\u3088\u304F\u6271\u3044\u3084\u3059\u3044\u3002",speed:1,mv:1,heavy:1,reach:0,walk:1,dodgeCost:22,guardRate:.3,charge:1,buff:8,blunt:!1,tip:1.52,base:.85,sp:{name:"\u7070\u71FC\u65AD\u3061",desc:"\u529B\u3092\u6E9C\u3081\u3066\u653E\u3064\u6E3E\u8EAB\u306E\u4E00\u6483\u3002\u6E9C\u3081\u3066\u3044\u308B\u9593\u306F\u602F\u307E\u306A\u3044\u3002",dur:1.6,hit:.97,next:1.3,mv:320,reach:5,step:2}},dual:{name:"\u53CC\u5263",sub:"\u53CC\u7259",desc:"\u624B\u6570\u3068\u6A5F\u52D5\u529B\u3002\u56DE\u907F\u304C\u8EFD\u304F\u3001\u898B\u5207\u308A\u306E\u52B9\u679C\u304C\u9577\u3044\u3002\u30AC\u30FC\u30C9\u306F\u5F31\u304F\u3001\u9593\u5408\u3044\u306F\u77ED\u3044\u3002",speed:1.5,mv:.66,heavy:.68,reach:-.45,walk:1.12,dodgeCost:14,guardRate:.55,charge:.65,buff:13,blunt:!1,tip:1.05,base:.5,sp:{name:"\u9B3C\u4EBA\u5316",desc:"14\u79D2\u9593\u3001\u653B\u6483\u304C\u901F\u304F\u5F37\u304F\u306A\u308A\u3001\u56DE\u907F\u306E\u30B9\u30BF\u30DF\u30CA\u6D88\u8CBB\u304C\u534A\u5206\u306B\u306A\u308B\u3002",oni:14}},hammer:{name:"\u6226\u69CC",sub:"\u7815\u5CA9",desc:"\u9045\u3044\u304C\u9AD8\u5A01\u529B\u3002\u982D\u3092\u6BB4\u308A\u7D9A\u3051\u308B\u3068\u6C17\u7D76\u3055\u305B\u3089\u308C\u3001\u786C\u3044\u80CC\u4E2D\u306B\u3082\u5F3E\u304B\u308C\u306A\u3044\u3002\u5C3B\u5C3E\u306F\u5207\u308C\u306A\u3044\u3002",speed:.8,mv:1.25,heavy:1.25,reach:.1,walk:.93,dodgeCost:24,guardRate:.3,charge:1.15,buff:8,blunt:!0,tip:1.5,base:1.05,sp:{name:"\u7815\u5CA9\u885D",desc:"\u5927\u5730\u3054\u3068\u53E9\u304D\u5272\u308B\u4E00\u6483\u3002\u3069\u3053\u306B\u5F53\u3066\u3066\u3082\u6C17\u7D76\u5024\u304C\u5927\u304D\u304F\u305F\u307E\u308B\u3002",dur:1.5,hit:.85,next:1.2,mv:210,reach:4.8,step:2.2,stun:500}},bow:{name:"\u5F13",sub:"\u7070\u7FBD",desc:"\u96E2\u308C\u3066\u5C04\u308B\u9060\u8DDD\u96E2\u6B66\u5668\u3002\u6E9C\u3081\u308B\u307B\u3069\u5F37\u304F\u3001\u9069\u6B63\u8DDD\u96E2\uFF088\u301C22m\uFF09\u3067\u5A01\u529B\u304C\u4E0A\u304C\u308B\u3002\u30AC\u30FC\u30C9\u306F\u5F31\u3044\u3002",speed:1,mv:.55,heavy:.8,reach:0,walk:1.05,dodgeCost:18,guardRate:.6,charge:.9,buff:8,blunt:!1,ranged:!0,tip:1,base:.5,sp:{name:"\u7A7F\u3061\u77E2",desc:"\u529B\u3092\u8FBC\u3081\u305F\u6E3E\u8EAB\u306E\u4E00\u77E2\u3002\u9060\u304F\u304B\u3089\u3067\u3082\u5927\u30C0\u30E1\u30FC\u30B8\u3002",dur:1.4,hit:.9,next:1.1,mv:240,reach:0,step:0}}},fs={reach:70,near:8,far:22,off:.7},tl={perDmg:.08,just:15,parry:15},Ip=["great","dual","hammer","bow"],hu={start:.2,lv:[.55,1.15,1.75],over:2.7},Lp={head:1.45,body:1,leg:.8,tail:1.05,back:.45},yi={name:"\u7070\u89D2\u7ADC \u30B0\u30E9\u30F4\u30A1\u30EB\u30C9",hp:8e3,hpScale:[1,1.75,2.4,3],headFlinch:560,legTopple:600,tailCut:900,hornBreak:1100,parryStun:3,walk:4.2,run:15.5,turn:1.9},Dp=[{r:"S",t:300},{r:"A",t:480},{r:"B",t:720},{r:"C",t:1/0}],vn=["#e2573a","#3aa0e2","#e2b23a","#57c26a"],el=["\u30CA\u30A4\u30B9\uFF01","\u56DE\u5FA9\u3059\u308B\uFF01","\u5C3B\u5C3E\u3092\u72D9\u304A\u3046\uFF01","\u52A9\u3051\u3066\uFF01"];var Ce=(n,t,e)=>n<t?t:n>e?e:n,Wt=(n,t,e)=>n+(t-n)*e,Dt=n=>Ce(n,0,1),$t=n=>(n=Dt(n),n*n*(3-2*n)),ji=n=>(n=Dt(n),1-(1-n)*(1-n)*(1-n)),il=n=>(n=Dt(n),n*n*n),Se=(n,t,e,i)=>Wt(n,t,1-Math.exp(-e*i)),Ne=Math.PI*2;function Li(n,t){let e=(t-n)%Ne;return e>Math.PI&&(e-=Ne),e<-Math.PI&&(e+=Ne),e}var Sa=(n,t,e,i)=>n+Li(n,t)*(1-Math.exp(-e*i));function nl(n,t,e){let i=Li(n,t);return n+Ce(i,-e,e)}var Ht=(n,t,e)=>Dt((n-t)/(e-t)),Ie=(n=1,t)=>t===void 0?Math.random()*n:n+Math.random()*(t-n),rr=n=>n[Math.random()*n.length|0];function Ma(n){n=Math.max(0,n);let t=Math.floor(n/60),e=Math.floor(n%60),i=Math.floor(n*100%100);return`${String(t).padStart(2,"0")}:${String(e).padStart(2,"0")}.${String(i).padStart(2,"0")}`}function Np(n){let t=0;for(let i of n)t+=i.w;let e=Math.random()*t;for(let i of n)if(e-=i.w,e<=0)return i;return n[n.length-1]}var yn={get(n,t){try{let e=localStorage.getItem(n);return e==null?t:JSON.parse(e)}catch{return t}},set(n,t){try{localStorage.setItem(n,JSON.stringify(t))}catch{}}};function Be(n,t){let e=Math.sin(n*127.1+t*311.7)*43758.5453;return e-Math.floor(e)}function ar(n,t){let e=Math.floor(n),i=Math.floor(t),s=n-e,r=t-i,a=s*s*(3-2*s),o=r*r*(3-2*r),c=Be(e,i),l=Be(e+1,i),h=Be(e,i+1),d=Be(e+1,i+1);return c+(l-c)*a+(h-c)*o+(c-l-h+d)*a*o}var uu=(n,t)=>ar(n,t)*.55+ar(n*2.1,t*2.1)*.3+ar(n*4.3,t*4.3)*.15,Up={high:{pr:2,shadow:2048,bloom:!0,embers:900,aa:!0},mid:{pr:1.5,shadow:1024,bloom:!0,embers:500,aa:!1},low:{pr:1,shadow:0,bloom:!1,embers:220,aa:!1}},sl=class{constructor(t,e){this.canvas=t,this.qName=e,this.q=Up[e],this.renderer=new Yc({canvas:t,antialias:this.q.aa,powerPreference:"high-performance"}),this.renderer.toneMapping=ls,this.renderer.toneMappingExposure=1.2,this.renderer.outputColorSpace=Ve,this.renderer.shadowMap.type=os,this.scene=new Gs,this.scene.fog=new Lr(2757648,.0125),this.camera=new ni(80,1,.08,900),this.camera.rotation.order="YXZ",this.scene.add(this.camera),this.vmScene=new Gs,this.vmCamera=new ni(58,1,.01,20),this.time=0,this.trauma=0,this.shake={x:0,y:0,z:0},this.rage=0,this._buildLights(),this._buildSky(),this._buildGround(),this._buildRocks(),this._buildMountains(),this._buildEmbers(),this.setQuality(e),addEventListener("resize",()=>this.resize()),this.resize()}_buildLights(){let t=new Zs(7307189,9057298,1.05);this.scene.add(t),this.hemi=t;let e=new Fn(12570879,1.9);e.position.set(-30,60,25),e.shadow.camera.left=-34,e.shadow.camera.right=34,e.shadow.camera.top=34,e.shadow.camera.bottom=-34,e.shadow.camera.near=1,e.shadow.camera.far=160,e.shadow.bias=-6e-4,e.shadow.normalBias=.05,this.scene.add(e),this.scene.add(e.target),this.moon=e;let i=new Fn(16734748,1.25);i.position.set(10,8,-60),this.scene.add(i),this.vmScene.add(new Zs(9412816,10108952,1.3));let s=new Fn(14673663,1.6);s.position.set(-1,2,1.5),this.vmScene.add(s);let r=new Fn(16738858,.9);r.position.set(1.5,.2,-1),this.vmScene.add(r),this.vmGlow=new $i(16752704,0,4),this.vmGlow.position.set(.3,.1,-.8),this.vmScene.add(this.vmGlow)}_buildSky(){let t=new Pe({side:ai,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0},uRage:{value:0}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        varying vec3 vDir; uniform float uTime; uniform float uRage;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        float fbm(vec2 p){ float a=0.0, w=0.5; for(int i=0;i<4;i++){ a+=noise(p)*w; p*=2.03; w*=0.5; } return a; }
        void main(){
          vec3 d = normalize(vDir);
          float h = d.y;
          vec3 top = vec3(0.012,0.016,0.045), mid = vec3(0.13,0.045,0.09), hor = vec3(0.95,0.26,0.06);
          vec3 col = mix(mid, top, smoothstep(0.05,0.7,h));
          col = mix(hor*(0.75+uRage*0.5), col, smoothstep(-0.08,0.26,h));
          // \u706B\u5C71\u65B9\u5411 (-Z) \u306E\u7A7A\u713C\u3051
          float toV = max(dot(normalize(d.xz+1e-5), vec2(0.0,-1.0)),0.0);
          col += vec3(1.0,0.32,0.08) * pow(toV, 6.0) * smoothstep(0.5,-0.02,h) * 0.75;
          // \u5674\u7159
          vec2 uv = vec2(atan(d.x,d.z)*2.2, h*5.0);
          float sm = fbm(uv*1.2 + vec2(uTime*0.012, -uTime*0.006));
          float band = smoothstep(0.62,0.02,h) * smoothstep(0.42,0.75,sm);
          col = mix(col, vec3(0.05,0.02,0.025) + hor*0.14*toV, band*0.82);
          // \u661F
          vec2 sp = d.xz/(abs(d.y)+0.35)*90.0;
          float st = step(0.9965, hash(floor(sp))) * smoothstep(0.18,0.6,h) * (1.0-band);
          col += vec3(0.8,0.85,1.0) * st * (0.6+0.4*sin(uTime*2.0+hash(floor(sp))*40.0));
          // \u6708\uFF08\u7070\u306B\u971E\u3080\uFF09
          vec3 md = normalize(vec3(-0.42,0.62,0.38));
          float m = dot(d, md);
          col += vec3(0.85,0.9,1.0) * smoothstep(0.9975,0.9985,m) * 1.5;
          col += vec3(0.35,0.42,0.6) * pow(max(m,0.0), 60.0) * 0.5;
          gl_FragColor = vec4(col, 1.0);
        }`});this.sky=new Jt(new rs(700,32,20),t),this.sky.frustumCulled=!1,this.scene.add(this.sky)}groundH(t,e){let i=Math.hypot(t,e);if(i<=42)return 0;let s=i-42,r=-2.4*Dt(s/5)*Dt((22-s)/8),a=Math.pow(Dt((s-14)/60),1.4)*46,o=(uu(t*.045+7,e*.045+3)-.45)*9*Dt(s/10);return r+a+o}_buildGround(){let e=document.createElement("canvas"),i=document.createElement("canvas");e.width=e.height=i.width=i.height=1024;let s=e.getContext("2d"),r=i.getContext("2d");s.fillStyle="#3a312c",s.fillRect(0,0,1024,1024),r.fillStyle="#000",r.fillRect(0,0,1024,1024);for(let u=0;u<2600;u++){let p=Math.random()*1024,x=Math.random()*1024,m=2+Math.random()*26,g=30+Math.random()*46;s.fillStyle=`rgba(${g+12},${g+3},${g-2},${.06+Math.random()*.12})`,s.beginPath(),s.ellipse(p,x,m,m*(.4+Math.random()*.6),Math.random()*3,0,Ne),s.fill()}for(let u=0;u<9e3;u++){let p=Math.random()<.5?14:96;s.fillStyle=`rgba(${p},${p*.9},${p*.85},${Math.random()*.22})`,s.fillRect(Math.random()*1024,Math.random()*1024,1+Math.random()*2,1+Math.random()*2)}let a=u=>{let p=Math.random()*1024,x=Math.random()*1024,m=Math.random()*Ne,g=[[p,x]],v=14+Math.random()*30;for(let M=0;M<v;M++)m+=(Math.random()-.5)*1.3,p+=Math.cos(m)*(8+Math.random()*16),x+=Math.sin(m)*(8+Math.random()*16),g.push([p,x]);for(let M=-1024;M<=1024;M+=1024)for(let y=-1024;y<=1024;y+=1024){let w=E=>{E.beginPath(),g.forEach(([_,S],R)=>R?E.lineTo(_+M,S+y):E.moveTo(_+M,S+y)),E.stroke()};s.lineCap=r.lineCap="round",s.lineJoin=r.lineJoin="round",s.strokeStyle="rgba(8,6,5,0.9)",s.lineWidth=u?7:3,w(s),u&&(r.strokeStyle="rgba(255,70,10,0.3)",r.lineWidth=9,w(r),r.strokeStyle="rgba(255,110,30,0.85)",r.lineWidth=3,w(r),r.strokeStyle="rgba(255,210,130,1)",r.lineWidth=1,w(r),s.strokeStyle="rgba(120,40,10,0.8)",s.lineWidth=3,w(s))}};for(let u=0;u<26;u++)a(!1);for(let u=0;u<9;u++)a(!0);let o=new un(e),c=new un(i);for(let u of[o,c])u.wrapS=u.wrapT=ks,u.repeat.set(16,16),u.anisotropy=8;o.colorSpace=Ve,c.colorSpace=Ve;let l=new Yi(520,520,150,150);l.rotateX(-Math.PI/2);let h=l.attributes.position;for(let u=0;u<h.count;u++)h.setY(u,this.groundH(h.getX(u),h.getZ(u)));l.computeVertexNormals(),this.groundMat=new de({map:o,emissiveMap:c,emissive:16777215,emissiveIntensity:1.2,roughness:.94,metalness:.02});let d=new Jt(l,this.groundMat);d.receiveShadow=!0,this.scene.add(d),this.lavaMat=new Pe({uniforms:{uTime:{value:0},uRage:{value:0},fogColor:{value:this.scene.fog.color},fogDensity:{value:this.scene.fog.density}},vertexShader:"varying vec2 vP; varying float vD; void main(){ vP = position.xz; vec4 mv = modelViewMatrix*vec4(position,1.0); vD = -mv.z; gl_Position = projectionMatrix*mv; }",fragmentShader:`
        varying vec2 vP; varying float vD; uniform float uTime; uniform float uRage; uniform vec3 fogColor; uniform float fogDensity;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
        void main(){
          vec2 p = vP*0.16;
          float n = noise(p + vec2(uTime*0.05, uTime*0.03)) * 0.6 + noise(p*2.7 - vec2(uTime*0.07, 0.0)) * 0.4;
          float crust = smoothstep(0.38, 0.62, n);
          vec3 hot = mix(vec3(1.0,0.2,0.02), vec3(1.0,0.75,0.25), smoothstep(0.1,0.45,1.0-n)) * (2.2 + uRage*1.2);
          vec3 col = mix(hot, vec3(0.06,0.02,0.015), crust);
          float f = 1.0 - exp(-fogDensity*fogDensity*vD*vD*0.45);
          gl_FragColor = vec4(mix(col, fogColor, f), 1.0);
        }`});let f=new Jt(new ss(41,96,96,1),this.lavaMat);f.rotation.x=-Math.PI/2,f.position.y=-1.1,this.scene.add(f),this.lavaLights=[];for(let u=0;u<4;u++){let p=new $i(16734744,260,75,1.7),x=u/4*Ne+.6;p.position.set(Math.cos(x)*48,2.5,Math.sin(x)*48),this.scene.add(p),this.lavaLights.push(p)}}_rockGeo(t){let e=new fn(1,1),i=e.attributes.position,s=new Map;for(let r=0;r<i.count;r++){let a=`${i.getX(r).toFixed(3)},${i.getY(r).toFixed(3)},${i.getZ(r).toFixed(3)}`;s.has(a)||s.set(a,.72+Be(s.size*1.7+t,t*3.1)*.6);let o=s.get(a);i.setXYZ(r,i.getX(r)*o,i.getY(r)*o,i.getZ(r)*o)}return e.computeVertexNormals(),e}_buildRocks(){let t=[this._rockGeo(1),this._rockGeo(2),this._rockGeo(3)],e=new de({color:3879985,roughness:.95,flatShading:!0}),i=new de({color:4865334,roughness:.9,flatShading:!0});this.rocks=new be;let s=46;for(let a=0;a<s;a++){let o=a/s*Ne+Be(a,5)*.08,c=a%5===0,l=39+2.4+Be(a,9)*2.2+(c?1.2:0),h=new Jt(t[a%3],a%2?e:i),d=(c?3.4:1.9)+Be(a,2)*1.6,f=(c?9:3)+Be(a,3)*(c?9:4.5);h.scale.set(d,f,d*(.8+Be(a,4)*.5)),h.position.set(Math.cos(o)*l,f*.28-.6,Math.sin(o)*l),h.rotation.set((Be(a,6)-.5)*.35,Be(a,7)*Ne,(Be(a,8)-.5)*.35),h.castShadow=!0,h.receiveShadow=!0,this.rocks.add(h)}for(let a=0;a<34;a++){let o=Be(a,21)*Ne,c=66+Be(a,22)*70,l=new Jt(t[a%3],e),h=6+Be(a,23)*12,d=10+Be(a,24)*30;l.scale.set(h,d,h);let f=Math.cos(o)*c,u=Math.sin(o)*c;l.position.set(f,this.groundH(f,u)+d*.2,u),l.rotation.set((Be(a,25)-.5)*.5,Be(a,26)*Ne,(Be(a,27)-.5)*.5),this.rocks.add(l)}let r=new de({color:11050892,roughness:.8,flatShading:!0});for(let a=0;a<7;a++){let o=new Ws([new P(0,-2,0),new P(1.5,9,0),new P(6,16-a*.6,0),new P(12,14-a,0)]),c=new Jt(new Zr(o,10,.75-a*.05,5,!1),r),l=-2.2+a*.13;c.position.set(Math.cos(l)*46,0,Math.sin(l)*46),c.rotation.y=-l+Math.PI,c.castShadow=!0,this.rocks.add(c)}this.scene.add(this.rocks)}_buildMountains(){let t=(r,a,o,c,l,h)=>{let d=[];for(let p=0;p<h;p++){let x=p/h*Ne,m=(p+1)/h*Ne,g=a+uu(p*.35+l,l)*(o-a)*(.5+Be(p,l)),v=a+uu((p+1)*.35+l,l)*(o-a)*(.5+Be(p+1,l)),M=Math.cos(x)*r,y=Math.sin(x)*r,w=Math.cos(m)*r,E=Math.sin(m)*r;d.push(M,-10,y,w,-10,E,M,g,y,w,-10,E,w,v,E,M,g,y)}let f=new Te;f.setAttribute("position",new oe(d,3));let u=new Jt(f,new ke({color:c,fog:!1,side:qe}));u.frustumCulled=!1,this.scene.add(u)};t(330,40,150,1838356,3,90),t(230,22,80,853769,11,110);let e=new Jt(new es(150,210,9,1,!0),new ke({color:1050377,fog:!1}));e.position.set(30,85,-380),this.scene.add(e);let i=this._radialTex("rgba(255,150,50,1)","rgba(255,60,10,0)"),s=new jn(new In({map:i,blending:ei,fog:!1,depthWrite:!1,opacity:.6}));s.position.set(30,205,-378),s.scale.set(170,120,1),this.scene.add(s),this.volGlow=s;for(let r=0;r<3;r++){let a=new Jt(new Yi(1.6+r*.8,120-r*20),new ke({color:16738844,fog:!1}));a.position.set(10+r*22,118+r*6,-318-r*1.5),a.rotation.set(-.62,0,(r-1)*.34),this.scene.add(a)}}_radialTex(t,e){let i=document.createElement("canvas");i.width=i.height=128;let s=i.getContext("2d"),r=s.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,t),r.addColorStop(1,e),s.fillStyle=r,s.fillRect(0,0,128,128);let a=new un(i);return a.colorSpace=Ve,a}_buildEmbers(){let e=new Float32Array(2700),i=new Float32Array(900);for(let r=0;r<900;r++)e[r*3]=Math.random()*70,e[r*3+1]=Math.random()*26,e[r*3+2]=Math.random()*70,i[r]=Math.random();let s=new Te;s.setAttribute("position",new Fe(e,3)),s.setAttribute("aSeed",new Fe(i,1)),this.emberMat=new Pe({transparent:!0,depthWrite:!1,blending:ei,uniforms:{uTime:{value:0},uCam:{value:new P},uScale:{value:1},uRage:{value:0}},vertexShader:`
        attribute float aSeed; uniform float uTime; uniform vec3 uCam; uniform float uScale; uniform float uRage; varying float vA; varying float vSeed;
        void main(){
          vec3 p = position;
          float ash = step(0.62, aSeed);
          float sp = mix(1.6 + aSeed*3.2, -0.5 - aSeed*0.5, ash) * (1.0 + uRage*0.8*(1.0-ash));
          p.y = mod(p.y + uTime*sp, 26.0);
          p.x += sin(uTime*(0.5+aSeed) + aSeed*40.0) * 1.4; p.z += cos(uTime*(0.4+aSeed*0.7) + aSeed*17.0) * 1.4;
          p.xz = mod(p.xz - uCam.xz + 35.0, 70.0) - 35.0 + uCam.xz;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uScale * mix(26.0, 34.0, ash) * (0.5 + aSeed) / max(-mv.z, 0.5);
          vA = (1.0 - ash*0.72) * smoothstep(26.0, 20.0, p.y) * smoothstep(0.0, 1.5, p.y) * (0.6 + 0.4*sin(uTime*7.0 + aSeed*90.0));
          vSeed = ash;
        }`,fragmentShader:`
        varying float vA; varying float vSeed;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if (d > 0.5) discard;
          vec3 col = mix(vec3(1.0,0.5,0.12), vec3(0.5,0.48,0.46), vSeed);
          gl_FragColor = vec4(col * vA * smoothstep(0.5, 0.0, d) * 1.8, 1.0); }`}),this.embers=new Qn(s,this.emberMat),this.embers.frustumCulled=!1,this.scene.add(this.embers)}setQuality(t){this.qName=t,this.q=Up[t];let e=this.q;this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,e.pr)),this.renderer.shadowMap.enabled=e.shadow>0,this.moon.castShadow=e.shadow>0,e.shadow&&(this.moon.shadow.mapSize.set(e.shadow,e.shadow),this.moon.shadow.map&&(this.moon.shadow.map.dispose(),this.moon.shadow.map=null)),this.embers.geometry.setDrawRange(0,e.embers);for(let i=0;i<this.lavaLights.length;i++)this.lavaLights[i].visible=t!=="low"||i<2;if(this.scene.traverse(i=>{i.material&&i.material.isMeshStandardMaterial&&(i.material.needsUpdate=!0)}),e.bloom){this.composer=new jc(this.renderer),this.composer.addPass(new va(this.scene,this.camera));let i=new va(this.vmScene,this.vmCamera);i.clear=!1,i.clearDepth=!0,this.composer.addPass(i),this.bloom=new sr(new et(256,256),.62,.55,.82),this.composer.addPass(this.bloom),this.composer.addPass(new Qc)}else this.composer=null,this.bloom=null;this.resize()}resize(){let t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.vmCamera.aspect=t/e,this.vmCamera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(t,e)),this.emberMat.uniforms.uScale.value=e/900*this.renderer.getPixelRatio()*4}addShake(t){this.trauma=Math.min(1.25,this.trauma+t)}update(t,e){this.time+=t;let i=this.time;this.sky.material.uniforms.uTime.value=i,this.sky.material.uniforms.uRage.value=this.rage,this.sky.position.copy(this.camera.position),this.lavaMat.uniforms.uTime.value=i,this.lavaMat.uniforms.uRage.value=this.rage,this.emberMat.uniforms.uTime.value=i,this.emberMat.uniforms.uCam.value.copy(this.camera.position),this.emberMat.uniforms.uRage.value=this.rage,this.groundMat.emissiveIntensity=1.05+Math.sin(i*1.3)*.22+this.rage*1.3;for(let r=0;r<this.lavaLights.length;r++)this.lavaLights[r].intensity=(240+Math.sin(i*2.1+r*2)*50)*(1+this.rage*.7);this.volGlow.material.opacity=.5+Math.sin(i*.7)*.1+this.rage*.25,e&&(this.moon.target.position.set(e.x*.6,0,e.z*.6),this.moon.position.set(e.x*.6-30,60,e.z*.6+25)),this.trauma=Math.max(0,this.trauma-t*1.5);let s=this.trauma*this.trauma;this.shake.x=(ar(i*31,1.3)-.5)*.14*s,this.shake.y=(ar(i*33,7.7)-.5)*.14*s,this.shake.z=(ar(i*29,4.1)-.5)*.2*s,this.bloom&&(this.bloom.strength=.6+this.rage*.25)}render(){let t=this.renderer;if(this.composer){this.composer.render();return}t.autoClear=!0,t.render(this.scene,this.camera),t.autoClear=!1,t.clearDepth(),t.render(this.vmScene,this.vmCamera),t.autoClear=!0}};var Di=2600,rl=new P,al=class{constructor(t,e){this.world=t,this.scene=t.scene,this.layer=e,this.n=Di,this.cursor=0,this.pos=new Float32Array(Di*3),this.vel=new Float32Array(Di*3),this.col=new Float32Array(Di*3),this.size=new Float32Array(Di),this.life=new Float32Array(Di),this.maxLife=new Float32Array(Di),this.grav=new Float32Array(Di),this.drag=new Float32Array(Di),this.alpha=new Float32Array(Di);let i=new Te;i.setAttribute("position",new Fe(this.pos,3)),i.setAttribute("aCol",new Fe(this.col,3)),i.setAttribute("aSize",new Fe(this.size,1)),i.setAttribute("aAlpha",new Fe(this.alpha,1)),this.pmat=new Pe({transparent:!0,depthWrite:!1,blending:ei,uniforms:{uScale:{value:1}},vertexShader:`attribute vec3 aCol; attribute float aSize; attribute float aAlpha; varying vec3 vC; varying float vA; uniform float uScale;
        void main(){ vC = aCol; vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv;
          float px = uScale*aSize/max(-mv.z,0.3); float cap = uScale*0.42;
          // \u5927\u304D\u3044\u7C92\uFF08\u708E\u30FB\u7159\uFF09\u306F\u6697\u3081\u306B\u3057\u3066\u3001\u76EE\u306E\u524D\u3067\u3082\u753B\u9762\u304C\u767D\u98DB\u3073\u3057\u306A\u3044\u3088\u3046\u306B\u3059\u308B
          vA = aAlpha * mix(1.5, 0.2, smoothstep(0.5, 2.0, aSize)) * min(1.0, cap/max(px,1.0));
          gl_PointSize = aAlpha > 0.0 ? min(px, cap) : 0.0; }`,fragmentShader:"varying vec3 vC; varying float vA; void main(){ float d = length(gl_PointCoord-0.5); if(d>0.5) discard; float f = smoothstep(0.5,0.0,d); gl_FragColor = vec4(vC*vA*f*f, 1.0); }"}),this.points=new Qn(i,this.pmat),this.points.frustumCulled=!1,this.points.renderOrder=5,this.scene.add(this.points),this.rings=[],this.markers=[],this.pillars=[],this.balls=[],this.tracers=[],this.zones=[],this.boxGeo=new si(1,1,1),this.ringGeo=new ss(.86,1,64),this.ringGeo.rotateX(-Math.PI/2),this.discGeo=new ts(1,40),this.discGeo.rotateX(-Math.PI/2),this.cylGeo=new ri(1,1,1,20,1,!0),this.cylGeo.translate(0,.5,0),this.ballGeo=new fn(1,1),this.flashLight=new $i(16752720,0,30,1.6),this.scene.add(this.flashLight),this.numbers=[],this.tmp=new P}resize(t,e){this.pmat.uniforms.uScale.value=t*e*.9}burst(t,e,i={}){let s=i.speed??6,r=i.life??.6,a=i.size??.25,o=i.color??[1,.6,.2],c=i.color2??o,l=i.dir,h=i.spread??1,d=i.jitter??.15;for(let f=0;f<e;f++){let u=this.cursor;this.cursor=(this.cursor+1)%Di;let p,x,m,g=Math.random()*2-1,v=Math.random()*Ne,M=Math.sqrt(1-g*g);p=M*Math.cos(v),x=g,m=M*Math.sin(v),l&&(p=l[0]+p*h,x=l[1]+x*h,m=l[2]+m*h);let y=s*(.35+Math.random()*.65);this.vel[u*3]=p*y,this.vel[u*3+1]=x*y,this.vel[u*3+2]=m*y,this.pos[u*3]=t.x+(Math.random()-.5)*d,this.pos[u*3+1]=t.y+(Math.random()-.5)*d,this.pos[u*3+2]=t.z+(Math.random()-.5)*d;let w=Math.random();this.col[u*3]=o[0]+(c[0]-o[0])*w,this.col[u*3+1]=o[1]+(c[1]-o[1])*w,this.col[u*3+2]=o[2]+(c[2]-o[2])*w,this.size[u]=a*(.6+Math.random()*.8),this.life[u]=this.maxLife[u]=r*(.5+Math.random()*.7),this.grav[u]=i.gravity??9,this.drag[u]=i.drag??1.2,this.alpha[u]=1}}hitSpark(t,e,i){this.burst(t,e?46:22,{speed:e?13:9,life:.45,size:e?.5:.36,color:i?[1,.9,.4]:[1,.55,.15],color2:[1,.25,.05],gravity:14}),this.burst(t,e?10:5,{speed:2,life:.22,size:e?2.6:1.7,color:[1,.8,.5],gravity:0,drag:4}),this.flash(t,e?60:26,.12)}metalSpark(t){this.burst(t,30,{speed:12,life:.3,size:.26,color:[.8,.9,1],color2:[1,1,.7],gravity:16}),this.flash(t,20,.08,12572927)}dust(t,e=16,i=4){this.burst(t,e,{speed:i,life:1.1,size:1.9,color:[.2,.14,.11],color2:[.12,.09,.08],gravity:-.6,drag:2.2,dir:[0,.35,0],spread:1})}flash(t,e,i,s=16752720){this.flashLight.color.setHex(s),this.flashLight.position.copy(t),this.flashLight.intensity=e*2.5,this._flashDecay=e*2.5/i}ring(t,e,i,s,r,a=16742954){let o=new Jt(this.ringGeo,new ke({color:a,transparent:!0,blending:ei,depthWrite:!1,side:qe,fog:!1}));o.position.set(t,.12,e),this.scene.add(o),this.rings.push({m:o,t:i,speed:s,maxR:r})}marker(t,e,i,s){let r=new Jt(this.discGeo,new ke({color:16726544,transparent:!0,opacity:.2,blending:ei,depthWrite:!1,fog:!1})),a=new Jt(this.ringGeo,new ke({color:16756832,transparent:!0,opacity:.9,blending:ei,depthWrite:!1,fog:!1,side:qe}));r.position.set(t,.06,e),r.scale.setScalar(i),a.position.set(t,.08,e),this.scene.add(r,a),this.markers.push({m:r,e:a,r:i,t:0,delay:s})}pillar(t,e,i,s=16738848){let r=new Jt(this.cylGeo,new ke({color:s,transparent:!0,blending:ei,depthWrite:!1,side:qe,fog:!1}));r.position.set(t,0,e),this.scene.add(r),this.pillars.push({m:r,r:i,t:0}),rl.set(t,.5,e),this.burst(rl,40,{speed:20,life:.9,size:.6,color:[1,.5,.1],color2:[1,.2,.02],dir:[0,1.4,0],spread:.5,gravity:12,jitter:i}),this.burst(rl,24,{speed:6,life:1.4,size:3,color:[.25,.12,.08],gravity:-1.5,drag:2,jitter:i}),this.flash(rl.set(t,2,e),80,.3)}ball(t,e,i){let s=new Jt(this.ballGeo,new ke({color:16760944,fog:!1}));s.scale.setScalar(.9),this.scene.add(s),this.balls.push({m:s,from:t.clone(),to:e.clone(),t:0,dur:i})}tracer(t,e,i){let s=new Jt(this.boxGeo,new ke({color:i?16732208:16769184,transparent:!0,blending:ei,depthWrite:!1,fog:!1})),r=t.distanceTo(e),a=i?.1:.035;s.position.lerpVectors(t,e,.5),s.lookAt(e),s.scale.set(a,a,r),this.scene.add(s),this.tracers.push({m:s,t:0,dur:i?.35:.2})}zone(t,e,i,s,r=0,a=0,o=0){let c;t==="fan"?(c=new ts(e.r,28,-Math.PI/2-e.half,e.half*2),c.rotateX(-Math.PI/2)):t==="rect"?(c=new Yi(e.w,e.len),c.rotateX(-Math.PI/2),c.translate(0,0,e.len/2)):(c=new ts(e.r,40),c.rotateX(-Math.PI/2));let l=new Jt(c,new ke({color:13113864,transparent:!0,opacity:.04,blending:ei,depthWrite:!1,fog:!1,side:qe}));l.position.set(r,.07,a),l.rotation.y=o,this.scene.add(l),this.zones.push({m:l,t:0,dur:i,follow:s,rot:e.rot||0})}number(t,e,i){let s=document.createElement("div");s.className="dmg "+(i||""),s.textContent=e,this.layer.appendChild(s),this.numbers.push({el:s,p:t.clone(),t:0,ox:Ie(-24,24),vy:Ie(60,90)}),this.numbers.length>40&&this.numbers.shift().el.remove()}update(t,e){let{pos:i,vel:s,life:r,maxLife:a,grav:o,drag:c,alpha:l}=this;for(let u=0;u<Di;u++){if(r[u]<=0)continue;if(r[u]-=t,r[u]<=0){l[u]=0;continue}let p=Math.exp(-c[u]*t),x=u*3;s[x]*=p,s[x+1]=s[x+1]*p-o[u]*t,s[x+2]*=p,i[x]+=s[x]*t,i[x+1]+=s[x+1]*t,i[x+2]+=s[x+2]*t,i[x+1]<.03&&o[u]>0&&(i[x+1]=.03,s[x+1]*=-.3,s[x]*=.6,s[x+2]*=.6),l[u]=Math.min(1,r[u]/a[u]*2.2)}let h=this.points.geometry;h.attributes.position.needsUpdate=!0,h.attributes.aAlpha.needsUpdate=!0,h.attributes.aCol.needsUpdate=!0,h.attributes.aSize.needsUpdate=!0,this.flashLight.intensity>0&&(this.flashLight.intensity=Math.max(0,this.flashLight.intensity-(this._flashDecay||100)*t));for(let u=this.rings.length-1;u>=0;u--){let p=this.rings[u];p.t+=t;let x=Math.max(.01,p.t*p.speed);p.m.scale.set(x,1,x),p.m.material.opacity=Dt(1.3-x/p.maxR)*.95,p.m.visible=p.t>=0,x>=p.maxR&&(this.scene.remove(p.m),p.m.material.dispose(),this.rings.splice(u,1))}for(let u=this.markers.length-1;u>=0;u--){let p=this.markers[u];p.t+=t;let x=Dt(p.t/p.delay);p.e.scale.setScalar(p.r*(1-x*.999)+.001+p.r*0),p.e.scale.y=1,p.m.material.opacity=.14+x*.3+Math.sin(p.t*22)*.05,p.t>=p.delay&&(this.scene.remove(p.m,p.e),p.m.material.dispose(),p.e.material.dispose(),this.markers.splice(u,1))}for(let u=this.pillars.length-1;u>=0;u--){let p=this.pillars[u];p.t+=t;let x=p.t/.7;p.m.scale.set(p.r*(.6+x*.5),2+x*16,p.r*(.6+x*.5)),p.m.material.opacity=Dt(1-x)*.5,x>=1&&(this.scene.remove(p.m),p.m.material.dispose(),this.pillars.splice(u,1))}for(let u=this.balls.length-1;u>=0;u--){let p=this.balls[u];p.t+=t;let x=Dt(p.t/p.dur);p.m.position.lerpVectors(p.from,p.to,x),p.m.position.y+=Math.sin(x*Math.PI)*9,this.burst(p.m.position,3,{speed:1.5,life:.5,size:1.5,color:[1,.5,.1],color2:[.6,.12,.02],gravity:-1,drag:2}),x>=1&&(this.scene.remove(p.m),p.m.material.dispose(),this.balls.splice(u,1))}for(let u=this.tracers.length-1;u>=0;u--){let p=this.tracers[u];p.t+=t,p.m.material.opacity=Dt(1-p.t/p.dur),p.t>=p.dur&&(this.scene.remove(p.m),p.m.material.dispose(),this.tracers.splice(u,1))}for(let u=this.zones.length-1;u>=0;u--){let p=this.zones[u];p.t+=t;let x=Dt(p.t/p.dur);p.follow&&(p.m.position.set(p.follow.x,.07,p.follow.z),p.m.rotation.y=p.follow.yaw+p.rot),p.m.material.opacity=.05+x*.13+Math.sin(p.t*26)*.02,p.t>=p.dur&&(this.scene.remove(p.m),p.m.geometry.dispose(),p.m.material.dispose(),this.zones.splice(u,1))}let d=innerWidth,f=innerHeight;for(let u=this.numbers.length-1;u>=0;u--){let p=this.numbers[u];if(p.t+=t,p.t>.9){p.el.remove(),this.numbers.splice(u,1);continue}if(this.tmp.copy(p.p).project(e),this.tmp.z>1){p.el.style.opacity=0;continue}let x=(this.tmp.x*.5+.5)*d+p.ox,m=(-this.tmp.y*.5+.5)*f-p.vy*Math.sqrt(p.t),g=p.t<.1?1.7-p.t*7:1;p.el.style.transform=`translate(${x.toFixed(0)}px,${m.toFixed(0)}px) translate(-50%,-50%) scale(${g.toFixed(2)})`,p.el.style.opacity=p.t>.6?(.9-p.t)/.3:1}}clear(){for(let t of this.rings)this.scene.remove(t.m);for(let t of this.markers)this.scene.remove(t.m,t.e);for(let t of this.pillars)this.scene.remove(t.m);for(let t of this.balls)this.scene.remove(t.m);for(let t of this.tracers)this.scene.remove(t.m);for(let t of this.zones)this.scene.remove(t.m);this.rings.length=this.markers.length=this.pillars.length=this.balls.length=this.tracers.length=this.zones.length=0;for(let t of this.numbers)t.el.remove();this.numbers.length=0,this.life.fill(0),this.alpha.fill(0)}};var ol=class{constructor(){this.ctx=null,this.volume=.8,this.musicVol=.55,this.intensity=0,this._timer=null,this._step=0,this._nextT=0,this._breath=null}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let e=this.ctx=new t;this.master=e.createGain(),this.master.gain.value=this.volume;let i=e.createDynamicsCompressor();i.threshold.value=-14,i.ratio.value=5,i.attack.value=.004,i.release.value=.2,this.master.connect(i),i.connect(e.destination),this.sfx=e.createGain(),this.sfx.connect(this.master),this.music=e.createGain(),this.music.gain.value=this.musicVol,this.music.connect(this.master);let s=e.sampleRate*2;this.noiseBuf=e.createBuffer(1,s,e.sampleRate);let r=this.noiseBuf.getChannelData(0);for(let l=0;l<s;l++)r[l]=Math.random()*2-1;this.shaper=l=>{let h=e.createWaveShaper(),d=256,f=new Float32Array(d);for(let u=0;u<d;u++){let p=u/(d-1)*2-1;f[u]=Math.tanh(p*l)}return h.curve=f,h};let a=e.sampleRate*1.8,o=e.createBuffer(2,a,e.sampleRate);for(let l=0;l<2;l++){let h=o.getChannelData(l);for(let d=0;d<a;d++)h[d]=(Math.random()*2-1)*Math.pow(1-d/a,2.6)}this.reverb=e.createConvolver(),this.reverb.buffer=o;let c=e.createGain();c.gain.value=.28,this.reverb.connect(c),c.connect(this.master)}setVolume(t){this.volume=t,this.master&&(this.master.gain.value=t)}_noise(t,e,i,s,r,a,o,c=.005,l=this.sfx,h=0){let d=this.ctx,f=d.createBufferSource();f.buffer=this.noiseBuf,f.loop=!0,f.playbackRate.value=.7+Math.random()*.6;let u=d.createBiquadFilter();u.type=i,u.Q.value=a,u.frequency.setValueAtTime(s,t),u.frequency.exponentialRampToValueAtTime(Math.max(20,r),t+e);let p=d.createGain();if(p.gain.setValueAtTime(1e-4,t),p.gain.linearRampToValueAtTime(o,t+c),p.gain.exponentialRampToValueAtTime(1e-4,t+e),f.connect(u),u.connect(p),p.connect(l),h){let x=d.createGain();x.gain.value=h,p.connect(x),x.connect(this.reverb)}f.start(t,Math.random()),f.stop(t+e+.05)}_osc(t,e,i,s,r,a,o=.005,c=this.sfx,l=0){let h=this.ctx,d=h.createOscillator();d.type=e,d.frequency.setValueAtTime(i,t),d.frequency.exponentialRampToValueAtTime(Math.max(20,s),t+r);let f=h.createGain();if(f.gain.setValueAtTime(1e-4,t),f.gain.linearRampToValueAtTime(a,t+o),f.gain.exponentialRampToValueAtTime(1e-4,t+r),d.connect(f),f.connect(c),l){let u=h.createGain();u.gain.value=l,f.connect(u),u.connect(this.reverb)}d.start(t),d.stop(t+r+.05)}play(t,e=1,i=0){if(!this.ctx||this.ctx.state!=="running")return;let s=e*Ce(1/(1+i*i/500),.06,1),r=this.ctx.currentTime+.005,a=this._noise.bind(this),o=this._osc.bind(this);switch(t){case"swing":a(r,.2,"bandpass",500,2600,1.2,.35*s,.05);break;case"swingHeavy":a(r,.34,"bandpass",260,2e3,1,.55*s,.1),o(r,"sine",120,50,.3,.2*s);break;case"hit":a(r,.16,"lowpass",3800,400,.8,.8*s,.002,this.sfx,.3),o(r,"sine",170,55,.2,.7*s),o(r,"triangle",900,300,.07,.22*s);break;case"hitHeavy":a(r,.32,"lowpass",5200,260,.8,1*s,.002,this.sfx,.5),o(r,"sine",140,36,.45,1*s),o(r,"square",520,120,.12,.2*s),a(r+.03,.5,"bandpass",2400,700,3,.25*s,.01,this.sfx,.6);break;case"weak":o(r,"triangle",1500,2300,.14,.22*s,.004,this.sfx,.5),o(r+.05,"sine",2300,3100,.2,.14*s,.004,this.sfx,.5);break;case"bounce":o(r,"square",2100,1500,.12,.2*s,.001,this.sfx,.5),o(r,"triangle",3300,2800,.25,.18*s,.001,this.sfx,.6),a(r,.08,"highpass",4e3,6e3,1,.3*s);break;case"dodge":a(r,.26,"bandpass",900,300,.8,.3*s,.06);break;case"just":o(r,"sine",880,1760,.35,.3*s,.01,this.sfx,.8),o(r+.06,"sine",1320,2640,.4,.22*s,.01,this.sfx,.8),a(r,.5,"highpass",5e3,9e3,1,.12*s,.1);break;case"guard":o(r,"square",320,180,.12,.3*s),a(r,.14,"bandpass",2400,1200,2,.5*s,.002,this.sfx,.3),o(r,"sine",110,60,.2,.5*s);break;case"parry":o(r,"triangle",2400,2350,.6,.35*s,.001,this.sfx,.9),o(r,"sine",3600,3550,.5,.22*s,.001,this.sfx,.9),a(r,.1,"highpass",5e3,8e3,1,.5*s),o(r,"sine",160,60,.25,.6*s);break;case"hurt":o(r,"sine",200,60,.3,.9*s),a(r,.22,"lowpass",1800,300,1,.7*s,.003);break;case"down":o(r,"sawtooth",220,55,.9,.3*s,.01,this.sfx,.5),o(r,"sine",110,40,1,.6*s);break;case"charge1":o(r,"sine",520,700,.16,.2*s,.01,this.sfx,.4);break;case"charge2":o(r,"sine",700,940,.18,.24*s,.01,this.sfx,.4);break;case"charge3":o(r,"sine",940,1400,.3,.3*s,.01,this.sfx,.6),o(r,"triangle",1880,2800,.3,.14*s,.01,this.sfx,.6);break;case"potion":for(let c=0;c<3;c++)o(r+c*.28,"sine",300+c*30,180,.14,.25*s);break;case"heal":o(r,"sine",660,990,.5,.2*s,.05,this.sfx,.7),o(r+.12,"sine",990,1320,.5,.16*s,.05,this.sfx,.7);break;case"step":o(r,"sine",62,30,.34,1*s,.004,this.sfx,.3),a(r,.3,"lowpass",500,80,.7,.7*s,.004,this.sfx,.3);break;case"slam":o(r,"sine",80,24,1.1,1.4*s,.003,this.sfx,.5),a(r,.9,"lowpass",2400,90,.7,1.2*s,.003,this.sfx,.6),a(r+.05,1.4,"bandpass",500,200,.8,.4*s,.1,this.sfx,.6);break;case"explode":o(r,"sine",110,30,.7,1.1*s,.003),a(r,.7,"lowpass",3600,120,.7,1*s,.003,this.sfx,.5);break;case"fireball":a(r,.5,"bandpass",300,1200,1.2,.45*s,.1),o(r,"sawtooth",90,160,.4,.12*s,.05);break;case"warn":o(r,"square",660,660,.09,.1*s),o(r+.13,"square",660,660,.09,.1*s);break;case"crack":a(r,.5,"bandpass",1800,500,2,.8*s,.002,this.sfx,.6),o(r,"square",260,70,.3,.4*s),o(r+.04,"triangle",1900,900,.3,.2*s,.002,this.sfx,.6);break;case"snarl":this._roar(r,.7,.5*s,130);break;case"roar":this._roar(r,2.4,1*s,105);break;case"deathcry":this._roar(r,3.4,1*s,120,!0);break;case"ui":o(r,"sine",880,1100,.07,.15*s);break;case"uiBig":o(r,"sine",440,660,.12,.2*s,.005,this.sfx,.5),o(r+.08,"sine",660,880,.2,.2*s,.005,this.sfx,.5);break;case"stamp":o(r,"triangle",1200,1500,.08,.15*s),o(r+.09,"triangle",1500,1800,.1,.12*s);break;case"horn":for(let[c,l]of[[146.8,0],[220,.5],[293.7,1]])o(r+l,"sawtooth",c,c*1.01,1.2,.16*s,.2,this.sfx,.9),o(r+l,"sine",c/2,c/2,1.2,.2*s,.2,this.sfx,.6);break;case"victory":{[293.7,370,440,587.3,440,587.3,740].forEach((l,h)=>{let d=r+h*.16+(h>4?.2:0);o(d,"sawtooth",l,l,h===6?1.8:.3,.14*s,.02,this.sfx,.8),o(d,"triangle",l*2,l*2,h===6?1.8:.3,.08*s,.02,this.sfx,.8)}),o(r+1.2,"sine",73.4,73.4,2,.5*s,.05);break}case"fail":[220,207.6,174.6,146.8].forEach((c,l)=>{o(r+l*.4,"sawtooth",c,c*.97,.9,.14*s,.05,this.sfx,.8)}),o(r,"sine",55,40,2.4,.5*s,.1);break}}_roar(t,e,i,s,r=!1){let a=this.ctx,o=a.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(i,t+.12),o.gain.setValueAtTime(i,t+e*.7),o.gain.exponentialRampToValueAtTime(1e-4,t+e);let c=this.shaper(6),l=a.createBiquadFilter();l.type="bandpass",l.Q.value=.9,l.frequency.setValueAtTime(500,t),l.frequency.linearRampToValueAtTime(1100,t+e*.25),l.frequency.exponentialRampToValueAtTime(280,t+e);let h=a.createGain();h.gain.value=.6;let d=a.createOscillator();d.type="sawtooth",d.frequency.setValueAtTime(34,t),d.frequency.linearRampToValueAtTime(22,t+e);let f=a.createGain();f.gain.value=.4,d.connect(f),f.connect(h.gain);for(let m of[1,1.498,2.02,.5]){let g=a.createOscillator();g.type="sawtooth",g.frequency.setValueAtTime(s*m*.8,t),g.frequency.linearRampToValueAtTime(s*m*1.25,t+e*.2),g.frequency.exponentialRampToValueAtTime(s*m*(r?.35:.62),t+e);let v=a.createGain();v.gain.value=.3,g.connect(v),v.connect(h),g.start(t),g.stop(t+e+.1)}let u=a.createBufferSource();u.buffer=this.noiseBuf,u.loop=!0;let p=a.createGain();p.gain.value=.5,u.connect(p),p.connect(h),u.start(t),u.stop(t+e+.1),h.connect(c),c.connect(l),l.connect(o),o.connect(this.sfx);let x=a.createGain();x.gain.value=.7,o.connect(x),x.connect(this.reverb),d.start(t),d.stop(t+e+.1),this._osc(t,"sine",70,38,e,.9*i,.1)}breath(t,e=1){if(!this.ctx)return;let i=this.ctx,s=i.currentTime;if(t&&!this._breath){let r=i.createBufferSource();r.buffer=this.noiseBuf,r.loop=!0;let a=i.createBiquadFilter();a.type="bandpass",a.frequency.value=420,a.Q.value=.5;let o=i.createGain();o.gain.setValueAtTime(1e-4,s),o.gain.linearRampToValueAtTime(.9*e,s+.15),r.connect(a),a.connect(o),o.connect(this.sfx),r.start(),this._breath={src:r,g:o}}else if(t&&this._breath)this._breath.g.gain.setTargetAtTime(.9*e,s,.1);else if(!t&&this._breath){let r=this._breath;this._breath=null,r.g.gain.cancelScheduledValues(s),r.g.gain.setTargetAtTime(1e-4,s,.12),r.src.stop(s+.6)}}startMusic(){!this.ctx||this._timer||(this._step=0,this._nextT=this.ctx.currentTime+.1,this._timer=setInterval(()=>this._schedule(),60))}stopMusic(){this._timer&&(clearInterval(this._timer),this._timer=null)}setIntensity(t){this.intensity=t}_schedule(){let t=this.ctx;if(!t||t.state!=="running")return;let e=132+this.intensity*10,i=60/e/4;for(;this._nextT<t.currentTime+.25;)this._playStep(this._step,this._nextT,i),this._nextT+=i,this._step=(this._step+1)%128}_playStep(t,e,i){let s=this.intensity,r=this.music,a=t%16,o=t/16|0,c=[73.42,73.42,58.27,65.41,73.42,73.42,87.31,55][o],l=(p,x,m,g,v,M=.005,y=0)=>this._osc(e,p,x,m,g,v,M,r,y),h=(p,x,m,g,v,M,y=0)=>this._noise(e,p,x,m,g,v,M,.003,r,y);(s>=2?[0,3,6,8,10,11,14]:s>=1?[0,3,6,8,11,14]:[0,6,8,14]).includes(a)&&(l("sine",110,38,.3,.9),h(.08,"lowpass",900,200,1,.3)),(s>=1?[2,5,7,12,13,15]:[4,12]).includes(a)&&(l("sine",210,120,.14,.35,.003,.3),h(.05,"bandpass",1500,900,2,.16,.3)),s>=1&&a%2===0&&h(.04,"highpass",7e3,9e3,1,a%4===2?.1:.05),s>=2&&a%2===1&&h(.03,"highpass",8e3,9e3,1,.04);let u=[1,0,1,1.5,1,0,1.2,1,1,0,1,1.5,2,0,1.5,1.2][a];if(u&&(s>=1||a%4===0)&&(l("sawtooth",c*u,c*u,i*1.6,.16,.01,.3),l("sine",c*u/2,c*u/2,i*1.6,.2)),a===0)for(let p of[1,1.5,2,2.4])l("sawtooth",c*2*p,c*2*p*1.003,i*16,.028+s*.008,.4,.8);if(s>=2){let p={0:4,6:4.5,8:4.8,12:6,14:5.4}[a];p&&o%2===0&&(l("sawtooth",c*p,c*p,i*3.5,.07,.03,.8),l("square",c*p/2,c*p/2,i*3.5,.04,.03,.6));let x={0:6,4:5.4,8:4.8,10:4.5,12:4}[a];x&&o%2===1&&l("sawtooth",c*x,c*x,i*3.5,.07,.03,.8)}}};var Fp={KeyW:"up",ArrowUp:"up",KeyS:"down",ArrowDown:"down",KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",ShiftLeft:"sprint",ShiftRight:"sprint",Space:"dodge",KeyE:"potion",KeyR:"special",KeyC:"special",KeyQ:"guard",KeyF:"attack",KeyV:"view",KeyT:"lock",Digit1:"stamp1",Digit2:"stamp2",Digit3:"stamp3",Digit4:"stamp4",KeyP:"pause",Tab:"pause"},cl=class{constructor(t,e){this.canvas=t,this.enabled=!1,this.sens=1,this.invertY=!1,this.isTouch=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window,this.locked=!1,this.lockFailed=!1,this.held={},this._pressed={},this._released={},this._lookX=0,this._lookY=0,this.move={x:0,y:0},this.stick={id:null,ox:0,oy:0,x:0,y:0},this._touches=new Map,this._padPrev={},this.onPauseRequest=null,this._bindKeys(),this._bindMouse(),this._bindTouch(e)}_set(t,e){e?(this.held[t]||(this._pressed[t]=!0),this.held[t]=!0):(this.held[t]&&(this._released[t]=!0),this.held[t]=!1)}pressed(t){return!!this._pressed[t]}released(t){return!!this._released[t]}consume(t){this._pressed[t]=!1}endFrame(){this._pressed={},this._released={}}clear(){this.held={},this._pressed={},this._released={},this._lookX=this._lookY=0,this.stick.id=null,this.stick.x=this.stick.y=0,this._touches.clear()}consumeLook(){let t={x:this._lookX,y:this.invertY?-this._lookY:this._lookY};return this._lookX=this._lookY=0,t}_bindKeys(){addEventListener("keydown",t=>{if(t.target&&/INPUT|TEXTAREA/.test(t.target.tagName))return;let e=Fp[t.code];if(e&&(this.enabled&&t.preventDefault(),!t.repeat)){if(e==="pause"){this.enabled&&this.onPauseRequest&&this.onPauseRequest();return}this.enabled&&this._set(e,!0)}}),addEventListener("keyup",t=>{let e=Fp[t.code];e&&this._set(e,!1)}),addEventListener("blur",()=>{this.held={}})}_bindMouse(){let t=this.canvas;t.addEventListener("mousedown",e=>{!this.enabled||this.isTouchActive||(!this.locked&&!this.lockFailed&&this.requestLock(),e.button===0&&this._set("attack",!0),e.button===2&&this._set("guard",!0),e.button===1&&(this._pressed.lock=!0),e.preventDefault())}),addEventListener("mouseup",e=>{e.button===0&&this._set("attack",!1),e.button===2&&this._set("guard",!1)}),t.addEventListener("contextmenu",e=>e.preventDefault()),addEventListener("mousemove",e=>{this.enabled&&(this.locked||this.lockFailed)&&(this._lookX+=(e.movementX||0)*.0023*this.sens,this._lookY+=(e.movementY||0)*.0023*this.sens)}),document.addEventListener("pointerlockchange",()=>{let e=this.locked;this.locked=document.pointerLockElement===t,e&&!this.locked&&this.enabled&&this.onPauseRequest&&this.onPauseRequest(!0)}),document.addEventListener("pointerlockerror",()=>{this.lockFailed=!0})}requestLock(){if(!(this.isTouch&&!this.mouseSeen))try{let t=this.canvas.requestPointerLock&&this.canvas.requestPointerLock();t&&t.catch&&t.catch(()=>{this.lockFailed=!0})}catch{this.lockFailed=!0}}exitLock(){document.pointerLockElement&&document.exitPointerLock()}_bindTouch(t){if(!t)return;addEventListener("mousemove",()=>{this.mouseSeen=!0},{once:!0});let e=s=>s&&s.closest?s.closest("[data-btn]"):null;t.addEventListener("touchstart",s=>{if(this.enabled){s.preventDefault();for(let r of s.changedTouches){let a=e(r.target);if(a){let o=a.dataset.btn;a.classList.add("on"),this._touches.set(r.identifier,{kind:"btn",name:o,el:a,x:r.clientX,y:r.clientY}),this._set(o,!0)}else r.clientX<innerWidth*.42&&this.stick.id===null?(this.stick.id=r.identifier,this.stick.ox=r.clientX,this.stick.oy=r.clientY,this.stick.x=this.stick.y=0,this._touches.set(r.identifier,{kind:"stick"}),this.onStick&&this.onStick(!0,r.clientX,r.clientY,0,0)):this._touches.set(r.identifier,{kind:"look",x:r.clientX,y:r.clientY})}}},{passive:!1}),t.addEventListener("touchmove",s=>{if(this.enabled){s.preventDefault();for(let r of s.changedTouches){let a=this._touches.get(r.identifier);if(a)if(a.kind==="stick"){let c=r.clientX-this.stick.ox,l=r.clientY-this.stick.oy,h=Math.hypot(c,l);h>56&&(c*=56/h,l*=56/h),this.stick.x=c/56,this.stick.y=-l/56,this.onStick&&this.onStick(!0,this.stick.ox,this.stick.oy,c,l)}else this._lookX+=(r.clientX-a.x)*.0052*this.sens,this._lookY+=(r.clientY-a.y)*.0052*this.sens,a.x=r.clientX,a.y=r.clientY}}},{passive:!1});let i=s=>{for(let r of s.changedTouches){let a=this._touches.get(r.identifier);a&&(a.kind==="btn"&&(a.el.classList.remove("on"),this._set(a.name,!1)),a.kind==="stick"&&(this.stick.id=null,this.stick.x=this.stick.y=0,this.onStick&&this.onStick(!1)),this._touches.delete(r.identifier))}};t.addEventListener("touchend",i),t.addEventListener("touchcancel",i)}_pollPad(){let t=navigator.getGamepads?navigator.getGamepads():[],e=null;for(let a of t)if(a&&a.connected&&a.axes.length>=4){e=a;break}if(!e)return null;let i=a=>Math.abs(a)<.16?0:(a-Math.sign(a)*.16)/.84,s=a=>!!(e.buttons[a]&&(e.buttons[a].pressed||e.buttons[a].value>.4)),r={attack:s(7)||s(2),guard:s(6)||s(4),dodge:s(0)||s(1),potion:s(3),special:s(8)||s(4)&&s(5),lock:s(11),sprint:s(5)||s(10),stamp1:s(12),stamp2:s(15),stamp3:s(13),stamp4:s(14)};for(let a in r)r[a]!==!!this._padPrev[a]&&(this._set(a,r[a]),this._padPrev[a]=r[a]);return s(9)&&!this._padPrev.start&&this.onPauseRequest&&this.enabled&&this.onPauseRequest(),this._padPrev.start=s(9),{mx:i(e.axes[0]),my:-i(e.axes[1]),lx:i(e.axes[2]),ly:i(e.axes[3])}}update(t){let e=0,i=0;this.held.left&&(e-=1),this.held.right&&(e+=1),this.held.up&&(i+=1),this.held.down&&(i-=1),this.autoSprint=!1,this.stick.id!==null&&(e=this.stick.x,i=this.stick.y,Math.hypot(e,i)>.93&&i>.3&&(this.autoSprint=!0));let s=this.enabled?this._pollPad():null;s&&(Math.abs(s.mx)+Math.abs(s.my)>0&&(e=s.mx,i=s.my),this._lookX+=s.lx*2.6*t*this.sens,this._lookY+=s.ly*1.9*t*this.sens);let r=Math.hypot(e,i);r>1&&(e/=r,i/=r),this.move.x=Ce(e,-1,1),this.move.y=Ce(i,-1,1)}};var kp=["idle","intro","roar","bite","claw","tailspin","charge","skid","crash","leap","breath","fireballs","eruption","flinch","topple","stunned","death"],ce=new P,or={bodyY:0,bodyZ:0,bodyPitch:0,bodyYaw:0,bodyRoll:0,neckPitch:-.32,neckYaw:0,headPitch:.34,headYaw:0,headRoll:0,jaw:.06,tailYaw:0,tailPitch:.05,tailWave:1,spin:0,rootRoll:0,rootPitch:0,fl:0,fr:0,bl:0,br:0,flL:0,frL:0,blL:0,brL:0,glow:0};function my(n){let t=new de({color:3288105,roughness:.82,metalness:.05,flatShading:!0}),e=new de({color:5918793,roughness:.7,metalness:.1,flatShading:!0}),i=new de({color:13221542,roughness:.55,flatShading:!0}),s=new de({color:1705216,emissive:14694924,emissiveIntensity:1.4,roughness:.6,flatShading:!0}),r=new ke({color:16767088,fog:!1});n.mats={hide:t,plate:e,bone:i,magma:s,eye:r};let a=new fn(1,1),o=new si(1,1,1),c=new es(1,1,5),l=(E,_,S,R,C,D,F,G,L,z=0,X=0,H=0)=>{let it=new Jt(_,S);return it.position.set(R,C,D),it.scale.set(F,G,L),it.rotation.set(z,X,H),it.castShadow=!0,E.add(it),it},h=(E,_,S,R)=>{let C=new be;return C.position.set(_,S,R),E.add(C),C},d=(E,_,S,R,C,D,F=0,G=0,L=i)=>l(E,c,L,_,S,R,C,D,C,F,0,G),f=new be;n.root=f;let u=h(f,0,2.7,0);n.body=u,l(u,a,t,0,.1,1.3,1.8,1.7,2.15),l(u,a,t,0,-.05,-.9,1.6,1.45,2),l(u,a,t,0,0,-2.4,1.42,1.35,1.55),l(u,a,s,0,-.72,-.1,1.18,.95,2.7),l(u,a,s,0,-.55,2,.7,.75,.9);for(let E=0;E<8;E++){let _=2.5-E*.78,S=1.9-Math.abs(E-2.5)*.2,R=1.42+Math.sin(E/7*Math.PI)*.32-(E>5?.25:0);l(u,o,e,0,R,_,S,.5,.95,.12*(E%2?1:-1),0,0),d(u,0,R+.75-Math.abs(E-3)*.06,_,.3,1.5-Math.abs(E-3)*.14,-.35),l(u,o,s,0,R-.18,_-.4,S*.85,.16,.2)}for(let E of[-1,1])l(u,a,e,E*1.55,.75,1.5,.95,.9,1.25,0,0,E*-.4),d(u,E*2,1.4,1.5,.32,1.3,0,E*-.9),l(u,a,e,E*1.3,.6,-2.3,.8,.8,1,0,0,E*-.4);let p=h(u,0,.55,2.9);n.neck0=p,l(p,a,t,0,0,.55,.98,.95,1.05),l(p,o,e,0,.72,.5,1.1,.35,.9);let x=h(p,0,0,1.2);n.neck1=x,l(x,a,t,0,0,.55,.85,.82,1),l(x,o,e,0,.62,.5,.95,.3,.8);let m=h(x,0,0,1.2);n.head=m,l(m,a,t,0,.08,.6,.95,.8,1.05),l(m,new ri(.4,.74,1.6,5),t,0,-.02,1.75,1,1,.82,Math.PI/2,0,0),l(m,o,e,0,.62,.75,1.5,.3,1.3,.12),l(m,o,e,0,.4,1.9,.6,.22,1,.1),d(m,0,.75,2.2,.2,.9,.5);for(let E of[-1,1]){l(m,new rs(.13,8,6),r,E*.62,.3,1.1,1,1,1),l(m,o,e,E*.66,.45,1.05,.25,.14,.5,0,0,E*.3);let _=h(m,E*.75,.6,.35);_.rotation.set(-.5,0,E*-1.05),l(_,new ri(.3,.42,1.2,6),i,0,.6,0,1,1,1);let S=h(_,0,1.2,0);S.rotation.set(.75,0,E*.55),l(S,new ri(.2,.3,1.2,6),i,0,.6,0,1,1,1);let R=h(S,0,1.2,0);R.rotation.set(.7,0,E*.3),l(R,c,i,0,.7,0,.2,1.4,.2),E===1&&(n.hornTip=S,n.hornStub=_);for(let C=0;C<5;C++)d(m,E*(.52-C*.05),-.32,1.25+C*.26,.07,.3,Math.PI)}let g=h(m,0,-.32,.5);n.jaw=g,l(g,new ri(.32,.62,1.7,5),t,0,-.2,1,1,1,.5,Math.PI/2,0,0),l(g,o,s,0,.02,.9,.7,.1,1.4);for(let E of[-1,1])for(let _=0;_<4;_++)d(g,E*(.45-_*.06),.1,.9+_*.3,.07,.28);n.mouth=h(m,0,-.25,2.3),n.tail=[];let v=h(u,0,.05,-3.5);for(let E=0;E<6;E++){let _=.92-E*.11,S=.92-(E+1)*.11;if(E===3){let R=new be;v.add(R),n.tailTip=R,n.tailCutParent=v,v=R}if(n.tail.push(v),l(v,new ri(_,S,1.3,6),t,0,0,-.62,1,1,1,Math.PI/2),l(v,o,e,0,_*.8,-.6,_*1.3,.22,.9),E%2===0&&d(v,0,_+.35,-.6,.18,.8,-.3),E===5){l(v,a,e,0,0,-1.5,.85,.7,.95),l(v,a,s,0,0,-1.5,.6,.75,.7);for(let R=0;R<6;R++){let C=R/6*Ne;d(v,Math.cos(C)*.75,Math.sin(C)*.6,-1.6,.16,.8,0,C-Math.PI/2)}d(v,0,0,-2.5,.2,1,-Math.PI/2)}v=h(v,0,0,-1.25)}n.tailCutStub=l(n.tailCutParent,a,s,0,0,.02,.5,.5,.2),n.tailCutStub.visible=!1,n.legs={};let M=1.4,y=1.25;for(let[E,_,S,R]of[["fl",1.5,1.55,!0],["fr",-1.5,1.55,!0],["bl",1.38,-2.25,!1],["br",-1.38,-2.25,!1]]){let C=h(f,_,2.83,S),D=R?1.12:1;l(C,a,t,0,-.35,0,.72*D,.95,.85*D),l(C,new ri(.5*D,.36*D,M,6),t,0,-M/2,0,1,1,1),l(C,o,e,Math.sign(_)*.42,-.5,0,.3,.9,.8);let F=h(C,0,-M,0);l(F,new ri(.36*D,.3*D,y,6),t,0,-y/2,0,1,1,1),l(F,a,e,0,0,R?.1:-.1,.42,.42,.42);let G=h(F,0,-y,0);l(G,o,t,0,-.12,.25,.95*D,.36,1.25*D);for(let L=-1;L<=1;L++)d(G,L*.3*D,-.15,1.05*D,.12,.6,Math.PI/2);n.legs[E]={g:C,knee:F,foot:G,front:R}}n.light=new $i(16734748,60,26,1.8),n.light.position.set(0,2.2,1),f.add(n.light);let w=(E,_,S,R,C,D,F={})=>({part:E,node:_,off:new P(S,R,C),r:D,pos:new P,on:!0,...F});n.spheres=[w("head",m,0,.1,1.2,1.3),w("body",x,0,0,.3,.95),w("body",u,0,0,1.4,1.75,{solid:1.45}),w("body",u,0,-.1,-.7,1.6,{solid:1.35}),w("body",u,0,0,-2.3,1.45,{solid:1.15}),w("back",u,0,1.6,.2,1.3),w("tail",n.tail[0],0,0,-.6,.95),w("tail",n.tail[2],0,0,-.3,.8),w("tail",n.tail[3],0,0,-.9,.8,{tip:!0}),w("tail",n.tail[5],0,0,-1.2,.95,{tip:!0})];for(let E of["fl","fr","bl","br"])n.spheres.push(w("leg",n.legs[E].knee,0,0,0,.72),w("leg",n.legs[E].foot,0,.1,.2,.72))}var cr=(n,t,e,i,s=!0,r,a)=>{n.env.fx.zone(t,e,i,s?n:null,r??n.x,a??n.z,n.yaw),n.env.audio.play("warn",.7,n.distLocal())},Ee={};Ee.idle={dur:1/0,pose(){}};Ee.intro={dur:1.4,pose(n,t,e){e.neckPitch=-.1,e.headPitch=.5,e.bodyY=-.2*Math.sin(t*2)},next:"roar"};Ee.roar={dur:3,pose(n,t,e){let i=$t(Ht(t,0,.55))*(1-$t(Ht(t,2.3,2.9))),s=Ht(t,.6,2.3)>0&&t<2.3?1:0;e.bodyPitch=-.2*i,e.bodyY=.25*i-.35*$t(Ht(t,0,.3))*(1-$t(Ht(t,.3,.6))),e.neckPitch=Wt(-.32,-.95,i),e.headPitch=Wt(.34,-.25,i),e.jaw=.1+.85*$t(Ht(t,.5,.7))*(1-$t(Ht(t,2.25,2.5))),e.headRoll=s*Math.sin(t*38)*.05,e.neckYaw=s*Math.sin(t*2.6)*.35,e.tailPitch=.35*i,e.glow=i,e.flL=.5*i*(Math.sin(t*1.5)>0?1:.2)},cues:[[.58,n=>{n.env.audio.play("roar",1,n.distLocal()),n.env.fx.ring(n.x,n.z,0,30,24,16767392)}]],frame(n,t,e){t>.6&&t<2.3&&n.env.shake(e*2.6,n.x,n.z,60)},hits(n,t,e){t>.62&&t<.82&&e.push({id:"r",kind:"circle",x:n.x,z:n.z,r:21,dmg:0,kb:0,roar:!0})}};Ee.bite={dur:1.95,track:.52,turn:2.4,pose(n,t,e){let i=$t(Ht(t,0,.6)),s=ji(Ht(t,.64,.8)),r=$t(Ht(t,1.25,1.9));e.neckPitch=Wt(Wt(-.32,-.85,i),.42,s),e.neckPitch=Wt(e.neckPitch,-.32,r),e.headPitch=Wt(Wt(.34,0,i),.25,s),e.headPitch=Wt(e.headPitch,.34,r),e.jaw=Wt(.06,.8,i)*(1-ji(Ht(t,.74,.84)))+.06,e.bodyPitch=Wt(-.1*i,.2,s)*(1-r),e.bodyZ=Wt(-.5*i,1.2,s)*(1-r),e.bodyY=-.45*s*(1-r),e.neckYaw=Math.sin(t*5)*.08*i*(1-s)},move(n,t,e){t>.64&&t<.82&&n.advance(13*e)},cues:[[0,n=>cr(n,"fan",{r:9.5,half:.4},.72)],[.02,n=>n.env.audio.play("snarl",.8,n.distLocal())],[.66,n=>n.env.audio.play("swingHeavy",1,n.distLocal())],[.82,n=>{n.env.audio.play("guard",.6,n.distLocal())}]],hits(n,t,e){if(t>.66&&t<.9){let i=n.spheres[0].pos;e.push({id:"b",kind:"sphere",x:i.x,y:i.y,z:i.z,r:1.95,dmg:25,kb:7,parryFlinch:!0})}}};Ee.claw={dur:1.7,track:.45,turn:2.6,time(n,t){return n.ap[1]?t+.22:t},pose(n,t,e){t=Ee.claw.time(n,t);let i=n.ap[0]||1,s=$t(Ht(t,0,.55)),r=ji(Ht(t,.6,.8)),a=$t(Ht(t,1.1,1.7)),o=s*(1-r),c=i>0?"fl":"fr";e[c+"L"]=o*1.5,e[c]=Wt(-.5*s,1.15,r)*(1-a),e.bodyRoll=(-.2*s+.32*r)*i*(1-a),e.bodyYaw=(.3*s-.55*r)*i*(1-a),e.bodyPitch=(-.12*s+.2*r)*(1-a),e.bodyY=(.25*s-.4*r)*(1-a),e.neckYaw=-.3*i*s*(1-a),e.jaw=.4*s*(1-a)},move(n,t,e){t=Ee.claw.time(n,t),t>.58&&t<.8&&n.advance(8*e)},cues:[[0,n=>cr(n,"fan",{r:7.2,half:1.3,rot:-(n.ap[0]||1)*.25},n.ap[1]?.4:.62)],[.36,n=>n.env.audio.play("swingHeavy",1,n.distLocal())],[.6,n=>{n.fwd(ce,3.2),ce.y=.2,n.env.fx.dust(ce,20,7),n.env.audio.play("step",1,n.distLocal()),n.env.shake(.35,n.x,n.z,22)}]],hits(n,t,e){t=Ee.claw.time(n,t),t>.6&&t<.86&&e.push({id:"c",kind:"arc",x:n.x+Math.sin(n.yaw)*1,z:n.z+Math.cos(n.yaw)*1,r:6.2,ang:n.yaw-(n.ap[0]||1)*.25,half:1.3,dmg:23,kb:8,parryFlinch:!0})}};Ee.tailspin={dur:2.35,pose(n,t,e){let i=n.ap[0]||1,s=$t(Ht(t,0,.75)),r=$t(Ht(t,.8,1.55)),a=$t(Ht(t,1.6,2.3));e.spin=i*Ne*r,e.bodyY=-.55*s*(1-a),e.tailYaw=Wt(-.42*i*s,.3*i,Ht(t,.8,1))*(1-Ht(t,1.45,1.75)),e.tailPitch=.05+.02*s,e.tailWave=1-s*(1-a),e.neckYaw=-.8*i*s*(1-r),e.headYaw=-.4*i*s*(1-r),e.bodyRoll=-.14*i*Math.sin(r*Math.PI)},cues:[[0,n=>cr(n,"circle",{r:n.tailCut?7.4:11.6},.85)],[.05,n=>n.env.audio.play("snarl",.7,n.distLocal())],[.82,n=>n.env.audio.play("swingHeavy",1.4,n.distLocal())],[1.15,n=>n.env.audio.play("swingHeavy",1.2,n.distLocal())]],frame(n,t){if(t>.8&&t<1.55){let e=n.spheres[n.tailCut?7:9].pos;ce.set(e.x,.15,e.z),n.env.fx.dust(ce,2,5)}},hits(n,t,e){if(t>.8&&t<1.57){let i=n.yaw+n.P.spin+Math.PI;e.push({id:"t",kind:"sweep",x:n.x,z:n.z,r0:1.5,r1:n.tailCut?7.4:11.6,a0:n._prevTailAng??i,a1:i,dmg:27,kb:10}),n._prevTailAng=i}else n._prevTailAng=null}};Ee.charge={dur:4.2,track:.95,turn:3.2,pose(n,t,e){let i=$t(Ht(t,0,.9)),s=Ht(t,1,1.2);e.neckPitch=Wt(-.32,.5,i),e.headPitch=Wt(.34,.75,i),e.bodyPitch=.14*i,e.bodyY=-.35*i+s*Math.abs(Math.sin(n.walkPhase))*.3,e.tailPitch=.4*i,e.glow=i*.6,t<1&&(e.flL=Math.max(0,Math.sin(t*13))*.9*i,e.fl=-.3*e.flL)},move(n,t,e){if(t<1)return;let i=yi.run*$t(Ht(t,1,1.35))*n.speedMul,s=n.targetPos();if(s&&(n.yaw=nl(n.yaw,Math.atan2(s.x-n.x,s.z-n.z),(t<1.7?.75:.18)*e)),n.advance(i*e,!0),n.ap[2]=(n.ap[2]||0)+i*e,Math.hypot(n.x,n.z)>39-3.2&&n.x*Math.sin(n.yaw)+n.z*Math.cos(n.yaw)>0)return n.start("crash");if(n.ap[2]>36||t>3.8)return n.start("skid");if(s){let a=s.x-n.x,o=s.z-n.z;if(a*Math.sin(n.yaw)+o*Math.cos(n.yaw)<-7&&t>1.6)return n.start("skid")}},cues:[[0,n=>cr(n,"rect",{w:5.4,len:38},1.05)],[.05,n=>n.env.audio.play("snarl",1,n.distLocal())],[.3,n=>n.pawFx()],[.62,n=>n.pawFx()],[.98,n=>n.env.audio.play("roar",.5,n.distLocal())]],hits(n,t,e){if(t>1.05){let i=n.spheres[0].pos,s=n.spheres[2].pos;e.push({id:"ch",kind:"circle",x:i.x,z:i.z,r:2,dmg:36,kb:15,heavy:!0}),e.push({id:"ch",kind:"circle",x:s.x,z:s.z,r:2.5,dmg:36,kb:15,heavy:!0})}},armor:!0};Ee.skid={dur:1.5,pose(n,t,e){let i=1-$t(Ht(t,.2,1.4));e.bodyPitch=-.16*i,e.bodyY=-.5*i,e.neckPitch=Wt(-.32,.2,i),e.fl=e.fr=-.5*i,e.bl=e.br=-.4*i,e.tailPitch=.4*i},move(n,t,e){n.advance(yi.run*.8*Math.pow(1-Dt(t/.8),2)*e,!0)},frame(n,t){t<.7&&(n.fwd(ce,2),ce.y=.1,n.env.fx.dust(ce,3,5))},cues:[[0,n=>n.env.audio.play("dodge",1.6,n.distLocal())]]};Ee.crash={dur:3.9,pose(n,t,e){let i=1-$t(Ht(t,3.1,3.9)),s=t<2.9?Math.sin(t*9):0;e.neckPitch=Wt(-.32,.3,i),e.headPitch=Wt(.34,.5,i),e.bodyPitch=.1*i,e.bodyY=-.4*i,e.bodyZ=.5*i+s*.15*i,e.bodyRoll=s*.06*i,e.tailYaw=s*.4*i,e.bl=s*.3*i,e.br=-s*.3*i,e.jaw=.3*i},cues:[[0,n=>{n.env.audio.play("slam",1.2,n.distLocal()),n.env.audio.play("crack",1,n.distLocal()),n.env.shake(.9,n.x,n.z,45),n.fwd(ce,5.5),ce.y=2,n.env.fx.dust(ce,50,10),n.env.fx.burst(ce,40,{speed:12,life:1.2,size:.6,color:[.5,.45,.4],gravity:16})}],[1.2,n=>n.env.audio.play("snarl",.8,n.distLocal())],[2.4,n=>n.env.audio.play("snarl",.9,n.distLocal())]]};Ee.leap={dur:3,track:.8,turn:2.2,pose(n,t,e){let i=$t(Ht(t,0,.8)),s=Ht(t,.9,1.75),r=t>=1.75?1-$t(Ht(t,1.75,2.9)):0;e.bodyY=-.95*i*(t<.9?1:0)-.9*r,e.tailPitch=.5*i*(1-Ht(t,1.6,1.9)),s>0&&s<1&&(e.bodyPitch=Wt(-.42,.35,s),e.fl=e.fr=Wt(.9,-.7,s),e.bl=e.br=Wt(-.9,.4,s),e.flL=e.frL=e.blL=e.brL=Math.sin(s*Math.PI)*.9,e.jaw=.5,e.neckPitch=-.1),e.neckPitch=Wt(e.neckPitch,.25,r),e.bodyPitch+=.08*r},move(n,t,e){if(t<.8){let i=n.targetPos();if(i){let s=i.x-n.x,r=i.z-n.z,a=Math.hypot(s,r)||1,o=Ce(a-1.5,3,26);n.ap[0]=n.x+s/a*o,n.ap[1]=n.z+r/a*o,n.ap[2]=n.x,n.ap[3]=n.z}}else if(t>=.9&&t<1.75){let i=Ht(t,.9,1.75),s=Wt(n.ap[2],n.ap[0],i),r=Wt(n.ap[3],n.ap[1],i),a=Math.hypot(s,r);a>35&&(s*=35/a,r*=35/a),n.x=s,n.z=r,n.y=Math.sin(i*Math.PI)*7.5}else n.y=0},cues:[[0,n=>n.env.audio.play("snarl",.9,n.distLocal())],[.82,n=>cr(n,"circle",{r:4.6},.93,!1,n.ap[0],n.ap[1])],[.88,n=>{n.env.audio.play("swingHeavy",1.5,n.distLocal()),ce.set(n.x,.2,n.z),n.env.fx.dust(ce,30,8),n.env.shake(.3,n.x,n.z,25)}],[1.75,n=>{n.env.audio.play("slam",1.4,n.distLocal()),n.env.shake(1.1,n.x,n.z,55),ce.set(n.x,.3,n.z),n.env.fx.dust(ce,70,13),n.env.fx.burst(ce,60,{speed:16,life:.9,size:.6,color:[1,.5,.1],color2:[1,.2,.05],dir:[0,.8,0],spread:1,gravity:18,jitter:4})}]],host:[[1.75,n=>n.emit({k:"ring",x:n.x,z:n.z,sp:17,r:17,dmg:20})]],hits(n,t,e){t>1.72&&t<1.86&&e.push({id:"l",kind:"circle",x:n.x,z:n.z,r:4.6,dmg:44,kb:13,heavy:!0})},armor:!0};var du=(n,t)=>(n.ap[0]||1)*Wt(-1,1,$t(Ht(t,1.05,2.95)));Ee.breath={dur:3.7,track:.9,turn:1.6,pose(n,t,e){let i=$t(Ht(t,0,.9)),s=t>1&&t<3?1:0,r=$t(Ht(t,3,3.7)),a=s?du(n,t):Wt((n.ap[0]||1)*-1*$t(Ht(t,.5,1)),0,0)*(t<1?1:0)+(t>=3?(n.ap[0]||1)*(1-r):0);e.neckPitch=Wt(Wt(-.32,-.8,i),.12,$t(Ht(t,.92,1.1))),e.neckPitch=Wt(e.neckPitch,-.32,r),e.headPitch=Wt(.34,.5,$t(Ht(t,.92,1.1))),e.jaw=(.3*i+.6*s)*(1-r)+.06,e.bodyYaw=a*.25,e.neckYaw=a*.5,e.headYaw=a*.25,e.bodyY=.3*i*(1-s)-.3*s,e.bodyPitch=-.1*i*(1-s)+.08*s,e.glow=Math.max(i,s)*(1-r),e.headRoll=s*Math.sin(t*40)*.02},cues:[[0,n=>cr(n,"fan",{r:20,half:1.25},1.08)],[.02,n=>n.env.audio.play("fireball",1.2,n.distLocal())],[1,n=>n.env.audio.play("roar",.45,n.distLocal())]],frame(n,t,e){let i=n.mouth.getWorldPosition(ce);if(t<.95){let s=Ie(Ne),r=Ie(2,5);n.env.fx.burst({x:i.x+Math.cos(s)*r,y:i.y+Ie(-1.5,1.5),z:i.z+Math.sin(s)*r},2,{speed:6,dir:[-Math.cos(s)*1.2,0,-Math.sin(s)*1.2],spread:.1,life:.4,size:.4,color:[1,.6,.2],gravity:0,drag:0})}else if(t>1&&t<3){let s=n.yaw+du(n,t),r=Math.sin(s),a=Math.cos(s);n.env.fx.burst(i,6,{speed:27,dir:[r,-.2,a],spread:.16,life:.68,size:2.4,color:[1,.75,.25],color2:[1,.25,.04],gravity:-3,drag:.6,jitter:.5}),n.env.fx.burst(i,2,{speed:20,dir:[r,-.15,a],spread:.2,life:1,size:3.4,color:[.3,.12,.06],gravity:-4,drag:.8}),n.env.shake(e*.5,n.x,n.z,30),n.env.audio.breath(!0,Ce(1/(1+n.distLocal()*n.distLocal()/500),.1,1)),n._breathing=!0}(t>=3||t<1)&&n._breathing&&(n._breathing=!1,n.env.audio.breath(!1))},hits(n,t,e){if(t>1.08&&t<3){let i=n.yaw+du(n,t-.12);e.push({id:"f"+Math.floor((t-1.08)/.3),kind:"cone",x:n.x+Math.sin(i)*3.2,z:n.z+Math.cos(i)*3.2,ang:i,half:.2,len:17,dmg:14,kb:2.5,fire:!0,light:!0})}},end(n){n._breathing&&(n._breathing=!1,n.env.audio.breath(!1))}};Ee.fireballs={dur:2.7,track:2,turn:1.8,pose(n,t,e){let i=0;for(let r of[.7,1.15,1.6])i+=$t(Ht(t,r-.25,r))*(1-ji(Ht(t,r,r+.14)));let s=$t(Ht(t,0,.5))*(1-$t(Ht(t,2,2.6)));e.neckPitch=Wt(-.32,-.7,s)+.45*(1-i)*s-.2*s,e.headPitch=.1+.3*(1-i),e.jaw=.1+.7*i,e.glow=s,e.bodyY=.2*s,e.bodyPitch=-.12*s},host:[.7,1.15,1.6].map((n,t)=>[n,e=>{let i=e.alivePlayers();if(!i.length)return;let s=i.length>1?i[(t+e.seq%3)%i.length]:i[0],r=e.mouth.getWorldPosition(ce),a=t===0?0:1;e.emit({k:"ball",fx:+r.x.toFixed(2),fy:+r.y.toFixed(2),fz:+r.z.toFixed(2),x:+(s.x+Ie(-1.6,1.6)*a).toFixed(2),z:+(s.z+Ie(-1.6,1.6)*a).toFixed(2),t:1.15,r:3.7,dmg:28})}]),cues:[[0,n=>n.env.audio.play("snarl",.9,n.distLocal())]]};Ee.eruption={dur:3.3,pose(n,t,e){let i=$t(Ht(t,0,.75)),s=il(Ht(t,.8,.95)),r=$t(Ht(t,2.2,3.2)),a=i*(1-s);e.bodyPitch=-.55*a+.15*s*(1-r),e.bodyY=.9*a-.5*s*(1-r),e.flL=e.frL=1.2*a,e.fl=e.fr=-.6*a,e.neckPitch=Wt(-.32,-.6,a)+.5*s*(1-r),e.jaw=.6*i*(1-r),e.tailPitch=.3*i*(1-r),e.glow=i*(1-r)},cues:[[0,n=>n.env.audio.play("roar",.6,n.distLocal())],[.95,n=>{n.env.audio.play("slam",1.3,n.distLocal()),n.env.shake(1,n.x,n.z,60),n.fwd(ce,3),ce.y=.2,n.env.fx.dust(ce,50,10)}]],host:[[.95,n=>{let t=0;for(let e of n.alivePlayers()){n.emit({k:"erupt",x:+e.x.toFixed(2),z:+e.z.toFixed(2),r:3.3,d:1.15,dmg:30});for(let i=0;i<4;i++){let s=Ie(Ne),r=Ie(4,11);n.emit({k:"erupt",x:+(e.x+Math.cos(s)*r).toFixed(2),z:+(e.z+Math.sin(s)*r).toFixed(2),r:3.3,d:1.3+t++*.13,dmg:30})}}for(let e=0;e<8;e++){let i=e/8*Ne+n.yaw;n.emit({k:"erupt",x:+(n.x+Math.cos(i)*7.5).toFixed(2),z:+(n.z+Math.sin(i)*7.5).toFixed(2),r:3,d:1+e*.07,dmg:30})}}]],armor:!0};Ee.flinch={dur:1.35,pose(n,t,e){let i=ji(Ht(t,0,.18))*(1-$t(Ht(t,.7,1.3))),s=n.ap[0]||1;e.neckPitch=-.32-.5*i,e.neckYaw=.7*i*s,e.headRoll=.4*i*s,e.bodyYaw=.15*i*s,e.bodyZ=-.7*i,e.jaw=.6*i,e.bodyY=-.2*i},cues:[[0,n=>n.env.audio.play("snarl",1.1,n.distLocal())]]};Ee.topple={dur:6.2,pose(n,t,e){let i=n.ap[0]||1,s=il(Ht(t,0,.55)),r=$t(Ht(t,5.2,6.2)),a=s*(1-r),o=t>.6&&t<5.1?1:0;e.rootRoll=i*1.32*a,e.bodyY=-1.45*a,e.neckPitch=Wt(-.32,.1,a),e.neckYaw=-i*.5*a,e.headRoll=-i*.6*a,e.jaw=.25+.2*Math.sin(t*7)*o;let c=Math.sin(t*6.5)*o*.5;e.fl=c,e.fr=-c*.8,e.bl=-c,e.br=c*.7,e.flL=e.frL=e.blL=e.brL=.5*a,e.tailYaw=Math.sin(t*3)*.3*o,e.tailWave=.3},cues:[[0,n=>n.env.audio.play("snarl",1.2,n.distLocal())],[.52,n=>{n.env.audio.play("slam",1.2,n.distLocal()),n.env.shake(.9,n.x,n.z,50),ce.set(n.x,.3,n.z),n.env.fx.dust(ce,60,11)}],[5.2,n=>n.env.audio.play("snarl",.9,n.distLocal())]],armor:!0};Ee.stunned={dur:4.6,pose(n,t,e){let i=$t(Ht(t,0,.5))*(1-$t(Ht(t,3.9,4.6)));e.neckPitch=Wt(-.32,.55,i),e.headPitch=Wt(.34,.3,i),e.neckYaw=Math.sin(t*2.2)*.45*i,e.headRoll=Math.sin(t*2.2+1)*.3*i,e.bodyY=-.7*i,e.jaw=.35*i,e.bodyRoll=Math.sin(t*1.6)*.06*i,e.tailWave=.4},cues:[[0,n=>n.env.audio.play("snarl",1.2,n.distLocal())]],armor:!0};Ee.death={dur:1e9,pose(n,t,e){let i=Ht(t,0,1.6),s=il(Ht(t,1.6,2.6));e.neckPitch=Wt(-.32,-.9,$t(i))*(1-s)+.2*s,e.jaw=.8*(1-s*.6),e.headRoll=Math.sin(t*20)*.04*(1-s),e.bodyY=.3*$t(i)*(1-s)-1.5*s,e.rootRoll=1.25*s,e.bodyPitch=-.25*$t(i)*(1-s),e.flL=e.frL=e.blL=e.brL=.4*s,e.tailWave=1-s,e.glow=(1-s)*(.5+.5*Math.sin(t*30))-s*1.2,e.neckYaw=.4*s},cues:[[0,n=>n.env.audio.play("deathcry",1.2,n.distLocal())],[2.5,n=>{n.env.audio.play("slam",1.5,n.distLocal()),n.env.shake(1.2,n.x,n.z,80),ce.set(n.x,.3,n.z),n.env.fx.dust(ce,90,12)}]],armor:!0};var ll=class{constructor(t,e){this.scene=t,this.env=e,my(this),t.add(this.root),this.P={...or},this.fromP={...or},this.tmpP={...or},this.reset(1)}reset(t){this.x=0,this.z=-6,this.y=0,this.yaw=0,this.maxHp=Math.round(yi.hp*yi.hpScale[Ce(t,1,4)-1]),this.hp=this.maxHp,this.scale=yi.hpScale[Ce(t,1,4)-1],this.phase=1,this.speedMul=1,this.action="idle",this.t=0,this.seq=0,this.ap=[0,0,0,0],this.lastT=0,this.cool=1.5,this.lastAttack="",this.queue=[],this.headAcc=0,this.legAcc=0,this.tailAcc=0,this.headTotal=0,this.parryAcc=0,this.flankT=0,this.headN=0,this.legN=0,this.stunAcc=0,this.stunN=0,this.tailCut=!1,this.hornBroken=!1,this.dead=!1,this.pendingRoar=!1,this.aggro={},this.targetId=null,this.eruptCd=0,this.active=!1,this.walkPhase=0,this.hitFlash=0,this.sx=this.x,this.sz=this.z,this.syaw=0,this.sy=0,this.tailTip.visible=!0,this.tailCutStub.visible=!1,this.hornTip.visible=!0;for(let e of this.spheres)e.on=!0;this.severed&&(this.scene.remove(this.severed),this.severed=null),Object.assign(this.P,or),Object.assign(this.fromP,or),this._px=this.x,this._pz=this.z,this._pyaw=this.yaw,this._first=!0,this._hostT=-1,this.walkAmp=0,this.players=[],this.animate(0)}distLocal(){let t=this.env.localPos();return t?Math.hypot(t.x-this.x,t.z-this.z):30}fwd(t,e){return t.set(this.x+Math.sin(this.yaw)*e,this.y,this.z+Math.cos(this.yaw)*e)}advance(t,e){this.x+=Math.sin(this.yaw)*t,this.z+=Math.cos(this.yaw)*t;let i=Math.hypot(this.x,this.z),s=39-(e?2.2:3.5);i>s&&(this.x*=s/i,this.z*=s/i)}pawFx(){this.fwd(ce,3),ce.y=.15,this.env.fx.dust(ce,14,6),this.env.audio.play("step",.7,this.distLocal())}alivePlayers(){return this.players.filter(t=>t.alive)}targetPos(){return this.players.find(t=>t.id===this.targetId&&t.alive)||this.alivePlayers()[0]||null}emit(t){this.env.emit(t)}start(t,e){let i=Ee[this.action];i&&i.end&&i.end(this),Object.assign(this.fromP,this.P),this.fromP.spin=0,this.action=t,this.t=0,this.lastT=-1e-6,this.seq++,this._prevTailAng=null,this._hostT=-1,this.ap=e?[e[0]||0,e[1]||0,e[2]||0,e[3]||0]:[0,0,0,0]}hostUpdate(t,e){if(this.players=e,!this.active)return;let i=Ee[this.action];this.t+=t,this.eruptCd-=t;for(let a in this.aggro)this.aggro[a]*=Math.exp(-.05*t);if(this.action==="idle"){this.think(t);return}let s=this.targetPos();i.track&&this.t<i.track&&s&&(this.yaw=nl(this.yaw,Math.atan2(s.x-this.x,s.z-this.z),i.turn*this.speedMul*t));let r=this.seq;if(i.move&&i.move(this,this.t,t),r===this.seq){if(i.host)for(let[a,o]of i.host)this._hostT<a&&this.t>=a&&o(this);this._hostT=this.t,this.t>=i.dur&&this.finish(i)}}finish(t){if(!this.dead){if(t.next)return this._hostT=-1,this.start(t.next);if(this.pendingRoar)return this.pendingRoar=!1,this._hostT=-1,this.start("roar");if(this.queue.length){let e=this.queue.shift();return this._hostT=-1,this.start(e[0],e[1])}this.cool=this.phase===1?Ie(.9,1.5):this.phase===2?Ie(.55,1.05):Ie(.3,.75),this.pickTarget(),this._hostT=-1,this.start("idle")}}pickTarget(){let t=this.alivePlayers();if(!t.length){this.targetId=null;return}let e=null,i=-1/0;for(let s of t){let r=Math.hypot(s.x-this.x,s.z-this.z),a=(this.aggro[s.id]||0)+140/(4+r)+Ie(0,60)+(s.id===this.targetId?-25:0);a>i&&(i=a,e=s)}this.targetId=e.id}think(t){let e=this.targetPos();if(!e){this.pickTarget();return}let i=e.x-this.x,s=e.z-this.z,r=Math.hypot(i,s),a=Math.atan2(i,s),o=Li(this.yaw,a);if(this.yaw=nl(this.yaw,a,yi.turn*this.speedMul*t*(Math.abs(o)>1.5?1.5:1)),r>6&&Math.abs(o)<1&&this.advance(yi.walk*this.speedMul*t*(r>14?1.5:1)),Math.abs(o)>1.1&&r<8?this.flankT+=t:this.flankT=Math.max(0,this.flankT-t*2),this.cool-=t,this.cool>0)return;let c=!1;for(let x of this.alivePlayers())Math.abs(Li(this.yaw,Math.atan2(x.x-this.x,x.z-this.z)))>1.9&&Math.hypot(x.x-this.x,x.z-this.z)<(this.tailCut?7:10.5)&&(c=!0);let l=this.phase,h=[],d=Math.abs(o),f=(x,m,g)=>h.push({n:x,w:m*(x===this.lastAttack?.3:1),ap:g}),u=o>0?1:-1;if(c&&f("tailspin",5,[rr([1,-1])]),this.flankT>1.3&&f("tailspin",6,[u]),r<7&&d<.95&&(f("bite",4),f("claw",4,[u]),l>=2&&f("combo",4,[u]),f("tailspin",1.2,[u]),l>=2&&f("leap",1)),r>=7&&r<22&&(f("leap",3),d<.7&&f("breath",r<16?3:1.5,[rr([1,-1])]),f("charge",r>12?3:1),l>=2&&f("fireballs",2.5)),r>=22&&(f("charge",4),l>=2&&f("fireballs",3.5),f("leap",1.5)),l>=3&&this.eruptCd<=0&&f("eruption",3.5),!h.length)if(d>1.4&&r<9)f("tailspin",1,[u]);else return;let p=Np(h);if(this.lastAttack=p.n,p.n==="eruption"&&(this.eruptCd=18),this.flankT=0,p.n==="combo")return this.queue.push(["claw",[-p.ap[0],1]]),Math.random()<.6&&this.queue.push(["bite"]),this.start("claw",p.ap);this.start(p.n,p.ap)}applyHit(t,e,i,s,r=0){if(this.dead||!this.active)return;this.hp-=e,this.aggro[i]=(this.aggro[i]||0)+e;let a=this.scale,o=Ee[this.action],c=o.armor||this.action==="flinch";if(this.hp<=0){this.hp=0,this.dead=!0,this.queue.length=0,this._hostT=-1,this.start("death"),this.emit({k:"dead"});return}let l=this.action==="flinch"||this.action==="topple"||this.action==="stunned"||this.action==="crash";if(!l&&(r||s&&t==="head")&&(this.stunAcc+=(s&&t==="head"?e:0)+r,this.stunAcc>=850*a*Math.pow(1.3,this.stunN)&&!c)){this.stunAcc=0,this.stunN++,this.headTotal+=e,this.queue.length=0,this.start("stunned"),this.emit({k:"stun",by:i});return}if(t==="head"){this.headTotal+=e,l||(this.headAcc+=e);let d=yi.headFlinch*a*Math.pow(1.3,this.headN);!this.hornBroken&&this.headTotal>=yi.hornBreak*a&&(this.hornBroken=!0,this.emit({k:"break",p:"horn",by:i}),l||(this.headAcc=d)),this.headAcc>=d&&!c&&(this.headAcc=0,this.headN++,this.queue.length=0,this.start("flinch",[rr([1,-1])]))}else t==="leg"?(l||(this.legAcc+=e),this.legAcc>=yi.legTopple*a*Math.pow(1.25,this.legN)&&!c&&(this.legAcc=0,this.legN++,this.queue.length=0,this.y=0,this.start("topple",[rr([1,-1])]),this.emit({k:"topple",by:i}))):t==="tail"&&(s||(this.tailAcc+=e),!this.tailCut&&this.tailAcc>=yi.tailCut*a&&(this.tailCut=!0,this.emit({k:"break",p:"tail",by:i}),c||(this.queue.length=0,this._hostT=-1,this.start("flinch",[1]))));let h=this.hp<=this.maxHp*.33?3:this.hp<=this.maxHp*.66?2:1;h>this.phase&&(this.phase=h,this.speedMul=h===2?1.12:1.22,this.pendingRoar=!0,this.emit({k:"phase",p:h}))}applyParry(t,e){if(this.dead)return;this.parryAcc++,this.aggro[t]=(this.aggro[t]||0)+80;let i=Ee[this.action].armor;this.parryAcc>=yi.parryStun&&!i?(this.parryAcc=0,this.queue.length=0,this._hostT=-1,this.start("stunned"),this.emit({k:"stun",by:t})):e&&(this.action==="bite"||this.action==="claw")&&(this.queue.length=0,this._hostT=-1,this.start("flinch",[rr([1,-1])]))}snapshot(){return[+this.x.toFixed(2),+this.z.toFixed(2),+this.y.toFixed(2),+this.yaw.toFixed(3),kp.indexOf(this.action),this.seq,+this.t.toFixed(3),this.ap.map(t=>+(+t).toFixed(2)),Math.round(this.hp),this.phase,(this.tailCut?1:0)|(this.hornBroken?2:0)|(this.active?4:0)|(this.dead?8:0),this.maxHp]}applySnapshot(t){this.sx=t[0],this.sz=t[1],this.sy=t[2],this.syaw=t[3];let e=kp[t[4]];t[5]!==this.seq?(this.start(e,t[7]),this.seq=t[5],this.t=t[6],this.lastT=t[6]-1e-6,this._first&&(this.x=this.sx,this.z=this.sz,this.yaw=this.syaw,this.y=this.sy,this._first=!1)):(Math.abs(this.t-t[6])>.25&&(this.t=t[6]),this.ap=t[7]),this.hp=t[8],this.maxHp=t[11],t[9]!==this.phase&&(this.phase=t[9]);let i=t[10];i&1&&!this.tailCut&&this.setTailCut(!1),i&2&&!this.hornBroken&&this.setHornBroken(!1),this.active=!!(i&4),this.dead=!!(i&8)}clientUpdate(t){this.t+=t;let e=this.action==="charge"||this.action==="leap"?22:12;this.x=Se(this.x,this.sx,e,t),this.z=Se(this.z,this.sz,e,t),this.y=Se(this.y,this.sy,25,t),this.yaw=Sa(this.yaw,this.syaw,14,t)}setTailCut(t){this.tailCut=!0,this.tailTip.visible=!1,this.tailCutStub.visible=!0;for(let r of this.spheres)r.tip&&(r.on=!1);let e=this.tailTip.clone(!0);e.visible=!0;let i=this.tailTip.getWorldPosition(new P),s=new be;s.add(e),s.position.set(i.x,.75,i.z),s.rotation.set(.1,this.yaw+this.P.spin+Ie(-.5,.5),.3),this.scene.add(s),this.severed=s,t&&(this.env.audio.play("crack",1.3,this.distLocal()),this.env.fx.burst(i,60,{speed:12,life:.9,size:.7,color:[1,.5,.1],color2:[1,.2,.05],gravity:14}))}setHornBroken(t){if(this.hornBroken=!0,this.hornTip.visible=!1,t){let e=this.hornStub.getWorldPosition(new P);this.env.audio.play("crack",1.3,this.distLocal()),this.env.fx.burst(e,50,{speed:11,life:1,size:.5,color:[.9,.85,.7],color2:[.6,.55,.45],gravity:16})}}animate(t){let e=Ee[this.action],i=this.tmpP,s=this.t;Object.assign(i,or);let r=this.x-this._px,a=this.z-this._pz,o=Math.hypot(r,a),c=Math.abs(Li(this._pyaw,this.yaw));this._px=this.x,this._pz=this.z,this._pyaw=this.yaw;let l=t>0?o/t:0,h=this.walkPhase;this.walkPhase+=o*(l>9?.5:.78)+c*2.4;let d=Ce(l*.09+(t>0?c/t:0)*.16,0,l>9?.85:.55);this.walkAmp=Se(this.walkAmp||0,d,10,t);let f=this.walkAmp,u=this.walkPhase;if(f>.02&&this.y<.1&&(i.fl=Math.sin(u)*f,i.br=Math.sin(u+.4)*f,i.fr=Math.sin(u+Math.PI)*f,i.bl=Math.sin(u+Math.PI+.4)*f,i.flL=Math.max(0,Math.cos(u))*f*1.1,i.brL=Math.max(0,Math.cos(u+.4))*f,i.frL=Math.max(0,Math.cos(u+Math.PI))*f*1.1,i.blL=Math.max(0,Math.cos(u+Math.PI+.4))*f,i.bodyY+=Math.sin(u*2)*.12*f,i.bodyRoll=Math.sin(u)*.07*f,i.neckYaw=Math.sin(u)*.1*f,i.tailYaw=-Math.sin(u)*.2*f,t>0&&Math.floor(u/Math.PI)!==Math.floor(h/Math.PI)&&f>.12)){let m=this.distLocal();this.env.audio.play("step",.5+f*.7,m),this.env.shake(.16+f*.3,this.x,this.z,20);let g=this.legs[Math.floor(u/Math.PI)%2?"fl":"fr"].foot.getWorldPosition(ce);ce.y=.1,this.env.fx.dust(ce,l>9?14:6,l>9?7:3)}let p=this.env.time();i.bodyY+=Math.sin(p*1.6)*.05,i.neckPitch+=Math.sin(p*1.6+.6)*.025,i.jaw+=Math.max(0,Math.sin(p*1.6))*.04,e.pose(this,s,i);let x=$t(Dt(s/.2));for(let m in i)this.P[m]=m==="spin"?i.spin:Wt(this.fromP[m],i[m],x);if(t>0){if(e.cues)for(let[m,g]of e.cues)this.lastT<m&&s>=m&&g(this);e.frame&&e.frame(this,s,t)}this.lastT=s,this.applyPose(t,p)}applyPose(t,e){let i=this.P,s=this.root;s.position.set(this.x,this.y,this.z),s.rotation.set(i.rootPitch,this.yaw+i.spin,i.rootRoll,"YXZ"),this.body.position.set(0,2.7+i.bodyY,i.bodyZ),this.body.rotation.set(i.bodyPitch,i.bodyYaw,i.bodyRoll),this.neck0.rotation.set(i.neckPitch*.5,i.neckYaw*.5,0),this.neck1.rotation.set(i.neckPitch*.5,i.neckYaw*.5,0),this.head.rotation.set(i.headPitch,i.headYaw,i.headRoll),this.jaw.rotation.x=i.jaw;for(let c=0;c<6;c++){let l=this.tail[c];l.rotation.y=i.tailYaw*(.5+c*.12)+Math.sin(e*1.4-c*.7)*.09*i.tailWave*(1+c*.3),l.rotation.x=(c===0?-.22:.07)+i.tailPitch*(c<3?.5:.25)+Math.sin(e*1.1-c*.5)*.02*i.tailWave}let r=Ce(i.bodyY,-1.5,.6)*.85;for(let c of["fl","fr","bl","br"]){let l=this.legs[c],h=i[c+"L"],d=Ce((2.53+r)/2.65,.3,1),f=Math.acos(d)+h*.55,u=l.front?-1:1;l.g.position.y=2.83+r;let p=-i[c]+u*f;l.g.rotation.x=p,l.knee.rotation.x=-u*f*2,l.foot.rotation.x=-(p-u*f*2)*.8}this.hitFlash=Math.max(0,this.hitFlash-t*9);let a=this.phase-1,o=1.15+a*.8+Math.sin(e*3.2)*.25+i.glow*2.6+this.hitFlash*2;this.mats.magma.emissiveIntensity=Math.max(.05,this.dead?o*.4:o),this.mats.hide.emissive.setRGB(this.hitFlash*.5+a*.02,this.hitFlash*.2,this.hitFlash*.08),this.light.intensity=Math.max(0,(45+a*40+i.glow*150)*(this.dead?.2:1)),this.mats.eye.color.setHex(this.dead?2234896:a>=1?16732208:16767088),s.updateMatrixWorld(!0);for(let c of this.spheres)c.pos.copy(c.off).applyMatrix4(c.node.matrixWorld)}queryHit(t,e,i,s){let r=null,a=1e9;for(let l of this.spheres){if(!l.on)continue;ce.copy(l.pos).sub(t);let h=ce.length();if(h-l.r>i)continue;let d=Math.acos(Ce(ce.dot(e)/(h||1e-6),-1,1)),f=h<=l.r?Math.PI:Math.asin(l.r/h),u=Math.max(0,d-f);if(u>s)continue;let p=u*3+Math.max(0,h-l.r)*.06;p<a&&(a=p,r=l)}if(!r)return null;ce.copy(r.pos).sub(t);let o=Ce(ce.dot(e)-r.r*.75,.6,i),c=new P().copy(e).multiplyScalar(o).add(t);return c.lerp(r.pos,.35),{part:r.part,point:c}}pushOut(t,e){if(!(this.y>1.5))for(let i of this.spheres){if(!i.solid)continue;let s=t.x-i.pos.x,r=t.z-i.pos.z,a=Math.hypot(s,r),o=i.solid+e;a<o&&a>1e-4&&(t.x=i.pos.x+s/a*o,t.z=i.pos.z+r/a*o)}}hitsOn(t,e,i){if(i.length=0,!this.active||this.dead)return i;let s=Ee[this.action];if(!s.hits)return i;let r=this._hl||(this._hl=[]);r.length=0,s.hits(this,this.t,r);for(let a of r){let o=!1,c=t.x-a.x,l=t.z-a.z,h=Math.hypot(c,l);if(a.kind==="circle")o=h<a.r+e;else if(a.kind==="sphere")o=h<a.r+e&&Math.abs(1-a.y)<a.r+1.4;else if(a.kind==="arc")o=h<a.r+e&&Math.abs(Li(a.ang,Math.atan2(c,l)))<a.half;else if(a.kind==="cone")o=h<a.len&&Math.abs(Li(a.ang,Math.atan2(c,l)))<a.half+Math.atan2(e+.7,Math.max(h,1));else if(a.kind==="sweep"&&h>a.r0&&h<a.r1+e){let d=Math.atan2(c,l),f=Li(a.a0,a.a1),u=Li(a.a0,d),p=.16;o=f>=0?u>-p&&u<f+p:u<p&&u>f-p}o&&(a.key=this.seq+":"+a.id,a.fromX=this.x,a.fromZ=this.z,i.push(a))}return i}},hl=class{constructor(t){this.env=t,this.list=[],this.n=0}clear(){this.list.length=0}spawn(t){let e=this.env.fx,i="h"+(t.id??this.n++);t.k==="ring"?(e.ring(t.x,t.z,0,t.sp,t.r),e.ring(t.x,t.z,-.08,t.sp,t.r,16760960),this.list.push({...t,id:i,t:0})):t.k==="ball"?(e.ball(new P(t.fx,t.fy,t.fz),new P(t.x,.3,t.z),t.t),e.marker(t.x,t.z,t.r,t.t),this.env.audio.play("fireball",1,this.env.distTo(t.fx,t.fz)),this.list.push({...t,id:i,t:0,d:t.t})):t.k==="erupt"&&(e.marker(t.x,t.z,t.r,t.d),this.list.push({...t,id:i,t:0}))}update(t,e,i,s){for(let r=this.list.length-1;r>=0;r--){let a=this.list[r];a.t+=t;let o=e?Math.hypot(e.x-a.x,e.z-a.z):1e9;if(a.k==="ring"){let c=a.t*a.sp;e&&Math.abs(o-c)<1.05+i&&c>3&&s({key:a.id,dmg:a.dmg,kb:7,fromX:a.x,fromZ:a.z}),c>=a.r&&this.list.splice(r,1)}else if(a.t>=a.d){this.env.fx.pillar(a.x,a.z,a.r);let c=this.env.distTo(a.x,a.z);this.env.audio.play("explode",1,c),this.env.shake(.5,a.x,a.z,22),e&&o<a.r+i&&s({key:a.id,dmg:a.dmg,kb:9,fromX:a.x,fromZ:a.z,heavy:!0,fire:!0}),this.list.splice(r,1)}}}};var Ta=[null,{name:"\u982D",i:0},{name:"\u80F4",i:2},{name:"\u5C3E",i:7}],fl={free:0,light1:1,light2:2,light3:3,charge:4,heavy:5,counter:6,dodge:7,guard:8,hurt:9,knock:10,dead:11,drink:12,stunned:13,bounce:14,special:15},Sn=new P,ba=new P,Si=[.4,-.4,-.66,-.62,.12,.2],ul={light1:[[0,...Si],[.1,.62,-.16,-.6,-.25,.3,-1.4],[.2,0,-.2,-.88,-1.3,0,-.25],[.3,-.58,-.3,-.6,-.9,-.5,1.3],[.56,...Si]],light2:[[0,-.4,-.3,-.62,-.7,-.4,1.1],[.1,-.55,-.18,-.6,-.3,-.3,1.45],[.19,.05,-.2,-.88,-1.3,0,.22],[.3,.66,-.3,-.6,-.9,.5,-1.4],[.56,...Si]],light3:[[0,.5,-.25,-.6,-.8,.3,-1],[.19,.28,.3,-.5,.95,0,.12],[.33,.14,-.22,-.92,-1.35,0,.05],[.44,.1,-.62,-.8,-1.95,0,.05],[.86,...Si]],heavy:[[0,.48,.3,-.45,1.15,0,-.5],[.22,0,-.18,-.96,-1.3,0,.3],[.36,-.36,-.7,-.75,-2,0,.6],[.6,-.3,-.72,-.72,-1.9,0,.6],[1,...Si]],special:[[0,.48,.3,-.45,1.15,0,-.5],[.8,.52,.4,-.38,1.4,0,-.62],[1,0,-.18,-.96,-1.3,0,.3],[1.14,-.36,-.7,-.75,-2,0,.6],[1.6,...Si]],counter:[[0,.02,-.2,-.55,-.15,0,1.25],[.14,.18,-.06,-.92,-1.2,0,-.7],[.28,.58,.36,-.6,-.4,0,-1.6],[.66,...Si]]};function Op(n,t,e){let i=0;for(;i<n.length-2&&t>n[i+1][0];)i++;let s=n[i],r=n[i+1],a=$t(Dt((t-s[0])/(r[0]-s[0])));for(let o=0;o<6;o++)e[o]=Wt(s[o+1],r[o+1],a);return e}function gy(n){let t=new be,e=new de({color:10134450,roughness:.42,metalness:.45}),i=new de({color:2762276,roughness:.7,metalness:.4}),s=new de({color:4861728,roughness:.9}),r=new de({color:9406063,roughness:.7,flatShading:!0}),a=(l,h,d,f,u,p,x,m=0)=>{let g=new Jt(new si(h,d,f),l);return g.position.set(u,p,x),g.rotation.z=m,t.add(g),g},o=new is;o.moveTo(-.075,0),o.lineTo(-.095,1),o.lineTo(-.02,1.34),o.lineTo(.06,1.12),o.lineTo(.075,0),o.closePath();let c=new Jt(new qs(o,{depth:.028,bevelEnabled:!0,bevelThickness:.012,bevelSize:.012,bevelSegments:1}),e);return c.position.set(0,.2,-.014),t.add(c),a(i,.05,1,.04,-.01,.72,0),a(n,.012,.95,.045,-.01,.72,0),a(r,.1,.5,.05,.075,.5,0,-.02),a(i,.36,.07,.08,0,.18,0),a(r,.07,.1,.07,-.2,.2,0,.5),a(r,.07,.1,.07,.2,.2,0,-.5),a(s,.05,.36,.055,0,-.03,0),a(i,.08,.07,.08,0,-.23,0),t}function Bp(n){let t=new be,e=new de({color:10989757,roughness:.4,metalness:.45}),i=new de({color:2762276,roughness:.7,metalness:.4}),s=new is;s.moveTo(-.05,0),s.lineTo(-.075,.55),s.lineTo(.03,.95),s.lineTo(.055,.5),s.lineTo(.05,0),s.closePath();let r=new Jt(new qs(s,{depth:.02,bevelEnabled:!0,bevelThickness:.01,bevelSize:.01,bevelSegments:1}),e);r.position.set(0,.16,-.01),t.add(r);let a=(o,c,l,h,d,f,u)=>{let p=new Jt(new si(c,l,h),o);p.position.set(d,f,u),t.add(p)};return a(n,.012,.62,.035,-.01,.5,0),a(i,.24,.05,.07,0,.14,0),a(i,.045,.26,.05,0,0,0),t}function _y(n){let t=new be,e=new de({color:6971996,roughness:.8,metalness:.15,flatShading:!0}),i=new de({color:2762276,roughness:.7,metalness:.4}),s=new de({color:4861728,roughness:.9}),r=(a,o,c,l,h,d,f,u=0)=>{let p=new Jt(new si(o,c,l),a);p.position.set(h,d,f),p.rotation.z=u,t.add(p)};return r(s,.055,1.35,.055,0,.5,0),r(i,.08,.07,.08,0,-.2,0),r(e,.56,.36,.36,0,1.25,0),r(i,.6,.1,.4,0,1.25,0),r(n,.4,.04,.38,0,1.36,0),r(n,.4,.04,.38,0,1.14,0),r(e,.12,.3,.3,.33,1.25,0),r(e,.12,.3,.3,-.33,1.25,0),t}function xy(n){let t=new be,e=new de({color:5913126,roughness:.8}),i=new de({color:10129786,roughness:.7,flatShading:!0}),s=new de({color:2762276,roughness:.7}),r=(a,o,c,l,h,d,f,u=0)=>{let p=new Jt(new si(o,c,l),a);return p.position.set(h,d,f),p.rotation.x=u,t.add(p),p};r(s,.07,.3,.08,0,0,0);for(let a of[-1,1])r(e,.055,.62,.06,0,a*.44,.06,a*.22),r(i,.05,.5,.05,0,a*.93,.24,a*.5);return r(s,.008,2.28,.008,0,0,.36),r(i,.018,.018,1.25,.04,.03,-.25),r(n,.035,.035,.1,.04,.03,-.9),t.scale.setScalar(.62),t}function fu(n){let t=new be,e=new de({color:2894382,roughness:.9}),i=new de({color:4867908,roughness:.6,metalness:.4,flatShading:!0}),s=new de({color:n,roughness:.7}),r=(a,o,c,l,h,d,f)=>{let u=new Jt(new si(o,c,l),a);u.position.set(h,d,f),t.add(u)};return r(i,.12,.13,.13,0,0,0),r(e,.1,.5,.11,0,-.3,.04),r(i,.125,.22,.13,0,-.2,.04),r(s,.13,.04,.135,0,-.33,.04),t}var dl=class{constructor(t,e,i){this.world=t,this.input=e,this.env=i,this.glowMat=new de({color:3347461,emissive:16742944,emissiveIntensity:.6}),this.vm=new be,t.vmScene.add(this.vm),this.sword=new be,this.sword.scale.setScalar(.52),this.vm.add(this.sword),this.models={great:gy(this.glowMat),dual:Bp(this.glowMat),hammer:_y(this.glowMat),bow:xy(this.glowMat)},this.lock=0;for(let l in this.models)this.sword.add(this.models[l]);this.off=new be,this.off.scale.setScalar(.52),this.off.add(Bp(this.glowMat)),this.vm.add(this.off),this.armOff=fu(14833466),this.off.add(this.armOff),this.armOff.position.set(0,-.02,.02),this.armOff.rotation.x=.5,this.tp=!1,this.armR=fu(14833466),this.sword.add(this.armR),this.armR.position.set(0,-.02,.02),this.armR.rotation.x=.5,this.armL=fu(14833466),this.sword.add(this.armL),this.armL.position.set(0,-.2,.02),this.armL.rotation.set(.5,0,.9),this.flask=new be;let s=new Jt(new ri(.045,.055,.13,8),new de({color:1862458,emissive:2871408,emissiveIntensity:1.2,roughness:.2})),r=new Jt(new ri(.02,.03,.06,8),new de({color:8022608}));r.position.y=.09,this.flask.add(s,r),this.flask.visible=!1,this.vm.add(this.flask);let a=16;this.trailN=a;let o=new Te;o.setAttribute("position",new Fe(new Float32Array(a*2*3),3)),o.setAttribute("color",new Fe(new Float32Array(a*2*3),3));let c=[];for(let l=0;l<a-1;l++){let h=l*2;c.push(h,h+1,h+2,h+1,h+3,h+2)}o.setIndex(c),this.trail=new Jt(o,new ke({vertexColors:!0,transparent:!0,blending:ei,side:qe,depthWrite:!1,depthTest:!1})),this.trail.frustumCulled=!1,t.vmScene.add(this.trail),this.trailPts=[],this.trailCol=[1,.8,.5],this.pose=[...Si],this.poseT=[...Si],this.consumed=new Set,this.hitsOut=[],this.setWeapon("great"),this.reset(0,0)}setColor(t){for(let e of[this.armR,this.armL,this.armOff])e.children[3].material.color.set(t)}setWeapon(t){this.weaponId=fi[t]?t:"great";let e=this.w=fi[this.weaponId];this.defs={};for(let i in lu){let s=lu[i],r=i.startsWith("heavy")||i==="counter";this.defs[i]={dur:s.dur/e.speed,hit:s.hit/e.speed,next:s.next/e.speed,mv:s.mv*(r?e.heavy:e.mv),reach:s.reach+e.reach,step:e.ranged?0:s.step,strong:s.mv>=34}}if(e.sp.dur){let i=e.sp.hit/.97;this.defs.special={...e.sp,strong:!0,k:i}}this.chargeT=hu.lv.map(i=>i*e.charge),this.chargeOver=hu.over*e.charge;for(let i in this.models)this.models[i].visible=i===this.weaponId}reset(t,e){let i=e>1?(t-(e-1)/2)*.16:0;this.spawn={x:Math.sin(i)*28,z:28*Math.cos(i)},this.x=this.spawn.x,this.z=this.spawn.z,this.y=0,this.yaw=Math.PI,this.pitch=.08,this.vx=0,this.vz=0,this.kx=0,this.kz=0,this.hp=Oe.hp,this.hpLag=Oe.hp,this.stamina=Oe.stamina,this.stamDelay=0,this.potions=Oe.potions,this.state="free",this.st=0,this.combo=0,this.buffer=null,this.didHit=!1,this.guarding=!1,this.guardT=0,this.chargeLv=0,this.attackHeld=0,this.attackDown=!1,this.sp=0,this.oniT=0,this.buffT=0,this.counterT=0,this.invuln=0,this.hitstop=0,this.healPool=0,this.respawnT=0,this.bob=0,this.bobAmp=0,this.roll=0,this.eyeOff=0,this.fov=80,this.exhausted=!1,this.sprinting=!1,this.stats={dmg:0,hits:0,just:0,parry:0,taken:0,downs:0,weak:0,maxHit:0},this.consumed.clear(),this.alive=!0,this.frozen=!1,this.atk=null}get eyeY(){return Oe.eye+this.eyeOff}lookDir(t){let e=Math.cos(this.pitch);return t.set(Math.sin(this.yaw)*e,Math.sin(this.pitch),Math.cos(this.yaw)*e)}setState(t){this.state=t,this.st=0,this.didHit=!1}canAct(){return this.state==="free"}startAttack(t,e=1){let i=this.defs[t];this.atk={name:t,def:i,mvBonus:e},this.setState(t.startsWith("heavy")?"heavy":t),this.swung=!1,this.attackDown=!1,this.lunge=i.step}update(t,e){let i=this.input,s=Oe,r=this.env;if(this.hitstop>0&&(this.hitstop-=t,t*=.06),this.st+=t,this.buffT=Math.max(0,this.buffT-t),this.counterT=Math.max(0,this.counterT-t),this.invuln=Math.max(0,this.invuln-t),this.state!=="dead"){let S=i.consumeLook(),R=this.state==="heavy"||this.state.startsWith("light")?.75:1;this.yaw-=S.x*R,this.pitch=Ce(this.pitch-S.y*R,-1.35,1.4)}else i.consumeLook();if(!this.frozen&&i.pressed("lock")&&(this.lock=(this.lock+1)%Ta.length,this.lock===3&&e&&e.tailCut&&(this.lock=0),r.popup(this.lock?"\u6CE8\u76EE\uFF1A"+Ta[this.lock].name:"\u6CE8\u76EE\u89E3\u9664","warn")),this.lock&&e&&e.active&&!e.dead&&this.state!=="dead"){let S=e.spheres[Ta[this.lock].i];S.on||(S=e.spheres[2]);let R=S.pos.x-this.x,C=S.pos.z-this.z,D=Math.hypot(R,C);this.yaw=Sa(this.yaw,Math.atan2(R,C),11,t),this.pitch=Se(this.pitch,Ce(Math.atan2(S.pos.y-(this.tp?2:Oe.eye),Math.max(D,1.2)),-1.2,1.3),11,t)}let a=Math.sin(this.yaw),o=Math.cos(this.yaw),c=i.move.x,l=i.move.y;this.frozen&&(c=l=0);let h=a*l-o*c,d=o*l+a*c,f=0,u=14;this.guarding=!1;let p=!this.frozen&&i.pressed("attack"),x=!this.frozen&&i.held.attack,m=!this.frozen&&i.pressed("dodge"),g=!this.frozen&&i.held.guard,v=!this.frozen&&i.pressed("potion");p&&(this.buffer={k:"attack",t:.28}),m&&(this.buffer={k:"dodge",t:.25}),this.buffer&&(this.buffer.t-=t,this.buffer.t<=0&&(this.buffer=null)),this.oniT=Math.max(0,this.oniT-t);let M=!this.frozen&&i.pressed("special"),y=()=>{if(this.sp<100)return r.popup("\u5965\u7FA9\u30B2\u30FC\u30B8\u304C\u8DB3\u308A\u306A\u3044","warn"),!1;let S=this.w.sp;return this.sp=0,this.buffer=null,r.popup(S.name,"just"),r.flash("charge"),r.audio.play("charge3",1.3),r.audio.play("snarl",.5),S.oni?(this.oniT=S.oni,r.flash("just"),!1):(this.startAttack("special"),!0)},w=()=>{if(this.stamina<8)return r.popup("\u30B9\u30BF\u30DF\u30CA\u5207\u308C","warn"),!1;this.stamina-=this.w.dodgeCost*(this.oniT>0?.5:1),this.stamDelay=s.staminaDelay;let S=h,R=d,C=Math.hypot(S,R);return C<.2?(S=-a,R=-o):(S/=C,R/=C),this.dodgeDir={x:S,z:R},this.dodgeSide=-(S*o-R*a),this.setState("dodge"),r.audio.play("dodge",1),this.buffer=null,this.justDone=!1,!0};switch(this.state){case"free":{if(this.sprinting=(i.held.sprint||i.autoSprint)&&l>.3&&!this.exhausted&&!g&&this.stamina>0,f=(this.sprinting?s.sprint:s.walk)*this.w.walk,this.sprinting&&(this.stamina-=s.sprintDrain*t,this.stamDelay=.25,this.stamina<=0&&(this.stamina=0,this.exhausted=!0)),g?(this.guarding=!0,this.guardT+=t,f=s.guardMove):this.guardT=0,this.buffer&&this.buffer.k==="dodge"){if(w())break;this.buffer=null}if(M&&y())break;if(v)if(this.potions<=0)r.popup("\u56DE\u5FA9\u85AC\u304C\u306A\u3044","warn");else if(this.hp>=s.hp)r.popup("\u4F53\u529B\u306F\u6E80\u30BF\u30F3","warn");else{this.potions--,this.setState("drink"),r.audio.play("potion",1);break}if(this.buffer&&this.buffer.k==="attack"){if(this.buffer=null,this.counterT>0){this.counterT=0,this.startAttack("counter");break}this.startAttack("light1"),this.attackDown=x}break}case"light1":case"light2":case"light3":case"heavy":case"counter":case"special":{if(this.oniT>0&&(this.st+=t*.28),M&&this.state!=="special"&&this.st>=this.atk.def.next&&y())break;let S=this.atk.def;if(f=.9,u=6,this.lunge>0&&this.st<S.hit){let R=this.lunge/S.hit;this.x+=a*R*t,this.z+=o*R*t}if(!this.didHit&&this.st>=S.hit&&!(this.attackDown&&this.state.startsWith("light"))&&(this.didHit=!0,this.resolveAttack(e)),!this.swung&&this.st>=S.hit-.09&&!(this.attackDown&&this.state.startsWith("light"))&&(this.swung=!0,r.audio.play(this.state.startsWith("light")?"swing":"swingHeavy",1)),this.attackDown&&!x&&(this.attackDown=!1),this.attackDown&&this.state.startsWith("light")&&!this.didHit&&this.st>=.15){this.chargeLv=0,this.setState("charge"),this.st=.15;break}if(this.st>=S.next&&this.buffer){if(this.buffer.k==="dodge"){if(w())break;this.buffer=null}else if(this.buffer.k==="attack"){this.buffer=null,this.startAttack(this.state==="light1"?"light2":this.state==="light2"?"light3":"light1"),this.attackDown=x;break}}this.st>=S.dur&&this.setState("free");break}case"charge":{f=s.chargeMove;let S=this.st>=this.chargeOver?2:this.st>=this.chargeT[2]?3:this.st>=this.chargeT[1]?2:this.st>=this.chargeT[0]?1:0;if(S!==this.chargeLv&&(S>this.chargeLv?(r.audio.play("charge"+S,1),r.flash("charge")):r.popup("\u6E9C\u3081\u3059\u304E","warn"),this.chargeLv=S),m&&w())break;if(!x){this.startAttack("heavy"+Math.max(1,this.chargeLv));break}break}case"dodge":{let S=this.st/s.dodgeDur,R=s.dodgeDist/s.dodgeDur*(S<.65?1.25:.45);this.x+=this.dodgeDir.x*R*t,this.z+=this.dodgeDir.z*R*t,f=0,this.st>=s.dodgeDur&&this.setState("free");break}case"drink":{if(f=s.guardMove,!this.didHit&&this.st>=s.potionTime*.72&&(this.didHit=!0,this.healPool+=s.potionHeal,r.audio.play("heal",1),r.flash("heal")),m&&this.st<s.potionTime*.6){if(this.potions++,w())break;this.potions--}this.st>=s.potionTime&&this.setState("free");break}case"hurt":f=1.2,this.st>=.42&&this.setState("free");break;case"bounce":f=.5,this.st>=.5&&this.setState("free");break;case"stunned":f=0,this.st>=1.7&&this.setState("free");break;case"knock":f=0,this.st>=1.25&&(this.setState("free"),this.invuln=.5);break;case"dead":f=0,this.respawnT>0&&(this.respawnT-=t,this.respawnT<=0&&r.canRespawn()&&this.respawn());break}let E=Math.hypot(h,d);E>1&&(h/=E,d/=E),this.vx=Se(this.vx,h*f,u,t),this.vz=Se(this.vz,d*f,u,t),this.kx=Se(this.kx,0,4.5,t),this.kz=Se(this.kz,0,4.5,t),this.x+=(this.vx+this.kx)*t,this.z+=(this.vz+this.kz)*t,e&&!e.dead&&e.pushOut(this,s.radius);let _=Math.hypot(this.x,this.z);if(_>39&&(this.x*=39/_,this.z*=39/_),this.stamDelay>0?this.stamDelay-=t:(!this.sprinting||this.state!=="free")&&(this.stamina=Math.min(s.stamina,this.stamina+s.staminaRegen*(this.guarding?.35:this.state==="charge"?.5:1)*t)),this.exhausted&&this.stamina>30&&(this.exhausted=!1),this.healPool>0&&this.state!=="dead"){let S=Math.min(this.healPool,70*t);this.healPool-=S,this.hp=Math.min(s.hp,this.hp+S)}this.hpLag=this.hpLag>this.hp?Math.max(this.hp,this.hpLag-22*t):this.hp,this.updateCamera(t),this.updateViewModel(t)}resolveAttack(t){let{def:e,name:i,mvBonus:s}=this.atk,r=this.env,a=this.w.ranged;if(Sn.set(this.x,this.eyeY,this.z),this.lookDir(ba),this.tp&&a)Sn.copy(this.world.camera.position);else if(this.tp){let x=this.world.camera.position;ba.multiplyScalar(11).add(x).sub(Sn).normalize()}let o=t&&t.active&&!t.dead?t.queryHit(Sn,ba,a?fs.reach:e.reach,a?.03:i==="special"?.75:i.startsWith("light")?.52:.44):null;if(i==="special"&&this.w.blunt){let x=new P(this.x+Math.sin(this.yaw)*2.4,.2,this.z+Math.cos(this.yaw)*2.4);r.fx.dust(x,50,11),r.fx.ring(x.x,x.z,0,22,9,16767392),r.audio.play("slam",1.1),this.world.addShake(.8),r.fx.burst(x,40,{speed:13,life:.9,size:.5,color:[.6,.55,.5],gravity:16,dir:[0,1,0],spread:.8})}if(a){let x=new P(this.x-Math.cos(this.yaw)*.25,this.eyeY-.22,this.z+Math.sin(this.yaw)*.25).addScaledVector(ba,1.6),m=o?o.point:new P().copy(ba).multiplyScalar(fs.reach).add(Sn);r.fx.tracer(x,m,i==="special"),r.audio.play("dodge",i==="special"?1.6:.9),i==="special"&&r.audio.play("bounce",.7)}if(!o)return;let c=Math.hypot(o.point.x-this.x,o.point.z-this.z),l=!a||c>=fs.near&&c<=fs.far?1:fs.off,h=this.w.blunt,d=h&&o.part==="back"?.7:Lp[o.part],f=e.strong,u=o.part==="head",p=Math.max(1,Math.round(e.mv*s*d*(this.buffT>0?1.25:1)*(this.oniT>0?1.2:1)*l*Ie(.95,1.05)));i!=="special"&&this.oniT<=0&&(this.sp=Math.min(100,this.sp+p*tl.perDmg)),this.stats.dmg+=p,this.stats.hits++,u&&this.stats.weak++,this.stats.maxHit=Math.max(this.stats.maxHit,p),o.part==="back"&&!h?(r.fx.metalSpark(o.point),r.audio.play("bounce",1),r.fx.number(o.point,String(p),"dull"),this.world.addShake(.25),this.setState("bounce"),r.popup("\u5F3E\u304B\u308C\u305F\uFF01","warn")):(r.fx.hitSpark(o.point,f&&!a,u),r.audio.play(f?"hitHeavy":"hit",1),u&&r.audio.play("weak",1),r.fx.number(o.point,String(p),u?"weak":f?"strong":""),this.hitstop=a?0:f?.13:.06,this.world.addShake(a?.08:f?.5:.22),a&&l<1&&r.popup(c<fs.near?"\u8FD1\u3059\u304E\u308B":"\u9060\u3059\u304E\u308B","warn"),i==="heavy3"&&(this.world.addShake(.35),r.flash("impact")),i==="special"&&(this.hitstop=a?.05:.22,this.world.addShake(.7),r.flash("impact"),r.fx.hitSpark(o.point,!a,!0),r.audio.play("crack",.8))),t.hitFlash=1,r.dealHit(o.part,p,o.point,f,u,h,i==="special"&&e.stun||0)}takeHit(t){let e=Oe,i=this.env;if(this.state==="dead"||this.consumed.has(t.key)||this.invuln>0||this.state==="knock")return;if(this.state==="dodge"&&this.st>=e.iFrom&&this.st<=e.iTo){this.consumed.add(t.key),this.justDone||(this.justDone=!0,this.stats.just++,this.sp=Math.min(100,this.sp+tl.just),this.buffT=this.w.buff,this.stamina=Math.min(e.stamina,this.stamina+35),i.audio.play("just",1),i.popup("\u898B\u5207\u308A\uFF01","just"),i.flash("just"),i.onJust());return}this.consumed.add(t.key),this.consumed.size>200&&this.consumed.clear();let s=this.x-t.fromX,r=this.z-t.fromZ,a=Math.hypot(s,r)||1,o=Math.abs(Li(this.yaw,Math.atan2(-s,-r)))<1.75;if(this.guarding&&(o||t.roar)){if(this.guardT<=e.parryWindow&&!t.fire){this.stats.parry++,this.counterT=2.6,this.sp=Math.min(100,this.sp+tl.parry),this.stamina=Math.min(e.stamina,this.stamina+15),i.audio.play("parry",1),i.popup(t.roar?"\u8010\u3048\u305F\uFF01":"\u5F3E\u304D\u8FD4\u3057\uFF01","parry"),i.flash("parry"),this.world.addShake(.4),this.hitstop=.1,Sn.set(this.x+Math.sin(this.yaw)*.9,this.eyeY-.2,this.z+Math.cos(this.yaw)*.9),i.fx.metalSpark(Sn),t.roar||i.parry(t);return}if(t.roar){i.audio.play("guard",.6);return}let c=t.dmg*this.w.guardRate;this.stamina-=t.dmg*(t.fire?.7:1.15),this.stamDelay=1,this.damage(c),i.audio.play("guard",1),this.world.addShake(.35),Sn.set(this.x+Math.sin(this.yaw)*.9,this.eyeY-.2,this.z+Math.cos(this.yaw)*.9),i.fx.metalSpark(Sn),this.kx+=s/a*t.kb*.45,this.kz+=r/a*t.kb*.45,this.stamina<=0&&(this.stamina=0,this.exhausted=!0,i.popup("\u30AC\u30FC\u30C9\u5D29\u3057","warn"),this.state!=="dead"&&this.setState("hurt"));return}if(this.state==="special"&&!this.didHit){t.roar||(this.damage(t.dmg*.5),i.audio.play("guard",.8),i.flash("hurt"),this.world.addShake(.4));return}if(t.roar){this.setState("stunned"),i.popup("\u5486\u54EE\u3067\u52D5\u3051\u306A\u3044\uFF01","warn"),this.world.addShake(.5);return}this.damage(t.dmg),i.audio.play("hurt",1),i.flash("hurt"),this.world.addShake(t.heavy?.9:.55),this.state!=="dead"&&(this.kx+=s/a*t.kb,this.kz+=r/a*t.kb,this.attackDown=!1,this.buffer=null,t.heavy?this.setState("knock"):t.light?(this.state==="drink"||this.state==="charge")&&this.setState("hurt"):this.setState("hurt"))}damage(t){this.hp-=t,this.stats.taken+=t,this.healPool=0,this.hp<=0&&(this.hp=0,this.alive=!1,this.stats.downs++,this.setState("dead"),this.respawnT=5,this.env.audio.play("down",1),this.env.onDown())}respawn(){this.x=this.spawn.x,this.z=this.spawn.z,this.yaw=Math.atan2(-this.x,-this.z),this.pitch=0,this.hp=Oe.hp,this.hpLag=this.hp,this.stamina=Oe.stamina,this.potions=Math.max(this.potions,2),this.alive=!0,this.invuln=2.5,this.kx=this.kz=0,this.setState("free"),this.env.onRespawn()}updateCamera(t){let e=this.world.camera,i=this.world.shake,s=this.state,r=Math.hypot(this.vx,this.vz);this.bob+=r*t*1.55,this.bobAmp=Se(this.bobAmp,s==="free"||s==="charge"?Dt(r/5):0,8,t);let a=0,o=0,c=0,l=80;if(this.sprinting&&s==="free"&&(l=87),s==="dodge"){let u=this.st/Oe.dodgeDur;a=-.55*Math.sin(Math.min(1,u*1.15)*Math.PI),o=this.dodgeSide*.2*Math.sin(u*Math.PI),l=90}else if(s==="knock"){let u=this.st/1.25;a=-1.15*(u<.25?u/.25:u>.7?1-(u-.7)/.3:1),o=.4*Math.sin(Dt(u*1.4)*Math.PI),c=.35*Math.sin(u*Math.PI)}else if(s==="dead")a=-1.3*ji(Dt(this.st/.6)),o=.9*ji(Dt(this.st/.7));else if(s==="hurt")o=.12*Math.sin(Dt(this.st/.42)*Math.PI),c=.08*Math.sin(Dt(this.st/.42)*Math.PI);else if(s==="stunned")o=Math.sin(this.st*9)*.05,c=-.25*Math.sin(Dt(this.st/1.7)*Math.PI),l=74;else if(s==="charge")l=80-this.chargeLv*2.5;else if(s==="special"){let u=this.atk.def;l=this.st<u.hit?80-7*Dt(this.st/u.hit):80+10*Math.sin(Dt((this.st-u.hit)/.4)*Math.PI),c=-.09*Math.sin(Dt((this.st-u.hit+.05)/.35)*Math.PI)}else s==="heavy"?(l=80+7*Math.sin(Dt(this.st/.5)*Math.PI),c=-.07*Math.sin(Dt((this.st-.15)/.35)*Math.PI)):s==="light3"&&(c=-.04*Math.sin(Dt((this.st-.25)/.3)*Math.PI));this.eyeOff=Se(this.eyeOff,a,18,t),this.roll=Se(this.roll,o-Ce(this.input.move.x,-1,1)*.012*Dt(r/5),14,t),this.fov=Se(this.fov,l,9,t);let h=Math.sin(this.bob*2)*.045*this.bobAmp,d=Math.cos(this.bob)*.03*this.bobAmp;if(e.position.set(this.x-Math.cos(this.yaw)*d,Oe.eye+this.eyeOff+h,this.z+Math.sin(this.yaw)*d),e.rotation.set(this.pitch+c+i.x,this.yaw+Math.PI+i.y,this.roll+i.z),this.tp){let u=Math.cos(this.pitch),p=4.4,x=this.x-Math.sin(this.yaw)*u*p-Math.cos(this.yaw)*.75,m=this.z-Math.cos(this.yaw)*u*p+Math.sin(this.yaw)*.75,g=Math.max(.35,2+this.eyeOff*.3-Math.sin(this.pitch)*p),v=Math.hypot(x,m),M=39+1.2;v>M&&(x*=M/v,m*=M/v),e.position.set(x,g,m),e.rotation.set(this.pitch+i.x,this.yaw+Math.PI+i.y,i.z+this.roll*.3)}let f=innerWidth<innerHeight?95:this.fov-(this.tp?8:0);Math.abs(e.fov-f)>.05&&(e.fov=f,e.updateProjectionMatrix())}updateViewModel(t){let e=this.state,i=this.st,s=this.poseT,r=this.world.time,a=16;this.flask.visible=!1;let o=!!ul[e]||e==="special";if(this.w.ranged&&(o||e==="charge"||e==="free"&&!this.guarding)){let v=e==="charge"?.5+this.chargeLv*.17:e==="special"?Dt(i/this.atk.def.hit)*(i<this.atk.def.hit?1:0):0,M=o&&e!=="special"?1-Dt(i/.16):e==="special"&&i>=this.atk.def.hit?1-Dt((i-this.atk.def.hit)/.2):0,y=o||e==="charge"?1:0,w=v*.004;s[0]=Wt(.4,.24,y)+Ie(-w,w),s[1]=Wt(-.34,-.14,y)+Ie(-w,w),s[2]=Wt(-.6,-.56,y)+v*.07+M*.06,s[3]=Wt(-.3,0,y)+M*.12,s[4]=Wt(.3,-.12,y),s[5]=Wt(.5,.1,y),a=22,this.models.bow.children[this.models.bow.children.length-2].position.z=-.25+v*.35,this.models.bow.children[this.models.bow.children.length-1].position.z=-.9+v*.35,this.models.bow.children[this.models.bow.children.length-2].visible=this.models.bow.children[this.models.bow.children.length-1].visible=!(o&&M<1&&i>.02&&e!=="special")&&!(e==="special"&&i>=this.atk.def.hit)}else if(e==="special")Op(ul.special,i/this.atk.def.k,s),i<this.atk.def.hit-.1&&(s[0]+=Ie(-.008,.008),s[1]+=Ie(-.008,.008)),a=50;else if(ul[e])Op(ul[e],i*this.w.speed,s),a=60;else if(e==="charge"){let v=this.chargeLv,M=.004+v*.004;s[0]=.48+Ie(-M,M),s[1]=.26+v*.02+Ie(-M,M),s[2]=-.45,s[3]=.95+v*.08,s[4]=0,s[5]=-.5,a=12}else if(e==="dodge")s[0]=.5,s[1]=-.72,s[2]=-.6,s[3]=-.9,s[4]=0,s[5]=.5,a=18;else if(e==="drink"){s[0]=.62,s[1]=-.8,s[2]=-.6,s[3]=-.9,s[4]=.2,s[5]=.3;let v=i/Oe.potionTime,M=$t(Dt(v/.25))*(1-$t(Dt((v-.8)/.2)));this.flask.visible=!0,this.flask.position.set(-.05,-.55+M*.36,-.42),this.flask.rotation.set(-.3-M*.9,0,.2)}else if(e==="hurt"||e==="bounce")s[0]=.55,s[1]=-.3,s[2]=-.55,s[3]=.3,s[4]=.3,s[5]=-.9,a=20;else if(e==="knock"||e==="dead"||e==="stunned")s[0]=.6,s[1]=-.95,s[2]=-.5,s[3]=-1.2,s[4]=0,s[5]=.8,a=8;else if(this.guarding)s[0]=.04+(this.guardT<.12?.05:0),s[1]=-.2,s[2]=-.52-(this.guardT<.12?.08:0),s[3]=-.12,s[4]=0,s[5]=1.28,a=30;else{let v=this.sprinting?1:0,M=this.bobAmp;s[0]=Si[0]+Math.cos(this.bob)*.022*M+v*.05,s[1]=Si[1]+Math.sin(this.bob*2)*.02*M+Math.sin(r*1.7)*.006-v*.1,s[2]=Si[2],s[3]=Si[3]-v*.45,s[4]=Si[4],s[5]=Si[5]+v*.2,this.counterT>0&&(s[1]+=.05,s[5]=.9)}let c=this.pose,l=1-Math.exp(-a*t);for(let v=0;v<6;v++)c[v]=Wt(c[v],s[v],l);let h=innerWidth<innerHeight?.55:1;this.sword.position.set(c[0]*h,c[1],c[2]),this.sword.rotation.set(c[3],c[4],c[5]),this.armL.visible=this.weaponId!=="dual"&&(e==="heavy"||e==="charge"||e==="light3"||this.guarding),this.off.visible=this.weaponId==="dual",this.off.position.set(-c[0]*h,c[1],c[2]),this.off.rotation.set(c[3],-c[4],-c[5]);let d=e==="charge"?this.chargeLv:0,f=.5+d*2.2+(this.buffT>0?1.6+Math.sin(r*9)*.4:0)+(this.counterT>0?3:0)+(e==="heavy"?3:0)+(e==="special"?6:0)+(this.oniT>0?2.5+Math.sin(r*14)*.6:0)+(this.sp>=100?.8+Math.sin(r*5)*.4:0);this.glowMat.emissiveIntensity=Se(this.glowMat.emissiveIntensity,this.w.ranged?Math.min(f,2.2):f,12,t),this.glowMat.emissive.setHex(this.oniT>0||e==="special"?16722474:this.counterT>0?8046847:this.buffT>0?16769136:d>=3?16728096:16742944),this.world.vmGlow.intensity=(d*1.2+(e==="heavy"?2:0)+(this.counterT>0?1.5:0))*.8,this.world.vmGlow.color.setHex(this.counterT>0?8046847:16752704);let u=this.atk,p=!this.w.ranged&&u&&(e===u.name||e==="heavy"&&u.name.startsWith("heavy"))&&i>u.def.hit-.12&&i<u.def.hit+.13;if(this.sword.updateMatrixWorld(!0),p){let v=new P(-.02,this.w.tip,0).applyMatrix4(this.sword.matrixWorld),M=new P(0,this.w.base,0).applyMatrix4(this.sword.matrixWorld);this.trailPts.unshift({tip:v,base:M,a:1}),this.trailCol=e==="special"||this.oniT>0?[1,.25,.15]:e==="counter"?[.5,.8,1]:e==="heavy"?[1,.45,.15]:[1,.85,.6]}for(let v of this.trailPts)v.a-=t*5.5;for(;this.trailPts.length&&(this.trailPts[this.trailPts.length-1].a<=0||this.trailPts.length>this.trailN);)this.trailPts.pop();let x=this.trail.geometry.attributes.position,m=this.trail.geometry.attributes.color,g=this.trailCol;for(let v=0;v<this.trailN;v++){let M=this.trailPts[Math.min(v,this.trailPts.length-1)];if(!M){x.setXYZ(v*2,0,0,0),x.setXYZ(v*2+1,0,0,0),m.setXYZ(v*2,0,0,0),m.setXYZ(v*2+1,0,0,0);continue}let y=v<this.trailPts.length?Math.max(0,M.a)*.6:0;x.setXYZ(v*2,M.tip.x,M.tip.y,M.tip.z),x.setXYZ(v*2+1,M.base.x,M.base.y,M.base.z),m.setXYZ(v*2,g[0]*y,g[1]*y,g[2]*y),m.setXYZ(v*2+1,g[0]*y*.15,g[1]*y*.15,g[2]*y*.15)}x.needsUpdate=!0,m.needsUpdate=!0,this.vm.visible=!this.tp,this.trail.visible=!this.tp}netState(){return[+this.x.toFixed(2),+this.z.toFixed(2),+this.yaw.toFixed(2),+this.pitch.toFixed(2),fl[this.guarding?"guard":this.state]??0,+this.st.toFixed(2),Math.ceil(this.hp),this.chargeLv,this.atk&&this.state==="heavy"?+this.atk.def.dur.toFixed(2):0]}},vy=Object.keys(fl),Ea=class{constructor(t,e,i,s="great"){this.scene=t,this.name=e,this.color=i,this.wid=s,this.dual=s==="dual",this.ranged=s==="bow",this.k=13;let r=this.g=new be,a=new de({color:7038560,roughness:.5,metalness:.55,flatShading:!0}),o=new de({color:2894382,roughness:.9}),c=new de({color:i,roughness:.7,emissive:i,emissiveIntensity:.25}),l=new de({color:11186880,roughness:.3,metalness:.9,emissive:16742944,emissiveIntensity:0});this.steel=l;let h=(x,m,g,v,M,y,w,E)=>{let _=new Jt(new si(g,v,M),m);return _.position.set(y,w,E),_.castShadow=!0,x.add(_),_},d=(x,m,g,v)=>{let M=new be;return M.position.set(m,g,v),x.add(M),M};if(this.bodyG=d(r,0,0,0),this.torso=d(this.bodyG,0,.95,0),h(this.torso,a,.52,.5,.3,0,.42,0),h(this.torso,o,.44,.24,.26,0,.1,0),h(this.torso,c,.54,.1,.32,0,.2,0),h(this.torso,c,.5,.75,.04,0,.2,-.19),h(this.torso,a,.24,.16,.3,-.36,.64,0),h(this.torso,a,.24,.16,.3,.36,.64,0),this.headG=d(this.torso,0,.72,0),h(this.headG,a,.27,.28,.29,0,.14,0),h(this.headG,o,.2,.07,.02,0,.16,.15),h(this.headG,c,.06,.2,.34,0,.36,-.03),this.legL=d(this.bodyG,.14,.95,0),h(this.legL,o,.19,.6,.21,0,-.3,0),h(this.legL,a,.21,.38,.24,0,-.76,.01),this.legR=d(this.bodyG,-.14,.95,0),h(this.legR,o,.19,.6,.21,0,-.3,0),h(this.legR,a,.21,.38,.24,0,-.76,.01),this.armL=d(this.torso,.34,.58,0),h(this.armL,o,.14,.6,.15,0,-.3,0),this.armR=d(this.torso,-.34,.58,0),h(this.armR,o,.14,.6,.15,0,-.3,0),h(this.armR,a,.16,.24,.17,0,-.48,0),this.swordG=d(this.armR,0,-.6,.05),this.swordG.rotation.x=Math.PI/2,s==="bow")h(this.swordG,o,.05,1.5,.07,0,.1,0),h(this.swordG,l,.015,1.4,.015,0,.1,-.16);else if(s==="hammer")h(this.swordG,o,.06,1.4,.06,0,.6,0),h(this.swordG,a,.52,.34,.34,0,1.3,0),h(this.swordG,l,.54,.08,.36,0,1.3,0);else if(s==="dual"){this.sword2=d(this.armL,0,-.6,.05),this.sword2.rotation.x=Math.PI/2-.9;for(let x of[this.swordG,this.sword2])h(x,l,.11,.85,.035,0,.58,0),h(x,a,.26,.06,.07,0,.14,0),h(x,o,.05,.26,.05,0,0,0)}else h(this.swordG,l,.16,1.35,.04,0,.85,0),h(this.swordG,a,.38,.07,.08,0,.16,0),h(this.swordG,o,.05,.3,.05,0,0,0);let f=document.createElement("canvas");f.width=256,f.height=64;let u=f.getContext("2d");u.font='700 30px "Zen Kaku Gothic New", sans-serif',u.textAlign="center",u.textBaseline="middle",u.lineWidth=6,u.strokeStyle="rgba(0,0,0,0.85)",u.strokeText(e,128,32),u.fillStyle=i,u.fillText(e,128,32);let p=new un(f);p.colorSpace=Ve,this.label=new jn(new In({map:p,depthTest:!1,transparent:!0,fog:!1})),this.label.scale.set(2.2,.55,1),this.label.position.y=2.35,this.label.renderOrder=10,r.add(this.label),t.add(r),this.x=0,this.z=28,this.yaw=Math.PI,this.tx=0,this.tz=28,this.tyaw=Math.PI,this.pitch=0,this.state="free",this.st=0,this.hp=100,this.alive=!0,this.run=0,this.speed=0,this.first=!0,this.lv=0,this.adur=.9}apply(t){this.tx=t[0],this.tz=t[1],this.tyaw=t[2],this.pitch=t[3];let e=vy[t[4]]||"free";(e!==this.state||t[5]<this.st-.2)&&(this.state=e),this.st=t[5],this.hp=t[6],this.lv=t[7]||0,this.adur=t[8]||.9,this.alive=this.state!=="dead",this.first&&(this.x=this.tx,this.z=this.tz,this.yaw=this.tyaw,this.first=!1)}update(t){let e=this.x,i=this.z;this.x=Se(this.x,this.tx,this.k,t),this.z=Se(this.z,this.tz,this.k,t),this.yaw=Sa(this.yaw,this.tyaw,this.k,t),this.st+=t;let s=t>0?Math.hypot(this.x-e,this.z-i)/t:0;this.speed=Se(this.speed,s,10,t),this.run+=this.speed*t*2.3;let r=this.g,a=this.state,o=this.st,c=Dt(this.speed/5);r.position.set(this.x,0,this.z),r.rotation.set(0,this.yaw,0);let l=0,h=0,d=this.speed>6?.25:.06*c,f=-.5,u=0,p=Math.PI/2-.9,x=Math.sin(this.run)*.75*c,m=-Math.sin(this.run)*.5*c,g=0,v=(y,w,E,_)=>Wt(E,_,$t(Dt((o-y)/(w-y))));a==="special"?(f=v(.75,1,-3.2,-.1),p=1.2,d=v(.75,1,-.3,.6),g=4):a==="light1"?(f=-1.3,u=v(.08,.3,-1.3,1.2),p=1.5):a==="light2"?(f=-1.3,u=v(.08,.3,1.2,-1.3),p=1.5):a==="light3"?(f=v(.15,.42,-3,-.4),p=1.1,d=v(.15,.42,-.15,.4)):a==="charge"?(f=-2.9,p=.7,d=-.12,g=this.lv):a==="heavy"?(f=v(.1,.36,-3.1,-.2),p=1.2,d=v(.1,.36,-.2,.5),g=3*(1-Dt(o/.5))):a==="counter"?(f=v(.05,.3,-.3,-2.8),u=v(.05,.3,.8,-.6),p=1.3):a==="guard"?(f=-1.25,u=.9,p=.3,d=.12):a==="dodge"?(l=Dt(o/.5)*Ne,h=.45*Math.sin(Dt(o/.5)*Math.PI),x=0,d=.6):a==="drink"?m=-2.3:a==="hurt"||a==="bounce"?d=-.3:a==="stunned"?(d=.5,f=-2.2,m=-2.2):(a==="knock"||a==="dead")&&(l=-Math.PI/2*ji(Dt(o/.4))*(a==="knock"?1-$t(Dt((o-.9)/.35)):1),h=.25*Dt(o/.4),x=0),this.ranged&&(a.startsWith("light")||a==="heavy"||a==="charge"||a==="counter"||a==="special")&&(f=-1.5,u=0,p=0,d=0,g=a==="charge"?this.lv:0),this.bodyG.rotation.x=l,this.bodyG.position.y=h+Math.abs(Math.sin(this.run))*.05*c,this.torso.rotation.x=Se(this.torso.rotation.x,d,16,t),this.headG.rotation.x=Ce(-this.pitch*.6,-.6,.6),this.armR.rotation.x=Se(this.armR.rotation.x,f,30,t),this.armR.rotation.z=Se(this.armR.rotation.z,u,30,t),this.swordG.rotation.x=Se(this.swordG.rotation.x,p,20,t);let M=a.startsWith("light")||a==="heavy"||a==="charge"||a==="counter";this.armL.rotation.x=Se(this.armL.rotation.x,this.dual&&M?f:m,this.dual&&M?30:14,t),this.sword2&&(this.sword2.rotation.x=this.swordG.rotation.x),this.legL.rotation.x=x,this.legR.rotation.x=-x,this.steel.emissiveIntensity=Se(this.steel.emissiveIntensity,g*.9,10,t),this.label.material.opacity=this.alive?1:.4}dispose(){this.scene.remove(this.g)}};var pu=class{constructor(){this.encoder=new TextEncoder,this._pieces=[],this._parts=[]}append_buffer(t){this.flush(),this._parts.push(t)}append(t){this._pieces.push(t)}flush(){if(this._pieces.length>0){let t=new Uint8Array(this._pieces);this._parts.push(t),this._pieces=[]}}toArrayBuffer(){let t=[];for(let e of this._parts)t.push(e);return yy(t).buffer}};function yy(n){let t=0;for(let s of n)t+=s.byteLength;let e=new Uint8Array(t),i=0;for(let s of n){let r=new Uint8Array(s.buffer,s.byteOffset,s.byteLength);e.set(r,i),i+=s.byteLength}return e}function _u(n){return new mu(n).unpack()}function xu(n){let t=new gu,e=t.pack(n);return e instanceof Promise?e.then(()=>t.getBuffer()):t.getBuffer()}var mu=class{constructor(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength}unpack(){let t=this.unpack_uint8();if(t<128)return t;if((t^224)<32)return(t^224)-32;let e;if((e=t^160)<=15)return this.unpack_raw(e);if((e=t^176)<=15)return this.unpack_string(e);if((e=t^144)<=15)return this.unpack_array(e);if((e=t^128)<=15)return this.unpack_map(e);switch(t){case 192:return null;case 193:return;case 194:return!1;case 195:return!0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:return;case 213:return;case 214:return;case 215:return;case 216:return e=this.unpack_uint16(),this.unpack_string(e);case 217:return e=this.unpack_uint32(),this.unpack_string(e);case 218:return e=this.unpack_uint16(),this.unpack_raw(e);case 219:return e=this.unpack_uint32(),this.unpack_raw(e);case 220:return e=this.unpack_uint16(),this.unpack_array(e);case 221:return e=this.unpack_uint32(),this.unpack_array(e);case 222:return e=this.unpack_uint16(),this.unpack_map(e);case 223:return e=this.unpack_uint32(),this.unpack_map(e)}}unpack_uint8(){let t=this.dataView[this.index]&255;return this.index++,t}unpack_uint16(){let t=this.read(2),e=(t[0]&255)*256+(t[1]&255);return this.index+=2,e}unpack_uint32(){let t=this.read(4),e=((t[0]*256+t[1])*256+t[2])*256+t[3];return this.index+=4,e}unpack_uint64(){let t=this.read(8),e=((((((t[0]*256+t[1])*256+t[2])*256+t[3])*256+t[4])*256+t[5])*256+t[6])*256+t[7];return this.index+=8,e}unpack_int8(){let t=this.unpack_uint8();return t<128?t:t-256}unpack_int16(){let t=this.unpack_uint16();return t<32768?t:t-65536}unpack_int32(){let t=this.unpack_uint32();return t<2**31?t:t-2**32}unpack_int64(){let t=this.unpack_uint64();return t<2**63?t:t-2**64}unpack_raw(t){if(this.length<this.index+t)throw new Error(`BinaryPackFailure: index is out of range ${this.index} ${t} ${this.length}`);let e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e}unpack_string(t){let e=this.read(t),i=0,s="",r,a;for(;i<t;)r=e[i],r<160?(a=r,i++):(r^192)<32?(a=(r&31)<<6|e[i+1]&63,i+=2):(r^224)<16?(a=(r&15)<<12|(e[i+1]&63)<<6|e[i+2]&63,i+=3):(a=(r&7)<<18|(e[i+1]&63)<<12|(e[i+2]&63)<<6|e[i+3]&63,i+=4),s+=String.fromCodePoint(a);return this.index+=t,s}unpack_array(t){let e=new Array(t);for(let i=0;i<t;i++)e[i]=this.unpack();return e}unpack_map(t){let e={};for(let i=0;i<t;i++){let s=this.unpack();e[s]=this.unpack()}return e}unpack_float(){let t=this.unpack_uint32(),e=t>>31,i=(t>>23&255)-127,s=t&8388607|8388608;return(e===0?1:-1)*s*2**(i-23)}unpack_double(){let t=this.unpack_uint32(),e=this.unpack_uint32(),i=t>>31,s=(t>>20&2047)-1023,a=(t&1048575|1048576)*2**(s-20)+e*2**(s-52);return(i===0?1:-1)*a}read(t){let e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")}},gu=class{getBuffer(){return this._bufferBuilder.toArrayBuffer()}pack(t){if(typeof t=="string")this.pack_string(t);else if(typeof t=="number")Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if(typeof t=="boolean")t===!0?this._bufferBuilder.append(195):t===!1&&this._bufferBuilder.append(194);else if(t===void 0)this._bufferBuilder.append(192);else if(typeof t=="object")if(t===null)this._bufferBuilder.append(192);else{let e=t.constructor;if(t instanceof Array){let i=this.pack_array(t);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else if(t instanceof ArrayBuffer)this.pack_bin(new Uint8Array(t));else if("BYTES_PER_ELEMENT"in t){let i=t;this.pack_bin(new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}else if(t instanceof Date)this.pack_string(t.toString());else{if(t instanceof Blob)return t.arrayBuffer().then(i=>{this.pack_bin(new Uint8Array(i)),this._bufferBuilder.flush()});if(e==Object||e.toString().startsWith("class")){let i=this.pack_object(t);if(i instanceof Promise)return i.then(()=>this._bufferBuilder.flush())}else throw new Error(`Type "${e.toString()}" not yet supported`)}}else throw new Error(`Type "${typeof t}" not yet supported`);this._bufferBuilder.flush()}pack_bin(t){let e=t.length;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this._bufferBuilder.append(218),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(219),this.pack_uint32(e);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(t)}pack_string(t){let e=this._textEncoder.encode(t),i=e.length;if(i<=15)this.pack_uint8(176+i);else if(i<=65535)this._bufferBuilder.append(216),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(217),this.pack_uint32(i);else throw new Error("Invalid length");this._bufferBuilder.append_buffer(e)}pack_array(t){let e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this._bufferBuilder.append(220),this.pack_uint16(e);else if(e<=4294967295)this._bufferBuilder.append(221),this.pack_uint32(e);else throw new Error("Invalid length");let i=s=>{if(s<e){let r=this.pack(t[s]);return r instanceof Promise?r.then(()=>i(s+1)):i(s+1)}};return i(0)}pack_integer(t){if(t>=-32&&t<=127)this._bufferBuilder.append(t&255);else if(t>=0&&t<=255)this._bufferBuilder.append(204),this.pack_uint8(t);else if(t>=-128&&t<=127)this._bufferBuilder.append(208),this.pack_int8(t);else if(t>=0&&t<=65535)this._bufferBuilder.append(205),this.pack_uint16(t);else if(t>=-32768&&t<=32767)this._bufferBuilder.append(209),this.pack_int16(t);else if(t>=0&&t<=4294967295)this._bufferBuilder.append(206),this.pack_uint32(t);else if(t>=-2147483648&&t<=2147483647)this._bufferBuilder.append(210),this.pack_int32(t);else if(t>=-9223372036854776e3&&t<=9223372036854776e3)this._bufferBuilder.append(211),this.pack_int64(t);else if(t>=0&&t<=18446744073709552e3)this._bufferBuilder.append(207),this.pack_uint64(t);else throw new Error("Invalid integer")}pack_double(t){let e=0;t<0&&(e=1,t=-t);let i=Math.floor(Math.log(t)/Math.LN2),s=t/2**i-1,r=Math.floor(s*2**52),a=2**32,o=e<<31|i+1023<<20|r/a&1048575,c=r%a;this._bufferBuilder.append(203),this.pack_int32(o),this.pack_int32(c)}pack_object(t){let e=Object.keys(t),i=e.length;if(i<=15)this.pack_uint8(128+i);else if(i<=65535)this._bufferBuilder.append(222),this.pack_uint16(i);else if(i<=4294967295)this._bufferBuilder.append(223),this.pack_uint32(i);else throw new Error("Invalid length");let s=r=>{if(r<e.length){let a=e[r];if(t.hasOwnProperty(a)){this.pack(a);let o=this.pack(t[a]);if(o instanceof Promise)return o.then(()=>s(r+1))}return s(r+1)}};return s(0)}pack_uint8(t){this._bufferBuilder.append(t)}pack_uint16(t){this._bufferBuilder.append(t>>8),this._bufferBuilder.append(t&255)}pack_uint32(t){let e=t&4294967295;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255)}pack_uint64(t){let e=t/4294967296,i=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}pack_int8(t){this._bufferBuilder.append(t&255)}pack_int16(t){this._bufferBuilder.append((t&65280)>>8),this._bufferBuilder.append(t&255)}pack_int32(t){this._bufferBuilder.append(t>>>24&255),this._bufferBuilder.append((t&16711680)>>>16),this._bufferBuilder.append((t&65280)>>>8),this._bufferBuilder.append(t&255)}pack_int64(t){let e=Math.floor(t/4294967296),i=t%2**32;this._bufferBuilder.append((e&4278190080)>>>24),this._bufferBuilder.append((e&16711680)>>>16),this._bufferBuilder.append((e&65280)>>>8),this._bufferBuilder.append(e&255),this._bufferBuilder.append((i&4278190080)>>>24),this._bufferBuilder.append((i&16711680)>>>16),this._bufferBuilder.append((i&65280)>>>8),this._bufferBuilder.append(i&255)}constructor(){this._bufferBuilder=new pu,this._textEncoder=new TextEncoder}};var Hp=!0,Gp=!0;function lr(n,t,e){let i=n.match(t);return i&&i.length>=e&&parseFloat(i[e],10)}function Qi(n,t,e){if(!n.RTCPeerConnection)return;if(!Object.getOwnPropertyDescriptor(EventTarget.prototype,"addEventListener").writable){wa("Unable to polyfill events");return}let s=n.RTCPeerConnection.prototype,r=s.addEventListener;s.addEventListener=function(o,c){if(o!==t)return r.apply(this,arguments);let l=h=>{let d=e(h);d&&(c.handleEvent?c.handleEvent(d):c(d))};return this._eventMap=this._eventMap||{},this._eventMap[t]||(this._eventMap[t]=new Map),this._eventMap[t].set(c,l),r.apply(this,[o,l])};let a=s.removeEventListener;s.removeEventListener=function(o,c){if(o!==t||!this._eventMap||!this._eventMap[t])return a.apply(this,arguments);if(!this._eventMap[t].has(c))return a.apply(this,arguments);let l=this._eventMap[t].get(c);return this._eventMap[t].delete(c),this._eventMap[t].size===0&&delete this._eventMap[t],Object.keys(this._eventMap).length===0&&delete this._eventMap,a.apply(this,[o,l])},Object.defineProperty(s,"on"+t,{get(){return this["_on"+t]},set(o){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),o&&this.addEventListener(t,this["_on"+t]=o)},enumerable:!0,configurable:!0})}function Vp(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Hp=n,n?"adapter.js logging disabled":"adapter.js logging enabled")}function Wp(n){return typeof n!="boolean"?new Error("Argument type: "+typeof n+". Please use a boolean."):(Gp=!n,"adapter.js deprecation warnings "+(n?"disabled":"enabled"))}function wa(){if(typeof window=="object"){if(Hp)return;typeof console<"u"&&typeof console.log=="function"&&console.log.apply(console,arguments)}}function hr(n,t){Gp&&console.warn(n+" is deprecated, please use "+t+" instead.")}function Xp(n){let t={browser:null,version:null};if(typeof n>"u"||!n.navigator||!n.navigator.userAgent)return t.browser="Not a browser.",t;let{navigator:e}=n;if(e.userAgentData&&e.userAgentData.brands){let i=e.userAgentData.brands.find(s=>s.brand==="Chromium");if(i){let s=parseInt(i.version,10);if(s>=90)return{browser:"chrome",version:s}}}if(e.mozGetUserMedia)t.browser="firefox",t.version=parseInt(lr(e.userAgent,/Firefox\/(\d+)\./,1));else if(e.webkitGetUserMedia||n.isSecureContext===!1&&n.webkitRTCPeerConnection)t.browser="chrome",t.version=parseInt(lr(e.userAgent,/Chrom(e|ium)\/(\d+)\./,2))||null;else if(n.RTCPeerConnection&&e.userAgent.match(/AppleWebKit\/(\d+)\./))t.browser="safari",t.version=parseInt(lr(e.userAgent,/AppleWebKit\/(\d+)\./,1)),t.supportsUnifiedPlan=n.RTCRtpTransceiver&&"currentDirection"in n.RTCRtpTransceiver.prototype,t._safariVersion=lr(e.userAgent,/Version\/(\d+(\.?\d+))/,1);else return t.browser="Not a supported browser.",t;return t}function zp(n){return Object.prototype.toString.call(n)==="[object Object]"}function yu(n){return zp(n)?Object.keys(n).reduce(function(t,e){let i=zp(n[e]),s=i?yu(n[e]):n[e],r=i&&!Object.keys(s).length;return s===void 0||r?t:Object.assign(t,{[e]:s})},{}):n}function vu(n,t,e){!t||e.has(t.id)||(e.set(t.id,t),Object.keys(t).forEach(i=>{i.endsWith("Id")?vu(n,n.get(t[i]),e):i.endsWith("Ids")&&t[i].forEach(s=>{vu(n,n.get(s),e)})}))}function Su(n,t,e){let i=e?"outbound-rtp":"inbound-rtp",s=new Map;if(t===null)return s;let r=[];return n.forEach(a=>{a.type==="track"&&a.trackIdentifier===t.id&&r.push(a)}),r.forEach(a=>{n.forEach(o=>{o.type===i&&o.trackId===a.id&&vu(n,o,s)})}),s}var gl={};Va(gl,{fixNegotiationNeeded:()=>Au,shimAddTrackRemoveTrack:()=>wu,shimAddTrackRemoveTrackWithNative:()=>Yp,shimGetSendersWithDtmf:()=>Tu,shimGetUserMedia:()=>pl,shimMediaStream:()=>Mu,shimOnTrack:()=>bu,shimPeerConnection:()=>ml,shimSenderReceiverGetStats:()=>Eu});var qp=wa;function pl(n,t){if(t.version>=64)return;let e=n&&n.navigator;if(!e.mediaDevices)return;let i=function(o){if(typeof o!="object"||o.mandatory||o.optional)return o;let c={};return Object.keys(o).forEach(l=>{if(l==="require"||l==="advanced"||l==="mediaSource")return;let h=typeof o[l]=="object"?o[l]:{ideal:o[l]};h.exact!==void 0&&typeof h.exact=="number"&&(h.min=h.max=h.exact);let d=function(f,u){return f?f+u.charAt(0).toUpperCase()+u.slice(1):u==="deviceId"?"sourceId":u};if(h.ideal!==void 0){c.optional=c.optional||[];let f={};typeof h.ideal=="number"?(f[d("min",l)]=h.ideal,c.optional.push(f),f={},f[d("max",l)]=h.ideal,c.optional.push(f)):(f[d("",l)]=h.ideal,c.optional.push(f))}h.exact!==void 0&&typeof h.exact!="number"?(c.mandatory=c.mandatory||{},c.mandatory[d("",l)]=h.exact):["min","max"].forEach(f=>{h[f]!==void 0&&(c.mandatory=c.mandatory||{},c.mandatory[d(f,l)]=h[f])})}),o.advanced&&(c.optional=(c.optional||[]).concat(o.advanced)),c},s=function(o,c){if(t.version>=61)return c(o);if(o=JSON.parse(JSON.stringify(o)),o&&typeof o.audio=="object"){let l=function(h,d,f){d in h&&!(f in h)&&(h[f]=h[d],delete h[d])};o=JSON.parse(JSON.stringify(o)),l(o.audio,"autoGainControl","googAutoGainControl"),l(o.audio,"noiseSuppression","googNoiseSuppression"),o.audio=i(o.audio)}if(o&&typeof o.video=="object"){let l=o.video.facingMode;l=l&&(typeof l=="object"?l:{ideal:l});let h=t.version<66;if(l&&(l.exact==="user"||l.exact==="environment"||l.ideal==="user"||l.ideal==="environment")&&!(e.mediaDevices.getSupportedConstraints&&e.mediaDevices.getSupportedConstraints().facingMode&&!h)){delete o.video.facingMode;let d;if(l.exact==="environment"||l.ideal==="environment"?d=["back","rear"]:(l.exact==="user"||l.ideal==="user")&&(d=["front"]),d)return e.mediaDevices.enumerateDevices().then(f=>{f=f.filter(p=>p.kind==="videoinput");let u=f.find(p=>d.some(x=>p.label.toLowerCase().includes(x)));return!u&&f.length&&d.includes("back")&&(u=f[f.length-1]),u&&(o.video.deviceId=l.exact?{exact:u.deviceId}:{ideal:u.deviceId}),o.video=i(o.video),qp("chrome: "+JSON.stringify(o)),c(o)})}o.video=i(o.video)}return qp("chrome: "+JSON.stringify(o)),c(o)},r=function(o){return t.version>=64?o:{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[o.name]||o.name,message:o.message,constraint:o.constraint||o.constraintName,toString(){return this.name+(this.message&&": ")+this.message}}},a=function(o,c,l){s(o,h=>{e.webkitGetUserMedia(h,c,d=>{l&&l(r(d))})})};if(e.getUserMedia=a.bind(e),e.mediaDevices.getUserMedia){let o=e.mediaDevices.getUserMedia.bind(e.mediaDevices);e.mediaDevices.getUserMedia=function(c){return s(c,l=>o(l).then(h=>{if(l.audio&&!h.getAudioTracks().length||l.video&&!h.getVideoTracks().length)throw h.getTracks().forEach(d=>{d.stop()}),new DOMException("","NotFoundError");return h},h=>Promise.reject(r(h))))}}}function Mu(n){n.MediaStream=n.MediaStream||n.webkitMediaStream}function bu(n,t){if(!(t.version>102))if(typeof n=="object"&&n.RTCPeerConnection&&!("ontrack"in n.RTCPeerConnection.prototype)){Object.defineProperty(n.RTCPeerConnection.prototype,"ontrack",{get(){return this._ontrack},set(i){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=i)},enumerable:!0,configurable:!0});let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){return this._ontrackpoly||(this._ontrackpoly=s=>{s.stream.addEventListener("addtrack",r=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===r.track.id):a={track:r.track};let o=new Event("track");o.track=r.track,o.receiver=a,o.transceiver={receiver:a},o.streams=[s.stream],this.dispatchEvent(o)}),s.stream.getTracks().forEach(r=>{let a;n.RTCPeerConnection.prototype.getReceivers?a=this.getReceivers().find(c=>c.track&&c.track.id===r.id):a={track:r};let o=new Event("track");o.track=r,o.receiver=a,o.transceiver={receiver:a},o.streams=[s.stream],this.dispatchEvent(o)})},this.addEventListener("addstream",this._ontrackpoly)),e.apply(this,arguments)}}else Qi(n,"track",e=>(e.transceiver||Object.defineProperty(e,"transceiver",{value:{receiver:e.receiver}}),e))}function Tu(n){if(typeof n=="object"&&n.RTCPeerConnection&&!("getSenders"in n.RTCPeerConnection.prototype)&&"createDTMFSender"in n.RTCPeerConnection.prototype){let t=function(s,r){return{track:r,get dtmf(){return this._dtmf===void 0&&(r.kind==="audio"?this._dtmf=s.createDTMFSender(r):this._dtmf=null),this._dtmf},_pc:s}};if(!n.RTCPeerConnection.prototype.getSenders){n.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice()};let s=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(o,c){let l=s.apply(this,arguments);return l||(l=t(this,o),this._senders.push(l)),l};let r=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(o){r.apply(this,arguments);let c=this._senders.indexOf(o);c!==-1&&this._senders.splice(c,1)}}let e=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(r){this._senders=this._senders||[],e.apply(this,[r]),r.getTracks().forEach(a=>{this._senders.push(t(this,a))})};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(r){this._senders=this._senders||[],i.apply(this,[r]),r.getTracks().forEach(a=>{let o=this._senders.find(c=>c.track===a);o&&this._senders.splice(this._senders.indexOf(o),1)})}}else if(typeof n=="object"&&n.RTCPeerConnection&&"getSenders"in n.RTCPeerConnection.prototype&&"createDTMFSender"in n.RTCPeerConnection.prototype&&n.RTCRtpSender&&!("dtmf"in n.RTCRtpSender.prototype)){let t=n.RTCPeerConnection.prototype.getSenders;n.RTCPeerConnection.prototype.getSenders=function(){let i=t.apply(this,[]);return i.forEach(s=>s._pc=this),i},Object.defineProperty(n.RTCRtpSender.prototype,"dtmf",{get(){return this._dtmf===void 0&&(this.track.kind==="audio"?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}}function Eu(n,t){if(t.version>=67||!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender&&n.RTCRtpReceiver))return;if(!("getStats"in n.RTCRtpSender.prototype)){let i=n.RTCPeerConnection.prototype.getSenders;i&&(n.RTCPeerConnection.prototype.getSenders=function(){let a=i.apply(this,[]);return a.forEach(o=>o._pc=this),a});let s=n.RTCPeerConnection.prototype.addTrack;s&&(n.RTCPeerConnection.prototype.addTrack=function(){let a=s.apply(this,arguments);return a._pc=this,a}),n.RTCRtpSender.prototype.getStats=function(){let a=this;return this._pc.getStats().then(o=>Su(o,a.track,!0))}}if(!("getStats"in n.RTCRtpReceiver.prototype)){let i=n.RTCPeerConnection.prototype.getReceivers;i&&(n.RTCPeerConnection.prototype.getReceivers=function(){let r=i.apply(this,[]);return r.forEach(a=>a._pc=this),r}),Qi(n,"track",s=>(s.receiver._pc=s.srcElement,s)),n.RTCRtpReceiver.prototype.getStats=function(){let r=this;return this._pc.getStats().then(a=>Su(a,r.track,!1))}}if(!("getStats"in n.RTCRtpSender.prototype&&"getStats"in n.RTCRtpReceiver.prototype))return;let e=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){if(arguments.length>0&&arguments[0]instanceof n.MediaStreamTrack){let s=arguments[0],r,a,o;return this.getSenders().forEach(c=>{c.track===s&&(r?o=!0:r=c)}),this.getReceivers().forEach(c=>(c.track===s&&(a?o=!0:a=c),c.track===s)),o||r&&a?Promise.reject(new DOMException("There are more than one sender or receiver for the track.","InvalidAccessError")):r?r.getStats():a?a.getStats():Promise.reject(new DOMException("There is no sender or receiver for the track.","InvalidAccessError"))}return e.apply(this,arguments)}}function Yp(n){n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(a=>this._shimmedLocalStreams[a][0])};let t=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addTrack=function(a,o){if(!o)return t.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};let c=t.apply(this,arguments);return this._shimmedLocalStreams[o.id]?this._shimmedLocalStreams[o.id].indexOf(c)===-1&&this._shimmedLocalStreams[o.id].push(c):this._shimmedLocalStreams[o.id]=[o,c],c};let e=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(a){this._shimmedLocalStreams=this._shimmedLocalStreams||{},a.getTracks().forEach(l=>{if(this.getSenders().find(d=>d.track===l))throw new DOMException("Track already exists.","InvalidAccessError")});let o=this.getSenders();e.apply(this,arguments);let c=this.getSenders().filter(l=>o.indexOf(l)===-1);this._shimmedLocalStreams[a.id]=[a].concat(c)};let i=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[a.id],i.apply(this,arguments)};let s=n.RTCPeerConnection.prototype.removeTrack;n.RTCPeerConnection.prototype.removeTrack=function(a){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},a&&Object.keys(this._shimmedLocalStreams).forEach(o=>{let c=this._shimmedLocalStreams[o].indexOf(a);c!==-1&&this._shimmedLocalStreams[o].splice(c,1),this._shimmedLocalStreams[o].length===1&&delete this._shimmedLocalStreams[o]}),s.apply(this,arguments)}}function wu(n,t){if(!n.RTCPeerConnection)return;if(n.RTCPeerConnection.prototype.addTrack&&t.version>=65)return Yp(n);let e=n.RTCPeerConnection.prototype.getLocalStreams;n.RTCPeerConnection.prototype.getLocalStreams=function(){let h=e.apply(this);return this._reverseStreams=this._reverseStreams||{},h.map(d=>this._reverseStreams[d.id])};let i=n.RTCPeerConnection.prototype.addStream;n.RTCPeerConnection.prototype.addStream=function(h){if(this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},h.getTracks().forEach(d=>{if(this.getSenders().find(u=>u.track===d))throw new DOMException("Track already exists.","InvalidAccessError")}),!this._reverseStreams[h.id]){let d=new n.MediaStream(h.getTracks());this._streams[h.id]=d,this._reverseStreams[d.id]=h,h=d}i.apply(this,[h])};let s=n.RTCPeerConnection.prototype.removeStream;n.RTCPeerConnection.prototype.removeStream=function(h){this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{},s.apply(this,[this._streams[h.id]||h]),delete this._reverseStreams[this._streams[h.id]?this._streams[h.id].id:h.id],delete this._streams[h.id]},n.RTCPeerConnection.prototype.addTrack=function(h,d){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");let f=[].slice.call(arguments,1);if(f.length!==1||!f[0].getTracks().find(x=>x===h))throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(this.getSenders().find(x=>x.track===h))throw new DOMException("Track already exists.","InvalidAccessError");this._streams=this._streams||{},this._reverseStreams=this._reverseStreams||{};let p=this._streams[d.id];if(p)p.addTrack(h),Promise.resolve().then(()=>{this.dispatchEvent(new Event("negotiationneeded"))});else{let x=new n.MediaStream([h]);this._streams[d.id]=x,this._reverseStreams[x.id]=d,this.addStream(x)}return this.getSenders().find(x=>x.track===h)};function r(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let u=l._reverseStreams[f],p=l._streams[u.id];d=d.replace(new RegExp(p.id,"g"),u.id)}),new RTCSessionDescription({type:h.type,sdp:d})}function a(l,h){let d=h.sdp;return Object.keys(l._reverseStreams||[]).forEach(f=>{let u=l._reverseStreams[f],p=l._streams[u.id];d=d.replace(new RegExp(u.id,"g"),p.id)}),new RTCSessionDescription({type:h.type,sdp:d})}["createOffer","createAnswer"].forEach(function(l){let h=n.RTCPeerConnection.prototype[l],d={[l](){let f=arguments;return arguments.length&&typeof arguments[0]=="function"?h.apply(this,[p=>{let x=r(this,p);f[0].apply(null,[x])},p=>{f[1]&&f[1].apply(null,p)},arguments[2]]):h.apply(this,arguments).then(p=>r(this,p))}};n.RTCPeerConnection.prototype[l]=d[l]});let o=n.RTCPeerConnection.prototype.setLocalDescription;n.RTCPeerConnection.prototype.setLocalDescription=function(){return!arguments.length||!arguments[0].type?o.apply(this,arguments):(arguments[0]=a(this,arguments[0]),o.apply(this,arguments))};let c=Object.getOwnPropertyDescriptor(n.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(n.RTCPeerConnection.prototype,"localDescription",{get(){let l=c.get.apply(this);return l.type===""?l:r(this,l)}}),n.RTCPeerConnection.prototype.removeTrack=function(h){if(this.signalingState==="closed")throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");if(!h._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(h._pc===this))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");this._streams=this._streams||{};let f;Object.keys(this._streams).forEach(u=>{this._streams[u].getTracks().find(x=>h.track===x)&&(f=this._streams[u])}),f&&(f.getTracks().length===1?this.removeStream(this._reverseStreams[f.id]):f.removeTrack(h.track),this.dispatchEvent(new Event("negotiationneeded")))}}function ml(n,t){!n.RTCPeerConnection&&n.webkitRTCPeerConnection&&(n.RTCPeerConnection=n.webkitRTCPeerConnection),n.RTCPeerConnection&&t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){let i=n.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[e]=s[e]})}function Au(n,t){t.version>102||Qi(n,"negotiationneeded",e=>{let i=e.target;if(!((t.version<72||i.getConfiguration&&i.getConfiguration().sdpSemantics==="plan-b")&&i.signalingState!=="stable"))return e})}var vl={};Va(vl,{shimAddTransceiver:()=>Nu,shimCreateAnswer:()=>ku,shimCreateOffer:()=>Fu,shimGetDisplayMedia:()=>$p,shimGetParameters:()=>Uu,shimGetStats:()=>Ru,shimGetUserMedia:()=>_l,shimOnTrack:()=>Cu,shimPeerConnection:()=>xl,shimRTCDataChannel:()=>Du,shimReceiverGetStats:()=>Iu,shimRemoveStream:()=>Lu,shimSenderGetStats:()=>Pu});function _l(n,t){let e=n&&n.navigator;if(!e.mediaDevices)return;let i=n&&n.MediaStreamTrack;if(e.getUserMedia=function(s,r,a){hr("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),e.mediaDevices.getUserMedia(s).then(r,a)},!(t.version>55&&"autoGainControl"in e.mediaDevices.getSupportedConstraints())){let s=function(a,o,c){o in a&&!(c in a)&&(a[c]=a[o],delete a[o])},r=e.mediaDevices.getUserMedia.bind(e.mediaDevices);if(e.mediaDevices.getUserMedia=function(a){return typeof a=="object"&&typeof a.audio=="object"&&(a=JSON.parse(JSON.stringify(a)),s(a.audio,"autoGainControl","mozAutoGainControl"),s(a.audio,"noiseSuppression","mozNoiseSuppression")),r(a)},i&&i.prototype.getSettings){let a=i.prototype.getSettings;i.prototype.getSettings=function(){let o=a.apply(this,arguments);return s(o,"mozAutoGainControl","autoGainControl"),s(o,"mozNoiseSuppression","noiseSuppression"),o}}if(i&&i.prototype.applyConstraints){let a=i.prototype.applyConstraints;i.prototype.applyConstraints=function(o){return this.kind==="audio"&&typeof o=="object"&&(o=JSON.parse(JSON.stringify(o)),s(o,"autoGainControl","mozAutoGainControl"),s(o,"noiseSuppression","mozNoiseSuppression")),a.apply(this,[o])}}}}function $p(n,t){n.navigator.mediaDevices&&(n.navigator.mediaDevices&&"getDisplayMedia"in n.navigator.mediaDevices||(n.navigator.mediaDevices.getDisplayMedia=function(i){if(!(i&&i.video)){let s=new DOMException("getDisplayMedia without video constraints is undefined");return s.name="NotFoundError",s.code=8,Promise.reject(s)}return i.video===!0?i.video={mediaSource:t}:i.video.mediaSource=t,n.navigator.mediaDevices.getUserMedia(i)}))}function Cu(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function xl(n,t){typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||(!n.RTCPeerConnection&&n.mozRTCPeerConnection&&(n.RTCPeerConnection=n.mozRTCPeerConnection),t.version<53&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(e){let i=n.RTCPeerConnection.prototype[e],s={[e](){return arguments[0]=new(e==="addIceCandidate"?n.RTCIceCandidate:n.RTCSessionDescription)(arguments[0]),i.apply(this,arguments)}};n.RTCPeerConnection.prototype[e]=s[e]}))}function Ru(n,t){if(typeof n!="object"||!(n.RTCPeerConnection||n.mozRTCPeerConnection)||t.version>=151)return;let e={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},i=n.RTCPeerConnection.prototype.getStats;n.RTCPeerConnection.prototype.getStats=function(){let[r,a,o]=arguments;return this.signalingState==="closed"?Promise.resolve(new Map):i.apply(this,[r||null]).then(c=>{if(t.version<53&&!a)try{c.forEach(l=>{l.type=e[l.type]||l.type})}catch(l){if(l.name!=="TypeError")throw l;c.forEach((h,d)=>{c.set(d,Object.assign({},h,{type:e[h.type]||h.type}))})}return c}).then(a,o)}}function Pu(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpSender.prototype)return;let t=n.RTCPeerConnection.prototype.getSenders;t&&(n.RTCPeerConnection.prototype.getSenders=function(){let s=t.apply(this,[]);return s.forEach(r=>r._pc=this),s});let e=n.RTCPeerConnection.prototype.addTrack;e&&(n.RTCPeerConnection.prototype.addTrack=function(){let s=e.apply(this,arguments);return s._pc=this,s}),n.RTCRtpSender.prototype.getStats=function(){return this.track?this._pc.getStats(this.track):Promise.resolve(new Map)}}function Iu(n){if(!(typeof n=="object"&&n.RTCPeerConnection&&n.RTCRtpSender)||n.RTCRtpSender&&"getStats"in n.RTCRtpReceiver.prototype)return;let t=n.RTCPeerConnection.prototype.getReceivers;t&&(n.RTCPeerConnection.prototype.getReceivers=function(){let i=t.apply(this,[]);return i.forEach(s=>s._pc=this),i}),Qi(n,"track",e=>(e.receiver._pc=e.srcElement,e)),n.RTCRtpReceiver.prototype.getStats=function(){return this._pc.getStats(this.track)}}function Lu(n){!n.RTCPeerConnection||"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(e){hr("removeStream","removeTrack"),this.getSenders().forEach(i=>{i.track&&e.getTracks().includes(i.track)&&this.removeTrack(i)})})}function Du(n){n.DataChannel&&!n.RTCDataChannel&&(n.RTCDataChannel=n.DataChannel)}function Nu(n,t){if(!(typeof n=="object"&&n.RTCPeerConnection)||t.version>=110)return;let e=n.RTCPeerConnection.prototype.addTransceiver;e&&(n.RTCPeerConnection.prototype.addTransceiver=function(){this.setParametersPromises=[];let s=arguments[1]&&arguments[1].sendEncodings;s===void 0&&(s=[]),s=[...s];let r=s.length>0;r&&s.forEach(o=>{if("rid"in o&&!/^[a-z0-9]{0,16}$/i.test(o.rid))throw new TypeError("Invalid RID value provided.");if("scaleResolutionDownBy"in o&&!(parseFloat(o.scaleResolutionDownBy)>=1))throw new RangeError("scale_resolution_down_by must be >= 1.0");if("maxFramerate"in o&&!(parseFloat(o.maxFramerate)>=0))throw new RangeError("max_framerate must be >= 0.0")});let a=e.apply(this,arguments);if(r){let{sender:o}=a,c=o.getParameters();(!("encodings"in c)||c.encodings.length===1&&Object.keys(c.encodings[0]).length===0)&&(c.encodings=s,o.sendEncodings=s,this.setParametersPromises.push(o.setParameters(c).then(()=>{delete o.sendEncodings}).catch(()=>{delete o.sendEncodings})))}return a})}function Uu(n,t){if(!(typeof n=="object"&&n.RTCRtpSender)||t.version>=110)return;let e=n.RTCRtpSender.prototype.getParameters;e&&(n.RTCRtpSender.prototype.getParameters=function(){let s=e.apply(this,arguments);return"encodings"in s||(s.encodings=[].concat(this.sendEncodings||[{}])),s})}function Fu(n,t){if(!(typeof n=="object"&&n.RTCPeerConnection)||t.version>=110)return;let e=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}function ku(n,t){if(!(typeof n=="object"&&n.RTCPeerConnection)||t.version>=110)return;let e=n.RTCPeerConnection.prototype.createAnswer;n.RTCPeerConnection.prototype.createAnswer=function(){return this.setParametersPromises&&this.setParametersPromises.length?Promise.all(this.setParametersPromises).then(()=>e.apply(this,arguments)).finally(()=>{this.setParametersPromises=[]}):e.apply(this,arguments)}}var yl={};Va(yl,{shimAudioContext:()=>Xu,shimCallbacksAPI:()=>zu,shimConstraints:()=>Zp,shimCreateOfferLegacy:()=>Wu,shimGetUserMedia:()=>Hu,shimLocalStreamsAPI:()=>Ou,shimRTCIceServerUrls:()=>Gu,shimRemoteStreamsAPI:()=>Bu,shimTrackEventTransceiver:()=>Vu});function Ou(n){if(!(typeof n!="object"||!n.RTCPeerConnection)){if("getLocalStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),!("addStream"in n.RTCPeerConnection.prototype)){let t=n.RTCPeerConnection.prototype.addTrack;n.RTCPeerConnection.prototype.addStream=function(i){this._localStreams||(this._localStreams=[]),this._localStreams.includes(i)||this._localStreams.push(i),i.getAudioTracks().forEach(s=>t.call(this,s,i)),i.getVideoTracks().forEach(s=>t.call(this,s,i))},n.RTCPeerConnection.prototype.addTrack=function(i,...s){return s&&s.forEach(r=>{this._localStreams?this._localStreams.includes(r)||this._localStreams.push(r):this._localStreams=[r]}),t.apply(this,arguments)}}"removeStream"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);let i=this._localStreams.indexOf(e);if(i===-1)return;this._localStreams.splice(i,1);let s=e.getTracks();this.getSenders().forEach(r=>{s.includes(r.track)&&this.removeTrack(r)})})}}function Bu(n){if(!(typeof n!="object"||!n.RTCPeerConnection)&&("getRemoteStreams"in n.RTCPeerConnection.prototype||(n.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),!("onaddstream"in n.RTCPeerConnection.prototype))){Object.defineProperty(n.RTCPeerConnection.prototype,"onaddstream",{get(){return this._onaddstream},set(e){this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=i=>{i.streams.forEach(s=>{if(this._remoteStreams||(this._remoteStreams=[]),this._remoteStreams.includes(s))return;this._remoteStreams.push(s);let r=new Event("addstream");r.stream=s,this.dispatchEvent(r)})})}});let t=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){let i=this;return this._onaddstreampoly||this.addEventListener("track",this._onaddstreampoly=function(s){s.streams.forEach(r=>{if(i._remoteStreams||(i._remoteStreams=[]),i._remoteStreams.indexOf(r)>=0)return;i._remoteStreams.push(r);let a=new Event("addstream");a.stream=r,i.dispatchEvent(a)})}),t.apply(i,arguments)}}}function zu(n){if(typeof n!="object"||!n.RTCPeerConnection)return;let t=n.RTCPeerConnection.prototype,e=t.createOffer,i=t.createAnswer,s=t.setLocalDescription,r=t.setRemoteDescription,a=t.addIceCandidate;t.createOffer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],f=e.apply(this,[d]);return h?(f.then(l,h),Promise.resolve()):f},t.createAnswer=function(l,h){let d=arguments.length>=2?arguments[2]:arguments[0],f=i.apply(this,[d]);return h?(f.then(l,h),Promise.resolve()):f};let o=function(c,l,h){let d=s.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d};t.setLocalDescription=o,o=function(c,l,h){let d=r.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.setRemoteDescription=o,o=function(c,l,h){let d=a.apply(this,[c]);return h?(d.then(l,h),Promise.resolve()):d},t.addIceCandidate=o}function Hu(n){let t=n&&n.navigator;if(t.mediaDevices&&t.mediaDevices.getUserMedia){let e=t.mediaDevices,i=e.getUserMedia.bind(e);t.mediaDevices.getUserMedia=s=>i(Zp(s))}!t.getUserMedia&&t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=function(i,s,r){t.mediaDevices.getUserMedia(i).then(s,r)}.bind(t))}function Zp(n){return n&&n.video!==void 0?Object.assign({},n,{video:yu(n.video)}):n}function Gu(n){if(!n.RTCPeerConnection)return;let t=n.RTCPeerConnection;n.RTCPeerConnection=function(i,s){if(i&&i.iceServers){let r=[];for(let a=0;a<i.iceServers.length;a++){let o=i.iceServers[a];o.urls===void 0&&o.url?(hr("RTCIceServer.url","RTCIceServer.urls"),o=JSON.parse(JSON.stringify(o)),o.urls=o.url,delete o.url,r.push(o)):r.push(i.iceServers[a])}i.iceServers=r}return new t(i,s)},n.RTCPeerConnection.prototype=t.prototype,"generateCertificate"in t&&Object.defineProperty(n.RTCPeerConnection,"generateCertificate",{get(){return t.generateCertificate}})}function Vu(n){typeof n=="object"&&n.RTCTrackEvent&&"receiver"in n.RTCTrackEvent.prototype&&!("transceiver"in n.RTCTrackEvent.prototype)&&Object.defineProperty(n.RTCTrackEvent.prototype,"transceiver",{get(){return{receiver:this.receiver}}})}function Wu(n){let t=n.RTCPeerConnection.prototype.createOffer;n.RTCPeerConnection.prototype.createOffer=function(i){if(i){typeof i.offerToReceiveAudio<"u"&&(i.offerToReceiveAudio=!!i.offerToReceiveAudio);let s=this.getTransceivers().find(a=>a.receiver.track.kind==="audio");i.offerToReceiveAudio===!1&&s?s.direction==="sendrecv"?s.setDirection?s.setDirection("sendonly"):s.direction="sendonly":s.direction==="recvonly"&&(s.setDirection?s.setDirection("inactive"):s.direction="inactive"):i.offerToReceiveAudio===!0&&!s&&this.addTransceiver("audio",{direction:"recvonly"}),typeof i.offerToReceiveVideo<"u"&&(i.offerToReceiveVideo=!!i.offerToReceiveVideo);let r=this.getTransceivers().find(a=>a.receiver.track.kind==="video");i.offerToReceiveVideo===!1&&r?r.direction==="sendrecv"?r.setDirection?r.setDirection("sendonly"):r.direction="sendonly":r.direction==="recvonly"&&(r.setDirection?r.setDirection("inactive"):r.direction="inactive"):i.offerToReceiveVideo===!0&&!r&&this.addTransceiver("video",{direction:"recvonly"})}return t.apply(this,arguments)}}function Xu(n){typeof n!="object"||n.AudioContext||(n.AudioContext=n.webkitAudioContext)}var $u={};Va($u,{removeExtmapAllowMixed:()=>bl,shimAddIceCandidateNullOrEmpty:()=>Pa,shimConnectionState:()=>Ml,shimMaxMessageSize:()=>Ca,shimParameterlessSetLocalDescription:()=>Ia,shimRTCIceCandidate:()=>Aa,shimRTCIceCandidateRelayProtocol:()=>Sl,shimSendThrowTypeError:()=>Ra});var ur=bd(Yu());function Aa(n){if(!n.RTCIceCandidate||n.RTCIceCandidate&&"foundation"in n.RTCIceCandidate.prototype)return;let t=n.RTCIceCandidate;n.RTCIceCandidate=function(i){if(typeof i=="object"&&i.candidate&&i.candidate.indexOf("a=")===0&&(i=JSON.parse(JSON.stringify(i)),i.candidate=i.candidate.substring(2)),i.candidate&&i.candidate.length){let s=new t(i),r=ur.default.parseCandidate(i.candidate);for(let a in r)a in s||Object.defineProperty(s,a,{value:r[a]});return s.toJSON=function(){return{candidate:s.candidate,sdpMid:s.sdpMid,sdpMLineIndex:s.sdpMLineIndex,usernameFragment:s.usernameFragment}},s}return new t(i)},n.RTCIceCandidate.prototype=t.prototype,Qi(n,"icecandidate",e=>(e.candidate&&Object.defineProperty(e,"candidate",{value:new n.RTCIceCandidate(e.candidate),writable:"false"}),e))}function Sl(n){!n.RTCIceCandidate||n.RTCIceCandidate&&"relayProtocol"in n.RTCIceCandidate.prototype||Qi(n,"icecandidate",t=>{if(t.candidate){let e=ur.default.parseCandidate(t.candidate.candidate);e.type==="relay"&&(t.candidate.relayProtocol={0:"tls",1:"tcp",2:"udp"}[e.priority>>24])}return t})}function Ca(n,t){if(!n.RTCPeerConnection||t.browser==="chrome"&&t.version>102||t.browser==="firefox"&&t.version>=113)return;"sctp"in n.RTCPeerConnection.prototype||Object.defineProperty(n.RTCPeerConnection.prototype,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp}});let e=function(o){if(!o||!o.sdp)return!1;let c=ur.default.splitSections(o.sdp);return c.shift(),c.some(l=>{let h=ur.default.parseMLine(l);return h&&h.kind==="application"&&h.protocol.indexOf("SCTP")!==-1})},i=function(o){let c=o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(c===null||c.length<2)return-1;let l=parseInt(c[1],10);return l!==l?-1:l},s=function(o){let c=65536;return t.browser==="firefox"&&(t.version<57?o===-1?c=16384:c=2147483637:t.version<60?c=t.version===57?65535:65536:c=2147483637),c},r=function(o,c){let l=65536;t.browser==="firefox"&&t.version===57&&(l=65535);let h=ur.default.matchPrefix(o.sdp,"a=max-message-size:");return h.length>0?l=parseInt(h[0].substring(19),10):t.browser==="firefox"&&c!==-1&&(l=2147483637),l},a=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,t.browser==="chrome"&&t.version>=76){let{sdpSemantics:c}=this.getConfiguration();c==="plan-b"&&Object.defineProperty(this,"sctp",{get(){return typeof this._sctp>"u"?null:this._sctp},enumerable:!0,configurable:!0})}if(e(arguments[0])){let c=i(arguments[0]),l=s(c),h=r(arguments[0],c),d;l===0&&h===0?d=Number.POSITIVE_INFINITY:l===0||h===0?d=Math.max(l,h):d=Math.min(l,h);let f={};Object.defineProperty(f,"maxMessageSize",{get(){return d}}),this._sctp=f}return a.apply(this,arguments)}}function Ra(n,t){if(!(n.RTCPeerConnection&&"createDataChannel"in n.RTCPeerConnection.prototype)||t.browser==="chrome"&&t.version>=149||t.browser==="firefox"&&t.version>60)return;function e(s,r){let a=s.send;s.send=function(){let c=arguments[0],l=c.length||c.size||c.byteLength;if(s.readyState==="open"&&r.sctp&&l>r.sctp.maxMessageSize)throw new TypeError("Message too large (can send a maximum of "+r.sctp.maxMessageSize+" bytes)");return a.apply(s,arguments)}}let i=n.RTCPeerConnection.prototype.createDataChannel;n.RTCPeerConnection.prototype.createDataChannel=function(){let r=i.apply(this,arguments);return e(r,this),r},Qi(n,"datachannel",s=>(e(s.channel,s.target),s))}function Ml(n){if(!n.RTCPeerConnection||"connectionState"in n.RTCPeerConnection.prototype)return;let t=n.RTCPeerConnection.prototype;Object.defineProperty(t,"connectionState",{get(){return{completed:"connected",checking:"connecting"}[this.iceConnectionState]||this.iceConnectionState},enumerable:!0,configurable:!0}),Object.defineProperty(t,"onconnectionstatechange",{get(){return this._onconnectionstatechange||null},set(e){this._onconnectionstatechange&&(this.removeEventListener("connectionstatechange",this._onconnectionstatechange),delete this._onconnectionstatechange),e&&this.addEventListener("connectionstatechange",this._onconnectionstatechange=e)},enumerable:!0,configurable:!0}),["setLocalDescription","setRemoteDescription"].forEach(e=>{let i=t[e];t[e]=function(){return this._connectionstatechangepoly||(this._connectionstatechangepoly=s=>{let r=s.target;if(r._lastConnectionState!==r.connectionState){r._lastConnectionState=r.connectionState;let a=new Event("connectionstatechange",s);r.dispatchEvent(a)}return s},this.addEventListener("iceconnectionstatechange",this._connectionstatechangepoly)),i.apply(this,arguments)}})}function bl(n,t){if(!n.RTCPeerConnection||t.browser==="chrome"&&t.version>=71||t.browser==="safari"&&t._safariVersion>=13.1)return;let e=n.RTCPeerConnection.prototype.setRemoteDescription;n.RTCPeerConnection.prototype.setRemoteDescription=function(s){if(s&&s.sdp&&s.sdp.indexOf(`
a=extmap-allow-mixed`)!==-1){let r=s.sdp.split(`
`).filter(a=>a.trim()!=="a=extmap-allow-mixed").join(`
`);n.RTCSessionDescription&&s instanceof n.RTCSessionDescription?arguments[0]=new n.RTCSessionDescription({type:s.type,sdp:r}):s.sdp=r}return e.apply(this,arguments)}}function Pa(n,t){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let e=n.RTCPeerConnection.prototype.addIceCandidate;!e||e.length===0||(n.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?(t.browser==="chrome"&&t.version<78||t.browser==="firefox"&&t.version<68||t.browser==="safari")&&arguments[0]&&arguments[0].candidate===""?Promise.resolve():e.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())})}function Ia(n,t){if(!(n.RTCPeerConnection&&n.RTCPeerConnection.prototype))return;let e=n.RTCPeerConnection.prototype.setLocalDescription;!e||e.length===0||(n.RTCPeerConnection.prototype.setLocalDescription=function(){let s=arguments[0]||{};if(typeof s!="object"||s.type&&s.sdp)return e.apply(this,arguments);if(s={type:s.type,sdp:s.sdp},!s.type)switch(this.signalingState){case"stable":case"have-local-offer":case"have-remote-pranswer":s.type="offer";break;default:s.type="answer";break}return s.sdp||s.type!=="offer"&&s.type!=="answer"?e.apply(this,[s]):(s.type==="offer"?this.createOffer:this.createAnswer).apply(this).then(a=>e.apply(this,[a]))})}var Sy=bd(Yu());function Jp({window:n}={},t={shimChrome:!0,shimFirefox:!0,shimSafari:!0}){let e=wa,i=Xp(n),s={browserDetails:i,commonShim:$u,extractVersion:lr,disableLog:Vp,disableWarnings:Wp,sdp:Sy};switch(i.browser){case"chrome":if(!gl||!ml||!t.shimChrome)return e("Chrome shim is not included in this adapter release."),s;if(i.version===null)return e("Chrome shim can not determine version, not shimming."),s;e("adapter.js shimming chrome."),s.browserShim=gl,Pa(n,i),Ia(n,i),pl(n,i),Mu(n,i),ml(n,i),bu(n,i),wu(n,i),Tu(n,i),Eu(n,i),Au(n,i),Aa(n,i),Sl(n,i),Ml(n,i),Ca(n,i),Ra(n,i),bl(n,i);break;case"firefox":if(!vl||!xl||!t.shimFirefox)return e("Firefox shim is not included in this adapter release."),s;e("adapter.js shimming firefox."),s.browserShim=vl,Pa(n,i),Ia(n,i),_l(n,i),xl(n,i),Ru(n,i),Cu(n,i),Lu(n,i),Pu(n,i),Iu(n,i),Du(n,i),Nu(n,i),Uu(n,i),Fu(n,i),ku(n,i),Aa(n,i),Ml(n,i),Ca(n,i),Ra(n,i);break;case"safari":if(!yl||!t.shimSafari)return e("Safari shim is not included in this adapter release."),s;e("adapter.js shimming safari."),s.browserShim=yl,Pa(n,i),Ia(n,i),Gu(n,i),Wu(n,i),zu(n,i),Ou(n,i),Bu(n,i),Vu(n,i),Hu(n,i),Xu(n,i),Aa(n,i),Sl(n,i),Ca(n,i),Ra(n,i),bl(n,i);break;default:e("Unsupported browser!");break}return s}var My=Jp({window:typeof window>"u"?void 0:window}),Zu=My;function gs(n,t,e,i){Object.defineProperty(n,t,{get:e,set:i,enumerable:!0,configurable:!0})}var El=class{constructor(){this.chunkedMTU=16300,this._dataCount=1,this.chunk=t=>{let e=[],i=t.byteLength,s=Math.ceil(i/this.chunkedMTU),r=0,a=0;for(;a<i;){let o=Math.min(i,a+this.chunkedMTU),c=t.slice(a,o),l={__peerData:this._dataCount,n:r,data:c,total:s};e.push(l),a=o,r++}return this._dataCount++,e}}};function by(n){let t=0;for(let s of n)t+=s.byteLength;let e=new Uint8Array(t),i=0;for(let s of n)e.set(s,i),i+=s.byteLength;return e}var Ju=Zu.default||Zu,La=new class{isWebRTCSupported(){return typeof RTCPeerConnection<"u"}isBrowserSupported(){let n=this.getBrowser(),t=this.getVersion();return this.supportedBrowsers.includes(n)?n==="chrome"?t>=this.minChromeVersion:n==="firefox"?t>=this.minFirefoxVersion:n==="safari"?!this.isIOS&&t>=this.minSafariVersion:!1:!1}getBrowser(){return Ju.browserDetails.browser}getVersion(){return Ju.browserDetails.version||0}isUnifiedPlanSupported(){let n=this.getBrowser(),t=Ju.browserDetails.version||0;if(n==="chrome"&&t<this.minChromeVersion)return!1;if(n==="firefox"&&t>=this.minFirefoxVersion)return!0;if(!window.RTCRtpTransceiver||!("currentDirection"in RTCRtpTransceiver.prototype))return!1;let e,i=!1;try{e=new RTCPeerConnection,e.addTransceiver("audio"),i=!0}catch{}finally{e&&e.close()}return i}toString(){return`Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`}constructor(){this.isIOS=typeof navigator<"u"?["iPad","iPhone","iPod"].includes(navigator.platform):!1,this.supportedBrowsers=["firefox","chrome","safari"],this.minFirefoxVersion=59,this.minChromeVersion=72,this.minSafariVersion=605}},Ty=n=>!n||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(n),jp=()=>Math.random().toString(36).slice(2),Kp={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}],sdpSemantics:"unified-plan"},Ku=class extends El{noop(){}blobToArrayBuffer(t,e){let i=new FileReader;return i.onload=function(s){s.target&&e(s.target.result)},i.readAsArrayBuffer(t),i}binaryStringToArrayBuffer(t){let e=new Uint8Array(t.length);for(let i=0;i<t.length;i++)e[i]=t.charCodeAt(i)&255;return e.buffer}isSecure(){return location.protocol==="https:"}constructor(...t){super(...t),this.CLOUD_HOST="0.peerjs.com",this.CLOUD_PORT=443,this.chunkedBrowsers={Chrome:1,chrome:1},this.defaultConfig=Kp,this.browser=La.getBrowser(),this.browserVersion=La.getVersion(),this.pack=xu,this.unpack=_u,this.supports=(function(){let e={browser:La.isBrowserSupported(),webRTC:La.isWebRTCSupported(),audioVideo:!1,data:!1,binaryBlob:!1,reliable:!1};if(!e.webRTC)return e;let i;try{i=new RTCPeerConnection(Kp),e.audioVideo=!0;let s;try{s=i.createDataChannel("_PEERJSTEST",{ordered:!0}),e.data=!0,e.reliable=!!s.ordered;try{s.binaryType="blob",e.binaryBlob=!La.isIOS}catch{}}catch{}finally{s&&s.close()}}catch{}finally{i&&i.close()}return e})(),this.validateId=Ty,this.randomToken=jp}},Ti=new Ku,Ey="PeerJS: ";var ju=class{get logLevel(){return this._logLevel}set logLevel(t){this._logLevel=t}log(...t){this._logLevel>=3&&this._print(3,...t)}warn(...t){this._logLevel>=2&&this._print(2,...t)}error(...t){this._logLevel>=1&&this._print(1,...t)}setLogFunction(t){this._print=t}_print(t,...e){let i=[Ey,...e];for(let s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);t>=3?console.log(...i):t>=2?console.warn("WARNING",...i):t>=1&&console.error("ERROR",...i)}constructor(){this._logLevel=0}},Pt=new ju,ld={},wy=Object.prototype.hasOwnProperty,Mi="~";function Fa(){}Object.create&&(Fa.prototype=Object.create(null),new Fa().__proto__||(Mi=!1));function Ay(n,t,e){this.fn=n,this.context=t,this.once=e||!1}function Qp(n,t,e,i,s){if(typeof e!="function")throw new TypeError("The listener must be a function");var r=new Ay(e,i||n,s),a=Mi?Mi+t:t;return n._events[a]?n._events[a].fn?n._events[a]=[n._events[a],r]:n._events[a].push(r):(n._events[a]=r,n._eventsCount++),n}function Tl(n,t){--n._eventsCount===0?n._events=new Fa:delete n._events[t]}function mi(){this._events=new Fa,this._eventsCount=0}mi.prototype.eventNames=function(){var t=[],e,i;if(this._eventsCount===0)return t;for(i in e=this._events)wy.call(e,i)&&t.push(Mi?i.slice(1):i);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t};mi.prototype.listeners=function(t){var e=Mi?Mi+t:t,i=this._events[e];if(!i)return[];if(i.fn)return[i.fn];for(var s=0,r=i.length,a=new Array(r);s<r;s++)a[s]=i[s].fn;return a};mi.prototype.listenerCount=function(t){var e=Mi?Mi+t:t,i=this._events[e];return i?i.fn?1:i.length:0};mi.prototype.emit=function(t,e,i,s,r,a){var o=Mi?Mi+t:t;if(!this._events[o])return!1;var c=this._events[o],l=arguments.length,h,d;if(c.fn){switch(c.once&&this.removeListener(t,c.fn,void 0,!0),l){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,e),!0;case 3:return c.fn.call(c.context,e,i),!0;case 4:return c.fn.call(c.context,e,i,s),!0;case 5:return c.fn.call(c.context,e,i,s,r),!0;case 6:return c.fn.call(c.context,e,i,s,r,a),!0}for(d=1,h=new Array(l-1);d<l;d++)h[d-1]=arguments[d];c.fn.apply(c.context,h)}else{var f=c.length,u;for(d=0;d<f;d++)switch(c[d].once&&this.removeListener(t,c[d].fn,void 0,!0),l){case 1:c[d].fn.call(c[d].context);break;case 2:c[d].fn.call(c[d].context,e);break;case 3:c[d].fn.call(c[d].context,e,i);break;case 4:c[d].fn.call(c[d].context,e,i,s);break;default:if(!h)for(u=1,h=new Array(l-1);u<l;u++)h[u-1]=arguments[u];c[d].fn.apply(c[d].context,h)}}return!0};mi.prototype.on=function(t,e,i){return Qp(this,t,e,i,!1)};mi.prototype.once=function(t,e,i){return Qp(this,t,e,i,!0)};mi.prototype.removeListener=function(t,e,i,s){var r=Mi?Mi+t:t;if(!this._events[r])return this;if(!e)return Tl(this,r),this;var a=this._events[r];if(a.fn)a.fn===e&&(!s||a.once)&&(!i||a.context===i)&&Tl(this,r);else{for(var o=0,c=[],l=a.length;o<l;o++)(a[o].fn!==e||s&&!a[o].once||i&&a[o].context!==i)&&c.push(a[o]);c.length?this._events[r]=c.length===1?c[0]:c:Tl(this,r)}return this};mi.prototype.removeAllListeners=function(t){var e;return t?(e=Mi?Mi+t:t,this._events[e]&&Tl(this,e)):(this._events=new Fa,this._eventsCount=0),this};mi.prototype.off=mi.prototype.removeListener;mi.prototype.addListener=mi.prototype.on;mi.prefixed=Mi;mi.EventEmitter=mi;ld=mi;var _s={};gs(_s,"ConnectionType",()=>Gn);gs(_s,"PeerErrorType",()=>We);gs(_s,"BaseConnectionErrorType",()=>Qu);gs(_s,"DataConnectionErrorType",()=>hd);gs(_s,"SerializationType",()=>Il);gs(_s,"SocketEventType",()=>Hn);gs(_s,"ServerMessageType",()=>pi);var Gn=(function(n){return n.Data="data",n.Media="media",n})({}),We=(function(n){return n.BrowserIncompatible="browser-incompatible",n.Disconnected="disconnected",n.InvalidID="invalid-id",n.InvalidKey="invalid-key",n.Network="network",n.PeerUnavailable="peer-unavailable",n.SslUnavailable="ssl-unavailable",n.ServerError="server-error",n.SocketError="socket-error",n.SocketClosed="socket-closed",n.UnavailableID="unavailable-id",n.WebRTC="webrtc",n})({}),Qu=(function(n){return n.NegotiationFailed="negotiation-failed",n.ConnectionClosed="connection-closed",n})({}),hd=(function(n){return n.NotOpenYet="not-open-yet",n.MessageToBig="message-too-big",n})({}),Il=(function(n){return n.Binary="binary",n.BinaryUTF8="binary-utf8",n.JSON="json",n.None="raw",n})({}),Hn=(function(n){return n.Message="message",n.Disconnected="disconnected",n.Error="error",n.Close="close",n})({}),pi=(function(n){return n.Heartbeat="HEARTBEAT",n.Candidate="CANDIDATE",n.Offer="OFFER",n.Answer="ANSWER",n.Open="OPEN",n.Error="ERROR",n.IdTaken="ID-TAKEN",n.InvalidKey="INVALID-KEY",n.Leave="LEAVE",n.Expire="EXPIRE",n})({}),tm="1.5.5",td=class extends ld.EventEmitter{constructor(t,e,i,s,r,a=5e3){super(),this.pingInterval=a,this._disconnected=!0,this._messagesQueue=[];let o=t?"wss://":"ws://";this._baseUrl=o+e+":"+i+s+"peerjs?key="+r}start(t,e){this._id=t;let i=`${this._baseUrl}&id=${t}&token=${e}`;this._socket||!this._disconnected||(this._socket=new WebSocket(i+"&version="+tm),this._disconnected=!1,this._socket.onmessage=s=>{let r;try{r=JSON.parse(s.data),Pt.log("Server message received:",r)}catch{Pt.log("Invalid server message",s.data);return}this.emit(Hn.Message,r)},this._socket.onclose=s=>{this._disconnected||(Pt.log("Socket closed.",s),this._cleanup(),this._disconnected=!0,this.emit(Hn.Disconnected))},this._socket.onopen=()=>{this._disconnected||(this._sendQueuedMessages(),Pt.log("Socket open"),this._scheduleHeartbeat())})}_scheduleHeartbeat(){this._wsPingTimer=setTimeout(()=>{this._sendHeartbeat()},this.pingInterval)}_sendHeartbeat(){if(!this._wsOpen()){Pt.log("Cannot send heartbeat, because socket closed");return}let t=JSON.stringify({type:pi.Heartbeat});this._socket.send(t),this._scheduleHeartbeat()}_wsOpen(){return!!this._socket&&this._socket.readyState===1}_sendQueuedMessages(){let t=[...this._messagesQueue];this._messagesQueue=[];for(let e of t)this.send(e)}send(t){if(this._disconnected)return;if(!this._id){this._messagesQueue.push(t);return}if(!t.type){this.emit(Hn.Error,"Invalid message");return}if(!this._wsOpen())return;let e=JSON.stringify(t);this._socket.send(e)}close(){this._disconnected||(this._cleanup(),this._disconnected=!0)}_cleanup(){this._socket&&(this._socket.onopen=this._socket.onmessage=this._socket.onclose=null,this._socket.close(),this._socket=void 0),clearTimeout(this._wsPingTimer)}},wl=class{constructor(t){this.connection=t}startConnection(t){let e=this._startPeerConnection();if(this.connection.peerConnection=e,this.connection.type===Gn.Media&&t._stream&&this._addTracksToConnection(t._stream,e),t.originator){let i=this.connection,s={ordered:!!t.reliable},r=e.createDataChannel(i.label,s);i._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",t.sdp)}_startPeerConnection(){Pt.log("Creating RTCPeerConnection.");let t=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(t),t}_setupListeners(t){let e=this.connection.peer,i=this.connection.connectionId,s=this.connection.type,r=this.connection.provider;Pt.log("Listening for ICE candidates."),t.onicecandidate=a=>{!a.candidate||!a.candidate.candidate||(Pt.log(`Received ICE candidates for ${e}:`,a.candidate),r.socket.send({type:pi.Candidate,payload:{candidate:a.candidate,type:s,connectionId:i},dst:e}))},t.oniceconnectionstatechange=()=>{switch(t.iceConnectionState){case"failed":Pt.log("iceConnectionState is failed, closing connections to "+e),this.connection.emitError(Qu.NegotiationFailed,"Negotiation of connection to "+e+" failed."),this.connection.close();break;case"closed":Pt.log("iceConnectionState is closed, closing connections to "+e),this.connection.emitError(Qu.ConnectionClosed,"Connection to "+e+" closed."),this.connection.close();break;case"disconnected":Pt.log("iceConnectionState changed to disconnected on the connection with "+e);break;case"completed":t.onicecandidate=()=>{};break}this.connection.emit("iceStateChanged",t.iceConnectionState)},Pt.log("Listening for data channel"),t.ondatachannel=a=>{Pt.log("Received data channel");let o=a.channel;r.getConnection(e,i)._initializeDataChannel(o)},Pt.log("Listening for remote stream"),t.ontrack=a=>{Pt.log("Received remote stream");let o=a.streams[0],c=r.getConnection(e,i);if(c.type===Gn.Media){let l=c;this._addStreamToMediaConnection(o,l)}}}cleanup(){Pt.log("Cleaning up PeerConnection to "+this.connection.peer);let t=this.connection.peerConnection;if(!t)return;this.connection.peerConnection=null,t.onicecandidate=t.oniceconnectionstatechange=t.ondatachannel=t.ontrack=()=>{};let e=t.signalingState!=="closed",i=!1,s=this.connection.dataChannel;s&&(i=!!s.readyState&&s.readyState!=="closed"),(e||i)&&t.close()}async _makeOffer(){let t=this.connection.peerConnection,e=this.connection.provider;try{let i=await t.createOffer(this.connection.options.constraints);Pt.log("Created offer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await t.setLocalDescription(i),Pt.log("Set localDescription:",i,`for:${this.connection.peer}`);let s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===Gn.Data){let r=this.connection;s={...s,label:r.label,reliable:r.reliable,serialization:r.serialization}}e.socket.send({type:pi.Offer,payload:s,dst:this.connection.peer})}catch(s){s!="OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"&&(e.emitError(We.WebRTC,s),Pt.log("Failed to setLocalDescription, ",s))}}catch(i){e.emitError(We.WebRTC,i),Pt.log("Failed to createOffer, ",i)}}async _makeAnswer(){let t=this.connection.peerConnection,e=this.connection.provider;try{let i=await t.createAnswer();Pt.log("Created answer."),this.connection.options.sdpTransform&&typeof this.connection.options.sdpTransform=="function"&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp);try{await t.setLocalDescription(i),Pt.log("Set localDescription:",i,`for:${this.connection.peer}`),e.socket.send({type:pi.Answer,payload:{sdp:i,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(s){e.emitError(We.WebRTC,s),Pt.log("Failed to setLocalDescription, ",s)}}catch(i){e.emitError(We.WebRTC,i),Pt.log("Failed to create answer, ",i)}}async handleSDP(t,e){e=new RTCSessionDescription(e);let i=this.connection.peerConnection,s=this.connection.provider;Pt.log("Setting remote description",e);let r=this;try{await i.setRemoteDescription(e),Pt.log(`Set remoteDescription:${t} for:${this.connection.peer}`),t==="OFFER"&&await r._makeAnswer()}catch(a){s.emitError(We.WebRTC,a),Pt.log("Failed to setRemoteDescription, ",a)}}async handleCandidate(t){Pt.log("handleCandidate:",t);try{await this.connection.peerConnection.addIceCandidate(t),Pt.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){this.connection.provider.emitError(We.WebRTC,e),Pt.log("Failed to handleCandidate, ",e)}}_addTracksToConnection(t,e){if(Pt.log(`add tracks from stream ${t.id} to peer connection`),!e.addTrack)return Pt.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");t.getTracks().forEach(i=>{e.addTrack(i,t)})}_addStreamToMediaConnection(t,e){Pt.log(`add stream ${t.id} to media connection ${e.connectionId}`),e.addStream(t)}},Al=class extends ld.EventEmitter{emitError(t,e){Pt.error("Error:",e),this.emit("error",new ed(`${t}`,e))}},ed=class extends Error{constructor(t,e){typeof e=="string"?super(e):(super(),Object.assign(this,e)),this.type=t}},Cl=class extends Al{get open(){return this._open}constructor(t,e,i){super(),this.peer=t,this.provider=e,this.options=i,this._open=!1,this.metadata=i.metadata}},rd,Na=class Na extends Cl{get type(){return Gn.Media}get localStream(){return this._localStream}get remoteStream(){return this._remoteStream}constructor(t,e,i){super(t,e,i),this._localStream=this.options._stream,this.connectionId=this.options.connectionId||Na.ID_PREFIX+Ti.randomToken(),this._negotiator=new wl(this),this._localStream&&this._negotiator.startConnection({_stream:this._localStream,originator:!0})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{Pt.log(`DC#${this.connectionId} dc connection success`),this.emit("willCloseOnRemote")},this.dataChannel.onclose=()=>{Pt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}addStream(t){Pt.log("Receiving stream",t),this._remoteStream=t,super.emit("stream",t)}handleMessage(t){let e=t.type,i=t.payload;switch(t.type){case pi.Answer:this._negotiator.handleSDP(e,i.sdp),this._open=!0;break;case pi.Candidate:this._negotiator.handleCandidate(i.candidate);break;default:Pt.warn(`Unrecognized message type:${e} from peer:${this.peer}`);break}}answer(t,e={}){if(this._localStream){Pt.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");return}this._localStream=t,e&&e.sdpTransform&&(this.options.sdpTransform=e.sdpTransform),this._negotiator.startConnection({...this.options._payload,_stream:t});let i=this.provider._getMessages(this.connectionId);for(let s of i)this.handleMessage(s);this._open=!0}close(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,super.emit("close"))}};rd=new WeakMap,fr(Na,rd,Na.ID_PREFIX="mc_");var Rl=Na,id=class{constructor(t){this._options=t}_buildRequest(t){let e=this._options.secure?"https":"http",{host:i,port:s,path:r,key:a}=this._options,o=new URL(`${e}://${i}:${s}${r}${a}/${t}`);return o.searchParams.set("ts",`${Date.now()}${Math.random()}`),o.searchParams.set("version",tm),fetch(o.href,{referrerPolicy:this._options.referrerPolicy})}async retrieveId(){try{let t=await this._buildRequest("id");if(t.status!==200)throw new Error(`Error. Status:${t.status}`);return t.text()}catch(t){Pt.error("Error retrieving ID",t);let e="";throw this._options.path==="/"&&this._options.host!==Ti.CLOUD_HOST&&(e=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+e)}}async listAllPeers(){try{let t=await this._buildRequest("peers");if(t.status!==200){if(t.status===401){let e="";throw this._options.host===Ti.CLOUD_HOST?e="It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":e="You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+e)}throw new Error(`Error. Status:${t.status}`)}return t.json()}catch(t){throw Pt.error("Error retrieving list peers",t),new Error("Could not get list peers from the server."+t)}}},ad,od,ms=class ms extends Cl{get type(){return Gn.Data}constructor(t,e,i){super(t,e,i),this.connectionId=this.options.connectionId||ms.ID_PREFIX+jp(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new wl(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}_initializeDataChannel(t){this.dataChannel=t,this.dataChannel.onopen=()=>{Pt.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{Pt.log(`DC#${this.connectionId} dc onmessage:`,e.data)},this.dataChannel.onclose=()=>{Pt.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}close(t){if(t?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}send(t,e=!1){if(!this.open){this.emitError(hd.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(t,e)}async handleMessage(t){let e=t.payload;switch(t.type){case pi.Answer:await this._negotiator.handleSDP(t.type,e.sdp);break;case pi.Candidate:await this._negotiator.handleCandidate(e.candidate);break;default:Pt.warn("Unrecognized message type:",t.type,"from peer:",this.peer);break}}};ad=new WeakMap,od=new WeakMap,fr(ms,ad,ms.ID_PREFIX="dc_"),fr(ms,od,ms.MAX_BUFFERED_AMOUNT=8388608);var Pl=ms,ka=class extends Pl{get bufferSize(){return this._bufferSize}_initializeDataChannel(t){super._initializeDataChannel(t),this.dataChannel.binaryType="arraybuffer",this.dataChannel.addEventListener("message",e=>this._handleDataMessage(e))}_bufferedSend(t){(this._buffering||!this._trySend(t))&&(this._buffer.push(t),this._bufferSize=this._buffer.length)}_trySend(t){if(!this.open)return!1;if(this.dataChannel.bufferedAmount>Pl.MAX_BUFFERED_AMOUNT)return this._buffering=!0,setTimeout(()=>{this._buffering=!1,this._tryBuffer()},50),!1;try{this.dataChannel.send(t)}catch(e){return Pt.error(`DC#:${this.connectionId} Error when sending:`,e),this._buffering=!0,this.close(),!1}return!0}_tryBuffer(){if(!this.open||this._buffer.length===0)return;let t=this._buffer[0];this._trySend(t)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer())}close(t){if(t?.flush){this.send({__peerData:{type:"close"}});return}this._buffer=[],this._bufferSize=0,super.close()}constructor(...t){super(...t),this._buffer=[],this._bufferSize=0,this._buffering=!1}},Da=class extends ka{close(t){super.close(t),this._chunkedData={}}constructor(t,e,i){super(t,e,i),this.chunker=new El,this.serialization=Il.Binary,this._chunkedData={}}_handleDataMessage({data:t}){let e=_u(t),i=e.__peerData;if(i){if(i.type==="close"){this.close();return}this._handleChunk(e);return}this.emit("data",e)}_handleChunk(t){let e=t.__peerData,i=this._chunkedData[e]||{data:[],count:0,total:t.total};if(i.data[t.n]=new Uint8Array(t.data),i.count++,this._chunkedData[e]=i,i.total===i.count){delete this._chunkedData[e];let s=by(i.data);this._handleDataMessage({data:s})}}_send(t,e){let i=xu(t);if(i instanceof Promise)return this._send_blob(i);if(!e&&i.byteLength>this.chunker.chunkedMTU){this._sendChunks(i);return}this._bufferedSend(i)}async _send_blob(t){let e=await t;if(e.byteLength>this.chunker.chunkedMTU){this._sendChunks(e);return}this._bufferedSend(e)}_sendChunks(t){let e=this.chunker.chunk(t);Pt.log(`DC#${this.connectionId} Try to send ${e.length} chunks...`);for(let i of e)this.send(i,!0)}},nd=class extends ka{_handleDataMessage({data:t}){super.emit("data",t)}_send(t,e){this._bufferedSend(t)}constructor(...t){super(...t),this.serialization=Il.None}},sd=class extends ka{_handleDataMessage({data:t}){let e=this.parse(this.decoder.decode(t)),i=e.__peerData;if(i&&i.type==="close"){this.close();return}this.emit("data",e)}_send(t,e){let i=this.encoder.encode(this.stringify(t));if(i.byteLength>=Ti.chunkedMTU){this.emitError(hd.MessageToBig,"Message too big for JSON channel");return}this._bufferedSend(i)}constructor(...t){super(...t),this.serialization=Il.JSON,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.stringify=JSON.stringify,this.parse=JSON.parse}};var cd,Ua=class Ua extends Al{get id(){return this._id}get options(){return this._options}get open(){return this._open}get socket(){return this._socket}get connections(){let t=Object.create(null);for(let[e,i]of this._connections)t[e]=i;return t}get destroyed(){return this._destroyed}get disconnected(){return this._disconnected}constructor(t,e){super(),this._serializers={raw:nd,json:sd,binary:Da,"binary-utf8":Da,default:Da},this._id=null,this._lastServerId=null,this._destroyed=!1,this._disconnected=!1,this._open=!1,this._connections=new Map,this._lostMessages=new Map;let i;if(t&&t.constructor==Object?e=t:t&&(i=t.toString()),e={debug:0,host:Ti.CLOUD_HOST,port:Ti.CLOUD_PORT,path:"/",key:Ua.DEFAULT_KEY,token:Ti.randomToken(),config:Ti.defaultConfig,referrerPolicy:"strict-origin-when-cross-origin",serializers:{},...e},this._options=e,this._serializers={...this._serializers,...this.options.serializers},this._options.host==="/"&&(this._options.host=window.location.hostname),this._options.path&&(this._options.path[0]!=="/"&&(this._options.path="/"+this._options.path),this._options.path[this._options.path.length-1]!=="/"&&(this._options.path+="/")),this._options.secure===void 0&&this._options.host!==Ti.CLOUD_HOST?this._options.secure=Ti.isSecure():this._options.host==Ti.CLOUD_HOST&&(this._options.secure=!0),this._options.logFunction&&Pt.setLogFunction(this._options.logFunction),Pt.logLevel=this._options.debug||0,this._api=new id(e),this._socket=this._createServerConnection(),!Ti.supports.audioVideo&&!Ti.supports.data){this._delayedAbort(We.BrowserIncompatible,"The current browser does not support WebRTC");return}if(i&&!Ti.validateId(i)){this._delayedAbort(We.InvalidID,`ID "${i}" is invalid`);return}i?this._initialize(i):this._api.retrieveId().then(s=>this._initialize(s)).catch(s=>this._abort(We.ServerError,s))}_createServerConnection(){let t=new td(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval);return t.on(Hn.Message,e=>{this._handleMessage(e)}),t.on(Hn.Error,e=>{this._abort(We.SocketError,e)}),t.on(Hn.Disconnected,()=>{this.disconnected||(this.emitError(We.Network,"Lost connection to server."),this.disconnect())}),t.on(Hn.Close,()=>{this.disconnected||this._abort(We.SocketClosed,"Underlying socket is already closed.")}),t}_initialize(t){this._id=t,this.socket.start(t,this._options.token)}_handleMessage(t){let e=t.type,i=t.payload,s=t.src;switch(e){case pi.Open:this._lastServerId=this.id,this._open=!0,this.emit("open",this.id);break;case pi.Error:this._abort(We.ServerError,i.msg);break;case pi.IdTaken:this._abort(We.UnavailableID,`ID "${this.id}" is taken`);break;case pi.InvalidKey:this._abort(We.InvalidKey,`API KEY "${this._options.key}" is invalid`);break;case pi.Leave:Pt.log(`Received leave message from ${s}`),this._cleanupPeer(s),this._connections.delete(s);break;case pi.Expire:this.emitError(We.PeerUnavailable,`Could not connect to peer ${s}`);break;case pi.Offer:{let r=i.connectionId,a=this.getConnection(s,r);if(a&&(a.close(),Pt.warn(`Offer received for existing Connection ID:${r}`)),i.type===Gn.Media){let c=new Rl(s,this,{connectionId:r,_payload:i,metadata:i.metadata});a=c,this._addConnection(s,a),this.emit("call",c)}else if(i.type===Gn.Data){let c=new this._serializers[i.serialization](s,this,{connectionId:r,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable});a=c,this._addConnection(s,a),this.emit("connection",c)}else{Pt.warn(`Received malformed connection type:${i.type}`);return}let o=this._getMessages(r);for(let c of o)a.handleMessage(c);break}default:{if(!i){Pt.warn(`You received a malformed message from ${s} of type ${e}`);return}let r=i.connectionId,a=this.getConnection(s,r);a&&a.peerConnection?a.handleMessage(t):r?this._storeMessage(r,t):Pt.warn("You received an unrecognized message:",t);break}}}_storeMessage(t,e){this._lostMessages.has(t)||this._lostMessages.set(t,[]),this._lostMessages.get(t).push(e)}_getMessages(t){let e=this._lostMessages.get(t);return e?(this._lostMessages.delete(t),e):[]}connect(t,e={}){if(e={serialization:"default",...e},this.disconnected){Pt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),this.emitError(We.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}let i=new this._serializers[e.serialization](t,this,e);return this._addConnection(t,i),i}call(t,e,i={}){if(this.disconnected){Pt.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),this.emitError(We.Disconnected,"Cannot connect to new Peer after disconnecting from server.");return}if(!e){Pt.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");return}let s=new Rl(t,this,{...i,_stream:e});return this._addConnection(t,s),s}_addConnection(t,e){Pt.log(`add connection ${e.type}:${e.connectionId} to peerId:${t}`),this._connections.has(t)||this._connections.set(t,[]),this._connections.get(t).push(e)}_removeConnection(t){let e=this._connections.get(t.peer);if(e){let i=e.indexOf(t);i!==-1&&e.splice(i,1)}this._lostMessages.delete(t.connectionId)}getConnection(t,e){let i=this._connections.get(t);if(!i)return null;for(let s of i)if(s.connectionId===e)return s;return null}_delayedAbort(t,e){setTimeout(()=>{this._abort(t,e)},0)}_abort(t,e){Pt.error("Aborting!"),this.emitError(t,e),this._lastServerId?this.disconnect():this.destroy()}destroy(){this.destroyed||(Pt.log(`Destroy peer with ID:${this.id}`),this.disconnect(),this._cleanup(),this._destroyed=!0,this.emit("close"))}_cleanup(){for(let t of this._connections.keys())this._cleanupPeer(t),this._connections.delete(t);this.socket.removeAllListeners()}_cleanupPeer(t){let e=this._connections.get(t);if(e)for(let i of e)i.close()}disconnect(){if(this.disconnected)return;let t=this.id;Pt.log(`Disconnect peer with ID:${t}`),this._disconnected=!0,this._open=!1,this.socket.close(),this._lastServerId=t,this._id=null,this.emit("disconnected",t)}reconnect(){if(this.disconnected&&!this.destroyed)Pt.log(`Attempting reconnection to server with ID ${this._lastServerId}`),this._disconnected=!1,this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(!this.disconnected&&!this.open)Pt.error("In a hurry? We're still trying to make the initial connection!");else throw new Error(`Peer ${this.id} cannot reconnect because it is not disconnected from the server!`)}}listAllPeers(t=e=>{}){this._api.listAllPeers().then(e=>t(e)).catch(e=>this._abort(We.ServerError,e))}};cd=new WeakMap,fr(Ua,cd,Ua.DEFAULT_KEY="peerjs");var Oa=Ua;var em="ashhorn-v1-",im="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",Cy=()=>Array.from({length:5},()=>im[Math.random()*im.length|0]).join("");function nm(){let n=new URLSearchParams(location.search);return n.get("peerhost")?{host:n.get("peerhost"),port:+(n.get("peerport")||9e3),path:"/",secure:!1,debug:1}:{debug:1}}var Ll=class{constructor(t){this.h=t,this.peer=null,this.isHost=!1,this.code="",this.conns=new Map,this.hostConn=null,this.nextId=1}host(t=0){return new Promise((e,i)=>{let s=Cy(),r=new Oa(em+s,nm()),a=!1,o=setTimeout(()=>{a||(a=!0,r.destroy(),i(new Error("\u63A5\u7D9A\u30B5\u30FC\u30D0\u30FC\u306B\u7E4B\u304C\u308A\u307E\u305B\u3093\u3067\u3057\u305F")))},15e3);r.on("open",()=>{a||(a=!0,clearTimeout(o),this.peer=r,this.isHost=!0,this.code=s,r.on("connection",c=>this._accept(c)),r.on("disconnected",()=>{try{r.reconnect()}catch{}}),e(s))}),r.on("error",c=>{a||(a=!0,clearTimeout(o),r.destroy(),c.type==="unavailable-id"&&t<4?this.host(t+1).then(e,i):i(new Error("\u90E8\u5C4B\u3092\u4F5C\u308C\u307E\u305B\u3093\u3067\u3057\u305F\uFF08"+(c.type||c.message)+"\uFF09")))})})}_accept(t){t.on("open",()=>{let i=this.nextId++;t._pid=i,t._seen=performance.now(),this.conns.set(i,t),this.h.onJoin(i)}),t.on("data",i=>{t._pid!=null&&(t._seen=performance.now(),this.h.onMessage(t._pid,i))});let e=()=>{t._pid!=null&&this.conns.get(t._pid)===t&&(this.conns.delete(t._pid),this.h.onLeave(t._pid))};t.on("close",e),t.on("error",e)}join(t){return new Promise((e,i)=>{let s=new Oa(nm()),r=!1,a=c=>{r||(r=!0,clearTimeout(o),s.destroy(),i(new Error(c)))},o=setTimeout(()=>a("\u90E8\u5C4B\u306B\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30B3\u30FC\u30C9\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044"),2e4);s.on("open",()=>{let c=s.connect(em+t.toUpperCase(),{reliable:!0,serialization:"json"});c.on("open",()=>{r||(r=!0,clearTimeout(o),this.peer=s,this.isHost=!1,this.code=t.toUpperCase(),this.hostConn=c,this.lastSeen=performance.now(),e())}),c.on("data",h=>{this.lastSeen=performance.now(),this.h.onMessage(0,h)});let l=()=>{this.hostConn===c&&(this.hostConn=null,this.h.onHostLost())};c.on("close",l),c.on("error",l)}),s.on("error",c=>{c.type==="peer-unavailable"?a("\u305D\u306E\u90E8\u5C4B\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F"):a("\u63A5\u7D9A\u30A8\u30E9\u30FC\uFF08"+(c.type||c.message)+"\uFF09")})})}send(t){this.hostConn&&this.hostConn.open&&this.hostConn.send(t)}sendTo(t,e){let i=this.conns.get(t);i&&i.open&&i.send(e)}broadcast(t,e){for(let[i,s]of this.conns)i!==e&&s.open&&s.send(t)}kick(t){let e=this.conns.get(t);if(e){this.conns.delete(t);try{e.close()}catch{}}}checkAlive(){let t=performance.now();if(this.isHost){for(let[e,i]of this.conns)if(t-i._seen>9e3){this.conns.delete(e);try{i.close()}catch{}this.h.onLeave(e)}}else if(this.hostConn&&t-this.lastSeen>9e3){let e=this.hostConn;this.hostConn=null;try{e.close()}catch{}this.h.onHostLost()}}close(){if(this.conns.clear(),this.hostConn=null,this.peer){try{this.peer.destroy()}catch{}this.peer=null}this.isHost=!1,this.code="",this.nextId=1}};var Ry={bite:"\u565B\u307F\u3064\u304D",claw:"\u3072\u3063\u304B\u304D",tailspin:"\u5C3B\u5C3E\u56DE\u8EE2",charge:"\u7A81\u9032",leap:"\u8DF3\u3073\u304B\u304B\u308A",breath:"\u706B\u708E\u30D6\u30EC\u30B9",fireballs:"\u706B\u7403",eruption:"\u5674\u706B",roar:"\u5486\u54EE",crash:"\u89D2\u304C\u523A\u3055\u3063\u305F\uFF01",topple:"\u8EE2\u5012\u4E2D",stunned:"\u6C17\u7D76\u4E2D",skid:"\u9699\u3042\u308A"},Dl=new P,nt=n=>document.getElementById(n),Ba=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Nl=class{constructor(t){this.g=t,this.screens=["sTitle","sLobby","sHow","sSet","sPause","sResult","sMsg"],this.current=null,this.backTo="sTitle",this.bossLag=1,this.flashT=0,this.teamKey="",this._bind()}_bind(){let t=this.g,e=(a,o)=>nt(a).addEventListener("click",()=>{t.audio.init(),t.audio.play("ui"),o()});nt("name").value=yn.get("ashhorn.name","")||"\u72E9\u4EBA"+Math.floor(100+Math.random()*900),nt("name").addEventListener("change",()=>yn.set("ashhorn.name",this.name())),e("bSolo",()=>t.startSolo()),e("bHost",()=>t.hostRoom()),e("bJoin",()=>{let a=nt("joinCode").value.trim().toUpperCase();if(a.length<4)return this.toast("\u90E8\u5C4B\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");t.joinRoom(a)}),nt("joinCode").addEventListener("keydown",a=>{a.key==="Enter"&&nt("bJoin").click()}),e("bHow",()=>this.show("sHow","sTitle")),e("bSet",()=>this.show("sSet","sTitle")),e("bPHow",()=>this.show("sHow","sPause")),e("bPSet",()=>this.show("sSet","sPause"));for(let a of document.querySelectorAll("[data-back]"))a.addEventListener("click",()=>{t.audio.play("ui"),this.show(this.backTo)});e("bCopy",()=>this.copy(t.shareUrl(),"\u62DB\u5F85URL\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")),e("bShare",()=>{navigator.share?navigator.share({title:"\u7070\u89D2 ASHHORN",text:"\u4E00\u7DD2\u306B\u7070\u89D2\u7ADC\u3092\u72E9\u308D\u3046\uFF01",url:t.shareUrl()}).catch(()=>{}):this.copy(t.shareUrl(),"\u62DB\u5F85URL\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")}),e("bStart",()=>t.hostStart()),e("bLeave",()=>t.toTitle()),e("bResume",()=>t.resume()),e("bQuit",()=>t.toTitle()),e("bAgain",()=>t.again()),e("bResQuit",()=>t.toTitle()),e("bResCopy",()=>this.copy(this.resultText||"","\u7D50\u679C\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F")),e("bMsgOk",()=>t.toTitle());let i=(a,o)=>{let c=nt(a),l=h=>{h.stopPropagation(),h.preventDefault(),o()};c.addEventListener("touchstart",l,{passive:!1}),c.addEventListener("click",l)};i("tbPause",()=>t.pause()),i("tbView",()=>t.toggleView()),i("tbLock",()=>{t.input._pressed.lock=!0}),i("tbStamp",()=>nt("stampMenu").classList.toggle("hidden")),el.forEach((a,o)=>{let c=document.createElement("button");c.textContent=a;let l=h=>{h.stopPropagation(),h.preventDefault(),t.sendStamp(o),nt("stampMenu").classList.add("hidden")};c.addEventListener("touchstart",l,{passive:!1}),c.addEventListener("click",l),nt("stampMenu").appendChild(c)});let s=t.settings,r=(a,o,c,l)=>{let h=nt(a),d=nt(a+"V");h.value=s[o],d.textContent=c(s[o]),h.addEventListener("input",()=>{s[o]=+h.value,d.textContent=c(s[o]),l(),t.saveSettings()})};r("oSens","sens",a=>a.toFixed(2),()=>t.applySettings()),r("oVol","vol",a=>Math.round(a*100),()=>t.applySettings()),r("oMus","music",a=>Math.round(a*100),()=>t.applySettings()),nt("oInv").checked=s.invertY,nt("oInv").addEventListener("change",()=>{s.invertY=nt("oInv").checked,t.applySettings(),t.saveSettings()}),nt("oLock").checked=s.autoLock,nt("oLock").addEventListener("change",()=>{s.autoLock=nt("oLock").checked,t.player.lock=s.autoLock?2:0,t.saveSettings()}),nt("oView").value=s.view,nt("oView").addEventListener("change",()=>{s.view=nt("oView").value,t.player.tp=s.view==="tp",t.saveSettings()});for(let a of["wpnTitle","wpnLobby"])for(let o of Ip){let c=document.createElement("button");c.dataset.w=o,c.innerHTML=`${fi[o].name}<small>${fi[o].sub}</small>`,c.addEventListener("click",()=>{t.audio.init(),t.audio.play("ui"),t.setWeapon(o)}),nt(a).appendChild(c)}this.renderWeapons(),nt("oQual").value=s.quality,nt("oQual").addEventListener("change",()=>{s.quality=nt("oQual").value,s.qualityAuto=!1,t.applySettings(!0),t.saveSettings()}),t.input.isTouch&&(nt("keysPc").classList.add("hidden"),nt("keysTouch").classList.remove("hidden"))}renderWeapons(){let t=this.g.settings.weapon;for(let e of document.querySelectorAll(".wpn button"))e.classList.toggle("sel",e.dataset.w===t);for(let e of["wdescTitle","wdescLobby"])nt(e).innerHTML=`${fi[t].desc}<br><b style="color:var(--gold)">\u5965\u7FA9\u300C${fi[t].sp.name}\u300D</b> ${fi[t].sp.desc}`}name(){return(nt("name").value.trim()||"\u72E9\u4EBA").slice(0,10)}show(t,e){e&&(this.backTo=e);for(let i of this.screens)nt(i).classList.toggle("on",i===t);this.current=t,t==="sTitle"&&this.renderRecords(),t==="sSet"&&(nt("oQual").value=this.g.settings.quality,nt("oView").value=this.g.settings.view)}hideMenus(){this.show(null)}fade(t){nt("fade").classList.toggle("on",t)}loaded(){let t=nt("loading");t.style.opacity=0,setTimeout(()=>t.remove(),700)}toast(t,e=2600){let i=nt("toast");i.textContent=t,i.classList.add("on"),clearTimeout(this._tt),this._tt=setTimeout(()=>i.classList.remove("on"),e)}copy(t,e){let i=()=>{let s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select();try{document.execCommand("copy"),this.toast(e)}catch{this.toast("\u30B3\u30D4\u30FC\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F")}s.remove()};navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>this.toast(e),i):i()}message(t,e){nt("msgTitle").textContent=t,nt("msgBody").textContent=e,this.show("sMsg")}renderRecords(){let t=yn.get("ashhorn.records",{}),e=[];for(let i=1;i<=4;i++)t[i]&&e.push(`${i===1?"\u30BD\u30ED":i+"\u4EBA"} <b>${Ma(t[i].t)}</b>\uFF08${t[i].r}\uFF09`);nt("records").innerHTML=e.length?"\u81EA\u5DF1\u30D9\u30B9\u30C8\u3000"+e.join("\u3000"):""}renderLobby(t,e,i,s){nt("code").textContent=i,nt("shareUrl").textContent=this.g.shareUrl();let r="";for(let a=0;a<4;a++){let o=t[a];r+=o?`<div class="slot"><i style="background:${vn[o.id%4]}"></i>${Ba(o.name)}<small style="color:var(--dim);font-weight:500">${(fi[o.w]||fi.great).name}</small>${o.id===0?"<em>\u30DB\u30B9\u30C8</em>":o.id===s?"<em>\u3042\u306A\u305F</em>":""}</div>`:'<div class="slot empty">\u52DF\u96C6\u4E2D\u2026</div>'}nt("slots").innerHTML=r,nt("bStart").classList.toggle("hidden",!e),nt("lobbyNote").textContent=e?"\u4EBA\u6570\u306B\u5FDC\u3058\u3066\u7ADC\u306E\u4F53\u529B\u304C\u5897\u3048\u307E\u3059\u30021\u4EBA\u3067\u3082\u51FA\u767A\u3067\u304D\u307E\u3059\u3002":"\u30DB\u30B9\u30C8\u306E\u51FA\u767A\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u2026"}hud(t){nt("hud").classList.toggle("on",t),nt("touch").classList.toggle("on",t),document.body.classList.toggle("playing",t),t||(nt("boss").classList.remove("on"),nt("deadMsg").classList.remove("on"))}setMe(t,e){nt("meName").textContent=t,nt("meDot").style.background=e}setRoom(t){nt("roomTag").textContent=t?"\u90E8\u5C4B "+t:"\u30BD\u30ED"}updateHud(t,e,i,s,r,a){nt("hp").style.transform=`scaleX(${Dt(e.hp/Oe.hp)})`,nt("hpLag").style.transform=`scaleX(${Dt(e.hpLag/Oe.hp)})`,nt("hp").classList.toggle("low",e.hp<30),nt("st").style.transform=`scaleX(${Dt(e.stamina/Oe.stamina)})`,nt("st").classList.toggle("ex",e.exhausted),nt("low").style.opacity=e.alive&&e.hp<30?(.45+Math.sin(performance.now()/180)*.25)*(1-e.hp/30)+.2:0,nt("potN").textContent=e.potions,nt("sp").style.transform=`scaleX(${Dt(e.sp/100)})`;let o=e.sp>=100;o!==this._spFull&&(this._spFull=o,nt("spBar").classList.toggle("full",o),nt("tbSp").classList.toggle("ready",o),nt("spTag").textContent=o?`\u5965\u7FA9\u300C${e.w.sp.name}\u300D\u767A\u52D5\u53EF`:"");let c=(e.oniT>0?`<span style="border-color:#ff5a3a;color:#ff5a3a">\u9B3C\u4EBA\u5316 ${Math.ceil(e.oniT)}</span>`:"")+(e.buffT>0?`<span>\u898B\u5207\u308A ${Math.ceil(e.buffT)}</span>`:"")+(e.counterT>0?'<span class="c">\u30AB\u30A6\u30F3\u30BF\u30FC\u53EF</span>':"");c!==this._buffs&&(nt("buffs").innerHTML=c,this._buffs=c);let l=nt("ringFg");if(e.state==="charge"){let m=Dt(e.st/e.chargeT[2]),g=e.st>=e.chargeOver;l.style.strokeDashoffset=163.4*(1-m),l.style.stroke=g?"#8a8a8a":e.chargeLv>=3?"#ff3a1a":e.chargeLv>=2?"#ff9a2a":e.chargeLv>=1?"#ffd24a":"#fff",nt("ringBg").setAttribute("opacity",1)}else l.style.strokeDashoffset=163.4,nt("ringBg").setAttribute("opacity",0);let h=Dt(i.hp/i.maxHp);this.bossLag=this.bossLag>h?Math.max(h,this.bossLag-t*.12):h,nt("bossHp").style.transform=`scaleX(${h})`,nt("bossLag").style.transform=`scaleX(${this.bossLag})`,nt("boss").classList.toggle("on",i.active),nt("mHorn").classList.toggle("done",i.hornBroken),nt("mHorn").textContent=i.hornBroken?"\u89D2 \u7834\u58CA":"\u89D2",nt("mTail").classList.toggle("done",i.tailCut),nt("mTail").textContent=i.tailCut?"\u5C3E \u5207\u65AD":"\u5C3E",nt("mRage").classList.toggle("hidden",i.phase<2),nt("mRage").classList.add("rage"),nt("mRage").textContent=i.phase>=3?"\u6FC0\u6602\u30FB\u6975":"\u6FC0\u6602";let d=i.active&&!i.dead&&Ry[i.action]||"";d!==this._an&&(this._an=d,nt("bossAct").textContent=d,nt("bossAct").className=/！|中|隙/.test(d)?"open":"");let f=nt("lockMark");if(e.lock&&i.active&&!i.dead){let m=i.spheres[Ta[e.lock].i];m.on||(m=i.spheres[2]),Dl.copy(m.pos).project(this.g.world.camera),Dl.z<1?(f.style.display="block",f.style.transform=`translate(${((Dl.x*.5+.5)*innerWidth).toFixed(0)}px,${((-Dl.y*.5+.5)*innerHeight).toFixed(0)}px) translate(-50%,-50%) rotate(45deg)`):f.style.display="none"}else f.style.display="none";nt("timer").textContent=Ma(s),nt("carts").innerHTML=`\u6B8B\u308A <b>${"\u25C6".repeat(Math.max(0,r))}${"\u25C7".repeat(Math.max(0,3-r))}</b>`;let u=a.map(m=>m.id+m.name).join("|");u!==this.teamKey&&(this.teamKey=u,nt("team").innerHTML=a.map(m=>`<div id="tm${m.id}"><div class="pname"><i style="background:${m.color}"></i>${Ba(m.name)}</div><div class="bar"><b></b></div></div>`).join(""));for(let m of a){let g=nt("tm"+m.id);g&&(g.classList.toggle("dead",!m.alive),g.querySelector("b").style.transform=`scaleX(${Dt(m.hp/Oe.hp)})`)}let p=nt("arrow"),x=Math.atan2(Math.sin(Math.atan2(i.x-e.x,i.z-e.z)-e.yaw),Math.cos(Math.atan2(i.x-e.x,i.z-e.z)-e.yaw));i.active&&!i.dead&&Math.abs(x)>.95&&e.alive?(p.className=x>0?"l":"r",p.textContent=x>0?"\u25C0":"\u25B6"):p.className="",this.flashT>0&&(this.flashT-=t,nt("flash").style.opacity=Math.max(0,this.flashT/this.flashDur)*this.flashMax),nt("deadMsg").classList.toggle("on",e.state==="dead"),e.state==="dead"&&(nt("deadSub").textContent=this.g.ended?"":e.respawnT>0?`\u30AD\u30E3\u30F3\u30D7\u304B\u3089\u5FA9\u5E30\u307E\u3067 ${Math.ceil(e.respawnT)}`:"")}flash(t){let e=nt("flash"),s={hurt:["radial-gradient(ellipse at center,rgba(255,40,20,.25) 0%,rgba(255,20,10,.85) 100%)",.9,.5],just:["radial-gradient(ellipse at center,transparent 30%,rgba(255,220,120,.8) 100%)",.9,.5],parry:["radial-gradient(ellipse at center,rgba(160,220,255,.5) 0%,rgba(120,200,255,.2) 100%)",.9,.3],heal:["radial-gradient(ellipse at center,transparent 40%,rgba(90,230,120,.6) 100%)",.8,.7],charge:["radial-gradient(ellipse at center,transparent 55%,rgba(255,160,60,.5) 100%)",.7,.25],impact:["rgba(255,240,220,.35)",1,.18]}[t];s&&(e.style.background=s[0],this.flashMax=s[1],this.flashDur=s[2],this.flashT=s[2],e.style.opacity=s[1])}popup(t,e){let i=document.createElement("div");i.className="pop "+(e||""),i.textContent=t;let s=nt("popups");for(s.appendChild(i);s.children.length>3;)s.firstChild.remove();setTimeout(()=>i.remove(),980)}feed(t,e){let i=document.createElement("div");i.className="feed "+(e||""),i.textContent=t;let s=nt("feed");for(s.appendChild(i);s.children.length>5;)s.firstChild.remove();setTimeout(()=>i.remove(),4300)}banner(t,e){let i=nt("banner");i.innerHTML=Ba(t)+(e?`<small>${Ba(e)}</small>`:""),i.classList.remove("show"),i.offsetWidth,i.classList.add("show")}stick(t,e,i,s,r){let a=nt("stickBase");a.classList.toggle("on",t),t&&(a.style.left=e+"px",a.style.top=i+"px",nt("stickKnob").style.transform=`translate(${s}px,${r}px)`)}showResult(t,e,i){let s=t.win;nt("resTitle").textContent=s?"\u8A0E\u4F10\u5B8C\u4E86":"\u30AF\u30A8\u30B9\u30C8\u5931\u6557",nt("resTitle").className=s?"win":"lose",nt("resRank").textContent=s?t.rank:"\u2014",nt("resTime").textContent=Ma(t.time);let r=s?"":t.reason||"";s&&t.best&&(r="\u81EA\u5DF1\u30D9\u30B9\u30C8\u66F4\u65B0\uFF01"),nt("resNote").textContent=r;let a=t.rows.reduce((c,l)=>c+l.dmg,0)||1;nt("resRows").innerHTML=t.rows.map(c=>{let l=vn[c.id%4];return`<tr><td><div class="n"><i style="background:${l}"></i>${Ba(c.name)}${c.id===i?"\uFF08\u3042\u306A\u305F\uFF09":""}${(c.aw||[]).map(h=>`<span class="aw">${h}</span>`).join("")}</div><div class="dbar"><b style="width:${(c.dmg/a*100).toFixed(1)}%;background:${l}"></b></div></td><td>${c.dmg}<br><small style="color:var(--dim)">${Math.round(c.dmg/a*100)}%</small></td><td>${c.weak}</td><td>${c.just}</td><td>${c.parry}</td><td>${Math.round(c.taken)}</td><td>${c.downs}</td></tr>`}).join(""),nt("bAgain").classList.toggle("hidden",!e),nt("resWait").textContent=e?"":"\u30DB\u30B9\u30C8\u304C\u300C\u3082\u3046\u4E00\u5EA6\u300D\u3092\u62BC\u3059\u3068\u518D\u51FA\u767A\u3057\u307E\u3059\u3002";let o=t.rows.length;this.resultText=s?`\u3010\u7070\u89D2 ASHHORN\u3011\u7070\u89D2\u7ADC\u30B0\u30E9\u30F4\u30A1\u30EB\u30C9\u3092\u8A0E\u4F10\uFF01 ${Ma(t.time)} \u30E9\u30F3\u30AF${t.rank}\uFF08${o===1?"\u30BD\u30ED":o+"\u4EBA"}\uFF09
${location.origin}${location.pathname}`:`\u3010\u7070\u89D2 ASHHORN\u3011\u7070\u89D2\u7ADC\u30B0\u30E9\u30F4\u30A1\u30EB\u30C9\u306B\u6557\u5317\u2026\uFF08${o===1?"\u30BD\u30ED":o+"\u4EBA"}\uFF09
${location.origin}${location.pathname}`,this.show("sResult")}};function sm(n){for(let t of Dp)if(n<=t.t)return t.r;return"C"}var Mn=n=>document.getElementById(n),rm=1/15,ud=class{constructor(){let t=Mn("c");this.input=new cl(t,Mn("touch")),this.input.isTouch&&document.body.classList.add("touch");let e={sens:1,invertY:!1,vol:.8,music:.55,quality:this.input.isTouch?"mid":"high",qualityAuto:!0,weapon:"great",view:"fp",autoLock:!1};this.settings=Object.assign(e,yn.get("ashhorn.settings",{})),fi[this.settings.weapon]||(this.settings.weapon="great"),this.world=new sl(t,this.settings.quality),this.audio=new ol,this.fx=new al(this.world,Mn("dmgLayer")),this.state="title",this.myId=0,this.roster=[],this.avatars=new Map,this.stats={},this.time=0,this.carts=3,this.ended=!1,this.paused=!1,this.evId=0,this.snapT=0,this.statT=0,this.introT=0,this.slowT=0,this.orbit=.6,this.breakBy={},this.rage=0,this.endT=0,this.fpsAcc=0,this.fpsN=0,this.aliveT=0;let i={audio:this.audio,fx:this.fx,shake:(a,o,c,l)=>{let h=this.world.camera.position;this.world.addShake(a*Dt(1.15-Math.hypot(h.x-o,h.z-c)/l))},localPos:()=>this.world.camera.position,distTo:(a,o)=>{let c=this.world.camera.position;return Math.hypot(c.x-a,c.z-o)},time:()=>this.world.time,emit:a=>this.emit(a)};this.boss=new ll(this.world.scene,i),this.hazards=new hl(i),this.player=new dl(this.world,this.input,{audio:this.audio,fx:this.fx,popup:(a,o)=>this.ui.popup(a,o),flash:a=>this.ui.flash(a),dealHit:(a,o,c,l,h,d,f)=>this.dealHit(a,o,c,l,h,d,f),parry:a=>{this.isAuthority()?this.boss.applyParry(this.myId,!!a.parryFlinch):this.net.send({t:"parry",f:a.parryFlinch?1:0})},onDown:()=>{this.isAuthority()?this.playerDown(this.myId):this.net.send({t:"down"})},onJust:()=>{this.mode==="solo"&&(this.slowT=.32)},onRespawn:()=>this.ui.fade(!1),canRespawn:()=>!this.ended}),this.player.vm.visible=!1,this.player.trail.visible=!1,this.ui=new Nl(this),this.net=new Ll({onJoin:a=>{this.roster.length>=4&&(this.net.sendTo(a,{t:"full"}),setTimeout(()=>this.net.kick(a),500))},onLeave:a=>this.peerLeft(a),onMessage:(a,o)=>this.net.isHost?this.hostMsg(a,o):this.clientMsg(o),onHostLost:()=>{this.state!=="title"&&(this.cleanupHunt(),this.net.close(),this.state="title",this.ui.message("\u901A\u4FE1\u304C\u5207\u308C\u307E\u3057\u305F","\u30DB\u30B9\u30C8\u3068\u306E\u63A5\u7D9A\u304C\u5207\u308C\u307E\u3057\u305F\u3002"))}}),this.input.onPauseRequest=a=>{a&&this.introT<.6||this.pause()},this.input.onStick=(a,o,c,l,h)=>this.ui.stick(a,o,c,l,h),this.applySettings(),this.fx.resize(innerHeight,this.world.renderer.getPixelRatio()),addEventListener("resize",()=>this.fx.resize(innerHeight,this.world.renderer.getPixelRatio())),addEventListener("pointerdown",()=>this.audio.init(),{passive:!0}),addEventListener("pagehide",()=>this.net.close()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="solo"&&this.state==="hunt"&&this.pause()});let s=new URLSearchParams(location.search).get("room");this.ui.show("sTitle"),s&&(Mn("joinCode").value=s.toUpperCase().slice(0,5),Mn("bJoin").classList.add("primary"),Mn("bHost").classList.remove("primary"),this.ui.toast("\u540D\u524D\u3092\u6C7A\u3081\u3066\u300C\u53C2\u52A0\u300D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044",5e3));try{let a=new Worker(URL.createObjectURL(new Blob(["setInterval(()=>postMessage(0),33)"],{type:"text/javascript"})));a.onmessage=()=>{document.hidden&&this.net.isHost&&this.state==="hunt"&&this.frame(performance.now(),!0)}}catch{}this.last=performance.now();let r=a=>{requestAnimationFrame(r),this.frame(a,!1)};requestAnimationFrame(r),this.ui.loaded()}applySettings(t){let e=this.settings;this.input.sens=e.sens,this.input.invertY=e.invertY,this.audio.setVolume(e.vol),this.audio.musicVol=e.music,this.audio.music&&(this.audio.music.gain.value=e.music),t&&e.quality!==this.world.qName&&(this.world.setQuality(e.quality),this.fx.resize(innerHeight,this.world.renderer.getPixelRatio()))}saveSettings(){yn.set("ashhorn.settings",this.settings)}isAuthority(){return this.mode==="solo"||this.net.isHost}nameOf(t){let e=this.roster.find(i=>i.id===t);return e?e.name:"\u72E9\u4EBA"}shareUrl(){return`${location.origin}${location.pathname}?room=${this.net.code}`}startSolo(){this.mode="solo",this.myId=0,this.roster=[{id:0,name:this.ui.name(),w:this.settings.weapon}],this.beginHunt(1)}async hostRoom(){this.ui.toast("\u90E8\u5C4B\u3092\u6E96\u5099\u4E2D\u2026",8e3);try{await this.net.host(),this.mode="multi",this.myId=0,this.roster=[{id:0,name:this.ui.name(),w:this.settings.weapon}],this.state="lobby",this.ui.renderLobby(this.roster,!0,this.net.code,0),this.ui.show("sLobby"),this.ui.toast("\u90E8\u5C4B\u304C\u3067\u304D\u307E\u3057\u305F\u3002URL\u3092\u4EF2\u9593\u306B\u9001\u3063\u3066\u304F\u3060\u3055\u3044")}catch(t){this.ui.toast(t.message,5e3)}}async joinRoom(t){this.ui.toast("\u63A5\u7D9A\u4E2D\u2026",2e4);try{await this.net.join(t),this.mode="multi",this.state="lobby",this.net.send({t:"hello",name:this.ui.name(),w:this.settings.weapon}),this.ui.toast("\u90E8\u5C4B\u306B\u5165\u308A\u307E\u3057\u305F")}catch(e){this.net.close(),this.ui.toast(e.message,5e3)}}setWeapon(t){if(!fi[t]||this.state==="hunt")return;this.settings.weapon=t,this.saveSettings(),this.ui.renderWeapons();let e=this.roster.find(i=>i.id===this.myId);e&&(e.w=t),this.mode==="multi"&&(this.net.isHost?(this.net.broadcast({t:"roster",roster:this.roster}),this.rosterChanged()):this.net.send({t:"wpn",w:t}))}toggleView(){this.state==="hunt"&&(this.player.tp=!this.player.tp,this.settings.view=this.player.tp?"tp":"fp",this.saveSettings(),this.ui.toast(this.player.tp?"\u4E09\u4EBA\u79F0\u8996\u70B9":"\u4E00\u4EBA\u79F0\u8996\u70B9",1200))}hostStart(){this.net.isHost&&(this.net.broadcast({t:"start",n:this.roster.length}),this.beginHunt(this.roster.length))}again(){this.mode==="solo"?this.beginHunt(1):this.hostStart()}toTitle(){this.cleanupHunt(),this.net.close(),this.state="title",this.mode=null,this.boss.reset(1),this.ui.show("sTitle")}cleanupHunt(){this.input.enabled=!1,this.input.clear(),this.input.exitLock();for(let t of this.avatars.values())t.dispose();this.avatars.clear(),this.selfAvatar&&(this.selfAvatar.dispose(),this.selfAvatar=null),this.hazards.clear(),this.fx.clear(),this.audio.stopMusic(),this.audio.breath(!1),this.ui.hud(!1),this.ui.fade(!1),this.paused=!1,this.ended=!1,this.player.vm.visible=!1,this.player.trail.visible=!1,this.rage=0}beginHunt(t){this.cleanupHunt(),this.state="hunt",this.time=0,this.carts=3,this.ended=!1,this.introT=0,this.huntN=t,this.stats={},this.breakBy={},this.endT=0,this.boss.reset(t),this.rage=0,this.audio.setIntensity(0);let e=Math.max(0,this.roster.findIndex(s=>s.id===this.myId)),i=this.roster[e]||{};this.player.setWeapon(i.w||this.settings.weapon),this.player.tp=this.settings.view==="tp",this.player.lock=this.settings.autoLock?2:0,this.player.reset(e,this.roster.length),this.player.setColor(vn[this.myId%4]),this.selfAvatar=new Ea(this.world.scene,"",vn[this.myId%4],this.player.weaponId),this.selfAvatar.label.visible=!1,this.selfAvatar.k=70,this.selfAvatar.g.visible=!1,this.player.vm.visible=!0,this.player.trail.visible=!0,this.syncAvatars(),this.ui.hideMenus(),this.ui.hud(!0),this.ui.bossLag=1,this.ui.setMe(this.nameOf(this.myId),vn[this.myId%4]),this.ui.setRoom(this.mode==="multi"?this.net.code:""),Mn("feed").innerHTML="",Mn("popups").innerHTML="",this.ui.banner("\u72E9\u731F\u958B\u59CB",yi.name),this.input.clear(),this.input.enabled=!0,this.input.requestLock(),this.audio.init(),this.audio.play("horn",1),this.input.isTouch||setTimeout(()=>{this.state==="hunt"&&!this.input.locked&&!this.input.lockFailed&&this.ui.toast("\u753B\u9762\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u8996\u70B9\u3092\u52D5\u304B\u305B\u307E\u3059",4e3)},900)}syncAvatars(){if(this.state!=="hunt")return;let t=new Set(this.roster.map(e=>e.id));for(let[e,i]of this.avatars)t.has(e)||(i.dispose(),this.avatars.delete(e));this.roster.forEach((e,i)=>{if(e.id===this.myId)return;let s=this.avatars.get(e.id);if(s&&s.wid===(e.w||"great"))return;s&&s.dispose();let r=new Ea(this.world.scene,e.name,vn[e.id%4],e.w||"great"),a=(i-(this.roster.length-1)/2)*.16;r.x=r.tx=Math.sin(a)*28,r.z=r.tz=Math.cos(a)*28,r.id=e.id,this.avatars.set(e.id,r)})}pause(){this.state!=="hunt"||this.paused||this.ended||(this.paused=!0,this.input.enabled=!1,this.input.clear(),this.input.exitLock(),Mn("pauseSub").textContent=this.mode==="solo"?"\u6642\u9593\u306F\u6B62\u307E\u3063\u3066\u3044\u307E\u3059\u3002":"\u30DE\u30EB\u30C1\u30D7\u30EC\u30A4\u4E2D\u306F\u6642\u9593\u304C\u6B62\u307E\u308A\u307E\u305B\u3093\u3002",this.ui.show("sPause"))}resume(){this.paused&&(this.paused=!1,this.ui.hideMenus(),this.input.clear(),this.input.enabled=!0,this.input.requestLock())}emit(t){this.isAuthority()&&(t.id=this.evId++,this.applyEvent(t),this.net.isHost&&this.net.broadcast({t:"ev",e:t}))}applyEvent(t){let e=this.ui,i=t.by!=null?this.nameOf(t.by):"";switch(t.k){case"ring":case"ball":case"erupt":this.hazards.spawn(t);break;case"break":t.p==="tail"?(this.boss.setTailCut(!0),e.feed(`${i} \u304C\u5C3B\u5C3E\u3092\u5207\u65AD\uFF01`),e.popup("\u5C3B\u5C3E\u5207\u65AD\uFF01","just")):(this.boss.setHornBroken(!0),e.feed(`${i} \u304C\u89D2\u3092\u7834\u58CA\uFF01`),e.popup("\u89D2\u7834\u58CA\uFF01","just")),this.breakBy[t.p]=t.by,this.world.addShake(.5);break;case"topple":e.feed(`${i} \u304C\u8EE2\u5012\u3055\u305B\u305F\uFF01`),e.popup("\u8EE2\u5012\uFF01 \u982D\u3092\u72D9\u3048","just");break;case"stun":e.feed(`${i} \u304C\u6C17\u7D76\u3055\u305B\u305F\uFF01`),e.popup("\u6C17\u7D76\uFF01","parry");break;case"phase":this.boss.phase=t.p,this.audio.setIntensity(t.p-1),e.banner(t.p>=3?"\u6FC0\u6602\u30FB\u6975":"\u6FC0\u6602",t.p>=3?"\u5927\u5730\u304C\u5674\u304D\u4E0A\u304C\u308B":"\u653B\u6483\u304C\u6FC0\u3057\u304F\u306A\u308B");break;case"dead":this.onBossDead();break;case"hit":{let s=new P(t.x,t.y,t.z),r=s.distanceTo(this.world.camera.position);this.fx.hitSpark(s,!!t.s,!!t.w),this.audio.play(t.s?"hitHeavy":"hit",.7,r),this.fx.number(s,String(t.d),"other"),this.boss.hitFlash=.6;break}case"down":this.carts=t.c,e.feed(`${this.nameOf(t.pid)} \u304C\u529B\u5C3D\u304D\u305F\uFF08\u6B8B\u308A${Math.max(0,t.c)}\uFF09`),t.pid!==this.myId&&this.audio.play("down",.5);break;case"stamp":e.feed(`${this.nameOf(t.pid)}\uFF1A${el[t.n]||""}`,"stamp"),this.audio.play("stamp",1);break;case"end":this.finish(t);break}}dealHit(t,e,i,s,r,a,o){let c={p:t,d:e,x:+i.x.toFixed(2),y:+i.y.toFixed(2),z:+i.z.toFixed(2),s:s?1:0,w:r?1:0,b:a?1:0,sb:o||0};this.isAuthority()?(this.boss.applyHit(t,e,this.myId,a,o||0),this.net.isHost&&this.net.broadcast({t:"ev",e:{k:"hit",...c,by:this.myId}})):this.net.send({t:"hit",...c})}sendStamp(t){this.state==="hunt"&&(this.isAuthority()?this.emit({k:"stamp",pid:this.myId,n:t}):this.net.send({t:"stamp",n:t}))}playerDown(t){this.ended||(this.carts--,this.emit({k:"down",pid:t,c:this.carts}),this.carts<=0&&this.end(!1,"3\u56DE\u529B\u5C3D\u304D\u305F"))}onBossDead(){this.ended=!0,this.hazards.clear(),this.audio.stopMusic(),this.audio.breath(!1),this.world.addShake(.8),this.ui.flash("impact"),this.player.invuln=99,this.mode==="solo"&&(this.slowT=1.3),this.isAuthority()&&this.end(!0)}end(t,e){this.endT>0||(this.ended=!0,this.endT=t?5.2:2.6,this.endRes={win:t,reason:e,time:this.time})}sendResult(){let{win:t,reason:e,time:i}=this.endRes;this.stats[this.myId]=this.player.stats;let s=this.roster.map(r=>{let a=this.stats[r.id]||{};return{id:r.id,name:r.name,dmg:Math.round(a.dmg||0),weak:a.weak||0,just:a.just||0,parry:a.parry||0,taken:Math.round(a.taken||0),downs:a.downs||0,aw:[]}});if(s.length>1){let r=(a,o)=>{let c=Math.max(...s.map(l=>l[a]));return c>=o?s.filter(l=>l[a]===c):[]};r("dmg",1).forEach(a=>a.aw.push("MVP")),r("just",3).forEach(a=>a.aw.push("\u898B\u5207\u308A\u306E\u9054\u4EBA")),r("parry",2).forEach(a=>a.aw.push("\u9244\u58C1"))}for(let r of s)t&&r.taken===0&&r.aw.push("\u7121\u50B7"),this.breakBy.tail===r.id&&r.aw.push("\u5C3E\u65AD\u3061"),this.breakBy.horn===r.id&&r.aw.push("\u89D2\u6298\u308A");s.sort((r,a)=>a.dmg-r.dmg),this.emit({k:"end",win:t,time:+i.toFixed(2),rank:t?sm(i):"-",rows:s,reason:e||""})}finish(t){if(this.state="result",this.ended=!0,this.input.enabled=!1,this.input.clear(),this.input.exitLock(),this.audio.stopMusic(),this.audio.breath(!1),this.audio.play(t.win?"victory":"fail",1),this.ui.hud(!1),this.player.vm.visible=!1,this.player.trail.visible=!1,this.hazards.clear(),t.win){let e=yn.get("ashhorn.records",{}),i=t.rows.length;(!e[i]||t.time<e[i].t)&&(e[i]={t:t.time,r:t.rank},yn.set("ashhorn.records",e),t.best=!0)}this.ui.showResult(t,this.isAuthority(),this.myId)}hostMsg(t,e){switch(e.t){case"hello":{if(this.roster.find(i=>i.id===t)||this.roster.length>=4)return;this.roster.push({id:t,name:String(e.name||"\u72E9\u4EBA").slice(0,10),w:fi[e.w]?e.w:"great"}),this.roster.sort((i,s)=>i.id-s.id),this.net.sendTo(t,{t:"welcome",id:t,roster:this.roster,state:this.state==="hunt"?"hunt":"lobby",n:this.huntN}),this.net.broadcast({t:"roster",roster:this.roster},t),this.rosterChanged(),this.ui.toast(`${this.nameOf(t)} \u304C\u53C2\u52A0\u3057\u307E\u3057\u305F`),this.audio.play("uiBig",1);break}case"ps":{let i=this.avatars.get(t);i&&i.apply(e.s),e.st&&(this.stats[t]={dmg:e.st[0],weak:e.st[1],just:e.st[2],parry:e.st[3],taken:e.st[4],downs:e.st[5]});break}case"hit":{if(this.state!=="hunt"||this.ended)return;let i=Ce(+e.d||0,0,900);this.boss.applyHit(e.p,i,t,!!e.b,Ce(+e.sb||0,0,600));let s={k:"hit",x:e.x,y:e.y,z:e.z,s:e.s,w:e.w,d:i,by:t};this.applyEvent(s),this.net.broadcast({t:"ev",e:s},t);break}case"wpn":{let i=this.roster.find(s=>s.id===t);i&&fi[e.w]&&this.state!=="hunt"&&(i.w=e.w,this.net.broadcast({t:"roster",roster:this.roster}),this.rosterChanged());break}case"parry":this.state==="hunt"&&this.boss.applyParry(t,!!e.f);break;case"down":this.state==="hunt"&&this.playerDown(t);break;case"stamp":this.emit({k:"stamp",pid:t,n:e.n|0});break}}peerLeft(t){let e=this.roster.find(i=>i.id===t);e&&(this.roster=this.roster.filter(i=>i.id!==t),this.net.broadcast({t:"roster",roster:this.roster}),this.ui.toast(`${e.name} \u304C\u9000\u51FA\u3057\u307E\u3057\u305F`),this.rosterChanged())}rosterChanged(){this.state==="lobby"&&this.ui.renderLobby(this.roster,this.net.isHost,this.net.code,this.myId),this.syncAvatars(),this.ui.teamKey=""}clientMsg(t){switch(t.t){case"welcome":this.myId=t.id,this.roster=t.roster,t.state==="hunt"?(this.beginHunt(t.n||this.roster.length),this.boss._first=!0):(this.state="lobby",this.ui.renderLobby(this.roster,!1,this.net.code,this.myId),this.ui.show("sLobby"));break;case"roster":this.roster=t.roster,this.rosterChanged();break;case"start":this.beginHunt(t.n);break;case"full":this.net.close(),this.state="title",this.ui.message("\u6E80\u54E1\u3067\u3059","\u3053\u306E\u90E8\u5C4B\u306F4\u4EBA\u3067\u6E80\u54E1\u3067\u3057\u305F\u3002");break;case"snap":if(this.state!=="hunt")return;this.boss.applySnapshot(t.b),this.time=t.tm,this.carts=t.c;for(let e of t.p){if(e[0]===this.myId)continue;let i=this.avatars.get(e[0]);i&&i.apply(e[1])}break;case"ev":(this.state==="hunt"||t.e.k==="end")&&this.applyEvent(t.e);break}}frame(t,e,i){if(this.manual&&!i)return;let s=Math.min(.05,(t-this.last)/1e3);if(s<=0)return;this.last=t;let r=this.world,a=this.boss,o=this.player;if(this.aliveT+=s,this.aliveT>1&&(this.aliveT=0,this.mode==="multi"&&this.net.checkAlive()),this.state==="hunt"){let c=this.paused&&this.mode==="solo";this.endT>0&&!c&&this.isAuthority()&&(this.endT-=s,this.endT<=0&&this.sendResult()),this.slowT>0&&(this.slowT-=s,s*=.3),!c&&this.state==="hunt"?this.updateHunt(s):this.input.consumeLook()}else{this.orbit+=s*.11,(this.isAuthority()||this.state!=="result")&&(a.dead||this.state==="result")&&(a.t+=s),a.animate(s);let c=a.x+Math.sin(this.orbit)*17,l=a.z+Math.cos(this.orbit)*17,h=Math.hypot(c,l);h>36&&(c*=36/h,l*=36/h),r.camera.position.set(c,2.4+Math.sin(this.orbit*.7)*.8,l),r.camera.lookAt(a.x,3.3,a.z),r.camera.fov!==62&&(r.camera.fov=62,r.camera.updateProjectionMatrix())}if(this.rage=Se(this.rage,this.state==="hunt"?(a.phase-1)/2:0,1.5,s),r.rage=this.rage,this.fx.update(s,r.camera),r.update(s,r.camera.position),this.input.endFrame(),!e){if(r.render(),this.state==="hunt"&&this.settings.qualityAuto&&!this.paused&&(this.fpsAcc+=t-(this._pf||t),this.fpsN++,this.fpsN>=150)){let c=1e3/(this.fpsAcc/this.fpsN);this.fpsAcc=0,this.fpsN=0,c<27&&r.qName!=="low"&&(this.settings.quality=r.qName==="high"?"mid":"low",this.applySettings(!0),this.ui.toast("\u52D5\u4F5C\u304C\u91CD\u3044\u305F\u3081\u753B\u8CEA\u3092\u4E0B\u3052\u307E\u3057\u305F\uFF08\u8A2D\u5B9A\u3067\u5909\u66F4\u3067\u304D\u307E\u3059\uFF09",4e3))}this._pf=t}}updateHunt(t){let e=this.boss,i=this.player,s=this.input,r=this.isAuthority();s.update(t),this.introT+=t;for(let l=0;l<4;l++)s.pressed("stamp"+(l+1))&&this.sendStamp(l);s.pressed("view")&&this.toggleView(),i.update(t,e);let a=this.selfAvatar;if(a&&(a.g.visible=i.tp,i.tp?(a.apply(i.netState()),a.update(t)):(a.x=a.tx=i.x,a.z=a.tz=i.z)),r){!e.active&&this.introT>1.7&&!this.ended&&(e.active=!0,e.start("intro"),e.pickTarget(),this.audio.startMusic());let l=[{id:this.myId,x:i.x,z:i.z,alive:i.alive}];for(let h of this.avatars.values())l.push({id:h.id,x:h.x,z:h.z,alive:h.alive});e.hostUpdate(t,l),e.active&&!this.ended&&(this.time+=t,this.time>=1200&&this.end(!1,"\u6642\u9593\u5207\u308C"))}else e.clientUpdate(t),e.active&&!this._music&&this.audio.startMusic();this._music=e.active,e.animate(t);let o=i.alive&&!this.ended;if(o)for(let l of e.hitsOn(i,Oe.radius,i.hitsOut))i.takeHit(l);this.hazards.update(t,o?i:null,Oe.radius,l=>i.takeHit(l));for(let l of this.avatars.values())l.update(t);if(this.snapT+=t,this.mode==="multi"&&this.snapT>=rm)if(this.snapT=0,this.net.isHost){let l=[[this.myId,i.netState()]];for(let h of this.avatars.values())l.push([h.id,[+h.tx.toFixed(2),+h.tz.toFixed(2),+h.tyaw.toFixed(2),h.pitch,fl[h.state]??0,+h.st.toFixed(2),h.hp,h.lv,h.adur]]);this.net.broadcast({t:"snap",b:e.snapshot(),p:l,tm:+this.time.toFixed(2),c:this.carts})}else{let l={t:"ps",s:i.netState()};if(this.statT+=rm,this.statT>.7){this.statT=0;let h=i.stats;l.st=[Math.round(h.dmg),h.weak,h.just,h.parry,Math.round(h.taken),h.downs]}this.net.send(l)}let c=[];for(let l of this.roster){if(l.id===this.myId)continue;let h=this.avatars.get(l.id);h&&c.push({id:l.id,name:l.name,color:vn[l.id%4],hp:h.hp,alive:h.alive})}this.ui.updateHud(t,i,e,this.time,this.carts,c),i.state==="dead"&&i.st>1.2&&!this.ended&&this.ui.fade(i.respawnT<.9)}};window.__game=new ud;})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
